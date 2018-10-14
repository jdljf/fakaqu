<template>
    <div class="sell-recent-box">
      <div class="coupon-mask" v-show="tag"></div>
      <second-alert v-show="tag"  @close="tag=false"></second-alert>
        <div class="sell-recent-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore"><span style="font-size: 0.32rem;">投诉管理</span></x-header>
        </div>
        <divider>投诉列表</divider>
        <div id="sell-list-wrap">
            <div class="sell-list" v-for="(item,index) in couponstable" :key="index">
                <div class="name">
                    订单号:{{item.no}}
                </div>
                <div class="sell-list-title">
                   <span href="javascript:void(0)">投诉原因:{{item.reason_type}}</span>
                </div>
                <div class="sell-list-con">
                        <p style="width:100%">投诉内容:{{item.reason}}
                        <br>联系方式:{{item.qq}}<br>
                        投诉时间:{{item.created_at}}<br>
                        状态:<span style="color:#DB2321" v-if="item.status===0">未解决</span>
                        <span style="color:#8DDC58" v-else>已解决</span>
                        <span style="color:#4E8DF1;float:right" @click="handledetail(item.id)">详情</span>
                        </p>
                    <div id="clear" style="clear:both"></div>
                </div>
       
            </div>
            <div class="scroll-loading" v-show="loadingTag">{{loadingText}}</div>
        </div>
        <TabBar></TabBar>
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
  name: "SellRecently",
  confirmText:'',
  complainLists: [],
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
  data() {
    return {
      nodatashow:false,
      nodata:'暂无投诉记录',
      tag:false,
      listLoadingall: false,
      couponstable: [],
      total: 0,
      loadingTag: false,
      loadingText: "正在加载数据，请稍候...",
      pageInfo: {
        pageIndex: 1
      }
    };
  },
  methods: {
   handledetail(id){
    var id=JSON.stringify(id);
     this.$router.push({name:'reportsdetail',query:{id:id}})
    },
    
   getcomplainLists(data){
      api.getcomplainLists(data).then(res => {
        const data = res.data;
        if (data.data.length>0) {
            this.total=data.total;
            this.complainLists=data.data;
            this.loadingTag = false;
        } else {
          this.complainLists = [];
          this.loadingTag = true;
          this.loadingText = "暂无其他数据";
        }
      });
     },
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    doMore() {},
    handleScroll() {
      let that = this;
      var elementScrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
      var elementOffsetHeight = document.documentElement.clientHeight;
      var elementScrollHeight = document.body.scrollHeight;
      if (
        elementScrollHeight - elementScrollTop - elementOffsetHeight < 50 &&
        !this.loadingTag
      ) {
        this.loadingTag = true;
        api
          .getcomplainLists({ params: { page: this.pageInfo.pageIndex } })
          .then(res => {
            const response = res.data;
            if (response.data && response.data.length > 0) {
              response.data.forEach(element => {
                that.couponstable.push(element);
              });
              that.pageInfo.pageIndex++;
              that.loadingTag = false;
            } else {
              that.loadingTag = true;
              that.loadingText = "暂无其他数据";
            }
          });
      }
    },
  },
  mounted() {
    this.couponstable=[];
    window.addEventListener("scroll", this.handleScroll);
    api.getcomplainLists().then(res => {
      const data = res.data;
      if (data.data && data.data.length > 0) {
        this.couponstable = data.data;
        this.total = data.total;
      }
      else{
        if( this.total===0){
       this.loadingText = "暂无其他数据";
         this.loadingTag = true;
       log('loadingText',this.loadingText);
        }
      }
      
      this.pageInfo.pageIndex++;
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang='css'>
  .el-message-box{
    width: 90% !important;
  }
  .el-message{
  min-width: 90%;
}
</style>

<style lang="scss" scoped>
.sell-recent-box {
  position: relative;
  height: 100%;
  background-color:#fff;
  .coupon-mask{
    position: absolute;
   bottom: 0;
   top: 0;
   left: 0;
   right: 0;
   z-index: 10;
   background-color: rgba(0,0,0,0.3);
  }
  #sell-list-wrap {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    .sell-list {
      display: block;
      width: 100%;
      margin: 0 auto;
      font-size: 0.25rem;
      border-top: 0.02rem solid #e0e1ff;
      .name {
        padding: 4%;
        // color: #409eff;
        font-weight: 600;
      }
      .sell-list-phone {
        width: 92%;
        padding: 4% 4% 2% 4%;
        color: #666;
        .price {
          float: right;
          color: #409eff;
          font-weight: 700;
        }
      }
      .sell-list-title {
        width: 92%;
        padding: 4%;
        color: #000;
        font-weight: bold;
        i {
          color: #000;
        }
        .method {
          float: right;
          color: #666;
        }
        .price {
          float: right;
        }
      }
      .sell-list-con {
        padding: 0 4% 4% 4%;
        line-height: 24px;
        color: #666;
        p:nth-child(1) {
          float: left;
        }
      }
    }
    .scroll-loading {
      position: relative;
      width: 100%;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      overflow: hidden;
      color: #999;
      font-size: 0.28rem;
    }
  }
  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
  }
  .togglecard {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 4rem;
    height: 4rem;
    font-size: 0.25rem;
    z-index: 10;
    background-color: #f8f8f8;
    .toggle-text {
      line-height: 0.4rem;
    }
    .toggle-time {
      .clone-link {
        display: block;
        margin-top: 0.1rem;
        padding: 0.08rem 0.15rem;
        border: none;
        background: #188cf8;
        cursor: pointer;
        border-radius: 0.03rem;
        color: #fff;
      }
    }
  }
}
</style>
