<template>
    <div class="solgan-box">
        <h1 class="solgan-title">{{$t('solgan.solganTitle') }}</h1>
        <p class="solgan-content">{{ $t('solgan.solganContent')}}</p>
        <router-link to="/register"><a href="javascript:;" class="solgan-btn">{{$t('solgan.buttonText')}}</a></router-link>
    </div>
</template>

<script>
export default {
  name: "Solgan",
  data() {
    return {
      solganTitle: "全新购卡体验",
      solganContent:
        "致力于解决虚拟商品的快捷寄售服务，为商户及其买家提供，便捷、绿色、安全、快速的销售和购买体验。",
      buttonText: "商户注册"
    };
  }
};
</script>

<style scoped lang="scss">
@keyframes fadeInLeftBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.solgan-box {
  animation: fadeInLeftBig 1s;
  width: 48%;
  float: left;
  /*height: 600px;*/
  /*margin-left: 8%;*/
  color: #fff;
  margin-top: 100px;
  .solgan-title {
    font-size: 40px;
  }
  .solgan-content {
    line-height: 30px;
    margin-top: 50px;
  }
  .solgan-btn {
    border-radius: 5px;
    display: block;
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #468ae5;
    font-size: 20px;
    background-color: #fff;
    margin-top: 50px;
    transition: all 0.7s;
  }
  .solgan-btn:hover {
    transform: translateY(-4px);
    background: #49a2fc;
    color: #fff;
  }
}
</style>
