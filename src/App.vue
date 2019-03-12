<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <nav-list></nav-list>
    <router-view />
  </div>
</template>
<script>
import NavList from "@/components/NavList.vue";


export default {
  name: "app",
  data() {
    return {
      loadingObj: null,
    }
  },
  components: {
    NavList,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  watch: {
    isLoading(value) {
      if(value) {
        this.loadingObj = this.$loading({
          lock: true,
          text: 'Loading',
          color: "rgb(255, 255, 255)",
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      } else {
        this.loadingObj.close();
          delete this.loadingObj;
        }
    }
  },
  methods: {
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    }
  }
};
</script>
<style lang="scss">
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.position-absolute{
  position: absolute;
}

</style>
