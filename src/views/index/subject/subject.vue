<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="学科编号">
        <el-input v-model="formInline.rid" class="Awidth"></el-input>
      </el-form-item>
      <el-form-item label="学科名称">
        <el-input v-model="formInline.name" class="Bwidth"></el-input>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="formInline.username" class="Awidth"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="选择状态" class="Bwidth">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchs">搜索</el-button>
        <el-button @click="clearData">清除</el-button>
        <el-button type="primary" @click="addsubject" class="el-icon-plus">新增学科</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="my-table">
      <el-table-column label="序号" width="60" type="index"></el-table-column>
      <el-table-column label="学科编号" width="180" prop="rid"></el-table-column>
      <el-table-column label="学校名称" prop="name"></el-table-column>
      <el-table-column label="简称" prop="short_name"></el-table-column>
      <el-table-column label="创建者" prop="username"></el-table-column>
      <el-table-column label="创建者日期">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.create_time |filterTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-link v-if=" scope.row.status==1">启用</el-link>
          <el-link type="danger" v-else>禁用</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="setSuject(scope.row)">编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="changStatus(scope.row.id)"
            v-if="scope.row.status==1"
          >禁用</el-button>
          <el-button type="text" size="small" @click="changStatus(scope.row.id)" v-else>启用</el-button>
          <el-button type="text" size="small" @click="deleSubject(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <addsubject ref="subject"></addsubject>
  </div>
</template>

<script>
import addsubject from "@/components/addsubject.vue";
import { subjectList, deleteSubject, setStatus } from "@/api/subject";

export default {
  name: "subject",
  components: {
    addsubject
  },
  data() {
    return {
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
        // page: 1,
        // limit: 5
      },
      page: 1,
      limit: 5,
      tableData: [],
      pageSizes: [5, 10],
      pageSize: 5,
      currentPage4: 1,
      total: 4
    };
  },
  methods: {
    //清除数据
    clearData() {
      for (const key in this.formInline) {
        this.formInline[key] = "";
      }
      this.search();
    },
    addsubject() {
      this.$refs.subject.xkForm = {};
      this.$refs.subject.title = "添加学科";
      this.$refs.subject.dialogFormVisible = true;
    },
    //分页功能
    handleSizeChange(size) {
      this.limit = size;
      this.search();

      // window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(page) {
      this.page = page;
      this.search();
    },
    //条件查询默认设置初始值
    searchs(){
      this.page=1;
      this.limit=5;
      this.search()
    },
    //查询学科
    search() {
      subjectList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.currentPage4 = Number(res.data.data.pagination.page);
        this.total = res.data.data.pagination.total;
      });
    },
    //删除学科
    deleSubject(id) {
      this.$confirm("你确定要删除学科吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          deleteSubject(id).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.error("删除学科成功");
              this.search();
            }

            // window.console.log(res);
          });
        })
        .catch(() => {
          this.$message.success("取消学科删除");
        });
    },
    //编辑学科
    setSuject(data) {
      // window.console.log(data);
      this.$refs.subject.xkForm = JSON.parse(JSON.stringify(data));
      this.$refs.subject.dialogFormVisible = true;
      // this.$refs.subject.id = data.id;
      this.$refs.subject.title = "编辑学科";
    },
    // 设置状态
    changStatus(id) {
      setStatus(id).then(res => {
        // window.console.log(res)
        if (res.data.code == 200) {
          this.search();
        }
      });
    }
  },
  filters: {
    filterTime: function(data) {
      return data.split(" ")[0];
    }
  },
  created() {
    this.search();
  }
};
</script>

<style lang="less">
.container {
  height: 10%;
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