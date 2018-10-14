<template>
    <div class="addCoupons">
        <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack()"   ><span style="font-size: 0.32rem;">{{addcouponstit}}</span></x-header>
          <div class="collection">
                   <el-form style="line-height: 60px;padding:.12rem" class="forms" ref="addcoupons" :rules="addcouponsrule" :model="addcoupons" label-width="80px" size="mini">
                      <table class="collection-table">
                        <tr style="margin-bottom:20px;">
                         <td style="width:30%;text-align:right;padding-right:.1rem">折扣面额:</td>
                         <td>
                            <el-form-item class="incomprops"  prop="value">
                            <input style="height:.5rem;border:1px solid #eee;width:100%;padding-left:.2rem"  type="text"  v-model="addcoupons.value"/>
                             </el-form-item>
                            <el-select style="margin-left:20px" v-model="addcoupons.type" >
                             <el-option  label="元" value="0"></el-option>
                             <el-option label="%" value="1"></el-option>
                            </el-select>
                         </td>
                          </tr>
                            <tr>
                         <td style="width:30%;text-align:right;padding-right:.1rem">生成数量:</td>
                         <td>
                      <el-form-item class="incomprops"  prop="number">
                            <input style="height:.5rem;border:1px solid #eee;width:100%"  type="text"  v-model="addcoupons.number"/>
                      </el-form-item >
                             </td>
                          </tr>
                            <tr>
                         <td style="width:30%;text-align:right;padding-right:.1rem">有效期:</td>
                         <td>
                      <el-form-item class="incomprops"  prop="bank_name">
             <el-select v-model="addcoupons.expire_days" style="border:1px solid #eee;border-radius:4px;height:27px"  :placeholder="$t('coupons.selectdate')">
                   <el-option label="1天" value="1天"></el-option>
                   <el-option label="2天" value="2天"></el-option>
                   <el-option label="3天" value="3天"></el-option>
                   <el-option label="4天" value="4天"></el-option>
                   <el-option label="5天" value="5天"></el-option>
                   <el-option label="6天" value="6天"></el-option>
                   <el-option label="7天" value="7天"></el-option>
                   <el-option label="10天" value="10天"></el-option>
                   <el-option label="20天" value="20天"></el-option>
                   <el-option label="30天" value="30天"></el-option>
                   <el-option label="50天" value="50天"></el-option>
           </el-select>
            <el-select style="border:1px solid #eee;border-radius:4px;height:27px"  v-model="addcoupons.use_type">
                   <el-option label="限单次使用" value="0"></el-option>
                   <el-option label="可重复使用" value="1"></el-option>
            </el-select>
                      </el-form-item>
                         </td>
                          </tr>
                            <tr>
                         <td style="width:30%;text-align:right;padding-right:.1rem">商品分类:</td>
                         <td>
                      <el-select v-model="addcoupons.category_id" placeholder="请选择" size="medium" @change="getCurChange">
                      <el-option :label="$t('coupons.allgoods')" value="0"></el-option>
                      <el-option
                       v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="(item.id).toString()">
                     </el-option>
                     </el-select>
                           </td>
                          </tr>
                               <tr>
                         <td style="width:30%;text-align:right;padding-right:.1rem">备注信息:</td>
                         <td>
                    <el-form-item  class="incomprops" prop="remark">
                           <input style="height:.5rem;border:1px solid #eee;width:100%;height:80px"  type="textarea"   v-model="addcoupons.remark"/>
                     </el-form-item>
                           </td>
                          </tr>
                      </table>
                       <el-button type="primary" style="width:100%" @click="submitForm('addcoupons')"  v-loading="listLoadingall">立即创建</el-button>
                   </el-form>
            </div>
          <TabBar></TabBar>
    </div>
</template>




<script>
import api from "@/axios/api";
import { XHeader } from "vux";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import { LoadMore } from "vux";
import TabBar from "@/components/mobile/TabBar";
export default {
  data() {
    const number = (rule, value, callback) => {
      if (value) {
        if (/[^0-9-]+/g.test(value)) {
          callback(new Error("请输入正确的数量!"));
        } else {
          callback();
        }
      }
      callback();
    };
    return {
      listLoadingall: false,
      selectedId: "",
      options: [],
      addcouponstit: "添加优惠券",
      addcoupons: {
        type: "0",
        use_type: "0",
        value: "1",
        number: "",
        expire_days: "",
        category_id: "0",
        remark: "",
        is_export: "0"
      },

      addcouponsrule: {
        value: [{ required: true, message: "请选择折扣面额", trigger: "blur" }],
        number: [
          { required: true, message: "请选择生成数量", trigger: "blur" },
          { validator: number, trigger: "blur" }
        ],
        remark: [{ required: true, message: "请选择备注信息", trigger: "blur" }]
      }
    };
  },
  components: {
    MbHeader,
    XHeader,
    LoadMore,
    TabBar
  },
  mounted() {
    this.getSelectData();
  },
  methods: {
    bannerBack() {
      this.$router.go(-1);
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
            this.value = temp[0].name;
          }
        }
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addcouponss();
        } else {
          return false;
        }
      });
    },
    addcouponss() {
      this.listLoadingall = true;
      var data = this.addcoupons;
      api.addcoupons(data).then(res => {
        const data = res.data;
        if (res.data.result === 1) {
          this.$router.push({ path: "Coupons" });
          this.$message({
            message: `${data.message}`,
            type: "success",
            duration: 3000
          });
          this.listLoadingall = false;
        } else {
          this.listLoadingall = false;
        }
      });
    }
  }
};
</script>
<style >
.el-message{
  min-width: 90%;
}
.addCoupons .incomprops {
  margin-bottom: 0px;
}
.addCoupons .incomprops .el-form-item__content {
  margin-left: 0px !important;
}

.addCoupons .el-select {
  width: 100% !important;
  margin-left: 0px !important;
}
</style>
<style lang="scss" scoped>
.addCoupons{
  background-color:#fff;
  .card-head {
    margin: 0.1rem;
    color: #157df4;
    line-height: 0.6rem;
    font-size: 0.22rem;
    padding-left: 0.1rem;
    border: 1px solid #e3e3e3;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 2px 1px #e3e3e3;
    margin-top: 0.2rem;
    .green {
      color: #94db7c;
    }
  }
  .collection {
    margin: 0.1rem;
    box-shadow: 0px 0px 2px 1px #eee;
    .demo-ruleForm {
      box-shadow: 0px 0px 2px 1px #eee;
      border-top: none;
      padding-bottom: 0.1rem;
      .edits {
        text-align: center;
        margin-top: 0.3rem;
        .btn {
          padding: 0.2rem;
          background: #157df4;
          color: #fff;
          font-size: 0.23rem;
        }
      }
      margin-top: 0.2rem;
      .head {
        line-height: 40px;
        font-weight: bold;
        text-align: center;
        background: #e3e3e3;
        color: #000;
      }
      .forms {
        line-height: 60px !important;
        padding: 0.15rem;
        table {
          width: 100%;
          tr {
            margin-bottom: 0.3rem;
            border-top: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3;
            line-height: 40px;
            td:nth-child(odd) {
              font-size: 0.12rem;
              font-weight: bold;
              border-right: 1px solid #e3e3e3;
              flex: 2;
              box-sizing: border-box;
              text-align: right;
              color: #000;
              width: 30%;
              padding-right: 0.2rem;
            }
            td:nth-child(even) {
              padding-left: 0.2rem;
              box-sizing: border-box;
              flex: 4;
              color: #000;
              .el-select {
                width: 100% !important;
                .el-input--suffix {
                  .el-input__inner {
                    border: none !important;
                  }
                }
              }
              input {
                background: #fff;
                font-weight: bold;
                width: 97%;
                border: none;
                color: #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
