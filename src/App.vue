<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
  import NavBar from "./components/NavBar";
export default{
  data(){
    return{
    }
  },
  components:{
    NavBar
  },
  methods:{
  }
};
</script>
<style lang="scss">
</style>
