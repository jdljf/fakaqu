<template>
    <div class="change-info">
        <p class="change-info-title">{{titleText}}</p>
        <table border="1" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td>{{$t("AddGoods.a")}}</td>
                <td>
                    <el-select v-model="value" :placeholder=holder1   style="width: 97%;margin-left:1%;">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.b")}}</td>
                <td><el-input v-model="formBody.sort" :placeholder=holder2  style="width: 97%;margin-left:1%;"></el-input></td>
                <td><span>{{$t("AddGoods.t1")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.c")}}</td>
                <td><el-input v-model="formBody.goods_name" :placeholder=holder3  style="width: 97%;margin-left:1%;"></el-input></td>
                <td><span>{{$t("AddGoods.t2")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.d")}}</td>
                <td><el-input v-model="formBody.market_price" :placeholder=holder4 style="width: 97%;margin-left:1%;"></el-input></td>
                <td><span>{{$t("AddGoods.t3")}}！</span></td>
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
                <td>{{$t("AddGoods.f")}}</td>
                <td><el-input v-model="formBody.cost_price" :placeholder=holder5 style="width: 97%;margin-left:1%;"></el-input></td>
                <td><span>{{$t("AddGoods.t4")}}！</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.g")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                    <el-radio v-model="formBody.status" :label=0>{{$t("option.a")}}</el-radio>
                    <el-radio v-model="formBody.status" :label=1>{{$t("option.b")}}</el-radio>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.h")}}</td>
                <td><el-input v-model="formBody.begin_buy_num"  style="width: 97%;margin-left:1%;"></el-input></td>
                <td><span>{{$t("AddGoods.t5")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.i")}}</td>
                <td><el-input v-model="formBody.stock_warning" style="width: 97%;margin-left:1%;" ></el-input></td>
                <td><span>{{$t("AddGoods.t6")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.j")}}</td>
                <td><el-input v-model="formBody.card_num_name" style="width: 97%;margin-left:1%;" ></el-input></td>
                <td><span>{{$t("AddGoods.t7")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.k")}}</td>
                <td><el-input v-model="formBody.card_secret_name"  style="width: 97%;margin-left:1%;"></el-input></td>
                <td><span>{{$t("AddGoods.t8")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.l")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.order_ratio_type" :label= 0>{{$t("option.c")}}</el-radio>
                        <el-radio v-model="formBody.order_ratio_type" :label= 1>{{$t("option.d")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t9")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.m")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.notice_type"   :label= 0>{{$t("option.e")}}</el-radio>
                        <el-radio v-model="formBody.notice_type"  :label= 1>{{$t("option.f")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t10")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.n")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.is_coupon" :label=0>{{$t("option.g")}}</el-radio>
                        <el-radio v-model="formBody.is_coupon" :label=1>{{$t("option.h")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t11")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.o")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.sale_notice" :label= 0>{{$t("option.i")}}</el-radio>
                        <el-radio v-model="formBody.sale_notice" :label= 1>{{$t("option.j")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t12")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.p")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.sale_type" :label=0>{{$t("option.k")}}</el-radio>
                        <el-radio v-model="formBody.sale_type" :label=1>{{$t("option.l")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t13")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.r")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.show_pass_type" :label=0>{{$t("option.m")}}</el-radio>
                        <el-radio v-model="formBody.show_pass_type" :label=1>{{$t("option.n")}}</el-radio>
                        <el-radio v-model="formBody.show_pass_type" :label=2>{{$t("option.o")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t14")}}</span></td>
            </tr>
            <tr>
                <td>{{$t("AddGoods.s")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="formBody.pass_switch" :label= 0>{{$t("option.p")}}</el-radio>
                        <el-radio v-model="formBody.pass_switch" :label= 1>{{$t("option.q")}}</el-radio>
                    </div>
                </td>
                <td><span>{{$t("AddGoods.t15")}}</span></td>
            </tr>
            <!--<tr>-->
                <!--<td>客户信息</td>-->
                <!--<td><el-input v-model="formBody.buyer_info"  style="width: 97%;margin-left:1%;"></el-input></td>-->
                <!--<td><span>客户下单时输入的联系方式或充值账号格式限制</span></td>-->
            <!--</tr>-->
            <tr>
                <td class="describe-style">
                    <span>{{$t("AddGoods.t")}}</span>
                </td>
                <td>
                    <el-input v-model="formBody.description"  type="textarea"   maxlength="200"  :autosize="{ minRows: 4, maxRows: 4}" style="width: 97%;margin-left:1%;margin-top: 2%;">
                    </el-input>
                </td>
                <td><span>{{$t("AddGoods.t16")}}</span></td>
            </tr>
            <tr>
                <td class="describe-style">{{$t("AddGoods.u")}}</td>
                <td>
                    <el-input v-model="formBody.remark"  type="textarea"  maxlength="200"  :autosize="{ minRows: 4, maxRows: 4}" style="width: 97%;margin-left:1%;margin-top: 2%;">
                    </el-input>
                </td>
                <td><span>{{$t("AddGoods.t17")}}</span></td>
            </tr>
            </tbody>
        </table>
        <a href="javascript:;" class="sure-change" @click="updateInfo(clickTarget)" >{{btnText}}</a>
    </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
export default {
  name: "edit",
  data() {
    return {
      holder1: this.$t("AddGoods.holder1"),
      holder2: this.$t("AddGoods.holder2"),
      holder3: this.$t("AddGoods.holder3"),
      holder4: this.$t("AddGoods.holder4"),
      holder5: this.$t("AddGoods.holder5"),
      clickTarget: "",
      queryId: "",
      changeList: {},
      titleText: "",
      btnText: "",
      value: "",
      curSortId: "",
      formBody: {
        category_id: "",
        page_type: "0",
        status: 1,
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
      },
      options: []
    };
  },
  created() {
    this.getSelectData();
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue.name === "Goodsadd") {
          this.titleText = this.$t("option.title");
          this.btnText = this.$t("option.btn");
          this.clickTarget = "Goodsadd";
        } else {
          this.titleText = this.$t("option.title1");
          this.btnText = this.$t("option.btn1");
        }
        this.queryId = newValue.query.id;
      },
      immediate: true
    }
  },
  methods: {
    updateInfo(target) {
      if (target === "Goodsadd") {
        // log(this.value);
        this.formBody.category_id = this.value;
        if (
          this.formBody.goods_name === "" ||
          this.formBody.market_price === "" ||
          this.formBody.category_id === ""
        ) {
          this.$message({
            message: "至少填写名称,价格和种类",
            type: "warning"
          });
          return;
        }
        api.addInList(this.formBody).then(res => {
          const data = res.data;
          if (data.result === 1) {
            this.$message({
              message: `${data.message}`,
              type: "success",
              duration: 3000
            });
          }
        });
      } else {
        if (this.value !== this.curSortId) {
          this.formBody.category_id = this.value;
        }
        // log(this.value);
        api.updateGood(this.formBody).then(res => {
          const data = res.data;
          if (data.result === 1) {
            this.$message({
              message: `${data.message}`,
              type: "success",
              duration: 3000
            });
          }
        });
      }
      this.$router.push({ name: "Goodslist" });
    },
    getFileInfo(data) {
      api.getUpdateGood({ params: { id: data } }).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.formBody = {};
          this.formBody = { ...data.data };
          // log(this.formBody);
          const curSort = _.find(
            this.options,
            o => o.id === Number(this.formBody.category_id)
          );
          this.value = curSort.name;
          this.curSortId = this.value;
        }
      });
    },
    getSelectData() {
      api.getAllSort().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.options = data.data;
          if (this.clickTarget !== "Goodsadd") {
            this.getFileInfo(this.queryId);
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.change-info {
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .change-info-title {
    background: #fff;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ebeef5;
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  table {
    width: 97%;
    margin: 20px;
    border-collapse: collapse;
  }
  table td:nth-child(1) {
    opacity: 0.8;
    width: 10%;
    color: #000;
    /*background: #317fe3;*/
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    /*font-weight: bold;*/
  }
  table td:nth-child(2) {
    width: 40%;
  }
  table td:nth-child(3) {
    width: 40%;
    span {
      display: inline-block;
      margin-left: 4%;
    }
  }
  table tbody tr td {
    border: 1px solid #eaeaea;
  }
  .describe-style {
    vertical-align: middle !important;
  }
  .sure-change {
    color: #fff;
    background: #409eff;
    font-size: 16px;
    border: 1px solid #fff;
    display: inline-block;
    width: 110px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-radius: 5px;
    margin: 50px 0 100px 50%;
  }
}
</style>
