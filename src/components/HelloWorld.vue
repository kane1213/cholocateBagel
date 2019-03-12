<template>
  <div class="hello">
    <el-carousel class="carousel-area" indicator-position="outside">
      <el-carousel-item 
        v-for="(img,key) in imgs" :key="key"
        :style="{backgroundImage: `url(${img})`}">
      </el-carousel-item>
    </el-carousel>

    <el-row class="menu-area" type="flex">
      <el-col :class="{'mobile-mode': isMobile}" v-for="item in menu" :key="item.name"  :lg="24" :xs="12">
        <div class="select-area" @click.stop="jumpToProducts(item.id)">
          <div class="icon" :style="{'backgroundImage': `url(${item.icon})`}"></div>
          <div v-if="!isMobile" v-text="item.name"></div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data(){
    return {
      imgs: Array.apply(null, {length: 5}).map( (v,k)=> v = require(`@/assets/images/home/hp${k + 1}.jpg`) ),
      menu: [
        {id: 1, name: "Bread", icon: require("icons/b1.png")},
        {id: 2, name: "Cake", icon: require("icons/b2.png")},
        {id: 3, name: "Coffee", icon: require("icons/b3.png")},
        {id: 4, name: "Other", icon: require("icons/b4.png")},
      ],
      isMobile: false
    }
  },
  created() {
    this.getScreenType();
    window.addEventListener('resize', _.debounce(this.getScreenType, 300));
  },
  methods: {
    jumpToProducts(id) {
      this.$router.push({"path": "products/" + id});
    },
    getScreenType() {
      this.isMobile = document.documentElement.clientWidth < 768;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getScreenType);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.hello
  height: 98%
  flex: 1
  display: flex
  flex-direction: column
  .el-carousel
    display: flex
    flex-direction: column
    .el-carousel__container
      flex: 1
      height: 100%
  .el-carousel__item
    background-color: transparent
    background-repeat: no-repeat
    background-position: center center
    background-size: cover
  .carousel-area
    flex: 2
  .menu-area
    flex: 1
    display: flex
    flex-wrap: wrap
    .el-col
      .select-area
        padding: 0 15px
        height: 100%
        display: flex
        justify-content: left
        align-items: center
        border: 1px solid #efefef
        .icon
          display: table
          width: 100%
          height: inherit
          max-height: 30px
          max-width: 30px
          background: #eee no-repeat center center / cover
          border-radius: 5px
          border: 2px solid #999
          margin-right: 15px
      &.mobile-mode
        padding: 2px 1px
        .select-area
          justify-content: center
          border-radius: 5px
          .icon
            border-width: 0
            background-color: transparent
          
</style>
