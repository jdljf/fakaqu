<template>
    <div class="find-pwd-box">
        <BannerGround/>
        <Findpwd/>
    </div>
</template>

<script>
import BannerGround from "@/components/BannerGround.vue";
import Findpwd from "@/views/findpwd/findpwdBox.vue";
export default {
  name: "findpwd",
  components: {
    BannerGround,
    Findpwd
  },
};
</script>

<style scoped lang="scss">
.find-pwd-box {
  min-width: 1200px;
  position: relative;
  height: 1000px;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
