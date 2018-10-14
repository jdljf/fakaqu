<template>
  <div class="orderRecord-box">
    <div class="orderRecord-box-title">
      <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore">
        <span style="font-size: 0.32rem;">订单查询</span>
      </x-header>
    </div>
    <div class="date-select">
      <el-form>
        <el-form-item>
          <el-col :span="20" style="margin-left:8%;margin-top:0.3rem">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="orderform.begin_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="20" style="margin-left:8%;margin-top:0.3rem">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="orderform.end_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="20" style="margin-left:8%;margin-top:0.3rem">
            <el-input v-model="orderform.kw" placeholder="请输入订单号或者联系方式"> </el-input>
          </el-col>

          <el-select style="width:83.3%;margin-left:8%;margin-top:0.3rem" v-model="orderform.kw_type" placeholder="请选择">
            <el-option label="订单号" value="1">订单号</el-option>
            <el-option label="联系方式" value="2">联系方式</el-option>
            <el-option label="商品名称" value="3">商品名称</el-option>
            <el-option label="商品卡号" value="4">商品卡号</el-option>
          </el-select>
          <el-select v-model="orderform.status" style="width:84%;margin-left:8%;margin-top:0.3rem" class="select-status" placeholder="请选择订单状况">
            <el-option label="所有" value=""></el-option>
            <el-option label="已付款" value="1"></el-option>
            <el-option label="未付款" value="2"></el-option>
          </el-select>
          <el-col style="margin-left:8.3%;margin-top:0.3rem">
            <el-button type="primary" size="mini" round @click="searchOrderList" icon="el-icon-search">立即查询</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <divider>订单查询列表</divider>

    <div id="order-list-wrap">
      <div class="order-list" v-for="(item,index) in orderList" v-bind:key="index">
        <div class="order-list-title">
          <span class="name" style="color:#56a5fc">订单编号：{{item.no}}</span>
        </div>
        <div class="order-list-con">
          <p>支付状态：{{item.paid_at!=null?'已支付':'未支付'}}<br>交易时间：{{item.created_at}}<br>商品名称：{{item.items.title}}
            <span class="red"> </span><br>支付方式：{{item.payment_method}}<br>金额：{{item.total_amount}}元<br>购买者信息：{{item.credence}}</p>
          <div id="clear" style="clear:both"></div>
        </div>
      </div>
      <div class="scroll-loading" v-show="loadingTag">{{loadingText}}</div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import Clipboard from "clipboard";
import { XHeader } from "vux";
import { Group } from "vux";
import { Divider } from "vux";
import TabBar from "@/components/mobile/TabBar";
import { Alert } from "vux";
import { Confirm } from "vux";
export default {
  name: "orderRecord",
  components: {
    MbHeader,
    Group,
    Divider,
    TabBar,
    Alert,
    Confirm,
    XHeader
  },
  data() {
    return {
      pageInfo: {
        pageIndex: 1
      },
      loadingTag: false,
      loadingText: "正在加载数据，请稍候...",
      orderList: [],
      total: "",
      orderform: {
        status: "",
        begin_time: "",
        end_time: "",
        kw_type: "",
        kw: ""
      }
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const status = newValue.query.status;
        const kw = newValue.query.kw;
        const kw_type = newValue.query.kw_type;
        const end_time = newValue.query.end_time;
        const begin_time = newValue.query.begin_time;
        if (
          status !== undefined ||
          kw !== undefined ||
          kw_type !== undefined ||
          end_time !== undefined ||
          begin_time !== undefined
        ) {
          const data = {
            params: {
              begin_time: begin_time,
              end_time: end_time,
              kw_type: kw_type,
              kw: kw,
              status: status
            }
          };
          this.orderform.kw = kw;
          this.getOrderList(data);
        }
      },
      immediate: true
    }
  },
  mounted() {
    api.getorderlist(this.orderform).then(res => {
      const data = res.data;
      if (data.data && data.data.length > 0) {
        this.orderList = data.data;
        this.total = data.total;
        this.pageInfo.pageIndex++;
      } else {
        this.loadingTag = true;
        this.loadingText = "暂无数据";
      }
    });
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    doMore() {},
    searchOrderList() {
      const nameKey = _.trim(this.orderform.kw);
      const newQuery = {
        kw: nameKey,
        kw_type: this.orderform.kw_type,
        status: this.orderform.status,
        begin_time: this.orderform.begin_time,
        end_time: this.orderform.end_time
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
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
          .getorderlist({ params: { page: this.pageInfo.pageIndex } })
          .then(res => {
            const response = res.data;
            if (response.data && response.data.length > 0) {
              response.data.forEach(element => {
                that.orderList.push(element);
              });
              that.pageInfo.pageIndex++;
              that.loadingTag = false;
            } else {
              that.loadingTag = true;
              that.loadingText = "暂无数据";
            }
          });
      }
    },
    getOrderList(param) {
      api.getorderlist(param).then(res => {
        const datas = res.data;
        if (datas.data && datas.data.length > 0) {
          this.orderList = datas.data;
          this.total = datas.total;
          this.loadingTag = false;
        } else {
          this.orderList = [];
          this.loadingTag = true;
          this.loadingText = "暂无数据";
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.orderRecord-box {
  width: 100%;
  overflow: hidden;
  .select-status {
    height: 0.8rem;
    width: 100%;
    font-size: 0.3rem;
  }
  #order-list-wrap {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    .order-list {
      display: block;
      width: 100%;
      margin: 0 auto;
      font-size: 0.25rem;
      .order-list-title {
        width: 92%;
        border-top: 0.02rem solid #e0e1ff;
        padding: 4% 4% 4% 0.4rem;

        color: #000;
        font-weight: bold;
        i {
          color: #000;
        }
        a {
          float: right;
        }
      }
      .order-list-con {
        padding: 0 4% 4% 0.4rem;
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
}
</style>
