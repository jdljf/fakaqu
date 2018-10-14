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
        <div class="px-ct-wrap">
            <div>
                <p class="px-ct-title">{{$t('trash.title')}}</p>
                <div style="padding: 20px">
                        <el-select v-model="value" :placeholder="$t('trash.select')" size="medium" @change="getOptionId">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    <!--<div style="max-width: 220px;margin-top: 20px;">-->
                        <!--<el-input v-model="goods_name" placeholder="请输入商品名称查询"></el-input>-->
                    <!--</div>-->
                    <div style="display: inline-block;margin-left: 20px;">
                        <a href="javascript:;" @click="searchStock" class="product-search" style="margin-top: 20px;">{{$t('trash.btn')}}</a>
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
                        :label="$t('trash.a')"
                        width="200"

                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.good.goods_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="info"
                        :label="$t('trash.b')"
                >
                    <template slot-scope="{row,$index}">
                        <span >{{row.content}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        :label="$t('trash.c')"
                        width="150"
                >
                    <template slot-scope="{row,$index}">
                        <span >{{row.good.market_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        :label="$t('trash.d')"
                        width="200"
                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.created_at}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('trash.e')"
                        width="200"
                >
                    <template slot-scope="{row,$index}">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handel($index, row)">{{$t('trash.btn1')}}</el-button>
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleRestoreProduct($index, row)">{{$t('trash.btn2')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pr-list-notice">
                <i class="el-icon-third-natice"></i>
                {{$t('trash.notice')}}
            </div>
            <div style="margin-top: 20px;margin-left: 30px;">
                <el-button @click="batchDelall" type="danger" size="medium">{{$t('trash.btn3')}}</el-button>
                <el-button @click="batchRestore" type="success" size="medium">{{$t('trash.btn4')}}</el-button>
                <el-button @click="quitDelete" type="primary" size="medium">{{$t('trash.btn5')}}</el-button>
                <el-button @click="emptyalls" type="danger" size="medium">{{$t('trash.btn6')}}</el-button>
            </div>
            <div class="pr-list-pagination">
                <el-pagination
                        @current-change="getPageNumber"
                        background
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
  name: "CodeTrash",
  data() {
    return {
      delall: 0,
      emptyall: 0,
      edits: 0,
      del: 0,
      delarow: {},
      ids: "",
      indexs: 0,
      passhow: false,
      second_confirm: 0,
      pwdform: {
        password: ""
      },
      total: 0,
      selectedId: 0,
      value: "",
      goodname: "",
      loading: true,
      tableData: [],
      options: [],
      checkOptions: []
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const queryId = newValue.query.goods_id;
        // const queryName = newValue.query.goods_name;
        if (queryId !== undefined) {
          const data = {
            params: { goods_id: queryId }
          };
          // this.goods_name = queryName;
          this.getTrashCode(data);
        }
      },
      immediate: true
    }
  },
  created() {
    this.second_confirm = parseInt(localStorage.getItem("Second_Confirm"));
    this.getSelectData();
    const query = this.$route.query;
    if (Object.keys(query).length > 0) {
      return;
    }
    this.getTrashCode();
  },
  computed: {
    sortCount() {
      return this.tableData.length;
    }
  },
  methods: {
    getPageNumber(num) {
      this.getTrashCode({ params: { page: num } });
    },
    getOptionId(change) {
      this.selectedId = change;
    },
    searchStock() {
      const newQuery = {
        goods_id: this.selectedId
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
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
              return o.id === Number(query.goods_id);
            });
            this.value = temp[0].name;
          }
        }
      });
    },
    emptyalls() {
      if (this.second_confirm === 1) {
        this.emptyall = 1;
        this.passhow = true;
      } else {
        this.passhow = false;
        this.emptyTrash();
      }
    },
    emptyTrash() {
      if (this.tableData.length === 0) {
        this.$message({
          type: "info",
          message: `没有数据你想清空什么呢`
        });
        return;
      }
      const type = "清空";
      const info = `确定彻底删除所有卡密，删除后不可恢复`;
      const operate = () => {
        api.batchEmptyTrash().then(res => {
          const data = res.data;
          if (data.result === 1) {
            this.emptyall = 0;
            this.tableData = [];
          }
        });
      };
      this.operateNotice(type, info, operate);
    },
    quitDelete() {
      this.$refs.multipleTable.clearSelection();
    },
    operateNotice(type, info, cb) {
      this.$confirm(`${info}, 是否继续?`, "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: `已取消${type}`
            });
          } else {
            cb();
          }
        }
      });
    },
    batchRestore() {
      if (this.checkOptions.length === 0) {
        this.$message({
          type: "info",
          message: `请选择要恢复的卡密`
        });
        return;
      }
      const data = { ids: _.join(this.checkOptions, ",") };
      const type = "恢复";
      const info = `确定恢复该${this.checkOptions.length}条卡密`;
      const operate = () => {
        api.batchRestoreCode(data).then(res => {
          const data = res.data;
          if (data.result === 1) {
            for (let i = 0; i < this.checkOptions.length; i++) {
              const localNumber = _.findIndex(this.tableData, o => {
                return o.id === this.checkOptions[i];
              });
              this.tableData.splice(localNumber, 1);
            }
            this.$message({
              type: "success",
              message: `${data.message}`
            });
          }
        });
      };
      this.operateNotice(type, info, operate);
    },
    batchDelall() {
      if (this.second_confirm === 1) {
        this.delall = 1;
        this.passhow = true;
      } else {
        this.passhow = false;
        this.batchDelete();
      }
    },
    batchDelete() {
      if (this.checkOptions.length === 0) {
        this.$message({
          type: "info",
          message: `请选择要删除的卡密`
        });
        return;
      }
      const data = { ids: _.join(this.checkOptions, ",") };
      const type = "删除";
      const info = `确定彻底删除该${this.checkOptions.length}条卡密`;
      const operate = () => {
        api.batchCompleteDelete(data).then(res => {
          const data = res.data;
          if (data.result === 1) {
            this.delall = 0;
            for (let i = 0; i < this.checkOptions.length; i++) {
              const localNumber = _.findIndex(this.tableData, o => {
                return o.id === this.checkOptions[i];
              });
              this.tableData.splice(localNumber, 1);
            }
            this.$message({
              type: "success",
              message: `${data.message}`
            });
          }
        });
      };
      this.operateNotice(type, info, operate);
    },
    handleRestoreProduct($index, row) {
      const data = { id: row.id };
      const type = "恢复";
      const info = `确定恢复此条记录`;
      const operate = () => {
        api.restoreInTrash(data).then(res => {
          const data = res.data;
          if (data.result === 1) {
            const localNumber = _.findIndex(this.tableData, o => {
              return o.id === row.id;
            });
            this.tableData.splice(localNumber, 1);
            this.$message({
              type: "success",
              message: `恢复成功`
            });
          }
        });
      };
      this.operateNotice(type, info, operate);
    },
    handel(index, row) {
      if (this.second_confirm === 1) {
        this.del = 1;
        this.passhow = true;
        this.delarow = row;
        this.indexs = index;
      } else {
        this.passhow = false;
        this.handleDeleteProduct(index, row);
      }
    },
    handleDeleteProduct($index, row) {
      const data = { id: row.id };
      const type = "恢复";
      const info = `确定删除此条记录，删除后不可恢复`;
      const operate = () => {
        api.deleteInTrash(data).then(res => {
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
      };
      this.operateNotice(type, info, operate);
    },
    handleSelectionChange(val) {
      this.checkOptions = val.map(o => o.id);
    },
    getTrashCode(data) {
      api.getDeleteCode(data).then(res => {
        const data = res.data;
        this.loading = false;
        if (data.data && data.data.length >= 0) {
          this.tableData = data.data;
          this.total = data.total;
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
          if (this.emptyall === 1) {
            this.emptyTrash();
          } else if (this.del === 1) {
            this.handleDeleteProduct(index, row);
          } else if ((this.delall = 1)) {
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
      this.emptyall = 0;
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
.px-ct-wrap {
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .px-ct-title {
    border-bottom: 1px solid #ebeef5;
    background: #fff;
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
  .pr-list-notice {
    font-size: 14px;
    padding: 15px;
    margin: 20px 30px;
    box-shadow: 0 0 30px #dfdcff;
    border-radius: 5px;
    background: #fff;
    color: #000;
    line-height: 24px;
  }
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
