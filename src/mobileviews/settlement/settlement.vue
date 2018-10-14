<template>
    <div class="settlement-box">
        <div class="settlement-box-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore">
                <span style="font-size: 0.32rem;">结算记录</span>
            </x-header>
        </div>
        <el-col style="width:100%;margin-bottom:0.4rem;font-size:0.25rem" :span="8">
            <el-card style="color:#56A5FC;line-height:0.35rem" shadow="always">
                结算状态公供参考，点击流水号或状态可以看到备注信息，已结算款项最迟在当天下午5时之前到账。
            </el-card>
        </el-col>
        <div id="settlement-list-wrap">
            <div class="settlement-list" v-for="(item,index) in settlementList" :key="index">
                <div class="settlement-list-title">
                    流水号：{{item.no}}
                </div>
                <div class="settlement-list-item">
                    {{item.type===0?"自动结算":"手动结算"}}
                    <span class="price base">+{{item.money}}</span>
                </div>
                <div class="settlement-list-item time">
                    {{item.created_at}}
                    <span class="status base">{{item.status === 0?"未结算":"已结算"}}</span>
                </div>
            </div>
            <div class="scroll-loading" v-show="loadingTag">{{loadingText}}</div>
        </div>
        <TabBar></TabBar>

    </div>
</template>

<script>
import api from "@/axios/api";
import MbHeader from "@/components/mobile/MobileHeader.vue";
import Clipboard from "clipboard";
import { XHeader } from "vux";
import { Group } from "vux";
import { Divider } from "vux";
import TabBar from "@/components/mobile/TabBar";
import { Alert } from "vux";
import { Confirm } from "vux";
export default {
    name: "settlement",
    components: {
        MbHeader,
        Group,
        Divider,
        TabBar,
        Alert,
        Confirm,
        XHeader
    },
    data() {
        return {
            loadingTag: false,
            loadingText: "正在加载数据，请稍候...",
            settlementList: [],
            page: 1
        };
    },
    methods: {
        doMore() {},
        bannerBack() {
            this.$router.go(-1);
        },
        getSettlement() {
            api.getsettlement({ params: { page: this.page } }).then(res => {
                const response = res.data;
                if (response.data && response.data.length > 0) {
                    this.settlementList = response.data;
                    this.page++;
                    this.loadingTag = false;
                } else {
                    this.loadingTag = true;
                    this.loadingText = "暂无数据";
                }
            });
        },
        handleScroll() {
            let that = this;
            var elementScrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            var elementOffsetHeight = document.documentElement.clientHeight;
            var elementScrollHeight = document.body.scrollHeight;
            if (
                elementScrollHeight - elementScrollTop - elementOffsetHeight <
                    50 &&
                !this.loadingTag
            ) {
                this.loadingTag = true;
                api.getsettlement({ params: { page: this.page } }).then(res => {
                    const response = res.data;
                    if (response.data && response.data.length > 0) {
                        response.data.forEach(element => {
                            that.settlementList.push(element);
                        });
                        that.page++;
                        that.loadingTag = false;
                    } else {
                        that.loadingTag = true;
                        that.loadingText = "暂无数据";
                    }
                });
            }
        }
    },
    mounted() {
        this.getSettlement();
        window.addEventListener('scroll',this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll',this.handleScroll);
    }
};
</script>


<style scoped lang="scss">
.settlement-box {
    #settlement-list-wrap {
        margin-top: 0.2rem;
        margin-bottom: 1rem;
        .settlement-list {
            display: block;
            width: 100%;
            margin: 0 auto;
            font-size: 0.25rem;
            margin-bottom: 0.2rem;
            .settlement-list-title {
                width: 92%;
                border-top: 0.02rem solid #e0e1ff;
                padding: 4%;
                color: rgb(86, 165, 252);
                font-weight: bold;
                i {
                    color: #000;
                }
                .base {
                    float: right;
                }
            }
            .settlement-list-item {
                width: 92%;
                padding: 0.1rem 4%;
                color: #666;
                // font-weight: bold;
                font-size: 0.32rem;
                i {
                    color: #000;
                }
                .base {
                    float: right;
                }
                .price {
                    color: #00802f;
                    font-weight: bold;
                }
                &.time {
                    font-size: 0.25rem;
                }
            }
            .settlement-list-con {
                padding: 0 4% 4% 4%;
                line-height: 24px;
                color: #666;
                p:nth-child(1) {
                    float: left;
                }
            }
        }
        .scroll-loading {
            position: relative;
            width: 100%;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            overflow: hidden;
            color: #999;
            font-size: 0.28rem;
        }
    }
}
</style>
