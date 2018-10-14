<template>
    <div>
        <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore">{{bannerTitle}}</x-header>
    </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "MobileHeader",
  components: {
    XHeader
  },
  props: {
    bannerTitle: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  methods: {
    doMore() {},
    bannerBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
