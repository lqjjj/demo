<template>
    <header>
        <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" :router=true>
        <el-menu-item index="/">展示博客</el-menu-item>
        <el-menu-item index="/add">添加博客</el-menu-item>
        <el-menu-item index="/manage">管理博客</el-menu-item>
        </el-menu>
    </header>
</template>
<script>
    export default {
        name: "NavBar",
        data(){
            return{
            }
        },
    }
</script>

<style scoped>
header{
}
a{
    text-decoration: none;
}
</style>
