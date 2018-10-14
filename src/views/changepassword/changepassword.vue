<template>
  <div id="changepassword">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('password.title')}}</span>
      </div>
      <el-col style="width:100%;margin-bottom:20px;">
        <el-card shadow="always" style="color:#58A5FC">
          {{$t('password.titleone')}}
        </el-card>
      </el-col>

      <el-form :model="passruleForm2" status-icon :rules="rules2" ref="passruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('password.oldpassword')" prop="oldpwd">
          <el-input type="password" v-model="passruleForm2.oldpwd" style="width:30%" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('password.newpassword')" prop="newpwd">
          <el-input type="password" v-model="passruleForm2.newpwd" style="width:30%" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('password.confirmpassword')" prop="newpwd_confirmation">
          <el-input type="password" v-model="passruleForm2.newpwd_confirmation" style="width:30%" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-loading="listLoading" @click="submitForm('passruleForm2')">{{$t('password.submit')}}</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>
<script>
import api from "@/axios/api";
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
    methods: {
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
<style lang="scss">
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
#changepassword {
    animation: passinit 1s;
    padding: 20px;
}
</style>

