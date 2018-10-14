<template>
  <div class="login-box">
    <div class="login-box-title">
      fakaqu
    </div>
    <LangSelect></LangSelect>
    <div class="login-box-bottom">
      <div v-if="!isToken">
        <el-form ref="loginForm" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名" prefix-icon="el-icon-third-person2"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码" prefix-icon="el-icon-third-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="adminLogin">{{ $t('login.btn') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else style="padding: 50px 0">
        <el-button type="primary" class="login-btn" @click="checkLogin">已登录,进入管理中心</el-button>
      </div>
      <div style="height: 30px;display: flex">
        <a href="/findpwd" class="find-pw">
          <span style="display: inline-block">{{ $t('login.fps') }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import LangSelect from "@/components/LangSelect";
import api from "@/axios/api";
import { getToken, setToken, removeToken } from "../../libs/token";
export default {
    name: "Login",
    components: {
        LangSelect
    },
    data() {
        return {
            isToken: false,
            loginStatus: false,
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        // console.log(process.env.VUE_APP_MODE);
        if (getToken()) {
            this.isToken = true;
        }
    },
    methods: {
        checkLogin() {
            this.$router.push({
                name: "User"
            });
        },
        adminLogin() {
            if (
                this.loginForm.username === "" ||
                this.loginForm.password === ""
            ) {
                return;
            }
            if (this.loginStatus) {
                return;
            }
            this.loginStatus = true;
            api.userLogin(this.loginForm).then(res => {
                const data = res.data;
                this.loginStatus = false;
                if (data.result === 1) {
                    this.$store.commit("loggedIn", data.data);
                    this.$router.push({
                        name: "User"
                    });
                } else {
                    this.$message({
                        message: `${data.message}`,
                        type: "warning",
                        duration: 3000
                    });
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
/*@import "@/assets/css/px2rem.scss";*/
@keyframes fadeInDown {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    to {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
}
.login-box {
    animation: fadeInDown 1s;
    margin-top: 50px;
    float: right;
    box-shadow: 0px 4px 30px 0px rgba(30, 76, 178, 1);
    border-radius: 4px;
    width: 320px;
    height: 400px;
    position: relative;
    .count-icon {
    }

    .login-box-title {
        width: 320px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: rgba(49, 127, 227, 1);
        border-radius: 4px 4px 0px 0px;
        font-size: 30px;
        font-family: STHupo;
        color: rgba(255, 255, 255, 1);
    }
    .login-box-bottom {
        height: 250px;
        background-color: #fff;
        padding: 50px 25px 0px 25px;
        border-radius: 4px;
        .el-input__inner {
            padding-left: 25px;
        }
    }

    .login-btn {
        background: #317fe3;
        width: 270px;
        transition: all 0.7s;
        &:hover {
            transform: scale(1.2);
            transform: translateY(-4px);
            box-shadow: 0px 0px 5px 2px #f6f6f6;
            opacity: 0.9;
        }
    }
    .find-pw {
        font-size: 14px;
        /*width: 140px;*/
        /*height: 20px;*/
        margin: auto;
        display: block;
        /*position: absolute;*/
        /*bottom: 50px;*/
        /*left: 86px;*/
        line-height: 20px;
        text-align: center;
        border-bottom: 1px solid #468ae5;
    }
}
</style>
