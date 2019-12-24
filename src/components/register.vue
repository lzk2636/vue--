<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center width="600px">
    <el-form :model="form" :rules="rules" status-icon ref="form">
      <el-form-item label="用户头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" id="my-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="呢称" :label-width="formLabelWidth" prop="username">
        <el-input placeholder v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input placeholder v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input placeholder v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input placeholder v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="16">
          <el-form-item label="图形码" :label-width="formLabelWidth">
            <el-input placeholder class="captcha" v-model="form.trode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <img :src="tcodeUrl" width="95%" @click="changCodeUrl" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
            <el-input placeholder class="captcha" v-model="form.rcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-button @click="sendPhone" :disabled="time!=0">{{time==0?'获取用户验证码':`还有${time}s重新获取`}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendsms ,register} from "@/api/request.js";
import { checkedPhone, checkEmail } from "@/utils/checked";
export default {
  name: "register",

  data() {
    // 验证手机号
   
    return {
      form: {
        username: "",
        phone: "",
        avatar: "",
        rcode: "",
        trode: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "65px",
      imageUrl: "",
      action:process.env.VUE_APP_BASEURL +"uploads",
      //图形码
      tcodeUrl: process.env.VUE_APP_BASEURL + "captcha?type=login",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "用户名长度在 3 到 18个字符",
            trigger: "blur"
          }
        ],
        phone: [{ required: true, validator: checkedPhone, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "密码长度在 3 到 18个字符",
            trigger: "blur"
          }
        ],

        rcode: [
          { message: "请输入验证码", trigger: "blur", required: true },
          {
            min: 4,
            max: 4,
            message: "验证码4个字符",
            trigger: "blur"
          }
        ]
      },
      time: 0
    };
  },
  methods: {
    //头像上传代码
    handleAvatarSuccess(res, file) {
      // window.console.log(res);
      this.form.avatar = res.data.file_path;
      // window.console.log(file);

      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //条线码点击切换事件
    changCodeUrl() {
      this.tcodeUrl =
        process.env.VUE_APP_BASEURL + "captcha?type=sendsms&" + Date.now();
    },
    //发送手机号获取验证码
    sendPhone() {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regPhone.test(this.form.phone)) {
        return this.$message.error("手机号码不正确");
      }
      if (this.form.trode == "" || this.form.trode.length != 4) {
        return this.$message.error("验证码长度必须4位");
      }
      this.time = 60;
      const timeId = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(timeId);
        }
      }, 1000);

      sendsms({
        code: this.form.trode,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
        setTimeout(() => {
          if (res.data.code == 200) {
            this.form.rcode = res.data.data.captcha;
          } else {
            this.$message.warning("手机号或验证码错误!!!!!");
          }
        }, 5000);
      });
    },
    //表单提交
    submitForm() {
      //  window.console.log(  this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          register(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
              this.$refs.form.resetFields();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          // console.log('error submit!!');
          this.$message.error("数据填写有错误,请重新查看");
          return false;
        }
      });
    },
    //表单重置
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang='less'>
.el-dialog__header {
  /* height: 53px; */
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .el-dialog__title {
    color: #fff;
  }
}
.captcha {
  width: 80%;
}

.avatar-uploader {
  text-align: center;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    &::before {
      position: absolute;
      left: 42%;
    }
  }
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>