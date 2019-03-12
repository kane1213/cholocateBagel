<template>
  <div class="products">
    <mt-index-list>
      <mt-index-section v-for="(prds, k) in items" :key="k" :index="keyName[k].name">
        <img class="section-icon position-absolute" :src="keyName[k].img" />
        <mt-cell v-for="p in prds" :title="p.title" :label="p.content" :key="p.id" :to="'/detail/' + p.id" :is-link="true">
          <img slot="icon" :src="appUrl + 'images/' + p.image.split(',')[0]" width="24" height="24" />
        </mt-cell>
      </mt-index-section>
    </mt-index-list>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      items: [],
      keyName: {
        1: {name: "麵包", img: require("@/assets/images/icons/icon1.png")},
        2: {name: "蛋糕", img: require("@/assets/images/icons/icon2.png")},
        3: {name: "飲品", img: require("@/assets/images/icons/icon3.png")},
      },
      appUrl: process.env.VUE_APP_URL,
    }
  },
  created() {
    let _kind = null;
    if(this.$route.params) {
      _kind = this.$route.params.kind;
    }
    this.$http.get(process.env.VUE_APP_URL + "api/product/?items" + (_kind?('&kind='+_kind):'')  ).then((res)=>{
      if(res.data.State) {
        this.items = window._.groupBy(res.data.Data.content, "kind");
      }
    });
  },
  components: {
    // HelloWorld
  }
};
</script>

<style lang="sass">
  .mint-indexsection
    position: relative
    ul
      .section-icon
        top: 10px
        left: 50%
        z-index: 1
        width: 24px
      a
        border-bottom: 1px solid #fafafa
</style>