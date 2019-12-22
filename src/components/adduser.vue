<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" center>
    <el-form :model="userForm" :rules="userRules" ref="userForm" style="width:477px">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="userForm.username" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="userForm.email" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="userForm.phone" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="seleted">
        <el-select v-model="seleted" placeholder="选择角色">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="statusSelected" placeholder="选择状态">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in statusOption"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="userForm.remark" class="aStyle" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUser, editUser } from "@/api/user";
import { checkedPhone, checkEmail } from "@/utils/checked";
export default {
  data() {
    return {
      title: "新增用户",
      dialogFormVisible: false,
      id: "",
      userForm: {
        //用户名
        username: "",
        //邮箱
        email: "",
        //手机号
        phone: "",
        password: "123456",
        //角色
        role_id: "",
        //状态
        status: "",
        remark: ""
      },
      formLabelWidth: "80px",
      userRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkedPhone, trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        role_id: [
          { required: true, message: "请选择状态", trigger: "change" },
          { max: 1, min: 1, message: "状态值为1位数字", trigger: "change" }
        ]
      },

      //角色选项
      options: [
        {
          value: 2,
          label: "管理员"
        },
        {
          value: 3,
          label: "老师"
        },
        {
          value: 4,
          label: "学生"
        }
      ],
      seleted: 2,
      //状态选项
      statusOption: [
        {
          label: "开启",
          value: 1
        },
        {
          label: "禁用",
          value: 0
        }
      ],
      statusSelected: 1
    };
  },
  methods: {
    submitForm() {
      //  window.console.log(  this.form)
      this.$refs.userForm.validate(valid => {
        if (valid) {
          //新增用户
          if (!this.userForm.id) {
            this.userForm.role_id = this.seleted;
            this.userForm.status = this.statusSelected;
            addUser(this.userForm).then(res => {
              window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("提交成功");
                this.dialogFormVisible = false;
                this.$parent.search();
              } else if (res.data.code == 201) {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.userForm.role_id = this.seleted;
            this.userForm.status = this.statusSelected;
            editUser(this.userForm).then(res => {
              // window.console.log(res)
              if (res.data.code === 200) {
                this.$message.success("设置成功!!!");
                this.$parent.search();
                this.dialogFormVisible = false;
              }
            });
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

      this.$refs.userForm.resetFields();
    }
  },
  created() {}
};
</script>

<style lang="less">
.el-dialog__wrapper {
  .el-el-dialog--center--center {
    width: 477px;

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
    .dialog-footer {
      text-align: right;
    }
  }
}

.aStyle {
  width: 459px;
}
</style>