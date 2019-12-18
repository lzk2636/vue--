<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.user_name" class="Awidth" placeholder></el-input>
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
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="clear">清除</el-button>
        <el-button type="primary" @click="adduser">+新建用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="my-table" border height="600px">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180" prop="username"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
       
          <el-link v-if=" scope.row.status==1">启用</el-link>
          <el-link type="danger" v-if=" scope.row.status==0">禁用</el-link>
         
        </template>
     
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editUser(scope.row.id)">编辑</el-button>
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
          <el-button type="text" size="small" @click="deleteUsers(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
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
        user_name: "",
        email: "",
        role_id: "",
        page: 1,
        limit: 10
      },
      tableData: [],
      currentPage4: 4
    };
  },
  methods: {
    adduser() {
      this.$refs.adduser.id = "";
      this.$refs.adduser.title = "新增用户";
      this.$refs.adduser.dialogFormVisible = true;
    },
    //分页功能
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // window.console.log(`当前页: ${val}`);
      this.formInline.page = val;
      this.search();
    },
    //查询用户
    search() {
      // window.console.log(this.formInline);
      this.tableData = [];
      userList(this.formInline).then(res => {
        this.currentPage4 = Number(res.data.data.pagination.page);
        this.total = res.data.data.pagination.total;

        res.data.data.items.forEach(element => {
          //  let status=status==0?'开启':'禁用' 	1(启用)0(禁用)
          this.tableData.push({
            id: element.id,
            username: element.username,
            phone: element.phone,
            role: element.role,
            remark: element.remark,
            email: element.email,
            status: element.status
          });
        });
      });
    },
    //清空列表函数
    clear() {
      this.formInline.user_name = this.formInline.email = this.formInline.role_id =
        "";
      this.search();
    },
    editUser(id) {
      window.console.log(id);
      this.$refs.adduser.id = id;
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
      changeStatus(id).then(res=>{
        if(res.data.code===200){
          this.$message.success("状态设置成功")
          this.search()
        }else{
           this.$message.error("状态设置失败")
        }
      })
    }
  },
  created() {
    userList().then(res => {
      // window.console.log(res);
      this.currentPage4 = res.data.data.pagination.page;
      this.total = res.data.data.pagination.total;

      res.data.data.items.forEach(element => {
        //  let status=status==0?'开启':'禁用' 	1(启用)0(禁用)
        this.tableData.push({
          id: element.id,
          username: element.username,
          phone: element.phone,
          role: element.role,
          remark: element.remark,
          email: element.email,
          status: element.status
        });
      });
      // res.data.data.items
    });
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