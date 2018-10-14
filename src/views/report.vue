<template>
    <div class="report">
         <BannerGround/>
         <div class="report-card" shadow="never" style="width: 1150px;margin: 60px auto;">
         <div class="report-top">{{$t('search.detail')}}</div>
         <div class="report-tb">
             <el-form style="padding:20px;" ref="orderform" :model="orderform" label-width="80px">
                   <el-form-item :label="$t('search.no')">
                     <div style="width: 350px;display: inline-block;">
                        <el-input v-model="orderform.no" :placeholder="$t('search.input')"></el-input>
                    </div>
                    <el-button type="primary" icon="el-icon-search"  @click="searchorder">{{$t('search.searchs')}}</el-button>
                   </el-form-item>
             </el-form>
           <el-table 
                    :data="ordertable"
                    empty-text="暂无结果"
                    style="width: 100%;border-radius: 8px;border-color:rgba(50, 155, 244, 1); ">
                <el-table-column
                        prop="created_at"
                       :label="$t('search.data')"
                        align="center"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="no"
                        align="center"

                        :label="$t('search.num')"
                        width="250">
                </el-table-column>
                  <el-table-column
                        width="250"
                        align="center"
                        :label="$t('search.tsresult')"
                         prop="reason_type"
                        >
                </el-table-column>
                <el-table-column
                        width="250"
                        align="center"
                        :label="$t('search.statusq')"
                         prop=""
                        >
                        <template slot-scope="scope">
                          <span style="color:#F04E48" v-if="scope.row.status===0">{{$t('search.nostatus')}}</span>
                          <span style="color:#86D94D" v-else>{{$t('search.status')}}</span>
                        </template>
                </el-table-column>
               <el-table-column
               prop="data"
                align="center"
               width="150"
              :label="$t('search.detail')">
          <template slot-scope="scope"  >
        <el-button style="color:#55A3FC" type="text" size="small" @click="gotsdetail(scope.row.no)">{{$t('search.deatilts')}}</el-button>
        <el-button style="color:#55A3FC" type="text" size="small" @click="cexiao()">{{$t('search.Cancelcomplaint')}}</el-button>
        
       </template>
      </el-table-column>
            </el-table>
         </div>
       </div>
        <div v-show="passhow" class="mask"></div>
          <div v-show="passhow" class="pwdshows">
        <div style="text-align:right;width:100%;padding-bottom:10px;"><i @click="closepwd" class="el-icon-error"/></div>
      <el-form  :model="pwdform" ref="pwdform" label-width="100px" class="demo-ruleForm">
    <el-form-item
    label="投诉密码"
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
    </div>
    
</template>

<script>
import BannerGround from "@/components/BannerGround.vue";
import api from "@/axios/api";
export default {
    data () {
        return {
            cxts:0,
            passhow:false,
            pwdform:{
                password:''
            },
            ordertable:[],
            orderform:{
                no:''
            },
            cancel_code:'',
            nos:'',
        }
    },
  components: {
    BannerGround
  },
  methods:{
    closepwd() {
      this.passhow = false;
      this.pwdform.password = "";
      this.cxts=0;
    },
    gotsdetail(row){
     this.passhow = true;
     this.nos=row;
      },
      cexiao(){
        this.$confirm("请确定卖家已经处理好您的售后问题，订单撤销投诉后不可再次投诉，订单金额将会正常结算给卖家。您确认撤销投诉吗？, 是否继续?", "提示", {
        type: "warning",
        callback: action => {
          if (action === "cancel" || action === "close") {
            this.$message({
              type: "info",
              message: "已取消撤销,"
            });
          } else {
       this.cxts=1;      
        this.passhow = true;
          }
        }
      });
       
      },
    //   撤销
    getwebcancelComplain(){
     const data = { params: { cancel_code:this.cancel_code }}; 
     api.getwebcancelComplain(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
           this.$message({
            message: `${data.message}`,
            type: "success"
          });
        this.passhow = false;
        this.cxts=0;
        } else {
          this.$message({
            message: `${data.message}`,
            type: "error"
          });
        }
      });
      },
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
     if (valid) {
     if( this.cxts===1&&this.pwdform.password===this.cancel_code){
          this.getwebcancelComplain();
      }
    else if(this.cxts===0&&this.pwdform.password===this.cancel_code){
     var id=JSON.stringify(this.nos);
     this.$router.push({path:'/Orderts',query:{id:id}})
     this.passhow = false;
     }else{
          this.$message({
            message: "输入错误",
            type: "error"
          });
     }
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
    searchorder() { 
         const data = { params: { keyword: this.orderform.no }};  
         api.getwebcomplainInfo(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
             this.ordertable=[];
            this.ordertable.push(data.data);
            this.cancel_code=data.data.cancel_code;
        } else {
          this.$message({
            message: "未查到该记录",
            type: "warning"
          });
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.report {
  height: 1150px;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
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
  .report-card{
      padding: 0 !important;
  .report-top{
      color: #fff;
      line-height: 80px;
      font-weight: bold;
      font-size: 20px;
      background: #317fe3;
      border-bottom: 1px solid #e3e3e3;
      padding-left: 20px;
    }
    .report-tb{
       padding-bottom: 20px;
        background: #fff;
    }
  }
}
</style>


