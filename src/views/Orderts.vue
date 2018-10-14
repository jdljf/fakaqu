<template>
    <div id="orderts">
         <BannerGround/>

        <div class="orderts-box">
       <div  style="line-height:80px;background:#508FF2;font-size:20px;color:#fff;padding-left: 20px;">
        <span>{{$t('comdetail.detail')}}</span>
       </div>
          <el-card class="complaintsdetail-cardsec">
                   <i class="el-icon-success"/>    
                 <div class="complaintsdetail-tit">
               <div class="complaintsdetail-txt" v-if="complaints.status===0"> {{$t('comdetail.textone')}}:</div>
                   <div class="complaintsdetail-txt"  v-else>{{$t('comdetail.texttwo')}}:</div>
                 <div class="complaintsdetail-padd">{{$t('comdetail.textthree')}}！</div>
                 <div class="complaintsdetail-padd">{{$t('comdetail.textfour')}}！</div>
                 </div> 
           </el-card> 
        <el-form class="complaints-form" label-width="80px" :model="complaints">
              <el-form-item :label="$t('comdetail.textfive')">
              <el-input disabled v-model="complaints.no"></el-input>
              </el-form-item>
              <el-form-item :label="$t('comdetail.textsix')">
              <el-input disabled v-model="complaints.qq"></el-input>
              </el-form-item>
              <el-form-item :label="$t('comdetail.textserve')">
              <el-input disabled v-model="complaints.created_at"></el-input>
              </el-form-item>
              <el-form-item :label="$t('comdetail.content')">
              <!-- <el-input  type="textarea" v-model="complaints.text"></el-input> -->
             <div class="complaints-text">
                 <div class="buyers-right">
                     <div class="buyers-title">
                         <span class="buyers-time">{{complaints.created_at}}</span>
                         <span class="buyers-tit">{{$t('comdetail.buyers')}}</span>
                     </div>
                     <div class="buyers-text">
                       {{complaints.reason}}
                     </div>
                 </div>
                 <div class="merchants-left">
                      <div class="buyers-title">
                         <span class="buyers-tit" >{{$t('comdetail.systemmessage')}}</span>
                         <span class="buyers-time">{{complaints.created_at}}</span>
                     </div>
                     <div class="buyers-text">
                        {{$t('comdetail.systemtext')}}！
                     </div>
                 </div>
                 <div class="merchants-left">
                      <div class="buyers-title">
                         <span class="buyers-tit" style="background:#1FBE9D">{{$t('comdetail.merchants')}}</span>
                         <span class="buyers-time">2017-10-18 22:49:31</span>
                     </div>
                     <div class="buyers-text" v-if="complaints.status===0">
                         {{$t('comdetail.nostatus')}}
                     </div>
                     <div class="buyers-text" v-else>
                        {{$t('comdetail.status')}}
                     </div>
                 </div>
             </div>   
              </el-form-item>
        </el-form>
        </div>  
    </div>
</template>
<script>
import api from "@/axios/api";
import BannerGround from "@/components/BannerGround.vue";

export default {
  data() {
    return {
      id: "",
      complaints: {
        no: "",
        qq: "",
        created_at: "",
        reason:'',
        status:'',
      }
    };
  },
    components: {
    BannerGround
  },
  methods: {
    getshopcomplainInfos() {
      let _id=JSON.parse(this.$route.query.id);
       let datas = {
        id:_id
      };
      api.getwebcomplainInfo({
           params:{keyword: this.id }}).then(res => {
        const data = res.data;
        if (data.result === 1) {
            this.complaints=data.data;
        }
      });
    }
  },
  mounted() {
    this.id = JSON.parse(this.$route.query.id);
    this.getshopcomplainInfos();
  }
};
</script>


<style lang="scss" scoped>
#orderts {
 height: 1150px;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
  .orderts-box{
      width:80%;
      margin:20px auto;
      padding: 10px;
      background: #fff;
  .clearfix {
    font-weight: bold;
  }
  .complaintsdetail-card {
    color: #fff;
    background-color: #77b4f9;
  }
  .complaintsdetail-cardsec {
    margin-top: 30px;
    text-align: left;
    .el-icon-success {
      color: #81d349;
      font-size: 60px;
      vertical-align: super;
    }
    .complaintsdetail-tit {
      margin-left: 30px;
      display: inline-block;
      .complaintsdetail-txt {
        font-size: 25px;
        font-weight: bold;
      }
      .complaintsdetail-padd {
        padding-top: 20px;
      }
    }
  }
  .complaints-form {
    margin-top: 30px;
    .complaints-text {
      padding: 10px;
      border: 1px solid #cecfce;
      .buyers-right,
      .merchants-left {
        text-align: right;
        .buyers-title {
          color: #ccc;
          padding: 0px 10px;
          .buyers-tit {
            background-color: #77b4f9;
            color: #fff;
            padding: 5px 10px 3px 10px;
            margin-left: 10px;
            border-radius: 5px;
          }
        }
        .buyers-text {
          display: inline-block;
          padding: 1px 10px;
          color: #fff;
          background-color: #cecfce;
          border-radius: 5px;
          margin-right: 10px;
          line-height: 30px;
        }
      }
      .merchants-left {
        text-align: left;
        .buyers-title {
          .buyers-tit {
            margin-right: 10px;
            margin-left: 0px;
            background-color: #e54d42;
          }
        }
        .buyers-text {
          margin-left: 10px;
        }
      }
    }
  }
  }
}
</style>

