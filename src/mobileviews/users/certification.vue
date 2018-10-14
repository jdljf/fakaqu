<template>
    <div>
        <div class="certification" style="margin-bottom: 1.2rem">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()"   ><span style="font-size: 0.32rem;">实名认证</span></x-header>
            <div class="card-head">
                <div>问:为什么要进行实名认证？</div>
                <div>答:设置实名认证环节，可以有效保证卖家身份真实可靠，防止恶意注册，同时也可提高帐户资金安全，提高卖家以及交易平台的信誉度！</div>

            </div>
            <div class="collection">
                <el-form   :model="realnameform" status-icon :rules="realnamerules" ref="realnameform" label-width="100px" class="demo-ruleForm">
                    <table class="collection-table">
                        <tr>
                            <td>真实姓名:</td>
                            <td>
                                <el-form-item class="incomprops"  prop="realname">
                                    <input type="text"  v-model="realnameform.realname"/>
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>身份证:</td>
                            <td>
                                <el-form-item class="incomprops"  prop="id_card">
                                    <input type="text"  v-model="realnameform.id_card"/>
                                </el-form-item>
                            </td>
                        </tr>
                        <!-- <tr>
                            <td>开户银行:</td>
                            <td>
                                <el-form-item class="incomprops bank"  prop="bank_name">
                                    <el-select  name="realnameform.bank_name" v-model="realnameform.bank_name" style="padding:0" placeholder="请选择开户银行">
                                        <el-option label="中国农业银行" value="中国农业银行"></el-option>
                                        <el-option label="中国工商银行" value="中国工商银行"></el-option>
                                        <el-option label="中国银行" value="中国银行"></el-option>
                                        <el-option label="中国建设银行" value="中国建设银行"></el-option>
                                        <el-option label="交通银行" value="交通银行"></el-option>
                                        <el-option label="中国邮政银行" value="中国邮政银行"></el-option>
                                    </el-select>
                                </el-form-item>
                            </td>
                        </tr> -->
                        <!-- <tr>
                            <td>银行卡号:</td>
                            <td>
                                <el-form-item class="incomprops"  prop="bank_account">
                                    <input type="text" v-model="realnameform.bank_account"/>
                                </el-form-item>
                            </td>
                        </tr> -->
                        <tr>
                            <td>身份证正面:</td>
                            <td>
                                <el-form-item class="incomprops"  >
                                    <input type="file"   name="realnameform.fronted_card" @change="showPreview"  id="upload"/>
                                    <img style="width:100px;display:block"  id="fronted"   :src="realnameform.fronted_card" />
                                </el-form-item>
                            </td>
                        </tr>
                        <tr>
                            <td>反面:</td>
                            <td>
                                <el-form-item class="incomprops"  >
                                    <input type="file"  name="realnameform.backend_card" @change="showPreview2"   id="upload2"/>
                                    <img style="width:100px;display:block"  id="backend" :src="realnameform.backend_card"  />
                                </el-form-item>
                            </td>
                        </tr>

                        <!-- <tr>
                            <td>验证码:</td>
                            <td>
                                <el-form-item class="incomprops"  prop="code">
                                    <input style="border:1px solid #eee;line-height:30px;width:50%" type="text" v-model="realnameform.code" />
                                </el-form-item>
                                <el-button style="padding:.2rem;margin:0.3rem 0 0.1rem"  @click="getemilcodes" :disabled="disabled" type="success">{{codetext}}</el-button>
                            </td>

                        </tr> -->
                    </table>
                    <div class="edits">
                        <el-button v-loading="listLoading"  style="width:90%" @click="submitForm('realnameform')"  type="primary">立即提交</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <TabBar></TabBar>
    </div>
</template>
<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import TabBar from "@/components/mobile/TabBar";
import { LoadMore } from "vux";
export default {
  data() {
    // const bank_account = (rule, value, callback) => {
    //   if (value) {
    //     if (/[^0-9-]+/g.test(value)) {
    //       callback(new Error("请输入正确的银行卡号码!"));
    //     } else {
    //       callback();
    //     }
    //   }
    //   callback();
    // };
    const id_card = (rule, value, callback) => {
      if (value) {
        if (/[^0-9-]+/g.test(value)) {
          callback(new Error("请输入正确的身份证号码!"));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      listLoading: false,
      disabled: false,
      cerifcation: "实名认证",
      codetext: "发送验证码",
      imageUrl: "",
      imageUrl2: "",
      mobile: "",
      userinfo: {},
      email:'',
      fronted_cards: "",
      backend_cards: "",
      realnameform: {
        realname: "",
        id_card: "",
        // bank_name: "",
        // bank_account: "",
        fronted_card: "",
        backend_card: "",
        code: ""
      },
      realnamerules: {
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        id_card: [
          {
            required: true,
            min: 18,
            max: 18,
            message: "请输入正确的身份证号码",
            trigger: "blur"
          },
          { validator: id_card, trigger: "blur" }
        ],
        // bank_name: [{ required: true, message: "请选择银行", trigger: "blur" }],
        // bank_account: [
        //   {
        //     min: 19,
        //     max: 19,
        //     message: "请输入正确的银行卡号码",
        //     trigger: "blur",
        //     required: true
        //   },
        //   { validator: bank_account, trigger: "blur" }
        // ],
        // code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  components: {
    MbHeader,
    XHeader,
    LoadMore,
    TabBar,
  },
  methods: {
    bannerBack() {
      this.$router.push({
        name:'Users'
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editrealname();
        } else {
          this.listLoading = false;
          return false;
        }
      });
    },
    getemilcodes() {
      //发送获取验证码的请求
      let mobile = this.mobile;
      let datas = {
        params:{
        email:this.email,
        type:'realname_code'
        }
      };
      api.getemilcode(datas).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.sendCodeAnimation();
          this.$message({
            message: "发送成功",
            type: "success",
            duration: 3000
          });
        } else {
          this.$message({
            message: "发送失败",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    //发送验证码 倒计时
    sendCodeAnimation() {
      var that = this;
      that.disabled = true;
      var nums = 60;
      var timer = setInterval(function() {
        nums--;
        if (nums <= 0) {
          clearInterval(timer);
          that.codetext = "重新发送";
          that.disabled = false;
        } else {
          that.codetext = nums + "s重新发送";
          that.disabled = true;
        }
      }, 1000);
    },
    realname() {
      //   this.listLoadings=true;
      api.realname().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.realnameform = data.data;
          this.realnameform.realname = data.data.realname;
          this.realnameform.id_card = data.data.id_card;
          // this.realnameform.bank_name = data.data.bank_name;
          // this.realnameform.bank_account = data.data.bank_account;
          this.realnameform.fronted_card = data.data.fronted_card;
          this.realnameform.backend_card = data.data.backend_card;
          //   this.listLoadings=false;
        } else {
          //   this.listLoadings=true;
        }
      });
    },
    showPreview(e) {
      var fronted_card = document.getElementById("upload");
      var fronted_card = fronted_card.files[0];
      if (window.FileReader) {
        var fr = new FileReader();
        var portrait = document.getElementById("fronted");
        fr.onloadend = function(e) {
          portrait.src = e.target.result;
        };
        fr.readAsDataURL(fronted_card);
      }
    },
    showPreview2(e) {
      var backend = document.getElementById("upload2");
      var backend = backend.files[0];
      if (window.FileReader) {
        var fr = new FileReader();
        var portrait = document.getElementById("backend");
        fr.onloadend = function(e) {
          portrait.src = e.target.result;
        };
        fr.readAsDataURL(backend);
      }
    },
    editrealname() {
      this.listLoading = true;
      var formDatas = new FormData();
      var fronted_card = document.getElementById("upload");
      var backend_card = document.getElementById("upload2");
      var fronted_card = fronted_card.files[0];
      var backend_card = backend_card.files[0];
      var frontedimg = document.getElementById("fronted").getAttribute("src");
      var backend_cardimg = document
        .getElementById("backend")
        .getAttribute("src");
      if (frontedimg === "" || backend_cardimg === "") {
        this.$message({
          message: "请选择上传身份证",
          type: "error",
          duration: 3000
        });
        this.listLoading = false;
        return;
      }
      if (fronted_card != undefined) {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fronted_card.name)) {
          this.$message({
            message: "请选择格式gif,jpeg,jpg,png中的一种",
            type: "error",
            duration: 3000
          });
          this.listLoading = false;
          return;
        }
      }
      if (backend_card != undefined) {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(backend_card.name)) {
          this.$message({
            message: "请选择格式gif,jpeg,jpg,png中的一种",
            type: "error",
            duration: 3000
          });
          this.listLoading = false;
          return;
        }
      }
      formDatas.append("fronted_card", fronted_card);
      formDatas.append("backend_card", backend_card);
      formDatas.append("realname", this.realnameform.realname);
      formDatas.append("id_card", this.realnameform.id_card);
      // formDatas.append("bank_name", this.realnameform.bank_name);
      // formDatas.append("bank_account", this.realnameform.bank_account);
      // formDatas.append("code", this.realnameform.code);
      api.editrealname(formDatas).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoading = false;
          this.realname();
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
          this.listLoading = false;
        }
      });
    }
  },
  mounted() {
    this.realname();
    this.email=this.$store.state.user.email;
     this.mobile =this.$store.state.user.mobile;
  }
};
</script>
<style>
.el-message{
  min-width: 90%;
}
.incomprops {
  margin-bottom: 0px;
}
.incomprops .el-form-item__content {
  margin-left: 0px !important;
}
.incomprops .el-input__inner {
  border: none !important;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.certification {
  background-color:#fff;
  .card-head {
    margin: 0.1rem;
    color: #157df4;
    line-height: 0.6rem;
    font-size: 0.22rem;
    padding-left: 0.1rem;
    border: 1px solid #e3e3e3;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 2px 1px #e3e3e3;
    margin-top: 0.2rem;
    .green {
      color: #94db7c;
    }
  }
  .collection {
    margin: 0.1rem 0;
    .demo-ruleForm {
      // box-shadow: 0px 0px 2px 1px #eee;
      border-top: none;
      padding-bottom: 0.1rem;
      .edits {
        text-align: center;
        margin-top: 0.3rem;
        .btn {
          padding: 0.2rem;
          background: #157df4;
          color: #fff;
          font-size: 0.23rem;
        }
      }
      margin-top: 0.2rem;
      .head {
        line-height: 40px;
        font-weight: bold;
        text-align: center;
        background: #e3e3e3;
        color: #000;
      }
      .collection-table {
        width: 100%;
        tr {
           margin:.1rem .1rem 0.3rem .1rem;
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
            .el-select {
              width: 100% !important;
              .el-input--suffix {
                .el-input__inner {
                  border: none !important;
                }
              }
            }
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
