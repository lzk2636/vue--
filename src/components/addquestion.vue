<template>
  <div class="mian-container">
    <el-dialog :title="title" :visible.sync="dialogFormVisible" fullscreen @open="open">
      <el-form :model="addquestform" :rules="addquestformRules" ref="addquestform">
        <el-form-item label="学科" :label-width="formLabelWidth" prop="subject" class="quest_width">
          <el-select v-model="addquestform.subject" placeholder="请选择学科">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in $parent.subjectList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="addquestform.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>

            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item
          label="企业"
          prop="enterprise"
          :label-width="formLabelWidth"
          class="quest_width"
        >
          <el-select v-model="addquestform.enterprise" placeholder="请选择企业">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in $parent.enterpriseList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city" :label-width="formLabelWidth" class="quest_width">
          <el-cascader
            size="large"
            :options="options"
            v-model="addquestform.city"
            :props="{ expandTrigger: 'hover' ,value:'label'}"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth" class="quest_width">
          <el-radio-group v-model="addquestform.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="难度"
          prop="difficulty"
          :label-width="formLabelWidth"
          class="quest_width"
        >
          <el-radio-group v-model="addquestform.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题标题" :label-width="formLabelWidth" prop="title">
          <br />
          <editor-bar v-model="addquestform.title" :isClear="isClear"></editor-bar>
        </el-form-item>
        <br />
        <!-- 单选 -->
        <el-form-item
          label="单选"
          v-if="addquestform.type==1"
          :label-width="formLabelWidth"
          class="content_upload"
          prop="select_options"
        >
          <br />

          <el-radio-group v-model="addquestform.single_select_answer">
            <el-row>
              <el-col :span="14">
                <!-- <el-radio label=""></el-radio> -->
                <el-radio label="A">A</el-radio>
                <el-input width="476px" v-model="addquestform.select_options[0].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessA"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-radio v-model="addquestform.select_options[1].label" label="B">B</el-radio>
                <el-input width="476px" v-model="addquestform.select_options[1].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessB"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-radio v-model="addquestform.select_options[2].label" label="C">C</el-radio>
                <el-input width="476px" v-model="addquestform.select_options[2].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessC"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-radio v-model="addquestform.select_options[3].label" label="D">D</el-radio>
                <el-input width="476px" v-model="addquestform.select_options[3].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessD"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
        <!-- 多选 -->
        <el-form-item
          label="多选"
          v-if="addquestform.type==2"
          :label-width="formLabelWidth"
          class="content_upload"
          prop="select_options"
        >
          <br />
          <el-checkbox-group v-model="addquestform.multiple_select_answer">
            <!-- <el-radio-group v-model="addquestform.single_select_answer"> -->
            <el-row>
              <el-col :span="14">
                <!-- <el-radio label=""></el-radio> -->
                <el-checkbox label="A">A</el-checkbox>
                <el-input width="476px" v-model="addquestform.select_options[0].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessA"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-checkbox v-model="addquestform.select_options[1].label" label="B">B</el-checkbox>
                <el-input width="476px" v-model="addquestform.select_options[1].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessB"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-checkbox v-model="addquestform.select_options[2].label" label="C">C</el-checkbox>
                <el-input width="476px" v-model="addquestform.select_options[2].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessC"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-checkbox v-model="addquestform.select_options[3].label" label="D">D</el-checkbox>
                <el-input width="476px" v-model="addquestform.select_options[3].text"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-upload
                  class="avatar-uploader"
                 :action="action"
                  :show-file-list="false"
                  name="file"
                  :on-success="handleAvatarSuccessD"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <!-- 简答题 -->
        <el-form-item
          v-if="addquestform.type==3"
          label="简答题"
          :label-width="formLabelWidth"
          prop="short_answer"
        >
          <br />
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addquestform.short_answer"
          ></el-input>
        </el-form-item>

        <el-divider></el-divider>
        <el-form-item label="视屏解析" :label-width="formLabelWidth">
          <el-upload
            class="vidieo"
            :action="action"
            :on-success="handleAudioSuccess"
            :before-upload="beforeAudioUpload"
            name="file"
            multiple
            :limit="3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>

            <div slot="tip">只能上传video文件，且不超过2000kb</div>
          </el-upload>
        </el-form-item>
        <video :src="videoUrl" controls v-if="videoUrl" style="width:300px;text-align:left"></video>

        <el-divider></el-divider>
        <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze">
          <br />
          <editor-bar v-model="addquestform.answer_analyze" :isClear="isClear"></editor-bar>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题备注" :label-width="formLabelWidth" prop="remark">
          <br />
          <!-- <el-input style="width:754px;" v-model="addquestform.remark"></el-input> -->

          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addquestform.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import EditorBar from "@/components/wangEnduit";
import { questionAdd, questionEdit } from "@/api/question";
// import VDistpicker from "v-distpicker";

export default {
  name: "addquestion",
  data() {
    return {
      options: regionData,
      title: "新增题库测试",

      addquestform: {
        //newData
        title: "",
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        multiple_select_answer: [],
        type: "",
        difficulty: "",
        video: "",
        answer_analyze: "",
        single_select_answer: "A",
        select_options: [
          {
            label: "A",
            text: "",
            image: ""
          },
          {
            label: "B",
            text: "",
            image: ""
          },
          {
            label: "C",
            text: "",
            image: ""
          },
          {
            label: "D",
            text: "",
            image: ""
          }
        ]
      },
      action:process.env.VUE_APP_BASEURL +"question/upload",
      formLabelWidth: "280px",
      dialogFormVisible: false,
      imageUrlA: "",
      imageUrlB: "",
      imageUrlC: "",
      imageUrlD: "",
      videoUrl: "",

      fileList: [],

      // 富文本编辑器
      isClear: false,
      detail: "",

      //绑定规则
      addquestformRules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        subject: [{ required: true, message: "学科不能为空", trigger: "blur" }],
        step: [{ required: true, message: "阶段不能为空", trigger: "blur" }],
        enterprise: [
          { required: true, message: "企业不能为空", trigger: "blur" }
        ],
        city: [{ required: true, message: "城市不能为空", trigger: "blur" }],
        type: [{ required: true, message: "题型不能为空", trigger: "blur" }],
        difficulty: [
          { required: true, message: "难度不能为空", trigger: "blur" }
        ],
        vidieo: [
          { required: true, message: "视屏地址不能为空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "答案解析不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "答案备注不能为空", trigger: "blur" }
        ],
        select_options: [
          { required: true, message: "选项不能为空", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "答案备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    EditorBar
    // VDistpicker
  },
  computed: {
    selectOptions: function() {
      return this.addquestform.select_options;
    }
  },
  methods: {
    open() {
      // window.console.log(this.selectOptions);
      this.imageUrlA =
        this.selectOptions[0].image !== ""
          ? process.env.VUE_APP_BASEURL + this.selectOptions[0].image
          : "";
      this.imageUrlB =
        this.selectOptions[1].image !== ""
          ? process.env.VUE_APP_BASEURL + this.selectOptions[1].image
          : "";
      this.imageUrlC =
        this.selectOptions[2].image !== ""
          ? process.env.VUE_APP_BASEURL + this.selectOptions[2].image
          : "";
      this.imageUrlD =
        this.selectOptions[3].image !== ""
          ? process.env.VUE_APP_BASEURL + this.selectOptions[3].image
          : "";

      this.videoUrl =
        this.addquestform.video !=undefined
          ? process.env.VUE_APP_BASEURL + this.addquestform.video
          : "";
    },

    //表单提交
    submitForm() {
      this.$refs.addquestform.validate(valid => {
        if (valid) {
          //   window.alert("submit!");
          if (!this.addquestform.id) {
            questionAdd(this.addquestform).then(res => {
              //   window.console.log(res)
              if (res.data.code === 200) {
                this.$message.success("题目发布成功!!");
                this.dialogFormVisible = false;
                this.$refs.addquestform.resetFields();
                this.videoUrl = "";
                this.$parent.search();
              }
            });
          } else {
            questionEdit(this.addquestform).then(res => {
              if (res.data.code === 200) {
                this.$message.success("题目修改成功!!");
                this.dialogFormVisible = false;
                this.$refs.addquestform.resetFields();
                this.videoUrl = "";
                this.$parent.search();
              }
            });
          }
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.addquestform.resetFields();
      this.dialogFormVisible = false;
    },

    // 图像上传A
    handleAvatarSuccessA(res, file) {
      window.console.log(res);
      this.addquestform.select_options[0].image = res.data.url;
      this.imageUrlA = URL.createObjectURL(file.raw);
    },
    // 图像上传B
    handleAvatarSuccessB(res, file) {
      this.addquestform.select_options[1].image = res.data.url;
      this.imageUrlB = URL.createObjectURL(file.raw);
    },
    // 图像上传C
    handleAvatarSuccessC(res, file) {
      this.addquestform.select_options[2].image = res.data.url;
      this.imageUrlC = URL.createObjectURL(file.raw);
    },
    // 图像上传D
    handleAvatarSuccessD(res, file) {
      this.addquestform.select_options[3].image = res.data.url;
      this.imageUrlD = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,png,gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //视屏解析
    beforeAudioUpload(file) {
      window.console.log(file);
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 11;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //文件上传成功
    handleAudioSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.addquestform.video = res.data.url;
    }
    //文件上传

    // //富文本编辑器
    // change(val) {
    //   window.console.log(val);
    // }
  },
  created() {}
};
</script>

<style lang="less">
.mian-container {
  .el-dialog {
    // width: 1429px;
    .el-dialog__header {
      text-align: left;
    }
    .el-dialog__body {
      width: 100%;
      .el-form {
        width: 60%;
        margin: 0 auto;

        .el-form-item {
          .el-select {
            width: 364px;
            margin-left: 50px;
          }
          .vidieo {
            // display: inline-block;
            // direction: flex;

            text-align: left;
            // justify-content: left;
            // position: absolute;
            // left: 0;
            // top: 0;
          }
          .el-checkbox-group {
            width: 100%;
            .el-input {
              margin-left: 10px;
            }
            .el-row {
              display: flex;
              align-items: center;
              margin-top: 20px;
            }
          }
          .el-radio-group {
            width: 100%;
            .el-row {
              display: flex;
              align-items: center;
              margin-top: 20px;
            }
          }
        }
        .quest_width {
          width: 600px;
        }
        .content_upload {
          .el-row {
            .el-col-14 {
              display: flex;
              align-items: center;
            }

            .avatar-uploader {
              text-align: right;
              margin-right: -70px;
            }
          }
        }
      }
    }
  }
}
</style>