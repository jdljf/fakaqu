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
        <div class="px-batch-wrap">
            <div>
                <p class="px-batch-title">{{$t('batch.title')}}</p>
                <div style="padding: 20px">
                        <el-select v-model="value" :placeholder="$t('batch.select')"  @change="getCurChange">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    <!--<div style="max-width: 220px;margin-top: 20px;">-->
                        <!--<el-input v-model="goodname" placeholder="请输入商品名称查询"></el-input>-->
                    <!--</div>-->
                    <div style="display: inline-block;margin-left: 20px;">
                        <a href="javascript:;" @click="searchProduct" class="product-search" style="margin-top: 20px;"><i class="el-icon-third-search" style="margin-right: 6px;"></i>{{$t('batch.btn')}}</a>
                        <a href="javascript:;" @click="resetProduct" class="product-search" style="margin-top: 20px;margin-left: 20px;">{{$t('batch.btn1')}}</a>
                    </div>

                </div>
            </div>
        </div>
        <div class="px-pl-bottom">
            <el-table
                    :data="tableData"
                    v-loading="loading"
                    stripe
                    border
                    style="width: 100%;">
                <el-table-column
                        prop="goods_name"
                        :label="$t('batch.a')"
                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.goods_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="market_price"
                        :label="$t('batch.b')"
                        width="100"
                >
                    <template slot-scope="{row,$index}">
                        <span >{{row.market_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="stock"
                        :label="$t('batch.c')"
                        width="150"
                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.stock}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sold"
                        :label="$t('batch.d')"
                        width="150"
                >
                    <template slot-scope="{row,$index}">
                        <span>{{row.sold}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$t('batch.e')"
                        width="500"
                >
                    <template slot-scope="{row,$index}">
                        <el-button
                                size="mini"
                                type="warning"
                                @click="handleExport(0, row) ">{{$t('batch.btn2')}}</el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleExport(1, row)" >{{$t('batch.btn3')}}</el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handel($index, row)">{{$t('batch.btn4')}}</el-button>
                        <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="danger"-->
                                <!--@click="handleDelete($index, row)">库存</el-button>-->
                        <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="success"-->
                                <!--@click="handleDelete($index, row)">已卖出</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pr-list-notice">
                <i class="el-icon-third-natice"></i>
                {{$t('batch.notice')}}
            </div>
            <div class="pr-list-pagination">
                <el-pagination
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
import api from "@/axios/api";
export default {
  name: "BatchOperate",
  data() {
    return {
      del:0,
      delarow:{},
      ids:'',
      indexs:0,
      passhow: false,
      second_confirm: 0,
      pwdform: {
        password: ""
      },
      goodname: "",
      selectedId: "",
      total: 0,
      options: [],
      value: "",
      loading: true,
      tableData: []
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const queryId = newValue.query.category_id;
        // const queryName = newValue.query.goods_name;
        if (queryId !== undefined) {
          const data = {
            params: { category_id: queryId }
          };
          this.getGoodList(data);
        }
      },
      immediate: true
    }
  },
  created() {
    this.getGoodList();
    this.getSelectData();
    this.second_confirm=parseInt(localStorage.getItem("Second_Confirm"));
  },
  methods: {
    handleDelCode(index, row) {
      this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            const data = { goods_id: row.id };
            api.delNoSold(data).then(res => {
              const data = res.data;
              if (data.result === 1) {
                this.del=0;
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                location.reload();
              }else{
                this.$message({
                  message: "删除失败",
                  type: "error"
                });
              }
            });
          }
        }
      });
    },
    handleExport($index, row) {
      const data = { params: { goods_id: row.id, status: $index } };
      api.getNoSold(data).then(res => {
        const data = res.data;
        const Link = document.createElement("a");
        const body = document.querySelector("body");
        body.appendChild(Link);
        Link.style.display = "none";
        const blob = new Blob([data], {
          type: "text/plain"
        });
        Link.href = URL.createObjectURL(blob);
        Link.download = $index ? "已出售卡密" : "未出售卡密";
        Link.click();
        body.removeChild(Link);
        URL.revokeObjectURL(blob);
      });
    },
    resetProduct() {
      this.$router.push({ name: this.$route.name });
      this.value = "";
      this.goods_name = "";
      this.getGoodList();
      // location.reload();
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
    },
    searchProduct() {
      const newQuery = {
        category_id: this.selectedId
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    },
    getCurChange(change) {
      this.selectedId = change;
    },
    getGoodList(data) {
      api.getAllList(data).then(res => {
        const data = res.data;
        this.loading = false;
        if (data.data && data.data.length >= 0) {
          this.tableData = data.data;
          this.total = data.total;
        }
      });
    },
     handel(index, row){
     if (this.second_confirm === 1 ) {
       this.del=1;
       this.passhow = true;
       this.delarow=row;
       this.indexs=index;
      } else if (this.second_confirm === 0) {
      this.passhow = false;
      this.handleDelCode(index,row);
      } 
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
            this.handleDelCode(index, row);
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
    closepwd(){
    this.del=0;
    this.passhow = false;
    this.pwdform.password="";
    },
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
.px-batch-wrap {
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .px-batch-title {
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
  .el-table--border th:first-child .cel {
    text-align: center;
    padding: 0;
  }
  .el-table__body-wrapper {
    max-height: 400px;
    overflow: auto;
    overflow-x: hidden;
  }
  .pr-list-notice {
    font-size: 14px;
    padding: 15px;
    margin: 20px 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background: #fff;
    color: #000;
    line-height: 24px;
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
