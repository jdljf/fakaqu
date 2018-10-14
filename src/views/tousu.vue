<template>
    <div id="tousu">
        <BannerGround/>
  <div class="ts-box" style="">
  <div  class="ts-title">
   {{$t('addcomplatint.no')}}
  </div>
<el-form  :model="tousu" status-icon :rules="tousurul" ref="tousu" label-width="100px" class="demo-ruleForm ts-form">
  <el-form-item  :label="$t('addcomplatint.num')" prop="no">
    <el-input v-model="tousu.no" disabled="disabled"></el-input>
  </el-form-item>
    <el-form-item   :label="$t('addcomplatint.payment')"  >
  	<input type="file"   name="tousu.pic" @change="showPreview"  id="upload"/><span style="font-size:12px;color:#ccc">请上传支付成功页面图片</span>
    <img style="width:100px;display:block"  id="tsimg"   :src="tousu.pic" />   
</el-form-item  >
  <el-form-item :label="$t('addcomplatint.reasons')" prop="reason_type">
    <el-select   v-model="tousu.reason_type" placeholder="请选择投诉原因">
      <el-option label="无效卡密" value="无效卡密"></el-option>
      <el-option label="虚假商品" value="虚假商品"></el-option>
      <el-option label="侵权商品" value="侵权商品"></el-option>
      <el-option label="没有售后" value="没有售后"></el-option>
      <el-option label="其他投诉" value="其他投诉"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item :label="$t('addcomplatint.qq')" prop="qq">
    <el-input   v-model="tousu.qq" :placeholder="$t('addcomplatint.placone')" >
    </el-input>
  </el-form-item>
 <el-form-item  :label="$t('addcomplatint.moblie')" prop="mobile">
    <el-input   v-model="tousu.mobile"  :placeholder="$t('addcomplatint.plactwo')">
    </el-input>
  </el-form-item>
  <el-form-item  :label="$t('addcomplatint.Complaintsreasons')" prop="reason">
     <el-input type="textarea" v-model="tousu.reason"   :placeholder="$t('addcomplatint.placthree')"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"  v-loading="listLoading" @click="submitForm('tousu')">{{$t('addcomplatint.submit')}}</el-button>
  </el-form-item>
</el-form>

</div>    
    </div>
</template>
<script>
import BannerGround from "@/components/BannerGround.vue";
import api from "@/axios/api";

export default {
  data() {
    const nums =(rule, value, callback)=> {
      if (value) {
        if (/[^0-9-]+/g.test(value)) {
          callback(new Error('请输入正确的手机号!'));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      listLoading: false,
      Complaint: {},
      tousu: {
        no: "",
        reason_type: "",
        pic: "",
        qq: "",
        mobile: "",
        reason: ""
      },
       tousurul: {
        no: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        reason_type: [
          { required: true, message: '请选择投诉原因', trigger: "blur" },
        ],
        qq: [
          { required: true,message: "请输入qq", trigger: "blur" },
          {  min: 8, max: 12,message: "请输入正确qq", trigger: "blur" },
        ],
        mobile: [
          { min: 11, max: 11, message: "请输入手机号", trigger: "blur", required: true },
          { validator: nums, trigger: 'blur' }
        ],     
        reason:[
          { required: true, message: "请输入投诉具体原因", trigger: "blur" }
        ],

      }
    };
  },
  components: {
    BannerGround
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addComplain();
          
        } else {
          this.listLoading = false;
          return false;
        }
      });
    },
    showPreview(e) {
      var fronted_card = document.getElementById("upload");
      var fronted_card = fronted_card.files[0];
      if (window.FileReader) {
        var fr = new FileReader();
        var portrait = document.getElementById("tsimg");
        fr.onloadend = function(e) {
          portrait.src = e.target.result;
        };
        fr.readAsDataURL(fronted_card);
      }
    },
    addComplain(){
     this.listLoading = true;
      var formDatas = new FormData();
      var fronted_card = document.getElementById('upload');
      var fronted_card = fronted_card.files[0];
      var frontedimg=document.getElementById('tsimg').getAttribute('src');
      if(frontedimg===''){
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
      formDatas.append("pic", fronted_card);
      formDatas.append("no", this.tousu.no);
      formDatas.append("reason_type", this.tousu.reason_type);
      formDatas.append("qq", this.tousu.qq);
      formDatas.append("mobile", this.tousu.mobile);
      formDatas.append("reason", this.tousu.reason);
      api.addComplain(formDatas).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoading = false;
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
          this.listLoading = false;
        }
      })
    }
  },
  mounted() {
    this.Complaint = JSON.parse(this.$route.query.Complaint);
    log(this.Complaint);
    this.tousu.no=this.Complaint.no;
  }
};
</script>
<style lang="scss" scoped>
#tousu {
  height: 1150px;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
  .ts-box {
    width: 1150px;
    margin: 20px auto;
    background: #fff;
    .ts-title{
        line-height: 80px;
        background: #508EF2;
        color: #fff;
        font-size: 20px;
        padding-left: 20px;
    }
    .ts-form{
        margin-top:20px;
        padding: 20px;
    }
  }
}
</style>
