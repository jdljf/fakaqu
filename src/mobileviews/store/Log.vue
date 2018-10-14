<template>
    <div>
        <div class="log" style="margin-bottom: 2rem">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()"   ><span style="font-size: 0.32rem;">登录日志</span></x-header>
            <div class="card-head">
                <div>只保存显示30天的登录日志</div>
            </div>
            <div class="logarr" v-for="item in logtable" :key="item.id">
                <div class="loglist" >
                    <div >{{userinfo.username}}</div>
                    <div>登录时间:<span >{{item.created_at}}</span></div>
                    <div>商户编号:<span>{{item.id}}</span></div>
                    <div @click="gotoIP(item.ip)">IP地址:<span style="color:#56A4FC">{{item.ip}}</span></div>
                </div>
            </div>
            <div style="text-align: center;margin-bottom:50px;margin-top:10px">
                <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
                </el-pagination>
            </div>
        </div>
        <TabBar></TabBar>
    </div>
</template>
<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import TabBar from "@/components/mobile/TabBar";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
export default {
  data() {
    return {
      logtit: "登录日志",
      userinfo: {},
      listLoadingall: false,
      logtable: [],
      multipleSelection: [],
      total: 0,
      page: 1
    };
  },
  components: {
    MbHeader,
    XHeader,
    LoadMore,
    TabBar
  },
  mounted() {
    this.getlogs();
    this.userinfo = JSON.parse(localStorage.getItem("userinfos"));
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlogs();
    },
    getlogs() {
      let para = {
        page: this.page
      };
      this.listLoadingall = true;
      api
        .getlog({
          params: {
            page: this.page
          }
        })
        .then(res => {
          const data = res.data;
          if (data.total > 0) {
            this.logtable = data.data;
            this.total = data.total;

            this.listLoadingall = false;
          } else {
            this.listLoadingall = false;
          }
        });
    },
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    gotoIP(e) {
      window.open(
        "https://www.baidu.com/s?wd=" +
          e +
          "&rsv_spt=1&issp=1&rsv_bp=0&ie=utf-8&tn=baiduhome_pg"
      );
    }
  }
};
</script>
<style>
 ul {
  color: #000 !important;
}
.el-message{
  min-width: 90% !important;
}
</style>

<style lang="scss" scoped>
.log {
  .card-head {
    margin: 0.1rem;
    color: #157df4;
    line-height: 0.6rem;
    font-size: 0.24rem;
    padding-left: 0.1rem;
    border: 1px solid #e3e3e3;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 2px 1px #e3e3e3;
    margin-top: 0.2rem;
  }

  .logarr {
    font-size: 0.24rem;
    margin-top: 2px;
    color: #747474;
    .loglist:nth-child(1) {
      border-bottom: 1px solid #eee;
      padding: 0.3rem;
      border-top: 1px solid #eee;
    }
    .loglist {
      div {
        margin-top: 0.2rem;
        span {
          margin-left: 6px;
          color: #3c3c3c;
        }
      }
    }
  }
}
</style>
