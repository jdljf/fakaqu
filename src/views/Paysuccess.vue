<template>
    <div class="px-success">
        <div class="header">
            <span class="h-tit">fakaqu</span>
        </div>
        <div class="s-context">
            <div class="s-text">
                <img src="../assets/images/success.png" class="icon-img" />
                <span class="c-title">购买成功</span>
                <div class="order-success">
                    <span>您已成功
                        <b class="em">购买{{orderdatas.title}}</b>,</span>
                    <span>消费
                        <b class="em">{{orderdatas.total_amount}}</b>元</span>
                </div>
                <div class="s-records">
                    <div class="s-recordli">
                        <b>订单:</b>
                        <span class="order-info">{{orderdatas.no}}</span>
                    </div>
                    <div class="s-recordli" v-for="(item,$index) in kamiarr" :key="item">
                        <b>卡密({{$index+1 }}) :</b>
                        <span class="order-info">{{item}}</span>
                    </div>
                    <div class="s-recordli">
                        <b>购买时间:</b>
                        <span class="order-info">{{orderdatas.paid_at}}</span>
                    </div>
                </div>
                <div class="s-btn">
                    <button class="gotoshop" @click="gotoshop">继续购买</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            kamiarr: [],
            orderdatas: {
                title: "",
                link_code: ""
            }
        };
    },
    methods: {
        gotoshop() {
            this.$router.push({
                path: "paylinks/" + this.orderdatas.link_code
            });
        }
    },
    mounted() {
        this.orderdatas = JSON.parse(this.$route.query.orderdatas);
        log("orderdatas", this.orderdatas);
        this.orderdatas.title = this.orderdatas.items.title;
        this.orderdatas.link_code = this.orderdatas.items.link_code;
        this.kamiarr = this.orderdatas.kami_info.content;
    }
};
</script>

<style scoped lang="scss">
.px-success {
    width: 100%;
    position: relative;
    height: 100vh;
    background: #f5f5f5;
    .header {
        line-height: 90px;
        color: #fff;
        font-family: "Weibei SC";
        font-weight: bold;
        font-size: 34px;
        background: #317fe3;
        .h-tit {
            padding-left: 20px;
            font-family: STHupo;
        }
    }

    .s-context {
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        margin: auto;
        background: #fff;
        color: #2b2d2d;
        box-shadow: 1px 1px 3px 2px #ccc;
        width: 70%;
        height: 70%;
        .s-text {
            margin: 5% auto;
            width: 40%;
            padding: 10px;
            padding-top: 3%;
            .icon-img {
                vertical-align: middle;
                width: 10%;
            }
            .c-title {
                margin-left: 2%;
                font-weight: bold;
                font-family: "Weibei SC";
                font-size: 25px;
            }
            .order-success {
                margin-top: 20px;
                .em {
                    padding-left: 3px;
                    padding-right: 3px;
                    color: #e6272d;
                }
            }
            .s-records {
                max-height: 250px;
                overflow-y: scroll;
                margin-top: 20px;
                .s-recordli {
                    padding-top: 20px;
                    .order-info {
                        margin-left: 10px;
                    }
                }
            }
            .s-records::-webkit-scrollbar {
                display: none;
            }
            .s-btn {
                padding-top: 20px;
                text-align: center;
                .gotoshop {
                    padding: 10px 20px;
                    background: #4aa3f4;
                    border: none;
                    box-shadow: 1px 1px 3px 1px #ccc;
                    color: #fff;
                    border-radius: 3px;
                }

                .s-btn {
                    padding-top: 20px;
                    text-align: center;
                    .gotoshop {
                        padding: 10px 20px;
                        background: #4aa3f4;
                        border: none;
                        box-shadow: 1px 1px 3px 1px #ccc;
                        color: #fff;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
}
</style>
