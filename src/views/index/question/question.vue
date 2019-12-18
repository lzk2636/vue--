<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-ruleForm">
      <el-card class="box-card">
        <el-row>
          <el-col :span="24">
            <el-form-item label="学科">
              <el-select v-model="formInline.region" placeholder="请选择学科">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阶段">
              <el-select v-model="formInline.region" placeholder="请选择阶段">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业">
              <el-select v-model="formInline.region" placeholder="请选择企业">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题型">
              <el-select v-model="formInline.region" placeholder="请选择题型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="难度">
              <el-select v-model="formInline.region" placeholder="请选择难度">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.region" placeholder="请选择状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary">搜索</el-button>
              <el-button>清除</el-button>
              <el-button type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <el-card>
      <!-- card body -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop label="序号" width="180"></el-table-column>
        <el-table-column prop label="题目" width="180"></el-table-column>
        <el-table-column prop label="学科.阶段"></el-table-column>
        <el-table-column prop label="题型"></el-table-column>
        <el-table-column prop label="企业"></el-table-column>
        <el-table-column prop label="创建者"></el-table-column>
        <el-table-column prop label="状态"></el-table-column>
        <el-table-column prop label="访问量"></el-table-column>
        <el-table-column prop label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: []
    };
  }
};
</script>

<style lang="less">
.container {
  // width: 1191px;
  .el-form {
    // display: flex;
    // justify-content: left;
    background-color: #fff;
    margin: 10px auto;
    width: 1191px;
    // text-align: center;
    .el-row {
      // display: flex;
      // justify-content: space-between;
      .el-col {
        text-align: left;
      }
    }
  }
  .el-card{
    width: 1191px;
    margin: 0 auto;

    .el-table {
    }
  }
}
</style>