//window.localStorage.isWeiXin
import echarts from "echarts";
// import api from "@/axios/api";
import { mapState } from "vuex";
import api from "@/axios/api";

export default {
  data() {
    return {
      contenttshow:false,
      last_withdraw_money:'',
      titles:'',
      totalmoney:'',
      todaymoney:'',
      yesterdaymoney:'',
      total_withdraw:'',
      userinfos: {
        mobile: "",
        qq: "",
        username: "",
        id: ""
      },
      today: {},
      yesterday: {},
      money: {},
      withdraw: {},
      articleLists: [],
      content: '',
    };
  },

  methods: {

    getuser() {
      api.getuser().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.userinfos = data.data;
          localStorage.setItem("userinfos", JSON.stringify(this.userinfos));
        }
      });
    },
    getbasedata() {
      api.getbasedata().then(res => {
        const data = res.data;
        if (data.result === 1) {
         this.today=data.data.today;
         this.withdraw=data.data.withdraw;
         this.yesterday=data.data.yesterday;
         this.money=data.data.money;
         this.totalmoney=Number(data.data.money.money).toFixed(2);
         this.todaymoney=Number(data.data.today.money).toFixed(2);
         this.yesterdaymoney=Number(data.data.yesterday.money).toFixed(2);
         this.last_withdraw_money=Number(data.data.withdraw.last_withdraw_money).toFixed(2);
         this.total_withdraw=Number(data.data.withdraw.total_withdraw).toFixed(2);
        }
      });
    },
    // 公告
    getarticleLists() {
      api.getarticleLists().then(res => {
        const data = res.data;
        this.articleLists = data.data;

      });
    },
    closetog() {
      this.contenttshow = false;
    },
    toggleshow(e) {
      this.contenttshow = true;
      this.content = e.content;
      this.titles = e.title;
    },
    toannouncement() {
      this.$router.push({ name: "Newslist" });
    },
    getprofitTrend() {
      api.getprofitTrend().then(res => {
        const data = res.data;
        if (data.result == 1) {
        }
      });
    },
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "收益折线图",
          subtext: "数据来自借卡吧"
        },
        itemStyle: {
          color: "skyblue"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["收益"]
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
          data: [
            "1-2",
            "2-3",
            "3-4",
            "4-5",
            "5-6",
            "6-7",
            "7-8",
            "8-9",
            "9-10",
            "10-11",
            "11-12",
            "12-13",
            "13-14"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "收益",
            type: "line",
            stack: "总量",
            data: [
              120,
              132,
              101,
              134,
              890,
              230,
              210,
              120,
              310,
              410,
              231,
              231,
              1000
            ]
          }
        ]
      });
    }
  },
  activated() {
    null;
  },
  // computed: {
  //   ...mapState(["user"])
  // },
  components: {},
  mounted() {
    // this.drawLineChart();
    this.getuser();
    this.getbasedata();
    this.getprofitTrend();
    this.getarticleLists();
    // this.userinfos.username = this.user.username;
    // this.userinfos.id = this.user.id;
    if (!localStorage.Second_Confirm) {
      api.getsecurity().then(res => {
        const data = res.data;
        if (data.result === 1) {
          localStorage.Second_Confirm = parseInt(data.data.second_confirm);
        } else {
          localStorage.Second_Confirm = 1;
        }
      });
    }
  }
};
