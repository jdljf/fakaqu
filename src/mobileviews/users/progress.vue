<template>

  <div id="progress">
    <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()">
      <span style="font-size: 0.32rem;">{{projexrbanner}}</span>
    </x-header>
    <div class="shopinfo" style="margin-bottom: 1.2rem;">
      <el-form :model="sizeForm" ref="sizeForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <table class="shop-table">
          <tr>
            <td>商户编号:</td>
            <td><input disabled="disabled" type="text" v-model="userform.id" /></td>
          </tr>
          <tr>
            <td>商户名:</td>
            <td><input disabled="disabled" type="text" v-model="userform.username" /></td>
          </tr>
          <tr>
            <td>电子邮箱:</td>
            <td><input disabled="disabled" type="text" v-model="userform.email" /></td>
          </tr>
          <tr>
            <td>手机号码:</td>
            <td><input type="text" v-model="sizeForm.mobile" /></td>
          </tr>
          <tr>
            <td>qq:</td>
            <td>
              <el-form-item class="qq-props" prop="qq">
                <input type="text" placeholder="请输入qq" v-model="sizeForm.qq" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>站点网址:</td>
            <td>
              <el-form-item class="qq-props" prop="site_url">
                <input type="text" placeholder="请输入站点网址" v-model="sizeForm.site_url" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>店铺名称:</td>
            <td>
              <el-form-item class="qq-props" prop="shop_name">
                <input type="text" placeholder="请输入店铺名称" v-model="sizeForm.shop_name" />
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>设置店铺域名:</td>
            <td>
              <el-form-item class="qq-props" prop="domain">
                <input type="text" placeholder="请输入设置店铺域名" style="width:40%;border:1px solid #ccc" v-model="sizeForm.domain" />
                <span style="padding-left:0.1rem">.fakaqu.com</span>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>库存显示:</td>
            <td>

              <el-radio v-model="sizeForm.stock_type" :label="0">实际库存</el-radio>
              <el-radio v-model="sizeForm.stock_type" :label="1">显示库存</el-radio>

            </td>
          </tr>
          <tr>
            <td>商家公告:</td>
            <td>
              <textarea placeholder="请输入商家公告" rows="6" v-model="sizeForm.shop_notice">
              </textarea>
            </td>
          </tr>
        </table>
        <div class="sub">
          <el-button style="margin-top:.1rem;width:90%" @click="submitForm('sizeForm')" v-loading="listLoadingall" type="primary">保存设置</el-button>
        </div>
      </el-form>

      <div class="collection">

        <form class="collection-form">
          <table class="collection-table">
            <tr>
              <td>收款方式:</td>
              <td>
                <input type="text" disabled="disabled" v-model="wayOfMoney" />
                <!--<el-input  disabled="disabled" v-model="wayOfMoney"></el-input>-->
                <el-button @click="gotopayinfo" type="primary" size="mini">修改收款方式</el-button>
              </td>
            </tr>
            <div v-if="payawyform.type === 0">
              <tr>
                <td>开户银行:</td>
                <td><input type="text" disabled="disabled" v-model="bank_name" /></td>
              </tr>
              <tr>
                <td>银行卡号:</td>
                <td><input type="text" disabled="disabled" v-model="shopinfos.bank_account" /></td>
              </tr>
              <tr>
                <td>户名:</td>
                <td><input type="text" disabled="disabled" v-model="shopinfos.payee_name" /></td>
              </tr>
            </div>
            <div v-else-if="payawyform.type === 1">
              <tr>
                <td>支付宝账号:</td>
                <td>
                  <input type="text" disabled="disabled" v-model="shopinfos.bank_account" />
                </td>
              </tr>
              <tr>
                <td>真实姓名:</td>
                <td>
                  <input type="text" disabled="disabled" v-model="shopinfos.bank_name" />
                </td>
              </tr>
            </div>
            <div v-else>
              <tr>
                <td>货币类型:</td>
                <td>
                  <input type="text" disabled="disabled" v-model="number_type" />
                </td>
              </tr>
              <tr>
                <td>钱包地址:</td>
                <td>
                  <input type="text" disabled="disabled" v-model="shopinfos.bank_address" />
                </td>
              </tr>
            </div>

            <!-- <tr>
                         <td>收款人姓名:</td>
                         <td><input type="text" disabled="disabled" v-model="shopinfos.payee_name"/></td>
                          </tr>
                          <tr>
                         <td>身份证:</td>
                         <td><input type="text" disabled="disabled" v-model="sizeForm.Idcard"/></td>
                          </tr> -->
          </table>
        </form>
      </div>
    </div>
    <TabBar></TabBar>

  </div>
</template>
<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
import TabBar from "@/components/mobile/TabBar";

export default {
  data() {
    return {
      bank_name: "",
      number_type: "",
      numberMoney: [
        {
          value: 0,
          label: "BTC"
        },
        {
          value: 1,
          label: "ETH"
        },
        {
          value: 2,
          label: "EOS"
        }
      ],
      moneyMethods: [
        {
          value: 0,
          label: "银行卡"
        },
        {
          value: 1,
          label: "支付宝"
        },
        {
          value: 2,
          label: "微信"
        },
        {
          value: 3,
          label: "数字货币"
        }
      ],
      bankName: [
        {
          value: "1",
          label: "中国农业银行"
        },
        {
          value: "2",
          label: "中国工商银行"
        },
        {
          value: "3",
          label: "中国建设银行"
        },
        {
          value: "4",
          label: "中国邮政银行"
        }
      ],
      wayOfMoney: "",
      projexrbanner: "基本信息",
      listLoading: false,
      listLoadingall: false,
      userform: {},
      shopinfos: {},
      id: "",
      payawyform: {
        name: "",
        type: "银行收款",
        bank_name: "",
        bank_account: "",
        bank_address: "",
        username: "",
        mobile: "",
        number_type: 0
      },

      sizeForm: {
        qq: "",
        shop_name: "",
        site_url: "",
        domain: "",
        pay_page: "",
        stock_type: 0,
        shop_notice: "",
        mobile: ""
      },
      rules: {
        // qq: [
        //   { required: true, message: "请输入qq号码", trigger: "blur" },
        //   { min: 8, max: 11, message: "请输入正确qq号码", trigger: "blur" }
        // ],
        // site_url: [
        //   { required: true, message: "请输入站点网址", trigger: "blur" }
        // ],
        domain: [
          {
            required: true,
            message: "请输入站点店铺域名",
            trigger: "blur"
          }
        ],
        shop_name: [
          {
            required: true,
            message: "请输入商店名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    MbHeader,
    XHeader,
    LoadMore,
    TabBar
  },
  activated() {},
  mounted: function() {
    this.getuser();
    this.getshopInfo();
  },
  methods: {
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    gotopayinfo() {
      var paywayinfo = JSON.stringify(this.payawyform);
      this.$router.push({
        path: "/Changepass",
        query: { paywayinfo: paywayinfo }
      });
    },
    getradio() {
      var radios = document.getElementsByName("radios");
      var value = 0;
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
          value = radios[i].value;
          this.sizeForm.stock_type = value;
          // log("value", this.sizeForm.stock_type);
        }
      }
    },
    getuser() {
      api.getuserinfos().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.userform = data.data;
          this.id = this.userform.id;
          this.sizeForm.mobile = this.userform.mobile;
          this.sizeForm.stock_type = parseInt(this.userform.stock_type);
          this.sizeForm.shop_notice = this.userform.shop_notice;
          this.sizeForm.qq = this.userform.qq;
          this.sizeForm.shop_name = this.userform.shop_name;
          this.sizeForm.domain = this.userform.domain;
          this.sizeForm.site_url = this.userform.site_url;
          this.sizeForm.pay_page = this.userform.pay_page;
          this.payawyform.name = this.userform.username;
          this.payawyform.mobile = this.userform.mobile;
        } else {
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editusers();
        } else {
          return false;
        }
      });
    },
    editusers() {
      this.listLoadingall = true;
      api.edituserinfos(this.sizeForm).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoadingall = false;
          this.getuser();
        } else {
          this.listLoadingall = false;
        }
      });
    },
    getshopInfo() {
      api.getshopinfos().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.shopinfos = data.data;
          // log(this.shopinfos );
          this.payawyform.username = this.shopinfos.payee_name;
          this.payawyform.type = this.shopinfos.type;
          this.payawyform.bank_name = this.shopinfos.bank_name;
          this.payawyform.bank_account = this.shopinfos.bank_account;
          this.payawyform.bank_address = this.shopinfos.bank_address;
          this.payawyform.payee_name = this.shopinfos.payee_name;
          this.bank_name = this.shopinfos.bank_name;
          this.payawyform.number_type = this.shopinfos.number_type;
          const numberSort = this.numberMoney.filter(o => {
            return o.value === this.shopinfos.number_type;
          });
          this.number_type = numberSort[0].label;
          this.bank_name = this.shopinfos.bank_name;
          const curWay = this.moneyMethods.filter(o => {
            return o.value === this.shopinfos.type;
          });
          this.wayOfMoney = curWay[0].label;
        }
      });
    }
  }
};
</script>
<style >
.el-message {
  min-width: 90%;
}
.stock-item .el-radio__label {
  padding: 0;
  margin: 0;
}
.stock-item .el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0.05rem;
}
.listLoadingall {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 5;
}
.qq-props {
  margin-bottom: 0px;
}
.qq-props .el-form-item__content {
  margin-left: 0px !important;
}
#progress .el-radio__input {
  padding-left: 0.1rem;
}
#progress .el-radio,
.el-radio--medium.is-bordered .el-radio__label {
  font-size: 0.14rem;
  padding-left: 0;
}
</style>

<style lang="scss" scoped>
#progress {
  background-color: #fff;
  margin-bottom: 40px;
  overflow: hidden;
  .shopinfo {
    // margin: 0.1rem;

    .sub {
      text-align: center;
      .submit {
        padding: 0.15rem 0.3rem;
        background: #56a5fc;
        color: #fff;
        border: none;
        font-size: 0.22rem;
        margin-top: 0.2rem;
      }
    }
    .demo-ruleForm {
      // box-shadow: 0px 0px 2px 1px #eee;
      border-top: none;
      padding-bottom: 0.1rem;
      .shop-table {
        width: 100%;

        tr {
          padding-bottom: 0.1rem;
          margin: 0.1rem 0.1rem 0.3rem 0.1rem;
          border-bottom: 1px solid #e3e3e3;
          line-height: 40px;
          display: flex;
          flex-direction: row;
          td:nth-child(odd) {
            font-size: 0.22rem;
            font-weight: bold;
            flex: 1.5;
            box-sizing: border-box;
            text-align: right;
            color: #666;
            padding-right: 0.2rem;
          }
          td:nth-child(even) {
            box-sizing: border-box;
            flex: 4;
            input,
            textarea {
              padding-left: 0.2rem;
              font-weight: bold;
              width: 100%;
              color: #454545;
              border: none;
              background: #fff;
              height: 40px;
            }
          }
        }
      }
    }
  }
  .collection {
    // margin: 0.1rem;
    margin-top: 0.2rem;
    .head {
      line-height: 40px;
      font-weight: bold;
      text-align: center;
      color: #000;
    }
    .collection-form {
      // box-shadow: 0px 0px 2px 1px #eee;
      padding-bottom: 0.1rem;
      .collection-table {
        width: 100%;
        tr:first-child {
          border-top: 1px solid #e3e3e3;
        }
        tr {
          margin: 0.1rem 0.1rem 0.3rem 0.1rem;
          border-bottom: 1px solid #e3e3e3;
          line-height: 40px;
          display: flex;
          flex-direction: row;
          td:nth-child(odd) {
            font-size: 0.22rem;
            font-weight: bold;
            flex: 1.5;
            box-sizing: border-box;
            text-align: right;
            color: #666;
            padding-right: 0.2rem;
          }
          td:nth-child(even) {
            box-sizing: border-box;
            flex: 4;
            input {
              background: #fff;
              font-weight: bold;
              width: 97%;
              border: none;
              color: #454545;
            }
          }
        }
      }
    }
  }
}
</style>
