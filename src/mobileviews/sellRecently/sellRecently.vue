<template>
    <div class="sell-recent-box">
        <div class="sell-recent-title">
            <x-header :right-options="{showMore: true}" :left-options="{preventGoBack :true}" @on-click-back="bannerBack" @on-click-more="doMore">
                <span style="font-size: 0.32rem;">最近卖出卡密</span>
            </x-header>
        </div>
        <el-form ref="recentform" :model="recentform">
            <el-form-item>
                <el-select ref="recentData" style="width:84%;margin-left:8%;margin-top:0.3rem" v-model="recentform.category_id" placeholder="请选择" size="medium" @change="getCurChange">
                    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select style="width:84%;margin-left:8%;margin-top:0.3rem" v-model="recentform.kw_type" placeholder="请选择">
                    <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                    <!--<el-option label="订单号" value="1"></el-option>-->
                    <!--<el-option label="联系方式" value="2"></el-option>-->
                    <!--<el-option label="商品名称" value="3"></el-option>-->
                    <!--<el-option label="商品卡号" value="4"></el-option>-->
                </el-select>
                <el-col style="width:84%;margin-left:8%;margin-top:0.3rem">
                    <el-input v-model="recentform.kw" placeholder="请输入订单号或者联系方式"> </el-input>
                </el-col>
                <el-col style="margin-left:8.3%;margin-top:0.3rem">
                    <el-button type="primary" size="mini" round @click="searchRecent" icon="el-icon-search">立即查询</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <el-card class="togglecard" v-if="toggleshow" style="padding:0.1rem">
            <div slot="header" class="clearfix">
                <span class="title">查看卡密</span>
                <i class="el-icon-circle-close close-tog" @click="closetog" style="float:right;cursor:pointer" />
            </div>
            <div v-for="(items,index) in link_code" :key="items" class="kami-show">
                <div class="toggle-time">
                    卡密{{index+1}}：
                    <span class="a-lik" :href="items">{{items}}</span>
                </div>
                <button @click="clonelink" class="clone-link" :data-clipboard-text="items">
                    复制卡密
                </button>
            </div>

        </el-card>
        <div class='popContainer' v-if="toggleshow"></div>
        <divider>已卖出卡密列表</divider>
        <div id="sell-list-wrap">
            <div class="sell-list" v-for="(item,index) in tableData" :key="index">
                <div class="name">
                    {{item.items.title}}
                </div>
                <div class="sell-list-title">
                    <a href="javascript:void(0)" @click="toggleshows(item.kami_info)">查看卡密({{item.kami_info.count}})</a>
                    <a class="method">{{item.payment_method}}</a>
                </div>
                <p class="sell-list-phone">
                    <span href="javascript:void(0)">联系方式：{{item.credence}}</span>
                    <span class="price"> +{{item.order_amount}}元</span>
                </p>
                <div class="sell-list-con">

                    <p>订单编号：{{item.no}}
                        <br>订单时间：{{item.paid_at}}</p>
                    <div id="clear" style="clear:both"></div>
                </div>
            </div>
            <div class="scroll-loading" v-show="loadingTag">{{loadingText}}</div>
        </div>
        <TabBar></TabBar>

    </div>
</template>

<script>
import _ from "lodash";
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
    name: "SellRecently",
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
            link_code: {},
            toggleshow: false,
            recentform: {
                category_id: "",
                paid_at: "",
                kw_type: "",
                kw: "",
                page: 1
            },
            selectOption: [
                {
                    value: 1,
                    label: "订单号"
                },
                {
                    value: 2,
                    label: "联系方式"
                },
                {
                    value: 3,
                    label: "商品名称"
                },
                {
                    value: 4,
                    label: "商品卡号"
                }
            ],
            options: [],
            selectedId: 0,
            total: 0,
            value: "",
            loadingTag: false,
            loadingText: "正在加载数据，请稍候...",
            tableData: []
        };
    },
    watch: {
        $route: {
            handler(newValue) {
                const queryId = newValue.query.category_id;
                const kw = newValue.query.kw;
                const kw_type = newValue.query.kw_type;
                if (
                    queryId !== undefined ||
                    kw !== undefined ||
                    kw_type !== undefined
                ) {
                    const data = {
                        params: {
                            category_id: queryId,
                            kw: kw,
                            kw_type: kw_type,
                            page: this.recentform.page++
                        }
                    };
                    this.recentform.kw = kw;
                    this.getRecent(data);
                }
            },
            immediate: true
        }
    },
    methods: {
        bannerBack() {
            this.$router.go(-1);
        },
        doMore() {},
        getCurChange(change) {
            this.selectedId = change;
        },
        searchRecent() {
            this.recentform.page = 1;
            const nameKey = _.trim(this.recentform.kw);
            const newQuery = {
                category_id: this.selectedId,
                kw: nameKey,
                kw_type: this.recentform.kw_type,
                page: this.recentform.page
            };
            this.$router.push({
                name: this.$route.name,
                query: Object.assign({}, this.$route.query, newQuery)
            });
        },
        getRecent(data) {
            api.getrecent(data).then(res => {
                const data = res.data;
                if (data.data && data.data.length > 0) {
                    this.tableData = data.data;
                    this.total = data.total;
                    this.loadingTag = false;
                } else {
                    let url = window.location.search;
                    this.recentform.category_id = this.$route.query.category_id;
                    this.recentform.kw = this.$route.query.kw;
                    this.recentform.kw_type = this.$route.query.kw_type;
                    this.tableData = [];
                    this.loadingTag = true;
                    this.loadingText = "暂无数据";
                }
            });
        },
        getSelectData() {
            api.getAllSort().then(res => {
                const data = res.data;
                if (data.result === 1) {
                    this.options = data.data;
                    const query = this.$route.query;
                    if (Object.keys(query).length > 0) {
                        const temp = this.options.filter(o => {
                            return o.id === Number(query.category_id);
                        });
                        this.value = temp[0].name;
                    }
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
                api
                    .getrecent({
                        params: {
                            page: this.recentform.page,
                            kw_type: this.recentform.kw_type,
                            kw: this.recentform.kw
                        }
                    })
                    .then(res => {
                        const response = res.data;
                        if (response.data && response.data.length > 0) {
                            response.data.forEach(element => {
                                that.tableData.push(element);
                            });
                            that.recentform.page++;
                            that.loadingTag = false;
                        } else {
                            that.loadingTag = true;
                            that.loadingText = "暂无数据";
                        }
                    });
            }
        },
        toggleshows(value) {
            this.link_code = value.content;
            this.toggleshow = true;
        },
        closetog(e) {
            this.toggleshow = false;
        },
        clonelink() {
            this.$message({
                type: "success",
                message: "复制卡密成功",
                duration:1000,
            });
        }
    },
    mounted() {
        const clipboard = new Clipboard(".clone-link");
        window.addEventListener("scroll", this.handleScroll);
        this.getSelectData();

        if (window.location.search == "") {
            api.getrecent(this.recentform).then(res => {
                const data = res.data;
                if (data.data && data.data.length > 0) {
                    this.tableData = data.data;
                    this.total = data.total;
                    this.recentform.page++;
                } else {
                    this.loadingTag = true;
                    this.loadingText = "暂无数据";
                }
            });
        } else {
            let url = window.location.search;
            this.recentform.category_id = this.$route.query.category_id;
            this.recentform.kw = this.$route.query.kw;
            this.recentform.kw_type = this.$route.query.kw_type;
            this.selectedId = this.$route.query.category_id;
        }
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style lang="scss" scoped>
.sell-recent-box {
    overflow: hidden;
    width: 100%;
    #sell-list-wrap {
        margin-top: 0.2rem;
        margin-bottom: 1rem;
        .sell-list {
            display: block;
            width: 100%;
            margin: 0 auto;
            font-size: 0.25rem;
            border-top: 0.02rem solid #e0e1ff;
            .name {
                padding: 4% 4% 0 0.4rem;
                color: #56a5fc;
                font-weight: 600;
            }
            .sell-list-phone {
                width: 92%;
                padding: 6% 4% 2% 0.4rem;
                color: #666;
                .price {
                    float: right;
                    color: #409eff;
                    font-weight: 700;
                    padding-right: 0.4rem;
                }
            }
            .sell-list-title {
                width: 92%;
                padding: 4% 4% 0 0.4rem;
                color: #000;
                font-weight: bold;
                i {
                    color: #000;
                }
                .method {
                    float: right;
                    padding-right: 0.4rem;
                    color: #666;
                }
                // .price {
                //     float: right;
                //     padding-right: 0.4rem;
                // }
            }
            .sell-list-con {
                padding: 0 4% 4% 0.4rem;
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
    .popContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 501;
    }
    .togglecard {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        margin: auto;
        width: 6rem;
        height: 6rem;
        overflow-y: scroll;
        font-size: 0.25rem;
        z-index: 502;
        background-color: #f8f8f8;
        .toggle-time {
            display: inline-block;
        }
        .clone-link {
            margin-top: 0.1rem;
            padding: 0.08rem 0.15rem;
            border: none;
            background: #188cf8;
            cursor: pointer;
            border-radius: 0.03rem;
            color: #fff;
        }
    }
}
</style>
