<template>
    <div id="addCoupons">
       <el-card class="box-card">
           <div slot="header" class="clearfix">
           <span>{{$t('coupons.title')}}</span>
           </div>
           <el-form class="forms" ref="addcoupons" :rules="addcouponsrule" :model="addcoupons" label-width="80px" size="mini">
              <el-form-item :label="$t('coupons.Discount')"  prop="value">
                 <el-input style="width:20%" v-model="addcoupons.value"></el-input>
                   <el-select style="margin-left:20px" v-model="addcoupons.type" >
                   <el-option :label="$t('coupons.Dollar')" value="0"></el-option>
                   <el-option label="%" value="1"></el-option>
                  </el-select>
                  <span class="span-text">{{$t('coupons.distext')}}</span>
             </el-form-item>
             <el-form-item  :label="$t('coupons.Numbergeneration')" prop="number">
                 <el-input style="width:42%" v-model="addcoupons.number"></el-input>
                  <span class="span-text">{{$t('coupons.numtext')}}</span>
             </el-form-item>
             <el-form-item :label="$t('coupons.Validityperiod')">
                <el-select v-model="addcoupons.expire_days"  :placeholder="$t('coupons.selectdate')">
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
                 <el-select style="margin-left:20px" v-model="addcoupons.use_type">
                   <el-option :label="$t('coupons.Singleuse')" value="0"></el-option>
                   <el-option :label="$t('coupons.reuse')" value="1"></el-option>
                  </el-select>
                  <span class="span-text">{{$t('coupons.coupontext')}}</span>
             </el-form-item>
               <el-form-item :label="$t('coupons.Categories')">
                 <el-select v-model="addcoupons.category_id" placeholder="请选择" size="medium" @change="getCurChange">
                <el-option :label="$t('coupons.allgoods')" value="0"></el-option>
                 <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="(item.id).toString()">
                 </el-option>
                </el-select>
             </el-form-item>
             <el-form-item :label="$t('coupons.remark')" prop="remark">
               <el-input type="textarea" v-model="addcoupons.remark"></el-input>
              </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="submitForm('addcoupons')" v-loading="listLoadingall">{{$t('coupons.Createnow')}}</el-button>
          </el-form-item>
           </el-form>
       </el-card>   
    </div>
</template>
<script>
import api from "@/axios/api";
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
  mounted() {
    this.getSelectData();
  },
  methods: {
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
          this.$message({
            message: "创建失败",
            type: "error",
            duration: 3000
          });
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
          this.$router.push({ path: "/shop/Coupons" });
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
<style lang="scss" scoped>
#addCoupons {
  .box-card {
    .clearfix {
      font-weight: bold;
    }
    .forms {
      .span-text {
        display: inline-block;
        color: #ccc;
        margin-left: 10px;
      }
    }
  }
}
</style>
