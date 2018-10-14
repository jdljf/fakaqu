<template>
   <div id="Income">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>{{$t('Income.title')}}</span>
  </div>
  <div class="searchform">
  <el-form ref="incomeform" :model="incomeform" label-width="80px">
  <el-form-item >
       <el-col :span="4">
      <el-date-picker type="date" value-format="yyyy-MM-dd" :placeholder="$t('Income.plasedate')" v-model="incomeform.begin_time"   style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col :span="4">
      <el-date-picker type="date" value-format="yyyy-MM-dd" :placeholder="$t('Income.plasedate')" v-model="incomeform.end_time" style="width: 100%;"></el-date-picker>
    </el-col>
   <el-select v-model="incomeform.category_id" :placeholder="$t('Income.select')" size="medium">
       <el-option
           v-for="item in options"
           :key="item.id"
           :label="item.name"
           :value="item.id">
       </el-option>
   </el-select>
    <el-button type="primary" @click="searincome" icon="el-icon-search">{{$t('Income.search')}}</el-button>
    <el-button type="warning" @click="resetincome" >{{$t('Income.reset')}}</el-button>

  </el-form-item>
  </el-form>
  </div>
  <div class="incomenum">
     <ul>
         <li class="incomenumli"  >
         <span class="ic-li">
             <h1>{{$t('Income.toatlsell')}}</h1>
         </span>
         <span class="ic-lir">
             <span class="ic-num">{{total_sell}}</span>({{$t('Income.sellz')}})
         </span>
         <div class="ic-bottom">{{$t('Income.toatlsell')}}</div>
         </li>
             <li class="incomenumli"  >
         <span class="ic-li">
             <h1>{{$t('Income.total_origin_amount')}}</h1>
         </span>
         <span class="ic-lir">
             <span class="ic-num">{{total_origin_amount}}</span>({{$t('Income.selly')}})
         </span>
         <div class="ic-bottom">{{$t('Income.origin_amount_text')}}</div>
         </li>
             <li class="incomenumli"  >
         <span class="ic-li">
             <h1>{{$t('Income.total_amount')}}</h1>
         </span>
         <span class="ic-lir">
             <span class="ic-num">{{total_amount}}</span>({{$t('Income.selly')}})
         </span>
         <div class="ic-bottom">{{$t('Income.total_amount_text')}}</div>
         </li>
             <li class="incomenumli"  >
         <span class="ic-li">
             <h1>{{$t('Income.total_profit')}}</h1>
         </span>
         <span class="ic-lir">
             <span class="ic-num">{{total_profit}}</span>({{$t('Income.selly')}})
         </span>
         <div class="ic-bottom">{{$t('Income.total_profit_text')}}</div>
         </li>
     </ul>
  </div>

 <el-table
      v-loading="listLoading"
      border
      :data="commitable"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="items.title"
        :label="$t('Income.transactionhour')"
        width="150">
      </el-table-column>
      <el-table-column
        prop="no"
        align="center"
        :label="$t('Income.ordernum')"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="items.number"
        :label="$t('Income.productname')"
        width="80"
       >
      </el-table-column>
      <el-table-column
        align="center"
        prop="items.cost_price"
        :label="$t('Income.Commoditycost')" width="80"   >
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        prop="items.goods_price"
        :label="$t('Income.money')">
      </el-table-column>
      <el-table-column
        align="center"
        prop="order_amount"
         :label="$t('Income.ordertotal')">
      </el-table-column>
       <el-table-column
        prop="profit"
        align="center"
        width="80"
        :label="$t('Income.pority')">
      </el-table-column>
       <el-table-column
        prop="payment_method"
        align="center"
        :label="$t('Income.paymentmethod')">
      </el-table-column>
       <el-table-column
        prop="created_at"
        align="center"
        :label="$t('Income.creat_time')">
      </el-table-column>
    </el-table>
   <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;color:#000">
</el-pagination>
</el-card>
   </div>
</template>
<script>
import api from "@/axios/api";
export default {
  data() {
    return {
      commitable: [],
      total_sell: "",
      total_origin_amount: "",
      total_amount: "",
      total_profit: "",
      options: [],
      selectedId: "",
      total: 0,
      page: 1,
      listLoading: false,
      incomeform: {
        category_id: "",
        begin_time: "",
        end_time: ""
      }
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const category_id = newValue.query.category_id;
        const begin_time = newValue.query.begin_time;
        const end_time = newValue.query.end_time;
        if (
          category_id !== undefined ||
          begin_time !== undefined ||
          end_time !== undefined
        ) {
          const data = {
            params: {
              category_id: category_id,
              begin_time: begin_time,
              end_time: end_time
            }
          };
          this.getIcomess(data);
        }
      },
      immediate: true
    }
  },
  methods: {
    getCurChange(change) {
      this.selectedId = change;
    },
    searincome() {
      const datas = {
        category_id: this.incomeform.category_id,
        begin_time: this.incomeform.begin_time,
        end_time: this.incomeform.end_time
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, datas)
      });
    },
    resetincome() {
      this.$router.push({ name: "Income" });
      this.incomeform.category_id = "";
      this.incomeform.begin_time = "";
      this.incomeform.end_time = "";
      this.getIcomess();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getIcomess({ params: { page: val } });
    },
    getAnalyDesc() {
      api.getAnalyDesc().then(res => {
        const data = res.data;
        if (data) {
          this.total_sell = data.data.total_sell;
          this.total_origin_amount = data.data.total_origin_amount;
          this.total_amount = data.data.total_amount;
          this.total_profit = data.data.total_profit;
        }
      });
    },
    getIcomess(data) {
      api.getIcomess(data).then(res => {
        const data = res.data;
        if (data.data && data.current_page >= 1) {
          this.commitable = data.data;
          this.total = data.total;
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
        }
      });
    },
    getSelectData() {
      api.getAllSort().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.options = data.data;
          const query = this.$route.query;
          if (Object.keys(query).length > 0) {
            const temp = this.options.filter(o => {
              return o.id === Number(query.category_id);
            });
            this.value = temp[0].name;
          }
        }
      });
    }
  },
  mounted() {
    this.getAnalyDesc();
    this.getIcomess();
    this.getSelectData();
  }
};
</script>
<style  lang="scss">
ul {
  color: #000 !important;
}
#Income {
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
  .incomenum {
    padding: 10px 0px 10px 0px;
    color: #000;
    .incomenumli {
      //   padding-right: 10px;
      height: 80px;
      background: #fff;
      float: left;
      margin-right: 20px;
      margin-bottom: 10px;
      color: #000;
      box-shadow: 1px 2px 3px 2px #f6f6f6;
      border: 1px solid #f7f7f7;

      h1 {
        font-family: "Weibei SC";
      }
      .ic-li {
        display: inline-block;
        padding: 16px;
        border-right: 1px dashed #ccc;
        margin: 7px;
      }
      .ic-lir {
        color: #ccc;
        padding-left: 5px;
        padding-right: 5px;
        font-family: "Wawati SC";
        .ic-num {
          font-size: 25px;
          color: #e42127;
          margin-right: 5px;
          font-weight: bold;
          padding-left: 10px;
          vertical-align: middle;
        }
      }
      .ic-bottom {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        text-align: center;
        background: #3e9fdd;
        font-family: "Hannotate SC";
        color: #fff;
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
