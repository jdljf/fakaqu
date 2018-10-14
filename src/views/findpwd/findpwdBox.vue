<template>
    <div class="findpwd-box">
        <div class="findpwd-box-title">
            fakaqu
        </div>
        <div class="findpwd-box-bottom">
            <el-form ref="findpwdForm" :rules="rules" :model="userInfo">
                <el-form-item prop="email" class="info">
                    <el-input type="text" round auto-complete="on" placeholder="邮箱" prefix-icon="el-icon-message" v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item prop="newpwd" class="info">
                    <el-input type="password" round auto-complete="off" placeholder="密码" prefix-icon="el-icon-more" v-model="userInfo.newpwd"></el-input>
                </el-form-item>
                <el-form-item prop="newpwd_confirmation" class="info">
                    <el-input type="password" round auto-complete="off" placeholder="确认密码" prefix-icon="el-icon-more" v-model="userInfo.newpwd_confirmation"></el-input>
                </el-form-item>

                <div class="checkcode-box">
                    <div class="send-code">
                        <input type="text" name="code" id="code" placeholder="手机验证码" @blur="changeCode" v-model="userInfo.code">
                        <button type="button" @click="sendCode" :disabled="isSend" :class="{'disabled':isSend}">{{codetext}}</button>
                    </div>
                    <p class="code-tip">{{codeTxt}}</p>
                </div>
                <div class="findpwd-btn" @click="findPwd('findpwdForm')">
                    确认修改
                </div>

                <div style="height: 30px;display: flex;padding-top:10px;">
                    没有账号？
                    <a href="/register" class="find-pw">
                        <span style="display: inline-block">立即注册</span>
                    </a>
                </div>
            </el-form>
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
                // ]
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
                email: "",
                newpwd: "",
                newpwd_confirmation: "",
                code: ""
            },
            codeTxt: "", // 验证提示
            codetext: "发送验证码", //倒计时提示
            isSend: false
        };
    },
    methods: {
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
        changeCode() {
            if (this.userInfo.code != "") {
                this.codeTxt = "";
            } else {
                this.codeTxt = "请输入验证码";
            }
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
                        api.resetpwd(this.userInfo).then(res => {
                            const data = res.data;
                            if (data.result === 1) {
                                this.$message({
                                    message: "密码重置成功，请重新登录",
                                    type: "success",
                                    duration: 3000
                                });
                                const asyncLink = setTimeout(() => {
                                    this.$router.push({
                                        name: "home"
                                    });
                                    clearTimeout(asyncLink);
                                }, 3000);
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

<style scoped lang="scss">
.findpwd-box {
    margin: 0 auto;
    margin-top: 30px;
    width: 320px;
    height: 520px;
    position: relative;
    overflow: hidden;
    .findpwd-box-title {
        width: 320px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background: rgba(49, 127, 227, 1);
        font-size: 30px;
        font-family: STHupo;
        color: rgba(255, 255, 255, 1);
    }
    .findpwd-box-bottom {
        width: 270px;
        height: 400px;
        background-color: #fff;
        padding: 50px 25px 0px 25px;
        border-radius: 4px;
        .checkcode-box {
            color: #fff;
            border: none;
            font-size: 16px;
            margin-bottom: 20px;
            .send-code {
                height: 40px;
                font-size: 0;
                input {
                    border: 1px solid #dcdfe6;
                    color: #666;
                    outline: none;
                    box-sizing: border-box;
                    padding-left: 10px;
                    font-size: 12px;
                    width: 180px;
                    height: 40px;
                    line-height: 40px;
                    vertical-align: middle;
                }
                input::-webkit-input-placeholder {
                    color: #ccc;
                    font-size: 14px;
                }
                button {
                    width: 90px;
                    height: 40px;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 40px;
                    border: none;
                    outline: none;
                    font-size: 12px;
                    color: #fff;
                    background-color: #51aefd;
                }
                .disabled {
                    color: #FFF;
                    background-color: #BBB;
                }
            }
            .code-tip {
                color: #f56c6c;
                font-size: 12px;
                padding-top: 5px;
            }
        }
        .findpwd-btn {
            width: 100%;
            background: rgba(49, 127, 227, 1);
            color: #fff;
            text-align: center;
            line-height: 40px;
            border: 1px solid #fff;
            // border-radius: 0.4rem;
        }
    }
}
</style>
