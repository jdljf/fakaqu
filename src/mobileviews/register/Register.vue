<template>
    <div class="xh-px-register-box">
        <!-- <div class="register-box-title">
            fakaqu
        </div> -->
        <div>
            <div class="back" @click="goBack">
                <i class="iconfont">&#xe61e;</i>
            </div>
            <div class="welcome">
                欢迎注册
            </div>
            <div class="register-box-content">
                <form action="" method="">
                    <div class="register">
                        <input type="text" name="username" id="username" @blur="checkUser" placeholder="用户名" v-model="userInfo.username">
                        <p class="tip">{{msg.name}}</p>
                    </div>
                    <div class="register">
                        <input type="password" name="password" id="password" @blur="checkPwd" placeholder="密码" v-model="userInfo.password">
                        <p class="tip">{{msg.pwd}}</p>
                    </div>
                    <div class="register">
                        <input type="password" name="pwd-confirm" id="pws-confirm" @blur="checkPassword" placeholder="确认密码" v-model="userInfo.password_confirmation">
                        <p class="tip">{{msg.password}}</p>
                    </div>
                    <div class="register">
                        <input type="text" name="email" id="email" placeholder="密保邮箱" @blur="checkEmail" v-model="userInfo.email">
                        <p class="tip">{{msg.email}}</p>
                    </div>
                    <div class="register">
                        <input type="text" name="qq" id="tencent" placeholder="联系qq"  v-model="userInfo.qq">
                        <p class="tip">{{msg.qq}}</p>
                    </div>
                    <div class="register">
                        <input type="text" name="mobile" id="mobile" placeholder="密保手机"  v-model="userInfo.mobile">
                        <p class="tip">{{msg.phone}}</p>
                    </div>
                    <!-- <div class="send-code">
                        <input type="text" name="code" id="code" placeholder="手机验证码" @blur="changeCode" v-model="userInfo.code">
                        <button type="button" @click="sendCode" :disabled="isSend">{{codetext}}</button>
                        <p class="tip">{{msg.code}}</p>
                    </div> -->
                    <!--<input type="button" @click="register" class="register-btn" value="立即注册">-->
                    <input type="button" class="login-btn" @click="register" value="注 册">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";

export default {
  name: "Register",
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        password_confirmation: "",
        email: "",
        qq: "",
        mobile: "",
        code: ""
      },
      msg: {
        name: "",
        pwd: "",
        password: "",
        phone: "",
        email: "",
        qq: "",
        code: ""
      },
      codeTxt: "", // 验证提示
      codetext: "发送验证码", //倒计时提示,
      isSend: false
    };
  },
  methods: {
    changeCode() {
      if (this.userInfo.code != "") {
        this.msg.code = "";
      } else {
        this.msg.code = "请输入验证码";
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    sendCode() {
      let datas = {
        mobile: this.userInfo.mobile
      };
      api.shopcode(datas).then(res => {
        const data = res.data;
        if (data.result === 1) {
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
    checkUser() {
      if (/[\u4E00-\u9FA5]/g.test(this.userInfo.username)) {
        this.msg.name = "用户名不能为中文";
      } else if (
        this.userInfo.username.length < 6 ||
        this.userInfo.username.length > 20
      ) {
        this.msg.name = "用户名长度在 8 到 20 个字符";
      } else {
        this.msg.name = "";
      }
    },
    checkPwd() {
      if (this.userInfo.password === "") {
        this.msg.pwd = "密码不能为空";
      } else {
        this.msg.pwd = "";
      }
    },

    checkPassword: function() {
      if (this.userInfo.password_confirmation === "") {
        this.msg.password = "密码不能为空";
      } else if (
        this.userInfo.password !== this.userInfo.password_confirmation
      ) {
        this.msg.password = "输入密码保持一致";
      } else {
        this.msg.password = "";
      }
    },
    checkEmail() {
      var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (this.userInfo.email === "") {
        this.msg.email = "请输入邮箱";
      } else if (!regEmail.test(this.userInfo.email)) {
        this.msg.email = "邮箱格式不正确";
      } else {
        this.msg.email = "";
      }
    },
    checkQq() {
      var regQq = /^\d{5,10}$/;
      if (this.userInfo.qq === "") {
        this.msg.qq = "请输入qq号";
      } else if (!regQq.test(this.userInfo.qq)) {
        this.msg.qq = "qq输入格式错误";
      } else {
        this.msg.qq = "";
      }
    },
    checkPhone() {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (this.userInfo.mobile === "") {
        this.msg.phone = "手机号不能为空";
      } else if (!myreg.test(this.userInfo.mobile)) {
        this.msg.phone = "请输入有效的手机号码";
      } else {
        this.msg.phone = "";
      }
    },
    register() {
      this.checkUser();
      this.checkPwd();
      this.checkPassword();
      this.checkEmail();
      this.checkQq();
      this.checkPhone();
      for (let prop in this.msg) {
        if (this.msg[prop].length > 0) {
          this.$message({
            type: "warning",
            message: "信息填写不完整",
            customClass: "xh-mb-register-box-msg"
          });
          return;
        }
      }
      api.accoutRegister(this.userInfo).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$store.commit("loggedIn", data.data);
          // alert("注册成功,3秒后跳转至管理页面");
          this.$message({
            type: "warning",
            message: `注册成功,3秒后跳转至管理页面`,
            duration: 3000,
            customClass: "xh-mb-register-box-msg"
          });
          const asyncLink = setTimeout(() => {
            this.$router.push({
              name: "Composite"
            });
            clearTimeout(asyncLink);
          }, 3000);
        } else {
          // alert(`${data.message}`);
          this.$message({
            type: "warning",
            message: `${data.message}`,
            customClass: "xh-mb-register-box-msg"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.xh-mb-register-box-msg {
  min-width: 90% !important;
}
.xh-px-register-box {
  /*overflow-x: hidden;*/
  /*height: 100%;*/
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: url(../../assets/images/login-bg.png) no-repeat;
  background-size: 100% 100%;
  // background-size: cover;
  .back {
    padding: 0.2rem 0 0 0.3rem;
    font-size: 0.5rem;
    color: #ddd;
  }

  .welcome {
    width: 100%;
    margin: 0 0 5%;
    color: #fff;
    font-size: 0.5rem;
    text-align: center;
  }
  .register-box-title {
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    background-color: #409eff;
    font-family: STHupo;
    font-size: 0.5rem;
    color: #fff;
    background-color: #51aefd;
  }
  .register-box-content {
    width: 5.1rem;
    /*height: 0.7rem;*/
    margin: 0 auto;
    padding-bottom: 1rem;
    text-align: left;
    .register {
      width: 5.1rem;
      height: 0.7rem;
      margin: 0 auto;
      margin-bottom: 0.5rem;
      input {
        background-color: #fff;
        border-radius: 0.5rem;
        border: 0.02rem solid #fff;
        color: #666;
        caret-color: red;
        display: inline-block;
        padding-left: 0.3rem;
        font-size: 0.25rem;
        width: 4.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
        font-size: 12px;
      }
      .tip {
        font-size: 0.2rem;
        color: #ff0000;
        height: 0.4em;
        line-height: 0.4rem;
      }
    }

    .send-code {
      width: 5.1rem;
      height: 0.7rem;
      margin-bottom: 0.15rem;
      font-size: 0;
      input {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        color: #666;
        border: none;
        outline: none;
        box-sizing: border-box;
        padding-left: 0.3rem;
        font-size: 0.2rem;
        width: 3.6rem;
        height: 0.75rem;
        line-height: 0.75rem;
        vertical-align: middle;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
        font-size: 12px;
      }
      button {
        width: 1.5rem;
        height: 0.75rem;
        vertical-align: middle;
        text-align: center;
        line-height: 0.75rem;
        border: none;
        outline: none;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        font-size: 0.2rem;
        color: #fff;
        background-color: #51aefd;
      }
      .tip {
        font-size: 0.2rem;
        color: #ff0000;
        height: 0.4em;
        line-height: 0.4rem;
      }
    }

    .login-btn {
      width: 5.06rem;
      height: 0.78rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.25rem;
      color: #fff;
      border: 0.02rem solid #fff;
      background: transparent;
      border-radius: 0.4rem;
      margin-top: 0.3rem;
    }
    .register-btn {
      display: block;
      margin: 0 auto;
      width: 5.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      outline: none;
      border: none;
      font-size: 0.25rem;
      color: #fff;
      border-radius: 0.1rem;
      background-color: #409eff;
    }
    .register-btn {
      margin-top: 0.4rem;
    }
    .forget-pws {
      text-align: center;
      line-height: 1rem;
    }
  }
}
</style>
