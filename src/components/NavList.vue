<template>
    <div class="dsad">
        <mt-header fixed title="May's Bagels"></mt-header>
    </div>

    <!-- <nav :class="{'nor': $route.name!='home'}" class="navbar navbar-expand-lg navbar-light fixed-top">
        <button v-if="$route.name!='home'" @click.stop="$router.go(-1)">back</button>
        <a class="navbar-brand text-white" href="#">May's Bagel Shop
        
        </a>
    
       
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item" v-for="r in $router.options.routes">
                    <router-link :to="r.path" v-text="r.name">Home</router-link>
                </li>
            </ul>
        </div>
    </nav> -->
</template>

<script>
export default {
  name: "Navlist",
  props: {
    msg: String
  }
};
</script>

<style lang="sass">
    .mint-header.is-fixed
        background-color: rgba(0,0,0,.3)
        z-index: 20 !important
    ul.navbar-nav
        display: flex
        padding: 0
        justify-content: center
        li
            list-style: none
            margin: 0 15px 0 0
            a
                text-decoration: none
</style>