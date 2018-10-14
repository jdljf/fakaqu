<template>
    <div id="Changepass">
      <el-card>
            <div slot="header" class="clearfix">
              <span>{{$t('payinfo.title')}}</span>
           </div>
           <el-card>
               <div class="card-top">{{$t('payinfo.titleone')}}<span class="title-color">{{$t('payinfo.titleonenext')}}</span></div>
               <div class="card-top"> {{$t('payinfo.titletwo')}}</div>
               <div class="card-tops"> {{$t('payinfo.titlethree')}}</div>
               <div class="card-tops" style="color:red;"> 3、若未完善手机号码则验证信息将发送至您的邮箱</div>
         <!-- 表单 -->
           </el-card>
           <el-card class='form-card'>
            <el-form :model="ChangepassuleForm" :rules="rules" ref="ChangepassuleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('payinfo.username')"   prop="name">
                   <el-input disabled v-model="ChangepassuleForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="$t('payinfo.Paymentmethod')" prop="type">
                   <el-select v-model="ChangepassuleForm.type" placeholder="请选择收款方式" @change="changeMoneyMethods">
                      <el-option v-for="item in moneyMethods"  :label="item.label" :key="item.value" :value="item.value"></el-option>
                   </el-select>
                </el-form-item>
                <div v-if="ChangepassuleForm.type === 0 ">
                    <el-form-item :label="$t('payinfo.bank')" prop="bank_name">
                        <el-select v-model="ChangepassuleForm.bank_name" placeholder="请选择银行">
                            <el-option v-for="item in bankName " :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('payinfo.Bankcard')" prop="bank_account">
                        <el-input v-model="ChangepassuleForm.bank_account"></el-input>
                    </el-form-item>
                    <el-form-item label="户名"  prop="payee_name">
                        <el-input v-model="ChangepassuleForm.payee_name"></el-input>
                    </el-form-item>
                </div>
                <div v-else-if="ChangepassuleForm.type === 1">
                    <el-form-item label="支付宝账号" class="alipay_acount">
                        <el-input v-model="money_account" @blur="checkaccount" ></el-input>
                        <p class="tip">{{msg.alipay_account}}</p>
                    </el-form-item>
                    <el-form-item label="账号姓名" class="alipay_name">
                        <el-input v-model="real_name" @blur="checkname" ></el-input>
                        <p class="tip">{{msg.alipay_name}}</p>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-form-item label="货币类型"  prop="number_type">
                        <el-select v-model="ChangepassuleForm.number_type" placeholder="请选择类型" >
                            <el-option v-for="item in numberMoney " :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="钱包地址" prop="bank_address">
                        <el-input v-model="ChangepassuleForm.bank_address"></el-input>
                    </el-form-item>
                </div>
        <!-- <el-form-item :label="$t('payinfo.payee')"  prop="username">
        <el-input  v-model="ChangepassuleForm.username"></el-input>
        </el-form-item> -->
                <div v-if="isPhoneUser">
                    <el-form-item :label="$t('payinfo.phone')" prop="mobile">
                        <el-input style="width:60%" disabled v-model="ChangepassuleForm.mobile"></el-input>
                        <el-button style="margin-left:5%" @click="verificationCode" :disabled="disabled" type="success">{{codetext}}</el-button>
                    </el-form-item>
                    <el-form-item :label="$t('payinfo.code')"  prop="code">
                        <el-input :placeholder="$t('payinfo.codeplace')"  v-model.trim="ChangepassuleForm.code"></el-input>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-form-item :label="$t('payinfo.code')" prop="code"  >
                        <el-input :placeholder="$t('payinfo.codeplace')"  v-model.trim="ChangepassuleForm.code" style="width: 200px;" ></el-input>
                        <el-button style="margin-left:5%" @click="verificationemailCode" :disabled="disabled" type="success">{{codetext}}</el-button>
                    </el-form-item>
                    <!--<p class="tip">{{msg.code}}</p>-->
                </div>
             <el-form-item>
               <el-button  type="primary"   v-loading="listLoading" @click="submitForm('ChangepassuleForm')">{{$t('payinfo.Modify')}}</el-button>
             </el-form-item>
          </el-form>
           </el-card>
      </el-card>
    </div>
</template>

 <script>
import api from "@/axios/api";

export default {
  data() {
    const bank_account = (rule, value, callback) => {
      if (value) {
        if (/[^0-9-]+/g.test(value)) {
          callback(new Error("请输入正确的银行卡号码!"));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      msg: {
        alipay_account: "",
        alipay_name: "",
        code: ""
      },
      numberAddress: "",
      isPhoneUser: false,
      money_account: "",
      real_name: "",
      value: "",
      numberMoney: [
        {
          value: 0,
          label: "BTC"
        },
        {
          value: 1,
          label: "ETH"
        },
        {
          value: 2,
          label: "EOS"
        }
      ],
      moneyMethods: [
        {
          value: 0,
          label: "银行卡"
        },
        {
          value: 1,
          label: "支付宝"
        },
        // {
        //   value: 2,
        //   label: "微信"
        // },
        {
          value: 3,
          label: "数字货币"
        }
      ],
      bankName: [
        {
          value: "中国农业银行",
          label: "中国农业银行"
        },
        {
          value: "中国工商银行",
          label: "中国工商银行"
        },
        {
          value: "中国建设银行",
          label: "中国建设银行"
        },
        {
          value: "中国邮政银行",
          label: "中国邮政银行"
        }
      ],
      codetext: "发送验证码",
      text: "",
      disabled: false,

      listLoading: false,
      ChangepassuleForm: {
        number_type: "",
        name: "",
        type: 1,
        bank_name: "",
        bank_account: "",
        payee_name: "",
        bank_address: "",
        username: "",
        mobile: "",
        code: ""
      },
      rules: {
        number_type: [
          { required: true, message: "请选择货币种类", trigger: "change" }
        ],
        bank_name: [
          { required: true, message: "请选择开户的银行", trigger: "change" }
        ],
        payee_name: [
          {
            required: true,
            message: "请输入正确的户名",
            trigger: "blur"
          }
        ],
        bank_account: [
          {
            required: true,
            message: "请输入正确的银行卡号码",
            trigger: "blur"
          },
          {
            min: 19,
            max: 19,
            message: "请输入正确的银行卡号码",
            trigger: "blur"
          },
          { validator: bank_account, trigger: "blur" }
        ],

        bank_address: [
          { required: true, message: "请选择开户地址", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    checkcode() {
      if (this.ChangepassuleForm.code === "") {
        this.msg.code = "请输入验证码";
      } else {
        this.msg.code = "";
      }
    },
    checkname() {
      if (this.real_name === "") {
        this.msg.alipay_name = "请输入与账号对应的真实姓名";
      } else {
        this.msg.alipay_name = "";
      }
    },
    checkaccount() {
      if (this.money_account === "") {
        this.msg.alipay_account = "请输入正确账号";
      } else {
        this.msg.alipay_account = "";
      }
    },
    verificationemailCode() {
      const email = this.$store.state.user.email;
      const data = { params: { email: email, type: "bank_code" } };
      api.getemilcode(data).then(res => {
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
    changeMoneyMethods() {
      this.ChangepassuleForm.bank_name = "";
      this.ChangepassuleForm.bank_account = "";
    },
    verificationCode() {
      //发送获取验证码的请求
      const mobile = this.ChangepassuleForm.mobile;
      // if (!mobile) {
      //   this.$message({
      //     message: "请前往基本设置页面完善手机号等资料",
      //     type: "warning"
      //   });
      //   return;
      // }
      let datas = {
        mobile: mobile
      };
      // log("datas", datas);
      api.shopcode(datas).then(res => {
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.edituser();
        } else {
          return false;
        }
      });
    },
    edituser() {
      if (this.ChangepassuleForm.type === 1) {
        this.checkname();
        this.checkaccount();
        for (let prop in this.msg) {
          if (this.msg[prop].length > 0) {
            this.$message({
              type: "warning",
              message: "信息填写不完整"
            });
            return;
          }
        }
        this.ChangepassuleForm.bank_account = this.money_account;
        this.ChangepassuleForm.bank_name = this.real_name;
      }
      this.listLoading = true;
      api.editshopinfo(this.ChangepassuleForm).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoading = false;
          this.$router.push({ path: "/composite/progress" });
        } else {
          this.listLoading = false;
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
        }
      });
    }
  },

  mounted() {
    this.ChangepassuleForm = JSON.parse(this.$route.query.paywayinfo);
    if (this.ChangepassuleForm.type === 1) {
      this.money_account = this.ChangepassuleForm.bank_account;
      this.real_name = this.ChangepassuleForm.bank_name;
    }
    this.isPhoneUser = this.ChangepassuleForm.mobile !== "";
  }
};
</script>



<style lang="scss" >
#Changepass {
  .alipay_acount .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
  .alipay_name .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }

  .tip {
    font-size: 12px;
    color: #ff0000;
    height: 20px;
    line-height: 20px;
  }
  .clearfix {
    font-weight: bold;
  }
  .card-top {
    .title-color {
      color: #87d74f;
    }
    color: #157df4;
    padding: 10px;
  }
  .card-tops {
    color: #157df4;
    padding: 10px 85px;
  }
  .form-card {
    margin-top: 30px;
    width: 900px;

    .el-select {
      width: 100%;
    }
  }
}
</style>
