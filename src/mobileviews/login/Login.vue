<template>
    <div class="xh-mb-login-box">
        <div class="welcome">
            <img src="../../assets/images/welcome.png">
        </div>
        <div class="login-box-content">
            <form action="">
                <div class="login">
                    <input type="text" prefix-icon="el-icon-third-person2" name="username" id="username" placeholder="用户名" @blur="checkUser" v-model="userInfo.username">
                    <p class="empty-tip">{{msg.name}}</p>
                </div>
                <div class="login">
                    <input type="password" name="password" id="password" placeholder="密码" @blur="checkPwd" v-model="userInfo.password">
                    <p class="empty-tip">{{msg.pwd}}</p>
                </div>
                <input type="button" class="login-btn" @click="adminLogin" value="登 录">
                <!-- <input type="button" class="register-btn" value="商户注册" > -->
            </form>
            <div class="forget-pws">
                <a href="javascript:;" @click="register">
                    <span style="display: inline-block;color:#fff">立即注册</span>
                </a>
                <span style="color:#fff">|</span>
                <a href="javascript:;" class="find-pws" @click="findpwd">
                    <span style="display: inline-block;color:#fff">忘记密码</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";

export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      loginStatus: false,
      msg: {
        name: "",
        pwd: ""
      }
    };
  },
  methods: {
    adminLogin() {
      if (this.userInfo.username === "" || this.userInfo.password === "") {
        return;
      }
      if (this.loginStatus) {
        return;
      }
      this.loginStatus = true;
      api.userLogin(this.userInfo).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.loginStatus = false;
          this.$store.commit("loggedIn", data.data);
          this.$router.push({
            path: "/composite/user"
          });
        } else {
          // alert(`${data.message}`);
          this.$message({
            type: "warning",
            message: `${data.message}`,
            customClass: "xh-mb-login-box-msg"
          });
          const timer = setTimeout(() => {
            this.loginStatus = false;
            clearTimeout(timer);
          }, 2500);
        }
      });
    },
    register() {
      this.$router.push({
        name: "register"
      });
    },
    findpwd() {
      this.$router.push("/findpwd");
    },
    checkUser() {
      if (
        this.userInfo.username === "" ||
        this.userInfo.username.length === 0
      ) {
        this.msg.name = "账号不能为空";
      } else {
        this.msg.name = "";
      }
    },
    checkPwd() {
      if (
        this.userInfo.password === "" ||
        this.userInfo.password.length === 0
      ) {
        this.msg.pwd = "密码不能为空";
      } else {
        this.msg.pwd = "";
      }
    }
  },
  watch: {}
};
</script>
<style>
.xh-mb-login-box-msg {
  min-width: 90% !important;
}
</style>

<style scoped lang="scss">
.xh-mb-login-box {
  overflow: hidden;
  height: 100vh;
  position: relative;
  background: url(../../assets/images/login-bg.png) no-repeat;
  background-size: 100% 100%;
  .welcome {
    width: 100%;
    margin: 20% 0 15%;
    img {
      width: 100%;
    }
  }
  .login-box-title {
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    background-color: #409eff;
    font-family: STHupo;
    font-size: 0.5rem;
    color: #fff;
  }
  .login-box-content {
    width: 100%;
    height: 4rem;
    border-radius: 4px;
    text-align: center;
    .login {
      width: 5.1rem;
      height: 0.7rem;
      margin: 0 auto;
      margin-bottom: 0.5rem;
      text-align: left;
      input {
        background-color: #fff;
        border-radius: 0.5rem;
        border: 0.02rem solid #fff;
        color: #666;
        display: inline-block;
        padding-left: 0.3rem;
        font-size: 0.25rem;
        width: 4.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
      }
      input::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #ccc;
        /* placeholder字体大小  */
        font-size: 12px;
      }
      .empty-tip {
        font-size: 0.2rem;
        color: #ff0000;
        height: 0.4rem;
        line-height: 0.4rem;
      }
    }
    .login-btn,
    .register-btn {
      width: 5.06rem;
      height: 0.78rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.25rem;
      color: #fff;
      border: 0.02rem solid #fff;
      background: transparent;
      border-radius: 0.4rem;
    }
    .register-btn {
      margin-top: 0.2rem;
    }
    .forget-pws {
      margin-top: 0.2rem;
      text-align: center;
      line-height: 1rem;
      height: 1rem;
      font-size: 0.25rem;

    }
  }
}
</style>
