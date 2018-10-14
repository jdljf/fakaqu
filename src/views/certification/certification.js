import api from "@/axios/api";
import qs from "qs";
export default {
  data() {
    // const bank_account =(rule, value, callback)=> {
    //   if (value) {
    //     if (/[^0-9-]+/g.test(value)) {
    //       callback(new Error('请输入正确的银行卡号码!'));
    //     } else {
    //       callback();
    //     }
    //   }
    //   callback();
    // };
    const id_card =(rule, value, callback)=> {
      if (value) {
        if (/[^0-9-]+/g.test(value)) {
          callback(new Error('请输入正确的身份证号码!'));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      email:'',
      disabled:false,
      codetext:'发送验证码',
      listLoadings:false,
      listLoading: false,
      imageUrl: '',
      imageUrl2: '',
      mobile: '',
      userinfo: {},
      fronted_cards:'',
      backend_cards:'',
      realnameform: {
        realname: "",
        id_card: "",
        // bank_name: '',
        // bank_account: "",
        fronted_card: '',
        backend_card: '',
        // code: ''
      },

      realnamerules: {
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        id_card: [
          { required: true, min: 18, max: 18, message: "请输入正确的身份证号码", trigger: "blur" },
          { validator: id_card, trigger: 'blur' }

        ],
        // bank_name: [
        //   { required: true, message: "请选择银行", trigger: "blur" }
        // ],
        // bank_account: [
        //   { min: 19, max: 19, message: "请输入正确的银行卡号码", trigger: "blur", required: true },
        //   { validator: bank_account, trigger: 'blur' }
        // ],     
        // code:[
        //   { required: true, message: "请输入验证码", trigger: "blur" }
        // ],

      }
    };
  },

  components: {
    // vueschart
  },
  mounted() {
    this.realname();
    this.userinfo = JSON.parse(localStorage.getItem('userinfos'));
    this.email=this.$store.state.user.email;
    this.mobile =this.$store.state.user.mobile;
  },

  methods: {
    changeimg2(e){
      if(this.backend_cards===''){
        this.backend_cards='反面身份证';
      }else{
        this.backend_cards=this.realnameform.backend_card;
      }
      },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editrealname();
          
        } else {
          this.listLoading = false;
          return false;
        }
      });
    },
    open3: function () {
      this.$message({
        message: "【重要】 银行卡开户人必须跟证件上一致，否则无法正常收款。",
        type: "warning"
      });
    },
    getemilcodes() {
      //发送获取验证码的请求
      let mobile=this.mobile;
      let datas = {
        params:{
        email:this.email,
        type:'realname_code'
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
        } else {
          this.$message({
            message: "发送失败",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    //发送验证码 倒计时
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
    realname() {
      this.listLoadings=true;
      api.realname().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.realnameform = data.data;
          this.realnameform.realname = data.data.realname;
          this.realnameform.id_card = data.data.id_card;
          // this.realnameform.bank_name = data.data.bank_name;
          // this.realnameform.bank_account = data.data.bank_account;
          this.realnameform.fronted_card = data.data.fronted_card;
          this.realnameform.backend_card = data.data.backend_card;
          this.listLoadings=false;
        }else{
          this.listLoadings=true;
        }
      })
    },
    showPreview(e) {
      var fronted_card = document.getElementById('upload');
      var fronted_card = fronted_card.files[0];
      if(window.FileReader) {
          var fr = new FileReader();
          var portrait = document.getElementById('fronted');
          fr.onloadend = function(e) {
            portrait.src = e.target.result;
          };
          fr.readAsDataURL(fronted_card);
          
      }
    },
    showPreview2(e) {
      var backend = document.getElementById('upload2');
      var backend = backend.files[0];
      if(window.FileReader) {
          var fr = new FileReader();
          var portrait = document.getElementById('backend');
          fr.onloadend = function(e) {
            portrait.src = e.target.result;
          };
          fr.readAsDataURL(backend);
          
      }
    },
    editrealname() {
      this.listLoading = true;
      var formDatas = new FormData();
      var fronted_card = document.getElementById('upload');
      var backend_card = document.getElementById('upload2');
      var fronted_card = fronted_card.files[0];
      var backend_card = backend_card.files[0];
      var frontedimg=document.getElementById('fronted').getAttribute('src');
      var backend_cardimg=document.getElementById('backend').getAttribute('src');
      if(frontedimg===''||backend_cardimg===''){
        this.$message({
          message: "请选择上传身份证",
          type: "error",
          duration: 3000
        });
        this.listLoading = false;
        return;
      }
     if(fronted_card!=undefined){
      if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fronted_card.name)){
        this.$message({
          message: "请选择格式gif,jpeg,jpg,png中的一种",
          type: "error",
          duration: 3000
        });
        this.listLoading = false;
        return;
    }
    }
    if(backend_card!=undefined){
    if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(backend_card.name)){
      this.$message({
        message: "请选择格式gif,jpeg,jpg,png中的一种",
        type: "error",
        duration: 3000
      });
      this.listLoading = false;
      return;
  }
}
      formDatas.append("fronted_card", fronted_card);
      formDatas.append("backend_card", backend_card);
      formDatas.append("realname", this.realnameform.realname);
      formDatas.append("id_card", this.realnameform.id_card);
      // formDatas.append("bank_name", this.realnameform.bank_name);
      // formDatas.append("bank_account", this.realnameform.bank_account);
      formDatas.append("code", this.realnameform.code);
      api.editrealname(formDatas).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoading = false;
          this.realname();
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
          this.listLoading = false;
        }
      })
    },
//     beforeAvatarUpload(file) {                
//       var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
//       const extension = testmsg === 'jpg'  
//       const extension2 = testmsg === 'png'  
//       const isLt2M = file.size / 1024 / 1024 < 10  
//       if(!extension && !extension2) {  
//           this.$message({  
//               message: '上传文件只能是 jpg、png格式!',  
//               type: 'warning'  
//           }); 
//           return false
//       }  
//       if(!isLt2M) {  
//           this.$message({  
//               message: '上传文件大小不能超过 10MB!',  
//               type: 'warning'  
//           });   
//           return false

//       }  
//       return extension || extension2 && isLt2M  
// } ,
  },
  activated() { }
};