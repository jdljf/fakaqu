<template>
    <div style="background: #fff;height: 100vh;width: 100%" class="wx-order-wrap">
        <div style="text-align: center;font-size: 25px;" class="wx-pay-product">{{product}}</div>
        <div class="order-price"><span style="font-size: 30px;">￥ {{OrderCount}}</span></div>
        <div class="wx-pro-info" style="margin-top: 10px;border-bottom: 2px solid #eee;border-top: 2px solid #eee;">
            <div class="order-num clearfix" v-show="MoneyUser"><span style="float: left;width: 30%;text-align: left">收款方</span><span style="float: right;width: 70%;text-align: right;word-break: break-all;">{{MoneyUser}}</span></div>
            <div class="order-product clearfix"><span style="float: left;width: 30%;text-align: left">商&nbsp;&nbsp;&nbsp;品</span><span style="float: right;text-align: right;width: 70%;word-break: break-all;">{{product}}</span></div>
        </div>
        <a href="javascript:;" @click="wxPay(paymentInfo)" class="order-btn">立即支付</a>
    </div>
</template>

<script>
import api from "@/axios/api";
export default {
  name: "WxPay",
  data() {
    return {
      orderNo: "",
      MoneyUser: "",
      OrderCount: 0,
      product: "",
      paymentInfo: null,
      curUrl: "",
      lastLink: "",
      curSort: ""
    };
  },
  created() {
    this.curUrl = window.location.href;
    this.getWxConfig({ params: { url: this.curUrl } });
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue) {
          const no = newValue.query.no;
          const openid = newValue.query.openid;
          this.curSort = newValue.query.sortFlag;
          if (no === "" || openid === "" || this.curSort === "") {
            this.$router.push({ name: "home" });
            return;
          } else {
            const data = { no: no, openid: openid };
            this.getWxOrderInfo(data);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getWxConfig(data) {
      api.getWxJs(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          wx.config({
            debug: data.data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.signature, // 必填，签名
            jsApiList: data.data.jsApiList // 必填，需要使用的JS接口列表
          });
        }
      });
    },
    getWxOrderInfo(data) {
      api.getWxOrder(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.orderNo = data.data.order.no;
          this.MoneyUser = data.data.order.user.shop_name;
          this.OrderCount = data.data.order.total_amount;
          this.paymentInfo = data.data.wechat_pay;
          this.product = data.data.order.items.title;
          if (this.curSort === "all") {
            this.lastLink = data.data.order.user.link_code;
          } else {
            this.lastLink = data.data.order.items.link_code;
          }
        }
      });
    },
    wxPay(paymentInfo) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.callPayment(paymentInfo),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent(
            "WeixinJSBridgeReady",
            this.callPayment(paymentInfo)
          );
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.callPayment(paymentInfo)
          );
        }
      } else {
        this.callPayment(paymentInfo);
      }
    },
    callPayment(paymentInfo) {
      const _this = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", paymentInfo, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.$router.push({
            path: "/wait/result",
            query: { no: _this.orderNo }
          });
        } else {
          WeixinJSBridge.log(res.err_msg);
          if (_this.curSort === "all") {
            _this.$router.push({
              name: "payShop",
              params: { linkcode: _this.lastLink }
            });
          } else {
            _this.$router.push({
              name: "pay-no",
              params: { linkcode: _this.lastLink }
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.wx-order-wrap {
  .wx-pay-product {
    padding-top: 20px;
  }
  .wx-pro-info {
    color: #666;
    padding: 20px 0;
    .order-num {
      padding: 0 20px;
      /*text-align: center;*/
      line-height: 30px;
    }
    .order-product {
      padding: 0 20px;
      /*text-align: center;*/
      line-height: 30px;
    }
  }

  .order-price {
    margin-top: 20px;
    text-align: center;
  }
  .order-btn {
    display: block;
    width: 90%;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    margin: 20px auto;
    background: #1aad19;
    color: #fff;
  }
}
</style>
