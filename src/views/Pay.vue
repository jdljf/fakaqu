<template>
  <div class="pay-page">
    <div class="pay-banner">
      <div class="banner-wrap">
        <router-link to="/">
          <span>fakaqu</span>
        </router-link>
        <div class="btn-wrap">
          <div style="width: 290px;height: 100px;float:right;">
            <router-link to="/order">
              <span class="banner-order banner-a">订单查询</span>
            </router-link>
            <router-link to="/">
              <span class="banner-buy banner-a">购买记录</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <div class="pay-content">
        <div class="pay-title" v-if="$route.meta.option">
          选择商品
        </div>
        <div class="pr-sort" v-if="$route.meta.option">
          <span>商品分类</span>
          <el-select v-model="value" placeholder="请选择" @change="getExistProduct">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="pr-name">
          <span>商品名称</span>
          <el-select v-model="value1" placeholder="请选择" @change="pickExistProduct" v-if="$route.meta.option">
            <el-option v-for="item in options1" :key="item.id" :label="item.goods_name" :value="item.id">
            </el-option>
          </el-select>
          <span v-else>{{productName}}</span>
        </div>
        <div class="pr-description">
          <!--<span>商品描述</span>-->
          <div style="width: 718px;display: inline-block">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" disabled placeholder="暂无描述" v-model="textDetail">
            </el-input>
          </div>
        </div>
        <div class="pr-num">
          <span>购买数量</span>
          <el-input-number v-model="buyNum" :min="minBuy" :max="maxBuy"></el-input-number>
          <span style="display: inline-block;margin-left: 20px">库存:
            <strong style="display: inline-block;margin-left: 10px;color:red">{{stock}}</strong>
          </span>
        </div>
        <div class="pr-price">
          <span>商品单价</span>
          <span class="unit-price">{{unitPrice}}</span>
        </div>
        <div class="pr-contact">
          <span>联系方式</span>
          <div style="width: 300px;display: inline-block">
            <el-input v-model="contact" placeholder="推荐填写QQ或手机号"></el-input>
          </div>
          <span style="color:rgba(255,73,73,1);font-size:16px;font-family:HiraginoSansGB-W3;margin-left: 15px">(订单查询的重要凭证)</span>
          <div>
            <el-checkbox v-model="phoneMessage">领取商品同时将商品信息短信至手机(费用0.1元）</el-checkbox>
            <!--<el-checkbox  v-model="emailMessage">交易成功后同时将支付结果发送到我的邮箱</el-checkbox>-->
            <!--<div style="display: inline-block;margin-left: 30px;" v-if="emailMessage">-->
            <!--<el-input v-model="email" placeholder="输入邮箱"></el-input>-->
            <!--</div>-->
            <el-checkbox v-model="coupon"> 使用优惠券(如果没有，请不要勾选)</el-checkbox>
            <div style="display: inline-block;margin-left: 30px;" v-if="coupon">
              <el-input v-model="couponCode" placeholder="输入优惠券"></el-input>
            </div>
          </div>
        </div>
        <div class="pay-way">
          <p>支付方式</p>
          <div class="pay-way-wrap clearfix">
            <div class="pay-wx pay-box" @click="pickPay(2)" :class="{ activeBorder : (isSelect === 2)}">
              <img src="../assets/images/wxzf.png" alt="" class="zf-pic">
              <span>微信支付</span>
              <img v-show="isSelect === 2" src="../assets/images/selected.png" alt="" class="selected-local" style="width: 22px;height: 22px;">
            </div>
            <!--<div class="pay-alipay pay-box" @click="pickPay(1)" :class="{ activeBorder : isSelect === 1 }">-->
            <!--<img src="../assets/images/zfbzf.png" alt="" class="zf-pic">-->
            <!--<span>支付宝支付</span>-->
            <!--<img  v-show="isSelect === 1" src="../assets/images/selected.png" alt="" style="width: 22px;height: 22px;" class="selected-local">-->
            <!--</div>-->
          </div>
          <span style="color:rgba(72,83,113,1);font-weight:400;font-size:28px;display: inline-block;margin:50px 0 20px 0;">应付总额:</span>
          <span style="color:rgba(255,73,73,1);font-family:HiraginoSansGB-W3;font-size:28px;display: inline-block;margin-left: 20px;">{{sum}}元</span>
        </div>
        <a href="javascript:;" class="pay-btn" @click="createOrder">立即支付</a>
      </div>
      <div class="merchant">
        <div class="merchant-top">商户信息</div>
        <div class="merchant-bottom">
          <div class="merchant-content">
            <div>
              <span>店铺名称:</span>
              <span>{{shop.shop_name}}</span>
            </div>
            <div>
              <span>商户网站:</span>
              <span>{{shop.site_url}}</span>
            </div>
            <div>
              <span>商品类型:</span>
              <span>数字卡密</span>
            </div>
            <div>
              <span>发货类型:</span>
              <span>自动发货</span>
            </div>
            <div>
              <span>卖家QQ:</span>
              <span>{{shop.qq}}</span>
            </div>
          </div>
          <a href="" class="contact-boss">咨询商家</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import { MessageBox } from "element-ui";
export default {
  name: "Pay",
  data() {
    return {
      shop: {
        qq: "",
        shop_name: "",
        site_url: ""
      },
      email: "",
      couponCode: "",
      productName: "",
      phoneMessage: false,
      emailMessage: false,
      coupon: false,
      stock: 0,
      minBuy: 1,
      maxBuy: 1,
      isSelect: 2,
      discount: "",
      checkList: [],
      contact: "",
      unitPrice: "0",
      buyNum: 1,
      textDetail: "",
      options: [],
      options1: [],
      value: "",
      value1: "",
      linkCode: ""
    };
  },
  created() {
    let data = { params: { link_code: this.$route.params.linkcode } };
    this.linkCode = this.$route.params.linkcode;
    if (this.$route.meta.option) {
      this.getProductSort(data);
      this.getShopInfo(data);
    } else {
      this.getAllInfo(data);
    }
  },
  watch: {
    minBuy(newValue) {
      if (newValue) {
        this.buyNum = newValue;
      }
    }
  },
  computed: {
    sum() {
      return this.unitPrice * this.buyNum + (this.phoneMessage ? 0.1 : 0);
    }
  },
  methods: {
    getAllInfo(data) {
      api.getAllBuyInfo(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.shop.site_url = data.data.user.site_url;
          this.shop.qq = data.data.user.qq;
          // this.shop.shop_name = data.user
          this.productName = data.data.goods_name;
          this.textDetail = data.data.description;
          this.unitPrice = data.data.market_price;
          this.minBuy = data.data.begin_buy_num;
          this.stock = data.data.stock;
          this.maxBuy = data.data.stock;
        } else {
          MessageBox.alert("商品不存在或已下架", "无此商品", {
            type: "warning"
          }).finally(() => {
            this.$router.push({ path: "/" });
          });
        }
      });
    },
    createOrder() {
      if (this.sum === 0 || this.contact === "" || this.isSelect === -1) {
        this.$message({
          message: "请检查填写信息是否有误",
          type: "error"
        });
        return;
      }
      const phone = this.phoneMessage ? "1" : "0";
      const email = this.emailMessage ? "1" : "0";
      const data = {
        link_code: this.linkCode,
        number: this.buyNum,
        sms_notice: phone,
        email: this.email,
        email_notice: email,
        pay_id: this.isSelect,
        credence: this.contact,
        coupon_code: this.couponCode
      };

      api.createPayOrder(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$confirm("", "订单创建成功", {
            confirmButtonText: "立即付款",
            cancelButtonText: "返回修改",
            type: "success",
            dangerouslyUseHTMLString: true,
            message: `<div><span style="display: block"><strong>订单编号:</strong><span style="margin-left: 5px;">${
              data.data.no
            }</span></span>
                      <span style="display: block"><strong>订单金额:</strong><span style="color:red;margin-left: 5px;">${
                        data.data.amount_format
                      }元</span></span></div>`
          })
            .then(() => {
              this.$router.push({
                path: "/order/buy",
                query: { no: data.data.no }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "请确认无误后再提交"
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: `${data.message}`
          });
        }
      });
    },
    getShopInfo(data) {
      api.getShopsInfo(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.shop = Object.assign({}, data.data);
        }
      });
    },
    // getorderlist() {
    //     api.getorderlist().then(res => {
    //         const data = res.data;
    //         if (data.data && data.data.length >= 0) {
    //             this.tableorder = data.data;
    //         }
    //     });
    // },
    pickExistProduct(id) {
      const temp = this.options1.filter(o => {
        return o.id === id;
      });
      const card = temp[0];
      this.unitPrice = card.market_price;
      this.textDetail = card.description;
      this.minBuy = card.begin_buy_num;
      this.stock = card.stock;
      this.maxBuy = card.stock;
      this.linkCode = card.link_code;
      if (this.stock < this.minBuy) {
        this.$message({
          message: "该商品库存不足,请选择其他商品",
          type: "info"
        });
        const timer = setTimeout(() => {
          window.location.reload(true);
          clearTimeout(timer);
        }, 500);
      }
    },
    getExistProduct(id) {
      const data = { params: { category_id: id } };
      this.getProduct(data);
    },
    getProductSort(data) {
      api.getPaySort(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.options = data.data;
        }
      });
    },
    getProduct(data) {
      api.searchInCategory(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          this.options1 = data.data;
          if (this.options1.length === 0) {
            this.value1 = "";
            this.unitPrice = 0;
            this.$message({
              message: "此分类下无商品",
              type: "warning"
            });
          }
        }
      });
    },
    pickPay(item) {
      this.isSelect = item;
    }
  }
};
</script>

<style scoped lang="scss">
.border-style {
  margin: 50px 0 0 50px;
  width: 718px;
  font-family: MicrosoftYaHei;
  border-bottom: 1px solid rgba(242, 242, 242, 1);
  color: rgba(72, 83, 113, 1);
}
.pay-page {
  height: 1450px;
  background: #fafafa;
  .pay-banner {
    position: fixed;
    z-index: 100;
    top: 0px;
    width: 100%;
    background: rgba(49, 127, 227, 1);
    .banner-wrap {
      margin: 0 auto;
      width: 1200px;
      height: 100px;
      span {
        float: left;
        width: 20%;
        margin-left: 1%;
        font-size: 34px;
        font-family: STHupo;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        /*text-align: center;*/
        line-height: 100px;
      }
      .banner-a {
        cursor: pointer;
        display: inline-block;
        width: 110px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(50, 155, 244, 1);
        margin: 32px 15px;
      }
      .btn-wrap {
        float: left;
        width: 78%;
        display: block;
        height: 100px;
        /*text-align: center;*/
        /*line-height: 100px;*/
        .banner-order {
        }
        .banner-buy {
        }
      }
    }
  }
  .content-wrap {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .pay-content {
      height: 1200px;
      /*width: 1200px;*/
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      margin: 100px auto 0px auto;
      .pay-title {
        font-size: 24px;
        font-weight: 400;
        padding: 25px 0;
        @extend .border-style;
      }
      .pr-sort {
        padding: 25px 0;
        font-size: 16px;
        font-weight: 400;
        margin: 0px 0 0 50px;
        @extend .border-style;
        span {
          margin: 0 40px 0 0;
        }
      }
      .pr-name {
        @extend .pr-sort;
      }
      .pr-description {
        @extend .pr-sort;
      }
      .pr-num {
        @extend .pr-sort;
      }
      .pr-price {
        @extend .pr-sort;
        .unit-price {
          font-size: 24px;
          font-family: HiraginoSansGB-W3;
          font-weight: normal;
          color: rgba(255, 73, 73, 1);
        }
      }
      .pr-contact {
        @extend .pr-sort;
        margin-top: 20px;
        .el-checkbox {
          margin-top: 20px;
          line-height: 30px;
          margin-left: 105px;
          display: inline-block;
        }
      }
      .pay-way {
        margin: 15px 0 0 50px;
        width: 718px;
        border-bottom: 1px solid #f2f2f2;
        p {
          padding: 10px 0;
          font-size: 24px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(72, 83, 113, 1);
        }
        .pay-way-wrap {
          margin: 20px 0;
          .pay-box {
            position: relative;
            float: left;
            margin-right: 20px;
            line-height: 60px;
            text-align: center;
            width: 220px;
            height: 60px;
            /*border: 1px solid rgba(24, 105, 255, 1);*/
            border: 1px solid rgba(229, 229, 229, 1);
            border-radius: 8px;
            cursor: pointer;
          }
          .pay-wx {
            .zf-pic {
              width: 32px;
              height: 28px;
              display: inline-block;
              float: left;
              margin-top: 16px;
              margin-left: 26px;
            }
            span {
              display: inline-block;
              font-size: 20px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(72, 83, 113, 1);
            }
          }
          .pay-alipay {
            .zf-pic {
              display: inline-block;
              float: left;
              margin-top: 12px;
              margin-left: 26px;
            }
            span {
              display: inline-block;
              font-size: 20px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(72, 83, 113, 1);
            }
          }
        }
      }
      .pay-btn {
        margin-left: 50px;
        margin-top: 30px;
        display: block;
        width: 190px;
        height: 50px;
        background: linear-gradient(
          180deg,
          rgba(81, 174, 253, 1),
          rgba(50, 155, 244, 1)
        );
        border-radius: 8px;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        font-family: HiraginoSansGB-W3;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    .merchant {
      top: 70px;
      right: 30px;
      position: absolute;
      width: 280px;
      height: 320px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      box-shadow: 0px 8px 20px 0px rgba(215, 234, 255, 1);
      .merchant-top {
        width: 280px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: rgba(49, 127, 227, 1);
        border-radius: 8px 8px 0px 0px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      .merchant-bottom {
        .merchant-content {
          div {
            margin-top: 15px;
            span {
              display: inline-block;
              margin-right: 6px;
              letter-spacing: 1px;
              font-size: 16px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(72, 83, 113, 1);
            }
          }
          padding: 20px 20px;
        }
        .contact-boss {
          margin: 0 auto;
          display: block;
          width: 250px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: linear-gradient(
            180deg,
            rgba(81, 174, 253, 1),
            rgba(50, 155, 244, 1)
          );
          border-radius: 8px;
          font-size: 20px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
.activeBorder {
  border: 1px solid rgba(24, 105, 255, 1) !important;
}
.selected-local {
  position: absolute;
  bottom: -1px;
  right: -1px;
}
</style>
