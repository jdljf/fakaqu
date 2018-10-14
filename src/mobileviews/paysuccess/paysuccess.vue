<template>
    <div class="px-success">
        <div class="header">
            <span class="h-tit">fakaqu</span>
        </div>
        <div class="s-context">
            <div class="s-text">
                <img src="../../assets/images/success.png" class="icon-img" />
                <span class="c-title">购买成功</span>
                <div class="order-success">
                    <span>您已成功
                        <b class="em">购买{{orderdatas.title}}</b>,</span>
                    <span>消费
                        <b class="em">{{orderdatas.total_amount}}</b>元</span>
                </div>
                <div class="s-records">
                    <div class="s-recordli">
                        <b>订单:</b>
                        <span class="order-info">{{orderdatas.no}}</span>
                    </div>
                    <div class="s-recordli" v-for="(item,$index) in kamiarr" :key="item">
                        <b>卡密({{$index+1 }}) :</b>
                        <span class="order-info">{{item}}</span>
                    </div>
                    <div class="s-recordli">
                        <b>购买时间:</b>
                        <span class="paid-time">{{orderdatas.paid_at}}</span>
                    </div>
                </div>
                <div class="s-btn">
                    <button class="gotoshop" @click="gotoshop">继续购买</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      kamiarr: [],
      orderdatas: {
        title: "",
        link_code: ""
      }
    };
  },
  methods: {
    gotoshop() {
      this.$router.push({
        name: "pay-no",
        params: { linkcode: this.orderdatas.link_code }
      });
    }
  },
  mounted() {
    if (
      this.$route.query.orderdatas == undefined ||
      this.$route.query.orderdatas == null
    ) {
      return;
    }
    this.orderdatas = JSON.parse(this.$route.query.orderdatas);
    this.orderdatas.title = this.orderdatas.items.title;
    this.orderdatas.link_code = this.orderdatas.items.link_code;
    this.kamiarr = this.orderdatas.kami_info.content;
  }
};
</script>

<style scoped lang="scss">
.px-success {
  width: 100%;
  position: relative;
  .header {
    text-align: center;
    line-height: 1.6rem;
    height: 1.6rem;
    color: #fff;
    font-family: "Weibei SC";
    font-weight: bold;
    font-size: 0.5rem;
    background: linear-gradient(to bottom, #58a6fd, #319ee6);
    .h-tit {
      padding-left: 0.4rem;
    }
  }

  .s-context {
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    margin: auto;
    background: #fff;
    color: #2b2d2d;
    box-shadow: 1px 1px 3px 2px #f2f2f2;
    width: 90%;
    height: 60%;
    .s-text {
      margin: 10% auto 10% auto;
      width: 100%;
      padding: 10px;
      padding-top: 10%;
      .icon-img {
        vertical-align: middle;
        width: 10%;
      }
      .c-title {
        margin-left: 2%;
        font-weight: bold;
        font-family: "Weibei SC";
        font-size: 0.25rem;
      }
      .order-success {
        margin-top: 0.4rem;
        .em {
          padding-left: 0.08rem;
          padding-right: 0.08rem;
          color: #e6272d;
        }
      }
      .s-records {
        margin-top: 0.8rem;
        .s-recordli {
          padding-top: 0.4rem;
          .order-info {
            margin-left: 0.2rem;
            word-break: break-word;
            // width: 3rem;
            max-width: 4rem;
            display: inline-block;
            vertical-align: top;
          }
          .paid-time {
            margin-left: 0.2rem;
          }
        }
      }
      .s-btn {
        padding-top: 0.2rem;
        text-align: center;
        .gotoshop {
          padding: 0.2rem 0.4rem;
          background: #4aa3f4;
          border: none;
          box-shadow: 1px 1px 3px 1px #ccc;
          color: #fff;
          border-radius: 0.1rem;
        }

        .s-btn {
          padding-top: 0.2rem;
          text-align: center;
          .gotoshop {
            padding: 0.2rem 0.4rem;
            background: #4aa3f4;
            border: none;
            box-shadow: 1px 1px 3px 1px #ccc;
            color: #fff;
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>
