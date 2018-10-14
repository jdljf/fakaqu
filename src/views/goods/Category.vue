<template>
    <div class="pr-list-cm">
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
       <p class="pr-list-title">{{$t('sort.title')}}
           <a href="javascript:;" @click="dialogFormVisible = true" style="font-weight: normal">{{$t('sort.btn')}}</a>
       </p>
        <div style=" width: 96%;margin: 20px auto;" class="pr-table-wrap">
            <el-table
                    :data="tableData"
                    v-loading="loading"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        :label=label
                        >
                    <template slot-scope="{row,$index}">
                        <el-input v-model="row.name" placeholder="请输入内容" v-if="row.isEditing" class="edit-cell" size="medium"></el-input>
                        <span v-if="!row.isEditing">{{row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sort"
                        :label=label1
                        width="300"
                        >
                    <template slot-scope="{row,$index}">
                        <el-input v-model="row.sort" placeholder="请输入内容" v-if="row.isEditing" class="edit-cell" size="medium"></el-input>
                        <span v-if="!row.isEditing">{{row.sort}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label=label2
                        width="400"
                        >
                    <template slot-scope="{row,$index}">
                      <!-- 更新 -->
                        <el-button
                                type="success"
                                size="small"
                                @click.native="handleUpdate($index, row)" v-if="row.isEditing" >{{$t('sort.btn6')}}</el-button>
                      <!-- 取消 -->
                        <el-button
                                type="danger"
                                size="small"
                                @click.native="handleCancel($index, row)" v-if="row.isEditing">{{$t('sort.btn5')}}</el-button>
                        <!--修改-->
                        <el-button
                                size="mini"
                                type="warning"
                                @click="handleEdit($index, row) " v-if="!row.isEditing">{{$t('sort.btn1')}}</el-button>
                        <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="primary"-->
                                <!--@click="handleOpenLink($index, row)"  v-if="!row.isEditing">链接</el-button>-->
                      <!-- 产品 -->
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleProduct($index, row)" v-if="!row.isEditing">{{$t('sort.btn2')}}</el-button>
                      <!-- 库存 -->
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleLeftCard($index, row)" v-if="!row.isEditing">{{$t('sort.btn3')}}</el-button>
                      <!-- 删除 -->

                        <el-button
                                size="mini"
                                type="danger"
                                @click="handele($index, row)" v-if="!row.isEditing">{{$t('sort.btn4')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pr-list-notice">
            <i class="el-icon-third-natice"></i>
            {{$t('sort.post')}}
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
        <el-dialog :title="$t('modal.title')" :visible.sync="dialogFormVisible" width="700px">
            <el-form :model="form">
                <el-form-item :label="$t('modal.label')" :label-width="formLabelWidth">
                    <div style="width: 450px">
                        <el-input v-model="form.name" auto-complete="off" maxlength="20"></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="$t('modal.label1')" :label-width="formLabelWidth">
                    <el-input-number v-model="form.sort" controls-position="right"  ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t('modal.btn')}}</el-button>
                <el-button type="primary" @click="addProduct">{{$t('modal.btn1')}}</el-button>
            </div>
        </el-dialog>

        <!--<el-dialog title="商品分类链接" :visible.sync="dialogLink" >-->
            <!--<div class="short-link">-->
                <!--<p>1.短链接(推荐)</p>-->
                <!--<a href="http://t.cn/RFITJu1" target="_blank">http://t.cn/RFITJu1</a>-->
                <!--<a href="javascript:;" class="share-btn" data-clipboard-text="http://t.cn/RFITJu1" @click="copyText">复制链接</a>-->
                <!--<span>如果朋友圈等地方打广告请发这个链接</span>-->
            <!--</div>-->
            <!--<div class="long-link">-->
                <!--<p>2.店铺总链接：</p>-->
                <!--<a href="http://www.youka.la/category/89445238182DAA01?1" target="_blank">http://www.youka.la/category/89445238182DAA01?1</a>-->
                <!--<a href="javascript:;" class="share-btn" data-clipboard-text="http://www.youka.la/category/89445238182DAA01?1"  @click="copyText">复制链接</a>-->
                <!--<span>店铺总链接包含您店铺下所有的商品分类和商品信息</span>-->
            <!--</div>-->
            <!--<div class="pic-link">-->
                <!--<p>3、店铺总链接二维码：</p>-->
                <!--<img src="../../assets/images/get.png" alt="" width="180px" height="180px">-->
                <!--<span>二维码可以很方便的放在网店或者分享到手机客户端，鼠标右击即刻保存图片</span>-->
            <!--</div>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogLink = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="dialogLink = false">确 定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
import _ from "lodash";
import api from "@/axios/api";
import Clipboard from "clipboard";
export default {
  name: "Category",
  data() {
    return {
      edits: 0,
      del: 0,
      updatarow: {},
      indexs: 0,
      passhow: false,
      second_confirm: 0,
      pwdform: {
        password: ""
      },
      label: this.$t("sort.name"),
      label1: this.$t("sort.sort"),
      label2: this.$t("sort.manager"),
      link_code: "",
      total: 0,
      loading: true,
      curPage: "1",
      curIndex: null,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      isModify: {
        name: "",
        sort: ""
      },
      form: {
        name: "",
        sort: "1"
      },
      changeForm: {
        id: "",
        name: "",
        sort: "1"
      },
      currentPage4: 4,
      tableData: []
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {
    const clipboard = new Clipboard(".share-btn");
    this.second_confirm = parseInt(localStorage.getItem("Second_Confirm"));
  },
  methods: {
    closepwd() {
      if (this.edits === 1) {
        this.curIndex.isEditing = false;
      }
      this.edits = 0;
      this.del = 0;
      this.passhow = false;
      this.pwdform.password = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getcheckConfirmCode(this.indexs, this.updatarow);
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
          if (this.edits === 1) {
            this.curIndex.isEditing = true;
          }
          if (this.del === 1) {
            this.handleDelete(index, row);
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
    // handleOpenLink($index, row) {
    //   this.dialogLink = true;
    //   this.link_code = row.link_code;
    //   console.log($index, row);
    // },
    getPageNumber(pgnumber) {
      this.curPage = pgnumber;
      this.getTableData();
    },
    getTableData() {
      api.getProductList({ params: { page: this.curPage } }).then(res => {
        const data = res.data;
        this.loading = false;
        if (data.data && data.data.length > 0) {
          this.total = data.total;
          this.tableData = data.data;
        }
      });
    },
    // copyText() {
    //   this.$message({
    //     message: "链接复制成功",
    //     type: "success",
    //     duration: 3000
    //   });
    // },

    addProduct() {
      if (this.form.name === "") {
        this.$message({
          message: "请填写要添加的种类",
          type: "warning",
          duration: 3000
        });
        return;
      }
      api
        .addProductSort(this.form)
        .then(res => {
          const data = res.data;
          if (data.result === 1) {
            this.$message({
              message: `${data.message}`,
              type: "success",
              duration: 3000
            });
            location.reload();
            // this.tableData.unshift(this.form);
          }
        })
        .finally(() => {
          this.dialogFormVisible = false;
        });
    },
    handleUpdate(index, row) {
      if (this.isModify.name === row.name && this.isModify.sort === row.sort) {
        row.isEditing = false;
      } else {
        this.changeForm.name = row.name;
        this.changeForm.sort = row.sort;
        this.changeForm.id = row.id;
        api
          .updateProductList(this.changeForm)
          .then(res => {
            const data = res.data;
            if (data.result === 1) {
              this.edits = 0;
              log("edits", this.edits);
              this.$message({
                message: "修改成功",
                type: "success",
                duration: 3000
              });
            }
          })
          .finally(() => {
            row.isEditing = false;
          });
      }
    },
    handleEdit(index, row) {
      this.edits = 1;
      if (this.second_confirm === 1) {
        this.passhow = true;
      } else if (this.second_confirm === 0) {
        this.passhow = false;
      }
      if (this.curIndex !== null) {
        this.curIndex.isEditing = false;
      }
      this.curIndex = row;
      this.isModify.name = row.name;
      this.isModify.sort = row.sort;
      this.$set(row, "isEditing", true);
    },
    //取消编辑
    handleCancel(index, row) {
      row.isEditing = false;
    },
    handele(index, row) {
      this.del = 1;
      if (this.second_confirm === 1) {
        this.passhow = true;
        this.indexs = index;
        this.updatarow = row;
      } else if (this.second_confirm === 0) {
        this.passhow = false;
        this.handleDelete(index, row);
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该条记录, 是否继续?", "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          } else {
            api.deleteProduct({ id: row.id }).then(res => {
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
              } else {
                this.$message({
                  type: "error",
                  message: `${data.message}`
                });
              }
            });
          }
        }
      });
    },
    handleProduct(index, row) {
      this.$router.push({
        path: "/product/goodslist",
        query: { category_id: row.id }
      });
    },
    handleLeftCard(index, row) {
      this.$router.push({
        path: "/product/secret",
        query: { id: row.id }
      });
    }
  }
};
</script>

<style  lang="scss">
.pr-list-cm {
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
  .el-dialog {
    min-width: 500px;
  }
  /*position: relative;*/
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .pr-list-title {
    border-bottom: 1px solid #ebeef5;
    /*background: #317fe3;*/
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #000;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    a {
      position: absolute;
      top: 10px;
      right: 50px;
      color: #fff;
      background: #409eff;
      font-size: 16px;
      /*margin-left: 70%;*/
      border: 1px solid #409eff;
      display: inline-block;
      width: 110px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
    }
  }
  .pr-table-wrap {
    .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cel {
      text-align: center;
      padding: 0;
    }
    .el-table__body-wrapper {
      /*overflow: hidden;*/
      max-height: 400px;
      overflow: auto;
      overflow-x: hidden;
    }
    .edit-cell {
      width: 240px;
    }
  }

  .pr-list-notice {
    font-size: 14px;
    padding: 15px;
    margin: 20px 30px;
    /*border: 1px solid #fff;*/
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    color: #000;
    line-height: 24px;
  }
  .pr-list-pagination {
    height: 50px;
    width: 100%;
    .el-pagination {
      padding-left: 60%;
    }
  }
  .short-link {
    p {
      font-size: 20px;
      display: inline-block;
    }
    a {
      display: inline-block;
    }
    .share-btn {
      margin-top: 20px;
      display: block;
      border-radius: 4px;
      width: 120px;
      height: 24px;
      background: #317fe3;
      color: #fff;
      line-height: 24px;
      text-align: center;
    }
    span {
      display: inline-block;
      margin-top: 20px;
    }
  }
  .long-link {
    margin-top: 20px;
    p {
      font-size: 20px;
      display: inline-block;
    }
    a {
      display: inline-block;
    }
    .share-btn {
      margin-top: 20px;
      display: block;
      border-radius: 4px;
      width: 120px;
      height: 24px;
      background: #317fe3;
      color: #fff;
      line-height: 24px;
      text-align: center;
    }
    span {
      display: inline-block;
      margin-top: 20px;
    }
  }
  .pic-link {
    margin-top: 20px;
    p {
      font-size: 20px;
      display: inline-block;
    }
    img {
      display: block;
    }
  }
}
</style>
