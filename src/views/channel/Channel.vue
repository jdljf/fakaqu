<template>
   <div id="Channel">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{$t('channel.title')}}</span>
  </div>
  <div class="searchform">
  <el-form ref="channelform" :model="channelform" label-width="80px">
  <el-form-item >
       <el-col :span="4">
      <el-date-picker type="date"  value-format="yyyy-MM-dd" :placeholder="$t('channel.plasedate')" v-model="channelform.begin_time" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col :span="4">
      <el-date-picker type="date"  value-format="yyyy-MM-dd" :placeholder="$t('channel.plasedate')" v-model="channelform.end_time" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-button type="primary" @click="searchannel" icon="el-icon-search">{{$t('channel.search')}}</el-button>
    <el-button type="warning" @click="resetincome" >{{$t('channel.reset')}}</el-button>

  </el-form-item>  
  </el-form>
  </div>
</el-card>

    <el-card class="table-card">
      <!-- <el-col :span="12">
        <div id="chartLine" style="width:100%; height:400px;"></div>
      </el-col>
       <el-col :span="12">
          <div id="chartBar" style="width:100%; height:400px;"></div>
       </el-col> -->
     <el-table
    :data="channeltable"
    border
    show-summary
    style="width: 100%">
    <el-table-column
     prop="payment_method"
     align="center"

      :label="$t('channel.paymethod')"
      width="100">
    </el-table-column>
     <el-table-column
     prop="paid_count"
     align="center"

      :label="$t('channel.Orderspaid')"
      width="180">
    </el-table-column>
     <el-table-column
     prop="total"
     align="center"

      :label="$t('channel.ordernum')"
      width="180">
    </el-table-column>
     <el-table-column
     prop="not_paid_count"
     align="center"
       :label="$t('channel.Unpaidorders')"
      width="180">
    </el-table-column>
    <el-table-column
     prop="total_amount"
     align="center"

     :label="$t('channel.Orderpaidamount')">
    </el-table-column>
    <el-table-column
     prop="total_paid_amount"
     align="center"

      :label="$t('channel.totalorders')">
    </el-table-column>
    <el-table-column
     prop="total_origin_paid_amount"
     align="center"
      :label="$t('channel.Totalorderrevenue')">
    </el-table-column>
  </el-table>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;color:#000">
</el-pagination>
    </el-card>
   </div>
</template>
<script>
import Schart from "vue-schart";
import echarts from "echarts";
import api from "@/axios/api";
export default {
  data() {
    return {
      chartLine: null,
      chartBar: null,
      canvasId: "myCanvas",
      type: "bar",
      width: 500,
      height: 300,
      total: 0,
      page: 1,
      channeltable: [],
      options: {
        padding: 44,
        bgColor: "#FFFFFF",
        title: "渠道分析图表",
        titleColor: "#000000",
        titlePosition: "top",
        yEqual: 6,
        fillColor: "#22A7C7",
        contentColor: "#eeeeee",
        axisColor: "#5E9BAD"
      },

      channelform: {
        end_time: "",
        begin_time: ""
      }
    };
  },
  components: {
    Schart
  },
  watch: {
    $route: {
      handler(newValue) {
        const begin_time = newValue.query.begin_time;
        const end_time = newValue.query.end_time;
        if (begin_time !== undefined || end_time !== undefined) {
          const data = {
            params: { begin_time: begin_time, end_time: end_time }
          };
          this.getChannel(data);
        }
      },
      immediate: true
    }
  },
  methods: {
    searchannel() {
      const datas = {
        begin_time: this.channelform.begin_time,
        end_time: this.channelform.end_time
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, datas)
      });
    },
    resetincome() {
      this.$router.push({ name: "Channel" });
      this.channelform.begin_time = "";
      this.channelform.end_time = "";
      this.getChannel();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getChannel({ params: { page: val } });
    },
    getinit() {
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
      const data = {
        params: {
          begin_time: this.channelform.begin_time,
          end_time: this.channelform.end_time
        }
      };
      this.getChannel(data);
    },
    getChannel(data) {
      this.listLoadingall = true;
      api.getChannel(data).then(res => {
        const data = res.data;
        if (data.result === 1 && data.data.datas.length>0) {
          this.channeltable = data.data.datas;

          this.total = data.data.cal.total;
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
        }
      });
    },
    drawBarChart() {
      this.chartBar = echarts.init(document.getElementById("chartBar"));
      this.chartBar.setOption({
        title: {
          text: "渠道分析柱图",
          subtext: "数据来自借卡吧"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["提交订单", "成功订单", "订单总额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },

        series: [
          {
            name: "提交订单",
            type: "bar",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "成功订单",
            type: "bar",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "订单总额",
            type: "bar",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    // 曲线
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "渠道分析曲线图",
          subtext: "数据来自借卡吧"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["提交订单", "成功订单", "订单总额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },

        series: [
          {
            name: "提交订单",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "成功订单",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "订单总额",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  },
  mounted() {
    // this.drawLineChart();
    // this.drawBarChart();
    this.getChannel();
    this.getinit();
  }
};
</script>
<style  lang="scss">
ul {
  color: #000 !important;
}
#Channel {
  padding: 20px;
  .clearfix {
    font-weight: bold;
  }
  .searchform {
    text-align: left;
    .el-form-item__content {
      margin-left: 4px !important;
      .el-col {
        margin-right: 5px;
      }
      .el-select {
        margin-right: 5px;
        width: 15%;
      }
      .el-input {
        margin-right: 5px;
      }
      .el-button {
        margin-right: 5px;
      }
    }
  }

  .el-pagination {
    .el-pager {
      color: #000;
    }
  }
  .table-card {
    margin-top: 20px;
    .canvas-img {
      display: flex;
      flex-direction: row;
      .icon-div {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        .iconimg {
          width: 30px;
          padding: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
