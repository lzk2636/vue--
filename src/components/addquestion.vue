<template>
  <div class="mian-container">
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="addquestform" :rules="addquestformRules" ref="addquestform">
        <el-form-item label="学科" :label-width="formLabelWidth" prop="subject" class="quest_width">
          <el-select v-model="addquestform.subject" placeholder="请选择学科">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in subjectList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="addquestform.step" placeholder="请选择阶段">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in stepOptions"
              :key="index"
            ></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item
          label="企业"
          prop="enterprise"
          :label-width="formLabelWidth"
          class="quest_width"
        >
          <el-select v-model="addquestform.enterprise" placeholder="请选择阶段">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in enterpriseList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city" :label-width="formLabelWidth" class="quest_width">
          <el-select v-model="addquestform.city" placeholder="请选择城市" multiple>
            <el-option label="深圳" value="深圳"></el-option>
            <el-option label="上海" value="上海"></el-option>
            <el-option label="天津" value="天津"></el-option>
            <el-option label="珠海" value="珠海"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type" :label-width="formLabelWidth" class="quest_width">
          <el-radio v-model="addquestform.type" label="1">单选</el-radio>
          <el-radio v-model="addquestform.type" label="2">多选</el-radio>
          <el-radio v-model="addquestform.type" label="3">简答</el-radio>
        </el-form-item>
        <el-form-item
          label="难度"
          prop="difficulty"
          :label-width="formLabelWidth"
          class="quest_width"
        >
          <el-radio v-model="addquestform.difficulty" label="1">简单</el-radio>
          <el-radio v-model="addquestform.difficulty" label="2">一般</el-radio>
          <el-radio v-model="addquestform.difficulty" label="3">困难</el-radio>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题标题" :label-width="formLabelWidth" prop="title">
          <br />
          <editor-bar v-model="addquestform.title" :isClear="isClear" ></editor-bar>
        </el-form-item>
        <br />
        <!-- 内容2 -->
        <el-form-item
          label="单选"
          :label-width="formLabelWidth"
          class="content_upload"
          prop="select_options"
        >
          <br />
          <br />
          <br />
          <el-row>
            <el-col :span="12">
              <el-radio v-model="addquestform.select_options[0].label" label="A">A</el-radio>
              <el-input width="476px" v-model="addquestform.select_options[0].text"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1/heimamm/public/question/upload"
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
            <el-col :span="12">
              <el-radio v-model="addquestform.select_options[1].label" label="B">B</el-radio>
              <el-input width="476px" v-model="addquestform.select_options[1].text"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1/heimamm/public/question/upload"
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
            <el-col :span="12">
              <el-radio v-model="addquestform.select_options[2].label" label="C">C</el-radio>
              <el-input width="476px" v-model="addquestform.select_options[2].text"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1/heimamm/public/question/upload"
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
            <el-col :span="12">
              <el-radio v-model="addquestform.select_options[3].label" label="D">D</el-radio>
              <el-input width="476px" v-model="addquestform.select_options[3].text"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1/heimamm/public/question/upload"
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
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="视屏解析" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="http://127.0.0.1/heimamm/public/question/upload"
           
            :on-success="handleAudioSuccess"
          
            :before-remove="beforeRemove"
            name="file"
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
        <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze">
          <br />
          <editor-bar v-model="addquestform.answer_analyze" :isClear="isClear" ></editor-bar>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="试题备注" :label-width="formLabelWidth" prop="remark">
          <br />
          <el-input style="width:754px;" v-model="addquestform.remark"></el-input>
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
import EditorBar from "@/components/wangEnduit";
import { subjectList } from "@/api/subject";
import { enterpriseList } from "@/api/enterprise";
import { questionAdd ,questionEdit} from "@/api/question";

export default {
  name: "addquestion",
  data() {
    return {
      title:"新增题库测试",
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
            label: "",
            text: "",
            image: ""
          },
          {
            label: "",
            text: "",
            image: ""
          },
          {
            label: "",
            text: "",
            image: ""
          },
          {
            label: "",
            text: "",
            image: ""
          }
        ]
      },

      formLabelWidth: "280px",
      dialogFormVisible: false,
      imageUrlA: "",
      imageUrlB: "",
      imageUrlC: "",
      imageUrlD: "",

      fileList: [],

      // 富文本编辑器
      isClear: false,
      detail: "",
      //学科subject的列表
      subjectList: [],
      //   阶段
      stepOptions: [
        { label: "初级", value: "1" },
        { label: "中级", value: "2" },
        { label: "高级", value: "3" }
      ],
      //企业id标识
      enterpriseList: [],
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
        ]
      }
    };
  },
  components: {
    EditorBar
  },
  methods: {
    //表单提交
    submitForm() {
      this.$refs.addquestform.validate(valid => {
        if (valid) {
        //   window.alert("submit!");
        if(!this.addquestform.id){
          questionAdd(this.addquestform).then(res => {
            //   window.console.log(res)
            if (res.data.code === 200) {
              this.$message.success("题目发布成功!!");
              this.dialogFormVisible = false;
              this.$refs.addquestform.resetFields()
              this.$parent.search()
            }
          });

        }else{
          questionEdit(this.addquestform).then(res=>{
             if (res.data.code === 200) {
              this.$message.success("题目修改成功!!");
              this.dialogFormVisible = false;
              this.$refs.addquestform.resetFields()
              this.$parent.search()
            }
          })

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
      const isJPG = file.type === "image/jpeg"||file.type==="image/png" ||file.type==="image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG,png,gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //文件上传成功
    handleAudioSuccess(res) {
      this.addquestform.video = res.data.url;
    },
    //文件上传
    beforeRemove(file) {//文件列表移除文件时的钩子
    //   window.console.log(file, fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  
    //文件超出限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // //富文本编辑器
    // change(val) {
    //   window.console.log(val);
    // }
  },
  created() {
    subjectList().then(res => {
      if (res.data.code === 200) {
        window.console.log(res);
        this.subjectList = res.data.data.items;
      }
    });
    //enterpriseList
    enterpriseList().then(res => {
      if (res.data.code === 200) {
        this.enterpriseList = res.data.data.items;
      }
    });
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
            margin-left: 50px;
          }
        }
        .quest_width {
          width: 600px;
        }
        .content_upload {
          .el-row {
            display: flex;
            align-items: center;
            .el-col-12 {
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