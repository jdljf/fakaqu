<template>
    <div class="Contact"> 
        <div class="box-shad" style="">
        <BannerGround />
       </div>
       <div class="conact-center">
       <div class="title">联系我们 打开你的成功之门</div>
       <div class="conact-text">
        <span class="concat-left">
            <img style="height:250px;width:250px" src="../assets/images/erweima.jpg"/>
        </span>
        <span class="conact-right">
            <span style="padding-top:10px;"><img style="height:40px;width:40px; vertical-align: middle;margin-right:10px;" src="../assets/images/qqs.png"/><span>1234523422</span></span>
            <span><img style="height:40px;width:40px; vertical-align: middle;margin-right:10px;" src="../assets/images/phones.png"/><span>15734243223</span></span>
            <span><img style="height:40px;width:40px; vertical-align: middle;margin-right:10px;" src="../assets/images/address.png"/><span>中国湖南江西河北</span></span>

        </span>

       </div>
       </div>
    <div>
    </div>
    </div>
</template>
<script>
import BannerGround from "@/components/BannerGround.vue";

export default {
  data() {
    return {
      input: "",
      shows: false,
      textshow: ""
    };
  },
  components: {
    BannerGround
  },
  methods: {
   
  }
};
</script>
<style lang="scss" scoped>
@keyframes lasts {
  from {
   opacity: 0;
  }

  to {
  opacity: 1;
  }
}
.Contact {
  height: 100vh;
  background:url('../assets/images/conact.jpeg') no-repeat;
  background-size: 100% 100%;  
  position: relative;
  .box-shad{
   background:#398AE2;
   z-index:10
  }
  .conact-center{
      animation:lasts  4s;
      width:50%;
      margin: 90px 25%;
      height: 400px;
      background: transparent;
      box-shadow: 0 0 60px #999;
      position: absolute;
      z-index: 3;
    .title{
        text-align: center;
        font-size:28px;
        font-weight: 100;
        color: #fff;
        padding-top:40px;
    }
    .conact-text{
      display: flex;
      flex-direction: row;
      span{
          
          padding-top:40px;
          flex: 1;
      }
      .concat-left{
      text-align: center;
      }
      .conact-right{
          display: flex;
          flex-direction: column;
          color: #fff;
      }
    }
  }
}
 .Contact:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    background: inherit;
    filter: blur(5px);
    z-index: 2;
}
</style>


