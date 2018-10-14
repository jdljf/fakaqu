<template>
    <div class="px-mb-link">
        <div style="margin-bottom: 1.2rem">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}"  @on-click-back="bannerBack"   @on-click-more="doMore"><span style="font-size: 0.32rem;">店铺支付链接</span></x-header>
            <div style="width:80%;margin: 0.4rem  auto; ">
                <!--<div class="short-link">-->
                    <!--<p>1.短链接(推荐)</p>-->
                    <!--<a href="http://t.cn/RFITJu1" target="_blank">http://t.cn/RFITJu1</a>-->
                    <!--<a href="javascript:;" class="share-btn" data-clipboard-text="http://t.cn/RFITJu1" @click="copyText">复制链接</a>-->
                    <!--<span>如果朋友圈等地方打广告请发这个链接</span>-->
                <!--</div>-->
                <div class="long-link">
                    <p>1.店铺总链接：</p>
                    <a :href=ShopUrl target="_blank" id="mb-link" style="color:#000;display: block;margin-top:20px;word-break: break-word">{{ShopUrl}}</a>
                    <a href="javascript:;" class="share-btn" data-clipboard-target="#mb-link" @click="copyText">复制链接</a>
                    <span>店铺总链接包含您店铺下所有的商品分类和商品信息</span>
                </div>
                <div class="pic-link">
                    <p>2、店铺总链接二维码：</p>
                    <vue-qr  :text=ShopUrl :backgroundImage="src"  height="200" width="200"/>
                    <span>二维码可以很方便的放在网店或者分享到手机客户端，鼠标右击即刻保存图片</span>
                </div>
            </div>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import TabBar from "@/components/mobile/TabBar";
import { XHeader } from "vux";
import VueQr from "vue-qr";
import Clipboard from "clipboard";
export default {
  name: "Link",
  data() {
    return {
      src: "",
      ShopUrl: ""
    };
  },
  components: {
    TabBar,
    XHeader,
    VueQr
  },
  created() {
    this.createLink();
  },
  methods: {
    createLink() {
      const host = window.location.host;
      const code = this.$store.state.user.link_code;
      this.ShopUrl = "http://" + host + "/paylink/" + code;
    },
    copyText() {
      this.$message({
        message: "链接复制成功",
        type: "success",
        customClass: "link-my-message",
      });
    },
    bannerBack() {
      this.$router.go(-1);
    },
    doMore() {}
  },
  mounted() {
    const clipboard = new Clipboard(".share-btn");
  }
};
</script>

<style  lang="scss">
.el-message{
  min-width: 90% !important;
}
.link-my-message {
    min-width: 90% !important;
}
.px-mb-link {
  font-size: 0.28rem;
  .short-link {
    p {
      display: inline-block;
    }
    a {
      font-size: 0.26rem;
      display: inline-block;
    }
    .share-btn {
      margin-top: 0.4rem;
      display: block;
      border-radius: 0.08rem;
      width: 2.4rem;
      height: 0.48rem;
      background: #409eff;
      color: #fff;
      line-height: 0.48rem;
      text-align: center;
    }
    span {
      display: inline-block;
      margin-top: 0.4rem;
    }
  }
  .long-link {
    margin-top: 0.4rem;
    p {
      display: inline-block;
    }
    a {
      font-size: 0.26rem;
      display: inline-block;
    }
    .share-btn {
      margin-top: 0.4rem;
      display: block;
      border-radius: 0.08rem;
      width: 2.4rem;
      height: 0.48rem;
      background: #409eff;
      color: #fff;
      line-height: 0.48rem;
      text-align: center;
    }
    span {
      display: inline-block;
      margin-top: 0.4rem;
    }
  }
  .pic-link {
    margin-top: 0.4rem;
    p {
      display: inline-block;
    }
    img {
      display: block;
    }
  }
}
</style>
