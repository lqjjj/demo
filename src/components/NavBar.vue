<template>
    <header>
        <div id="sb"><router-link to="/">展示博客</router-link></div>
        <div id="ab"><router-link to="/add">添加博客</router-link></div>
    </header>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
header{
    display: flex;
    height: 80px;
    background: aquamarine;
    justify-content:center;
}
    div{
        height: 40px;
        margin: auto 12px;
        width: 80px;
        font-size: 20px;
        line-height: 40px;
    }
</style>
