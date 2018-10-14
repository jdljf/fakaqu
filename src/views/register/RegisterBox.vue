<template>
    <div class="register-box">
        <div class="register-box-title">
            fakaqu
        </div>
        <div class="register-box-bottom">
            <el-form  ref="registerForm" :rules="rules" :model="registerForm" >
                <el-form-item  prop="username">
                    <el-input type="text" auto-complete="on" placeholder="账号" v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password"  auto-complete="on" placeholder="密码" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="password_confirmation" >
                    <el-input type="password" auto-complete="on" placeholder="确认密码" v-model="registerForm.password_confirmation"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                <el-input type="text" auto-complete="on" placeholder="密保邮箱" v-model="registerForm.email" ></el-input>
                </el-form-item>
                <el-form-item  prop="qq">
                    <el-input type="text" auto-complete="on" placeholder="联系QQ" v-model="registerForm.qq"></el-input>
                </el-form-item>
                <el-form-item  prop="mobile">
                    <el-input type="text" auto-complete="on" placeholder="密保手机"  v-model="registerForm.mobile"></el-input>
                </el-form-item>
                <!-- <el-form-item  prop="code">
                    <el-input type="text" auto-complete="on" placeholder="手机验证码"  v-model="registerForm.code"></el-input>

                    <button type="button" @click="sendCode" :disabled="isSend" class="getIphoneCode" style="border: none"> {{codetext}}</button>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" class="px-register" @click="registerAction('registerForm')">立即注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";
export default {
  name: "RegisterBox",
  data() {
    const checkname = (rule, value, callback) => {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error("用户名不能为中文!"));
        } else {
          callback();
        }
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.password_confirmation !== "") {
          this.$refs.registerForm.validateField("password_confirmation");
        }
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (this.registerForm.mobile.length !== 11) {
          callback(new Error("请输入有效手机号码!"));
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        qq: "",
        mobile: "",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur"
          },
          { validator: checkname, trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirmation: [{ validator: validatePass2, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        // qq: [
        //   { required: true, message: "请输入QQ号", trigger: "blur" },
        //   { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        // ],
        // mobile: [
        //   { required: true, message: "请输入手机号", trigger: "blur" },
        //   { validator: validatePhone, trigger: "blur" }
        // ],
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      isSend: false,
      codetext: "发送验证码" //倒计时提示
      // timer: 3
    };
  },
  computed: {},
  watch: {},
  methods: {
    countdown() {
      var that = this;
      var nums = 60;
      var timer = setInterval(function() {
        nums--;
        if (nums <= 0) {
          clearInterval(timer);
          that.codetext = "重新发送";
          that.isSend = false;
        } else {
          that.codetext = nums + "后重新发送";
          that.isSend = true;
        }
      }, 1000);
    },
    sendCode() {
      let datas = {
        mobile: this.registerForm.mobile
      };
      api.shopcode(datas).then(res => {
        const data = res.data;
        if (data.result === 1) {
          //dosomething
          this.$message({
            message: "发送成功",
            type: "success",
            duration: 2000
          });
          this.countdown();
        } else {
          this.$message({
            message: "发送失败",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    registerAction(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.accoutRegister(this.registerForm).then(res => {
            const data = res.data;
            if (data.result === 1) {
              this.$store.commit("loggedIn", data.data);
              this.$message({
                message: "注册成功,3秒后跳转至管理页面",
                type: "success",
                duration: 3000
              });
              const asyncLink = setTimeout(() => {
                this.$router.push({
                  name: "Composite"
                });
                clearTimeout(asyncLink);
              }, 3000);
            } else {
              this.$message({
                message: `${data.message}`,
                type: "warning"
              });
            }
          });
        } else {
          this.$message({
            message: "注册信息不符合规则",
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style  lang="scss">
.register-box {
  /*position: absolute;*/
  /*top: 110px;*/
  /*left: 22%;*/
  margin: 30px auto;
  width: 500px;
  height: 584px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  box-shadow: 0px 4px 30px 0px rgba(30, 76, 178, 1);
  .el-input__inner {
    border-radius: 0;
  }
  .register-box-title {
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: rgba(49, 127, 227, 1);
    border-radius: 4px 4px 0px 0px;
    font-size: 30px;
    font-family: STHupo;
    color: rgba(255, 255, 255, 1);
  }
  .el-form-item {
    margin: 20px 0px 0px 0px;
  }
  .getIphoneCode {
    position: absolute;
    right: 0px;
    bottom: 8px;
    width: 93px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: linear-gradient(
      180deg,
      rgba(81, 174, 253, 1),
      rgba(50, 155, 244, 1)
    );
    border-radius: 8px;
  }
  .register-box-bottom {
    height: 504px;
    padding: 0px 130px;
    input {
      border: none;
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .px-register {
    width: 240px;
    height: 50px;
    background: rgba(24, 105, 255, 1);
    border-radius: 4px;
    font-size: 18px;
    margin-top: 20px;
    transition: all 0.6s;
    &:hover {
      transform: scale(1.2);
      transform: translateY(-4px);
      box-shadow: 0px 0px 5px 2px #f6f6f6;
      opacity: 0.9;
    }
  }
}
</style>
