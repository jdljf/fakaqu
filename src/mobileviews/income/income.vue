<template>
    <div class="income-box">
        <div class="channel-box-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore">
                <span style="font-size: 0.32rem;">收益统计</span>
            </x-header>
        </div>
        <div class="date-select">
            <el-form>
                <el-form-item>
                    <el-col :span="20" style="margin-left:8.3%;margin-top:0.3rem">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="incomeform.begin_time" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="20" style="margin-left:8.3%;margin-top:0.3rem">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="incomeform.end_time" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col style="margin-left:8.3%;margin-top:0.3rem">
                        <el-button type="primary" size="mini" round @click="searchIncome" icon="el-icon-search">立即查询</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <divider>收益统计</divider>
        <div class="incomenum">
            <ul>
                <li class="incomenumli">
                    <span class="ic-li">
                        <h5>总计卖出</h5>
                    </span>
                    <span class="ic-lir">
                        <span class="ic-num">{{total_sell}}（张）</span>
                    </span>
                    <div class="ic-bottom">总计卖出</div>
                </li>
                <li class="incomenumli">
                    <span class="ic-li">
                        <h5>订单总价</h5>
                    </span>
                    <span class="ic-lir">
                        <span class="ic-num">{{total_origin_amount}}（元）</span>
                    </span>
                    <div class="ic-bottom">订单总价格</div>
                </li>
                <li class="incomenumli">
                    <span class="ic-li">
                        <h5>实际所得</h5>
                    </span>
                    <span class="ic-lir">
                        <span class="ic-num">{{total_amount}}（元）</span>
                    </span>
                    <div class="ic-bottom">扣除平台手续费后实际所得</div>
                </li>
                <li class="incomenumli">
                    <span class="ic-li">
                        <h5>纯利润</h5>
                    </span>
                    <span class="ic-lir">
                        <span class="ic-num">{{total_profit}}（元）</span>
                    </span>
                    <div class="ic-bottom">扣除进价后纯利润（仅供参考）</div>
                </li>
            </ul>
        </div>
        <div id="income-list-wrap">
            <div class="income-list" v-for="(item,index) in incomeList" v-bind:key="index">
                <div class="income-list-title">
                    <span class="name" style="color:#56a5fc">订单编号：{{item.no}}</span>
                    <a class="status"> </a>
                </div>
                <div class="income-list-con">
                    <p>商品名称：{{item.items.title}}
                        <br>购买数量：{{item.items.number}} <br>支付方式：{{item.payment_method}}<br>金额：+{{item.order_amount}}元<br>购买者信息：{{item.credence}}</p>
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
export default {
  name: "Income",
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
      options: [],
      total: 0,
      page: 1,
      incomeform: {
        begin_time: "",
        end_time: ""
      },
      total_sell: "",
      total_origin_amount: "",
      total_amount: "",
      total_profit: "",
      incomeList: [],
      loadingTag: false,
      loadingText: ""
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const end_time = newValue.query.end_time;
        const begin_time = newValue.query.begin_time;
        if (end_time !== undefined || begin_time !== undefined) {
          const data = {
            params: {
              begin_time: begin_time,
              end_time: end_time
            }
          };
          this.getIncomeList(data);
          this.getIncomeDesc(data);
        }
      },
      immediate: true
    }
  },
  methods: {
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {},
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
        api.getIcomess({ params: { page: this.page } }).then(res => {
          const response = res.data;
          if (response.data && response.data.length > 0) {
            response.data.forEach(element => {
              that.incomeList.push(element);
            });
            that.page++;
            that.loadingTag = false;
          } else {
            that.loadingTag = true;
            that.loadingText = "暂无数据";
          }
        });
      }
    },
    getIncomeDesc(params) {
      api.getAnalyDesc(params).then(res => {
        const data = res.data;
        if (data.data) {
          this.total_sell = data.data.total_sell;
          this.total_origin_amount = data.data.total_origin_amount;
          this.total_amount = data.data.total_amount;
          this.total_profit = data.data.total_profit;
        }
      });
    },
    getIncomeList(param) {
      api.getIcomess(param).then(res => {
        const data = res.data;
        if (data.data && data.data.length > 1) {
          this.incomeList = data.data;
          this.loadingTag = false;
          this.page++;
        } else {
          this.incomeList = [];
          this.loadingTag = true;
          this.loadingText = "暂无数据";
        }
      });
    },
    searchIncome() {
      const newQuery = {
        begin_time: this.incomeform.begin_time,
        end_time: this.incomeform.end_time
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    }
  },
  mounted() {
    this.getIncomeList();
    this.getIncomeDesc();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.income-box {
  width: 100%;
  overflow: hidden;
  .incomenum {
    color: #000;
    .incomenumli {
      width: 83%;
      height: 1.8rem;
      background: #fff;
      margin: 0 auto;
      margin-bottom: 0.4rem;
      color: #000;
      // box-shadow: 1px 2px 3px 2px #f6f6f6;
      border: 1px solid #f7f7f7;
      font-size: 0.25rem;
      h1 {
        font-family: "Weibei SC";
      }
      .ic-li {
        display: inline-block;
        padding: 0.4rem;
        border-right: 1px dashed #ccc;
        margin: 0.1rem;
      }
      .ic-lir {
        color: #ccc;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        font-family: "Wawati SC";
        .ic-num {
          font-size: 0.25rem;
          color: #e42127;
          margin-right: 0.1rem;
          font-weight: bold;
          padding-left: 0.1rem;
          vertical-align: middle;
        }
      }
      .ic-bottom {
        height: 0.62rem;
        line-height: 0.62rem;
        font-size: 0.2rem;
        text-align: center;
        background: #3e9fdd;
        font-family: "Hannotate SC";
        color: #fff;
      }
    }
  }
  #income-list-wrap {
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    .income-list {
      display: block;
      width: 100%;
      margin: 0 auto;
      font-size: 0.25rem;
      .income-list-title {
        width: 92%;
        border-top: 0.02rem solid #e0e1ff;
        padding: 4%;
        color: #000;
        font-weight: bold;
        i {
          color: #000;
        }
        a {
          float: right;
        }
      }
      .income-list-con {
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
}
</style>
