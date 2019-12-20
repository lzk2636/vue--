<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="企业编号">
        <el-input v-model="formInline.eid" class="Awidth"></el-input>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="formInline.name" class="Bwidth"></el-input>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="formInline.username" class="Awidth"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="选择状态" class="Bwidth">
          <el-option label="禁用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searcher">搜索</el-button>
        <el-button @click="clearData">清除</el-button>
        <el-button type="primary" @click="addenterprise" class="el-icon-plus">新增企业</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="my-table">
      <el-table-column label="序号" width="60" type="index"></el-table-column>
      <el-table-column label="企业编号" width="180" prop="eid"></el-table-column>
      <el-table-column label="企业名称" prop="name"></el-table-column>
      <el-table-column label="简称" prop="short_name"></el-table-column>
      <el-table-column label="创建者" prop="username"></el-table-column>
      <el-table-column label="创建者日期">
        <template slot-scope="scope">{{scope.row.create_time | filterTimes}}</template>
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-link type="primary" size="small" v-if="scope.row.status==1">启用</el-link>
          <el-link type="danger" size="small" v-else>禁用</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="setStatus(scope.row)"
          >{{scope.row.status==1?'禁用':'启用'}}</el-button>
          <el-button type="text" size="small" @click="romoveData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <addenterprise ref="addenterprise"></addenterprise>
  </div>
</template>

<script>
import addenterprise from "@/components/addenterprise.vue";
import { enterpriseList, enterpriseDelete,enterpriseStatus } from "@/api/enterprise";
export default {
  name: "enterprise",
  components: {
    addenterprise
  },
  data() {
    return {
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [],
      currentPage: 4,
      total: 0,
      limit: 5,
      pageSizes: [5, 6, 8, 10]
    };
  },
  methods: {
    addenterprise() {
      this.$refs.addenterprise.dialogFormVisible = true;
    },
    //分页功能
    handleSizeChange(size) {
      // window.console.log(`每页 ${size} 条`);
      this.limit = size;
      this.search();
    },
    handleCurrentChange(page) {
      // window.console.log(`当前页: ${page}`);
      this.currentPage = page;
      this.search();
    },
    //条件查询
    searcher() {
      this.currentPage = 1;
      this.search();
    },
    search() {
      enterpriseList(
        {
          page: this.currentPage,
          limit: this.limit,
          ...this.formInline
        }
        // his.formInline
      ).then(res => {
        // window.console.log(res)
        if (res.data.code === 200) {
          this.tableData = res.data.data.items;
          this.currentPage = Number(res.data.data.pagination.page);
          this.total = res.data.data.pagination.total;
        }
      });
    },
    //清除数据
    clearData() {
      for (const key in this.formInline) {
        this.formInline[key] = "";
        this.search();
      }
    },
    //删除数据
    romoveData(data) {
      window.console.log(data);
      this.$confirm("你确认删除这条:" + data.name, "温馨提示!!!!", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        enterpriseDelete(data.id).then(res => {
          if (res.data.code === 200) {
            this.$message.success("删除数据成功");
            this.search();
          } else {
            this.$message.error("删除数据失败");
          }
        });
      });
    },
    //设置状态
    setStatus(data) {
      enterpriseStatus(data.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success("状态设置成功");
          this.search()
        }
      });
    }
  },
  created() {
    this.search();
  },
  filters: {
    filterTimes: function(time) {
      return time.split(" ")[0];
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
    width: 1191px;
    margin: 0 auto;
    border-radius: 6px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
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