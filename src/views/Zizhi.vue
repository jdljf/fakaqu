<template>
    <div class="zizhi">
        <div style="box-shadow:1px 1px 2px 1px #eee;background:#449CF9">
        <BannerGround />
        </div>
    <el-card class="box-card">
  <div slot="header" style="color:#3B9DDF;font-weight:900" class="clearfix">
    <span>企业资质</span>
  </div>
  <div  class="text item">
   <div>
       <div class="titles">公司营业执照</div>
       <div class="imgs">
           品轩科技
        <!-- <img   src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537949730719&di=1cb623b73f68447c7eba496891659ce3&imgtype=0&src=http%3A%2F%2Fimage.cn.made-in-china.com%2F43f34j01QEDTRSqrztVa%2F3.jpg"/> -->
       </div>
   </div>
   <div>
       <div class="titles">增值电信业务经营许可证</div>
       <div class="imgs">
           品轩科技

           <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537950402930&di=5ba5241a606861eba71ec6fae24028c6&imgtype=0&src=http%3A%2F%2Fs7.sinaimg.cn%2Fmw690%2F001Oht8pzy735HQh3JY46"/> -->
        </div>
   </div>
  </div>
</el-card>
    </div>
</template>
<script>
import BannerGround from "@/components/BannerGround.vue";

export default {
    data () {
        return {
            
        }
    },
    methods:{
     bannerBack(){
     this.$router.go(-1);
    },
    },
     components: {
    BannerGround
  },
}
</script>
<style lang="scss" scoped>
  .zizhi{

   .box-card{
       width: 90%;
       margin: 30px auto;
       .text{
           padding: 20px;
       }
       .imgs
       {
           width:60%;
           border: 1px solid  #E3e3e3;
           height: 500px;
           margin: 20px auto;
           img{
               width:100%;
           }
       }
   }
  }
</style>
