<template>
  <el-container  style="overflow: hidden;">
  <el-header><span class="head-tit">fakaqu</span>
  <div class="head-right">
  <span class="head-center">
      <router-link to="/"><span class="head-txt">{{$t('project.Home')}}</span></router-link>
       <router-link to="/Contact"><span class="head-txt" >{{$t('project.contactus')}}</span></router-link><router-link to="/order"><span class="head-txt"><i style="margin-right:6px;" class="el-icon-tickets"></i>{{$t('project.Orderracking')}}</span></router-link>
  <router-link to="/shop/sitemessage"><span class="head-txt"><i style="margin-right:6px;" class="el-icon-view"></i>{{$t('project.Stationnews')}}</span>
  </router-link>
  </span>
  <el-dropdown>
  <el-button type="primary" class="avater-click">
    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu class="avater-c-show"  slot="dropdown">
     <router-link to="/composite/progress"><el-dropdown-item>{{$t('project.Information')}}</el-dropdown-item></router-link>
     <router-link to="/composite/changepassword"><el-dropdown-item>{{$t('project.changepass')}}</el-dropdown-item></router-link>
    <el-dropdown-item ><span @click="logout">{{$t('project.signout')}}</span></el-dropdown-item>
  </el-dropdown-menu>
  </el-dropdown>
  </div>
  </el-header>
  <el-container>
       <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="active" :collapse="collapse" background-color="#1E1E26"
            text-color="#7D7D7D" active-text-color="#fff"  unique-opened router>
            <template v-for="item in items" >
                <template v-if="item.subs" >
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i style="color:#7D7D7D" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item  v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item  :index="item.index" :key="item.index">
                        <i style="color:#7D7D7D" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
      <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
  </el-container>
</el-container>
</template>

<script>
import merchantindex from "@/views/merchantindex/merchantindex.vue";
import navlist from "./navList";
export default {
  data() {
    return {
      username: "",
      active: "user",
      tagsList: [],
      collapse: false
    };
  },
  mixins: [navlist],
  watch: {
    $route: {
      handler(route) {
        this.active = route.path;
      },
      immediate: true
    }
  },
  computed: {},
  created() {},
  methods: {
    logout() {
      this.$store.commit("loggedOut");
    }
  },
  mounted() {
    var userinfo = JSON.parse(localStorage.getItem("userinfos"));
    this.username = this.$store.state.user.username;
  },
  components: {
    merchantindex
  }
};
</script>

<style scoped>
.el-menu-item:hover {
  color: #fff !important;
}
.el-header {
  background-color: #2c2d3e;
  color: #333;
  line-height: 80px;
  height: 80px !important;
  text-align: center;
}
.head-tit {
  color: #fff;
  font-size: 30px;
  float: left;
  font-family: STHupo;
}
.head-center {
}
.avater-click {
  margin-left: 8rem;
  margin-top: 1rem;
  color: #f9f9f9;
  background-color: #44444e;
  border-radius: 20px;
  cursor: pointer;
  border: 0px solid #000;
}
.avater-click:hover {
  background: #363436;
}
.avater-c-show {
  margin-top: 0px;
}
.head-right {
  text-align: right;
  margin-right: 5px;
}
.head-txt {
  color: #f9f9f9;
  margin-left: 3rem;
  font-size: 1rem;
}
.head-txt:hover {
  color: #b7c8cd;
  cursor: pointer;
}
.el-container {
  /*box-shadow: -5px 0px 6px 4px #e2eefd;*/
}
.el-submenu__title {
  color: #ffffff;
  font-size: 1rem;
}
.el-submenu__title:hover {
  background-color: #b7c8cd;
}
.el-submenu .el-menu {
  background: pink !important;
}
.el-aside {
  width: 200px;
  /* background: red; */
}
.el-menu {
  /* background: #24a5f4; */
  /*border-left: 3px solid #383639;*/
  border-right: solid 0px #e6e6e6;
}
.el-menu-item:hover {
  background: #838685 !important;
}

.el-menu-item {
  background: red;
  color: #eeebec;
}
.el-main {
  height: 100vh;
  background-color: #ebeaff;
}
.el-notification.right {
  position: fixed;
  width: 30%;
  top: 76px;
  right: 10px;
}
.none {
  display: none;
}

.el-aside {
  color: #fff;
}
.sidebar {
  min-height: 100vh;
  min-width: 210px;
  background-color: #2c2d3e;
  box-sizing: border-box;
}
.content-box {
  background: #eaedee;
  width: 100%;
  padding: 20px;
}
</style>
