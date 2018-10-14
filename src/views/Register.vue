<template>
    <div class="px-register">
        <BannerGround/>
        <RegisterBox/>
    </div>
</template>

<script>
import BannerGround from "@/components/BannerGround.vue";
import RegisterBox from "@/views/register/RegisterBox.vue";
export default {
  name: "Register",
  components: {
    BannerGround,
    RegisterBox
  },
};
</script>

<style scoped lang="scss">
.px-register {
  min-width: 1200px;
  position: relative;
  height: 1000px;
  background: url("../assets/images/bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
