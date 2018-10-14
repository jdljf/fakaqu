<template>
    <div class="newlist"> 
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
        <router-link to="/news" style="color:skyblue;">帮助中心</router-link>/平台公告
    </span>
  </div>
    <div  class="text item">
    <div @click="todetail(item)" class="list-child" v-for="item in articleLists" :key="item.id">
        <div class="list-childleft">
            <span class="line-left">{{item.created_at.substring(8,10)}}</span>
            <p style="color:#ccc">{{item.created_at.substring(0,7)}}</p>
        </div>
        <div class="list-tops">
        <span>{{item.title}}</span>
        <br>
        <span class="list-text"> 尊敬的广大用户们！你们将要新购奥术大师</span>
        </div>
        <div class="right-icon">
             <i  class="el-icon-caret-right"></i>
        </div>
    </div>
     
    </div>
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;color:#000">
</el-pagination>
</el-card>

    </div>
</template>
<script>
import BannerGround from "@/components/BannerGround.vue";
import api from "@/axios/api";

export default {
  data() {
    return {
      input: "",
      articleLists:[],
      day:'',
      page:1,
      total:0,
    };
  },
  components: {
    BannerGround
  },
  methods:{
        // 公告
    getarticleLists(){
      api.getarticleLists().then(res => {
        const data = res.data;
          this.articleLists=data.data;
          this.total=data.total;
      });
    },
    handleCurrentChange(val) {
            this.page = val;
            this.getarticleLists({ params: { page: val } });
        },
      todetail(item){
      var articleList=JSON.stringify(item);
      log('articleList',articleList);

      this.$router.push({ name: "System",params: { articleList:articleList }});
    },
  },
  mounted(){
      this.getarticleLists();
  }
};
</script>
<style lang="scss" scoped>
.newlist {
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
      .list-child{
         border-bottom: 1px solid #eee;
         padding: 25px 10px 70px;
          height: 60px;
          transition: all .3s;
          background: #fff;
          &:hover{
              transform: translateY(-4px);
              box-shadow: 0px 0px 18px 1px #ccc;
              border-bottom: none;
              z-index:3;
          }
          .list-childleft{
            float: left;
            padding: 20px;
            height: 60px;
            text-align: center;
            line-height: 20px;
            border: 2px solid #f7f7f7;
            border-radius: 6px;
            .line-left{
             display: inline-block;
             font-weight: bold;
             font-size: 32px;
             padding: 15px;
            }
          }
          .list-tops{
              padding-left: 10px;
              display: inline-block;
              line-height: 30px;
           .list-text{
               color: #A3A3A3;
               font-size: 12px;
           }
          }
          .right-icon{
               float: right;
               font-size: 22px;
               margin-top:10px;
               i{
               background: #4C4D4C;
               color: #fff; 
               border-radius: 50%;
               }
           }
      }
  }
}
</style>

