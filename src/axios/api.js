import axios from "axios";
import util from "../libs/util";
import { Message } from "element-ui";
import store from "@/store/store";
import { getToken } from "../libs/token";

axios.defaults.timeout = 10000;
const instance = axios.create({
  baseURL: util.ajaxUrl
});

// instance.defaults.headers.post["x-requested-with"] = "XMLHttpRequest";

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = "bearer" + " " + getToken();
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// axios拦截响应
instance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          store.commit("loggedOut");
          break;
        case 403:
          Message({
            message: "没有权限",
            type: "warning"
          });
          break;
        case 404:
          Message({
            message: "请求网站不存在",
            type: "warning"
          });
          break;
        case 500:
          Message({
            message: "服务器出现问题",
            type: "warning"
          });
          break;
      }
    } else {
      Message({
        message: "服务器出现问题",
        type: "warning"
      });
    }
    return Promise.reject(err);
  }
);

export default {
  /*******************************
   *cm
   *********************************/
  getWxJs(data) {
    return instance.get("/web/jsapi", data);
  },
  getWxOrder(data) {
    return instance.post("/order/mppay", data);
  },
  getOpenid(data) {
    return instance.get("/web/getBuyerOpenid", data);
  },
  getNewInfo() {
    return instance.post("/auth/me");
  },
  userLogin(data) {
    return instance.post("/auth/login", data);
  },
  accoutRegister(data) {
    return instance.post("/auth/register", data);
  },
  //添加商品种类
  addProductSort(data) {
    return instance.post("/category/add", data);
  },
  // 更新商品列表
  updateProductList(data) {
    return instance.post("/category/edit", data);
  },
  // 删除商品种类中的一项
  deleteProduct(data) {
    return instance.post("/category/delete", data);
  },
  // 加载商品分类页面数据
  getProductList(data) {
    return instance.get("/category/index", data);
  },
  //  获取商品所有分类
  getAllSort() {
    return instance.get("/category/lst");
  },
  // 获取所有商品
  getAllList(data) {
    return instance.get("/goods/index", data);
  },
  // 获取修改商品信息
  getUpdateGood(data) {
    return instance.get("/goods/info", data);
  },
  // 修改商品
  updateGood(data) {
    return instance.post("/goods/edit", data);
  },
  // 删除商品中的一项
  deleteInList(data) {
    return instance.post("/goods/delete", data);
  },
  // 添加一个商品到某种类中
  addInList(data) {
    return instance.post("/goods/add", data);
  },
  // 上架产品
  addShelf(data) {
    return instance.post("/goods/changeStatus", data);
  },
  // 获取所有商品
  getAllProduct() {
    return instance.get("/goods/lists");
  },
  // 添加商品卡密
  addGoodsCode(data) {
    return instance.post("/kami/add", data);
  },
  // 库存卡密
  getStockCode(data) {
    return instance.get("/kami/itemLists", data);
  },
  deleteCode(data) {
    return instance.post("/kami/delete", data);
  },
  // 批量删除卡密
  batchDeleteCode(data) {
    return instance.post("/kami/batchDelete", data);
  },
  // 卡密回收数据
  getDeleteCode(data) {
    return instance.get("/kami/trashLists", data);
  },
  // 删除回收站中一张
  deleteInTrash(data) {
    return instance.post("/kami/deleteTrash", data);
  },
  // 恢复回收站中一张
  restoreInTrash(data) {
    return instance.post("/kami/restore", data);
  },
  batchCompleteDelete(data) {
    return instance.post("/kami/batchDeleteTrash", data);
  },
  batchRestoreCode(data) {
    return instance.post("/kami/batchRestore", data);
  },
  // 清空回收站
  batchEmptyTrash() {
    return instance.post("/kami/trashAll");
  },
  ///查找某一个分类下的商品
  searchInCategory(data) {
    return instance.get("/web/categoryGoods", data);
  },
  // 付款页请求数据
  getPaySort(data) {
    return instance.get("/web/category", data);
  },
  // 获取购买页商店信息
  getShopsInfo(data) {
    return instance.get("/web/shopInfo", data);
  },
  // 创建订单
  createPayOrder(data) {
    return instance.post("/order/create", data);
  },
  // 获取付款码
  getMoneyPic(data) {
    return instance.post("/order/pay", data);
  },
  // 导出未售卡密
  getNoSold(data) {
    return instance.get("/kami/exportKami", data);
  },
  // 删除未出售卡密
  delNoSold(data) {
    return instance.post("/kami/delStock", data);
  },
  // 根据产品码获取商户信息和产品信息
  getAllBuyInfo(data) {
    return instance.get("/web/productInfo", data);
  },
  // 查询订单
  searchOrder(data) {
    return instance.get("/web/orderInfo", data);
  },
  /*********************
   *yxy
   *******************/

  // 商户费率
  getrateList() {
    return instance.get("/rateList");
  },
  // 投诉
  getcomplaints() {
    return instance.get("/complaints");
  },
  // 商家百科
  getwikipedia() {
    return instance.get("/wikipedia");
  },
  // 站内消息
  getnoticeLists(data) {
    return instance.get("/shop/noticeLists", data);
  },

  // 已读未读
  edittypenotice(data) {
    return instance.get("shop/changeRead", data);
  },
  // 站内收到消息
  getMessagessend() {
    return instance.get("/Messagessend");
  },
  // 删除发送消息
  deleteMessages(data) {
    return instance.post("/deleteMessages", data);
  },
  // 删除收到消息
  deleteMessageswait(data) {
    return instance.post("/deleteMessageswait", data);
  },
  // 添加信息
  addMessageinfo(data) {
    return instance.post("/addMessageinfo", data);
  },
  // 统计收益table
  getIcomess(data) {
    return instance.get("/trade/analy", data);
  },
  // 收益统计
  getAnalyDesc(data) {
    return instance.get("/trade/analyDesc", data);
  },
  // 渠道trade/analyChannel
  getChannel(data) {
    return instance.get("/trade/analyChannel", data);
  },
  // 个人信息auth/me
  getuser() {
    return instance.post("/auth/me");
  },
  // 个人基本信息
  getuserinfos() {
    return instance.get("/user/userinfo");
  },
  // index/articleLists
  getarticleLists() {
    return instance.get("/index/articleLists");
  },
  // 修改个人基本信息
  edituserinfos(data) {
    return instance.post("/user/edit", data);
  },
  // 主页money
  getbasedata() {
    return instance.get("index/baseData");
  },
  // 收益趋势
  getprofitTrend() {
    return instance.get("index/profitTrend");
  },
  // 二次安全判断
  getcheckConfirmCode(data){
    return instance.post("/user/checkConfirmCode", data);
  },
  getshopinfos() {
    return instance.get("/bank/info");
  },
  editshopinfo(data) {
    return instance.post("/bank/edit", data);
  },
  // 修改支付信息验证码
  shopcode(data) {
    return instance.post("/sms/sendcode", data);
  },
  // 发送邮箱验证吗
  getemilcode(data) {
    return instance.get("/user/sendVerifyCode",data);
  },
  // 支付跳转
  orderStatus(data) {
    return instance.post("/order/checkOrderStatus", data);
  },
  // 修改密码
  updatapwd(data) {
    return instance.post("/user/editpwd", data);
  },
  // 重置密码
  resetpwd(data){
    return instance.post("/user/resetPwd", data);
  },
  // 退出登录
  logout(data) {
    return instance.post("/auth/logout", data);
  },
  //实名认证
  realname() {
    return instance.get("/realname/info");
  },
  // 实名修改
  editrealname(data) {
    return instance.post("/realname/edit", data);
  },
  // 安全设置
  getsecurity() {
    return instance.get("/user/safeCode");
  },
  // 结算记录
  getsettlement(data) {
    return instance.get("/trade/withdrawLists", data);
  },
  // 提现withdrawals
  getwithdrawals(data) {
    return instance.post("/trade/withdraw", data);
  },
  getWithdrawRadio(data) {
    return instance.get("/trade/withdrawRatio", data);
  },
  // 编辑安全设置
  editsecurity(data) {
    return instance.post("/user/editSafeCode", data);
  },
  // 最近卖出
  getrecent(data) {
    return instance.get("/trade/recentSell", data);
  },
  // 订单记录
  getorderlist(data) {
    return instance.get("/trade/orderLists", data);
  },
  // 登陆日志
  getlog(data) {
    return instance.get("/shop/loginLogs", data);
  },
  // 添加优惠券
  addcoupons(data) {
    return instance.post("/shop/addCoupon", data);
  },
  // 优惠券列表shop/couponLists
  getcoupons(data) {
    return instance.get("/shop/couponLists", data);
  },
  // 清空优惠券shop/deleteAll
  clearcoupon() {
    return instance.get("/shop/deleteAll");
  },
  // web/addComplain  投诉添加
  addComplain(data) {
    return instance.post("/web/addComplain", data);
  },
  // 投诉列表
  getcomplainLists(data) {
    return instance.get("/shop/complainLists",data);
  },
  // 投诉详情shop/complainInfo
     getshopcomplainInfo(data) {
    return instance.get("/shop/complainInfo",data);
     },
    //  查询投诉web/complainInfo
    getwebcomplainInfo(data) {
      return instance.get("/web/complainInfo",data);
       },
      //  撤销投诉web/cancelComplain
      getwebcancelComplain(data) {
        return instance.get("/web/cancelComplain",data);
     },
};

//   },
//   // 个人基本信息
//   getuserinfos() {
//     return instance.get("/user/userinfo");
//   },
//   // 修改个人基本信息
//   edituserinfos(data) {
//     return instance.post("/user/edit", data);
//   },
//   getshopinfos() {
//     return instance.get("/bank/info");
//   },
//   editshopinfo(data) {
//     return instance.post("/bank/edit", data);
//   },
//   // 修改支付信息验证码
//   shopcode(data) {
//     return instance.post("/sms/sendcode", data);
//   },
//   // 修改密码
//   updatapwd(data) {
//     return instance.post("/user/editpwd", data);
//   },
//   // 退出登录
//   logout(data) {
//     return instance.post("/auth/logout", data);
//   },
//   //实名认证
//   realname() {
//     return instance.get("/realname/info");
//   },
//   // 实名修改
//   editrealname(data) {
//     return instance.post("/realname/edit", data);
//   },
//   // 安全设置
//   getsecurity() {
//     return instance.get("/user/safeCode");
//   },
//   // 编辑安全设置
//   editsecurity(data) {
//     return instance.post("/user/editSafeCode", data);
//   }

// };
