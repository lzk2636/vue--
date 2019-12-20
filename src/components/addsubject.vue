<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
    <el-form :model="xkForm" :rules="xkFormRules" ref="xkForm" style="width:540px">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="xkForm.rid" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="xkForm.name" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="xkForm.short_name" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="xkForm.intro" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="xkForm.remark" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject";
export default {
  data() {
    return {
      id: "",
      title: "添加学科",
      dialogFormVisible: false,
      xkForm: {
        //学科编号
        rid: "",
        //学科名称
        name: "",     
        //学校简称
        short_name: "",
        //创建时间
        create_time:new Date(),
        //更新时间
        update_time:new Date(),
        //学科简介
        intro: "",
        //学科备注
        remark: ""
      },
      formLabelWidth: "80px",
      xkFormRules: {
        rid: [
          { required: true, message: "学科编号不能为空", trigger: "blur" },
         
        ],
        name: [
          { required: true, message: "学科名称不能为空", trigger: "blur" },
       
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //  window.console.log(  this.form)
      this.$refs.xkForm.validate(valid => {
        if (valid) {
          if (!this.xkForm.id) {
            addSubject(this.xkForm).then(res => {
              // window.console.log(res);
              if (res.data.code === 200) {
                this.dialogFormVisible = false;
                this.$refs.xkForm.resetFields();
                this.$parent.search();
                this.$message.success("新增成功");
              }else if(res.data.code===201){
                this.$message.error("学科编号已经存在了")
              }
            });
          } else {
            editSubject(this.xkForm).then(res=>{
               if (res.data.code === 200) {
                this.dialogFormVisible = false;
                this.$refs.xkForm.resetFields();
                this.$parent.search();
                this.$message.success("修改成功");
              }else if(res.data.code===201){
                this.$message.error("学科编号已经存在了")
              }
            })
          }
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

      this.$refs.xkForm.resetFields();
    }
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