<template>
  <nav class="banner-ground clearfix">
     <div class="px-logo">
        <router-link to="/"><span>fakaqu</span></router-link>
      </div>
    <ul class="px-banner">
        <router-link to="/"><li><a href="javascript:;">{{ $t('navbar.home') }}</a></li></router-link>
        <router-link to="/Zizhi"><li><a href="javascript:;">{{ $t('navbar.qualification') }}</a></li></router-link>
        <router-link to="/news"><li><a href="javascript:;">{{ $t('navbar.app') }}</a></li></router-link>
        <router-link to="/news"><li><a href="javascript:;">{{ $t('navbar.help') }}</a></li></router-link>
        <router-link to="/Contact"><li><a href="javascript:;">{{ $t('navbar.contact') }}</a></li></router-link>
        <router-link to="report"><li ><a href="javascript:;">{{ $t('navbar.complaints') }}</a></li></router-link>
      </ul>
        <ul class="px-zc clearfix">
          <router-link to="register"><li class="px-register">{{ $t('navbar.user') }}</li></router-link>

            <router-link to="order">
              <li class="px-search">{{ $t('navbar.order') }}</li>
              </router-link>
            <!--<router-link to="report">-->
              <!--<li class="px-search">{{ $t('navbar.complaints') }}</li>-->
              <!--</router-link>-->
       </ul>
  </nav>
</template>

<script>
import LangSelect from "@/components/LangSelect";
export default {
  name: "BannerGround",
  data() {
    return {
      activeIndex: "1",
      ordershow: true,

    };
  },
  components: {
    LangSelect
  },
  mounted() {},
  methods: {
    // toOrder(){
    //  this.$router.push({ path: "/order"});
    //  this.ordershow=false;
    //  log('this.ordershow',this.ordershow);
    // },
    // toReport(){
    //  this.$router.push({ path: "/report" });
    //  this.ordershow=true;

    // },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.banner-ground {
  width: 1200px;
  margin: 0 auto;

  .px-logo,
  .px-banner,
  .px-zc {
    float: left;
    height: 96px;
  }
  .px-logo {
      width: 150px;
    /*padding: 0px 90px 0 0px;*/
    cursor: pointer;
    span {
      width: 112px;
      height: 31px;
      text-align: center;
      line-height: 96px;
      font-size: 34px;
      font-family: STHupo;
      color: rgba(255, 255, 255, 1);
    }
  }
  .px-banner {
    padding: 0 0 0 0px;
    width: 750px;
    li {
      a {
        color: #fff;
      }
      float: left;
      padding: 0 20px;
      text-align: center;
      line-height: 96px;
      &:hover {
        border-bottom: 2px solid #fff;
      }
    }
  }
  .px-zc {
    width: 300px;
    /*padding: 0 0 0 0px;*/
    /*position: absolute;*/
    /*right: 70px;*/
    li {
      position: relative;
      border: 1px solid #fff;
      cursor: pointer;
      top: 30px;
      float: left;
      width: 110px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      border-radius: 5px;
      margin-left: 30px;
    }
    .px-register {
      background-color: #468ae5;
      color: #fff;
      transition: all 0.5s;
    }
    .px-register:hover {
      transform: translateY(-2px);
      box-shadow: 0px 0px 13px 1px #29aff6;
    }
    .px-search {
      background-color: #fff;
      color: #468ae5;
      transition: all 0.5s;
    }
    .px-search:hover {
      transform: translateY(-2px);
      box-shadow: 0px 0px 13px 1px #29aff6;
    }
  }
}
</style>
