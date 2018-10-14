<template>
    <div class="error">
   <div class="top">
  <div class="titles">youkala</div>
  <img src="@/assets/404_images/4042.png" alt="">
</div>
<div class="center">
  <p class="p1">对不起！</p>
  <p class="p2">您要访问的页面暂时没有找到...</p>
    <p class="p2"><span class="djs" id="tiao">{{seconds}}</span><a href="javascript:countDown"></a>秒后将返回首页</p>
</div>
<div class="bottom">
  <router-link class="btn" to="/composite/user">返回</router-link>
</div>
    </div>
</template>
<style  src="@/assets/css/404.css"></style>
<style>
.titles{
    font-family: 'Weibei SC';
    font-size: .5rem;
    color: #83A2AF;
    padding-left: .3rem;
}
.btn{
    float: right;
    color: transparent;
    padding: .3rem;
}
.btn:hover{
    color: transparent
}
</style>

<script>

export default {
    data () {
        return {
            seconds:5,
        }
    },
    methods:{
    error() {
     var that=this; 
          var  nums=5;
          var timer = setInterval(function () {
            nums--;
            if (nums <= 0) {
              clearInterval(timer);
               that.$router.push({ path: "/composite/user" });
            } else {
                that.seconds=nums;
            }
               
          }, 1000)
    },  
    },
    mounted(){
       this.error();
    }
}
</script>


