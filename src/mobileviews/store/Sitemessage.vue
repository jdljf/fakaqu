<template>
<div>
    <div class="Sitemessage">
         <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()"   >{{sitetitle}}</x-header>
     <div>
    <el-tabs  v-model="activeName" @tab-click="handleClick">
    <el-tab-pane data-name="all" label="全部" name="first">

        <div class="message" v-for="item in SitemessageData" :key="item.id">
                <div class="loglist" >
                    <div>{{item.data.title}}<span style="float:right;color:#3A9BDB" @click="toggleshows(item)">查看</span></div>
                    <div>收件人:<span >{{username}}</span></div>
                    <div>时间:<span>{{item.created_at}}</span></div>
                </div>
            </div>
    <div style="text-align: center;padding-bottom: 30px;">
  <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
</el-pagination>
    </div>
    </el-tab-pane>
    <el-tab-pane data-name="aredy" label="已读" name="second">
    <div class="message" v-for="item in multipleSelection" :key="item.id">
                <div class="loglist" >
                   <div>{{item.data.title}}<span style="float:right;color:#3A9BDB" @click="toggleshows(item)">查看</span></div>
                    <div>收件人:<span >{{username}}</span></div>
                    <div>时间:<span>{{item.created_at}}</span></div>
                </div>
            </div>
    <div style="text-align: center;padding-bottom: 30px;">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
   </el-pagination>
    </div>
    </el-tab-pane>
    <el-tab-pane data-name="no" label="未读" name="third" >

     <div class="message" v-for="item in unread" :key="item.id">
                <div class="loglist" >
                    <div>{{item.data.title}}<span style="float:right;color:#3A9BDB" @click="toggleshows(item)">查看</span></div>
                    <div>收件人:<span >{{username}}</span></div>
                    <div>时间:<span>{{item.created_at}}</span></div>
                </div>
            </div>
    <div style="text-align: center;padding-bottom: 30px;">
  <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
</el-pagination>
    </div>
    </el-tab-pane>
  </el-tabs>
     </div>
      <el-card class="togglecard" v-if="toggleshow">
        <div slot="header" class="clearfix">
        <span>{{infotext.data.title}}</span>
        <i  class="el-icon-circle-close close-tog"  @click="closetog" style="float:right;cursor:pointer"/>
       </div>
       <div class="toggle-text">
         {{infotext.data.content}}
       </div>
       <div class="toggle-time">{{infotext.created_at}}</div>
      </el-card>
       <div class='popContainer' v-if="toggleshow"></div>

    </div>
      <TabBar></TabBar>
</div>
</template>
<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
import TabBar from "@/components/mobile/TabBar";
import _ from "lodash";
export default {
  data() {
    return {
      sitetitle: "站内消息",
      infotext: {},
      username: "",
      page: 1,
      type: 1,
      listLoading: false,
      activeName: "first",
      SitemessageData: [],
      multipleSelection: [],
      unread: [],
      total: 0,
      sendform: {
        Siteperson: "管理员",
        Sitetitle: "",
        Sitecontext: "",
        Sitetime: ""
      },
      toggleshow: false
    };
  },
  methods: {
    bannerBack() {
      this.$router.push({
        name: "Users"
      });
    },
    handleClick(tab, event) {
      var val = tab.index;
      if (val == 0) {
        this.type = 1;
        const data = {
          params: { type: this.type }
        };
        this.getnoticeLists(data);
      } else if (val == 1) {
        this.type = 2;
        const data = {
          params: { type: this.type }
        };
        this.getnoticeLists(data);
      } else if (val == 2) {
        this.type = 3;
        const data = {
          params: { type: this.type }
        };
        this.getnoticeLists(data);
      }
    },
    edittypenotice(row) {
      const data = {
        params: { id: row }
      };
      api.edittypenotice(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
        }
      });
    },
    getnoticeLists(data) {
      this.listLoading = true;
      api.getnoticeLists(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          if (this.type == 1) {
            this.SitemessageData = data.data;
            this.total = data.total;
          } else if (this.type == 2) {
            this.multipleSelection = data.data;
            this.total = data.total;
          } else if (this.type == 3) {
            this.unread = data.data;
            this.total = data.total;
          }
          this.listLoading = false;
        } else {
          this.listLoading = false;
        }
      });
    },

    handleCurrentChange(val) {
      this.page = val;
      const data = {
        params: { type: this.type, page: val }
      };
      this.getnoticeLists(data);
    },

    // 删除收到
    Deleteinfowait(index, row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
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
            api.deleteMessages({ delid: row.id }).then(res => {
              const data = res.data;
              if (data.code === 1) {
                const localNumber = _.findIndex(this.SitemessageData, o => {
                  return o.id === row.id;
                });
                this.SitemessageData.splice(localNumber, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
          }
        }
      });
    },
    // 新增信息
    closetog(e) {
      this.toggleshow = false;
    },
    toggleshows(e) {
      this.infotext = e;
      this.edittypenotice(e.id);
      this.toggleshow = true;
    }
  },

  mounted() {
    const data = {
      params: { type: 1, page: this.page }
    };
    this.getnoticeLists(data);
    var userinfo = JSON.parse(localStorage.getItem("userinfos"));
    this.username = userinfo.username;
    // this.toggle.time = new Date().toLocaleString();
  },
  components: {
    MbHeader,
    XHeader,
    TabBar,
    LoadMore
  }
};
</script>
<style lang='css'>
.el-message{
  min-width: 90% !important;
}
.el-pagination{
  padding-bottom: 50px;
}
  .el-message-box{
    width: 90% !important;
  }
  ul{
       color: #000 !important;
   }
     .el-tabs__header{
    position: relative;
    margin: 0;
    padding-left: .2rem;
    padding-right: .2rem;

}
.el-tabs__nav{
  width: 100%;
  display: flex;
}
.el-tabs__item{
  flex: 1;
  text-align: center;
}
</style>


<style lang="scss" scoped>
.Sitemessage {
  .message {
    font-size: 0.24rem;
    margin-top: 2px;
    color: #747474;
    .loglist:nth-child(1) {
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
  .el-pagination {
    .el-pager {
      .number {
        color: #000;
      }
    }
  }
  .clearfix {
    font-weight: bold;
  }
  .Sitetable {
    .user {
    }
  }
  .togglecard {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 90%;
    height: 400px;
    z-index: 10;
    background-color: #f8f8f8;
    .toggle-text {
      line-height: 30px;
    }
    .toggle-time {
      float: right;
      margin-top: 20px;
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
}
</style>
