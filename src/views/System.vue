<template>
    <div class="System">
        <div style="box-shadow:1px 1px 2px 1px #eee;background:#449CF9">
        <BannerGround />
        </div>
        <div class="list-top">  
            <div  class="search-inp">
                <input type="text" style="" placeholder="请输入关键字" >  
               <button>搜索</button> 
            </div>     
        </div>
     <el-card class="box-card" shadow="never" style="border:none">
  <div slot="header" class="clearfix">
    <span  style="letter-spacing:2px">
        <router-link to="/news" style="color:skyblue;">帮助中心</router-link>/ {{articleList.title}}
         <el-button @click="bannerBack" style="float: right; padding: 3px 0" type="text"><i class="el-icon-back"></i>返回</el-button>
    </span>
  </div>
    <div  class="text item">
    <div class="titles">
     {{articleList.title}}
    </div>
     <div class="title-span">
     发卡吧自动发卡平台 -  {{articleList.created_at}}
    </div>
    <div style="font-size:12px;margin-top:20px" v-html="articleList.content">
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
            articleList:{},
        }
    },
    methods:{
     bannerBack(){
     this.$router.go(-1);
    },
    },
    mounted(){
      this.articleList=JSON.parse(this.$route.params.articleList);
      log('articleList',this.articleList);
    },
     components: {
    BannerGround
  },
}
</script>
<style lang="scss" scoped>
.System {
  height: 1150px;
background: #fff;  
  background-size: 100% 100%;
  .list-top {
      padding: 15px;
      background: #F8F8F8;
    .search-inp {
      width: 1150px;
      margin: 20px auto;
    
      input{
       line-height:40px;
       width:80%;
       font-size: 16px;
       padding-left:10px;
       border:none;
      box-shadow: 0px 1px 2px 1px #ccc;
      border-radius: 4px;
      margin-left: 10%;
      }
      button{
          line-height: 42px;
          background: #ccc;
          color: #fff;
          padding:1px 20px 0px;
          border: none;
          margin-left: -70px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: 16px;

      }
    }
  }
  .box-card{
      width:1150px;
      margin: 20px auto;
      background: #fff;   
      .text{
          font-weight: bold;
          padding: 20px;
          font-size: 28px;
      }
      .title-span{
          color: #CCCDCC;
          font-size: 14px;
          letter-spacing: 2px;
          margin-top:25px;
      }      
      
     
  }
}
</style>