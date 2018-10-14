export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-setting",
          index: "composite",

          title:this.$t('listarr.Information'),

          subs: [
            {
              index: "/composite/user",
              title: this.$t('listarr.controlcenter')
            },
            {
              index: "/composite/progress",
              title: this.$t('listarr.basicsettings')
            },
            {
              index: "/composite/changepassword",
              title: this.$t('listarr.changePassword')
            },
            {
              index: "/composite/certification",
              title: this.$t('listarr.Verified')
            },
            {
              index: "/composite/security",
              title: this.$t('listarr.SecuritySettings')
            },
            {
              index: "/composite/settlement",
              title: this.$t('listarr.Settlementrecords')
            },
            {
              index: "/composite/withdrawals",
              title: '申请提现'
            },
          ]
        },
        {
          icon: "el-icon-goods",

          index: "/product",
          title: this.$t("admin.two"),
          subs: [
            {
              index: "/product/categories",
              title: this.$t("two.one")
            },
            {
              index: "/product/goodslist",
              title: this.$t("two.two")
            },
            {
              index: "/product/goodsadd",
              title: this.$t("two.three")
            },
            {
              index: "/product/codeadd",
              title: this.$t("two.four")
            },
            {
              index: "/product/secret",
              title: this.$t("two.five")
            },
            {
              index: "/product/batch",
              title: this.$t("two.six")
            },
            {
              index: "/product/trash",
              title: this.$t("two.seven")
            }
          ]
        },
        {
          icon: "el-icon-document",

          index: "transaction",

          title: this.$t('listarr.Transactionmanagement'),

          subs: [
            {
              index: "/transaction/sellRecently",
              title: this.$t('listarr.Recentlysold')
            },
            {
              index: "/transaction/orderrecord",
              title: this.$t('listarr.Orderrecord')
            },
            {
              index: "/transaction/channel",
              title:this.$t('listarr.Channelanalysis')
            },
            {
              index: "/transaction/income",
              title:this.$t('listarr.Incomestatistics')
            }
          ]
        },
        {
          icon: "el-icon-menu",

          index: "shop",

          title: this.$t('listarr.Storemanagement'),

          subs: [
            {
              index: "/shop/link",
              title:this.$t('listarr.Storelink')
            },
            // {
            //   index: "/shop/rate",
            //   title: this.$t('listarr.Merchantrate')
            // },
            {
              index: "/shop/complaint",
              title: this.$t('listarr.Complaintmanagement')
            },
            // {
            //   index: "/shop/merchants",
            //   title:this.$t('listarr.Businessencyclopedia')
            // },
            {
              index: "/shop/sitemessage",
              title: this.$t('listarr.Stationnews')
            },
            {
              index: "/shop/log",

              title: this.$t('listarr.log')
            },
            {
              index: "/shop/addCoupons",

              title: this.$t('listarr.Addcoupon')
            },
            {
              index: "/shop/Coupons",

              title: this.$t('listarr.Couponmanagement')
            }
          ]
        }
      ]
    };
  },

  methods: {
   
 },
 mounted () {
 }

};
