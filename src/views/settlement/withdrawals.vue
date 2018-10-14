<template>
    <div class="withdrawals">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$t('withdrawals.title')}}</span>
            </div>
            <el-col style="width:100%;margin-bottom:20px;" :span="8">
                <el-card style="color:#56A5FC" shadow="always">
                    {{withdrawTo}}绑定提现
                </el-card>
            </el-col>
            <div class="text item">
                <el-form ref="withdrawalsform" :rules="withdrawalsrules" :model="withdrawalsform" label-width="80px">
                    <el-form-item :label="$t('withdrawals.withtable.Balance')">
                        <el-input disabled="disabled" v-model="totalmoney" style="width:30%"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('withdrawals.withtable.WithdrawalAmount')" prop="money">
                        <el-input v-model="withdrawalsform.money" disabled="disabled" id="moneyinput" style="width:30%"></el-input>
                        <span style="padding-left:10px;color:#aaa">提现费率为 {{ratio}}%</span>
                    </el-form-item>
                    <el-form-item :label="$t('withdrawals.withtable.Verificationcode')" prop="code">
                        <el-input v-model="withdrawalsform.code" style="width:30%" id="codeinput"></el-input>
                        <el-button style="margin-left:1%" @click="getemilcodes" :disabled="disabled" type="success">{{codetext}}</el-button>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="withdsubmitForm('withdrawalsform')" :disabled="disabled1">{{$t('withdrawals.submit')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import api from "@/axios/api";
export default {
    data() {
        const money = (rule, value, callback) => {
            if (value) {
                if (/^\d+(\.\d+)?$/.test(value)) {
                    callback();
                } else {
                    callback(new Error("请输入数字金额!"));
                }
            }
            callback();
        };

        return {
            email: "",
            mobile: "",
            code: "",
            codetext: "发送验证码",
            text: "",
            disabled1: false,
            disabled: false,
            totalmoney: "",
            minWithdraw: 100,
            withdrawRadio:[],
            ratio:0,// 提现费率
            withdrawTo: "银行卡",
            withdrawalsform: {
                money: "",
                code: ""
            },
            moneyMethods: [
                {
                    value: 0,
                    label: "银行卡"
                },
                {
                    value: 1,
                    label: "支付宝"
                },
                {
                    value: 2,
                    label: "微信"
                },
                {
                    value: 3,
                    label: "数字货币"
                }
            ],
            withdrawalsrules: {
                money: [
                    {
                        required: true,
                        message: "请输入提现金额",
                        trigger: "blur"
                    },
                    { validator: money, trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        getemilcodes() {
            //发送获取验证码的请求
            let datas = {
                params: {
                    email: this.email,
                    type: "withdraw_code"
                }
            };
            api.getemilcode(datas).then(res => {
                const data = res.data;
                if (data.result === 1) {
                    this.sendCodeAnimation();
                    this.$message({
                        message: "发送成功",
                        type: "success",
                        duration: 3000
                    });
                } else {
                    this.$message({
                        message: "发送失败",
                        type: "error",
                        duration: 3000
                    });
                }
            });
        },
        //发送验证码 倒计时
        sendCodeAnimation() {
            var that = this;
            that.disabled = true;
            var nums = 60;
            var timer = setInterval(function() {
                nums--;
                if (nums <= 0) {
                    clearInterval(timer);
                    that.codetext = "重新发送";
                    that.disabled = false;
                } else {
                    that.codetext = nums + "s重新发送";
                    that.disabled = true;
                }
            }, 1000);
        },
        withdsubmitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (
                        Number(this.totalmoney) >
                        Number(this.withdrawalsform.money)
                    ) {
                        this.getwithdrawals();
                    } else {
                        this.$message({
                            message: `余额不足`,
                            type: "error",
                            duration: 2000
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        getwithdrawals() {
            let data = {
                money: this.withdrawalsform.money,
                code: this.withdrawalsform.code
            };
            api.getwithdrawals(data).then(res => {
                const data = res.data;
                if (data.result === 1) {
                    this.$message({
                        message: `${data.data}`,
                        type: "success",
                        duration: 2000
                    });
                    this.withdrawalsform.money = 0;
                    this.withdrawalsform.code = "";
                } else {
                    this.$message({
                        message: `${data.message}`,
                        type: "warning",
                        duration: 2000
                    });
                }
            });
        },
        getWithdrawRadio() {
            // 获取费率
            api.getWithdrawRadio().then(res => {
                const data = res.data;
                if (res.status === 200) {
                    this.withdrawRadio=data.withraw_ratio;
                    this.minWithdraw = Number(data.withdraw_limit);
                    this.getMoneyMethod();
                }
            });
        },
        getMoneyMethod() {
            api.getshopinfos().then(res => {
                const data = res.data;
                if (data.result === 1) {
                    const curWay = this.moneyMethods.filter(o => {
                        return o.value === data.data.type;
                    });
                    this.withdrawRadio.forEach(element => {
                        if(element.type == data.data.type) {
                            this.ratio = element.ratio ;
                        }
                    });
                    this.withdrawTo = curWay[0].label;
                }
            });
        }
    },
    mounted() {
        this.getWithdrawRadio();
        this.totalmoney = this.$store.state.user.balance;
        this.withdrawalsform.money = this.$store.state.user.balance;
        if (this.totalmoney < this.minWithdraw) {
            this.$message({
                message: "余额不满足最低提现金额",
                type: "warning"
            });
            this.disabled = true;
            this.disabled1 = true;
            document.getElementById("moneyinput").disabled = true;
            document.getElementById("codeinput").disabled = true;
            return;
        }
        this.mobile = this.$store.state.user.mobile;
        this.email = this.$store.state.user.email;
    }
};
</script>
<style lang="scss" scoped>
.withdrawals {
    padding: 20px;
}
</style>
