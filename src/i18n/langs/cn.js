import enLocale from "element-ui/lib/locale/lang/zh-CN";
import progress from "../../views/progress/langs/cn";
import changepay from "../../views/changepass/langs/cn";
import changepasswords from "../../views/changepassword/langs/cn";
import certification from "../../views/certification/langs/cn";
import Security from "../../views/Security/langs/cn";
import sellRecently from "../../views/sellRecently/langs/cn";
import orderrecord from "../../views/orderrecord/langs/cn";
import channel from "../../views/channel/langs/cn";
import Income from "../../views/Income/langs/cn";
import sitemessage from "../../views/sitemessage/langs/cn";
import log from "../../views/log/langs/cn";
import coupons from "../../views/coupons/langs/cn";
import merchantindex from "../../views/merchantindex/langs/cn";
import cnLocale from "element-ui/lib/locale/lang/zh-CN";
import cnGoods from "@/views/goods/languages/cn";
import settlement from "@/views/settlement/langs/cn";
import complaint from "@/views/complaint/langs/cn";


const cn = {
  navbar: {
    home: "首页",
    qualification: "企业资质",
    app: "APP下载",
    help: "帮助中心",
    contact: "联系我们",
    user: "商户注册",
    order: "订单查询",
    complaints:'投诉查询',
  },
  login: {
    btn: "商户登录",
    fps: "忘记密码?"
  },
  solgan: {
    solganTitle: "全新购卡体验",
    solganContent:
      "致力于解决虚拟商品的快捷寄售服务，为商户及其买家提供，便捷、绿色、安全、快速的销售和购买体验。",
    buttonText: "商户注册"
  },
  section: {
    one: "服务器安全",
    two: "界面简约",
    three: "资金保障",
    four: "费率超低",
    five: "持续更新",
    ones:
      "发卡去采用群集服务器，防御高，故障率低，无论用户身在何处，均能获得流畅安全可靠的体验。",
    twos: "简约的UI交互体验可以给您一个体验度极高的商户后台，更好的下单体验。",
    threes:
      "发卡去由第三方托管，资金平均停留的时间不超过12小时，您的资金安全将得到充分的保障。",
    fours:
      "发卡去的支付渠道直接对接官方，直接去掉中间商的差价，因此我们可以给商户提供更低廉的费率。",
    fives:
      "发卡去系统持续更新，功能持续完善，让商户以及客户的体验不断接近完美是我们一直不变的追求！"
  },
  step: {
    line: "只需6步 享受全新自动发卡",
    one: "注册商户",
    two: "绑定账户",
    three: "发布商品",
    four: "自助下单",
    five: "自动发货",
    six: "自动结算",
    btn: "注册成为商户"
  },
  pay: {
    line: "发卡去的伙伴  就是您的伙伴",
    one: "支付宝",
    two: "微信支付",
    three: "QQ支付",
    four: "银联支付",
    five: "财富通支付",
    six: "信用卡支付"
  },
  about: {
    about: "关于我们",
    detail:
      "发卡去自动发卡平台，为品轩科技有限公司旗下平台之一， 公司注册于2014年1月，注册资本100万，是一家专注互联网领域 ，致力于为用户提供一站式服务的创新型未来互联网企业。\n",
    one: "诚信",
    two: "匠心",
    three: "风控",
    four: "公道",
    ones:
      "诚信永远是发卡去的经营之本，我们诚信、尊重、 爱护平台的每一位商户以及买家。",
    twos:
      "发卡去开发团队成员均有长达3年以上的开发经验， 匠心精神，铸就高品质体验。",
    threes: "平台每个商户都经过有卡啦风控组筛选，商户信誉 有保障。",
    fours:
      "平台所有的支付渠道,均有发卡去平台自主申请对接 ,杜绝高费率第三方支付。"
  },
  contact: {
    line: "联系我们 打开您的成功之门",
    one: "广州"
  },
  bottom: {
    one: "联系我们",
    two: "关于我们",
    three: "服务支持"
  },
  listOne: {
    one: "客服专线",
    two: "客服服务热线",
    three: "合作权益"
  },
  listTwo: {
    one: "关于发卡去",
    two: "服务公告",
    three: "会员权益",
    four: "人才招聘"
  },
  listThree: {
    one: "服务项目查询",
    two: "会员专区"
  },

  ...enLocale,
  ...progress,
  ...changepay,
  ...changepasswords,
  ...certification,
  ...Security,
  ...sellRecently,
  ...orderrecord,
  ...channel,
  ...Income,
  ...sitemessage,
  ...log,
  ...coupons,
  ...merchantindex,
  ...settlement,

  admin: {
    one: "综合信息",
    two: "商品管理",
    three: "交易管理",
    four: "店铺管理"
  },
  two: {
    one: "商品分类",
    two: "商品列表",
    three: "添加商品",
    four: "添加卡密",
    five: "库存卡密",
    six: "卡密批量管理",
    seven: "卡密回收站"
  },
  order: {
    text: "浏览器缓存查询",
    text1: "通过订单编号查询",
    text2: "通过联系方式查询",
    input: "输入您的订单标号",
    input1: "输入您的联系方式",
    btn: "立即查询",
    title: "订单记录",
    title2: "查询结果"
  },
  ...cnLocale,
  ...cnGoods,
  ...complaint
};

export default cn;
