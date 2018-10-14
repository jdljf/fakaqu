<template>
  <div class="first-load-page">
    <section class="home">
      <BannerGround />
      <div style="width: 1200px;margin: 0 auto" class="clearfix">
        <Solgan/>
        <div class="clearfix" style="width: 51%;float: left;">
          <Login/>
        </div>
      </div>
    </section>
    <section class="px-feature">
      <div class="feature-box">
        <div class="feature-icon">
          <div class="feature-img">
            <img src="../assets/images/icon_anquan.png" alt="">
          </div>
          <div class="feature-title">{{$t('section.one')}}</div>
          <div class="feature-detail">{{$t('section.ones')}}</div>
        </div>
      </div>
      <div class="feature-box">
        <div class="feature-icon">
          <div class="feature-img">
            <img src="../assets/images/icon_jiemian.png" alt="">
          </div>
        </div>
        <div class="feature-title">{{$t('section.two')}}</div>
        <div class="feature-detail">{{$t('section.twos')}}</div>
      </div>
      <div class="feature-box">
        <div class="feature-icon">
          <div class="feature-img">
            <img src="../assets/images/icon_zijin.png" alt="">
          </div>
        </div>
        <div class="feature-title">{{$t('section.three')}}</div>
        <div class="feature-detail">{{$t('section.threes')}}</div>
      </div>
      <div class="feature-box">
        <div class="feature-icon">
          <div class="feature-img">
            <img src="../assets/images/icon_feilv.png" alt="">
          </div>
        </div>
        <div class="feature-title">{{$t('section.four')}}</div>
        <div class="feature-detail">{{$t('section.fours')}}</div>
      </div>
      <div class="feature-box">
        <div class="feature-icon">
          <div class="feature-img">
            <img src="../assets/images/icon_gengxin.png" alt="">
          </div>
        </div>
        <div class="feature-title">{{$t('section.five')}}</div>
        <div class="feature-detail">{{$t('section.fives')}}</div>
      </div>
    </section>
    <h3 class="six-title">{{$t('step.line')}}</h3>
    <span class="six-line"></span>
    <section class="clearfix enjoy">
      <div class="left-pic ">

        <img src="../assets/images/1.jpg" alt="">
      </div>
      <div class="px-step">
        <div class="six-step">
          <ul>
            <li>
              <a href="javascript:;">
                <span class="step-btn"></span>
                <span class="px-dash"></span>
                <div class="step-icon"><img src="../assets/images/icon_zhuce.png" alt=""></div>
                <div class="step-num ">01</div>
                <div class="step-title ">{{$t('step.one')}}</div>
              </a>
            </li>

            <li>
              <a href="javascript:;">
                <span class="step-btn"></span>
                <span class="px-dash"></span>
                <div class="step-icon"><img src="../assets/images/icon_zhuce.png" alt=""></div>
                <div class="step-num ">02</div>
                <div class="step-title ">{{$t('step.two')}}</div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="step-btn"></span>
                <span class="px-dash"></span>
                <div class="step-icon"><img src="../assets/images/icon_bangdin.png" alt=""></div>
                <div class="step-num ">03</div>
                <div class="step-title ">{{$t('step.three')}}</div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="step-btn"></span>
                <span class="px-dash"></span>
                <div class="step-icon"><img src="../assets/images/icon_fabu.png" alt=""></div>
                <div class="step-num ">04</div>
                <div class="step-title ">{{$t('step.four')}}</div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="step-btn"></span>
                <span class="px-dash"></span>
                <div class="step-icon"><img src="../assets/images/icon_xiadan.png" alt=""></div>
                <div class="step-num ">05</div>
                <div class="step-title ">{{$t('step.five')}}</div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="step-btn"></span>
                <span class="px-dash"></span>
                <div class="step-icon"><img src="../assets/images/icon_fahuo.png" alt=""></div>
                <div class="step-num ">06</div>
                <div class="step-title ">{{$t('step.six')}}</div>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </section>
    <a href="" class="px-register2">{{$t('step.btn')}}</a>
    <section style="position: relative">
      <h3 class="six-title" style="position: relative">{{$t('pay.line')}}</h3>
      <div class="px-pic2">
        <img src="../assets/images/2.jpg" alt="">
      </div>
      <span class="six-line"></span>
    </section>
    <section class="pay-way">
      <div class="container clearfix">
        <div class="pay-box">
          <div class="pay-icon">
            <img src="../assets/images/Alipay.png" alt="">
          </div>
          <div class="pay-box-title">
            <span>{{$t('pay.one')}}</span>
          </div>
        </div>
        <div class="pay-box">
          <div class="pay-icon">
            <img src="../assets/images/txpay.png" alt="">
          </div>
          <div class="pay-box-title">
            <span>{{$t('pay.two')}}</span>
          </div>
        </div>
        <div class="pay-box">
          <div class="pay-icon">
            <img src="../assets/images/QQ.png" alt="">
          </div>
          <div class="pay-box-title">
            <span>{{$t('pay.three')}}</span>
          </div>
        </div>
        <div class="pay-box">
          <div class="pay-icon">
            <img src="../assets/images/bankpay.png" alt="">
          </div>
          <div class="pay-box-title">
            <span>{{$t('pay.four')}}</span>
          </div>
        </div>
        <div class="pay-box">
          <div class="pay-icon">
            <img src="../assets/images/cftpay.png" alt="">
          </div>
          <div class="pay-box-title">
            <span>{{$t('pay.five')}}</span>
          </div>
        </div>
        <div class="pay-box">
          <div class="pay-icon">
            <img src="../assets/images/onlinecard.png" alt="">
          </div>
          <div class="pay-box-title">
            <span>{{$t('pay.six')}}</span>
          </div>
        </div>
      </div>
    </section>
    <h3 class="six-title" style="margin-top: 150px">{{$t('about.about')}}</h3>
    <span class="six-line" style="margin-bottom: 110px;"></span>
    <div class="px-about">
      <span>{{$t('about.detail')}}</span>
    </div>
    <section class="px-about-detail">
      <div class="container clearfix">
        <div class="about-icon-detail">
          <div class="about-img"><img src="../assets/images/Integrity.png" alt=""></div>
          <div class="about-info">
            <span class="about-info-title">{{$t('about.one')}}</span>
            <p class="about-info-content">{{$t('about.ones')}}</p>
          </div>
        </div>
        <div class="about-icon-detail">
          <div class="about-img"><img src="../assets/images/Ingenuity.png" alt=""></div>
          <div class="about-info">
            <span class="about-info-title">{{$t('about.two')}}</span>
            <p class="about-info-content">{{$t('about.twos')}}</p>
          </div>
        </div>
        <div class="about-icon-detail">
          <div class="about-img"><img src="../assets/images/fk.png" alt=""></div>
          <div class="about-info">
            <span class="about-info-title">{{$t('about.three')}}</span>
            <p class="about-info-content">{{$t('about.threes')}}</p>
          </div>
        </div>
        <div class="about-icon-detail">
          <div class="about-img"><img src="../assets/images/justice.png" alt=""></div>
          <div class="about-info">
            <span class="about-info-title">{{$t('about.four')}}</span>
            <p class="about-info-content">{{$t('about.fours')}}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="contact-us clearfix">
      <span class="six-title contact-title" style="color: #ffffff">{{$t('contact.line')}}</span>
      <span class="six-line contact-line" style="background-color: #ffffff"></span>
      <div style="width: 1200px;margin: 0 auto" class="clearfix">
        <div class="contact-pic">
          <img src="../assets/images/3.png" alt="">
        </div>
        <div class="contact-way">
          <div class="contact-list">
            <div class="contact-icon1 contact-icon">
              <p class="contact-text">571717213</p>
            </div>
          </div>
          <div class="contact-list">
            <div class="contact-icon2 contact-icon">
              <p class="contact-text">0712-2555592</p>
            </div>
          </div>
          <div class="contact-list">
            <div class="contact-icon3 contact-icon">
              <p class="contact-text">{{$t('contact.one')}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="index-bottom">
      <div class="index-bottom-wrap clearfix">
        <div class="footer-menu-holder">
          <h4>{{$t('bottom.one')}}</h4>
          <ul class="footer-menu">
            <li>
              <a href="">{{$t('listOne.one')}}</a>
            </li>
            <li>
              <a href="">{{$t('listOne.two')}}</a>
            </li>
            <li>
              <a href="">{{$t('listOne.three')}}</a>
            </li>
          </ul>
        </div>
        <div class="footer-menu-holder">
          <h4>{{$t('bottom.two')}}</h4>
          <ul class="footer-menu">
            <li>
              <a href="">{{$t('listTwo.one')}}</a>
            </li>
            <li>
              <a href="">{{$t('listTwo.two')}}</a>
            </li>
            <li>
              <a href="">{{$t('listTwo.three')}}</a>
            </li>
            <li>
              <a href="">{{$t('listTwo.four')}}</a>
            </li>
          </ul>
        </div>
        <div class="footer-menu-holder">
          <h4>{{$t('bottom.three')}}</h4>
          <ul class="footer-menu">
            <li>
              <a href="">{{$t('listThree.one')}}</a>
            </li>
            <li>
              <a href="">{{$t('listThree.two')}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-icon">
        <ul class="clearfix bottom-icon-wrap">
          <li><img src="../assets/images/stphone.png" alt=""></li>
          <li><img src="../assets/images/stQQ.png" alt=""></li>
          <li><img src="../assets/images/stwx.png" alt=""></li>
        </ul>
      </div>
      <div>
        <span class="bottom-title" style="color: #ffffff">2018 发卡去 版权所有 粤ICP 备080346598</span>
      </div>
      <div class="bottom-img">
        <img src="../assets/images/firstbottom.png" alt="">
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import BannerGround from "@/components/BannerGround.vue";
import Solgan from "@/views/slogan/Solgan.vue";
import Login from "@/views/login/Login.vue";

export default {
  name: "home",
  components: {
    BannerGround,
    Solgan,
    Login
  },
  created() {
    // console.log(this.$router.options);
  }
};
</script>
<style  lang="scss">
.enjoy {
  display: flex;
  flex-direction: row;
}
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  width: 0;
  height: 0;
  clear: both;
}
.first-load-page {
  .home {
    min-width: 1200px;
    position: relative;
    height: 800px;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .px-feature {
    width: 1200px;
    /*height: 800px;*/
    background-color: #ffffff;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    .feature-box {
      width: 14%;
      float: left;
      padding: 50px 3% 0 3%;
      /*margin-left: 10px;*/
      .feature-title {
        color: #485371;
        font-size: 20px;
        font-family: "Microsoft YaHei";
      }
      .feature-detail {
        margin-top: 20px;
        line-height: 24px;
        color: #9ba7ca;
        font-size: 16px;
        font-family: "PingFang SC";
        width: 100%;
        /*height: 112px;*/
      }
    }
    .feature-img {
      transition: all 1s;
      img {
        width: 156px;
        height: 180px;
      }
    }
    .feature-img:hover {
      transform: rotateY(180deg);
    }
  }
  .six-title {
    z-index: 10;
    margin-top: 200px;
    display: block;
    /*height: 46px;*/
    font-size: 46px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    color: rgba(72, 83, 113, 1);
    line-height: 46px;
    text-align: center;
  }
  .six-line {
    display: block;
    background: rgba(51, 51, 51, 1);
    width: 120px;
    height: 6px;
    margin: 30px auto 150px auto;
  }
  .left-pic {
    float: left;
    flex: 1;
    img {
      // width: 543px;
      width: 100%;
      height: 501px;
    }
  }
  .px-step {
    float: left;
    margin-left: 50px;
    flex: 1.5;
    .six-step {
      width: 14px;
      height: 573px;
      background: rgba(249, 249, 255, 1);
      border-radius: 7px;
      ul {
        height: 573px;
        li {
          padding: 35px 0;
          position: relative;
          margin-left: -4px;
          a:hover .step-num {
            color: #2179ef;
          }
          a:hover .step-title {
            color: #2179ef;
          }
          a:hover .step-btn {
            transform: scale(1.2);
            background: #fff;
          }
          a:hover .step-icon {
            transform: scale(1.1);
            //  box-shadow: 0px 0px 3px 1px #ccc;
            background: #f6f6f6;
            border-radius: 50%;
          }
          a {
            display: inline-block;
            left: 0px;
            background: rgba(238, 244, 255, 1);
            border-radius: 50%;
            width: 25px;
            height: 25px;
            position: relative;
            .step-btn {
              position: absolute;
              display: inline-block;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              z-index: 100;
              width: 14px;
              height: 14px;
              background: rgba(24, 105, 255, 1);
              border-radius: 50%;
            }
            .px-dash {
              margin-left: 80px;
              display: inline-block;
              width: 260px;
              border: none;
              border-bottom: 2px dashed rgba(175, 180, 253, 1);
            }

            .step-icon {
              width: 82px;
              height: 82px;
              border-radius: 50%;
              position: absolute;
              left: 400px;
              top: -32px;
            }
            // .step-icon:hover +.step-num{
            //   color: #57A4FC !important;
            //   font-size: 30px;
            // }

            .step-num {
              width: 26px;
              font-size: 28px;
              font-weight: 400;
              color: rgba(72, 83, 113, 1);
              position: absolute;
              left: 500px;
              transition: all 0.3s;
              top: -5px;
            }
            .step-title {
              transition: all 0.3s;
              width: 120px;
              font-size: 28px;
              font-weight: 400;
              color: rgba(72, 83, 113, 1);
              position: absolute;
              left: 560px;
              top: -5px;
            }
          }
        }
      }
    }
    .px-step-num {
      float: left;
    }
  }
  .px-register2 {
    display: block;
    width: 300px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: rgba(24, 105, 255, 1);
    border-radius: 4px;
    box-shadow: 0px 8px 30px 0px rgba(177, 204, 255, 1);
    color: #fff;
    font-size: 24px;
    margin: 50px auto;
    transition: all 1s;
  }
  .px-register2:hover {
    transform: scale(1.2);
    box-shadow: 0px 0px 30px 2px #bdc5cf;
  }
  .px-pic2 {
    top: -200px;
    right: 0px;
    width: 490px;
    height: 502px;
    position: absolute;
    z-index: 8;
    img {
      width: 100%;
    }
  }
  .pay-way {
    width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    padding-top: 80px;
    padding-bottom: 60px;
    text-align: center;
    overflow: hidden;
    .container {
      width: 1200px;
      /*padding: 0 230px;*/
      /*margin-right: auto;*/
      /*margin-left: auto;*/
      .pay-box:hover {
        transform: scale(1.2);
        box-shadow: 0px 8px 20px 0px #9da5a6;
        border-radius: 50%;
      }
      .pay-box {
        display: inline-block;
        position: relative;
        float: left;
        width: 330px;
        height: 300px;
        border-radius: 4px;
        box-shadow: 0px 8px 20px 0px rgba(215, 234, 255, 1);
        margin-left: 50px;
        margin-bottom: 50px;
        transition: all 1s;
        cursor: pointer;

        .pay-icon {
          margin: 50px auto;
          img {
          }
        }
        .pay-box-title {
          span {
            width: 69px;
            height: 23px;
            font-size: 24px;
            font-family: SimHei;
            font-weight: 400;
            color: rgba(113, 170, 250, 1);
          }
        }
      }
    }
  }
  .px-about {
    width: 1160px;
    height: 69px;
    line-height: 69px;
    text-align: center;
    font-size: 20px;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    color: rgba(116, 132, 174, 1);
    line-height: 48px;
    margin: 0 auto;
  }
  .px-about-detail {
    background-color: #ffffff;
    /*padding: 80px 80px;*/
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    .container {
      width: 1200px;
      .about-icon-detail:hover .about-info > .about-info-title {
        color: #5ba8fc;
        font-size: 30px;
      }
      .about-icon-detail:hover .about-info > .about-info-content {
        color: #000;
      }
      .about-icon-detail {
        float: left;
        padding: 50px 50px;
        .about-img {
          float: left;
          width: 160px;
          height: 180px;
        }

        .about-info {
          float: left;
          margin-left: 50px;
          font-family: MicrosoftYaHei;
          .about-info-title {
            display: inline-block;
            transition: all 1s;
            border: none;
            text-align: left;
            border-bottom: 2px solid #485371;
            padding: 20px 0;
            width: 120px;
            height: 23px;
            font-size: 24px;
            font-weight: 400;
            color: rgba(72, 83, 113, 1);
            line-height: 30px;
            margin-left: -140px;
          }
          .about-info-content {
            transition: all 1s;
            margin-top: 30px;
            text-align: left;
            width: 257px;
            font-size: 18px;
            font-weight: 400;
            color: rgba(155, 167, 202, 1);
            line-height: 30px;
          }
        }
      }
    }
  }
  .contact-us {
    position: relative;
    /*width: 1920px;*/
    /*height: 1080px;*/
    background: url("../assets/images/bottom.png");
    background-size: 100% 100%;
    .contact-title {
      margin-top: 50px;
      padding-top: 100px;
    }
    .contact-pic {
      float: left;
      /*margin-left: 200px;*/
      /*margin-bottom: 100px;*/
      /*width: 506px;*/
      /*height: 420px;*/
      img {
        width: 506px;
        height: 420px;
      }
    }
    .contact-way {
      float: left;
      margin-left: 270px;
      margin-bottom: 100px;
      .contact-list {
        padding: 20px 0;
        div {
          position: relative;
          width: 90px;
          height: 90px;
          /*background: rgba(255, 255, 255, 1);*/
          border-radius: 50%;
          p {
            position: absolute;
            white-space: nowrap;
            top: 30px;
            left: 120px;
            font-size: 24px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 30px;
          }
        }
        .contact-icon:hover {
          transform: scale(1.1);
        }
        .contact-icon:hover .contact-text {
          color: #2dcbfa;
        }
        .contact-icon1 {
          transition: all 1s;
          background-image: url("../assets/images/QQ1.png");
        }
        .contact-icon2 {
          transition: all 1s;
          background-image: url("../assets/images/phone2.png");
        }
        .contact-icon3 {
          transition: all 1s;
          background-image: url("../assets/images/local2.png");
        }
      }
    }
  }
  .index-bottom {
    /*width: 1920px;*/
    /*height: 634px;*/
    background: rgba(20, 34, 119, 1);
    .index-bottom-wrap {
      width: 1200px;
      margin: 0 auto;
    }
    .footer-menu-holder {
      float: left;
      /*padding: 50px;*/
      /*margin:0  50px;*/
      width: 33%;
      text-align: center;
      h4 {
        /*width: 75px;*/
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(178, 185, 224, 1);
        line-height: 72px;
      }
      .footer-menu {
        li {
          a {
            width: 68px;
            height: 17px;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: rgba(104, 120, 218, 1);
            line-height: 54px;
          }
        }
      }
    }
    .bottom-icon {
      .bottom-icon-wrap {
        width: 360px;
        margin: 0 auto;
      }
      ul {
        li {
          float: left;
          padding: 50px 30px;
          img {
            width: 60px;
            height: 60px;
            background: rgba(109, 122, 202, 1);
            border-radius: 50%;
          }
        }
      }
    }
    .bottom-title {
      margin: 0 auto;
      width: 284px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(58, 74, 174, 1);
      line-height: 72px;
      display: block;
      height: 46px;
      color: #485371;
      text-align: center;
    }
    .bottom-img {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
