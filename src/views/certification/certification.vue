<template>
  <div id="certification">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$t('realname.title')}}</span>
      </div>
      <el-col style="width:100%;margin-bottom:20px;">
        <el-card shadow="always" style="color:#58A5FC;line-height:40px;">
          <div>{{$t('realname.q')}}</div>
          {{$t('realname.a')}}
        </el-card>
      </el-col>

      <el-form :model="realnameform" status-icon :rules="realnamerules" ref="realnameform" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="$t('realname.usactualnameerno')" prop="realname">
          <el-input v-model="realnameform.realname" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item :label="$t('realname.identificationnumber')" prop="id_card">
          <el-input v-model="realnameform.id_card" style="width:30%"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('realname.Bankaccount')" prop="bank_name">
          <el-select name="realnameform.bank_name" v-model="realnameform.bank_name" placeholder="请选择开户银行">
            <el-option label="中国农业银行" value="中国农业银行"></el-option>
            <el-option label="中国工商银行" value="中国工商银行"></el-option>
            <el-option label="中国银行" value="中国银行"></el-option>
            <el-option label="中国建设银行" value="中国建设银行"></el-option>
            <el-option label="交通银行" value="交通银行"></el-option>
            <el-option label="中国邮政银行" value="中国邮政银行"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item :label="$t('realname.Bankcardnumber')" prop="bank_account">
          <el-input @focus="open3" v-model="realnameform.bank_account">
          </el-input>
        </el-form-item> -->
        <el-form-item :label="$t('realname.Uploadidentitypositive')">
          <input type="file" name="realnameform.fronted_card" @change="showPreview" id="upload" />
          <img style="width:100px;display:block" id="fronted" :src="realnameform.fronted_card" />
        </el-form-item>
        <el-form-item :label="$t('realname.ReversesideofIDcard')">
          <input type="file" name="realnameform.backend_card" @change="showPreview2" id="upload2" />
          <img style="width:100px;display:block" id="backend" :src="realnameform.backend_card" />
        </el-form-item>
        <!-- <el-form-item :label="$t('realname.Verificationcode')" prop="code">
          <el-input style="width:30%" v-model="realnameform.code"></el-input>
          <el-button style="margin-left:10px" @click="getemilcodes" :disabled="disabled" type="primary">{{codetext}}</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-loading="listLoading" @click="submitForm('realnameform')">{{$t('realname.submit')}}</el-button>
        </el-form-item>
      </el-form>

    </el-card>
    <div class="v-load" v-loading="listLoadings"></div>
  </div>
</template>
<script>
import certification from "./certification";
export default certification;
</script>

<style lang="scss">
@keyframes init {
    0% {
        opacity: 0;
        transform: translateY(-300px) translateX(-50px);
    }
    50% {
        opacity: 0.5;
        transform: translateY(0px) translateX(0px);
    }
    100% {
        opacity: 1;
    }
}
#certification {
    animation: init 1s;
    padding: 20px;
    .el-form-item__label {
        padding: 0px 10px 0px 0px;
    }
    .el-select {
        width: 100%;
    }
    .v-load {
        position: absolute;
        left: 50%;
        top: 50%;
    }
}
</style>
