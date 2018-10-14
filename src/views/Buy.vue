<template>
  <div style="width: 100%;background: #eaedee;border: 1px solid #eaedee;">
    <div style="width: 1200px;height:800px;margin: 50px auto;background: #ffffff;border: 1px solid #ffffff;position: relative;">
      <div style="width: 100%;margin-top: 20px;">
        <strong style="display: inline-block;width: 70%;margin-left: 4%">请您尽快付款，以便订单及时处理！</strong>
        <strong style="display: inline-block;width: 25%">应付金额：
          <strong style="color: red">{{price}}</strong>元</strong>
      </div>
      <div style="font-size: 13px;margin-top: 10px;margin-left: 4%;color: #999">
        请您在提交订单后5分钟内完成支付，否则订单会自动取消。
      </div>
      <div style="margin-left: 4%;font-size: 13px;margin-top: 20px;">
        <p style="display: inline-block">订单号:
          <span style="margin-left: 5px">{{orderNum}}</span>
        </p>
        <p style="display: inline-block;margin-left: 50px;">订单时间:
          <span style="margin-left: 5px">{{date}}</span>
        </p>
      </div>
      <div style="width: 200px;height: 200px;position: absolute;top:0;bottom:0;left: 0;right: 0;margin: auto;">
        <img :src="picUrl" alt="付款码" style="width: 100%" v-if="isSHow">
        <div v-else style="width: 100%;height: 100%;position: relative;border: 1px solid #eee">
          <img src="../assets/images/loading.gif" alt="" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin: auto">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import { clearInterval } from "timers";
export default {
    name: "Buy",
    data() {
        return {
            isSHow: false,
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
                this.isSHow = true;
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
                this.orderdata = data.data;
                if (data.data.status === 3) {
                    var orderdata = JSON.stringify(this.orderdata);
                    this.$router.push({
                        name: "Paysuccess",
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
    },
    destroyed() {
        if (!localStorage.Order_Storage) {
            let orderStorage = [];
            orderStorage.push(this.orderdata);
            localStorage.setItem("Order_Storage", JSON.stringify(orderStorage));
        } else {
            let orderStorage = JSON.parse(localStorage.Order_Storage);
            orderStorage.push(this.orderdata);
            localStorage.setItem("Order_Storage", JSON.stringify(orderStorage));
        }
    }
};
</script>

<style scoped>
</style>
