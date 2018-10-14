<template>
    <div id="reportdetail">
           <div class="sell-recent-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore"><span style="font-size: 0.32rem;">投诉详情</span></x-header>
        </div>
        <el-card>
      <el-card class="complaintsdetail-card">
      发卡吧提示您：在举证说明过程中，请双方文明用语。无理谩骂，人身攻击者，我们将订单判定给对方！！     
      </el-card> 
          <el-card class="complaintsdetail-cardsec">
                   <i class="el-icon-success"/>    
                 <div class="complaintsdetail-tit">
                   <div class="complaintsdetail-txt" v-if="complaints.status===0"> 该投诉还未处理:</div>
                   <div class="complaintsdetail-txt"  v-else>该投诉已处理完毕:</div>
                 <div class="complaintsdetail-padd">处理结果：此订单支持卖家，该订单已解冻！！</div>
                 <div class="complaintsdetail-padd">判定依据：买家主动撤销投诉。订单已解冻，款项已返回！！</div>
                 </div> 
           </el-card> 
        <el-form class="complaints-form" label-width="80px" :model="complaints">
              <el-form-item  label="投诉订单">
              <el-input disabled v-model="complaints.no"></el-input>
              </el-form-item>
              <el-form-item  label="联系方式">
              <el-input disabled v-model="complaints.qq"></el-input>
              </el-form-item>
              <el-form-item label="投诉时间">
              <el-input disabled v-model="complaints.created_at"></el-input>
              </el-form-item>
              <!-- <el-form-item :label="$t('comdetail.content')"> -->
              <!-- <el-input  type="textarea" v-model="complaints.text"></el-input> -->
             <div class="complaints-text">
                 <div class="buyers-right">
                     <div class="buyers-title">
                         <span class="buyers-time">{{complaints.created_at}}</span>
                         <span class="buyers-tit">买家</span>
                     </div>
                     <div class="buyers-text">
                       {{complaints.reason}}
                     </div>
                 </div>
                 <div class="merchants-left">
                      <div class="buyers-title">
                         <span class="buyers-tit" >系统消息</span>
                         <span class="buyers-time">{{complaints.created_at}}</span>
                     </div>
                     <div class="buyers-text">
                       {{$t('comdetail.systemtext')}}
                     </div>
                 </div>
                 <div class="merchants-left">
                      <div class="buyers-title">
                         <span class="buyers-tit" style="background:#1FBE9D">商家</span>
                         <span class="buyers-time">{{complaints.created_at}}</span>
                     </div>
                     <div class="buyers-text" v-if="complaints.status===0">
                        {{$t('comdetail.nostatus')}}
                     </div>
                     <div class="buyers-text" v-else>
                       {{$t('comdetail.status')}}
                     </div>
                 </div>
             </div>   
              <!-- </el-form-item> -->
        </el-form>
        </el-card>  
    </div>
</template>
<script>
import api from "@/axios/api";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import Clipboard from "clipboard";
import { XHeader } from "vux";
import { Group } from "vux";
import { Divider } from "vux";
import TabBar from "@/components/mobile/TabBar";
import { Alert } from "vux";
import { Confirm } from "vux";
import SecondAlert from "@/components/mobile/PwdAlert.vue";
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
  methods: {
      bannerBack() {
      this.$router.go(-1)
    },
    doMore(){},
    getshopcomplainInfos() {
      let _id=JSON.parse(this.$route.query.id);
       let datas = {
        id:_id
      };
      api.getshopcomplainInfo({
           params:{id: this.id }}).then(res => {
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
  },
  components: {
    MbHeader,
    Group,
    Divider,
    TabBar,
    Alert,
    Confirm,
    XHeader,
    SecondAlert
  },
};
</script>
<style>
.el-card__body {
    padding: 10px !important;
}
</style>


<style lang="scss" scoped>
#reportdetail {
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
      font-size: .5rem;
      vertical-align: super;
    }
    .complaintsdetail-tit {
      margin-left: .8rem;
display: inline-block;
margin-top: -.5rem;
      .complaintsdetail-txt {
        font-size: .4rem;;
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
        margin-bottom:10px;
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
          margin-top:10px;
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
</style>

