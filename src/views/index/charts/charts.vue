<template>
  <div class="container">
    <div class="box-contain">
      <el-card class="box-card">
        <ul>
          <li>
            <div class="clrice">
              <span>
                {{
                dataTiltle.increment_users
                }}
              </span>
            </div>
            <p>今日增长用户数量</p>
          </li>
          <li>
            <div class="clrice">
              <span>{{dataTiltle.total_users}}</span>
            </div>
            <p>总用户量</p>
          </li>
          <li>
            <div class="clrice orgin">
              <span>{{ dataTiltle.increment_questions}}</span>
            </div>
            <p>新增试题</p>
          </li>
          <li>
            <div class="clrice orgin">
              <span>{{dataTiltle.total_questions}}</span>
            </div>
            <p>总试题集</p>
          </li>
          <li>
            <div class="clrice green">
              <span>{{dataTiltle.total_done_questions}}</span>
            </div>
            <p>刷题总数</p>
          </li>
          <li>
            <div class="clrice green">
              <span>{{dataTiltle.personal_questions}}</span>
            </div>
            <p>人均刷题数量</p>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="main-contain">
     <defaultcharts></defaultcharts>
    </div>
  </div>
</template>

<script>
import { dataTiltle } from "@/api/charts.js";
import defaultcharts from '../../../components/defaultcharts'
export default {
  data() {
    return {
      dataTiltle: {}
    };
  },
  components: {
    defaultcharts
  },
  created() {
    dataTiltle().then(res => {
      window.console.log(res);
      if (res.data.code === 200) {
        this.dataTiltle = res.data.data;
      }
    });
  }
};
</script>

<style lang="less">
.container {
  // background: #E8E9EC;
  .box-contain {
    .box-card {
      height: 149px;
      margin-top: 20px;
      .el-card__body {
        height: 100%;
        padding-bottom: 0;
        ul {
          list-style: none;
          display: flex;
          height: 100%;
          li {
            flex: 1;
            height: 100%;
            // background: red;
            display: flex;
            align-items: center;
            flex-direction: column;
            .clrice {
              width: 95px;
              height: 95px;
              border: 2px solid #89c7fd;
              border-radius: 50%;
              // margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 5px;
              &.orgin {
                border: 2px solid #faa58d;
              }
              &.green {
                border: 2px solid #5dcf7f;
              }
              span {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .main-contain {
    margin: 20px auto;
    width:1191px;
    height: 571px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    border-radius: 4px;
  }
}
</style>