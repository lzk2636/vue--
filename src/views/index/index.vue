<template>
  <div>我是首页</div>
</template>

// <script>
// import { getToken } from "@/utils/token";
export default {

  created() {
    this.$axios({
      url: "/use/list",
      method:'post'
      // withCredentials: true,
      // headers: {
      // authorization  : getToken()
      // }
    }).then(res => {
      window.console.log(res);
    });
  }
};
</script>

<style>
</style>