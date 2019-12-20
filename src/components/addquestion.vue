<template>
  <div class="mian-container">
    <el-dialog title="新增题库测试" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="学科" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="form.region" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="form.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="form.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="企业" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择企业"  class="quest_width">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="城市" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="form.region" placeholder="请选择城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" :label-width="formLabelWidth" class="quest_width">
           
          <el-radio v-model="radio" label="1">单选</el-radio>
          <el-radio v-model="radio" label="2">多选</el-radio>
          <el-radio v-model="radio" label="3">简答</el-radio>
        </el-form-item>
        <el-form-item label="难度" :label-width="formLabelWidth" class="quest_width">
          <el-radio v-model="radio" label="1">简单</el-radio>
          <el-radio v-model="radio" label="2">一般</el-radio>
          <el-radio v-model="radio" label="3">困难</el-radio>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题标题" :label-width="formLabelWidth">
          <br />
          <div id="editor">
            <p>
              欢迎使用
              <b>wangEditor</b> 富文本编辑器
            </p>
          </div>
        </el-form-item>
        <br />
        <!-- 内容2 -->
        <el-form-item label="单选" :label-width="formLabelWidth" class="content_upload">
          <br />
          <br />
          <br />
          <el-row>
            <el-col :span="12">
              <el-radio v-model="radio" label="1">A</el-radio>
              <el-input width="476px"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-radio v-model="radio" label="1">B</el-radio>
              <el-input width="476px"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-radio v-model="radio" label="1">C</el-radio>
              <el-input width="476px"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-radio v-model="radio" label="1">D</el-radio>
              <el-input width="476px"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="视屏解析" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="答案解析" :label-width="formLabelWidth">
          <br />
          <div id="editor">
            <p>
              欢迎使用
              <b>wangEditor</b> 富文本编辑器
            </p>
          </div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题备注" :label-width="formLabelWidth">
          <br />
          <el-input style="width:754px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addquestion",
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
      radio: "",
      formLabelWidth: "280px",
      dialogFormVisible: true,
      imageUrl: "",
      fileList: []
    };
  },
  methods: {
    // 图像上传
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
    },
    //文件上传
    beforeRemove(file, fileList) {
      window.console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      window.console.log(file, fileList);
    },
    handlePreview(file) {
      window.console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }
  }
};
</script>

<style lang="less">
.mian-container {
  .el-dialog {
    width: 1429px;
    .el-dialog__body {
      width: 100%;
      .el-form {
        width: 100%;
        .el-form-item {
          .el-select {
            width: 364px;
          }
        }
        .quest_width{
            width: 600px;
        }
        .content_upload{
            .el-row{
                display: flex;
                align-items: center;
                .el-col-12{
                    display: flex;
                     align-items: center;
                }

            }
        }
      }
    }
  }
}
</style>