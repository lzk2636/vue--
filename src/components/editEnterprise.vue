<template>
  <!-- <div  class="my-dialog"> -->
  <el-dialog title="编辑企业" :visible.sync="dialogFormVisible" center>
    <el-form
      :model="enterpriseEditForm"
      :rules="enterpriseEditFormRules"
      ref="enterpriseEditForm"
      style="width: 550px;"
    >
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="enterpriseEditForm.eid" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="enterpriseEditForm.name" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="enterpriseEditForm.short_name" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="enterpriseEditForm.intro" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="enterpriseEditForm.remark" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
  <!-- </div> -->
</template>

<script>
import { enterpriseEdit } from "@/api/enterprise.js";
export default {
  name:"enterpriseEdit",
  data() {
    return {
      dialogFormVisible: false,
      enterpriseEditForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "80px",
      enterpriseEditFormRules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //  window.console.log(  this.form)
      this.$refs.enterpriseEditForm.validate(valid => {
        if (valid) {
          //添加数据
          enterpriseEdit(this.enterpriseEditForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success("表单修改成功");
              this.dialogFormVisible = false;
                this.$refs.enterpriseEditForm.resetFields();
              this.$parent.search();
            }else if(res.data.code===201){
              this.$message.error("企业编号已经存在")
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
      this.dialogFormVisible = false;

      this.$refs.enterpriseEditForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.my-dialog {
  .el-dialog {
    .el-dialog__wrapper {
      .el-dialog--center {
        width: 600px;

        .el-dialog__header {
          text-align: center;
          padding-top: 13px;
          background: linear-gradient(to right, #01c4fa, #109bfa);
          .el-dialog__title {
            color: #fff;
          }
          .el-dialog__headerbtn {
            .el-dialog__close {
              color: #fff;
            }
          }
        }
      }
    }
  }
}

.aStyle {
  width: 459px;
}
</style>