<template>
    <div class="mb-pr-wrap">
     <div class="mask" v-show="tag"></div>
      <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">{{ProductBanner}}</span></x-header>
      <input type="text" class="search-key" placeholder="请输入商品名称查询" v-model="productName">
      <div class="btn-wrap clearfix">
          <el-button size="mini" type="primary" round icon="el-icon-search" style="margin: 0.2rem auto;display: block;float: left"  @click="searchByName" >查询商品</el-button>
          <el-button size="mini" type="primary" round icon="el-icon-check" style="margin: 0.2rem auto;display: block;float: right" @click="addProduct">添加商品</el-button>
          <!--<a href="javascript:;" @click="searchByName">查询商品</a>-->
          <!--<a href="javascript:;">添加商品</a>-->
      </div>
      <divider>商品列表</divider>
      <second-alert v-show="tag" @callback="delConfirm" @close="tag=false"></second-alert>
    <!--<group>-->
        <!--<selector placeholder="请选择分类" v-model="sort"   :options="list" @on-change="onChange"></selector>-->
    <!--</group>-->
        <el-select v-model="sort" placeholder="请选择分类" style="width: 100%;" @change="onChange">
            <el-option
                    v-for="item in list"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
            </el-option>
        </el-select>
        <div style="margin-bottom: 1rem">
            <div class="pr-list" v-for="item in listData" :key="item.id">
                <div class="pr-list-top clearfix">
                    <i class="iconfont" style="float: left;width: 5%;font-size: 0.26rem;">&#xe613;</i>
                    <span style="width: 43%;float: left;margin-left: 2%;word-wrap: break-word;">{{item.goods_name}}</span>
                    <span style="width: 50%;text-align: right;float: right">销售价格: {{item.market_price}} 元</span>
                </div>
                <div class="pr-list-bottom clearfix">
                    <div class="pr-list-left" style="width: 50%">
                        <p class="clearfix">
                            <span style="width: 45%;float: left">库存卡片:</span>
                            <a href="javascript:;" style="width: 55%;float: left;text-align: left;margin-left: 0%"  @click="toStock(item.id)">{{item.stock}} 张
                                <i style="font-size: 0.3rem" class="iconfont">&#xe600;</i>
                            </a>
                        </p>
                        <p class="clearfix">
                            <span style="width: 45%;float: left">已经卖出:</span>
                            <a href="javascript:;" style="width: 55%;float: left;text-align: left;margin-left: 0%"  @click="toSold(item.category_id,item.goods_name)">{{item.sold}} 张
                                <i style="font-size: 0.3rem" class="iconfont">&#xe600;</i>
                            </a>
                        </p>
                        <!--<p><span style="display: inline-block;width: 50%;vertical-align: top">已经卖出:</span><a href="javascript:;" style="display: inline-block;width: 50%"  @click="toSold">{{item.sold}} 张</a></p>-->
                    </div>
                    <div class="pr-list-right" style="width: 50%;">
                        <ul class="clearfix" style="float: right">
                            <li ><a href="javascript:;"  @click="changeStatus(item.status,item.id)"  :class="item.status?'mb-success':'mb-default'">{{item.status?"上架中":"已下架"}}</a></li>
                            <li><a href="javascript:;" @click=handleLink(item.link_code) style="background: #409eff;">链接</a></li>
                        </ul>
                        <ul class="clearfix" style="float: right;">
                            <li><a href="javascript:;" @click="addCard(item.id,item.goods_name)" style="background: #409eff">加卡</a></li>
                            <li><a href="javascript:;" @click="editProduct(item.id)" style="background: #409eff">编辑</a></li>
                            <li><a href="javascript:;" @click="delProduct(item.id)" style="background: #f56c6c">删除</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <template>
                <div class="group-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                </div>
                <load-more tip="正在加载" v-if="showLoading"></load-more>
            </template>
        </div>
        <TabBar></TabBar>
        <!--<confirm v-model="show"-->
                 <!--title="信息"-->
                 <!--@on-confirm="postProduct"-->
        <!--&gt;-->
            <!--<p style="text-align:center;">{{confirmText}}</p>-->
        <!--</confirm>-->
        <!--<alert v-model="show1" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>-->
        <el-dialog title="商品链接" :visible.sync="dialogLink" class="px-pr-qr" >
            <!--<div class="short-link">-->
                <!--<p>1.短链接(推荐)</p>-->
                <!--<a href="http://t.cn/RFITJu1" target="_blank">http://t.cn/RFITJu1</a>-->
                <!--<a href="javascript:;" class="share-btn" data-clipboard-text="http://t.cn/RFITJu1" @click="copyText">复制链接</a>-->
                <!--<span>如果朋友圈等地方打广告请发这个链接</span>-->
            <!--</div>-->
            <!--<div class="long-link">-->
                <!--<p>2.店铺总链接：</p>-->
                <!--<a :href=ShopUrl target="_blank" id="link" style="color:#000;">{{ShopUrl}}</a>-->
                <!--<a href="javascript:;" class="share-btn" data-clipboard-target="#link" @click="copyText">复制链接</a>-->
                <!--<span>店铺总链接包含您店铺下所有的商品分类和商品信息</span>-->
            <!--</div>-->
            <div class="pic-link">
                <p>1、店铺总链接二维码：</p>
                <!--<img src="../../assets/images/get.png" alt="" width="180px" height="180px">-->
                <vue-qr  :text=ShopUrl :backgroundImage="src"  height="200" width="200"/>
                <span>二维码可以很方便的放在网店或者分享到手机客户端，鼠标右击即刻保存图片</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLink = false">取 消</el-button>
                <el-button type="primary" @click="dialogLink = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
import TabBar from "@/components/mobile/TabBar";
import VueQr from "vue-qr";
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
  name: "ProductList",
  data() {
    return {
      // operateFlag: "",
      // msgText: "",
      // show1: false,
      // confirmText: "",
      // show: false,
      itemId: "",
      tag: false,
      src: "",
      dialogLink: false,
      ShopUrl: "",
      productName: "",
      curId: 0,
      curName: "",
      searchQuery: null,
      isSelect: false,
      isFill: false,
      showLoading: true,
      busy: true,
      pageInfo: {
        count: 0,
        pageIndex: 1,
        pageSize: 20
      },
      listData: [],
      list: [],
      sort: "",
      name: "",
      ProductBanner: "商品列表"
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
    VueQr,
    SecondAlert
  },
  created() {
    this.getSelectData();
    this.getGoodList();
  },
  methods: {
    handleLink(link) {
      const host = window.location.host;
      this.dialogLink = true;
      const code = link;
      this.ShopUrl = "http://" + host + "/paylinks/" + code;
    },
    toStock(id) {
      this.$router.push({ path: "/product/secret", query: { id: id } });
    },
    toSold(id, name) {
      // let url = "/transaction/sellrecently?category_id="+id+"&kw="+name+"&kw_type=3"
      this.$router.push({
        name: "SellRecently",
        query: {
          category_id: id,
          kw: name,
          kw_type: 3
        }
      });
    },
    addProduct() {
      this.$router.push({ path: "/product/goodsadd" });
    },
    editProduct(id) {
      this.$router.push({ path: "/product/edit", query: { id: id } });
    },
    addCard(id, name) {
      this.$router.push({
        path: "/product/codeadd",
        query: { id: id, name: name }
      });
    },
    delConfirm() {
      this.tag = false;
      this.$confirm("确定删除此商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除",
              customClass: "product-list-msg"
            });
          } else {
            api.deleteInList({ id: this.itemId }).then(res => {
              const data = res.data;
              if (data.result === 1) {
                const localNumber = _.findIndex(this.tableData, o => {
                  return o.id === this.itemId;
                });
                this.listData.splice(localNumber, 1);
                this.$message({
                  type: "success",
                  message: `${data.message}`,
                  customClass: "product-list-msg"
                });
              }
            });
          }
        }
      });
    },
    delProduct(id) {
      // this.confirmText = "确定删除此商品？";
      // this.show = true;
      // this.curId = id;
      // this.operateFlag = "del";
      this.itemId = id;
      if (localStorage.getItem("Second_Confirm") == 1) {
        this.tag = true;
      } else {
        this.tag = false;
        this.delConfirm();
      }
    },
    changelist() {},
    // postProduct() {
    //   if (this.operateFlag === "del") {
    //     api.deleteInList({ id: this.curId }).then(res => {
    //       const data = res.data;
    //       if (data.result === 1) {
    //         this.msgText = "删除成功";
    //         this.show1 = true;
    //         const localNumber = _.findIndex(this.listData, o => {
    //           return o.id === this.curId;
    //         });
    //         this.listData.splice(localNumber, 1);
    //       }
    //     });
    //   } else {
    //     api.addShelf({ id: this.curId }).then(res => {
    //       const data = res.data;
    //       if (data.result === 1) {
    //         this.msgText = "商品状态已修改";
    //         this.show1 = true;
    //         //提示信息
    //       }
    //       location.reload();
    //     });
    //   }
    // },
    changeStatus(status, id) {
      this.$confirm(
        `确定${Number(status) ? "下架" : "上架"}此商品, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          callback: action => {
            if (action === "cancel" || action === "close") {
              this.$message({
                type: "info",
                message: "已取消操",
                customClass: "product-list-msg"
              });
            } else {
              api.addShelf({ id: id }).then(res => {
                const data = res.data;
                if (data.result === 1) {
                  this.$message({
                    type: "success",
                    message: `${data.message}`,
                    customClass: "product-list-msg"
                  });
                }
                location.reload();
              });
            }
          }
        }
      );
      //
      // if (status) {
      //   this.confirmText = "确定下架此产品？";
      // } else {
      //   this.confirmText = "确定上架此产品？";
      // }
      // this.curId = id;
      // this.show = true;
      // this.operateFlag = "sell";
    },
    searchByName() {
      if (this.productName === "") {
        this.$message({
          type: "warning",
          message: "请填写名称",
          customClass: "mb-px-list-message"
        });
        return;
      }
      this.isFill = true;
      const queryName = _.trim(this.productName);
      this.pageInfo.pageIndex = 1;
      this.curName = queryName;
      const query = {
        params: { page: this.pageInfo.pageIndex, goods_name: queryName }
      };
      this.getGoodList(false, query);
    },
    getSelectData() {
      api.getAllSort().then(res => {
        const data = res.data;
        if (data.result === 1) {
          const temp = data.data.map(o => {
            return { key: o.id, value: o.name };
          });
          temp.unshift({ key: 0, value: "全部分类" });
          this.list = temp;
        }
      });
    },
    getGoodList(flag, data) {
      if (!data) {
        data = { params: { page: this.pageInfo.pageIndex } };
      }
      api.getAllList(data).then(res => {
        const data = res.data;
        if (flag) {
          this.listData = this.listData.concat(data.data);
          this.busy = false;
          if (data.data.length === 0) {
            this.showLoading = false;
            this.busy = true; // 无线滚动禁止 启动
          } else {
            this.busy = false; // 无线滚动禁止 取消
          }
        } else {
          this.listData = [];
          if (data.data.length === 0) {
            this.showLoading = false;
            this.busy = true;
            return;
          }
          this.pageInfo.count = data.total;
          this.listData = data.data;
          this.busy = false;
        }
      });
    },
    onChange(value) {
      if (!value) {
        this.getGoodList(false, { params: { page: 1 } });
        return;
      }
      this.curId = value;
      this.isSelect = true;
      this.pageInfo.pageIndex = 1;
      this.searchQuery = {
        params: { page: this.pageInfo.pageIndex, category_id: value }
      };
      this.getGoodList(false, this.searchQuery);
    },
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {},
    loadMore() {
      // log("load");
      this.busy = true; // 无线滚动禁止
      setTimeout(() => {
        this.pageInfo.pageIndex += 1;
        if (this.isSelect || this.isFill) {
          this.searchQuery = {
            params: {
              page: this.pageInfo.pageIndex,
              category_id: this.curId,
              goods_name: this.curName
            }
          };
          this.getGoodList(true, this.searchQuery);
        } else {
          this.getGoodList(true); // 调用获取数据的接口
        }
      }, 500);
    }
  }
};
</script>
<style scoped>
.mask {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 501;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

<style  lang="scss">
.mb-px-list-message {
  min-width: 90% !important;
}
.px-pr-qr {
  .el-dialog {
    width: 90%;
  }
}
.product-list-msg {
  min-width: 90% !important;
}
.el-message-box {
  width: 90% !important;
}
.mb-success {
  background: #67c23a;
}
.mb-default {
  background: #f56c6c;
}
.mb-pr-wrap {
  position: relative;
  height: 100%;
  .pic-link {
    margin-top: 20px;
    p {
      font-size: 20px;
      display: inline-block;
    }
    img {
      display: block;
    }
  }
  .el-input--suffix .el-input__inner {
    /*border-bottom: none;
             */
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
  .search-key {
    border-radius: 0.08rem;
    border: 1px solid #dcdfe6;
    height: 0.72rem;
    display: block;
    width: 80%;
    margin: 0.4rem auto;
    padding: 0 0 0 0.4rem;
  }
  .btn-wrap {
    font-size: 0;
    width: 80%;
    margin: 0.4rem auto;
  }
  .pr-list {
    color: #666;
    font-size: 0.26rem;
    border-bottom: 1px solid #d9d9d9;
    .pr-list-top {
      span {
        display: block;
        /*&:nth-child(1) {*/
        /*float: left;*/
        /*word-wrap: break-word;*/
        /*}*/
        /*&:nth-child(2) {*/
        /*float: left;*/
        /*}*/
      }
    }
    padding: 0.4rem;
    .pr-list-bottom {
      margin-top: 0.4rem;
      .pr-list-left {
        float: left;
        p {
          margin-top: 0.2rem;
          /*word-break: break-all;*/
          /*span {*/
          /*text-align: center;*/
          /*}*/
          a {
            text-align: center;
          }
        }
      }
      .pr-list-right {
        float: right;
        ul {
          li {
            border-radius: 0.04rem;
            float: left;
            a {
              border-radius: 0.04rem;
              float: left;
              margin: 0.1rem 0.1rem 0;
              padding: 0.1rem;
              color: #fff;
              font-size: 0.24rem;
            }
          }
        }
      }
    }
  }
}
</style>
