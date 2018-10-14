<template>
    <div class="cm-px-mb-edit">
      <div class="edit-mask" v-show="tag"></div>
      <second-alert v-show="tag" @callback="operateProduct" @close="tag=false"></second-alert>
        <div style="margin-bottom: 1.2rem" class="px-mb-edit">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">{{editBanner}}</span></x-header>
            <table border="1" cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    <td>商品分类</td>
                    <td>
                        <el-select v-model="value"   style="width: 97%;margin-left:1%;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>商品排序</td>
                    <td><el-input v-model="formBody.sort"  style="width: 97%;margin-left:1%;"></el-input></td>
                </tr>
                <tr>
                    <td>商品名称</td>
                    <td><el-input v-model="formBody.goods_name"   style="width: 97%;margin-left:1%;"></el-input></td>
                </tr>
                <tr>
                    <td>销售价格</td>
                    <td><el-input v-model="formBody.market_price" style="width: 97%;margin-left:1%;"></el-input></td>
                </tr>
                <!--<tr>-->
                <!--<td>批发优惠</td>-->
                <!--<td>-->
                <!--<div style="margin-left: 2%;">-->
                <!--<el-radio v-model="formBody.is_coupon" label="1">使用</el-radio>-->
                <!--<el-radio v-model="formBody.is_coupon" label="2">不使用</el-radio>-->
                <!--</div>-->
                <!--</td>-->
                <!--<td><span>是否设置批发购买时使用批发价格！</span></td>-->
                <!--</tr>-->
                <tr>
                    <td>成本价格</td>
                    <td><el-input v-model="formBody.cost_price"  style="width: 97%;margin-left:1%;"></el-input></td>
                </tr>
                <!--<tr>-->
                <!--<td>{{$t("AddGoods.g")}}</td>-->
                <!--<td>-->
                <!--<div style="margin-left: 2%;">-->
                <!--<el-radio v-model="formBody.status" label="0">{{$t("option.a")}}</el-radio>-->
                <!--<el-radio v-model="formBody.status" label="1">{{$t("option.b")}}</el-radio>-->
                <!--</div>-->
                <!--</td>-->
                <!--<td></td>-->
                <!--</tr>-->
                <tr>
                    <td>起购数量</td>
                    <td><el-input v-model="formBody.begin_buy_num"  style="width: 97%;margin-left:1%;"></el-input></td>
                </tr>
                <tr>
                    <td>库存预警</td>
                    <td><el-input v-model="formBody.stock_warning" style="width: 97%;margin-left:1%;" ></el-input></td>
                </tr>
                <tr>
                    <td>卡号名称</td>
                    <td><el-input v-model="formBody.card_num_name" style="width: 97%;margin-left:1%;" ></el-input></td>
                </tr>
                <tr>
                    <td>卡号密码</td>
                    <td><el-input v-model="formBody.card_secret_name"  style="width: 97%;margin-left:1%;"></el-input></td>
                </tr>
                <tr>
                    <td>订单费率</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.order_ratio_type" :label= 0>买家承担</el-radio>
                            <el-radio v-model="formBody.order_ratio_type" :label= 1>卖家承担</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>通知方式</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.notice_type"   :label= 0>站内短信</el-radio>
                            <el-radio v-model="formBody.notice_type"  :label= 1>发送邮件</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>优惠券</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.is_coupon" :label=0>支持</el-radio>
                            <el-radio v-model="formBody.is_coupon" :label=1>不支持</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>售卡通知</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.sale_notice" :label= 0>关闭</el-radio>
                            <el-radio v-model="formBody.sale_notice" :label= 1>开启</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>发货规则</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.sale_type" :label=0>按序发货</el-radio>
                            <el-radio v-model="formBody.sale_type" :label=1>随机发货</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>提卡密码</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.show_pass_type" :label=0>关闭</el-radio>
                            <el-radio v-model="formBody.show_pass_type" :label=1>必填</el-radio>
                            <el-radio v-model="formBody.show_pass_type" :label=2>选填</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>密码开关</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="formBody.pass_switch" :label= 0>关闭</el-radio>
                            <el-radio v-model="formBody.pass_switch" :label= 1>开启</el-radio>
                        </div>
                    </td>
                </tr>
                <!--<tr>-->
                <!--<td>客户信息</td>-->
                <!--<td><el-input v-model="formBody.buyer_info"  style="width: 97%;margin-left:1%;"></el-input></td>-->
                <!--<td><span>客户下单时输入的联系方式或充值账号格式限制</span></td>-->
                <!--</tr>-->
                <tr>
                    <td class="describe-style">
                        <span>商品说明</span>
                    </td>
                    <td>
                        <el-input v-model="formBody.description" type="textarea"   maxlength="200"  :autosize="{ minRows: 4, maxRows: 4}" style="width: 100%;">
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td class="describe-style">使用说明</td>
                    <td>
                        <el-input v-model="formBody.remark"  type="textarea"  maxlength="200"  :autosize="{ minRows: 4, maxRows: 4}" style="width: 100%;">
                        </el-input>
                    </td>
                </tr>
                </tbody>
            </table>
            <el-button size="mini" @click="operateConfirm"  type="primary" round icon="el-icon-check" style="margin: 0.2rem auto;display: block;">{{btnMsg}}</el-button>
        </div>
        <TabBar></TabBar>
        <!--<alert v-model="show1" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>-->
    </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
import TabBar from "@/components/mobile/TabBar";
import SecondAlert from "@/components/mobile/PwdAlert.vue";
import {
  XHeader,
  XInput,
  XNumber,
  Group,
  Divider,
  Alert,
  Confirm,
  LoadMore,
  Selector
} from "vux";
export default {
  name: "edit",
  components: {
    XHeader,
    XInput,
    XNumber,
    Group,
    Divider,
    TabBar,
    Alert,
    Confirm,
    LoadMore,
    Selector,
    SecondAlert
  },
  data() {
    return {
      tag:false,
      curSortId: "",
      queryId: "",
      show1: false,
      msgText: "",
      clickTarget: -1,
      value: "",
      options: [],
      btnMsg: "",
      editBanner: "",
      formBody: {
        category_id: "",
        page_type: "0",
        status: "1",
        sort: "",
        goods_name: "",
        market_price: "",
        cost_price: "0",
        begin_buy_num: "1",
        stock_warning: "0",
        card_num_name: "卡号",
        card_secret_name: "卡密",
        buyer_info: "0",
        pass_switch: 0,
        show_pass_type: 0,
        sale_type: 0,
        sale_notice: 0,
        is_coupon: 1,
        notice_type: 0,
        order_ratio_type: 0,
        remark: "",
        description: "",
        page_password: ""
      }
    };
  },
  created() {
    this.getSelectData();
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.name === "Goodsadd") {
          this.editBanner = "添加新商品";
          this.btnMsg = "确认添加";
          this.clickTarget = 1;
        } else {
          this.editBanner = "修改商品信息";
          this.btnMsg = "确认修改";
          this.clickTarget = 0;
        }
        this.queryId = newValue.query.id;
      },
      immediate: true
    }
  },
  methods: {
    getFileInfo(data) {
      api.getUpdateGood({ params: { id: data } }).then(res => {
        const data = res.data;
        if (data.result === 1) {
          // log(this.formBody.category_id);
          // log(data.data);
          this.formBody = {};
          this.formBody = { ...data.data };
          // log(this.formBody.category_id);
          const curSort = _.find(this.options, o => {
            return o.id === Number(this.formBody.category_id);
          });
          this.value = curSort.name;
          this.curSortId = this.value;
        }
      });
    },
    // changelist() {
    //   this.$router.push({ name: "Goodslist" });
    // },
    operateConfirm() {
       if(localStorage.getItem('Second_Confirm')==1) {
           this.tag = true;
        } else {
           this.tag = false;
           this.operateProduct();
      }
    },
    operateProduct() {
      this.tag = false;
      if (this.clickTarget) {
        this.formBody.category_id = this.value;
        if (
          this.formBody.goods_name === "" ||
          this.formBody.market_price === "" ||
          this.formBody.category_id === ""
        ) {
          // this.msgText = "至少填写名称,价格和种类";
          // this.show1 = true;
          this.$message({
            type: "info",
            message: "至少填写名称,价格和种类",
            customClass: "px-mb-edit-message"
          });
          return;
        }
        api.addInList(this.formBody).then(res => {
          const data = res.data;
          if (data.result === 1) {
            // this.msgText = "添加成功";
            // this.show1 = true;
            this.$message({
              type: "success",
              message: "添加成功",
              customClass: "px-mb-edit-message"
            });
            this.$router.push({ name: "Goodslist" });
          }
        });
      } else {
        if (this.value !== this.curSortId) {
          this.formBody.category_id = this.value;
        }
        api.updateGood(this.formBody).then(res => {
          const data = res.data;
          if (data.result === 1) {
            // this.msgText = "修改成功";
            // this.show1 = true;
            this.$message({
              type: "success",
              message: "修改成功",
              customClass: "px-mb-edit-message"
            });
            this.$router.push({ name: "Goodslist" });
          }
        });
      }
    },
    getSelectData() {
      api.getAllSort().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.options = data.data;
          if (!this.clickTarget) {
            this.getFileInfo(this.queryId);
          }
        }
      });
    },
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {}
  }
};
</script>

<style  lang="scss">
.edit-mask{
   position: absolute;
   bottom: 0;
   top: 0;
   left: 0;
   right: 0;
   z-index: 501;
   background-color: rgba(0,0,0,0.3);
 }
.el-radio + .el-radio {
  margin-left: 0.1rem;
}
.px-mb-edit-message {
  min-width: 90% !important;
}
.el-message-box {
  width: 90% !important;
}
.cm-px-mb-edit {
  height: 100%;
  position: relative;
  .px-mb-edit {
    .el-textarea__inner {
        border-radius: 0;
      border-top: none;
      border-bottom: none;
      border-right: none;
    }
    .el-input__inner {
      border: none;
    }
    table {
      width: 100%;
      /*margin: 0.4rem auto;*/
      /*border-collapse: collapse;*/
    }
    table td:nth-child(1) {
      opacity: 0.8;
      width: 10%;
      height: 1rem;
      line-height: 1rem;
      text-align: right;
      font-size: 0.28rem;
    }
    table td:nth-child(2) {
      width: 28%;
      padding-left: 10%;
    }
    table tbody tr td {
      /*border: 1px solid #eaeaea;*/
      border-top: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;
    }
    .describe-style {
      vertical-align: middle !important;
    }
  }
}
</style>
