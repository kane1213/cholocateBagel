<template>
  <div class="hello">
    <el-carousel indicator-position="outside">
      <el-carousel-item 
        v-for="(img,key) in imgs" :key="key"
        :style="{backgroundImage: `url(${img})`}">
        
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data(){
    return {
      imgs: Array.apply(null, {length: 5}).map( (v,k)=> v = require(`@/assets/images/home/hp${k + 1}.jpg`) )
    }
  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.hello
  height: 100%
  flex: 1
  .el-carousel
    height: 100%
    display: flex
    flex-direction: column
    .el-carousel__container
      flex: 1
      height: 100%
  .el-carousel__item
    background-color: transparent
    background-repeat: no-repeat
    background-position: center center
    background-size: contain
</style>
