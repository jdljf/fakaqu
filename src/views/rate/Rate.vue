<template>
    <div id="rate">
        <el-card>
        <div slot="header" class="clearfix">
            <span>商户费率</span>
        </div>
         <el-table
                 :data="tableData"
                 border
                 height="500"
                 >
                    <el-table-column prop="payway" label="支付方式" >

                    </el-table-column>
                    <el-table-column prop="paystat" label="支付费率" ></el-table-column>

                    <el-table-column prop="menusstate" label="默认展开">
                        <!--<template scope="scope">-->
                        <!--<el-switch-->
                         <!--active-text="启用" inactive-color="#C8C5C4"  active-color="#399ADA" inactive-text="禁用"  v-model="scope.row.menusstate"-->
                            <!--@change=change(scope.$index,scope.row)>-->
                        <!--</el-switch>-->
                        <!--</template>-->
                    </el-table-column>
                </el-table>
        </el-card>
    </div>
</template>


<script>
import api from "@/axios/api";

export default {
  name: "Rate",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getTableData() {
      api.getrateList().then(res => {
        const data = res.data;
        if (data.code === 1) {
          const Obj = { paystat: "90%", payway: "支付宝", sort: "100" };
          for (let i = 1; i < 10; i++) {
            const newObj = Object.assign({}, Obj, { id: i });
            this.tableData.push(newObj);
          }
        }
      });
    },

    change: function(index, row) {
      // console.log(index, row);
      // console.log(row.menusstate);
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="scss" scoped>
#rate {
  padding: 20px;
  .clearfix {
    font-weight: bold;
  }
}
</style>
