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
        <img class="usericon" src="../../assets/image/user-icon.png" />
        <span class="username">利达,你好</span>
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container class="index-bottom">
      <!-- 侧栏菜单 -->
      <el-aside width="auto">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <el-menu-item index="1">
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
export default {
  data() {
    return {
      isCollapse: false
    };
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
    .el-main{
      padding: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
}
</style>