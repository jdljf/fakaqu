<template>
    <div>
        <div style="width: 150px;height: 150px;margin:20px auto;">
            <div  style="width: 100%;height: 100%;position: relative;">
                <img src="../../assets/images/loading.gif" alt="" style="position: absolute;top:0;bottom: 0;left: 0;right: 0;margin: auto">
            </div>
        </div>
        <div style="font-size: 13px;width:90%;margin:20px auto;color: #999;text-align: center;">
            正在获取卡密中，请不要离开或关闭此页面。
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";
export default {
  name: "Wait",
  data() {
    return {
      no: ""
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.query.no) {
          this.no = newValue.query.no;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.setintervals();
  },
  methods: {
    setintervals() {
      let that = this;
      this.timer = setInterval(function() {
        that.orderStatuss();
      }, 5000);
    },
    orderStatuss() {
      let datas = {
        no: this.no
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
  }
};
</script>

<style scoped>
</style>
