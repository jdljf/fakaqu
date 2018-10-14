<template>
    <div></div>
</template>

<script>
import api from "@/axios/api";
export default {
  name: "Auth",
  data() {
    return {
      AuthCode: "",
      pageFlag: "0",
      code: ""
    };
  },
  watch: {
    $route: {
      handler(newValue) {
        if (newValue) {
          this.AuthCode = newValue.query.code;
          const query = newValue.query.state;
          this.pageFlag = query.substr(query.length - 1, 1);
          this.code = query.substr(0, query.length - 1);
          if (this.AuthCode === "") {
            this.$router.push({ name: "home" });
            return;
          } else {
            const data = { params: { code: this.AuthCode } };
            this.getAuthOpenId(data);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getAuthOpenId(data) {
      api.getOpenid(data).then(res => {
        const data = res.data;
        if (data.result === 1) {
          this.$store.dispatch("setOpenId", data.data.id);
          if (this.pageFlag === "1") {
            this.$router.push({
              name: "payShop",
              params: { linkcode: this.code }
            });
          } else {
            this.$router.push({
              name: "pay-no",
              params: { linkcode: this.code }
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
