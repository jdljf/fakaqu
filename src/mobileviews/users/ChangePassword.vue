<template>
  <div id="ChangePassword">
    <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()">{{passtit}}</x-header>
    <div class="tips">安全提示： 建议您定期更改密码以保护账户安全。密码要牢记在心里，不要透露给别人，建议您不要使用跟其他平台一样的帐号密码，谨防帐号被盗取</div>

    <el-form :model="passruleForm2" status-icon :rules="rules2" ref="passruleForm2" label-width="1.4rem" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldpwd">
        <el-input type="password" v-model="passruleForm2.oldpwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="passruleForm2.newpwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newpwd_confirmation">
        <el-input type="password" v-model="passruleForm2.newpwd_confirmation" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-form class="demo-ruleForm">
      <el-form-item>
        <el-button style="width: 100%;" type="primary" v-loading="listLoading" @click="submitForm('passruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
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
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("年龄不能为空"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error("请输入数字值"));
                } else {
                    if (value < 18) {
                        callback(new Error("必须年满18岁"));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (this.passruleForm2.newpwd_confirmation !== "") {
                    this.$refs.passruleForm2.validateField(
                        "newpwd_confirmation"
                    );
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.passruleForm2.newpwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            listLoading: false,
            passtit: "修改密码",
            passruleForm2: {
                newpwd: "",
                newpwd_confirmation: "",
                oldpwd: ""
            },
            rules2: {
                oldpwd: [
                    {
                        required: true,
                        message: "请输入旧密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 32,
                        message: "密码长度是6-32位",
                        trigger: "blur"
                    }
                ],
                newpwd: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" },
                    {
                        min: 6,
                        max: 32,
                        message: "密码长度是6-32位",
                        trigger: "blur"
                    }
                ],
                newpwd_confirmation: [
                    { validator: validatePass2, trigger: "blur" }
                ]
            }
        };
    },
    components: {
        MbHeader,
        XHeader,
        TabBar,
        LoadMore
    },
    methods: {
        bannerBack() {
            this.$router.push({
                name: "Users"
            });
        },
        logout() {
            this.$store.commit("loggedOut");
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.uodatpwss();
                } else {
                    return false;
                }
            });
        },
        uodatpwss() {
            this.listLoading = true;
            api.updatapwd(this.passruleForm2).then(res => {
                const data = res.data;
                if (data.result === 1) {
                    this.$message({
                        message: "密码修改成功，请重新登录",
                        type: "success",
                        duration: 3000
                    });
                    const asyncLink = setTimeout(() => {
                        this.logout();
                        clearTimeout(asyncLink);
                    }, 3000);
                    this.listLoading = false;
                    this.passruleForm2.newpwd = "";
                    this.passruleForm2.newpwd_confirmation = "";
                    this.passruleForm2.oldpwd = "";
                    this.logout();
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
    }
};
</script>
<style>
.el-message {
    min-width: 90%;
}
</style>

<style scoped lang="scss">
@keyframes passinit {
    0% {
        transform: translateY(-200px);
        opacity: 0;
    }
    50% {
        transform: translateY(0px);
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
#ChangePassword {
    background-color: #fff;
    position: relative;
    .tips {
        padding: 10px 20px;
        font-size: 0.26rem;
        line-height: 0.5rem;
        color: #58a5fc;
    }
    .demo-ruleForm {
        padding: 0 20px;
    }
    .login-box-title {
        height: 1.6rem;
        line-height: 1.6rem;
        text-align: center;
        background-color: #317fe3;
        font-family: STHupo;
        font-size: 0.5rem;
        color: #fff;
    }
}
</style>