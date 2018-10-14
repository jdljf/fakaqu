<template>
    <div >
        <div style="margin-bottom: 1.2rem" class="px-add-card">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">{{AddBanner}}</span></x-header>
            <div class="mb-notice">
                <i class="el-icon-third-natice"></i>
                格式：卡号+空格+密码，一行一张卡，如：A1B2C3D4F5E8 9876543210,最多一次添加500张(500行)
            </div>
            <table border="1" cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    <td>商品名称</td>
                    <td>
                        <el-select v-model="value" placeholder="请选择"  @change="getCurChange" style="width: 97%;margin-left:1%;">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.goods_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>格式演示</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <!--<el-radio v-model="code.sign" label=" ">用""分隔</el-radio>-->
                            <el-radio v-model="code.sign" label=",">用","分隔</el-radio>
                            <el-radio v-model="code.sign" label="|">用"|"分隔</el-radio>
                            <el-radio v-model="code.sign" label="-">用"-"分隔</el-radio>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>卡密演示</td>
                    <td>
                        <span  style="margin-left: 2%;">AAAAA{{signs}}BBBBB</span>
                    </td>
                </tr>
                <tr>
                    <td>卡密内容</td>
                    <td>
                        <div >
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 8}"
                                    v-model="code.content"
                            >
                            </el-input>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>检查重复</td>
                    <td>
                        <div style="margin-left: 2%;">
                            <el-radio v-model="code.is_check" label="0">是</el-radio>
                            <el-radio v-model="code.is_check" label="1">否</el-radio>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <el-button size="mini"  @click="addCode" type="primary" round icon="el-icon-check" style="margin: 0.2rem auto;display: block;">立即添加</el-button>
        </div>
       <TabBar></TabBar>
        <confirm v-model="show"
                 title="信息"
        >
            <p style="text-align:center;">{{confirmText}}</p>
        </confirm>
        <!--<alert v-model="show1" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>-->
    </div>
</template>

<script>
import TabBar from "@/components/mobile/TabBar";
import api from "@/axios/api";
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
  name: "AddCard",
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
    Selector
  },
  data() {
    return {
      // msgText: "",
      // show1: false,
      confirmText: "",
      show: false,
      code: {
        type: "1",
        sign: ",",
        content: "",
        is_check: "0",
        goods_id: ""
      },
      options: [],
      AddBanner: "添加卡密",
      value: ""
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue) {
          this.getSelectData();
          this.value = newValue.query.name;
          this.code.goods_id = newValue.query.id;
        }
      },
      immediate: true
    }
  },
  computed: {
    signs() {
      if (this.code.sign === ",") {
        return ",";
      } else if (this.code.sign === "|") {
        return "|";
      } else {
        return "-";
      }
    }
  },
  methods: {
    addCode() {
      api.addGoodsCode(this.code).then(res => {
        const data = res.data;
        if (data.result === 1) {
          // this.msgText = "添加成功";
          // this.show1 = true;
          this.$message({
            type: "success",
            message: "添加成功",
            customClass: "px-add-card-message"
          });
          this.$router.push({ name: "Goodslist" });
        }
      });
    },
    getSelectData() {
      api.getAllProduct().then(res => {
        const data = res.data;
        this.options = data;
      });
    },
    getCurChange(value) {
      this.code.goods_id = value;
    },
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {}
    // changelist() {
    //   this.$router.push({ name: "Goodslist" });
    // }
  }
};
</script>

<style  lang="scss">
.px-add-card-message {
  min-width: 90% !important;
}
.el-message-box {
  width: 90% !important;
}
.px-add-card {
  .el-textarea__inner {
    border-radius: 0;
    border-top: none;
    border-bottom: none;
    border-right: none;
  }
  .el-input__inner {
    border: none;
  }
  .el-radio + .el-radio {
    margin-left: 0px;
  }
  .el-radio {
    padding: 2px;
  }

  table {
    width: 100%;
    /*margin: 0.4rem auto;*/
    /*border-collapse: collapse;*/
  }
  table td:nth-child(1) {
    opacity: 0.8;
    width: 20%;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
    font-size: 0.28rem;
  }

  table td:nth-child(2) {
    width: 60%;
    padding-left: 5%;
  }
  table tbody tr td {
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
  }
  .mb-notice {
    width: 92%;
    padding: 2%;
    margin: 0.4rem auto;
    word-break: break-all;
    font-size: 0.28rem;
    line-height: 0.4rem;
    box-shadow: 0 0.04rem 0.24rem 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e1ff;
    border-radius: 0.1rem;
  }
}
</style>
