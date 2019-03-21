<template>
  <div class="detail">
    <h3 v-text="detailId"></h3>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      detailId: 0,
    }
  },
  created() {
    this.detailId = this.$route.params.id
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