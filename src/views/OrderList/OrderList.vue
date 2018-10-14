<template>
    <div class="px-list-detail">

        <el-card v-if="kamiinfos" class="kamiinfo">
            <div slot="header" class="clearfix">
                <span>卡密信息</span>
                <i class="el-icon-circle-close close-tog" @click="closekami" style="float:right;cursor:pointer" />
            </div>
            <div class="it">
                <span>创建时间:</span>{{orderkami.created_at}}</div>
            <div class="it">
                <span>订单号:</span>{{orderkami.no}}</div>
            <div class="it" v-for="(item,index) in orderkami.kami_info.content" :key="index">
                <span>卡密({{index + 1}}):</span>
                <span>{{item}}</span>
            </div>
            <div class="it">
                <span>订单金额:</span>{{orderkami.origin_amount}}</div>
            <div class="it">
                <span>支付金额:</span>{{orderkami.payment_method}}</div>
            <div class="it">
                <span>订单状态:</span>
                <el-button style="color:#55A3FC" type="text" size="small" v-if="orderkami.paid_at!=null">已支付</el-button>
                <el-button style="color:#F55A53" type="text" size="small" v-else>未支付</el-button>
            </div>

        </el-card>
        <span class="list-label">
            <i class="el-icon-date"></i> {{iconTitle}}</span>

        <el-table :data="ordertable" border empty-text="暂无结果" style="width: 100%;border-radius: 8px;border-color:rgba(50, 155, 244, 1); ">
            <el-table-column prop="created_at" :label="datatable.created_at" width="150">
            </el-table-column>
            <el-table-column prop="no" :label="datatable.no" width="200">
            </el-table-column>
            <el-table-column v-if="storagehide" key="storage" width="100" :label="datatable.kami_info" prop="payment_method">

            </el-table-column>
            <el-table-column v-if="orderhide" key="order" width="250" :label="datatable.kami_info" prop="link_code">
                <template slot-scope="scope">
                    <el-button type="text" size="small">卡号:{{scope.row.items.link_code}}</el-button>
                </template>
            </el-table-column>
            <el-table-column v-if="phonehide" key="phone" width="100" :label="datatable.kami_info" prop="payment_method">

            </el-table-column>

            <el-table-column width="150" :label="datatable.total_amount" prop="origin_amount">
            </el-table-column>
            <el-table-column width="150" :label="datatable.payment_method" prop="amount_format">
            </el-table-column>
            <el-table-column prop="data" :label="datatable.status">
                <template slot-scope="scope">
                    <div v-if="orderhide" key="order">
                        <el-button style="color:#55A3FC" type="text" size="small" @click="totousu(scope.row)" v-if="scope.row.paid_at!=null">已支付
                            <span class="comp">投诉此单号</span>
                        </el-button>
                        <el-button style="color:#F55A53" type="text" size="small" v-else>未支付</el-button>
                    </div>
                    <div v-if="phonehide" key="phone">
                        <el-button style="color:#55A3FC" type="text" size="small" @click="gotokami(scope.row)">查看卡密</el-button>
                    </div>
                    <div v-if="storagehide" key="storage">
                        <el-button style="color:#55A3FC" type="text" size="small" v-if="scope.row.paid_at!=null">已支付</el-button>
                        <el-button style="color:#F55A53" type="text" size="small" v-else>未支付</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <p>
            <span>{{orderListTitle}}</span>{{titleContent}}</p>
        <p>
            <span>{{orderListDescription}}</span>{{titleDescription}}</p>

    </div>
</template>

<script>
import api from "@/axios/api";

export default {
    name: "OrderList",
    data() {
        return {
            // ordertable:[],
            orderkami: {
                created_at: "",
                no: "",
                origin_amount: "",
                payment_method: "",
                paid_at: ""
            },
            kamiinfos: false,
            orderhide: false,
            phonehide: false,
            storagehide: true,
            datatable: {
                created_at: "订单时间",
                no: "订单号",
                kami_info: "支付方式",
                total_amount: "订单金额",
                payment_method: "支付金额",
                status: "订单状态"
            },
            threeLabel: "支付方式",
            iconTitle: "订单记录",
            orderListTitle: "缓存方式查询:",
            orderListDescription: "注意事项说明:",
            titleContent:
                "订单提交时浏览器会自动保存您的订单信息，不同浏览器可能显示结果不同。",
            titleDescription:
                "订单查询仅能查询最近30天的数据，可以查询到该订单的所有交易记录。"
        };
    },
    props: {
        fatherSelect: {
            type: String,
            default: () => {
                return "session";
            }
        },
        ordertable: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },

    methods: {
        totousu(el) {
            var Complaint = JSON.stringify(el);
            this.$router.push({
                path: "/tousu",
                query: { Complaint: Complaint }
            });
        },
        closekami() {
            this.kamiinfos = false;
        },
        gotokami(el) {
            var that = this;
            that.orderkami = el;
            that.kamiinfos = true;
        }
    },
    watch: {
        fatherSelect(newValue) {
            if (newValue === "session") {
                this.kamiinfos = false;
                this.phonehide = false;
                this.orderhide = false;
                this.storagehide = true;
                this.orderkami = {};
                this.iconTitle = "订单记录";
                this.orderListTitle = "缓存方式查询:";
                this.orderListDescription = "注意事项说明:";
                this.datatable.created_at = "订单时间";
                this.datatable.no = "订单号";
                this.datatable.kami_info = "支付方式";
                this.datatable.total_amount = "订单金额";
                this.datatable.payment_method = "支付金额";
                this.datatable.status = "订单状态";
                this.titleContent =
                    "订单提交时浏览器会自动保存您的订单信息，不同浏览器可能显示结果不同。";
                this.titleDescription =
                    "订单查询仅能查询最近30天的数据，可以查询到该订单的所有交易记录。";
            } else if (newValue === "order") {
                this.orderkami = {};
                this.kamiinfos = false;
                this.phonehide = false;
                this.storagehide = false;
                this.orderhide = true;
                this.threeLabel = "卡密信息";
                this.iconTitle = "查询结果";
                this.orderListTitle = "订单号码查询：";
                this.orderListDescription = "注意事项说明：";
                this.titleContent =
                    "订单号是您在提交支付的时候，系统自动分配的一个交易凭证，输入对应的订单号即可查询该订单的详情。";
                this.titleDescription =
                    "订单查询仅能查询最近30天的数据，通过 订单编号 可以查询到该订单的交易记录。";
                this.datatable.created_at = "订单时间";
                this.datatable.no = "订单号";
                this.datatable.kami_info = "卡密";
                this.datatable.total_amount = "订单金额";
                this.datatable.payment_method = "支付金额";
                this.datatable.status = "订单状态";
            } else {
                this.orderhide = false;
                this.phonehide = true;
                this.storagehide = false;
                this.threeLabel = "卡密信息";
                this.iconTitle = "查询结果";
                this.orderListTitle = "联系方式查询：";
                this.orderListDescription = "注意事项说明：";
                this.titleContent =
                    "订单提交时您所预留的联系方式（QQ号码、手机号码、E-mail）订单查询凭证信息。（推荐使用此方式查询）";
                this.titleDescription =
                    "订单查询仅能查询最近30天的数据，通过 联系方式 可以查询到该订单的所有交易记录。";
                this.datatable.created_at = "订单时间";
                this.datatable.no = "订单号";
                this.datatable.kami_info = "支付方式";
                this.datatable.total_amount = "订单金额";
                this.datatable.payment_method = "支付金额";
                this.datatable.status = "订单信息";
            }
        }
    }
};
</script>
<style>
.kamiinfo .el-card__body {
    padding: 0;
}
</style>

<style  lang="scss">
.px-list-detail {
    box-sizing: border-box;
    margin: 40px auto 0px auto;
    width: 1100px;
    .popContainer {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 3;
    }
    .kamiinfo {
        z-index: 5;
        position: absolute;
        left: 0;
        right: 10%;
        bottom: 0;
        top: 0;
        margin: auto;
        width: 60%;
        padding: 20px;
        height: 400px;
        overflow-y: scroll;
        box-shadow: 0px 0px 3px 2px #e3e3e3;

        .clearfix {
            line-height: 20px;
            font-weight: bold;
        }
        .it {
            padding: 10px;
        }
    }
    .kamiinfo::-webkit-scrollbar {
        display: none;
    }
    .list-label {
        display: block;
        margin-bottom: 50px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(72, 83, 113, 1);
        i {
            width: 26px;
            height: 22px;
        }
    }
    .comp {
        background: #4e8df1;
        padding: 8px 10px 5px 10px;
        color: #fff;
        display: inline-block;
        border-radius: 5px;
        margin-top: 5px;
        margin-left: 5px;
    }
    .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cel {
        text-align: center;
        padding: 0;
    }
    .el-table--scrollable-x .el-table__body-wrapper {
        /*overflow: hidden;*/
        max-height: 500px;
        overflow: auto;
        overflow-x: hidden;
    }
    .el-table thead tr {
        th {
            font-family: MicrosoftYaHei;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            background: linear-gradient(
                180deg,
                rgba(81, 174, 253, 1),
                rgba(50, 155, 244, 1)
            );
            &:nth-child(6) {
                border-right: none;
            }
        }
    }
    .el-table--border {
        border: 1px solid rgba(50, 155, 244, 1);
    }
    p {
        padding: 15px 0;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(72, 83, 113, 1);
        span {
            color: #000;
        }
        /*&:nth-child(1) {*/
        /*}*/
    }
}
</style>
