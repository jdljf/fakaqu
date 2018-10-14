<template>
    <div class="sell-recent-box">
      <div class="coupon-mask" v-show="tag"></div>
      <second-alert v-show="tag" @callback="clearcoupons" @close="tag=false"></second-alert>
        <div class="sell-recent-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore"><span style="font-size: 0.32rem;">优惠券列表</span></x-header>
        </div>
        <el-form ref="coupons" :model="coupons">
            <el-form-item>
                <el-select style="width:83.3%;margin-left:8.3%;margin-top:0.3rem" v-model="coupons.category_id" placeholder="请选择" size="medium" @change="getCurChange">
                    <el-option label="全部" value="0"></el-option>
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select style="width:83.3%;margin-left:8.3%;margin-top:0.3rem" v-model="coupons.status" placeholder="请选择">
                    <el-option label="已使用" value="1"></el-option>
                    <el-option label="未使用" value="2"></el-option>
                </el-select>
                <el-col :span="20" style="margin-left:8.3%;margin-top:0.3rem">
                    <el-input v-model="coupons.code" placeholder="请输入优惠券信息"> </el-input>
                </el-col>
                <el-col style="margin-left:2%;margin-top:0.3rem;">
                    <el-button type="primary" style="width:90%;margin-left:3%"   @click="searchRecent" icon="el-icon-search">立即查询</el-button>
                </el-col>
                 <el-col style="margin-left:2%;margin-top:0.3rem;">
                  <el-button type="primary"  style="width:35%;margin-left:3%;"  @click="goaddcoupons" icon="el-icon-circle-plus-outline">添加</el-button>
                 <el-button type="danger" style="width:50%;" @click="delConfirm"><i class="el-icon-delete" ></i>清空优惠券</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <divider>优惠券列表</divider>
        <div id="sell-list-wrap">
            <div class="sell-list" v-for="(item,index) in couponstable" :key="index">
                <div class="name">
                    优惠券编号:{{item.code}}
                </div>
                <div class="sell-list-title">
                   <span href="javascript:void(0)">绑定分类:{{(item.category_id===0?'全部':item.category.name)}}</span>
                </div>
                <div class="sell-list-con">
                        <p>面额:{{item.value}}{{(item.type===0?'元':'%')}}
                        <br>生成时间:{{item.created_at}}<br>
                        备注信息:{{item.remark}}<br>
                        到期时间:{{item.expire_time}}
                        </p>
                    <div id="clear" style="clear:both"></div>
                </div>

            </div>
            <div class="scroll-loading" v-show="loadingTag">{{loadingText}}</div>
        </div>

        <TabBar></TabBar>
    </div>
</template>

<script>
import api from "@/axios/api";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import Clipboard from "clipboard";
import { XHeader } from "vux";
import { Group } from "vux";
import { Divider } from "vux";
import TabBar from "@/components/mobile/TabBar";
import { Alert } from "vux";
import { Confirm } from "vux";
import SecondAlert from "@/components/mobile/PwdAlert.vue";
import _ from "lodash";
export default {
  name: "SellRecently",
  confirmText: "",
  components: {
    MbHeader,
    Group,
    Divider,
    TabBar,
    Alert,
    Confirm,
    XHeader,
    SecondAlert
  },
  data() {
    return {
      tag: false,
      category_id: "",
      listLoadingall: false,
      couponstable: [],
      options: [],
      coupons: {
        category_id: "",
        status: "",
        code: ""
      },

      selectedId: 0,
      total: 0,
      loadingTag: false,
      loadingText: "正在加载数据，请稍候...",
      pageInfo: {
        pageIndex: 1
      }
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const category_id = newValue.query.category_id;
        const code = newValue.query.code;
        const status = newValue.query.status;
        if (
          category_id !== undefined ||
          code !== undefined ||
          status !== undefined
        ) {
          const data = {
            params: {
              category_id: category_id,
              code: code,
              status: status
            }
          };
          this.coupons.code = code;
          this.getRecent(data);
        }
      },
      immediate: true
    }
  },
  methods: {
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    doMore() {},
    getCurChange(change) {
      this.selectedId = change;
    },
    searchRecent() {
      const nameKey = _.trim(this.coupons.code);
      const newQuery = {
        category_id: this.selectedId,
        code: nameKey,
        status: this.coupons.status
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    },
    getRecent(data) {
      api.getcoupons(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length > 0) {
          this.couponstable = data.data;
          this.total = data.total;
          this.loadingTag = false;
        } else {
          this.tableData = [];
          this.loadingTag = true;
          this.loadingText = "暂无其他数据";
        }
      });
    },
    getSelectData() {
      api.getAllSort().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.options = data.data;
          const query = this.$route.query;
          if (Object.keys(query).length > 0) {
            const temp = this.options.filter(o => {
              return o.id === Number(query.category_id);
            });
            this.value = temp[0].name;
          }
        }
      });
    },
    handleScroll() {
      let that = this;
      var elementScrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      var elementOffsetHeight = document.documentElement.clientHeight;
      var elementScrollHeight = document.body.scrollHeight;
      if (
        elementScrollHeight - elementScrollTop - elementOffsetHeight < 50 &&
        !this.loadingTag
      ) {
        this.loadingTag = true;
        api
          .getcoupons({ params: { page: this.pageInfo.pageIndex } })
          .then(res => {
            const response = res.data;
            if (response.data && response.data.length > 0) {
              response.data.forEach(element => {
                that.couponstable.push(element);
              });
              that.pageInfo.pageIndex++;
              that.loadingTag = false;
            } else {
              that.loadingTag = true;
              that.loadingText = "暂无其他数据";
            }
          });
      }
    },
    goaddcoupons() {
      this.$router.push({
        name: "addCoupons"
      });
    },
    delConfirm() {
      if (localStorage.getItem("Second_Confirm") == 1) {
        this.tag = true;
      } else {
        this.tag = false;
        this.clearcoupons();
      }
    },
    clearcoupons() {
      this.tag = false;
      this.$confirm("此操作将永久删除所有优惠券, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            api.clearcoupon().then(res => {
              const data = res.data;
              if (data.result === 1) {
                this.$message({
                  message: `${data.message}`,
                  type: "success",
                  duration: 3000
                });
                api.getcoupons().then(res => {
                  const data = res.data;
                  if (data.data && data.data.length > 0) {
                    this.couponstable = data.data;
                    this.total = data.total;
                  }
                });
                location.reload();
              } else {
              }
            });
          }
        }
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.getSelectData();
    api.getcoupons().then(res => {
      const data = res.data;
      if (data.data && data.data.length > 0) {
        this.couponstable = data.data;
        this.total = data.total;
      }
      this.pageInfo.pageIndex++;
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang='css'>
  .el-message-box{
    width: 90% !important;
  }
  .el-message{
  min-width: 90%;
}
</style>

<style lang="scss" scoped>
.sell-recent-box {
  position: relative;
  height: 100%;
  background-color: #fff;
  .coupon-mask {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
  }
  #sell-list-wrap {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    .sell-list {
      display: block;
      width: 100%;
      margin: 0 auto;
      font-size: 0.25rem;
      border-top: 0.02rem solid #e0e1ff;
      .name {
        padding: 4%;
        // color: #409eff;
        font-weight: 600;
      }
      .sell-list-phone {
        width: 92%;
        padding: 4% 4% 2% 4%;
        color: #666;
        .price {
          float: right;
          color: #409eff;
          font-weight: 700;
        }
      }
      .sell-list-title {
        width: 92%;
        padding: 4%;
        color: #000;
        font-weight: bold;
        i {
          color: #000;
        }
        .method {
          float: right;
          color: #666;
        }
        .price {
          float: right;
        }
      }
      .sell-list-con {
        padding: 0 4% 4% 4%;
        line-height: 24px;
        color: #666;
        p:nth-child(1) {
          float: left;
        }
      }
    }
    .scroll-loading {
      position: relative;
      width: 100%;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      overflow: hidden;
      color: #999;
      font-size: 0.28rem;
    }
  }
  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
  }
  .togglecard {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 4rem;
    height: 4rem;
    font-size: 0.25rem;
    z-index: 10;
    background-color: #f8f8f8;
    .toggle-text {
      line-height: 0.4rem;
    }
    .toggle-time {
      .clone-link {
        display: block;
        margin-top: 0.1rem;
        padding: 0.08rem 0.15rem;
        border: none;
        background: #188cf8;
        cursor: pointer;
        border-radius: 0.03rem;
        color: #fff;
      }
    }
  }
}
</style>
