<template>
	<div class="progressContainer">
    <div class="listLoadingall" v-loading="listLoadingall"></div>
	 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="titles">{{$t('Businessinformation.info')}}</span>
  </div>
  <div>
   <el-form  :model="sizeForm"  ref="sizeForm" :rules="rules" label-width="100px" class="demo-ruleForm">
  <el-form-item :label="$t('Businessinformation.userno')">
    <el-input  disabled="disabled" v-model="userform.id"></el-input>
  </el-form-item>

  <el-form-item :label="$t('Businessinformation.username')">

    <el-input disabled="disabled" v-model="userform.username"></el-input>
  </el-form-item>
  <el-form-item :label="$t('Businessinformation.email')" >
    <el-input  disabled="disabled" v-model="userform.email"></el-input>
  </el-form-item>
   <el-form-item  :label="$t('Businessinformation.phone')" >
    <el-input   v-model="sizeForm.mobile"></el-input>
  </el-form-item>
   <el-form-item :label="$t('Businessinformation.qq')" prop="qq">
    <el-input v-model="sizeForm.qq"></el-input>
  </el-form-item>
  <el-form-item :label="$t('Businessinformation.siteurl')"  prop="site_url">
    <el-input  v-model="sizeForm.site_url"></el-input>
  </el-form-item>
   <el-form-item :label="$t('Businessinformation.shopname')" prop="shop_name">
    <el-input  v-model="sizeForm.shop_name"></el-input>
   </el-form-item>
   <el-form-item :label="$t('Businessinformation.domainname')"  prop="domain">
    <el-input  v-model="sizeForm.domain" style="width:50%"></el-input><span style="padding-left:10px">.fakaqu.com</span>
  </el-form-item>

   <el-form-item  :label="$t('Businessinformation.inventory')">
    <el-radio-group v-model="sizeForm.stock_type" size="medium">
      <el-radio border  :label="0">{{$t('Businessinformation.actualnumbe')}}</el-radio>
      <el-radio border  :label="1">{{$t('Businessinformation.Displayinventory')}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item :label="$t('Businessinformation.announcement')">

    <el-input type="textarea" v-model="sizeForm.shop_notice"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" v-loading="listLoading" @click="submitForm('sizeForm')" >{{$t('Businessinformation.setting')}}</el-button>
  </el-form-item>
</el-form>
  </div>

</el-card>
<!-- // 商家收款信息 -->
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="titles">{{$t('Businessinformation.info')}}</span>
  </div>
  <div>
   <el-form  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item :label="$t('Businessinformation.Paymentmethod')" >
    <el-input  disabled="disabled" v-model="wayOfMoney"></el-input>
    <!-- <router-link to="/Changepass"> -->
     <el-button @click="gotopayinfo" style="margin-top:20px;" type="primary">{{$t('Businessinformation.Revisemethod')}}</el-button>
  </el-form-item>
   <div v-if="payawyform.type === 0">
     <el-form-item :label="$t('Businessinformation.bank')" >
       <el-input disabled="disabled" v-model="bank_name"></el-input>
   </el-form-item>
     <el-form-item :label="$t('Businessinformation.Bankcard')" >
       <el-input  disabled="disabled" v-model="shopinfos.bank_account"></el-input>
   </el-form-item>
     <el-form-item  label="户名" >
       <el-input  disabled="disabled" v-model="shopinfos.payee_name"></el-input>
   </el-form-item>
   </div>
   <div v-else-if="payawyform.type === 1">
       <el-form-item label="支付宝账号" >
           <el-input  disabled="disabled" v-model="shopinfos.bank_account"></el-input>
       </el-form-item>
       <el-form-item label="真实姓名" >
           <el-input  disabled="disabled" v-model="shopinfos.bank_name"></el-input>
       </el-form-item>
   </div>
   <div v-else>
       <el-form-item label="货币类型" >
           <el-input  disabled="disabled" v-model="number_type"></el-input>
       </el-form-item>
       <el-form-item label="钱包地址" >
           <el-input  disabled="disabled" v-model="shopinfos.bank_address"></el-input>
       </el-form-item>
   </div>

   <!-- <el-form-item :label="$t('Businessinformation.payee')" >
    <el-input disabled="disabled" v-model="shopinfos.payee_name"></el-input>
  </el-form-item>
    <el-form-item :label="$t('Businessinformation.Idcard')" >
    <el-input disabled="disabled"  v-model="shopinfos.Idcard"></el-input>
  </el-form-item> -->
</el-form>
  </div>

</el-card>

	</div>
</template>
<script>
import api from "@/axios/api";

export default {
  data() {
    return {
      number_type: "",
      wayOfMoney: "",
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
      bank_name: "",
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
          { required: true, message: "请输入站点店铺域名", trigger: "blur" }
        ],

        shop_name: [
          { required: true, message: "请输入商店名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },

  activated() {},
  mounted: function() {
    this.getuser();
    this.getshopInfo();
  },
  methods: {
    gotopayinfo() {
      var paywayinfo = JSON.stringify(this.payawyform);
      this.$router.push({
        path: "/Changepass",
        query: { paywayinfo: paywayinfo }
      });
    },
    getuser() {
      this.listLoadingall = true;
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
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
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
      this.listLoading = true;
      api.edituserinfos(this.sizeForm).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoading = false;
        } else {
          this.listLoading = false;
        }
      });
    },
    getshopInfo() {
      api.getshopinfos().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.shopinfos = data.data;
          // log(this.shopinfos);
          this.payawyform.username = this.shopinfos.payee_name;
          this.payawyform.type = this.shopinfos.type;
          this.payawyform.bank_account = this.shopinfos.bank_account;
          this.payawyform.bank_address = this.shopinfos.bank_address;
          this.payawyform.bank_name = this.shopinfos.bank_name;
          this.payawyform.payee_name = this.shopinfos.payee_name;
          this.payawyform.number_type = this.shopinfos.number_type;
          const numberSort = this.numberMoney.filter(o=>{
            return o.value === this.shopinfos.number_type
          })
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
<style lang="scss">
@keyframes proinit {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
.progressContainer {
  animation: proinit 1s;
  padding: 10px;
  .listLoadingall {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 5;
  }
  .box-card {
    width: 48%;
    float: left;
    margin-left: 1%;
    .clearfix {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
