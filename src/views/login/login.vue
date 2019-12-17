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
      <el-form ref="form" id="login-form" :model="form" :rules="rules" status-icon>
        <!-- 输入用户名 -->
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="18">
              <el-input v-model="form.captcha" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="6">
              <img :src="captchaUrl" class="code" @click="changCaptcha" />
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
          <el-button type="primary" @click="checkShow">登录</el-button>
          <el-button type="primary" @click="toShow">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <img src="../../assets/image/login_banner_ele.png" />
    <register ref="son"></register>
  </div>
</template>
<script>
import register from "@/components/register.vue";
import { setToken } from "@/utils/token.js";
import { login } from "@/api/request.js";
export default {
  name: "login",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号不正确"));
        }
      }
    };
    return {
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        captcha: [
          //CAPTCHA
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码在 4字符", trigger: "change" }
        ]
      },
      captchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login"
    };
  },
  components: {
    register
  },
  methods: {
    toShow() {
      this.$refs.son.dialogFormVisible = true;
    },
    //用户登录函数
    checkShow() {
      if (!this.form.checked) {
        this.$message.warning("用户协议没有勾上,请勾上!!!");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            login({
                  phone: this.form.phone,
                  password: this.form.password,
                  code: this.form.captcha
            }).then(res => {
              if (res.data.code == 200) {
                window.console.log(res);
                setToken(res.data.data.token);
                this.$router.push("/index");
              } else {
                this.$message.warning(res.data.message);
              }
            });
          } else {
            this.$message.error("很遗憾,写错了");
            return false;
          }
        });
      }
    },
    changCaptcha() {
      this.captchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    }
  },
  created() {
    // this.$axios('/captcha?type=login').then(res=>{
    //   window.console.log(res)
    // })
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
    .el-button {
      width: 100%;
      margin: 14px 0;
    }
  }
}
</style>