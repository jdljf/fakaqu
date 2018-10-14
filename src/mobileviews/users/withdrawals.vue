<template>
  <div id="withdrawalss">
    <div class="withdrawals">
      <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()">{{withdrawalsbanner}}</x-header>
      <el-card shadow="never" class="box-card">
        <el-col style="width:100%;margin-bottom:0.4rem;font-size:0.25rem" :span="8">
          <el-card style="color:#56A5FC;line-height:0.35rem" shadow="always">
            {{withdrawTo}}绑定提现
          </el-card>
        </el-col>
        <div class="text item">

          <el-form ref="withdrawalsform" :rules="withdrawalsrules" :model="withdrawalsform" label-width="80px">
            <el-form-item label="总余额">
              <el-input style="" disabled="disabled" v-model="this.$store.state.user.balance"></el-input>
            </el-form-item>
            <el-form-item label="提现金额" prop="money">
              <el-input placeholder="请输入提现金额" disabled="disabled" v-model="withdrawalsform.money"></el-input>
              <span style="color:#aaa">提现费率为 {{ratio}}%</span>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <el-input placeholder="请输入验证码" v-model="withdrawalsform.code" style="width:50%"></el-input>
              <el-button style="padding:12px;10px" @click="getemilcodes" :disabled="disabled" type="success">{{codetext}}</el-button>
            </el-form-item>
            <el-button type="primary" @click="withdsubmitForm('withdrawalsform')" style="width:100%;margin-left:0px;">申请</el-button>
          </el-form>
        </div>
      </el-card>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
import TabBar from "@/components/mobile/TabBar";

export default {
    data() {
        const money = (rule, value, callback) => {
            if (value) {
                if (/[^0-9-]+/g.test(value)) {
                    callback(new Error("请输入数字金额!"));
                } else {
                    callback();
                }
            }
            callback();
        };

        return {
            userinfo: {},
            withdrawalsbanner: "申请提现",
            code: "",
            codetext: "发送验证码",
            text: "",
            disabled: false,
            totalmoney: "",
            minWithdraw: 100,
            withdrawRadio: [],
            ratio: 0, // 提现费率
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
            mobile: "",
            email: "",
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
        bannerBack() {
            this.$router.push({
                name: "Users"
            });
        },
        getemilcodes() {
            //发送获取验证码的请求
            const mobile = this.mobile;
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
                    this.totalmoney = this.$store.state.user.balance;
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
                    this.withdrawRadio = data.withraw_ratio;
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
                        if (element.type == data.data.type) {
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
        this.withdrawalsform.money = this.$store.state.user.balance;
        this.mobile = this.$store.state.user.mobile;
        this.totalmoney = this.$store.state.user.balance;
        this.email = this.$store.state.user.email;
    },
    components: {
        MbHeader,
        XHeader,
        LoadMore,
        TabBar
    }
};
</script>

<style>
.el-card__body {
    padding: 10px !important;
}
.el-input__inner {
    padding-left: 5px;
}
.el-message {
    min-width: 90%;
}
</style>

<style lang="scss" scoped>
.withdrawalss {
    .withdrawals {
        padding: 20px;
    }
}
</style>
