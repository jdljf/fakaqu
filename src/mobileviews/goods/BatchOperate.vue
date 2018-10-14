<template>
    <div class="px-batch-code">
      <div class="batch-mask" v-show="tag"></div>
      <second-alert v-show="tag" @callback="handleDel" @close="tag=false"></second-alert>
        <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">{{BatchBanner}}</span></x-header>
        <input type="text" class="search-key" placeholder="请输入商品卡号查询" v-model="productNo">
        <div class="btn-wrap clearfix">
            <el-button size="mini" type="primary" @click="searchFast" round icon="el-icon-search" style="margin: 0.2rem auto;display: block;float: left"   >立即查询</el-button>
            <el-button size="mini" type="danger"  @click="delConfirm('')"  round icon="el-icon-check" style="margin: 0.2rem auto;display: block;float: right" >清空回收站</el-button>
        </div>
        <divider>卡密列表</divider>
        <!--<el-select v-model="value" placeholder="选择分类" style="width: 100%;" @change="getSortId">-->
            <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id">-->
            <!--</el-option>-->
        <!--</el-select>-->
        <el-select v-model="value" placeholder="选择商品" style="width: 100%;margin-top: 10px;" @change="getGoodsId">
            <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.goods_name"
                    :value="item.id">
            </el-option>
        </el-select>
        <div style="margin-bottom: 1.2rem">
            <div class="batch-wrap" v-for="item in trashList" :key="item.id">
                <div class="batch-top clearfix">
                    <i class="iconfont" style="float: left;width: 5%;font-size: 0.26rem;">&#xe613;</i>
                    <p style="float: left;width: 43%;margin-left:2%;word-wrap:break-word;">{{item.good.goods_name}}</p>
                    <p style="float: left;width: 50%;word-wrap:break-word;"><span style="float: right">商品价格:{{item.good.market_price}} 元</span></p>
                </div>
                <div class="batch-bottom clearfix" style="position: relative;">
                    <div class="batch-bottom-left" style="float: left;width: 60%">
                        <p><span style="display: inline-block;width: 20%;vertical-align: top">卡号:</span><span style="display: inline-block;width: 80%">{{item.content}}</span></p>
                        <p><span  style="display: inline-block;width: 20%;vertical-align: top">卡密:</span><span  style="display: inline-block;width: 80%"></span></p>
                    </div>
                    <div class="batch-bottom-right" style="position: absolute;right: 0;bottom: 0;">
                        <ul class="clearfix">
                            <li><a href="javascript:;"  @click="handleRestoreProduct(item.id)">恢复</a></li>
                            <li><a href="javascript:;" style=" background: #f56c6c;" @click="delConfirm(item.id)">删除</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="mb-notice">
                <i class="el-icon-third-natice"></i>
                说明：在本页进行的任何删除操作，卡密将永久删除，不能恢复，请谨慎操作！
            </div>
            <template>
                <div class="group-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                </div>
                <load-more tip="正在加载" v-if="showLoading"></load-more>
            </template>
        </div>
        <TabBar></TabBar>
        <!--<alert v-model="show1" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>-->
        <!--<alert v-model="show3" title="操作信息提示" >{{msgText}}</alert>-->
        <!--<confirm v-model="show"-->
                 <!--title="信息"-->
                 <!--@on-confirm="confirmOperate"-->
        <!--&gt;-->
            <!--<p style="text-align:center;">{{confirmText}}</p>-->
        <!--</confirm>-->
        <!--<confirm v-model="show2"-->
                 <!--title="信息"-->
                 <!--@on-confirm="confirmAction"-->
        <!--&gt;-->
            <!--<p style="text-align:center;">{{actionText}}</p>-->
        <!--</confirm>-->
    </div>
</template>

<script>
import api from "@/axios/api";
import TabBar from "@/components/mobile/TabBar";
import SecondAlert from "@/components/mobile/PwdAlert.vue";
import _ from "lodash";
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
  name: "BatchOperate",
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
      // show3: false,
      // actionText: "",
      // show2: false,
      // operateFlag: "",
      // curId: 0,
      // show: false,
      // confirmText: "",
      // msgText: "",
      // show1: false,
      tag: false,
      curId: "",
      pageInfo: {
        count: 0,
        pageIndex: 1,
        pageSize: 20
      },
      trashList: [],
      value: "",
      busy: true,
      showLoading: true,
      sortOptions: [],
      options: [],
      productNo: "",
      BatchBanner: "卡密批量管理"
    };
  },
  created() {
    this.getSelectData();
  },
  watch: {
    $route: {
      handler(newValue) {
        const queryId = newValue.query.goods_id;
        if (queryId !== undefined) {
          const data = {
            params: { page: this.pageInfo.pageIndex, goods_id: queryId }
          };
          this.getTrashCode(false, data);
        } else {
          this.getTrashCode(false, {
            params: { page: this.pageInfo.pageIndex, keyword: this.productNo }
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    operateNotice(type, info, cb) {
      this.$confirm(`${info}, 是否继续?`, "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: `已取消${type}`,
              customClass: "trash-my-message"
            });
          } else {
            cb();
          }
        }
      });
    },
    searchFast() {
      if (this.productNo === "") {
        this.$message({
          type: "warning",
          message: `请填写卡密内容`,
          customClass: "trash-my-message"
        });
        return;
      }
      this.pageInfo.pageIndex = 1;
      const q = _.trim(this.productNo);
      const data = {
        params: { page: this.pageInfo.pageIndex, keyword: q }
      };
      this.getTrashCode(false, data);
    },
    // confirmAction() {
    //   api.batchEmptyTrash().then(res => {
    //     const data = res.data;
    //     if (data.result === 1) {
    //       this.trashList = [];
    //       this.showLoading = false;
    //     }
    //   });
    // },
    handleDel() {
      this.tag = false;
      if (this.curId != "") {
        this.handleDeleteProduct();
      } else {
        this.emptyTrash();
      }
    },
    delConfirm(id) {
      this.curId = id;
      if (localStorage.getItem("Second_Confirm") == 1) {
        this.tag = true;
      } else {
        this.tag = false;
        if (this.curId != "") {
          this.handleDeleteProduct();
        } else {
          this.emptyTrash();
        }
      }
    },
    emptyTrash() {
      if (this.trashList.length === 0) {
        return;
      }
      // this.$message({
      //   type: "info",
      //   message: "对不起无此商品",
      //   customClass: "my-message",
      // });
      this.$confirm(`确定清空所有卡密?删除后不可恢复, 是否继续?`, "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: `已取消操作`,
              customClass: "trash-my-message"
            });
          } else {
            api.batchEmptyTrash().then(res => {
              const data = res.data;
              if (data.result === 1) {
                this.trashList = [];
                this.showLoading = false;
              }
            });
          }
        }
      });
      // this.actionText = "确定清空所有卡密?删除后不可恢复";
      // this.show2 = true;
    },
    // confirmOperate() {
    //   const data = { id: this.curId };
    //   if (this.operateFlag === "restore") {
    //     api.restoreInTrash(data).then(res => {
    //       const data = res.data;
    //       if (data.result === 1) {
    //         const localNumber = _.findIndex(this.trashList, o => {
    //           return o.id === this.curId;
    //         });
    //         this.trashList.splice(localNumber, 1);
    //         this.msgText = "恢复成功";
    //         this.show1 = true;
    //       }
    //     });
    //   } else {
    //     api.deleteInTrash(data).then(res => {
    //       const data = res.data;
    //       if (data.result === 1) {
    //         const localNumber = _.findIndex(this.trashList, o => {
    //           return o.id === this.curId;
    //         });
    //         this.trashList.splice(localNumber, 1);
    //         this.msgText = "删除成功";
    //         this.show1 = true;
    //       }
    //     });
    //   }
    // },
    // handleRestoreProduct(id) {
    //   this.curId = id;
    //   this.operateFlag = "restore";
    //   this.confirmText = "确定恢复此条记录?";
    //   this.show = true;
    // },
    handleRestoreProduct(id) {
      const data = { id: id };
      const type = "恢复";
      const info = `确定恢复此条记录`;
      const operate = () => {
        api.restoreInTrash(data).then(res => {
          const data = res.data;
          if (data.result === 1) {
            const localNumber = _.findIndex(this.trashList, o => {
              return o.id === id;
            });
            this.trashList.splice(localNumber, 1);
            this.$message({
              type: "success",
              message: `恢复成功`,
              customClass: "trash-my-message"
            });
          }
        });
      };
      this.operateNotice(type, info, operate);
    },
    handleDeleteProduct() {
      // this.curId = id;
      // this.operateFlag = "del";
      // this.confirmText = "确定彻底删除此条记录?";
      // this.show = true;
      const data = { id: this.curId };
      const type = "恢复";
      const info = `确定删除此条记录，删除后不可恢复`;
      const operate = () => {
        api.deleteInTrash(data).then(res => {
          const data = res.data;
          if (data.result === 1) {
            const localNumber = _.findIndex(this.trashList, o => {
              return o.id === this.curId;
            });
            this.trashList.splice(localNumber, 1);
            this.$message({
              type: "success",
              message: `${data.message}`,
              customClass: "trash-my-message"
            });
          }
        });
      };
      this.operateNotice(type, info, operate);
    },
    // changelist() {
    //   if (this.operateFlag === "") {
    //     this.$router.push({ path: "/product/batch" });
    //     this.showLoading = true;
    //     this.value = "";
    //   } else if (this.operateFlag === "restore") {
    //     this.$router.push({ path: "/product/secret" });
    //   } else {
    //     return;
    //   }
    // },
    getSelectData() {
      api.getAllList().then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          this.options = data.data;
          const query = this.$route.query;
          if (Object.keys(query).length > 0) {
            const temp = this.options.filter(o => {
              return o.id === Number(query.goods_id);
            });
            this.value = temp[0].name;
          }
        }
      });
    },
    getTrashCode(flag, data) {
      api.getDeleteCode(data).then(res => {
        const data = res.data;
        if (flag) {
          this.trashList = this.trashList.concat(data.data);
          this.busy = false;
          if (data.data.length === 0) {
            this.showLoading = false;
            this.busy = true; // 无线滚动禁止 启动
          } else {
            this.busy = false; // 无线滚动禁止 取消
          }
        } else {
          this.trashList = [];
          if (data.data.length === 0) {
            // this.msgText = "无匹配数据";
            // this.show3 = true;
            this.$message({
              type: "info",
              message: `无匹配数据`,
              customClass: "trash-my-message"
            });
            this.showLoading = false;
            this.busy = true;
            return;
          }
          this.pageInfo.count = data.total;
          this.busy = false;
          this.trashList = data.data;
        }
      });
    },
    getGoodsId(id) {
      this.pageInfo.pageIndex = 1;
      this.$router.push({
        path: "/product/batch",
        query: { goods_id: id }
      });
    },
    getSortId(id) {
      this.pageInfo.pageIndex = 1;
      this.$router.push({
        path: "/product/batch",
        query: { goods_id: id }
      });
      // window.location.reload(true);
    },
    // getGoodsId() {},
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {},
    loadMore() {
      // log("load");
      this.busy = true; // 无线滚动禁止
      setTimeout(() => {
        this.pageInfo.pageIndex += 1;
        const query = this.$route.query;
        if (Object.keys(query).length > 0) {
          const data = {
            params: { page: this.pageInfo.pageIndex, goods_id: query.id }
          };
          this.getTrashCode(true, data);
        } else {
          const data = {
            params: { page: this.pageInfo.pageIndex, keyword: this.productNo }
          };
          this.getTrashCode(true, data);
        }
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.batch-mask {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 501;
  background-color: rgba(0, 0, 0, 0.3);
}
.trash-my-message {
  min-width: 90% !important;
}
.el-message-box {
  width: 90% !important;
}
.px-batch-code {
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
  .batch-wrap {
    border-bottom: 0.02rem solid #d9d9d9;
    font-size: 0.26rem;
    color: #666;
    padding: 0.4rem;
    .batch-bottom {
      margin-top: 0.1rem;
      .batch-bottom-left {
        p {
          margin-top: 0.2rem;
          span {
            word-break: break-all;
          }
        }
      }
      .batch-bottom-right {
        ul {
          margin-top: 0.2rem;
          li {
            margin: 0 0.1rem;
            float: left;
            a {
              font-size: 0.24rem;
              display: inline-block;
              color: #fff;
              padding: 0.08rem;
              border-radius: 0.04rem;
              &:nth-child(1) {
                background: #409eff;
              }
            }
          }
        }
      }
    }
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
  .el-input--suffix .el-input__inner {
    /*border-bottom: none;
         */
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
  .btn-wrap {
    font-size: 0;
    width: 80%;
    margin: 0.4rem auto;
  }
}
</style>
