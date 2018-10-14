<template>
  <div id="orderrecord">
    <div class="listLoadingall" v-loading="listLoadingall"></div>

      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{$t('orderecord.title')}}</span>
  </div>
  <div class="searchform">
  <el-form ref="orderform" :model="orderform" label-width="80px">
  <el-form-item >
       <el-col :span="4">
      <el-date-picker type="date" :placeholder="$t('orderecord.dateplace')" value-format="yyyy-MM-dd"     v-model="orderform.begin_time" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col :span="4">
      <el-date-picker type="date" :placeholder="$t('orderecord.dateplace')"  value-format="yyyy-MM-dd"    v-model="orderform.end_time" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-select v-model="orderform.status" :placeholder="$t('orderecord.place')" >
      <el-option :label="$t('orderecord.selects')" value=""></el-option>
      <el-option :label="$t('orderecord.Already')" value="1"></el-option>
      <el-option :label="$t('orderecord.Unpaid')" value="2"></el-option>

    </el-select>
    <el-select v-model="orderform.kw_type"  :placeholder="$t('orderecord.place')" >
      <el-option :label="$t('orderecord.selectorder')"  value="1"></el-option>
      <el-option :label="$t('orderecord.selectphone')" value="2"></el-option>
      <el-option :label="$t('orderecord.selectgoods')" value="3"></el-option>
      <el-option :label="$t('orderecord.selectcard')" value="4"></el-option>
    </el-select>
    <el-input v-model="orderform.kw" style="width:20%;" :placeholder="$t('orderecord.inpsearch')"> </el-input>
    <div style="margin-top:20px">
    <el-button type="primary" @click="searchorderlist"  icon="el-icon-search">{{$t('orderecord.search')}}</el-button>
    <el-button type="warning" @click="resetorderlist" >{{$t('orderecord.reset')}}</el-button>
    </div>
  </el-form-item>

  </el-form>
  </div>
 <el-table
      border
      :data="tableorder"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="created_at"
        :label="$t('orderecord.orderdate')"
        width="180">
      <template slot-scope="{row,$index}">
           <span >{{row.created_at}}</span>
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="no"
        :label="$t('orderecord.orderno')"
        width="200">
          <template slot-scope="{row,$index}">
           <span >{{row.no}}</span>
         </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="items.title"
        :label="$t('orderecord.goodsname')"
      >
        <template slot-scope="{row,$index}">
           <span >{{row.items.title}}</span>
         </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('orderecord.paymethod')"

        prop="payment_method"
        >
         <template slot-scope="{row,$index}">
           <span >{{row.payment_method}}</span>
         </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="total_amount"
        :label="$t('orderecord.money')"
       >
           <template slot-scope="{row,$index}">
           <span >{{row.total_amount}}</span>
         </template>
      </el-table-column>
      <el-table-column
        prop="credence"
        align="center"
        :label="$t('orderecord.persons')">
          <template slot-scope="{row,$index}">
           <span >{{row.credence}}</span>
         </template>
      </el-table-column>
       <el-table-column
        align="center"
        prop="paid_at"
         :label="$t('orderecord.status')">
          <template slot-scope="scope">
         <el-button style="color:skyblue" type="text" size="small" v-if="scope.row.paid_at!=null">{{$t('orderecord.statusraleredy')}}</el-button>
         <el-button style="color:#F55A53" type="text" size="small" v-else>{{$t('orderecord.nostatus')}}</el-button>
    </template>
      </el-table-column>
    </el-table>
<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;color:#000">
</el-pagination>
</el-card>
   </div>
</template>
<script>
import api from "@/axios/api";
import _ from "lodash";
export default {
  data() {
    return {
      paid_at: "",
      listLoadingall: false,
      total: 0,
      page: 1,
      tableorder: [],
      keyform: {},
      orderform: {
        status: "",
        begin_time: "",
        end_time: "",
        kw_type: "",
        kw: ""
      },
      currentPage1: 5
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const status = newValue.query.status;
        const kw = newValue.query.kw;
        const kw_type = newValue.query.kw_type;
        const end_time = newValue.query.end_time;
        const begin_time = newValue.query.begin_time;
        if (
          status !== undefined ||
          kw !== undefined ||
          kw_type !== undefined ||
          end_time !== undefined ||
          begin_time !== undefined
        ) {
          const data = {
            params: {
              begin_time: begin_time,
              end_time: end_time,
              kw_type: kw_type,
              kw: kw,
              status: status
            }
          };
          this.orderform.kw = kw;
          this.getorderlist(data);
        }
      },
      immediate: true
    }
  },
  methods: {
    resetorderlist() {
      this.$router.push({ name: "Orderrecord" });
      this.orderform.kw = "";
      this.orderform.status = "";
      this.orderform.begin_time = "";
      this.orderform.end_time = "";
      this.orderform.end_time = "";
      this.getorderlist();
    },
    searchorderlist() {
      const nameKey = _.trim(this.orderform.kw);
      const newQuery = {
        kw: nameKey,
        kw_type: this.orderform.kw_type,
        status: this.orderform.status,
        begin_time: this.orderform.begin_time,
        end_time: this.orderform.end_time
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getorderlist({ params: { page: val } });
    },
    getorderlist(data) {
      this.listLoadingall = true;
      api.getorderlist(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          this.tableorder = data.data;
          this.total = data.total;
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
        }
      });
    }
  },
  mounted() {
    this.getorderlist();
  }
};
</script>
<style lang="scss">
ul {
  color: #000 !important;
}
@keyframes ordertrans {
  0% {
    opacity: 0.1;
  }

  100% {
    opacity: 1;
  }
}
#orderrecord {
  animation: ordertrans 1s;
  .listLoadingall {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 5;
  }
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
}
</style>
