<template>
    <div id="Complaint">
     <el-card>
     <div slot="header" class="clearfix">
        <span>{{$t('Complaint.title')}}</span>
     </div>
      <el-card class="Complaint-card">
         {{$t('Complaint.text')}}
      </el-card>
      <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
      <el-table
      border
      :data="complainLists"
      align="center"
      style="width: 100%;margin-top:30px"
      >
      <el-table-column
        prop="no"
        :label="$t('Complaint.no')"
        align="center"
        width="160">
      </el-table-column>
      <el-table-column
        prop="reason_type"
       :label="$t('Complaint.reason_type')"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="reason"
         :label="$t('Complaint.reason')"
        align="center"
        width="300">
      </el-table-column>
      <el-table-column
        prop="qq"
         :label="$t('Complaint.qq')"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created_at"
        :label="$t('Complaint.creat_at')"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        prop="data"
         :label="$t('Complaint.status')"
        align="center"
        width="120">
      <template slot-scope="scope">
      <button style="border:none;background:transparent;color:#DB2321"  v-if="scope.row.status===0">未解决</button>
      <button style="border:none;background:transparent;color:#8DDC58" v-else>已解决</button>

      </template>
      </el-table-column>
      <el-table-column  :label="$t('Complaint.detail')"  align="center" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handledetail(scope.row.id)">{{$t('Complaint.detail')}}
          </el-button>
        </template>

      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
   <el-pagination  layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
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
      complainLists: [],
      total: 0,
      page:1,
    };
  },
  methods: {
     getcomplainLists(){
      api.getcomplainLists({params: {
            page: this.page
          }}).then(res => {
        const data = res.data;
        if (data.data.length>0) {
            this.total=data.total;
            this.complainLists=data.data;
            // log('complainLists',this.complainLists);
        }
      });
     },
    handleCurrentChange(val) {
      this.page = val;
      this.getcomplainLists();
    },
    handledetail(no){
    var id=JSON.stringify(no);
     this.$router.push({path:'/shop/Complaintsdetail',query:{id:id}})
    }
  },
  mounted() {
    this.getcomplainLists();
  }
};
</script>


<style lang="scss" scoped>
#Complaint {
  .clearfix {
    font-weight: bold;
  }
  .Complaint-card {
    color: #fff;
    background-color: #77b4f9;
  }
  .complainttable {
    margin-top: 30px;
  }
}
</style>
