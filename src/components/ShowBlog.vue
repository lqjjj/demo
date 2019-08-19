<template>
    <div id="show-blog">
        <div class="blog-content">
    <div class="blog" v-for="blog in blogs" v-bind:key="blog.id">
        <h2>{{blog.title}}</h2>
        <article>{{blog.content}}</article>
        <p>{{new Date(blog.time).toLocaleString()}} by {{blog.author}}</p>
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
</style>
