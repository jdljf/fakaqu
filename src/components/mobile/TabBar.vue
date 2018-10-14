<template>
    <div >
        <div class="overlay" @click="changeShow" :class="{'layShow': showFlag}">
            <ul class="mb-nav-bar" style="transition:all 1s">
                <li  class="item " v-for="item in curList" :key="item.id" style="text-align: center;" @click="handleMenuClick(item.pathName)">{{item.name}}</li>
            </ul>
        </div>
        <tabbar  id="tabBar" style="position: fixed;"  v-model="index">
            <tabbar-item @on-item-click="handleItemClick('main')">
                <img slot="icon" src="../../assets/images/main.png">
                <span slot="label" class="aa">综合信息</span>
            </tabbar-item>
            <tabbar-item  @on-item-click="handleItemClick('product')" >
                <img slot="icon" src="../../assets/images/product.png">
                <span slot="label">商品管理</span>
            </tabbar-item>
            <tabbar-item  @on-item-click="handleItemClick('transaction')">
                <img slot="icon" src="../../assets/images/transaction.png">
                <span slot="label">交易管理</span>
            </tabbar-item>
            <tabbar-item  @on-item-click="handleItemClick('shop')">
                <img slot="icon" src="../../assets/images/shop.png">
                <span slot="label">店铺管理</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  name: "TabBar",
  components: {
    Tabbar,
    TabbarItem
  },
  created() {},
  data() {
    return {
      index: -1,
      curList: [],
      showFlag: false,
      TabList: [
        {
          title: "综合信息",
          key: "main",
          children: [
            { id: 1, name: "管理中心", pathName: "Users" },
            { id: 2, name: "基本设置", pathName: "progress" },
            { id: 3, name: "修改密码", pathName: "ChangePassword" },
            { id: 4, name: "实名认证", pathName: "certification" },
            { id: 5, name: "安全设置", pathName: "security" },
            { id: 6, name: "结算记录", pathName: "settlement" },
            { id: 7, name: "申请提现", pathName: "withdrawals" }
          ]
        },
        {
          title: "商品管理",
          key: "product",
          children: [
            { id: 1, name: "商品分类", pathName: "Categories" },
            { id: 2, name: "商品列表", pathName: "Goodslist" },
            { id: 3, name: "添加商品", pathName: "Goodsadd" },
            { id: 4, name: "添加卡密", pathName: "Codeadd" },
            { id: 5, name: "库存卡密", pathName: "Secret" },
            { id: 6, name: "卡密回收站", pathName: "Batch" }
          ]
        },
        {
          title: "交易管理",
          key: "transaction",
          children: [
            { id: 1, name: "最近卖出", pathName: "SellRecently" },
            { id: 2, name: "订单记录", pathName: "Order" },
            { id: 4, name: "渠道分析", pathName: "Channel" },
            { id: 5, name: "收益统计", pathName: "Income" }
          ]
        },
        {
          title: "店铺管理",
          key: "shop",
          children: [
            { id: 1, name: "店铺链接", pathName: "Link" },
            // { id: 2, name: "商户费率", pathName: "" },
            { id: 2, name: "投诉管理", pathName: "Report" },
            { id: 3, name: "站内消息", pathName: "Sitemessage" },
            { id: 4, name: "登录日志", pathName: "Log" }
          ]
        }
      ]
    };
  },
  methods: {

    stopBodyScroll(isFixed) {
      let bodyEl = document.body;
      let top = 0;
      if (isFixed) {
        top = window.scrollY;

        bodyEl.style.position = "fixed";
        bodyEl.style.top = -top + "px";
      } else {
        bodyEl.style.position = "";
        bodyEl.style.top = "";

        window.scrollTo(0, top); // 回到原先的top
      }
    },
    handleMenuClick(name) {
      switch (name) {
        // 菜单点击的特殊情况
        case "":
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
    changeShow() {
      this.stopBodyScroll(false);
      this.showFlag = false;
      this.index = -1;
    },
    handleItemClick(name) {
      document.getElementsByClassName('mb-nav-bar')[0].classList.add("animate");
      this.stopBodyScroll(true);
      const children = this.TabList.filter(o => {
      return o.key === name;
      });
      this.curList = children[0].children;
      this.showFlag = true;
    }
  }
};
</script>
<style>
.weui-tabbar__item{
  display: inline-block !important;
   width:24% !important;

}
.weui-tabbar::before{
  position: fixed !important;
}
</style>

<style scoped lang="scss">
.animate{
  animation: tabs .6s;
}

@keyframes tabs{
  0%{
   transform: translateY(140px);

  }
  100%{
   transform: translateY(0px);
  }
}
.layShow {
  display: block !important;
}
.overlay {
  display: none;
  height: 100%;
  z-index: 3;
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.mb-nav-bar {
  position: fixed;
  /*z-index: 1;
     */
  width: 100%;
  overflow-y: auto;
  color: #000;
  max-height: 50%;
  background: #fff;
  border-radius: 5px 5px 0 0;
  padding-bottom: 1rem;
  bottom: 0;
  li {
    padding: 0.3rem 0;
    font-size: 0.26rem;
    &:hover {
      background: #464645;
      color: #fff;
      opacity: 0.5;
    }
  }
}
</style>
