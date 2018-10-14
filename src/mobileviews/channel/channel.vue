<template>
    <div class="channel-box">
        <div class="channel-box-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore">
                <span style="font-size: 0.32rem;">渠道分析</span>
            </x-header>
        </div>
        <div class="date-select">
            <el-form>
                <el-form-item>
                    <el-col :span="20" style="margin-left:8.3%;margin-top:0.3rem">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="channelform.begin_time" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col :span="20" style="margin-left:8.3%;margin-top:0.3rem">
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="channelform.end_time" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col style="margin-left:8.3%;margin-top:0.3rem">
                        <el-button type="primary" size="mini" round @click="searchChannel" icon="el-icon-search">立即查询</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>
        <divider>渠道分析</divider>
        <table border="1" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <th>支付方式</th>
                    <th>提交订单数</th>
                    <th>已付订单数</th>
                    <th>未付订单数</th>
                    <th>订单总金额</th>
                    <th>订单实收金额</th>
                    <th>订单总收入</th>
                </tr>
                <tr v-for="(item,index) in channelList" :key="index">
                    <td>{{item.payment_method}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.paid_count}}</td>
                    <td>{{item.not_paid_count}}</td>
                    <td>{{item.total_amount}}</td>
                    <td>{{item.total_paid_amount}}</td>
                    <td>{{item.total_origin_paid_amount}}</td>
                </tr>
            </tbody>
        </table>

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
  name: "channel",
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
      channelList: [],
      channelform: {
        begin_time: "",
        end_time: ""
      }
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
          this.getChannel(data);
        }
      },
      immediate: true
    }
  },
  mounted() {
    let year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      date = new Date().getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if(date < 10) {
      date = "0" + date;
    }
    this.channelform.begin_time = year + "-" + month + "-" + date;
    this.channelform.end_time = year + "-" + month + "-" + date;
    let params = {
      params: {
        begin_time: this.channelform.begin_time,
        end_time: this.channelform.end_time
      }
    };
    api.getChannel(params).then(res => {
      const data = res.data.data;
      if (data.datas && data.datas.length > 0) {
        this.channelList = data.datas;
      }
    });
  },
  destroyed() {},
  methods: {
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {},
    searchChannel() {
      const newQuery = {
        begin_time: this.channelform.begin_time,
        end_time: this.channelform.end_time
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    },
    getChannel(data) {
      api.getChannel(data).then(res => {
        const datas = res.data;
        if (datas.data.datas && datas.data.datas.length > 0) {
          this.channelList = datas.data.datas;
        } else {
          this.channelList = [];
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.channel-box {
  width: 100%;
  overflow: hidden;
  .select-status {
    height: 0.8rem;
    width: 100%;
    font-size: 0.3rem;
  }
  table {
    background: #fff;
    border: 0.02rem solid #f8f8f8;
    text-align: center;
    border-collapse: collapse;
    width: 90%;
    margin: 0.2rem auto 1.2rem;
    tbody {
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
      tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        th {
          background: #ffffff;
          height: 0.75rem;
          line-height: 0.75rem;
          font-size: 0.25rem;
          border-right: 0.02rem solid #f6f6f6;
        }
        td {
          padding: 0.2rem 0;
          font-size: 0.25rem;
          border: 0.02rem solid #f2f2f2;
        }
      }
    }
  }
}
</style>
