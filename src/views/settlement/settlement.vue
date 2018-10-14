<template>
    <div id="settlement">
        <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{$t('settlement.title')}}</span>
  </div>
   <el-col style="width:100%;margin-bottom:20px;" :span="8">
    <el-card  style="color:#56A5FC" shadow="always">
      {{$t('settlement.text')}}
    </el-card>
  </el-col>
 <el-table
 align="center"
      v-loading="listLoadingall"
      :data="settlementtable"
      style="width: 100%">
      <el-table-column
       align="center"
        prop="no"
        :label="$t('settlement.settable.Runningnumber')"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="money"
        :label="$t('settlement.settable.ApplicationAmount')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fee"
        align="center"
        :label="$t('settlement.settable.Handlingfee')"
      >
      </el-table-column>
      <el-table-column
        prop="true_money"
        align="center"
        :label="$t('settlement.settable.Amountofarrival')">
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        :label="$t('settlement.settable.Settlementmethod')">
         <template slot-scope="scope">
         <span style="color:#82D44A" v-if="scope.row.type===0">{{$t('settlement.settable.automatic')}}</span>
         <span style="color:#DB4E45" v-else>{{$t('settlement.settable.Manual')}}</span>
        </template>
      </el-table-column>
      <el-table-column
      align="center"
        prop="created_at"
        :label="$t('settlement.settable.Cashwithdrawaltime')">
      </el-table-column>
       <el-table-column
        prop="status"
        align="center"
        :label="$t('settlement.settable.Processingstatus')">
        <template slot-scope="scope">
         <span style="color:#82D44A" v-if="scope.row.status===1">{{$t('settlement.settable.Settlement')}}</span>
         <span style="color:#82D44A" v-if="scope.row.status===2">{{$t('settlement.settable.return')}}</span>
         <span style="color:#DB4E45" v-else>{{$t('settlement.settable.noSettlement')}}</span>
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
        listLoadingall:true,
         total:0,
         page:1,
        settlementtable:[],
       
      }

    },
   components: {  // vueschart  getsettlement
      },
	mounted() {
    this.getsettlement();
	},

methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getsettlement();
    },
    getsettlement() {
      let para = {
        page: this.page
      };
      this.listLoadingall = true;
      api
        .getsettlement({
          params: {
            page: this.page
          }
        })
        .then(res => {
          const data = res.data;
          if (data.total > 0) {
            this.settlementtable = data.data;
            this.total = data.total;
            log("total", this.total);
            this.listLoadingall = false;
          } else {
            this.listLoadingall = false;
          }
        });
    },
  
  },
	activated(){

	}
}
</script>
<style lang="scss">
#settlement{
    padding: 20px;
    .el-table{
  //  text-align: center;
    
}
.el-pager{
      color: #000;
    }
    }

</style>
