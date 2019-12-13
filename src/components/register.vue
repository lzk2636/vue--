<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible" center width="600px">
    <el-form :model="form">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" id="my-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="呢称" :label-width="formLabelWidth">
        <el-input placeholder></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input placeholder></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input placeholder></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input placeholder></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="18">
          <el-form-item label="图形码" :label-width="formLabelWidth">
            <el-input placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <img src="../assets/image/yanzhenma2.png" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="验证码" :label-width="formLabelWidth">
            <el-input placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button>获取用户验证码</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "register",
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
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "60px",
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

  <style lang='less'>
//  .avatar-uploader> i#my-icon::before{
//       position: absolute
//   }
.el-dialog__header {
  /* height: 53px; */
   color: #fff;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
 
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
  &::before{
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