<template>
    <div style="position:relative;height:100%">
      <div class="category-mask" v-show="tag"></div>
      <second-alert v-show="tag" @callback="handleDelete" @close="tag=false"></second-alert>
        <div v-if="isEdit">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 16px;">{{editBanner}}</span></x-header>
            <group>
                <x-input   :title='`<span style="font-size: 0.32rem;">分类名称</span>`' v-model="form.name" placeholder="请输入分类名称"></x-input>
                <x-number  :title='`<span style="font-size: 0.32rem;">分类排序</span>`'  v-model="form.sort" :min="1" :max="4" :value="1"></x-number>
            </group>
            <button class="add-btn" @click="handleUpdate">确认修改</button>
            <alert v-model="changeShow" title="操作信息提示"  @on-hide="changelist">{{changeText}}</alert>
            <div class="mb-notice">
                <i class="el-icon-third-natice"></i>
                排序规则：排序数值越小，排位越靠前，如：排序99的会在排序100之上，在购买页面的商品分类列表会以此排序。
            </div>
        </div>
        <div v-else>
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="categorybannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">{{bannerTitle}}</span></x-header>

            <group>
                <x-input :title='`<span style="font-size: 0.28rem;">分类名称</span>`' v-model="form.name" placeholder="请输入分类名称" style="font-size: 0.28rem"></x-input>
                <x-number :min="1"  :title='`<span style="font-size: 0.28rem;" >分类排序</span>`' button-style="round"  fillable v-model="form.sort"></x-number>
            </group>
            <button class="add-btn" @click="addProduct">添加分类</button>
            <divider>商品分类列表</divider>
            <div class="list-wrap">
                <div class="sort-list" v-for="item in tableData" :key="item.id">
                    <p class="title clearfix">
                        <i class="iconfont" style="float: left;width: 5%;font-size: 0.3rem;">&#xe604;</i>
                        <span style="display:block;width: 15%;float: left;text-align: center">分类:</span>
                        <span style="display: block;float: left;" class="title-content">{{item.name}}</span>
                    </p>
                    <p class="clearfix">
                <span style="display:block;float:left;padding:0.1rem 0.1rem 0.1rem 0;">
                    <span style="display: inline-block;margin-right: 0.1rem;">当前排序:</span>{{item.sort}}
                </span>
                <span style="display:block;float: right;" class="list-btn">
                    <a href="javascript:;"  @click="handleEdit(item.id)">修改</a>
                    <a href="javascript:;" @click="handleLink">链接</a>
                    <a href="javascript:; " @click="delConfirm(item.id)">删除</a>
                 </span>
                    </p>
                </div>
                <template>
                    <div class="group-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    </div>
                    <load-more tip="正在加载" v-if="showLoading"></load-more>
                </template>
            </div>
            <TabBar></TabBar>
            <el-dialog title="商品分类链接" :visible.sync="dialogLink" class="px-pr-qr" >
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
            <!--<alert v-model="show" title="操作信息提示"  @on-hide="changelist">{{msgText}}</alert>-->
            <!--<confirm v-model="show2"-->
                     <!--:show-cancel-button="false"-->
            <!--&gt;-->
                <!--<p style="text-align:center;">请填写分类名称</p>-->
            <!--</confirm>-->
            <!--<confirm v-model="deleteShow"-->
                     <!--title="操作提示"-->
                     <!--@on-cancel="deleteShow = false"-->
                     <!--@on-confirm="onConfirm"-->
                     <!--&gt;-->
                <!--<p style="text-align:center;">此操作将删除该条记录, 是否继续?</p>-->
            <!--</confirm>-->
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import Clipboard from "clipboard";
import SecondAlert from "@/components/mobile/PwdAlert.vue";
import TabBar from "@/components/mobile/TabBar";
import VueQr from "vue-qr";
import {
  XHeader,
  XInput,
  XNumber,
  Group,
  Divider,
  Alert,
  Confirm,
  LoadMore
} from "vux";
export default {
  name: "Category",
  components: {
    VueQr,
    MbHeader,
    XInput,
    XNumber,
    Group,
    Divider,
    TabBar,
    Alert,
    Confirm,
    XHeader,
    LoadMore,
    SecondAlert
  },
  data() {
    return {
      ShopUrl: "",
      src: "",
      dialogLink: false,
      showLoading: true,
      busy: true,
      tag: false,
      curId: "",
      pageInfo: {
        count: 0,
        pageIndex: 1,
        pageSize: 20
      },
      isDel: false,
      deleteShow: false,
      changeText: "",
      changeShow: false,
      msgText: "",
      operateId: 0,
      editBanner: "修改商品分类",
      isEdit: false,
      show2: false,
      show: false,
      bannerTitle: "添加商品分类",
      link_code: "",
      loading: true,
      curPage: "1",
      curIndex: null,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      isModify: {
        name: "",
        sort: 1
      },
      form: {
        name: "",
        sort: 1
      },
      changeForm: {
        id: "",
        name: "",
        sort: 1
      },
      currentPage4: 4,
      tableData: []
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
    const clipboard = new Clipboard(".share-btn");
  },
  methods: {
    handleLink() {
      const host = window.location.host;
      this.dialogLink = true;
      const code = this.$store.state.user.link_code;
      this.ShopUrl = "http://" + host + "/paylink/" + code;
    },
    categorybannerBack() {
      this.$router.go(-1);
    },
    onConfirm() {
      api.deleteProduct({ id: this.operateId }).then(res => {
        const data = res.data;
        if (data.result === 1) {
          const localNumber = _.findIndex(this.tableData, o => {
            return o.id === this.operateId;
          });
          this.tableData.splice(localNumber, 1);
          this.show = true;
          this.msgText = "删除成功";
        }
      });
    },
    doMore() {},
    bannerBack() {
      this.form.name = "";
      this.form.sort = 1;
      this.isEdit = false;
    },
    // changelist() {
    //   if (this.isDel) {
    //     this.isDel = false;
    //   } else {
    //     window.location.reload(true);
    //   }
    // },
    loadMore() {
      this.busy = true; // 无线滚动禁止
      setTimeout(() => {
        this.pageInfo.pageIndex += 1;
        this.getTableData(true); // 调用获取数据的接口
      }, 500);
    },
    getTableData(flag) {
      api
        .getProductList({ params: { page: this.pageInfo.pageIndex } })
        .then(res => {
          const data = res.data;
          if (flag) {
            this.tableData = this.tableData.concat(data.data);
            this.busy = false;
            if (data.data.length === 0) {
              this.showLoading = false;
              this.busy = true; // 无线滚动禁止 启动
            } else {
              this.busy = false; // 无线滚动禁止 取消
            }
          } else {
            this.pageInfo.count = data.total;
            this.tableData = data.data;
            this.busy = false;
          }
        });
    },
    // copyText() {
    //   this.$message({
    //     message: "链接复制成功",
    //     type: "success",
    //     duration: 3000
    //   });
    // },
    addProduct() {
      if (this.form.name === "") {
        // this.show2 = true;
        this.$message({
          message: "请填写要添加的种类",
          type: "warning",
          customClass: "category-msg"
        });
        return;
      }
      api.addProductSort(this.form).then(res => {
        const data = res.data;
        if (data.result === 1) {
          // this.msgText = "添加成功";
          // this.show = true;
          this.$message({
            message: "添加成功",
            type: "success",
            customClass: "category-msg"
          });
          const timer = setTimeout(() => {
            window.location.reload(true);
            clearTimeout(timer);
          }, 1000);
        }
      });
    },
    handleUpdate() {
      if (
        this.isModify.name === this.form.name &&
        this.isModify.sort === this.form.sort
      ) {
        this.form.name = "";
        this.form.sort = 1;
        this.isEdit = false;
      } else {
        this.changeForm.name = this.form.name;
        this.changeForm.sort = this.form.sort;
        this.changeForm.id = this.operateId;
        api.updateProductList(this.changeForm).then(res => {
          const data = res.data;
          if (data.result === 1) {
            // this.changeShow = true;
            // this.changeText = "修改成功";
            this.$message({
              message: "修改成功",
              type: "success",
              customClass: "category-msg"
            });
            this.form.name = "";
            this.form.sort = 1;
            const timer = setTimeout(() => {
              window.location.reload(true);
              clearTimeout(timer);
            }, 1000);
          }
        });
      }
    },
    handleEdit(id) {
      this.isEdit = true;
      const changeOption = this.tableData.filter(o => {
        return o.id === id;
      });
      this.form.name = changeOption[0].name;
      this.form.sort = changeOption[0].sort;
      this.isModify.name = changeOption[0].name;
      this.isModify.sort = changeOption[0].sort;
      this.operateId = id;
    },
    handleDelete(id) {
      // this.deleteShow = true;
      // this.operateId = id;
      // this.isDel = true;
      this.tag = false;
      this.$confirm("此操作将删除该条记录, 是否继续?", "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除",
              customClass: "category-msg"
            });
          } else {
            api.deleteProduct({ id: this.curId }).then(res => {
              const data = res.data;
              if (data.result === 1) {
                const localNumber = _.findIndex(this.tableData, o => {
                  return o.id === this.curId;
                });
                this.tableData.splice(localNumber, 1);
                this.$message({
                  type: "success",
                  message: `${data.message}`,
                  customClass: "category-msg"
                });
              }
            });
          }
        }
      });
    },
    delConfirm(id) {
      this.curId = id;
      if (localStorage.getItem("Second_Confirm") == 1) {
        this.tag = true;
      } else {
        this.tag = false;
        this.handleDelete(id);
      }
    },
    handleProduct(index, row) {
      this.$router.push({
        path: "/product/goodslist",
        query: { category_id: row.id }
      });
    },
    handleLeftCard(index, row) {
      this.$router.push({
        path: "/product/secret",
        query: { id: row.id }
      });
    }
  }
};
</script>
<style>
.vux-number-round .vux-number-input {
  width: 60px !important;
  max-width: 100px;
}
</style>

<style  lang="scss">
.px-pr-qr {
  .el-dialog {
    width: 90%;
  }
}
.category-mask {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}
.category-msg {
  min-width: 90%;
}
.el-message-box {
  width: 90% !important;
}
.mb-notice {
  width: 92%;
  padding: 2%;
  margin: 0.4rem auto;
  word-break: break-all;
  font-size: 0.26rem;
  line-height: 0.4rem;
  box-shadow: 0 0.04rem 0.24rem 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e1ff;
  border-radius: 0.1rem;
}
.add-btn {
  width: 6rem;
  height: 0.84rem;
  display: block;
  margin: 0.3rem auto;
  border: none;
  background: #409eff;
  color: #fff;
  border-radius: 0.1rem;
  font-size: 0.28rem;
}
.list-wrap {
  color: #666;
  margin-bottom: 1rem;
  .sort-list {
    font-size: 0.26rem;
    border-bottom: 1px solid #d9d9d9;
    .title {
      span {
        word-wrap: break-word;
      }
      .title-content {
        width: 80%;
      }
    }
    p {
      width: 92%;
      margin: 0.4rem auto;
    }
    .list-btn {
      font-size: 0;
      a {
        display: inline-block;
        color: #fff;
        background: #e6a23c;
        border-radius: 0.04rem;
        margin: 0 0.1rem;
        font-size: 0.24rem;
        padding: 0.1rem;
        text-align: center;
        &:nth-child(2) {
          background: #409eff;
        }
        &:nth-child(3) {
          background: #f56c6c;
        }
      }
    }
  }
}
</style>
