<template>
    <div id="SellRecently">
        <div class="listLoadingall" v-loading="listLoadingall"></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$t('kami.title')}}</span>
            </div>
            <div class="searchform">
                <el-form ref="recentform" :model="recentform" label-width="80px">
                    <el-form-item>
                        <el-select v-model="recentform.category_id" :placeholder="$t('kami.plaseone')" size="medium" @change="getCurChange">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="recentform.kw_type" :placeholder="$t('kami.plaseone')">
                            <el-option label="订单号" value="1"></el-option>
                            <el-option label="联系方式" value="2"></el-option>
                            <el-option label="商品名称" value="3"></el-option>
                            <el-option label="商品卡号" value="4"></el-option>
                        </el-select>
                        <el-input v-model="recentform.kw" style="width:20%;" :placeholder="$t('kami.plaseorder')"> </el-input>
                        <el-button type="primary" @click="searchrecent" icon="el-icon-search">{{$t('kami.search')}}</el-button>
                        <el-button type="warning" @click="resetrecent">{{$t('kami.reset')}}</el-button>

                    </el-form-item>

                </el-form>

                <el-card class="togglecard" v-if="toggleshow">
                    <div slot="header" class="clearfix">
                        <span>{{$t('kami.searchkami')}}</span>
                        <i class="el-icon-circle-close close-tog" @click="closetog" style="float:right;cursor:pointer" />
                    </div>
                    <!-- <div class="toggle-text">
                        {{$t('kami.card')}}：
                    </div> -->
                    <div v-for="(items,index) in link_code" :key="items" class="kami-show" >
                        <div class="toggle-time">
                          卡密{{index+1}}：
                            <span class="a-lik" :href="items">{{items}}</span>
                        </div>
                        <button @click="clonelink" class="clone-link" :data-clipboard-text="items">
                            {{$t('kami.clonecard')}}
                        </button>
                    </div>
                </el-card>
                <div class='popContainer' v-if="toggleshow"></div>
            </div>
            <el-table border :data="tableData" style="width: 100%">
                <el-table-column align="center" prop="paid_at" :label="$t('kami.orderdate')" width="180">
                </el-table-column>
                <el-table-column align="center" prop="no" :label="$t('kami.orderno')" width="200">
                </el-table-column>
                <el-table-column align="center" prop="items.title" :label="$t('kami.goodsname')">
                </el-table-column>
                <el-table-column align="center" prop="kami_info" :label="$t('kami.kamiinfo')">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="toggleshows(scope.row.kami_info.content)">{{$t('kami.searchcode')}}({{scope.row.kami_info.count}}）</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="payment_method" :label="$t('kami.paymethod')">
                </el-table-column>
                <el-table-column align="center" prop="credence" :label="$t('kami.persons')">
                </el-table-column>
                <el-table-column prop="order_amount" align="center" :label="$t('kami.money')">
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="color:#000;float:right;">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import api from "@/axios/api";
import Clipboard from "clipboard";
import _ from "lodash";

export default {
  data() {
    return {
      link_code: [],
      toggleshow: false,
      value: "",
      selectedId: 0,
      options: [],
      listLoadingall: false,
      total: 0,
      page: 1,
      recentform: {
        category_id: -1,
        paid_at: "",
        kw_type: "",
        kw: ""
      },
      paid_at: "",
      no: "",
      tableData: [],
      content: "",
      title: "",
      good_items_content: "",
      good_items_id: "",
      amount: "",
      currentPage1: 5
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const queryId = newValue.query.category_id;
        const kw = newValue.query.kw;
        const kw_type = newValue.query.kw_type;
        this.recentform.category_id = Number(queryId);
        this.recentform.kw_type = kw_type;
        if (
          queryId !== undefined ||
          kw !== undefined ||
          kw_type !== undefined
        ) {
          const data = {
            params: {
              category_id: Number(queryId),
              kw: kw,
              kw_type: kw_type
            }
          };
          this.recentform.kw = kw;
          this.getrecent(data);
        }
      },
      immediate: true
    }
  },
  methods: {
    resetrecent() {
      this.$router.push({ name: "Sellecently" });
      this.recentform.kw = "";
      this.recentform.category_id = "";
      this.recentform.kw_type = "";

      this.getrecent();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getrecent({ params: { page: val } });
    },
    getCurChange(change) {
      this.selectedId = change;
    },
    searchrecent() {
      const nameKey = _.trim(this.recentform.kw);
      const newQuery = {
        category_id: this.recentform.category_id || this.selectedId,
        kw: nameKey,
        kw_type: this.recentform.kw_type
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    },
    getrecent(data) {
      this.listLoadingall = true;
      api.getrecent(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          // log(data.data);
          this.tableData = data.data;
          this.total = data.total;
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
        }
      });
    },
    clonelink() {
      this.$message({
        message: "链接复制成功",
        type: "success",
        duration: 3000
      });
    },
    closetog(e) {
      this.toggleshow = false;
    },
    toggleshows(value) {
      this.link_code = value;
      this.toggleshow = true;
    },
    getSelectData() {
      api.getAllSort().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.options = data.data;
          // log(data.data);
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
    const clipboard = new Clipboard(".clone-link");
    const query = this.$route.query;
    if (!Object.keys(query).length > 0) {
      this.getrecent();
    }
    this.getSelectData();
  }
};
</script>
<style lang="scss">
ul {
  color: #000 !important;
}
@keyframes selltrans {
  0% {
    opacity: 0.1;
  }

  100% {
    opacity: 1;
  }
}
#SellRecently {
  animation: selltrans 1s;
  .popContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
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
    overflow-y: scroll;
    z-index: 10;
    background-color: #f8f8f8;
    .toggle-text {
      display: inline-block;
      line-height: 30px;
    }
    .toggle-time {
      display: inline-block;
    }
    .clone-link {
      margin-top: 5px;
      padding: 4px 6px;
      margin-left: 10px;
      border: none;
      background: #188cf8;
      cursor: pointer;
      border-radius: 3px;
      color: #fff;
    }
  }
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
      .el-select {
        margin-right: 5px;
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
