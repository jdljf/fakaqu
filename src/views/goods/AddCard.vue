<template>
    <div class="px-add-card">

        <p class="change-info-title">{{$t("AddCard.title")}}</p>

        <table border="1" cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td>{{$t("AddCard.name")}}</td>
                <td>
                    <el-select v-if="$route.query.id === undefined" v-model="value" :placeholder="$t('AddCard.holder1')"  @change="getCurChange" style="width: 97%;margin-left:1%;">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.goods_name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <div v-else style="width: 500px;margin-left: 2%;">
                        <p style="text-align: center;">{{value}}</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>{{$t("AddCard.way")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="code.type" label="0">{{$t('radio.a')}}</el-radio>
                        <el-radio v-model="code.type" label="1">{{$t('radio.b')}}</el-radio>
                    </div>
                </td>
            </tr>
            <tr>
                <td>{{$t("AddCard.format")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <!--<el-radio v-model="code.sign" label=" ">用""分隔</el-radio>-->
                        <el-radio v-model="code.sign" label=",">{{$t('radio.c')}}</el-radio>
                        <el-radio v-model="code.sign" label="|">{{$t('radio.d')}}</el-radio>
                        <el-radio v-model="code.sign" label="-">{{$t('radio.e')}}</el-radio>
                    </div>
                </td>
            </tr>
            <tr>
                <td>{{$t("AddCard.example")}}</td>
                <td>
                  <span  style="margin-left: 2%;">AAAAAAAAAAA{{signs}}BBBBBBBBBBBB</span>
                </td>
            </tr>
            <tr>
                <td>{{$t("AddCard.content")}}</td>
                <td>
                    <div  v-if="code.type==='1'">
                        <el-input
                                style="margin-top: 20px"
                                type="textarea"
                                :autosize="{ minRows: 8}"
                                :placeholder="$t('AddCard.holder2')"
                                v-model="code.content"
                        >
                        </el-input>
                        <div class="pr-list-notice">
                            <i class="el-icon-third-natice"></i>
                            {{$t('AddCard.notice')}}
                        </div>
                    </div>
                    <div v-else>
                        	<input type='file' name='file'   id="codeupload"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td>{{$t("AddCard.check")}}</td>
                <td>
                    <div style="margin-left: 2%;">
                        <el-radio v-model="code.is_check" label="0">{{$t('radio.f')}}</el-radio>
                        <el-radio v-model="code.is_check" label="1">{{$t('radio.g')}}</el-radio>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>


        <a href="javascript:;" class="sure-change" @click="addCode">{{$t('AddCard.btn')}}</a>
    </div>
</template>

<script>
import api from "@/axios/api";
import _ from "lodash";
export default {
  name: "AddCard",
  data() {
    return {
      options: [],
      value: "",
      fileString: "",
      code: {
        type: "1",
        sign: ",",
        content: "",
        is_check: "0",
        goods_id: ""
      }
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        if (Object.keys(newValue.query).length === 0) {
          this.getSelectData();
        } else {
          this.value = newValue.query.name;
          this.code.goods_id = newValue.query.id;
        }
      },
      immediate: true
    }
  },
  computed: {
    signs() {
      if (this.code.sign === ",") {
        return ",";
      } else if (this.code.sign === "|") {
        return "|";
      } else {
        return "-";
      }
    }
  },
  methods: {
    getCurChange(change) {
      this.code.goods_id = change.toString();
    },
    addCode() {
      this.code.content = _.trim(this.code.content);
      if (this.code.type == "1") {
        if (this.code.goods_id === "") {
          this.$message({
            message: "请选择商品名称",
            type: "warning"
          });
          return;
        }
        var code = this.code;

        api.addGoodsCode(code).then(res => {
          const data = res.data;
          if (data.result === 1) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push({ name: "Goodslist" });
          }
        })
      }
      else if (this.code.type == "0") {
        var formDatas = new FormData();
        var codeupload = document.getElementById("codeupload");
        var codeupload = codeupload.files[0];
        var content = "";
        var reader = new FileReader();
        var that = this;
        reader.readAsText(codeupload, "UTF-8");
        reader.onload = function(evt) {
          that.fileString = evt.target.result;
          formDatas.append("content", content);
          formDatas.append("file", codeupload);
          formDatas.append("type", that.code.type);
          formDatas.append("sign", that.code.sign);
          formDatas.append("is_check", that.code.is_check);
          formDatas.append("goods_id", that.code.goods_id);
          api.addGoodsCode(formDatas).then(res => {
            const data = res.data;
            if (data.result === 1) {
              that.$message({
                message: "添加成功",
                type: "success"
              });
              that.$router.push({ name: "Goodslist" });
            }
          });
        };
      } else {

        this.$message({
          message: "请检查是否使用选中的分隔符",
          type: "warning"
        });
      }
    },
    getSelectData() {
      api.getAllProduct().then(res => {
        const data = res.data;
        this.options = data;
      });
    }
    // beforeListUpload(file) {
    //   const isTxt = file.type === "text/plain";
    //   const size = file.size <= 100;
    //   if (!isTxt || !size) {
    //     this.$message({
    //       message: "请上传小于100K的TXT文件",
    //       type: "warning"
    //     });
    //   }
    // }
  }
};
</script>

<style  lang="scss">
.px-add-card {
  width: 97%;
  background: #fff;
  box-shadow: 0 0 30px #dfdcff;
  display: inline-block;
  margin: 1% auto auto 1%;
  .change-info-title {
    background: #fff;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
  table {
    width: 70%;
    margin: 20px;
    border-collapse: collapse;
  }
  table td:nth-child(1) {
    opacity: 0.8;
    width: 20%;
    /*color: #000;*/
    /*background: #fff;*/
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
  table td:nth-child(2) {
    width: 40%;
  }
  table tbody tr td {
    border: 1px solid #eaeaea;
  }
  .sure-change {
    color: #fff;
    background: #409eff;
    font-size: 16px;
    border: 1px solid #fff;
    display: inline-block;
    width: 110px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-radius: 5px;
    margin: 50px 0 100px 30%;
  }
  .pr-list-notice {
    font-size: 14px;
    padding: 10px;
    margin: 20px 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    opacity: 0.8;
    background: #fff;
    color: #000;
    line-height: 24px;
  }
  .card-upload {
    .el-upload {
      margin-left: 20px;
    }
    .el-upload__tip {
      display: inline-block;
      margin-left: 20px;
      font-size: 16px;
    }
  }
}
</style>
