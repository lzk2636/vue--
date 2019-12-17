<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.user" class="Awidth" placeholder></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="formInline.user" class="Bwidth" placeholder></el-input>
      </el-form-item>
     
      <el-form-item label="角色">
        <el-select v-model="formInline.region" placeholder="选择状态" class="Bwidth">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>清除</el-button>
        <el-button type="primary" @click="adduser">+新建用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="my-table" border  height="250">
      <el-table-column label="序号" width="60" prop="xh"></el-table-column>
      <el-table-column label="用户名" width="180" prop="xkbh"></el-table-column>
      <el-table-column label="电话" prop="xkmc"></el-table-column>
      <el-table-column label="邮箱" prop="js"></el-table-column>
      <el-table-column label="角色" prop="cjz"></el-table-column>
      <el-table-column label="备注" prop="date"></el-table-column>
      <el-table-column label="状态" prop="status">
        <!-- <el-button type="text" size="small" v-if="tableData.status==1">启用</el-button> -->
        <el-button type="text" size="small" v-if="tableData.status==2">禁用</el-button>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">禁用</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <adduser ref="adduser"></adduser>
  </div>
</template>

<script>
 import adduser from "@/components/adduser.vue";

export default {
  name: "subject",
  components: {
  adduser
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          xh: "1",
          xkbh: "QDDD",
          xkmc: "java",
          js: "后端",
          cjz: "刘洋洋",
          date: "2019-11-21",
          status: "1"
        },
        {
          xh: "1",
          xkbh: "QDDD",
          xkmc: "java",
          js: "后端",
          cjz: "刘洋洋",
          date: "2019-11-21",
          status: "1"
        },
        {
          xh: "1",
          xkbh: "QDDD",
          xkmc: "java",
          js: "后端",
          cjz: "刘洋洋",
          date: "2019-11-21",
          status: "2"
        },
        {
          xh: "1",
          xkbh: "QDDD",
          xkmc: "java",
          js: "后端",
          cjz: "刘洋洋",
          date: "2019-11-21",
          status: "1"
        }
      ],
      currentPage4: 4
    };
  },
  methods: {
    adduser() {
      this.$refs.adduser.dialogFormVisible = true;
    },
    //分页功能
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      window.console.log(`当前页: ${val}`);
    }
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
  .el-table__header-wrapper{
    border: 1px solid #EBEEF5;
    border-bottom:0;
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
  .el-pager{
     display: flex;
    align-items: center;
  }
}
</style>