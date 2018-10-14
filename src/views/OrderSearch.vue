<template>
  <div class="order-bg">

    <BannerGround/>
    <el-tabs v-model="selectedTab" type="border-card" class="order-search" style="width: 1150px;margin: 60px auto" @tab-click="getCurClick">
      <el-tab-pane :label="$t('order.text')" name="session">
        <OrderList :fatherSelect="setChild" :ordertable="selectedStorage" v-show="setChild === 'session'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('order.text1')" name="order">
        <div v-if="!codeshow" class="search-box">
          <div style="width: 350px;display: inline-block;padding: 0 15px 0 50px;">
            <el-input v-model="orderNumber" :placeholder="$t('order.input')"></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="codeshows">立即查询</el-button>
        </div>
        <div v-if="codeshow" class="code-yz">
          <input type="text" placeholder="请输入验证码继续查询" class="yz_input" @blur="checkLpicma" v-model="picLyanzhengma">
          <input type="button" id="code" @click="createCode" class="verification1" v-model="checkCode" />
          <el-button type="primary" icon="el-icon-search" @click="getSoldInfo(0)">立即查询</el-button>
        </div>
        <OrderList :fatherSelect="setChild" :ordertable="selectedAry" v-show="setChild === 'order'" />
      </el-tab-pane>
      <el-tab-pane :label="$t('order.text2')" name="phone">
        <div v-if="!codeshow" class="search-box">
          <div style="width: 350px;display: inline-block;padding: 0 15px 0 50px;">
            <el-input v-model="orderNumber" :placeholder="$t('order.input1')"></el-input>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="codeshows">立即查询</el-button>
        </div>
        <div v-if="codeshow" class="code-yz">
          <input type="text" placeholder="请输入验证码继续查询" class="yz_input" @blur="checkLpicma" v-model="picLyanzhengma">
          <input type="button" id="code" @click="createCode" class="verification1" v-model="checkCode" />
          <el-button type="primary" icon="el-icon-search" @click="getSoldInfo(1)">立即查询</el-button>
        </div>
        <OrderList :fatherSelect="setChild" :ordertable="selectedPhone" v-show="setChild === 'phone'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BannerGround from "@/components/BannerGround.vue";
import OrderList from "@/views/OrderList/OrderList.vue";
import api from "@/axios/api";
export default {
    name: "OrderSearch",
    components: {
        BannerGround,
        OrderList
    },

    data() {
        return {
            orderNumber: "",
            selectedTab: "session",
            setChild: "session",
            selectedAry: [],
            selectedStorage: [],
            selectedPhone: [],
            checkCode: "",
            picLyanzhengma: "",
            codeshow: false
        };
    },
    methods: {
        createCode() {
            var code = "";
            var codeLength = 5;
            var random = new Array(
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z"
            );
            for (var i = 0; i < codeLength; i++) {
                var index = Math.floor(Math.random() * 36);
                code += random[index];
            }
            this.checkCode = code;
        },
        checkLpicma() {
            this.picLyanzhengma.toUpperCase();
            if (this.picLyanzhengma == "") {
                this.$message({
                    message: "请输入验证码",
                    type: "warning"
                });
            } else if (this.picLyanzhengma.toUpperCase() != this.checkCode) {
                this.$message({
                    message: "验证码不正确",
                    type: "warning"
                });
                this.createCode(); //刷新验证码
                this.picLyanzhengma = "";
            } else {
                //输入正确时
                return true;
            }
        },
        codeshows() {
            if (this.orderNumber != "") {
                this.codeshow = true;
                this.selectedStorage = [];
                this.selectedAry = [];
                this.selectedPhone = [];
                this.createCode();
            }
        },
        getSoldInfo(type) {
            const data = { params: { keyword: this.orderNumber, type: type } };

            if (this.checkLpicma() == true) {
                api.searchOrder(data).then(res => {
                    const data = res.data;
                    if (data.result === 1) {
                        if (type === 0) {
                            this.selectedAry.push(data.data);
                        } else {
                            this.selectedPhone = data.data;
                        }
                    } else {
                        this.$message({
                            message: "未查到该记录",
                            type: "warning"
                        });
                    }
                });
                this.picLyanzhengma = "";
                this.checkCode = "";
                this.codeshow = false;
            } else {
                this.$message({
                    message: "请输入正确操作",
                    type: "error"
                });
            }
        },
        getCurClick(item) {
            this.orderNumber = "";
            this.setChild = item.name;
            this.codeshow = false;
            this.selectedAry = [];
            this.selectedPhone = [];
            // if (this.setChild == "session") {
            //     if (!localStorage.Order_Storage) {
            //         this.selectedStorage = [];
            //     } else {
            //         this.selectedStorage = JSON.parse(
            //             localStorage.Order_Storage
            //         );
            //     }
            // }
        }
    },
    created() {
        this.createCode();
        if (!localStorage.Order_Storage) {
            this.selectedStorage = [];
        } else {
            this.selectedStorage = JSON.parse(localStorage.Order_Storage);
        }
    }
};
</script>

<style lang="scss">
.order-bg {
    /*height: 100%;*/
    height: 1150px;
    background: url("../assets/images/bg.png") no-repeat;
    background-size: 100% 100%;
    .el-tabs--border-card {
        border: none;
    }
    .order-search {
        margin: 60px auto 0 auto;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        box-shadow: 0px 4px 30px 0px rgba(30, 76, 178, 1);
        .el-tabs__header {
            .el-tabs__nav {
                .el-tabs__item {
                    width: 385px;
                    height: 80px;
                    text-align: center;
                    line-height: 80px;
                    background: rgba(49, 127, 227, 1);
                    font-size: 20px;
                    font-family: MicrosoftYaHei;
                    font-weight: bold;
                    color: #fff;
                }
                .is-active {
                    color: #409eff;
                    background-color: #fff;
                }
            }
        }
        .search-box {
            margin-top: 30px;
        }
        .code-yz {
            margin: 30px 50px;
            .yz_input {
                width: 350px;
                padding-left: 20px;
                line-height: 40px;
                border-radius: 3px;
                color: #ccc;
                font-size: 14px;
                border: 1px solid #e3e3e3;
            }
            .verification1 {
                color: #fff;
                padding: 8px 20px 10px;
                background: url("../assets/images/codeimg.jpg") no-repeat;
                background-size: 100% 100%;
                margin: 5px;
                border: none;
                font-size: 1.2rem;
                font-family: "Wawati SC";
            }
        }
    }
}
</style>
