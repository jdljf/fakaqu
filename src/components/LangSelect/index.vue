<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
      <div>
        <i class="el-third-icon-yuyanqiehuan international-icon" style="font-size: 24px;"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="language==='cn'" command="cn">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language;
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      this.$message({
        message: "switch language success",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.international {
  top: 41px;
  right: 70px;
  position: absolute;
}
.international-icon {
  cursor: pointer;
}
</style>
