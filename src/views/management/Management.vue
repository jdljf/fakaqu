<template>
    <div id="management">
      <el-card>
     <div slot="header" class="clearfix">
     <span>店铺链接</span>
     </div>
    <div class="management-link">
     <!--<el-form ref="form" :model="managementform" class="managementform" label-width="80px">-->
     <!--<el-form-item label="总链开关:">-->
      <!--<el-switch @change='switchs'  active-text="启用" inactive-color="#C8C5C4"  active-color="#399ADA" inactive-text="禁用" v-model="managementform.delivery"></el-switch>-->
    <!--</el-form-item>-->
    <!--<span class="switch-text">注：关闭链接后，店铺域名将无法下单，请谨慎操作！</span>-->
    <!--</el-form>-->
   <!--<div class="Short-link">-->
     <!--<span>1.短链接(推荐):<a class="a-lik" href="https://www.baidu.com">www.baidu.com</a>-->
       <!--<button @click="clonelink" class="clone-link" data-clipboard-text="https://www.baidu.com">-->
       <!--复制链接-->
       <!--</button>-->
     <!--</span>-->
    <!--<div class="link-text">如果朋友圈等地方打广告请发这个链接</div>-->
   <!--</div>-->

     <div class="Short-link">
     <span>1.店铺总链接：<a :href=ShopUrl target="_blank" id="link" style="color:#000;" class="a-lik">{{ShopUrl}}</a>
     <button @click="clonelink" class="clone-link"  data-clipboard-target="#link" >
       复制链接
       </button>
       </span>
    <div class="link-text">店铺总链接包含您店铺下所有的商品分类和商品信息</div>
   </div>

   <div class="Short-link">
     <span>2.店铺总链接二维码<br>
          <vue-qr  :text=ShopUrl class="erweim" :backgroundImage="src"  height="200" width="200"/>
         <!--<img v-if="imgshow"  src="../../assets/images/erweima.jpg"/>-->
     <!--<img v-if="secondimg" class="erweim" src="../../assets/images/user.png"/>-->
     </span>

    <div class="link-text">二维码可以很方便的放在网店或者分享到手机客户端，鼠标右击即刻保存图片</div>
   </div>

    </div>
      </el-card>
    </div>
</template>
<script>
import VueQr from "vue-qr";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      managementform: {
        delivery: true
      },
      imgshow: true,
      secondimg: false,
      ShopUrl: "",
      src: ""
    };
  },
  created() {
    this.createLink();
  },
  methods: {
    createLink() {
      const host = window.location.host;
      const code = this.$store.state.user.link_code;
      this.ShopUrl = "http://"+host + "/paylink/" + code;
    },
    switchs(callback) {
      if (this.managementform.delivery == false) {
        this.secondimg = true;
        this.imgshow = false;
      } else {
        this.secondimg = false;
        this.imgshow = true;
      }
    },
    clonelink() {
      this.$message({
        message: "链接复制成功",
        type: "success",
        duration: 3000
      });
    }
  },
  components: {
    VueQr,
  },

  mounted() {
    const clipboard = new Clipboard(".clone-link");
  }
};
</script>


<style lang="scss" scoped>
#management {
  padding: 20px;
  .clearfix {
    font-weight: bold;
  }
  .management-link {
    .managementform {
      border-bottom: 1px solid #f6f6f6;
      padding-bottom: 20px;
    }
    .switch-text {
      font-size: 12px;
      color: #ccc;
    }
    .Short-link {
      margin-top: 30px;
      font-weight: bold;
      padding-bottom: 20px;
      border-bottom: 1px solid #f6f6f6;
      .link-text {
        color: #ccc;
        font-size: 12px;
        padding-top: 20px;
      }
      .a-lik {
        margin-left: 20px;
        color: #fb2938;
      }
      .clone-link {
        padding: 6px 10px;
        background: #3b9ddb;
        border-radius: 10px;
        border: 0px;
        cursor: pointer;
        color: #fff;
        margin-left: 20px;
      }
      .erweim {
        width: 20%;
      }
    }
  }
}
</style>
