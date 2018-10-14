<template>
    <div class="mb-pay">
        <div>
            <div class="mb-pay-header">
                <div style="padding: 15px 0;" class="clearfix">
                    <span style="width: 26%;padding-left: 4%">联系卖家</span>
                    <span style="width: 40%;">发卡去商户</span>
                    <span style="width: 20%;padding-left: 10%">帮助</span>
                </div>
            </div>
            <div class="mb-pay-top">
                <div class="clearfix" v-if="$route.meta.option">
                    <span class="mb-pay-span" style="display: block;width: 26%;float: left;padding-left:4%;">商品分类</span>
                    <el-select v-model="value" placeholder="请选择" size="small"  @change="getExistProduct" style="padding: 16px 4% 16px 0;float: right;width: 65%;">
                        <el-option
                                v-for="item in sortOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="clearfix">
                    <span class="mb-pay-span" style="display: block;width: 26%;float: left;padding-left:4%;">商品名称</span>
                    <el-select v-model="value1"  v-if="$route.meta.option"  placeholder="请选择" @change="pickExistProduct"  size="small" style="padding: 16px 4% 16px 0;float: right;width: 65%;">
                        <el-option
                                v-for="item in productOptions"
                                :key="item.id"
                                :label="item.goods_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span v-else class="mb-pay-span" style="padding: 24px 4% 24px 0;float: right;width: 65%;">{{productName}}</span>
                </div>
            </div>
            <div class="mb-pay-center">
                <div class="clearfix">
                    <span class="mb-pay-span" style="display: block;width: 26%;float: left;padding-left:4%;">商品单价</span>
                    <div style="padding: 24px 4% 16px 0;float: left;width: 65%;text-align: right">
                       <span class="mb-pay-span" style="color: red;font-weight: normal;">{{unitPrice}} 元</span>
                    </div>
                </div>
                <div class="clearfix">
                    <span class="mb-pay-span" style="display: block;width: 26%;float: left;padding-left:4%;">购买数量</span>
                    <div style="padding: 16px 4% 16px 0;float: left;width: 38%;">
                        <el-input-number size="small" v-model="buyNum" :min="minBuy" :max="stock>=99? 99: stock" ></el-input-number>
                    </div>
                    <div style="float: left;padding: 24px 4% 24px 0;width: 24%;text-align: right;">
                        <span style="color: red;font-weight: normal;">库存:{{stock>=9999? "充足": stock}}</span>
                    </div>
                </div>
                <div class="clearfix">
                    <span class="mb-pay-span" style="display: block;width: 26%;float: left;padding-left:4%;">联系方式</span>
                    <div style="padding: 16px 4% 16px 0;float: right;width: 65%;">
                        <el-input v-model="contact" placeholder="推荐填写QQ号或手机号" size="small"></el-input>
                    </div>
                </div>
                <div class="clearfix">
                    <span class="mb-pay-span"   style="display: block;width: 26%;float: left;padding-left:4%;">优惠券</span>
                    <div style="padding: 16px 4% 16px 0;float: right;width: 65%;">
                        <el-input v-model="couponCode" placeholder="请填写你的优惠券" size="small"></el-input>
                    </div>
                </div>
            </div>
            <div class="mb-pay-methods">
                <div class="clearfix">
                    <span style="display: block;width:30%;float: left;padding-left:4%;">选择付款方式</span>
                </div>
                <!-- <div class="clearfix" @click="pickPay(1)" >
                    <div class="pick-logo">
                        <img src="../../assets/images/mbalipay.png" alt="" width="20px" height="20px">
                    </div>
                   <span class="pick-text">
                   支付宝支付
                  </span>
                    <div class="pick-btn" >
                        <input id="item1" type="radio" name="item" value="1">
                        <label for="item1"></label>
                    </div>
                </div> -->
                <div class="clearfix" @click="pickPay(2)" >
                    <div  class="pick-logo">
                        <img src="../../assets/images/weixinpay.png" alt="" width="20px" height="20px">
                    </div>
                    <span  class="pick-text">
                   微信支付
                  </span>
                    <div class="pick-btn">
                        <input id="item2" type="radio" name="item" value="2" >
                        <label for="item2"></label>
                    </div>
                </div>
            </div>
            <div class="mb-pay-bottom clearfix" style="background: #eee;">
                <div class="mb-pay-concat" style=" ">
                    <div style="width: 20px;height: 20px;position: absolute;top:10px;left: 28px;">
                        <img src="../../assets/images/qqpay.png" alt="" width="100%" height="100%">
                    </div>
                    <p style="left: 12px;top:40px;position: absolute;width: 100%">卖家QQ</p>
                </div>
                <p style="float: left;text-align: center;width: 100%;padding: 20px 0;">投诉 查单请联系官方QQ：<span style="color: rgba(50, 155, 244, 1);">800193022</span></p>
            </div>
        </div>
        <div class="pay-bottom clearfix">
            <div class="clearfix">
                <span style="width:67%;float: left;padding: 15px 0 15px 4%;">需支付:<strong style="color: red;font-size: 20px;">￥{{sum}}</strong></span>
                <span style="width: 29%;float: right;padding: 15px 0; line-height: 20px;" class="pay-bottom-btn"  @click="createOrder">去支付</span>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/axios/api";
import Cookies from "js-cookie";
import { MessageBox } from "element-ui";
export default {
  name: "Pay",
  data() {
    return {
      curShopName: "",
      isWeixinFlag: false,
      orderPrice: "",
      orderNum: "",
      show: false,
      productName: "",
      isSelect: -1,
      minBuy: 1,
      unitPrice: "0",
      couponCode: "",
      contact: "",
      stock: 0,
      buyNum: 0,
      maxBuy: 1,
      linkCode: "",
      value: "",
      value1: "",
      sortOptions: [],
      productOptions: []
    };
  },
  created() {
    // localStorage.setItem("name",this.$store.state.user.shop_name);
    // this.curShopName = this.$store.state.user.shop_name;
    if (this.isWeiXin()) {
      this.isWeixinFlag = true;
      const openid = Cookies.get("openid") || "";
      if (openid === "") {
        const linkcode = this.$route.params.linkcode;
        const sort = this.$route.meta.option ? "1" : "0";
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxeece7115dfaf2592&redirect_uri=http://faka.xuandev.com/auth/Certification&response_type=code&scope=snsapi_base&state=${linkcode}${sort}&connect_redirect=#wechat_redirect`;
        window.location.href = url;
        return;
      }
    }
    let data = { params: { link_code: this.$route.params.linkcode } };
    if (this.$route.meta.option) {
      this.getProductSort(data);
    } else {
      this.linkCode = this.$route.params.linkcode;
      this.getAllInfo(data);
    }
  },
  // mounted() {
  //   this.curShopName = localStorage.getItem("name");
  // },
  watch: {
    minBuy(newValue) {
      if (newValue) {
        this.buyNum = newValue;
      }
    }
  },
  computed: {
    sum() {
      return this.unitPrice * this.buyNum;
    }
  },
  methods: {
    isWeiXin() {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    getAllInfo(data) {
      api.getAllBuyInfo(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.productName = data.data.goods_name;
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
    pickPay(item) {
      this.isSelect = item;
      document.getElementById("item" + item).checked = true;
    },
    createOrder() {
      if (this.sum === 0 || this.contact === "" || this.isSelect === -1) {
        this.$message({
          message: "请检查填写信息是否有误",
          type: "error",
          customClass: "my-message"
        });
        return;
      }
      const data = {
        link_code: this.linkCode,
        number: this.buyNum,
        sms_notice: "0",
        email: "",
        email_notice: "0",
        pay_id: this.isSelect,
        credence: this.contact,
        coupon_code: this.couponCode
      };
      api.createPayOrder(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          if (this.isWeixinFlag) {
            this.$router.push({
              path: "/wx/pay",
              query: {
                no: data.data.no,
                openid: Cookies.get("openid"),
                sortFlag: this.$route.meta.option ? "all" : "single"
              }
            });
            return;
          }
          this.$confirm("", "订单创建成功", {
            confirmButtonText: "立即付款",
            cancelButtonText: "返回修改",
            type: "success",
            dangerouslyUseHTMLString: true,
            message: `<div><span style="display: block"><strong style="display: block">订单编号:</strong><span>${
              data.data.no
            }</span></span>
                      <span style="display: block"><strong style="display: block">订单金额:</strong><span style="color:red;">${
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
                message: "请确认无误后再提交",
                customClass: "my-message"
              });
            });
        } else {
          this.$message({
            type: "info",
            message: "商品库存不足",
            customClass: "my-message"
          });
        }
      });
    },
    getExistProduct(id) {
      const data = { params: { category_id: id } };
      this.getProduct(data);
    },
    getProductSort(data) {
      api.getPaySort(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.sortOptions = data.data;
        }
      });
    },
    getProduct(data) {
      api.searchInCategory(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          this.productOptions = data.data;
          if (this.productOptions.length === 0) {
            this.value1 = "";
            this.unitPrice = 0;
            // 提示无商品
            this.$message({
              type: "info",
              message: "对不起此分类下无商品",
              customClass: "my-message"
            });
          }
        }
      });
    },
    pickExistProduct(id) {
      const temp = this.productOptions.filter(o => {
        return o.id === id;
      });
      const card = temp[0];
      this.unitPrice = card.market_price;
      this.minBuy = card.begin_buy_num;
      this.stock = card.stock;
      this.maxBuy = card.stock;
      this.linkCode = card.link_code;
    }
  }
};
</script>

<style  lang="scss">
.my-message {
  min-width: 90% !important;
}
.el-message-box {
  width: 90% !important;
}
.mb-pay {
  color: rgba(123, 139, 190, 1);
  font-weight: bold;
  font-size: 14px;

  .mb-pay-header {
    background: rgba(50, 155, 244, 1);
    color: #fff;
    span {
      font-family: HiraginoSansGB-W3;
      display: block;
      float: left;
      /*text-align: center;*/
      &:nth-child(1) {
        font-weight: normal;
      }
      &:nth-child(2) {
        text-align: center;
        font-weight: bold;
      }
      &:nth-child(3) {
        font-weight: normal;
        text-align: center;
        float: right;
      }
    }
  }
  .mb-pay-top {
    border-bottom: 5px solid #fafafa;
    width: 100%;
    font-weight: bold;
    .mb-pay-span {
      padding: 24px 0px;
    }
  }
  .mb-pay-center {
    border-bottom: 5px solid #fafafa;
    .mb-pay-span {
      padding: 24px 0px;
    }
  }
  .mb-pay-methods {
    font-weight: normal;
    font-size: 14px;
    .pick-logo {
      width: 10%;
      float: left;
      padding: 15px 0 15px 4%;
    }
    .pick-text {
      display: block;
      width: 73%;
      float: left;
      line-height: 20px;
    }
    .pick-btn {
      width: 12%;
      padding: 16px 0;
      float: right;
      position: relative;
      input[type="radio"] {
        width: 16px;
        height: 16px;
        opacity: 0;
      }

      label {
        position: absolute;
        left: 5px;
        top: 16px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #999;
      }

      /*设置选中的input的样式*/
      /* + 是兄弟选择器,获取选中后的label元素*/
      input:checked + label {
        background-color: #fe6d32;
        border: 1px solid #fe6d32;
      }

      input:checked + label::after {
        position: absolute;
        content: "";
        width: 4px;
        height: 10px;
        top: 1px;
        left: 5px;
        border: 2px solid #fff;
        border-top: none;
        border-left: none;
        transform: rotate(45deg);
      }
    }
    div {
      span {
        padding: 15px 0px;
      }
    }
  }
  .mb-pay-bottom {
    font-weight: normal;
    .mb-pay-concat {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0px 0px 3px rgba(50, 155, 244, 1);
      position: relative;
      float: right;
      margin-top: 10px;
      margin-right: 10px;
    }
  }
  .pay-bottom {
    width: 100%;
    .pay-bottom-btn {
      text-align: center;
      font-family: HiraginoSansGB-W3;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      background: rgba(50, 155, 244, 1);
    }
  }
}
</style>
