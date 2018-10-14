<template>
    <div>
        <div class="security">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()"   ><span style="font-size: 0.32rem;">{{security}}</span></x-header>
            <div class="card-head">
                <div>安全码开启后，分类、商品、卡密的编辑和删除需要验证安全码才能操作！安全度更高。 </div>
            </div>
            <div class="security-context">
                <el-form :model="ruleForm3" status-icon :rules="rules2" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
                    <table style="width:100%" class="collection-tables">
                        <tr>
                            <td>二次验证:</td>
                            <td>
                                <el-radio-group v-model="ruleForm3.second_confirm"  size="medium">
                                    <el-radio @change="chagetext" border :label="1"> {{$t('security.open')}}</el-radio>
                                    <el-radio @change="chagetext"  border :label="0"> {{$t('security.close')}}</el-radio>
                                </el-radio-group>
                            </td>
                        </tr>
                        <tr style="line-height:70px;" v-if="changeshow">
                            <td>安全密码:</td>
                            <td>
                                <el-form-item  class="qq-props" prop="confirm_code">
                                    <input class="inp"  placeholder="请输入安全密码" style="" type="password"  v-model="ruleForm3.confirm_code" />
                                </el-form-item>
                            </td>
                        </tr>
                        <tr style="line-height:70px;" v-if="changeshow" >
                            <td>确认安全密码:</td>
                            <td>
                                <el-form-item class="qq-props" prop="confirm_code_confirmation">
                                    <input class="inp" style="" placeholder="请确认安全密码" type="password"  v-model="ruleForm3.confirm_code_confirmation" />
                                </el-form-item>
                            </td>
                        </tr>
                        <tr style="line-height:70px;">
                            <td>验证码:</td>
                            <td>
                                <el-form-item class="qq-props" prop="code">
                                    <input class="inp" style="" placeholder="请输入验证码" type="password"  v-model="ruleForm3.code" />
                                </el-form-item>
                            </td>
                        </tr>
                    </table>
                    <div style="text-align:left;margin-bottom:.2rem;width:100%">
                        <el-button style="width:100%"  @click="getemilcodes" :disabled="disabled" type="success">{{codetext}}</el-button>
                    </div>
                    <el-button style="width:100%" type="primary" @click="submitForm('ruleForm3')" v-loading="listLoading">{{$t('security.submit')}}</el-button>

                </el-form>
            </div>
        </div>
        <TabBar></TabBar>
    </div>

</template>
<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import TabBar from "@/components/mobile/TabBar";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm3.confirm_code_confirmation !== "") {
          this.$refs.ruleForm3.validateField("confirm_code_confirmation");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm3.confirm_code) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      security: "安全设置",
      codetext: "发送验证码",
      disabled: false,
      mobile: "",
      email:'',
      listLoading: false,
      changeshow: true,
      ruleForm3: {
        confirm_code: "",
        confirm_code_confirmation: "",
        code: "",
        second_confirm: 1
      },
      rules2: {
        confirm_code: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 16, message: "密码6-16位数", trigger: "blur" }
        ],
        confirm_code_confirmation: [
          { validator: validatePass2, trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },

  components: {
    MbHeader,
    XHeader,
    LoadMore,
    TabBar,
  },
  methods: {
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    getemilcodes() {
      //发送获取验证码的请求
      let mobile = this.mobile;
      // var code=this.ruleForm3.code;
     let datas = {
        params:{
        email:this.email,
        type:'safity_code'
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
          this.editsecurity();
        } else {
          return false;
        }
        localStorage.setItem('Second_Confirm',this.ruleForm3.second_confirm)
      });
    },
    getsecurity() {
      api.getsecurity().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.mobile = data.data.mobile;
          this.ruleForm3.second_confirm = parseInt(data.data.second_confirm);
          if (this.ruleForm3.second_confirm === 1) {
            this.changeshow = true;
          } else {
            this.changeshow = false;
          }
        }
      });
    },
    editsecurity() {
      this.listLoading = true;
      api.editsecurity(this.ruleForm3).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoading = false;
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
          this.listLoading = false;
        }
      });
    },
    chagetext(e) {
      if (this.ruleForm3.second_confirm === 1) {
        this.changeshow = true;
        this.ruleForm3.code = "";
        this.ruleForm3.confirm_code = "";
        this.ruleForm3.confirm_code_confirmation = "";
      } else {
        this.ruleForm3.code = "";
        this.changeshow = false;
        this.ruleForm3.confirm_code = "";
        this.ruleForm3.confirm_code_confirmation = "";
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    this.email=this.$store.state.user.email;
    this.getsecurity();
  }
};
</script>
<style>
.el-message{
  min-width: 90%;
}
.qq-props {
  margin-bottom: 0px;
}
.qq-props .el-form-item__content {
  margin-left: 0px !important;
}
.security .el-radio__input {
  padding-left: 0.1rem;
}
.security .el-radio,
.el-radio--medium.is-bordered .el-radio__label {
  font-size: 0.14rem !important;
  padding-left: 0;
}
.security .el-radio__input {
  padding-left: 0.1rem;
}
.security .el-radio,
.el-radio--medium.is-bordered .el-radio__label {
  font-size: 0.28rem !important;
  padding-left: 0;
}
</style>

<style lang="scss" scoped>
.security {
  background-color:#fff;
  padding-bottom: 40px;
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
  }
  .security-context {
    margin: 0.1rem;
    padding: 0.2rem;
    margin-top: 0.3rem;
    .collection-tables{
      tr{
       width: 100%;
        td:nth-child(odd){
         width: 40%;
         text-align: right;
         padding-right: .1rem;
        }
         td:nth-child(even){
         width: 70%;
         
         input{
           padding-left: .1rem;
           color: #c0c4cc;
           font-size: .25rem;
           border-radius: 8px;
           height:.5rem;border:1px solid #eee;width:100%;
         }
        }
      }
    }
    
  }
}
</style>
