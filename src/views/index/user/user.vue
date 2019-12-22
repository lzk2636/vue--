<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.username" class="Awidth" placeholder></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="formInline.email" class="Bwidth" placeholder></el-input>
      </el-form-item>

      <el-form-item label="角色">
        <el-select v-model="formInline.role_id" placeholder="选择状态" class="Bwidth">
          <el-option label="数学" value="1"></el-option>
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchs">搜索</el-button>
        <el-button @click="clear">清除</el-button>
        <el-button type="primary" @click="adduser" class="el-icon-plus">新建用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="my-table" border height="600px">
      <el-table-column label="序号" width="60" type="index"></el-table-column>
      <el-table-column label="用户名" width="180" prop="username"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-link v-if="scope.row.status==1">启用</el-link>
          <el-link type="danger" v-else>禁用</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editUser(scope.row)" v-mypower='["管理员","老师","学生"]'>编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="setStatus(scope.row.id)"
            v-if="scope.row.status==1"
          >禁用</el-button>
          <el-button
            type="text"
            size="small"
            @click="setStatus(scope.row.id)"
            v-if="scope.row.status==0"
          >启用</el-button>
          <el-button type="text" size="small" @click="deleteUsers(scope.row.id)" v-mypower='["管理员","老师","学生"]'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <adduser ref="adduser"></adduser>
  </div>
</template>

<script>
import adduser from "@/components/adduser.vue";
import { userList, deleteUser, changeStatus } from "@/api/user";

export default {
  name: "subject",
  components: {
    adduser
  },
  data() {
    return {
      total: 0,
      formInline: {
        username: "",
        email: "",
        role_id: ""
        // page: 1,
        // limit: 10
      },
      page: 1,
      limit: 5,
      tableData: [],
      pageSizes: [5, 10],
      pageSize: 5,
      currentPage4: 1
    };
  },
  methods: {
    adduser() {
      // this.$refs.adduser.id = "";
      this.$refs.adduser.userForm = {
        password:'123456'
      };
      this.$refs.adduser.seleted ="";
      this.$refs.adduser.statusSelected ="";
      this.$refs.adduser.title = "新增用户";
      this.$refs.adduser.dialogFormVisible = true;
    },
    //分页功能
    handleSizeChange(size) {
      // window.console.log(`每页 ${val} 条`);
      this.limit = size;
      this.search();
    },
    handleCurrentChange(page) {
      // window.console.log(`当前页: ${page}`);
      this.page = page;
      this.search();
    },
    //条件查询
    searchs() {
      this.page = 1;
      this.search();
    },
    //查询用户
    search() {
      userList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        this.currentPage4 = Number(res.data.data.pagination.page);
        this.total = res.data.data.pagination.total;
        this.tableData = res.data.data.items;
      });
    },
    //清空列表函数
    clear() {
      for (const key in this.formInline) {
        this.formInline[key] = "";
      }
      this.search();
    },
    editUser(data) {
      this.$refs.adduser.userForm = JSON.parse(JSON.stringify(data));
      this.$refs.adduser.seleted = data.role_id ;
      this.$refs.adduser.statusSelected = data.status;
      this.$refs.adduser.title = "编辑用户";
      this.$refs.adduser.dialogFormVisible = true;
    },
    //删除用户
    deleteUsers(id) {
      this.$confirm("你确定要删除用户吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          deleteUser(id).then(res => {
            if (res.data.code == 200) {
              // this;
              this.$message.error("删除用户成功");
              this.search();
            }
            // window.console.log(res);
          });
        })
        .catch(() => {
          this.$message.success("取消用户删除");
        });
    },
    //设置用户状态
    setStatus(id) {
      changeStatus(id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("状态设置成功");
          this.search();
        } else {
          this.$message.error("状态设置失败");
        }
      });
    }
  },
  created() {
    this.search();
    // userList().then(res => {
    //   // window.console.log(res);
    //   this.currentPage4 = res.data.data.pagination.page;
    //   this.total = res.data.data.pagination.total;
    //   this.tableData = res.data.data.items;
    // });
  }
};
</script>

<style lang="less">
.container {
  height: 100%;
  background-color: #e8e9ec;

  overflow: hidden;
  text-align: center;

  .demo-form-inline {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: #fff;
    box-sizing: border-box;
    width: 1191px;
    height: 103px;
    // padding-top: 21px;
    margin: 20px auto;
  }
  .my-table {
    padding: 10px;
    width: 1191px;
    margin: 0 auto;
    border-radius: 6px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-table__header-wrapper {
    border: 1px solid #ebeef5;
    border-bottom: 0;
  }

  .Awidth {
    width: 100px;
  }

  .Bwidth {
    width: 149px;
  }
  .el-pagination {
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    background: #fff;
    width: 1191px;
    // text-align: center;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .el-pager {
    display: flex;
    align-items: center;
  }
}
</style>