<template>
    <div class="px-stock-wrap">
      <div class="stock-mask" v-show="tag"></div>
      <second-alert v-show="tag" @callback="handleDeleteProduct" @close="tag=false"></second-alert>
      <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">{{StockBanner}}</span></x-header>
      <input type="text" class="search-key" placeholder="请输入卡密查询" v-model="productName">
        <div style="width: 80%;margin: 20px auto" class="clearfix">
            <el-button size="mini" type="primary" round icon="el-icon-search" style="float: left"  @click="searchByName" >查询商品</el-button>
            <el-button size="mini" type="primary" round  style="float: right"  @click="resetSearch" >重置搜索</el-button>
        </div>

      <divider>库存列表</divider>
      <el-select v-model="value" placeholder="选择商品" style="width: 100%;" @change="getOptionId">
          <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.goods_name"
                :value="item.id">
          </el-option>
      </el-select>
        <div style="margin-bottom: 1.2rem">
            <div class="stock-list" v-for="item in stockList" :key="item.id">
                <div class="stock-top clearfix">
                    <i class="iconfont" style="float: left;width: 5%;font-size: 0.26rem;">&#xe613;</i>
                    <p style="width: 43%;margin-left: 2%;word-break: break-all;float: left">{{item.good.goods_name}}</p>
                    <p style="width: 50%;float: left;text-align: right;"><span>商品价格: {{item.good.market_price}} 元</span></p>
                </div>
                <div class="stock-bottom clearfix" style="position: relative">
                    <div style="float: left;width:80%" class="stock-bottom-left">
                        <p><span style="display: inline-block;width: 15%;vertical-align: top">卡号:</span><span style="display: inline-block;width: 85%">{{item.content}}</span></p>
                        <!--<p style=" word-wrap: break-word;">卡号: <span>{{item.content}}</span></p>-->
                        <!--<p>密码: <span></span></p>-->
                        <p><span style="display: inline-block;width: 25%;vertical-align: top">添加时间:</span><span style="display: inline-block;width: 75%">{{item.created_at}}</span></p>
                        <!--<p>添加时间: <span>{{item.created_at}}</span></p>-->
                    </div>
                    <div style="position: absolute;bottom: 0;right: 0;">
                        <a href="javascript:;" class="del-bt" @click="delConfirm(item.id)">删除</a>
                    </div>
                </div>
            </div>
            <template>
                <div class="group-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                </div>
                <load-more tip="正在加载" v-if="showLoading"></load-more>
            </template>
        </div>
        <!--<confirm v-model="show"-->
                 <!--title="信息"-->
                 <!--@on-confirm="delProduct"-->
        <!--&gt;-->
            <!--<p style="text-align:center;">{{confirmText}}</p>-->
        <!--</confirm>-->
        <!--<alert v-model="show1" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>-->
      <TabBar></TabBar>
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
  name: "Stock",
  data() {
    return {
      // curId: 0,
      // confirmText: "",
      // msgText: "",
      // show: false,
      // show1: false,
      tag: false,
      itemId: "",
      showLoading: true,
      busy: true,
      stockList: [],
      options: [],
      value: "",
      StockBanner: "库存列表",
      productName: "",
      pageInfo: {
        count: 0,
        pageIndex: 1,
        pageSize: 20
      }
    };
  },
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
  created() {
    this.getOptionsData();
  },
  watch: {
    $route: {
      handler(newValue) {
        if (Object.keys(newValue.query).length === 0) {
          this.getStockInfo(false, {
            params: { page: this.pageInfo.pageIndex }
          });
        } else {
          this.getStockInfo(false, {
            params: {
              page: this.pageInfo.pageIndex,
              goods_id: newValue.query.id
            }
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    resetSearch() {
      this.value = "";
      this.$router.push({
        path: "/product/secret"
      });
    },
    getOptionId(id) {
      this.$router.push({
        path: "/product/secret",
        query: { id: id }
      });
      location.reload(true);
    },
    delConfirm(id) {
      this.itemId = id;
      if (localStorage.getItem("Second_Confirm") == 1) {
        this.tag = true;
      } else {
        this.tag = false;
        this.handleDeleteProduct();
      }
    },
    handleDeleteProduct(id) {
      // this.confirmText = "确定删除此卡, 是否继续?";
      // this.show = true;
      // this.curId = id;
      this.tag = false;
      this.$confirm("确定删除此卡, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除",
              customClass: "px-stock-message"
            });
          } else {
            api.deleteCode({ id: this.itemId }).then(res => {
              const data = res.data;
              if (data.result === 1) {
                const localNumber = _.findIndex(this.stockList, o => {
                  return o.id === this.itemId;
                });
                this.stockList.splice(localNumber, 1);
                this.$message({
                  type: "success",
                  message: `${data.message}`,
                  customClass: "px-stock-message"
                });
              }
            });
          }
        }
      });
    },
    getOptionsData() {
      api.getAllProduct().then(res => {
        const data = res.data;
        if (data && data.length >= 0) {
          // log(data);
          this.options = data;
          const query = this.$route.query;
          if (Object.keys(query).length > 0) {
            const temp = this.options.filter(o => {
              return o.id === Number(query.id);
            });
            this.value = temp[0].goods_name;
          }
        }
      });
    },
    getStockInfo(flag, data) {
      api.getStockCode(data).then(res => {
        const data = res.data;
        if (flag) {
          this.stockList = this.stockList.concat(data.data);
          this.busy = false;
          if (data.data.length === 0) {
            this.showLoading = false;
            this.busy = true; // 无线滚动禁止 启动
          } else {
            this.busy = false; // 无线滚动禁止 取消
          }
        } else {
          this.stockList = data.data;
          this.pageInfo.count = data.total;
          this.busy = false;
        }
      });
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageInfo.pageIndex += 1;
        const query = this.$route.query;
        if (Object.keys(query).length > 0) {
          this.getStockInfo(true, {
            params: {
              page: this.pageInfo.pageIndex,
              goods_id: query.id,
              keyword: this.productName
            }
          });
        } else {
          this.getStockInfo(true, {
            params: { page: this.pageInfo.pageIndex }
          });
        }
      }, 500);
    },
    searchByName() {
      this.pageInfo.pageIndex = 1;
      this.getStockInfo(false, {
        params: {
          page: this.pageInfo.pageIndex,
          keyword: this.productName
        }
      });
    },
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {}
    // delProduct() {
    //   api.deleteCode({ id: this.curId }).then(res => {
    //     const data = res.data;
    //     if (data.result === 1) {
    //       const localNumber = _.findIndex(this.stockList, o => {
    //         return o.id === this.curId;
    //       });
    //       this.stockList.splice(localNumber, 1);
    //       this.msgText = "删除成功";
    //       this.show1 = true;
    //     }
    //   });
    // },
    // changelist() {}
  }
};
</script>

<style  lang="scss">
.stock-mask {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 501;
  background-color: rgba(0, 0, 0, 0.3);
}
.px-stock-message {
  min-width: 90% !important;
}
.el-message-box {
  width: 90% !important;
}
.px-stock-wrap {
  position: relative;
  height: 100%;
  .search-key {
    border-radius: 0.08rem;
    border: 1px solid #dcdfe6;
    height: 0.72rem;
    display: block;
    width: 80%;
    margin: 0.4rem auto;
    padding: 0 0 0 0.4rem;
  }
  .el-input--suffix .el-input__inner {
    /*border-bottom: none;
         */
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
  .stock-list {
    color: #666;
    font-size: 0.26rem;
    border-top: 0.02rem solid #d9d9d9;
    padding: 0.4rem;
    &:first-child {
      border: none;
    }
    .stock-bottom {
      .stock-bottom-left {
        p {
          margin-top: 0.1rem;
          span {
            word-wrap: break-word;
          }
        }
      }
      div {
        &:nth-child(1) {
          margin-top: 0.2rem;
        }
        &:nth-child(2) {
          margin-top: 0.2rem;
        }
      }
      .del-bt {
        padding: 0.08rem;
        background: #f56c6c;
        color: #fff;
        border-radius: 0.04rem;
        font-size: 0.24rem;
        margin-top: 0.2rem;
        float: right;
      }
    }
    .stock-top {
      p {
        &:nth-child(1) {
          float: left;
          word-wrap: break-word;
        }
        &:nth-child(2) {
          /*float: right;*/
          span {
            font-size: 0.26rem;
            float: right;
          }
        }
      }
    }
  }
}
</style>
