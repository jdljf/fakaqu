<template>
    <div class="findpwd-box">
        <div class="back" @click="goBack">
            <i class="iconfont">&#xe61e;</i>
        </div>
        <div class="findpwd-box-bottom">
            <el-form ref="findpwdForm" :rules="rules" :model="userInfo">
                <!-- <el-form-item prop="mobile" class="info">
                    <el-input type="text" round auto-complete="off" placeholder="手机" prefix-icon="el-icon-phone" v-model="userInfo.mobile"></el-input>
                </el-form-item> -->
                <el-form-item prop="email" class="info">
                    <el-input type="text" round auto-complete="off" placeholder="邮箱" prefix-icon="el-icon-message" v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item prop="newpwd" class="info">
                    <el-input type="password" round auto-complete="off" placeholder="密码" prefix-icon="el-icon-more" v-model="userInfo.newpwd"></el-input>
                </el-form-item>
                <el-form-item prop="newpwd_confirmation" class="info">
                    <el-input type="password" round auto-complete="off" placeholder="确认密码" prefix-icon="el-icon-more" v-model="userInfo.newpwd_confirmation"></el-input>
                </el-form-item>
                <div class="checkcode-box" style="margin-bottom:0.3rem">
                    <div class="send-code">
                        <input type="text" name="code" id="code" placeholder="手机验证码" @blur="changeCode" v-model="userInfo.code">
                        <button type="button" @click="sendCode" :disabled="isSend" :class="{'disabled':isSend}">{{codetext}}</button>
                    </div>
                    <p class="code-tip">{{codeTxt}}</p>
                </div>
            </el-form>
            <div class="findpwd-btn" @click="findPwd('findpwdForm')">
                确认修改
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";

export default {
    name: "findpwd",
    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号"));
            } else {
                if (this.userInfo.mobile.length !== 11) {
                    callback(new Error("请输入有效手机号码!"));
                }
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (
                    this.userInfo.newpwd.length < 6 ||
                    this.userInfo.newpwd.length > 32
                ) {
                    callback(new Error("密码个数为6-32位"));
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.userInfo.newpwd_confirmation) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            rules: {
                newpwd: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ],
                newpwd_confirmation: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 32,
                        message: "长度在 6 到 32 个字符",
                        trigger: ["blur", "change"]
                    },
                    { validator: validatePass2, trigger: "blur" }
                ],
                // mobile: [
                //     {
                //         required: true,
                //         message: "请输入绑定手机号",
                //         trigger: "blur"
                //     },
                //     { validator: validatePhone, trigger: "blur" }
                // ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱地址",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ]
            },
            userInfo: {
                // mobile: "",
                email: "",
                newpwd: "",
                newpwd_confirmation: "",
                code: ""
            },
            codeTxt: "",
            codetext: "发送验证码",
            isSend: false
        };
    },
    methods: {
        changeCode() {
            if (this.userInfo.code != "") {
                this.codeTxt = "";
            } else {
                this.codeTxt = "请输入验证码";
            }
        },
        sendCode() {
            let datas = {
                params: {
                    email: this.userInfo.email,
                    type: "reset_pwd"
                }
            };
            api.getemilcode(datas).then(res => {
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
        goBack() {
            this.$router.go(-1);
        },

        findPwd(formName) {
            if (this.userInfo.code == "") {
                this.$message({
                    message: "填写信息不符合规则",
                    type: "error",
                    duration: 3000
                });
            } else {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (
                            this.userInfo.newpwd ==
                            this.userInfo.newpwd_confirmation
                        ) {
                            api.resetpwd(this.userInfo).then(res => {
                                const data = res.data;
                                if (data.result == 1) {
                                    this.$router.push({
                                        name: "home"
                                    });
                                } else {
                                    this.$message({
                                        message: `${data.message}`,
                                        type: "error",
                                        duration: 3000
                                    });
                                    // return;
                                }
                            });
                        } else {
                            this.$message({
                                message: "两次输入密码不同",
                                type: "error",
                                duration: 3000
                            });
                        }
                    } else {
                        this.$message({
                            message: "填写信息不符合规则",
                            type: "error"
                        });
                        return false;
                    }
                });
            }
        }
    },
    mounted() {}
};
</script>
<style>
.el-input__inner {
    height: 0.8rem;
    border-radius: 0.4rem;
    color: #666;
}
input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 0.25rem;
}
</style>

<style scoped lang="scss">
.findpwd-box {
    overflow: hidden;
    height: 100vh;
    position: relative;
    background: url(../../assets/images/login-bg.png) no-repeat;
    background-size: 100% 100%;
    .back {
        padding: 0.3rem;
        font-size: 0.5rem;
        color: #ddd;
    }
    .findpwd-box-bottom {
        padding: 0.8rem 0.4rem 0 0.4rem;
        border-radius: 0.1rem;
        .send-code {
            height: 0.7rem;
            font-size: 0;
            input {
                border-top-left-radius: 0.5rem;
                border-bottom-left-radius: 0.5rem;
                color: #666;
                border: none;
                outline: none;
                box-sizing: border-box;
                padding-left: 0.3rem;
                font-size: 0.25rem;
                width: 3.8rem;
                height: 0.75rem;
                line-height: 0.75rem;
                vertical-align: middle;
            }
            .disabled {
                color: #909399;
                background-color: #ccc;
            }
            button {
                width: 1.8rem;
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
        }
        .code-tip {
            color: #f56c6c;
            font-size: 12px;
            padding-top: 0.15rem;
        }
    }

    .findpwd-btn {
        width: 100%;
        background: transparent;
        color: #fff;
        text-align: center;
        line-height: 0.75rem;
        border: 1px solid #fff;
        border-radius: 0.375rem;
    }
}
</style>
