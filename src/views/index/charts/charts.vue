<template>
  <div class="container">
      <div class="box-contain">
<el-card class="box-card">
 <ul>
     <li>
         
     </li>
       <li>
         1
     </li>
       <li>
         1
     </li>
       <li>
         1
     </li>
       <li>
         1
     </li>
  <li>
         1
     </li>
 </ul>
</el-card>

      </div>
  </div>
</template>

<script>
export default {};
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
                  background: red
              }
          }
  
      }

  }

    }
    
}


</style>