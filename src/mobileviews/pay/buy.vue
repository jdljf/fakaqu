<template>
    <div style="width: 100%;background: #eaedee;">
        <div style="background: #ffffff;border: 1px solid #ffffff;position: relative;">
            <div style="width: 100%;text-align: left">
                <strong style="display: block;width: 90%;margin:20px auto;">请您尽快付款，以便订单及时处理！</strong>
                <strong style="display: block;width: 90%;margin:20px auto;">应付金额：
                    <strong style="color: red">{{price}}</strong>元</strong>
            </div>
            <div style="font-size: 13px;width:90%;margin:20px auto;color: #999;text-align: left;">
                请您在提交订单后5分钟内完成支付，否则订单会自动取消。
            </div>
            <div style="width:90%;margin:20px auto;font-size: 13px;text-align: left;line-height: 20px;">
                <p style="display: block">
                    <span>订单号:</span>
                    <span style="margin-left: 5px">{{orderNum}}</span>
                </p>
                <p style="display: block;">
                    <span>订单时间:</span>
                    <span style="margin-left: 5px">{{date}}</span>
                </p>
            </div>
            <div style="width: 150px;height: 150px;margin:20px auto;">
                <img :src="picUrl" alt="付款码" style="width: 100%" v-if="isShow">
                <div v-else style="width: 100%;height: 100%;position: relative;border: 1px solid #eee">
                    <img src="../../assets/images/loading.gif" alt="" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin: auto">
                </div>
            </div>
            <div style="font-size: 13px;width:90%;margin:20px auto;color: #999;text-align: center;">
                请长按二维码保存图片再进行扫描付款。
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";
export default {
  name: "buy",
  data() {
    return {
      isShow: false,
      date: "",
      price: "",
      orderNum: "",
      picUrl: "",
      time: "",
      timer: null,
      orderdata: []
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.query.no) {
          const data = { no: newValue.query.no };
          this.getPayPic(data);
        }
      },
      immediate: true
    },
    picUrl(newValue) {
      if (newValue) {
        this.isShow = true;
      }
    }
  },
  methods: {
    setintervals() {
      let that = this;
      this.timer = setInterval(function() {
        that.orderStatuss();
      }, 5000);
    },
    getPayPic(data) {
      api.getMoneyPic(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.date = data.data.created_at;
          this.price = data.data.amount_format;
          this.picUrl = data.data.path;
          this.orderNum = data.data.no;
        }
      });
    },
    orderStatuss() {
      let datas = {
        no: this.orderNum
      };
      api.orderStatus(datas).then(res => {
        const data = res.data;
        if (data.data.status === 3) {
          this.orderdata = data.data;
          var orderdata = JSON.stringify(this.orderdata);
          this.$router.push({
            name: "paysuccess",
            query: { orderdatas: orderdata }
          });
          window.clearInterval(this.timer);
          return;
        } else if (data.data.status === -1) {
          this.$router.go(-1);
          window.clearInterval(this.timer);
        }
      });
    }
  },
  mounted() {
    this.setintervals();
  }
};
</script>

<style scoped>
</style>
