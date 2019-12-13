<template>
  <div id="login-contaner">
    <div class="login-box">
      <!-- 首行logo -->
      <div class="login-icon">
        <img src="../../assets/image/login-icon.png" />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="use">用户登录</span>
      </div>
      <!-- 登入表单验证 -->
      <el-form ref="form" id="login-form" :model="form">
        <!-- 输入用户名 -->
        <el-form-item>
          <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.name"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <el-input
                v-model="form.name"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <img src="../../assets/image/yanzhencode.png" class="code" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- checkedbox -->
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并且同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" >登录</el-button>
          <el-button type='primary' @click="toShow">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <img src="../../assets/image/login_banner_ele.png" />
    <register ref='son'></register>
  </div>
</template>
<script>
import register from "@/components/register.vue";
export default {
  name: "login",
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
        desc: "",
        checked:false
      }
    };
  },
  components: {
     register
  },
  methods:{
    toShow(){
      this.$refs.son.dialogFormVisible=true
    }

  }
};
</script>
<style lang="less" >
#login-contaner {
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  justify-content: space-around;
  align-items: center;
  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    //首行导航图标
    .login-icon {
      align-items: center;
      display: flex;
      padding-top: 38px;
      img {
        margin-left: 48px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      i {
        width: 1px;
        margin: 0 12px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .use {
         font-weight: 400;
        font-size: 21px;
      }
    }
    //表单验证表
    #login-form {
      margin-top: 39px;
      width: 394px;
      margin-left: 48px;
      .code {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
    }
    //登录按钮
    .el-button{
      width: 100%;
      margin: 14px 0;
    }
  }
}
</style>