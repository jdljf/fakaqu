<template>
    <div>
        <div v-show="passhow" class="mask"></div>
        <div v-show="passhow" class="pwdshows">
        <div style="text-align:right;width:100%;padding-bottom:10px;"><i @click="closepwd" class="el-icon-error"/></div>
      <el-form  :model="pwdform" ref="pwdform" label-width="100px" class="demo-ruleForm">
    <el-form-item
    label="安全密码"
    prop="password"
    :rules="[
      { required: true, message: '密码不能为空'}]">
    <el-input type="password" v-model="pwdform.password" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('pwdform')">提交</el-button>
  </el-form-item>
  </el-form>
      </div>
        <div class="px-kc-wrap">
            <div>
                <p class="px-kc-title">{{$t("stock.title")}}</p>
                <div style="padding: 20px">
                        <el-select v-model="value" :placeholder="$t('stock.select')" size="medium" @change="getOptionId">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.goods_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    <!--<div style="max-width: 220px;margin-top: 20px;">-->
                        <!--<el-input v-model="goods_name" placeholder="请输入商品名称查询"></el-input>-->
                    <!--</div>-->
                    <div style="display: inline-block;margin-left: 20px;">
                        <a href="javascript:;" @click="searchStock" class="product-search" style="margin-top: 20px;"><i class="el-icon-third-search" style="margin-right: 6px;"></i>{{$t("stock.btn1")}}</a>
                        <a href="javascript:;" @click="resetSearch" class="product-search" style="margin-top: 20px;margin-left: 20px">{{$t("stock.btn2")}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-pl-bottom">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="loading"
                    @selection-change="handleSelectionChange"
                    stripe
                    border
                    style="width: 100%;">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        :label="$t('col.a')"
                        width="200"
                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.good.goods_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="info"
                        :label="$t('col.b')"
                >
                    <template slot-scope="{row,$index}">
                        <span >{{row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        :label="$t('col.c')"
                        width="100"
                >
                    <template slot-scope="{row,$index}">
                        <span >{{row.good.market_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        :label="$t('col.d')"
                        width="200"
                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.created_at}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('col.e')"
                        width="100"
                >
                    <template slot-scope="{row,$index}">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handel($index, row)">{{$t('col.btn')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px;margin-left: 20px;">
                <el-button @click="batchdelall" type="danger" size="medium">{{$t('col.btn1')}}</el-button>
                <el-button @click="quitDelete" type="primary" size="medium">{{$t('col.btn2')}}</el-button>
            </div>
            <div class="pr-list-pagination">
                <el-pagination
                        @current-change="getPageNumber"
                        background
                        :page-size="20"
                        layout="total ,prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
export default {
  name: "Stock",
  data() {
    return {
      delall: 0,
      del: 0,
      delarow: {},
      indexs: 0,
      passhow: false,
      second_confirm: 0,
      pwdform: {
        password: ""
      },
      curPage: "1",
      total: 0,
      loading: true,
      goods_name: "",
      checkAll: false,
      value: "",
      selectedId: -1,
      tableData: [],
      options: [],
      multipleSelection: []
    };
  },
  created() {
    this.getOptionsData();
    this.second_confirm = parseInt(localStorage.getItem("Second_Confirm"));
  },
  watch: {
    $route: {
      handler(newValue) {
        if (Object.keys(newValue.query).length === 0) {
          this.getStockInfo();
        } else {
          this.getStockInfo({ params: { goods_id: newValue.query.id } });
        }
      },
      immediate: true
    }
  },
  methods: {
    resetSearch() {
      this.getStockInfo();
      this.$router.push({ name: "Secret" });
      this.value = "";
    },
    getPageNumber(pgnumber) {
      this.curPage = pgnumber;
      this.getStockInfo({ params: { page: pgnumber } });
    },
    quitDelete() {
      this.$refs.multipleTable.clearSelection();
    },
    batchdelall() {
      if (this.second_confirm === 1) {
        this.delall = 1;
        this.passhow = true;
      } else if (this.second_confirm === 0) {
        this.passhow = false;
        this.batchDelete();
      }
    },
    batchDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "info",
          message: `请选择要删除的卡密`
        });
        return;
      }
      const data = { ids: _.join(this.multipleSelection, ",") };

      this.$confirm(
        `确定删除选择${this.multipleSelection.length}张卡, 是否继续?`,
        "提示",
        {
          type: "warning",
          callback: action => {
            if (action === "cancel" || action === "close") {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            } else {
              api.batchDeleteCode(data).then(res => {
                const data = res.data;
                if (data.result === 1) {
                  this.delall = 0;
                  for (let i = 0; i < this.multipleSelection.length; i++) {
                    const localNumber = _.findIndex(this.tableData, o => {
                      return o.id === this.multipleSelection[i];
                    });
                    this.tableData.splice(localNumber, 1);
                  }
                  this.$message({
                    type: "success",
                    message: `${data.message}`
                  });
                }
              });
            }
          }
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(o => o.id);
    },
    handel(index, row) {
      if (this.second_confirm === 1) {
        this.del = 1;
        this.passhow = true;
        this.delarow = row;
        this.indexs = index;
      } else if (this.second_confirm === 0) {
        this.passhow = false;
        this.handleDeleteProduct(index, row);
      }
    },
    handleDeleteProduct($index, row) {
      this.$confirm("确定删除此卡, 是否继续?", "提示", {
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
            api.deleteCode({ id: row.id }).then(res => {
              const data = res.data;
              if (data.result === 1) {
                this.del = 0;
                const localNumber = _.findIndex(this.tableData, o => {
                  return o.id === row.id;
                });
                this.tableData.splice(localNumber, 1);
                this.$message({
                  type: "success",
                  message: `${data.message}`
                });
              }
            });
          }
        }
      });
    },
    getOptionId(change) {
      this.selectedId = change;
    },
    searchStock() {
      this.$router.push({
        path: "/product/secret",
        query: { id: this.selectedId }
      });
    },
    getStockInfo(data) {
      api.getStockCode(data).then(res => {
        const data = res.data;
        this.tableData = data.data;
        this.total = data.total;
        this.loading = false;
      });
    },
    getOptionsData() {
      api.getAllProduct().then(res => {
        const data = res.data;
        if (data && data.length >= 0) {
          this.options = data;
          const query = this.$route.query;
          if (Object.keys(query).length > 0) {
            const temp = this.options.filter(o => {
              return o.id === Number(query.id);
            });
            this.value = temp[0].goods_name;
          }
        }
      });
    },
    //安全密码确认
    getcheckConfirmCode(index, row) {
      let data = {
        password: this.pwdform.password
      };
      api.getcheckConfirmCode(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.passhow = false;
          this.pwdform.password = "";
          if (this.del === 1) {
            this.handleDeleteProduct(index, row);
          } else if (this.delall === 1) {
            this.batchDelete();
          }
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getcheckConfirmCode(this.indexs, this.delarow);
        } else {
          this.$message({
            message: "操作失败",
            type: "error",
            duration: 3000
          });
          return false;
        }
      });
    },
    closepwd() {
      this.del = 0;
      this.passhow = false;
      this.pwdform.password = "";
    }
  }
};
</script>

<style  lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
}
.pwdshows {
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  border-radius: 3px;
  position: fixed;
  z-index: 20;
  left: 0;
  right: 0;
  top: 10px;
  bottom: 0;
  margin: auto;
  width: 50%;
  height: 140px;
}
.px-kc-wrap {
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .px-kc-title {
    background: #fff;
    border-bottom: 1px solid #ebeef5;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  .product-search {
    color: #fff;
    background: #409eff;
    font-size: 16px;
    border: 1px solid #fff;
    display: inline-block;
    width: 110px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
  }
}
.px-pl-bottom {
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .el-table .cell,
  .el-table th div,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    text-align: center;
    padding: 0;
  }
  .el-table__body-wrapper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
  }
}
.pr-list-pagination {
  height: 50px;
  width: 100%;
  .el-pagination {
    padding: 10px 0 10px 70%;
  }
}
</style>
