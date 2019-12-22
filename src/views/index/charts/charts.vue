<template>
  <div class="container">
      <div class="box-contain">
<el-card class="box-card">
 <ul>
     <li v-for="(item, index) in 6" :key="index">
        <div class="clrice"><span>55</span></div>
        <p>今日增加题数</p>
     </li>
      
 
 </ul>
</el-card>

      </div>
  </div>
</template>

<script>
// import defaultcharts from '../../../components/defaultcharts'
export default {
  components:{
    // defaultcharts
  }
};
</script>

<style lang="less">
.container{
    // background: #E8E9EC;
  .box-contain{
      .box-card{
          height: 149px;
          margin-top: 20px;
          .el-card__body{
                height: 100%;
          ul{
              list-style: none;
              display: flex;
               height: 100%;
              li{
                  flex: 1;
                  height: 100%;
                  background: red;
                  display: flex;    
                  align-items: center;
                  flex-direction: column;
                  .clrice{
                    width: 93px;
                    height: 93px;
                    border-radius: 50%;
                    // margin: 0 auto;
                    border: 2px solid blue;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span{
                      text-align: center;

                    }
                  }
              }
          }
  
      }

  }

    }
    
}


</style>