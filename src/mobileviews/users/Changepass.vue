<template>
    <div class="Changepass">
      <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()"   >{{changepass}}</x-header>

        <div class="card-head">
           <div>收款提示:<span class="green">推荐使用银行卡收款，更方便更快捷！！</span></div>
           <div>注意事项：1、收款人姓名必须填写与身份证对应的真实姓名。</div>
           <div style="margin-left: 1.1rem;">2、银行卡收款必须尽量填写准确的支行信息</div>
            <div style="margin-left: 1.1rem;color:red;"> 3、若未完善手机号码则验证信息将发送至您的邮箱</div>

        </div>
          <div class="collection">
                  <el-form :model="ChangepassuleForm" :rules="rules" ref="ChangepassuleForm" label-width="100px" class="demo-ruleForm">
                      <table class="collection-table">
                           <tr>
                            <td>用户名:</td>
                            <td>
                              <input type="text" disabled v-model="ChangepassuleForm.name"/>
                            </td>
                          </tr>
                           <tr>
                            <td>收款方式:</td>
                            <td>
                            <el-form-item class="incomprops"  prop="type">
                                <el-select v-model="ChangepassuleForm.type" placeholder="请选择收款方式" @change="changeMoneyMethods">
                                    <el-option v-for="item in moneyMethods"  :label="item.label" :key="item.value" :value="item.value"></el-option>
                               </el-select>
                           </el-form-item >
                           </td>
                          </tr>
                            <div v-if="ChangepassuleForm.type === 0 ">
                              <tr>
                                  <td>开户银行:</td>
                                  <td>
                                      <el-form-item class="incomprops"  prop="bank_name">
                                          <el-select v-model="ChangepassuleForm.bank_name" placeholder="请选择银行">
                                              <el-option v-for="item in bankName " :label="item.label" :value="item.value" :key="item.value"></el-option>
                                          </el-select>
                                      </el-form-item>
                                  </td>
                              </tr>
                              <tr>
                                  <td>银行卡号:</td>
                                  <td>
                                      <el-form-item class="incomprops"  prop="bank_account">
                                          <input type="text" placeholder="请输入银行卡号" v-model="ChangepassuleForm.bank_account"/>
                                      </el-form-item>
                                  </td>
                              </tr>
                              <tr>
                                  <td>户名:</td>
                                  <td>
                                      <el-form-item class="incomprops"  prop="payee_name">
                                          <input type="text"  placeholder="请输入户名" v-model="ChangepassuleForm.payee_name"/>
                                      </el-form-item>
                                  </td>
                              </tr>
                          </div>
                            <div v-else-if="ChangepassuleForm.type === 1">
                              <tr>
                                  <td>
                                      支付宝账号:
                                  </td>
                                  <td>
                                      <el-form-item  class="incomprops">
                                          <el-input v-model="money_account"></el-input>
                                      </el-form-item>
                                  </td>
                              </tr>
                              <!--<tr style="display: block;margin: 0;border: none;">-->
                                <!--<td >-->
                                  <!--<p class="tip">颠三倒四多</p>-->
                                <!--</td>-->
                              <!--</tr>-->
                              <tr>
                                  <td>账号姓名:</td>
                                  <td>
                                    <el-form-item class="incomprops">
                                        <el-input v-model="real_name"></el-input>
                                    </el-form-item>
                                  </td>
                              </tr>
                          </div>
                            <div v-else>
                              <tr>
                                  <td>货币类型:</td>
                                  <td>
                                      <el-form-item class="incomprops"  prop="number_type">
                                          <el-select v-model="ChangepassuleForm.number_type" placeholder="请选择货币类型">
                                              <el-option v-for="item in numberMoney " :label="item.label" :value="item.value" :key="item.value"></el-option>
                                          </el-select>
                                      </el-form-item>
                                  </td>
                              </tr>
                              <tr>
                                  <td>钱包地址:</td>
                                  <td>
                                      <el-form-item class="incomprops" prop="bank_address">
                                          <el-input v-model="ChangepassuleForm.bank_address"></el-input>
                                      </el-form-item>
                                  </td>
                              </tr>
                          </div>
                            <div v-if="isPhoneUser">
                            <tr>
                              <td>手机号:</td>
                              <td><input style="width:46%;" type="text" disabled v-model="ChangepassuleForm.mobile" />
                                  <el-button style="padding:.2rem" placeholder="请输入手机号" @click="verificationCode" :disabled="disabled" type="success">{{codetext}}</el-button>
                              </td>
                          </tr>
                            <tr>
                              <td>验证码:</td>
                              <td>
                                  <el-form-item class="incomprops"  prop="code">
                                      <input type="text"  placeholder="请输入验证码" v-model="ChangepassuleForm.code" />
                                  </el-form-item>
                              </td>
                            </tr>
                          </div>
                            <div v-else>
                              <tr>
                                  <td>验证码:</td>
                                  <td>
                                      <el-form-item class="incomprops"  prop="code">
                                          <input type="text"  placeholder="请输入验证码" v-model="ChangepassuleForm.code" style="width:80px;"/>
                                          <el-button style="padding:.2rem" placeholder="请输入手机号" @click="verificationemailCode" :disabled="disabled" type="success">{{codetext}}</el-button>
                                      </el-form-item>
                                  </td>
                              </tr>
                          </div>
                      </table>
                      <div class="edits"> <el-button  v-loading="listLoading"  style="width:90%" @click="submitForm('ChangepassuleForm')"  type="primary">立即修改</el-button></div>
                   </el-form>
            </div>
         </div>

</template>

<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
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
      isPhoneUser: false,
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
      money_account: "",
      real_name: "",
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
      changepass: "支付信息",
      codetext: "发送验证码",
      text: "",
      disabled: false,
      listLoading: false,
      ChangepassuleForm: {
        number_type: "",
        name: "",
        type: "",
        payee_name: "",
        bank_name: "",
        bank_account: "",
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
          { required: true, message: "请选择钱包地址", trigger: "change" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  components: {
    MbHeader,
    XHeader,
    LoadMore
  },
  methods: {
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
    bannerBack() {
      this.$router.go(-1);
    },
    verificationCode() {
      //发送获取验证码的请求
      const mobile = this.ChangepassuleForm.mobile;
      if (!mobile) {
        this.$message({
          message: "请前往基本设置页面完善手机号等资料",
          type: "warning"
        });
        return;
      }
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
        // log("num", that.codetext);
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
      // if (this.money_account === "") {
      //   this.$message({
      //     message: "请填写提现账号",
      //     type: "warning"
      //   });
      //   return;
      // } else {
      if (this.ChangepassuleForm.type === 1) {
        this.ChangepassuleForm.bank_account = this.money_account;
        this.ChangepassuleForm.bank_name = this.real_name;
      }

      // }
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
          this.$router.push({
            path: "/composite/progress"
          });
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
    this.isPhoneUser = this.ChangepassuleForm.mobile !== "";
    if (this.ChangepassuleForm.type === 1) {
      this.money_account = this.ChangepassuleForm.bank_account;
      this.real_name = this.ChangepassuleForm.bank_name;
    }
  }
};
</script>
<style>
.tip {
  font-size: 0.2rem;
  color: #ff0000;
  height: 0.4em;
  line-height: 0.4rem;
}
.el-message {
  min-width: 90%;
}
.incomprops {
  margin-bottom: 0px;
}
.incomprops .el-form-item__content {
  margin-left: 0px !important;
}
.incomprops .el-input__inner {
  border: none !important;
}
.el-input__inner {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.el-input__inner {
  border: none !important;
}
.Changepass {
  background-color: #fff;
  .card-head {
    margin: 0.1rem;
    color: #157df4;
    line-height: 0.6rem;
    font-size: 0.22rem;
    padding-left: 0.1rem;
    border: 1px solid #e3e3e3;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 2px 1px #e3e3e3;
    margin-top: 0.2rem;
    .green {
      color: #94db7c;
    }
  }
  .collection {
    margin: 0.1rem;
    .demo-ruleForm {
      border-top: none;
      padding-bottom: 0.1rem;
      .edits {
        text-align: center;
        margin-top: 0.3rem;
        .btn {
          padding: 0.2rem;
          background: #157df4;
          color: #fff;
          font-size: 0.23rem;
        }
      }
      margin-top: 0.2rem;
      .head {
        line-height: 40px;
        font-weight: bold;
        text-align: center;
        background: #e3e3e3;
        color: #000;
      }
      .collection-table {
        width: 100%;
        tr {
          margin: 0.1rem 0.1rem 0rem 0.1rem;
          border-bottom: 1px solid #e3e3e3;
          line-height: 40px;
          display: flex;
          flex-direction: row;
          td:nth-child(odd) {
            font-size: 0.22rem;
            font-weight: bold;
            flex: 2;
            box-sizing: border-box;
            text-align: right;
            color: #666;
            padding-right: 0.2rem;
          }
          td:nth-child(even) {
            box-sizing: border-box;
            flex: 4;
            input {
              background: #fff;
              font-weight: bold;
              width: 97%;
              border: none;
              color: #454545;
            }
          }
        }
      }
    }
  }
}
</style>
