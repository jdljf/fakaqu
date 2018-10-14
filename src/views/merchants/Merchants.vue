<template>
    <div id="Merchants">
     <el-card>
       <div slot="header" class="clearfix">
        <span>商家百科</span>
        </div>
       <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top:30px"
      >
      <el-table-column
        prop="merchanttitle"
        label="标题"
        align="center"
        >
         <template slot-scope="scope">
        <el-button type="text" size="small" @click="gotobaidu" >{{scope.row.merchanttitle}}</el-button>
    </template>
      </el-table-column>
      <el-table-column
        prop="merchanttime"
        label="时间"
        align="center"
       >
      </el-table-column>
      
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
     </el-card>  
    </div>
</template>
<script>
import api from "@/axios/api";

export default {
  data() {
    return {
    
      tableData: [],
      multipleSelection: [],
      total: 0,
      pagesize: 10,
      currentPage: 1
    };
  },
  
  methods: {
    // getdata() {
    //   this.$http({
    //     method: "GET",
    //     url: "http://127.0.0.1:8080/api/users"
    //   })
    //     .then(res => {
    //       console.log(res);
    //       if (!res.data.errno) {
    //         this.tableData = res.data.data.users;
    //         this.total = res.data.totalnum;
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
      getTableData() {
      api.getwikipedia().then(res => {
        const data = res.data;
        if (data.code === 1) {
          const Obj = { merchanttitle: "如何更改绑定的手机号，证件号和邮箱？", merchanttime: "2018-10-11", sort: "100" };
          for (let i = 1; i < 2; i++) {
            const newObj = Object.assign({}, Obj, { id: i });
            this.tableData.push(newObj);
          }
        }
      });
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    
    gotobaidu(){
        window.location.href='https://www.baidu.com'
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
#Merchants{
    .clearfix{
        font-weight: bold;
    }
    .titles{
        color: red;
    }
}
</style>

