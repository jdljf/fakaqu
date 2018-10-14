<template>
    <div>
        <div id="merchantindex" style="margin-bottom: 1.2rem">
            <div class="tops">
                <alert class="mask" v-model="show" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>
                <img style="width:.3rem;vertical-align: top;" src="../../assets/images/usericon.png" />
                <span class="user-name" @click="clickshow">{{userinfos.username}}</span>
                <div id="logoutshow" @click="logout" v-show="logoutshow" >退出登录</div>
                <span @click="goto" class="user-info">账户信息<i style="font-size:.23rem;font-weight:900" class="el-icon-arrow-right"></i></span>
            </div>
            <div class="money_box">
                <div class="titles">账户余额(元)</div>
                <div class="money">{{totalmoney}}</div>
                <!-- <div class="no-money">待结算金额 122.12(元)</div> -->
                <div class="money-text">
                    <div class="mt-text">
                        <span class="mt-t-child" style="color:#4A894B;font-size:.3rem">{{todaymoney}}</span>
                        <span class="mt-t-child">今日成交金额(元) </span>
                    </div>
                    <div class="mt-text">
                        <span class="mt-t-child" style="color:#4A894B;font-size:.3rem">{{today.count}}</span>
                        <span class="mt-t-child" >今日成交记录(笔) </span>
                    </div>
                </div>
            </div>
            <div class="mer-context">
                <!-- 交易管理 -->
                <div class="Transaction">
                    <div class="tr-top"><span class="tr-title"><i style="margin-right:.2rem" class="el-icon-tickets"/>交易管理</span></div>
                    <div class="tr-context">
                        <div class="tr-cont-child" @click="handleMenuClick('SellRecently')">
             <span class="tr-span" >
                 <img class="tr-imgs"  src="../../assets/images/mai.png"/>
             </span>
                            <span class="tr-span">最近卖出</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('Order')">
             <span class="tr-span">
                 <img class="tr-imgs" style="background:#4E9ED6"  src="../../assets/images/order.png"/>
             </span>
                            <span class="tr-span">订单记录</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('security')">
              <span class="tr-span">
                 <img class="tr-imgs" style="background:#89D952" src="../../assets/images/seting.png"/>
             </span>
                            <span class="tr-span">安全设置</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('Coupons')"  >
                <span class="tr-span" >
                 <img class="tr-imgs" style="background:#FDCC50"  src="../../assets/images/ts.png"/>
             </span>
                            <span class="tr-span">优惠券列表</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('certification')">
            <span class="tr-span" >
                 <img class="tr-imgs" style="background:#D64D31"  src="../../assets/images/relname.png"/>
             </span>
                            <span class="tr-span">实名认证</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('Report')">
            <span class="tr-span">
                 <img class="tr-imgs" style="background:#949B9D" src="../../assets/images/tx.png"/>
             </span>
                            <span class="tr-span">投诉管理</span>
                        </div>
                    </div>
                </div>
                <!-- 商品管理 -->
                <div class="Transaction" style="margin-top:.3rem;">
                    <div class="tr-top"><span class="tr-title"><i style="margin-right:.2rem" class="el-icon-goods"/>商品管理</span></div>
                    <div class="tr-context">
                        <div class="tr-cont-child" @click="handleMenuClick('Categories')">
             <span class="tr-span">
                 <img class="tr-imgs" style="background:#7DEADD" src="../../assets/images/lei.png"/>
             </span>
                            <span class="tr-span">商品分类</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('Goodslist')">
             <span class="tr-span">
                 <img class="tr-imgs"  style="background:#FC4C2C"  src="../../assets/images/shoplist.png"/>
             </span>
                            <span class="tr-span">商品列表</span>
                        </div>
                        <div class="tr-cont-child"  @click="handleMenuClick('Codeadd')">
              <span class="tr-span">
                 <img class="tr-imgs" style="background:#9C9073" src="../../assets/images/adds.png"/>
             </span>
                            <span class="tr-span">添加卡密</span>
                        </div>
                        <div class="tr-cont-child" @click="handleMenuClick('Secret')">
         <span class="tr-span">
                 <img class="tr-imgs" style="background:#DB5048" src="../../assets/images/ku.png"/>
             </span>
                            <span class="tr-span">库存卡密</span>
                        </div>
                        <div class="tr-cont-child"  @click="handleMenuClick('Link')"  >
            <span class="tr-span">
                 <img class="tr-imgs" style="background:#27B2F6"  src="../../assets/images/dp.png"/>
             </span>
             <span class="tr-span">店铺链接</span>
           </div>
           <div class="tr-cont-child" @click="handleMenuClick('Income')">
            <span class="tr-span">
                 <img class="tr-imgs" style="background:#A3C5F5" src="../../assets/images/zsy.png"/>
             </span>
                            <span class="tr-span">收益统计</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TabBar/>
    </div>
</template>
<script>
import api from "@/axios/api";
import { Alert } from "vux";
import TabBar from "@/components/mobile/TabBar";

export default {
  data() {
    return {
      userinfos: {
        mobile: "",
        qq: "",
        username: "",
        id: ""
      },
      totalmoney:'',
      todaymoney:'',
      articleLists:[],
      logoutshow: false,
      show: false,
      isDel: false,
      msgText: "",
      today:'',
      yesterday:'',
      money:'',
      withdraw:'',
    };
  },
  components: {
    Alert,
    TabBar
  },
  methods: {
    clickshow(){
      this.logoutshow=!this.logoutshow;
      if(this.logoutshow==true){
       document.getElementById('logoutshow').classList.add("animate");
      }else if(this.logoutshow==false){
       document.getElementById('logoutshow').classList.remove("animate");
      }
    },
    logout() {
      this.$store.commit("loggedOut");
    },
    goto() {
      this.$router.push({
        path: "/composite/progress"
      });
    },
    changelist() {
      if (this.isDel) {
        this.isDel = false;
      } else {
        // window.location.reload(true);
      }
    },
    handleMenuClick(name) {
      switch (name) {
        // 菜单点击的特殊情况
        case "link":
          this.$router.push({
            name: "/"
          });
          break;
        // 其他统一跳转到对应name的路由
        default:
          this.$router.push({
            name
          });
      }
    },
    getuser() {
      api.getuser().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.userinfos = data.data;
          localStorage.setItem("userinfos", JSON.stringify(this.userinfos));
        }
      });
    },
    getbasedata() {
      api.getbasedata().then(res => {
        const data = res.data;
        if (data.result === 1) {
         this.today=data.data.today;
          this.totalmoney=Number(data.data.money.money).toFixed(2);
         this.todaymoney=Number(data.data.today.money).toFixed(2);

         this.yesterday=data.data.yesterday;
         this.money=data.data.money;
         this.withdraw=data.data.withdraw;
        }
      });
    },
    // 公告
    getarticleLists(){
      api.getarticleLists().then(res => {
        const data = res.data;
          this.articleLists=data.data;
          
      });
    },
  },
  mounted() {
    this.getuser();
    this.getarticleLists();
    this.getbasedata();
    if(!localStorage.Second_Confirm) {
      api.getsecurity().then(res => {
        const data = res.data;
        if (data.result === 1) {
          localStorage.Second_Confirm = Number(data.data.second_confirm);
        } else {
          localStorage.Second_Confirm = 1;
        }
      });
    }
  }
};
</script>
<style>
#merchantindex .weui-dialog {
  top: 40%;
}
</style>

<style scoped lang="scss">
.animate {
  animation: loght 1s;
}

@keyframes loght {
  0% {
    transform: translateX(-80px);
  }
  100% {
    transform: translateX(0px);
  }
}
#merchantindex {
  background-color:#fff;
  position: relative;
  width: 100%;
  .tops {
    background: #24aaed;
    padding: 0.25rem;
    padding-bottom: 2rem;
    color: #fff;
    #logoutshow {
      position: absolute;
      font-size: 0.25rem;
      padding: 0.2rem;
      margin-top: 6%;
      background: #47a3df;
      // box-shadow: 0px 0px 1px 1px #EDF0F0;
      border-radius: 3px;
      color: #fff;
      left: -3px;
      transition: all 3s;
    }
    .user-name {
      padding-left: 0.1rem;
    }
    .user-info {
      float: right;
      font-size: 0.23rem;
    }
  }
  .money_box {
    width: 92%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #cdefff;
    padding-bottom: 0.3rem;
    margin: -25% auto 0 auto;
    text-align: center;
    .titles {
      padding: 0.3rem;
      color: #999;
      font-size: 0.27rem;
      font-weight: bold;
    }
    .money {
      font-size: 0.6rem;
      font-weight: bold;
      font-family: "Hannotate SC";
      padding-bottom: .3rem;
    }
    .no-money {
      font-size: 0.24rem;
      margin: 0.3rem;
      border-bottom: 1px solid #eee;
      padding: 0.2rem;
      font-weight: bold;
    }
    .money-text {
      display: flex;
      flex-direction: row;
      border-top: 1px solid #e3e3e3;
      margin: .2rem;
      padding: .2rem;
      .mt-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        .mt-t-child {
          line-height: 0.5rem;
          color: #4a4b4a;
          font-size: 0.2rem;
        }
      }
      .mt-text:nth-child(1) {
        border-right: 1px solid #eee;
      }
    }
  }
  .mer-context {
    padding: 0.3rem;
    .Transaction {
      .tr-top {
        font-weight: bold;
        border-bottom: 1px solid #eee;
        padding-bottom: 0.2rem;
        .tr-title {
        }
      }
      .tr-context {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        justify-content: center;
        align-items: center;
        .tr-cont-child {
          margin-top: 0.3rem;
          line-height: 0.5rem;
          font-size: 0.24rem;
          text-align: center;
          width: 30%;
          display: flex;
          flex-direction: column;
          .tr-span {
            font-weight: bold;
            font-size: 0.23rem;
            color: #464747;
            .tr-imgs {
              padding: 0.15rem;
              width: 20%;
              border-radius: 50%;
              background: #24aaed;
            }
          }
        }
      }
    }
  }
}
</style>
