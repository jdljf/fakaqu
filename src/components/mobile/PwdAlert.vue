<template>
    <div class="pwdshows">
        <div style="text-align:right;width:100%;padding-bottom:15px;">
            <i @click="closepwd" class="el-icon-error" />
        </div>
        <el-form :model="pwdform" ref="pwdform" label-width="80px" class="demo-ruleForm">
            <el-form-item label="安全密码" prop="password" :rules="[
      { required: true, message: '密码不能为空'}]">
                <el-input type="password" v-model="pwdform.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('pwdform')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import api from "@/axios/api";
import SecondAlert from "@/components/mobile/PwdAlert.vue";
export default {
    props:['tag'],
    data() {
        return {
            pwdform: {
                password: ""
            },
            show:false
        };
    },
    methods: {
        closepwd() {
            this.pwdform.password = "";
            this.show = false;
            this.$emit('close',this.show)
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.getcheckConfirmCode();
                } else {
                    this.$message({
                        message: "操作失败",
                        type: "error",
                        duration: 3000
                    });
                    return false;
                }
            });
        },
        getcheckConfirmCode() {
            let data = {
                password: this.pwdform.password
            };
            api.getcheckConfirmCode(data).then(res => {
                const data = res.data;
                if (data.result === 1) {
                    this.show = false;
                    this.pwdform.password = "";
                    this.$emit("callback", this.show);
                } else {
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

<style scoped>
.pwdshows {
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    border-radius: 3px;
    position: fixed;
    z-index: 502;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 140px;
}
</style>
