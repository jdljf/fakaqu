
<template>
    <div id="Security">
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{$t('security.title')}}</span>
  </div>
   <el-col style="width:100%;margin-bottom:20px;" :span="8">
    <el-card  style="color:#56A5FC" shadow="always">
     {{$t('security.titleone')}}
    </el-card>
  </el-col>

  <el-form :model="ruleForm3" status-icon :rules="rules2" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
    <el-form-item :label="$t('security.Secondaryverification')">
    <el-radio-group v-model="ruleForm3.second_confirm"  size="medium">
      <el-radio @change="chagetext" border :label="1"> {{$t('security.open')}}</el-radio>
      <el-radio @change="chagetext"  border :label="0"> {{$t('security.close')}}</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item v-if="changeshow" :label="$t('security.SecurityCode')" prop="confirm_code">
    <el-input type="password" style="width:30%"  v-model="ruleForm3.confirm_code" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item v-if="changeshow" :label="$t('security.Confirmsecuritypassword')" prop="confirm_code_confirmation">
    <el-input type="password" style="width:30%" v-model="ruleForm3.confirm_code_confirmation" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item :label="$t('security.Verificationcode')" prop="code">
    <el-input style="width:30%" v-model.number="ruleForm3.code"></el-input>
     <el-button style="margin-left:20px" @click="getemilcodes" :disabled="disabled" type="success">{{codetext}}</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm3')" v-loading="listLoading">{{$t('security.submit')}}</el-button>
    
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
        if (value === '') {
          return callback(new Error('验证码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm3.confirm_code_confirmation !== '') {
            this.$refs.ruleForm3.validateField('confirm_code_confirmation');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm3.confirm_code) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        codetext:'发送验证码',
        disabled:false,
        email:'',
        mobile:'',
        listLoading: false,
        changeshow:true,
        ruleForm3: {
          confirm_code: '',
          confirm_code_confirmation: '',
          code: '',
          second_confirm:1
        },
        rules2: {
          confirm_code: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 16,  message: "密码6-16位数", trigger: "blur" }

          ],
          confirm_code_confirmation: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          code:[
            { required: true, message: "请输入验证码", trigger: "blur" },

          ]
        
        }
      };
    },
    methods: {
      getemilcodes(){
    //发送获取验证码的请求
      let mobile=this.mobile;
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
        }else{
            this.$message({
            message: "发送失败",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    sendCodeAnimation() {
          var that=this;
          that.disabled=true;
           var  nums=60;
           var timer = setInterval(function () {
             nums--;
             if (nums <= 0) {
               clearInterval(timer);
              that.codetext="重新发送";
                that.disabled=false;
             } else {
               that.codetext=nums+"s重新发送";
                 that.disabled=true;
             }
           }, 1000)
     },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        localStorage.setItem('Second_Confirm',this.ruleForm3.second_confirm)
          if (valid) {
            this.editsecurity();
          } else {
            return false;
          }
        });
        
      },
      getsecurity() {
      api.getsecurity().then(res => {
        const data = res.data;
        if (data.result === 1) {
           this.ruleForm3.second_confirm=parseInt(data.data.second_confirm);
           if(this.ruleForm3.second_confirm===1){
             this.changeshow=true;
           }else{
              this.changeshow=false;
           }
        }
      });
    },
     editsecurity() {
       this.listLoading=true;
      api.editsecurity(this.ruleForm3).then(res => {
        const data = res.data;
        if (data.result === 1) {
           this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
         this.listLoading=false;
        }else{
           this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
         this.listLoading=false;
        }
      });
    },
      chagetext(e){
        if(this.ruleForm3.second_confirm===1){
        this.changeshow=true;
        this.ruleForm3.code="";
        this.ruleForm3.confirm_code="";
        this.ruleForm3.confirm_code_confirmation="";
        }else{
        this.ruleForm3.code="";
        this.changeshow=false;
        this.ruleForm3.confirm_code="";
        this.ruleForm3.confirm_code_confirmation="";
        }
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
       this.getsecurity();
       this.email=this.$store.state.user.email;

       
    }
  }
</script>

<style lang="scss">
@keyframes setinit {
  0%{
    transform: translateY(-200px);
    opacity: 0;
  }
  50%{
    transform: translateY(0px);
    opacity: .5
  }
  100%{
    opacity: 1;
  }
}
#Security{
    animation:setinit 1s ; 
    padding:20px;
}
</style>


