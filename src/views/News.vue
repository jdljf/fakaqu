<template>
    <div class="news"> 
<div style="box-shadow:1px 1px 2px 1px #eee;background:#449CF9">
        <BannerGround />
        </div>
        <div class="list-top">  
            <div  class="search-inp">
                <input type="text" style="" placeholder="有任何疑问！请输入关键字" >  
               <button>搜索</button> 
            </div>     
        </div>
    <div class="list-text">
    <div class="list-banner">
       <div class="banner-center">
          <div class="banner-item">
           <span class="span-top">
               <img src="../assets/images/team2.png"/>
           </span>
           <span class="span-txt">账号服务</span>
          </div>
           <div class="banner-item">
             <span class="span-top">
                 <img src="../assets/images/shopname.png"/>
             </span>
           <span class="span-txt">商家百科</span>
          </div>
           <div class="banner-item">
            <span class="span-top">
                <img src="../assets/images/anquan.png"/>
            </span>
           <span class="span-txt">安全隐私</span>
          </div>
           <div class="banner-item">
            <span class="span-top">
                <img src="../assets/images/gong.png"/>
            </span>
           <span class="span-txt">网址公告</span>
          </div>
       </div>
    </div>
    <div class="new-answer">
      <div class="answer-titel">
          <div style="color:#666666;font-size:18px;padding:20px;border-bottom:1px solid #eee;">常见问题</div>
          <ul class="answer-ul">
              <li @click="bindshow(item.id)" v-for="item in items" :key="item.id">
                  <div ><i class="el-icon-question" style="color:#24A2F4;padding-right:7px;"></i><span>{{item.itemtitle}}</span></div>
                  <div v-if="shows" class="shows" style="margin-top:20px;color:#ccc;font-size:14px">
                      <b v-if="item.id==index"><i class="el-icon-info" style="color:#58A5FC;padding-right:7px;font-size:16px;color:#89DA52"></i></b>
                    <span style="line-height:20px">
                      {{(item.id==index?item.itemtext:'')}}</span>
                      </div> 
                                 
              </li>
          
          </ul>
      </div>
       <div class="remark">
          <span>如果您需要技术支持，请随时联系我们</span>
          <br><span>18909098212</span>
      </div>
    </div>
    </div>

    </div>
</template>
<script>
import BannerGround from "@/components/BannerGround.vue";

export default {
  data() {
    return {
      index:'',
      input: "",
      shows: false,
      items:[
        {
          itemtitle:'已经付款,但是没有收到卡密该怎么办？?',
          id:1,
          itemtext:'您好，付款成功但是没有收到卡密的话，请点击右上角的订单查询，输入订单编号或联系方式即可查询到卡密哦！',
        },
        {
          itemtitle:'平台可以卖些哪些商品呢？?',
          id:2,
          itemtext:'您好，平台仅限销售虚拟卡密类商品，但违法违禁商品不接入，具体禁售商品请联系平台客服咨询。',
        },
        {
          itemtitle:'发卡吧平台会有被黑单的情况吗？?',
          id:3,
          itemtext:'您好，我们是公司运营，保证绝不存在黑单现象，但由于网络原因可能会导致订单返回结果延时等情况，我们会努力避免这种情况的发生，如对订单状态有疑问，请一定及时与客服取得联系查询核实订单详情。我们将一一为您解答。',
        },
        {
          itemtitle:'发卡吧平台的信誉有保障吗？',
          id:4,
          itemtext:'您好，我们坚信信誉、对商户负责才是长久发展之道，因此受到了众多商户的青睐，也收到了很多商户的反馈意见，促使我们在一直进步着，平台由公司正规运营，时间证明不会存在跑路等损人损己的事情，而且我们已经通过网监、工商、工信等部门的备案！',
        },
      ]
    };
  },
  components: {
    BannerGround
  },
  methods: {
    bindshow(e) {
    this.index=e;
    this.shows=!this.shows;
     
    }
  }
};
</script>
<style lang="scss" scoped>
.news {
  height: 1150px;
  background: #fff;
  background-size: 100% 100%;
  .list-top {
    padding: 15px;
    background: #f8f8f8;
    .search-inp {
      width: 1150px;
      margin: 20px auto;

      input {
        line-height: 40px;
        width: 80%;
        font-size: 16px;
        padding-left: 10px;
        border: none;
        box-shadow: 0px 1px 2px 1px #ccc;
        border-radius: 4px;
        margin-left: 10%;
      }
      button {
        line-height: 42px;
        background: #ccc;
        color: #fff;
        padding: 1px 20px 0px;
        border: none;
        margin-left: -70px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-size: 16px;
      }
    }
  }
  .list-text {
    width: 100%;
    background: #fff;
    .list-banner {
      width: 1150px;
      margin: 30px auto;
      .banner-center {
        display: flex;
        align-items: center;
        .banner-item {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: 20px;
          background: #f8f8f8;
          border-radius: 5px;
          flex-direction: column;
          transition: all 0.3s;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0px 0px 10px 1px #ccc;
          }
          .span-top {
            padding: 40px;
            img {
              width: 80px;
              height: 80px;
            }
          }
          .span-txt {
            border-top: 1px solid #eeeeee;
            padding: 20px 0px 20px 0px;
            display: inline-block;
            width: 100%;
            text-align: center;
            color: #666d82;
          }
        }
      }
    }
    .new-answer {
      width: 1150px;
      margin: 50px auto;
      height: 100px;
      .answer-ul {
        li {
          padding: 20px;
          color: #676767;
          border-bottom: 1px solid #eee;
          font-size: 18px;
          cursor: pointer;
          &:hover {
            color: #56a4fc;
          }
        }
      }
    }
    .remark {
      margin: 40px 25%;
      display: inline-block;
      padding: 25px;
      width: 50%;
      text-align: center;
      border: 1px solid #ccc;
      line-height: 30px;
      color: #666666;
      font-weight: bold;
      &:hover{
          border: 1px solid #56A4FC;
          cursor: pointer;
      }
    }
  }
}
</style>


