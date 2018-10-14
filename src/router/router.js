import Vue from "vue";
import Router from "vue-router";
import Merchant from "@/views/merchant/MerchantMain.vue";
import Wrap from "@/components/mobile/wrap.vue";

Vue.use(Router);
const otherRouter = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页"
    },
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "用户注册"
    },
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/findpwd",
    name: "findpwd",
    meta: {
      title: "忘记密码"
    },
    component: () => import("@/views/findPwd.vue")
  },
  {
    path: "/order",
    name: "order",
    meta: {
      title: "订单查询"
      // requiresAuth: true
    },
    component: () => import("@/views/OrderSearch.vue")
  },
  {
    path: "/report",
    name: "report",
    meta: {
      title: "投诉查询"
      // requiresAuth: true
    },
    component: () => import("@/views/report.vue")
  },
  {
    path: "/tousu",
    name: "tousu",
    meta: {
      title: "订单投诉"
      // requiresAuth: true
    },
    component: () => import("@/views/tousu.vue")
  },
  {
    path: "/Orderts",
    name: "Orderts",
    meta: {
      title: "投诉详情页"
      // requiresAuth: trueOrderts
    },
    component: () => import("@/views/Orderts.vue")
  },
  {
    path: "/paylink/:linkcode",
    name: "pay",
    meta: {
      title: "购买页面",
      option: true
    },
    component: () => import("@/views/Pay.vue")
  },
  {
    path: "/paylinks/:linkcode",
    name: "pay-no",
    meta: {
      title: "购买页面",
      option: false
    },
    component: () => import("@/views/Pay.vue")
  },
  {
    path: "/paysuccess",
    name: "Paysuccess",
    meta: {
      title: "支付成功"
    },
    component: () => import("@/views/Paysuccess.vue")
  },
  {
    path: "/newslist",
    name: "Newslist",
    meta: {
      title: "公告列表"
    },
    component: () => import("@/views/Newslist.vue")
  },
  {
    path: "/system",
    name: "System",
    meta: {
      title: "公告详情"
    },
    component: () => import("@/views/System.vue")
  },
  {
    path: "/zizhi",
    name: "Zizhi",
    meta: {
      title: "企业资质"
    },
    component: () => import("@/views/Zizhi.vue")
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "帮助中心"
    },
    component: () => import("@/views/News.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    meta: {
      title: "联系我们"
    },
    component: () => import("@/views/Contact.vue")
  },
  {
    path: "/order/buy",
    name: "Buy",
    meta: {
      title: "付款页面"
      // requiresAuth: true
    },
    component: () => import("@/views/Buy.vue")
  },
  {
    path: "/dev",
    name: "dev",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Pay.vue")
  }
];
const authRouter = [
  // 综合信息
  {
    path: "/composite",
    name: "Composite",
    redirect: "/composite/user",
    component: Merchant,
    meta: {
      title: "综合信息",
      requiresAuth: true,
      icon: "el-icon-setting"
    },
    children: [
      {
        path: "user",
        name: "User",
        meta: {
          title: "管理中心",
          requiresAuth: true
        },
        component: () => import("@/views/merchantindex/merchantindex.vue")
      },
      {
        path: "progress",
        name: "Progress",
        meta: {
          title: "基本设置"
        },
        component: () => import("@/views/progress/progress.vue")
      },
      {
        path: "/Changepass",
        name: "Changepass",
        meta: {
          title: "修改支付信息"
        },
        component: () => import("@/views/changepass/Changepass.vue")
      },
      {
        path: "changepassword",
        name: "changepassword",
        meta: {
          title: "密码修改"
        },
        component: () => import("@/views/changepassword/changepassword.vue")
      },
      {
        path: "certification",
        name: "certification",
        meta: {
          title: "实名认证"
        },
        component: () => import("@/views/certification/certification.vue")
      },
      {
        path: "security",
        name: "Security",
        meta: {
          title: "安全设置"
        },
        component: () => import("@/views/Security/Security.vue")
      },
      {
        path: "settlement",
        name: "settlement",
        meta: {
          title: "结算记录"
        },
        component: () => import("@/views/settlement/settlement.vue")
      },
      {
        path: "withdrawals",
        name: "withdrawals",
        meta: {
          title: "申请提现"
        },
        component: () => import("@/views/settlement/withdrawals.vue")
      }
    ]
  },
  // 商品管理
  {
    path: "/product",
    name: "Product",
    redirect: "/product/categories",
    meta: {
      title: "商品管理",
      requiresAuth: true,
      icon: "el-icon-goods"
    },
    component: Merchant,
    children: [
      {
        path: "edit",
        name: "Edit",
        meta: {
          title: "修改商品信息",
          requiresAuth: true
        },
        component: () => import("@/views/goods/edit.vue")
      },
      {
        path: "categories",
        name: "Categories",
        meta: {
          title: "商品分类"
        },
        component: () => import("@/views/goods/Category.vue")
      },
      {
        path: "goodslist",
        name: "Goodslist",
        meta: {
          title: "商品列表"
        },
        component: () => import("@/views/goods/ProductList.vue")
      },
      {
        path: "goodsadd",
        name: "Goodsadd",
        meta: {
          title: "添加商品"
        },
        component: () => import("@/views/goods/edit.vue")
      },
      {
        path: "codeadd",
        name: "Codeadd",
        meta: {
          title: "添加卡密",
          requiresAuth: true
        },
        component: () => import("@/views/goods/AddCard.vue")
      },
      {
        path: "secret",
        name: "Secret",
        meta: {
          title: "库存卡密"
        },
        component: () => import("@/views/goods/Stock.vue")
      },
      {
        path: "batch",
        name: "Batch",
        meta: {
          title: "卡密批量管理"
        },
        component: () => import("@/views/goods/BatchOperate.vue")
      },
      {
        path: "trash",
        name: "Trash",
        meta: {
          title: "回收站处理"
        },
        component: () => import("@/views/goods/CodeTrash.vue")
      }
    ]
  },
  // 交易管理
  {
    path: "/transaction",
    name: "Transaction",
    redirect: "/transaction/sellrecently",
    meta: {
      title: "交易管理",
      requiresAuth: true,
      icon: "el-icon-document"
    },
    component: Merchant,
    children: [
      {
        path: "sellrecently",
        name: "Sellecently",
        meta: {
          title: "最近卖出"
        },
        component: () => import("@/views/sellRecently/SellRecently.vue")
      },
      {
        path: "orderrecord",
        name: "Orderrecord",
        meta: {
          title: "订单记录"
        },
        component: () => import("@/views/orderrecord/Orderrecord.vue")
      },
      {
        path: "channel",
        name: "Channel",
        meta: {
          title: "渠道分析"
        },
        component: () => import("@/views/channel/Channel.vue")
      },
      {
        path: "income",
        name: "Income",
        meta: {
          title: "收益统计"
        },
        component: () => import("@/views/Income/Income.vue")
      }
    ]
  },
  // 店铺管理
  {
    path: "/shop",
    name: "Shop",
    redirect: "/shop/link",
    meta: {
      title: "店铺管理",
      requiresAuth: true,
      icon: "el-icon-menu"
    },
    component: Merchant,
    children: [
      {
        path: "link",
        name: "Link",
        meta: {
          title: "店铺管理"
        },
        component: () => import("@/views/management/Management.vue")
      },
      {
        path: "rate",
        name: "Rate",
        meta: {
          title: "店铺费率"
        },
        component: () => import("@/views/rate/Rate.vue")
      },
      {
        path: "complaint",
        name: "Complaint",
        meta: {
          title: "投诉管理"
        },

        component: () => import("@/views/complaint/Complaint.vue")
      },
      {
        path: "Complaintsdetail",
        name: "Complaintsdetail",
        meta: {
          title: "投诉详情"
        },
        component: () => import("@/views/complaintsdetail/Complaintsdetail.vue")
      },
      {
        path: "merchants",
        name: "Merchants",
        meta: {
          title: "商家百科"
        },
        component: () => import("@/views/merchants/Merchants.vue")
      },
      {
        path: "sitemessage",
        name: "Sitemessage",
        meta: {
          title: "站内消息"
        },
        component: () => import("@/views/sitemessage/Sitemessage.vue")
      },
      {
        path: "log",
        name: "Log",
        meta: {
          title: "登录日志"
        },
        component: () => import("@/views/log/Log.vue")
      },
      {
        path: "addCoupons",
        name: "addCoupons",
        meta: {
          title: "添加优惠券"
        },
        component: () => import("@/views/coupons/addCoupons.vue")
      },
      {
        path: "coupons",
        name: "Coupons",
        meta: {
          title: "优惠券"
        },
        component: () => import("@/views/coupons/Coupons.vue")
      }
    ]
  }
];
const notFoundRouter = {
  path: "/*",
  name: "errorPage",
  meta: {
    title: "页面不存在"
  },
  component: () => import("@/views/error-page/Error.vue")
};

// 移动端路由
const mobileOtherRouter = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "用户登录"
    },
    component: () => import("@/mobileviews/login/Login.vue")
  },

  {
    path: "/register",
    name: "register",
    meta: {
      title: "商户注册"
    },
    component: () => import("@/mobileviews/register/Register.vue")
  },
  {
    path: "/findpwd",
    name: "findpwd",
    meta: {
      title: "忘记密码"
    },
    component: () => import("@/mobileviews/findpwd/findpwd.vue")
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    meta: {
      title: "支付成功"
    },
    component: () => import("@/mobileviews/paysuccess/paysuccess.vue")
  },
  {
    path: "/paylink/:linkcode",
    name: "payShop",
    meta: {
      title: "购买页面",
      option: true
    },
    component: () => import("@/mobileviews/pay/Pay.vue")
  },
  {
    path: "/paylinks/:linkcode",
    name: "pay-no",
    meta: {
      title: "购买页面",
      option: false
    },
    component: () => import("@/mobileviews/pay/Pay.vue")
  },
  {
    path: "/order/buy",
    name: "Buy",
    meta: {
      title: "付款页面"
      // requiresAuth: true
    },
    component: () => import("@/mobileviews/pay/buy.vue")
  },
  {
    path: "/auth/Certification",
    name: "Auth",
    meta: {
      title: "认证页面"
      // requiresAuth: true
    },
    component: () => import("@/mobileviews/Auth/Auth.vue")
  },
  {
    path: "/wx/pay",
    name: "WXPAY",
    meta: {
      title: "微信付款"
    },
    component: () => import("@/mobileviews/pay/WxPay.vue")
  },
  {
    path: "/wait/result",
    name: "WaitResult",
    meta: {
      title: "获取卡密中"
    },
    component: () => import("@/mobileviews/pay/Wait.vue")
  },
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "订单查询"
    },
    component: () => import("@/mobileviews/order/orderRecord.vue")
  },
];
const mobileAuthRouter = [
  {
    path: "/product",
    name: "Product",
    redirect: "/product/categories",
    component: Wrap,
    meta: {
      title: "商品管理",
      icon: "el-icon-goods",
      requiresAuth: true
    },
    children: [
      {
        path: "categories",
        name: "Categories",
        meta: {
          title: "商品分类"
        },
        component: () => import("@/mobileviews/goods/Category.vue")
      },
      {
        path: "goodslist",
        name: "Goodslist",
        meta: {
          title: "商品列表"
        },
        component: () => import("@/mobileviews/goods/ProductList.vue")
      },
      {
        path: "codeadd",
        name: "Codeadd",
        meta: {
          title: "添加卡密"
        },
        component: () => import("@/mobileviews/goods/AddCard.vue")
      },
      {
        path: "edit",
        name: "Edit",
        meta: {
          title: "修改商品信息"
        },
        component: () => import("@/mobileviews/goods/edit.vue")
      },
      {
        path: "goodsadd",
        name: "Goodsadd",
        meta: {
          title: "添加商品"
        },
        component: () => import("@/mobileviews/goods/edit.vue")
      },
      {
        path: "secret",
        name: "Secret",
        meta: {
          title: "库存卡密"
        },
        component: () => import("@/mobileviews/goods/Stock.vue")
      },
      {
        path: "batch",
        name: "Batch",
        meta: {
          title: "卡密回收站"
        },
        component: () => import("@/mobileviews/goods/BatchOperate.vue")
      }
    ]
  },
  // 手机综合信息composite
  {
    path: "/composite",
    name: "Composite",
    redirect: "/composite/user",
    component: Wrap,
    meta: {
      title: "综合信息",
      requiresAuth: true,
      icon: "el-icon-setting"
    },

    children: [
      {
        path: "user",
        name: "Users",
        meta: {
          title: "管理中心",
          requiresAuth: true
        },
        component: () => import("@/mobileviews/users/merchantindex.vue")
      },
      {
        path: "progress",
        name: "progress",
        meta: {
          title: "基本设置"
        },
        component: () => import("@/mobileviews/users/progress.vue")
      },
      {
        path: "/Changepass",
        name: "Changepass",
        meta: {
          title: "修改支付信息"
        },
        component: () => import("@/mobileviews/users/Changepass.vue")
      },
      {
        path: "certification",
        name: "certification",
        meta: {
          title: "实名认证"
        },
        component: () => import("@/mobileviews/users/certification.vue")
      },
      {
        path: "security",
        name: "security",
        meta: {
          title: "安全设置"
        },
        component: () => import("@/mobileviews/users/security.vue")
      },
      {
        path: "settlement",
        name: "settlement",
        meta: {
          title: "结算记录"
        },
        component: () => import("@/mobileviews/settlement/settlement.vue")
      },
      {
        path: "ChangePassword",
        name: "ChangePassword",
        meta: {
          title: "修改密码"
        },
        component: () => import("@/mobileviews/users/ChangePassword.vue")
      },
      {
        path: "withdrawals",
        name: "withdrawals",
        meta: {
          title: "申请提现"
        },
        component: () => import("@/mobileviews/users/withdrawals.vue")
      }
    ]
  },

  {
    path: "/transaction",
    name: "Transaction",
    redirect: "/transaction/sellrecently",
    meta: {
      title: "交易管理",
      requiresAuth: true,
      icon: "el-icon-document"
    },
    component: Wrap,
    children: [
      {
        path: "sellRecently",
        name: "SellRecently",
        meta: {
          title: "最近卖出"
        },
        component: () => import("@/mobileviews/sellRecently/sellRecently.vue")
      },
      {
        path: "channel",
        name: "Channel",
        meta: {
          title: "渠道分析"
        },
        component: () => import("@/mobileviews/channel/channel.vue")
      },
      {
        path: "income",
        name: "Income",
        meta: {
          title: "收益统计"
        },
        component: () => import("@/mobileviews/income/income.vue")
      }
    ]
  },
  // 店铺管理
  {
    path: "/shop",
    name: "Shop",
    redirect: "/transaction/sellrecently",
    meta: {
      title: "店铺管理",
      requiresAuth: true,
      icon: "el-icon-menu"
    },
    component: Wrap,
    children: [
      {
        path: "link",
        name: "Link",
        meta: {
          title: "店铺链接"
        },
        component: () => import("@/mobileviews/store/Link.vue")
      },
      {
        path: "log",
        name: "Log",
        meta: {
          title: "登录日志"
        },
        component: () => import("@/mobileviews/store/Log.vue")
      },
      {
        path: "report",
        name: "Report",
        meta: {
          title: "登录日志"
        },
        component: () => import("@/mobileviews/store/report.vue")
      },
      {
        path: "reportsdetail",
        name: "reportsdetail",
        meta: {
          title: "登录日志"
        },
        component: () => import("@/mobileviews/store/reportsdetail.vue")
      },
      {
        path: "addCoupons",
        name: "addCoupons",
        meta: {
          title: "添加优惠券"
        },
        component: () => import("@/mobileviews/store/addCoupons.vue")
      },
      {
        path: "coupons",
        name: "Coupons",
        meta: {
          title: "优惠券"
        },
        component: () => import("@/mobileviews/store/Coupons.vue")
      },
      {
        path: "sitemessage",
        name: "Sitemessage",
        meta: {
          title: "站内消息"
        },
        component: () => import("@/mobileviews/store/Sitemessage.vue")
      }
    ]
  }
];

const mobileErrorRouter = [
  {
    path: "/*",
    name: "errorPage",
    meta: {
      title: "页面不存在"
    },
    component: () => import("@/mobileviews/Error.vue")
  }
];

export const routers = [...otherRouter, ...authRouter, notFoundRouter];

export const mobileRouters = [
  ...mobileOtherRouter,
  ...mobileAuthRouter,
  ...mobileErrorRouter
];
