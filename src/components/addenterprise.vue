<template>
  <el-dialog title="新增企业" :visible.sync="dialogFormVisible" center>
    <el-form :model="xkForm" :rules="xkFormRules" ref="xkForm">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="xkbh">
        <el-input v-model="xkForm.xkbh" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="xkmv">
        <el-input v-model="xkForm.xkmv" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="xkForm.xkjc" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="xkForm.xkjj" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="xkForm.xkbz" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      xkForm: {
        //学科编号
        xkbh: "",
        //学科名称
        xkmc: "",
        //学校简称
        xkjc: "",
        //学科简介
        xkjj: "",
        //学科备注
        xkbz: ""
      },
      formLabelWidth: "80px",
      xkFormRules: {
        xkbh: [
          { required: true, message: "请输入学科编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        xkmv: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style lang="less">
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

.aStyle {
  width: 459px;
}
</style>