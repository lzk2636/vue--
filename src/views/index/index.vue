<template>
  <el-container class="index-container">
    <!-- header -->
    <el-header class="index-header">
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/image/hou-logo.png" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="usericon" :src="$store.state.userInfo.avatar" />
        <span class="username">{{$store.state.userInfo.username}},你好</span>
        <el-button type="primary" size="small" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container class="index-bottom">
      <!-- 侧栏菜单 -->
      <el-aside width="auto">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item index="/index/charts">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- router-view切换地址 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {  removeToken } from "@/utils/token";
import { logoutUser } from "../../api/user";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    //退出登录
    logout() {
      this.$confirm("你确认退出登录", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          logoutUser().then(res => {
            window.console.log(res)
            if(res.data.code===200){
              this.$message({
                message: "退出登录",
                type: "error"
              });
              removeToken();
              this.$store.state.userInfo={}
              this.$router.push('/login')            

            }
          });
        })
        .catch(() => {
          this.$message({
            message: "不退出",
            type: "success"
            // showClose: true,
          });
        });
    }
  },
  beforeCreate() {
    // if (!getToken()) {
    //   this.$message.error("重新登录");
    //   this.$route.push("/login");
    // }
  },
  created() {
    // userInfo().then(res => {
    //   if (res.data.code === 200) {
    //   window.console.log(res);
    //   } else if (res.data.code === 206) {
    //     this.$message.error("toke 错误不能伪造");
    //     removeToken();
    //     this.$route.push("/login");
    //   }
    // });
  }
};
</script>

<style lang='less'>
.index-container {
  // display: flex;
  height: 100%;

  .index-header {
    // height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 24px;
        margin-right: 13px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 13px;
      }
      .title {
        font-size: 24px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .username {
        margin: 0 52px 0 9px;
        font-size: 15px;
      }
    }
  }
  .index-bottom {
    height: 100%;
    .el-main {
      padding: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
}
</style>