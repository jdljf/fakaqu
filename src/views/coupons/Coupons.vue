
<template>
    <div id="coupons">
        <div v-show="passhow" class="mask"></div>
        <div v-show="passhow" class="pwdshows">
            <div style="text-align:right;width:100%;padding-bottom:10px;">
                <i @click="closepwd" class="el-icon-error" />
            </div>
            <el-form :model="pwdform" ref="pwdform" label-width="100px" class="demo-ruleForm">
                <el-form-item label="安全密码" prop="password" :rules="[
      { required: true, message: '密码不能为空'}]">
                    <el-input type="password" v-model="pwdform.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('pwdform')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="listLoadingall" v-loading="listLoadingall"></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{$t('couponslist.title')}}</span>
            </div>
            <el-form ref="coupons"  :model="coupons" label-width="80px">
                <el-form-item>
                    <el-select style="width: 20%;"  v-model="coupons.category_id" :placeholder="$t('couponslist.select')"  @change="getCurChange">
                        <el-option :label="$t('couponslist.all')" value="0"></el-option>
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select style="margin-left:5px;width: 20%" v-model="coupons.status" :placeholder="$t('couponslist.select')">
                        <el-option :label="$t('couponslist.Used')" value="1"></el-option>
                        <el-option :label="$t('couponslist.Unused')" value="2"></el-option>
                    </el-select>
                    <el-input style="margin-left:5px;width: 20%" v-model="coupons.code" :placeholder="$t('couponslist.couponsnum')"> </el-input>
                    <el-button style="margin-left:5px;" type="primary" @click="searchcoupons" icon="el-icon-search">{{$t('couponslist.search')}}</el-button>
                    <el-button type="warning" @click="resetcoupons" icon="el-icon-search">{{$t('couponslist.reset')}}</el-button>
                    <el-button type="danger" @click="delinfo">
                        <i class="el-icon-delete"></i>{{$t('couponslist.clearall')}}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top:20px">
            <el-table border :data="couponstable" style="width: 100%">
                <el-table-column prop="code" align="center" :label="$t('couponslist.couponsnums')" width="180">
                </el-table-column>
                <el-table-column prop="category" align="center" :label="$t('couponslist.Bindingclassification')" width="180">
                    <template slot-scope="scope">
                        <el-button style="color:#606266" type="text" size="small">{{(scope.row.category_id===0?'全部':scope.row.category.name)}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="value" align="center" :label="$t('couponslist.Denomination')">
                    <template slot-scope="scope">
                        <el-button style="color:#606266" type="text" size="small">{{scope.row.value}}{{(scope.row.type===0?'元':'%')}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" align="center" :label="$t('couponslist.time')">

                </el-table-column>
                <el-table-column prop="remark" align="center" :label="$t('couponslist.Remarks')">
                </el-table-column>
                <el-table-column align="center" prop="expire_time" :label="$t('couponslist.Expiredate')">
                </el-table-column>
                <!-- <el-table-column
        align="center"
        prop="id"
       :label="$t('couponslist.management')">
         <template slot-scope="scope">
        <el-button type="text" size="small" @click="delinfo(scope.row.id)" >删除</el-button>
    </template>
      </el-table-column> -->
            </el-table>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
export default {
  data() {
    return {
      passhow: false,
      second_confirm: 0,
      pwdform: {
        password: ""
      },
      category_id: "",
      listLoadingall: false,
      couponstable: [],
      selectedId: "",
      options: [],
      total: 0,
      page: 1,
      coupons: {
        category_id: "",
        status: "",
        code: ""
      }
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        const queryId = newValue.query.category_id;
        const status = newValue.query.status;
        const code = newValue.query.code;
        if (
          queryId !== undefined ||
          status !== undefined ||
          code !== undefined
        ) {
          const data = {
            params: {
              category_id: queryId,
              status: status,
              code: code
            }
          };
          this.coupons.code = code;
          this.getcoupons(data);
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.getSelectData();
    this.getcoupons();
    this.second_confirm = parseInt(localStorage.getItem("Second_Confirm"));
  },
  methods: {
    // getsecurity() {
    //   api.getsecurity().then(res => {
    //     const data = res.data;
    //     if (data.result === 1) {
    //       this.second_confirm = data.data.second_confirm;
    //     }
    //   });
    // },
    closepwd() {
      this.passhow = false;
      this.pwdform.password = "";
    },
    delinfo() {
      if (this.second_confirm === 1 && this.couponstable != false) {
        this.passhow = true;
      } else if (this.second_confirm === 0 && this.couponstable != false) {
        this.clearcoupons();
      } else {
        return;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getcheckConfirmCode();
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
    getsecurity() {
      api.getsecurity().then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.second_confirm = data.data.second_confirm;
        }
      });
    },
    resetcoupons() {
      this.$router.push({ name: "Coupons" });
      this.coupons.code = "";
      this.coupons.status = "";
      this.coupons.category_id = "";
      this.getcoupons();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getcoupons({ params: { page: val } });
    },
    searchcoupons() {
      const nameKey = _.trim(this.coupons.code);
      const newQuery = {
        category_id: this.selectedId,
        code: nameKey,
        status: this.coupons.status
      };
      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, newQuery)
      });
    },

    clearcoupons() {
      this.listLoadingall = true;
      this.$confirm("此操作将永久删除所以优惠券, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            this.listLoadingall = false;
          } else {
            api.clearcoupon().then(res => {
              const data = res.data;
              if (data.result === 1) {
                this.$message({
                  message: `${data.message}`,
                  type: "success",
                  duration: 3000
                });
                this.passhow = false;
                this.getcoupons();
                this.listLoadingall = false;
              } else {
                this.listLoadingall = false;
              }
            });
          }
        }
      });
    },
    getCurChange(change) {
      this.selectedId = change;
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
          }
        }
      });
    },
    getcoupons(data) {
      this.listLoadingall = true;
      api.getcoupons(data).then(res => {
        const data = res.data;
        if (data.data && data.data.length >= 0) {
          this.couponstable = data.data;
          this.total = data.total;
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
        }
      });
    },
    //安全密码确认
    getcheckConfirmCode() {
      let data = {
        password: this.pwdform.password
      };
      api.getcheckConfirmCode(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.clearcoupons();
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>
<style>
 #coupons .box-card .el-form-item__content{
  margin-left: 0px !important;
}

</style>

 <style lang="scss">
ul {
  color: #000 !important;
}
#coupons {
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
    top: 50px;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 140px;
  }
  .listLoadingall {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 5;
  }
  .box-card {
    .clearfix {
      font-weight: bold;
    }
    .listLoadingall {
      position: fixed;
      left: 50%;
      top: 50%;
      z-index: 5;
    }
    .box-card {
      .clearfix {
        font-weight: bold;
      }
      .el-form {
        .el-form-item {
          .el-form-item__content {
            margin-left: 0px !important;
            .el-select {
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
