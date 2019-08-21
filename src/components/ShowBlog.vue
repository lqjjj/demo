<template>
    <div id="show-blog">
        <div class="blog-content">
    <div class="blog" v-for="blog in blogs" v-bind:key="blog.id">
        <h2 v-bind:style="{color: rainbowColor()}">{{blog.title}}</h2>
        <article v-bind:style="{color:blog.color}">{{blog.content}}</article>
        <p>{{new Date(blog.time).toLocaleDateString()}} by {{blog.author}}</p>
    </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShowBlog",
        data(){
            return{
                blogs:[]
            }
        },
        created() {
            this.axios.get(`http://localhost:3000/blog`)
                .then(data=>this.blogs=data.data)
        },
        methods:{
            rainbowColor:function () {
                return "#"+Math.random().toString(16).slice(2,8);
            }
        }
    }
</script>

<style scoped>
    #show-blog{
    }
    .blog-content{
        width: 720px;
        margin: 0 auto;
    }
    .blog{
        background: white;
    }
    h2{
        text-align: center;
    }
    article{
    }
</style>
