<template>
    <div id="Sitemessage">
     <el-card>
    <div slot="header" class="clearfix">
        <span>{{$t('sitmessage.title')}}</span>
    </div>
    <el-tabs  v-model="activeName" @tab-click="handleClick">
    <el-tab-pane data-name="all" :label="$t('sitmessage.all')" name="first">
      <el-table
      v-loading="listLoading"
      ref="SitemessageData"
      border
      :data="SitemessageData"
      tooltip-effect="dark"
      style="width: 100%;margin-top:30px"
      class="Sitetable"
      >
      <el-table-column
        prop="data.title"
        align="center"
        :label="$t('sitmessage.title')"
      >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="toggleshows(scope.row)" >{{scope.row.data.title}}</el-button>
    </template>
      </el-table-column>
      <el-table-column
        prop="username"
        align="center"
        :label="$t('sitmessage.Recipient')"
        width="120">
        <template slot-scope="scope">
          <span  >{{username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
       :label="$t('sitmessage.time')"
        width="150">
      </el-table-column>

      <!-- <el-table-column  align="center" :label="$t('sitmessage.operating')" width="150" >
        <template slot-scope="scope">
          <el-button
            @click="Deleteinfowait($index,scope.row)"
            size="mini"
            type="primary">删除
          </el-button>

        </template>

      </el-table-column> -->
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
  <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
</el-pagination>
    </div>
    </el-tab-pane>
    <el-tab-pane data-name="aredy" :label="$t('sitmessage.Haveread')" name="second">
        <el-table
      ref="multipleTable"
      border
      :data="multipleSelection"
      tooltip-effect="dark"
      style="width: 100%;margin-top:30px"
      class="Sitetable"

      >
      <el-table-column
        prop="data.title"
        align="center"
         :label="$t('sitmessage.title')"
      >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="toggleshows(scope.row)" >{{scope.row.data.title}}</el-button>
    </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
          :label="$t('sitmessage.Recipient')"
        width="120">
        <template slot-scope="scope">
          <span  >{{username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        align="center"
        :label="$t('sitmessage.time')"
        width="150">

      </el-table-column>

      <!-- <el-table-column   align="center" :label="$t('sitmessage.operating')" width="150" >
        <template slot-scope="scope">
          <el-button
            @click="Deleteinfowait($index,scope.row)"
            size="mini"
            type="primary">删除
          </el-button>

        </template>

      </el-table-column> -->
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
   </el-pagination>
    </div>
    </el-tab-pane>
    <el-tab-pane data-name="no" :label="$t('sitmessage.unread')" name="third" >
 <el-table
      v-loading="listLoading"
      ref="SitemessageData"
      border
      :data="unread"
      tooltip-effect="dark"
      style="width: 100%;margin-top:30px"
      class="Sitetable"
      >
      <el-table-column
        prop="data"
          align="center"
        :label="$t('sitmessage.title')"
      >
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="toggleshows(scope.row)" >{{scope.row.data.title}}</el-button>
    </template>
      </el-table-column>
      <el-table-column
        prop="username"
         :label="$t('sitmessage.Recipient')"
          align="center"
        width="120">
        <template slot-scope="scope">
          <span  >{{username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        :label="$t('sitmessage.time')"
          align="center"
        width="150">

      </el-table-column>
      <!-- <el-table-column :label="$t('sitmessage.operating')"  width="150">
        <template slot-scope="scope">
          <el-button
            @click="Deleteinfowait($index,scope.row)"
            size="mini"
            type="primary">删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
  <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
</el-pagination>
    </div>
    </el-tab-pane>
  </el-tabs>
     </el-card>
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
</template>
<script>
import api from "@/axios/api";
import _ from "lodash";
export default {
  data() {
    return {
      infotext: {},
      username: "",
      page: 1,
      listLoading: false,
      activeName: "first",
      SitemessageData: [],
      multipleSelection: [],
      unread: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
      sendform: {
        Siteperson: "管理员",
        Sitetitle: "",
        Sitecontext: "",
        Sitetime: ""
      },
      toggleshow: false,
      type: 1
    };
  },
  methods: {
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
  components: {}
};
</script>
<style>
ul {
  color: #000 !important;
}
</style>


<style lang="scss" scoped>
#Sitemessage {
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
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    margin: auto;
    width: 600px;
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
