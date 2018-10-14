<template>
    <div>
    <div id="Log">
    <div class="listLoadingall" v-loading="listLoadingall"></div>

          <el-card>  
               <div slot="header" class="clearfix">
               <span>{{$t('log.title')}}</span>
               </div>
            <el-card class="Log-card">
                 {{$t('log.all')}}
            </el-card> 

            <el-table
      ref="multipleTable"
      border
      :data="logtable"
      tooltip-effect="dark"
      style="margin-top:30px"
      >
      <el-table-column
        prop="id"
        :label="$t('log.Merchantnumber')"
        width="150px"
        align="center"
       >
      </el-table-column>
      <el-table-column
        prop=""
        :label="$t('log.BusinessName')"        
        align="center"
        width="150px"
        >
       <template slot-scope="scope">
        <el-button style="color:#606266" type="text" size="small" >{{userinfo.username}}</el-button>
    </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        align="center"
        :label="$t('log.Logindate')"        
       >
      </el-table-column>
      <el-table-column
        prop="ip"
        align="center"
        :label="$t('log.Loginip')"
        
        >
         <template slot-scope="scope">
        <el-button type="text" size="small" @click="gotoIP(scope.row.ip)" >{{scope.row.ip}}</el-button>
    </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
 <el-pagination  layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
</el-pagination>
    </div>
       </el-card>
        </div>
    </div>

</template>
<script>
import api from "@/axios/api";
export default {
  data() {
    return {
      userinfo: {},
      listLoadingall: false,
      logtable: [],
      multipleSelection: [],
      total: 0,
      page: 1
    };
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
            log("total", this.total);
            this.listLoadingall = false;
          } else {
            this.listLoadingall = false;
          }
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
 #Log  ul{
  color: #000 !important;
}
</style>

<style lang="scss" scoped>

#Log {
  .listLoadingall {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 5;
  }
  .clearfix {
    font-weight: bold;
  }
  .Log-card {
    color: #fff;
    background-color: #77b4f9;
  }
}
</style>
