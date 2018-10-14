<template>
  <div id="Managementindex">
    <div v-show="contenttshow" class="mask"></div>
    <el-card v-show="contenttshow" class=" ariteshow">
      <div slot="header" class="clearfix">
        <span>{{titles}}</span>
        <el-button @click="closetog" style="float: right; padding: 3px 0" type="text">
          <i style="color:#000" class="el-icon-error"></i>
        </el-button>
      </div>
      <div class="text item" v-html="content">
      </div>
    </el-card>
    <div class="M-index-arr">
      <div class="M-index-top">
        {{$t('index.title')}}
        <span class="shopid">{{userinfos.username}}</span>{{$t('index.wecome')}}！{{$t('index.shopid')}}:
        <span class="shopid">{{userinfos.id}}</span>
      </div>
      <div class="M-index-text">
        <img class="commimg" src="../../assets/images/user.png" />
        <div class="userinfo">
          <div class="user-ift">账号完整度:
            <el-progress class="info-width" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          </div>
          <div class="user-icon">
            <!-- <span class="user-img"><img class="iconimg" src="../../assets/images/phone.png"/><span>手机认证</span></span> -->
            <!-- <span class="user-img"><img class="iconimg" src="../../assets/images/box.png"/><span>邮箱认证</span></span> -->
            <router-link to="/composite/certification">
              <span class="user-img"><img class="iconimg" src="../../assets/images/name.png" />
                <span>{{$t('index.realname')}}</span>
              </span>
            </router-link>
          </div>
        </div>
        <!--<img class="erweimaimg" src="../../assets/images/erweima.jpg"/>-->
        <div class="Recently-time">
          <!-- <span class="Recently-btn">最近登录:2018-09-10 09:25:12</span>
          <span class="Recently-btn">登录Ip:12321231212</span> -->
        </div>
      </div>

    </div>
    <!-- 模块2 -->
    <div class="M-index-right">
      <div class="M-index-top">
        <span class="shopid"> {{$t('index.announcement')}}</span>
        <span class="more" @click="toannouncement"> {{$t('index.more')}}</span>
      </div>
      <div class="m-right-text">

        <ul class="m-right-text-ul">
          <li class="m-right-li" v-for="(items,index) in articleLists" v-if='index<=4' :key="items.id"><img class="iconimg" src="../../assets/images/phone.png" />
            <span @click="toggleshow(items)" class="m-span">{{items.title}}</span>
            <span class="m-span-time">{{items.created_at}}</span>

          </li>
        </ul>
      </div>
    </div>
    <!-- 下面模板 -->
    <!-- <progressarr></progressarr> -->
    <el-card class="box-card">
      <div class="box-card-top">
        <img class="commimgs bgc" src="../../assets/images/sky.png" />
        <div class="box-card-right">
          <span class="moneys coloc">{{totalmoney}}</span>
          <span class="money-text">{{$t('index.usermoney')}}(元)</span>
        </div>
      </div>
      <div class="box-card-text">
        <div class="box-card-text-child">{{$t('index.noauto')}}:
          <b>{{$t('index.full')}}{{money.hand_settle}}{{$t('index.yuan')}}</b>
        </div>
        <div class="box-card-text-child">{{$t('index.autowithdrawal')}}:
          <b>{{$t('index.full')}}{{money.auto_settle}}{{$t('index.yuan')}}</b>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-top">
        <img class="commimgs bga" src="../../assets/images/num.png" />
        <div class="box-card-right">
          <span class="moneys coloa">{{todaymoney}}</span>
          <span class="money-text">{{$t('index.todaymoney')}}</span>
        </div>
      </div>
      <div class="box-card-text">
        <div class="box-card-text-child">{{$t('index.todaydeal')}}:
          <b>{{today.count}}{{$t('index.bi')}}</b>
        </div>
        <div class="box-card-text-child">{{$t('index.todayka')}}:
          <b>{{today.count}}{{$t('index.zhang')}}</b>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-top">
        <img class="commimgs bgb" src="../../assets/images/chat.png" />
        <div class="box-card-right">
          <span class="moneys colob">{{yesterdaymoney}}</span>
          <span class="money-text">{{$t('index.yestmoney')}}</span>
        </div>
      </div>
      <div class="box-card-text">
        <div class="box-card-text-child">{{$t('index.yestdeal')}}:
          <b>{{yesterday.count}}{{$t('index.bi')}}</b>
        </div>
        <div class="box-card-text-child">{{$t('index.yestka')}}:
          <b>{{yesterday.kami_count}}{{$t('index.zhang')}}</b>
        </div>
      </div>
    </el-card>
    <el-card class="box-card last-box">
      <div class="box-card-top">
        <img class="commimgs bgd" src="../../assets/images/sky.png" />
        <div class="box-card-right">
          <span class="moneys colod">{{total_withdraw}}</span>
          <span class="money-text">{{$t('index.cumulative')}}</span>
        </div>
      </div>
      <div class="box-card-text">
        <div class="box-card-text-child">{{$t('index.agocumulative')}}:
          <b>{{withdraw.last_withdraw_date}}</b>
        </div>
        <div class="box-card-text-child">{{$t('index.agomoney')}}:
          <b>{{last_withdraw_money}}</b>
        </div>
      </div>
    </el-card>

    <el-col style="width:100%">
      <!-- <div id="chartLine" style="height:400px;margin-top:30px;"></div> -->
    </el-col>

  </div>
</template>
<script>
import modaindex from "./modaindex";
export default modaindex;
</script>
<style lang="scss">
@keyframes indexinit {
  0% {
    transform: translateY(-200px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.bgc {
  background: #d64d31;
}
.bga {
  background: #5ba7fc;
}
.bgb {
  background: #e31519;
}
.bgd {
  background: #85d64d;
}
.coloa {
  color: #5ba7fc;
}
.colob {
  color: #e31519;
}
.coloc {
  color: #d64d31;
}
.colod {
  color: #85d64d;
}
.iconimg {
  width: 20px;
  height: 20px;
  padding-right: 15px;
}
.commimg {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid #ebeaff;
  box-sizing: border-box;
}
#Managementindex {
  animation: indexinit 1s;
  width: 100%;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
  }
  .ariteshow {
    position: absolute;
    z-index: 15;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;

    height: 400px;
  }
  .M-index-arr {
    border-radius: 3px;
    width: 70.8%;
    display: inline-block;
    background-color: #fff;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .M-index-top {
      padding: 20px;
      background-color: #fff;
      color: #000;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #e3e3e3;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      .shopid {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 20px;
      }
    }
    .M-index-text {
      padding: 20px;

      .userinfo {
        display: inline-block;
        vertical-align: top;
        padding-left: 20px;
        .user-ift {
          display: inline-block;
          .info-width {
            display: inline-block;
            width: 300px;
            .el-progress-bar__inner {
              background: #494f51;
            }
          }
        }
        .user-icon {
          margin-top: 15px;
          cursor: pointer;
          .user-img {
            margin-right: 30px;
            color: #000;
            span {
              vertical-align: super;
            }
          }
        }
      }
      .erweimaimg {
        width: 140px;
        // height: 90px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .Recently-time {
        color: #fff;
        margin-left: 20%;
        font-size: 12px;
        .Recently-btn {
          margin-right: 20px;
        }
      }
    }
  }
  .M-index-right {
    width: 28%;
    background-color: #fff;
    float: right;
    border-radius: 3px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .M-index-top {
      padding: 20px;
      background-color: #fff;
      color: #000;
      font-size: 19px;
      font-weight: bold;
      border-bottom: 1px solid #e3e3e3;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;

      .shopid {
        // color: #7c80e7;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
      }
      .more {
        float: right;
        margin-right: 5px;
      }
    }
    .m-right-text {
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      .m-right-li {
        padding: 10px 10px 5px 10px;
        color: #000;
        border-bottom: 1px solid #f7f7f7;
        font-size: 14px;
      }
      .m-span {
        vertical-align: super;
      }
      .m-span-time {
        vertical-align: super;
        float: right;
        color: #ccc;
      }
    }
  }
  .last-box {
    margin-right: 0px !important;
  }
  .box-card {
    width: 24%;
    margin-top: 13px;
    float: left;
    margin-right: 1%;
    .box-card-top {
      display: flex;
      flex-direction: row;
      padding-bottom: 30px;
      .commimgs {
        width: 70px;
        height: 70px;
        overflow: hidden;
        border-radius: 50%;
      }
      .box-card-right {
        flex: 1;
        font-size: 12px;
        font-weight: bold;
        vertical-align: top;
        margin-top: 30px;
        float: right;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 0px;
        line-height: 0px;
      }
      .moneys {
        font-size: 25px;
      }
      .money-text {
        font-size: 14px;
        font-weight: bold;
        vertical-align: top;
        margin-top: 30px;
        display: inline-block;
      }
    }
    .box-card-text {
      padding-top: 10px;
      margin: 10px;
      border-top: 1px solid #f6f6f6;
      display: flex;
      flex-direction: column;
      .box-card-text-child {
        line-height: 30px;
      }
    }
  }
}
</style>
