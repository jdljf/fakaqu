<template>
    <div>
        <div v-show="passhow" class="mask"></div>
        <div v-show="passhow" class="pwdshows">
            <div style="text-align:right;width:100%;padding-bottom:10px;">
                <i @click="closepwd" class="el-icon-error" />
            </div>
            <el-form :model="pwdform" ref="pwdform" label-width="100px" class="demo-ruleForm">
                <el-form-item label="安全密码" prop="password" :rules="[
      { required: true, message: '密码不能为空'}]">
                    <el-input type="password" v-model="pwdform.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('pwdform')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="px-pl-wrap">
            <div>
                <p class="px-pl-title">{{$t("product.title")}}</p>
                <div style="padding: 20px">
                    <el-select v-model="value" :placeholder="$t('product.select')" size="medium" @change="getCurChange">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <div style="max-width: 220px;margin-left: 20px;display: inline-block">
                        <el-input v-model="goods_name" :placeholder="$t('product.select1')"></el-input>
                    </div>
                    <div style="display: inline-block;margin-left: 20px;">
                        <a href="javascript:;" @click="searchProduct" class="product-search" style="margin-top: 20px;">{{$t("product.btn1")}}</a>
                        <a href="javascript:;" @click="addProduct" class="product-search" style="margin-top: 20px;margin-left: 20px;">{{$t("product.btn2")}}</a>
                        <a href="javascript:;" @click="resetProduct" class="product-search" style="margin-top: 20px;margin-left: 20px;">{{$t("product.btn3")}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-pl-bottom">
            <el-table :data="tableData" v-loading="loading" stripe border style="width: 100%;">
                <el-table-column prop="goods_name" :label=label1>
                    <template slot-scope="{row,$index}">
                        <span>{{row.goods_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="market_price" :label=label2 width="150">
                    <template slot-scope="{row,$index}">
                        <span>{{row.market_price}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" :label=label3 width="100">
                    <template slot-scope="{row,$index}">
                        <el-button size="mini" :type="Number(row.status)?'success':'danger'" @click="handleShelf($index, row) ">{{Number(row.status)?"上架中":"已下架"}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" :label=label4 width="100">
                    <template slot-scope="{row,$index}">
                        <span>{{row.stock}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sold" :label=label5 width="100">
                    <template slot-scope="{row,$index}">
                        <span>{{row.sold}}</span>
                    </template>
                </el-table-column>
                <el-table-column :label=label6 width="500">
                    <template slot-scope="{row,$index}">
                        <el-button size="mini" type="warning" @click="handleEdit($index, row) ">{{$t("product.btn4")}}</el-button>
                        <el-button size="mini" type="primary" @click="handleOpenLink($index, row)">{{$t("product.btn5")}}</el-button>
                        <el-button size="mini" type="primary" @click="handleAddProduct($index, row)">{{$t("product.btn9")}}</el-button>
                        <el-button size="mini" type="danger" @click="handleStock($index, row)">{{$t("product.btn6")}}</el-button>
                        <el-button size="mini" type="success" @click="handleSold($index, row)">{{$t("product.btn7")}}</el-button>
                        <el-button size="mini" type="danger" @click="handel($index, row)">{{$t("product.btn8")}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pr-list-pagination">
                <el-pagination @current-change="getPageNumber" background :page-size="20" layout="total ,prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="商品分类链接" :visible.sync="dialogLink">
            <div class="short-link">
                <p>1.短链接(推荐)</p>
                <a :href="shortUrl" target="_blank">{{shortUrl}}</a>
                <a href="javascript:;" class="share-btn" data-clipboard-text="http://t.cn/RFITJu1" @click="copyText">复制链接</a>
                <span>如果朋友圈等地方打广告请发这个链接</span>
            </div>
            <div class="long-link">
                <p>2.店铺总链接：</p>
                <a :href=ShopUrl target="_blank" id="link" style="color:#000;">{{ShopUrl}}</a>
                <a href="javascript:;" class="share-btn" data-clipboard-target="#link" @click="copyText">复制链接</a>
                <span>店铺总链接包含您店铺下所有的商品分类和商品信息</span>
            </div>
            <div class="pic-link">
                <p>3、店铺总链接二维码：</p>
                <!--<img src="../../assets/images/get.png" alt="" width="180px" height="180px">-->
                <vue-qr :text=ShopUrl :backgroundImage="src" height="200" width="200" />
                <span>二维码可以很方便的放在网店或者分享到手机客户端，鼠标右击即刻保存图片</span>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLink = false">取 消</el-button>
                <el-button type="primary" @click="dialogLink = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import VueQr from "vue-qr";
import api from "@/axios/api";
import Clipboard from "clipboard";
import _ from "lodash";
export default {
    name: "ProductList",
    components: { VueQr },
    data() {
        return {
            edits: 0,
            del: 0,
            delarow: {},
            ids: "",
            indexs: 0,
            passhow: false,
            second_confirm: 0,
            pwdform: {
                password: ""
            },
            src: "",
            ShopUrl: "",
            shortUrl:"",
            label1: this.$t("product.name"),
            label2: this.$t("product.price"),
            label3: this.$t("product.status"),
            label4: this.$t("product.stock"),
            label5: this.$t("product.sold"),
            label6: this.$t("product.manager"),
            dialogLink: false,
            loading: true,
            curPage: "1",
            total: 0,
            selectedId: 0,
            goods_name: "",
            options: [],
            value: "",
            tableData: []
        };
    },
    watch: {
        $route: {
            handler(newValue) {
                const queryId = newValue.query.category_id;
                const queryName = newValue.query.goods_name;
                if (queryId !== undefined || queryName !== undefined) {
                    const data = {
                        params: { category_id: queryId, goods_name: queryName }
                    };
                    this.goods_name = queryName;
                    this.getGoodList(data);
                }
            },
            immediate: true
        }
    },

    created() {
        this.getSelectData();
        const query = this.$route.query;
        if (Object.keys(query).length > 0) {
            return;
        }
        this.getGoodList();
    },
    mounted() {
        const clipboard = new Clipboard(".share-btn");
        this.second_confirm = parseInt(localStorage.getItem("Second_Confirm"));
    },
    methods: {
        copyText() {
            this.$message({
                message: "链接复制成功",
                type: "success",
                duration: 3000
            });
        },
        resetProduct() {
            this.$router.push({ name: "Goodslist" });
            this.value = "";
            this.goods_name = "";
            this.getGoodList();
            // location.reload();
        },
        handleSold($index, row) {
            this.$router.push({
                path: "/transaction/sellrecently",
                query: {
                    category_id: row.category_id,
                    kw: row.goods_name,
                    kw_type: 3
                }
            });
        },
        getPageNumber(num) {
            this.curPage = num;
            this.getGoodList({ params: { page: num } });
        },
        handleShelf($index, row) {
            this.$confirm(
                `确定${Number(row.status) ? "下架" : "上架"}此商品, 是否继续?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    callback: action => {
                        if (action === "cancel" || action === "close") {
                            this.$message({
                                type: "info",
                                message: "已取消操"
                            });
                        } else {
                            api.addShelf({ id: row.id }).then(res => {
                                const data = res.data;
                                if (data.result === 1) {
                                    this.$message({
                                        type: "success",
                                        message: `${data.message}`
                                    });
                                }
                                location.reload();
                            });
                        }
                    }
                }
            );
        },
        addProduct() {
            this.$router.push({ path: "/product/goodsadd" });
        },
        handleEdit($index, row) {
            if (this.second_confirm === 1) {
                this.edits = 1;
                this.passhow = true;
                this.ids = row.id;
            } else if (this.second_confirm === 0) {
                this.passhow = false;
                this.$router.push({
                    path: "/product/edit",
                    query: { id: row.id }
                });
            }
        },
        handel(index, row) {
            if (this.second_confirm === 1) {
                this.del = 1;
                this.passhow = true;
                this.delarow = row;
                this.indexs = index;
            } else {
                this.passhow = false;
                this.handleDeleteProduct(index, row);
            }
        },
        handleDeleteProduct(index, row) {
            this.$confirm("确定删除此商品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                callback: action => {
                    if (action === "cancel" || action === "close") {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    }
                }
            });
        },
        handleOpenLink($index, row) {
            const host = window.location.host;
            this.dialogLink = true;
            const code = row.link_code;
            this.ShopUrl = "http://" + host + "/paylinks/" + code;
            axios
                .post("https://dwz.cn/admin/create", { url: this.ShopUrl })
                .then(res => {
                    if (res.data.Code == 0) {
                        this.shortUrl = res.data.ShortUrl;
                    } else {
                        this.shortUrl = this.ShopUrl;
                    }
                })
                .catch(res => {
                    this.shortUrl = this.ShopUrl;

                    this.$message({
                        message: res,
                        type: "success",
                        duration: 3000
                    });
                });
        },
        searchProduct() {
            if (this.goods_name === "") {
                this.$message({
                    type: "warning",
                    message: "请填写名称"
                });
                return;
            }
            const nameKey = _.trim(this.goods_name);
            const newQuery = {
                category_id: this.selectedId,
                goods_name: nameKey
            };
            this.$router.push({
                name: this.$route.name,
                query: Object.assign({}, this.$route.query, newQuery)
            });
        },
        getCurChange(change) {
            this.selectedId = change;
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
        getGoodList(data) {
            api.getAllList(data).then(res => {
                const data = res.data;
                this.loading = false;
                if (data.data && data.data.length >= 0) {
                    this.tableData = data.data;
                    this.total = data.total;
                }
            });
        },

        //安全密码确认
        getcheckConfirmCode(index, row) {
            let data = {
                password: this.pwdform.password
            };
            api.getcheckConfirmCode(data).then(res => {
                const data = res.data;
                if (data.result === 1) {
                    this.passhow = false;
                    this.pwdform.password = "";
                    if (this.edits === 1) {
                        let id = this.ids;
                        this.$router.push({
                            path: "/product/edit",
                            query: { id: id }
                        });
                    }
                    if (this.del === 1) {
                        this.handleDeleteProduct(index, row);
                    }
                } else {
                    this.$message({
                        message: `${data.message}`,
                        type: "error",
                        duration: 3000
                    });
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.getcheckConfirmCode(this.indexs, this.delarow);
                } else {
                    this.$message({
                        message: "操作失败",
                        type: "error",
                        duration: 3000
                    });
                    return false;
                }
            });
        },
        closepwd() {
            this.edits = 0;
            this.del = 0;
            this.passhow = false;
            this.pwdform.password = "";
        },
        handleAddProduct($index, row) {
            this.$router.push({
                path: "/product/codeadd",
                query: { id: row.id, name: row.goods_name }
            });
        },
        handleStock($index, row) {
            this.$router.push({
                path: "/product/secret",
                query: { id: row.id }
            });
        }
    }
};
</script>

<style lang="scss">
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9;
}
.pwdshows {
    background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    border-radius: 3px;
    position: fixed;
    z-index: 20;
    left: 0;
    right: 0;
    top: 10px;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 140px;
}
.short-link {
    p {
        font-size: 20px;
        display: inline-block;
    }
    a {
        display: inline-block;
    }
    .share-btn {
        margin-top: 20px;
        display: block;
        border-radius: 4px;
        width: 120px;
        height: 24px;
        background: #409eff;
        color: #fff;
        line-height: 24px;
        text-align: center;
    }
    span {
        display: inline-block;
        margin-top: 20px;
    }
}
.long-link {
    margin-top: 20px;
    p {
        font-size: 20px;
        display: inline-block;
    }
    a {
        display: inline-block;
    }
    .share-btn {
        margin-top: 20px;
        display: block;
        border-radius: 4px;
        width: 120px;
        height: 24px;
        background: #409eff;
        color: #fff;
        line-height: 24px;
        text-align: center;
    }
    span {
        display: inline-block;
        margin-top: 20px;
    }
}
.pic-link {
    margin-top: 20px;
    p {
        font-size: 20px;
        display: inline-block;
    }
    img {
        display: block;
    }
}
.px-pl-wrap {
    width: 97%;
    background: #fff;
    box-shadow: 0 0 30px #dfdcff;
    display: inline-block;
    margin: 1% auto auto 1%;
    .px-pl-title {
        background: #fff;
        height: 50px;
        line-height: 50px;
        padding-left: 30px;
        color: #000;
        font-size: 20px;
        border-bottom: 1px solid #ebeef5;
        font-weight: bold;
    }
    .product-search {
        color: #fff;
        background: #409eff;
        font-size: 16px;
        border: 1px solid #fff;
        display: inline-block;
        width: 110px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
    }
}
.px-pl-bottom {
    width: 97%;
    background: #fff;
    box-shadow: 0 0 30px #dfdcff;
    display: inline-block;
    margin: 1% auto auto 1%;
    .el-table .cell,
    .el-table th div,
    .el-table--border td:first-child .cell,
    .el-table--border th:first-child .cel {
        text-align: center;
        padding: 0;
    }
    .el-table__body-wrapper {
        max-height: 400px;
        overflow: auto;
        overflow-x: hidden;
    }
}
.pr-list-pagination {
    height: 50px;
    width: 100%;
    .el-pagination {
        padding: 10px 0 10px 70%;
    }
}
</style>
