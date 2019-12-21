<template>
  <div class="container">
    <el-form :inline="true" :model="questionForm" class="demo-ruleForm">
      <el-card class="box-card">
        <el-row>
          <el-col :span="24">
            <el-form-item label="学科">
              <el-select v-model="questionForm.subject" placeholder="请选择学科">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in subjectList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阶段">
              <el-select v-model="questionForm.step" placeholder="请选择阶段">
                <el-option label="初级" value="1"></el-option>
                <el-option label="中级" value="2"></el-option>
                <el-option label="高级" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业">
              <el-select v-model="questionForm.enterprise" placeholder="请选择企业">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in enterpriseList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题型">
              <el-select v-model="questionForm.type" placeholder="请选择题型">
                <el-option label="单选" value="1"></el-option>
                <el-option label="多选" value="2"></el-option>
                <el-option label="简答" value="3"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="难度">
              <el-select v-model="questionForm.difficulty" placeholder="请选择难度">
                <el-option label="简单" value="1"></el-option>
                <el-option label="一般" value="2"></el-option>
                <el-option label="困难" value="3"></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="questionForm.username" class="authorWidth"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="questionForm.status" placeholder="请选择状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <!-- <el-input v-model="questionForm.create_data"></el-input> -->
              <div class="block">
                <!-- <span class="demonstration">默认</span> -->
                <el-date-picker v-model="questionForm.create_date" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input v-model="questionForm.title" class="title_width"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="searcher">搜索</el-button>
              <el-button @click="clearData">清除</el-button>
              <el-button type="primary" class="el-icon-plus" @click="addquestion">新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <el-card>
      <!-- card body -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop label="序号" width="180" type="index"></el-table-column>
        <el-table-column label="题目" width="180" style="overflow: hidden;">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="subject_name" label="学科.阶段"></el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type===1">单选</span>
            <span v-else-if="scope.row.type===2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1" type="primary">开启</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column prop label="操作" width="180">
          <template class="mybutton" slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="setStatus(scope.row)">{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        background
        :page-sizes="pageSizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addquestion ref="addquestion"></addquestion>
  </div>
</template>

<script>
import addquestion from "@/components/addquestion.vue";
import { questionList,questionRemove,questionStatus} from "@/api/question";
import { subjectList } from "@/api/subject";
import { enterpriseList } from "@/api/enterprise";
export default {
  name: "question",
  components: {
    addquestion
  },
  data() {
    return {
      questionForm: {
        title: "",
        subject: "",
        type: "",
        username: "",
        status: "",
        create_date: "",
        enterprise: "",
        difficulty: "",
        step: ""
      },
      tableData: [],
      page: 0,
      pageSizes: [6, 8, 10, 12],
      limit: 6,
      total: 0,
      //学科列表
      subjectList: [],
      //企业列表
      enterpriseList: []
    };
  },
  methods: {
    //设置题目状态
    // questionStatus
    setStatus(item){
      questionStatus(item.id).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '状态修改成功!!!',
            type: 'success'
          });
          this.search()
        }
      })
    },
    //删除数据
    remove(item){
      this.$confirm('你真的要删除这条'+item.subject_name, '溫馨提示', {
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionRemove(item.id).then(res=>{
          if(res.data.code===200){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }
        })
        
      }).catch(() => {});

    },
    //清空数据
    clearData(){
      this.questionForm={}
      this.search()

    },
    addquestion() {
      this.$refs.addquestion.dialogFormVisible = true;
    },
    handleSizeChange(size) {
      this.limit = size;
      this.search();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.search();
    },
    search() {
      questionList({
        limit: this.limit,
        page: this.page,
        ...this.questionForm
      }).then(res => {
        // window.console.log(res);
        if (res.data.code === 200) {
          this.tableData = res.data.data.items;
          this.page = Number(res.data.data.pagination.page);
          this.total = res.data.data.pagination.total;
        }
      });
    },
    searcher() {
      this.page = 1;
      this.search();
    }
  },
  created() {
    this.search();
    //初始化数据
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
.container {
  // width: 1191px;

  .el-form {
    background-color: #fff;
    margin: 10px auto;
    width: 1191px;
    // text-align: center;
    .el-row {
      // display: flex;
      // justify-content: space-between;
      .el-col {
        text-align: left;
        .authorWidth {
          width: 219px;
        }
        .title_width {
          width: 388px;
        }
      }
    }
  }
  .el-card {
    width: 1191px;
    margin: 0 auto;
    .el-card__body {
      .el-table__row {
        td {
          .cell {
            width: 154px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>