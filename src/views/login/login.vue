<template>
  <div id="login">
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-form ref="form" label-width="80px" id="from">
            <span class="title">黑马面面</span>|
            <span class="title">用户登录</span>
            <el-form-item>
            <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="input2"></el-input>
            </el-form-item>
            <el-form-item>
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2"></el-input>
            </el-form-item>
             <el-form-item>
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-male" v-model="input2"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    }
  }
};
</script>
<style lang="css">
span.title {
  width: 98px;
  height: 22px;
  font-size: 24px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: rgba(12, 12, 12, 1);
}
#login {
  width: 100%;
  height: 934px;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
}
#from {
  /* text-align: center; */
  margin-top: 119px;
  margin-left: 73px;
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
}
</style>