<template>
    <div id="add-blog">
        <h2>添加博客</h2>
        <form>
            <label>标题:</label>
            <input type="text" v-model="blog.title">
            <label>内容:</label>
            <textarea v-model="blog.content"></textarea>
            <button @click.prevent="post" >提交</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddBlog",
        data(){
            return{
                blog:{author:"小游"}
            }
        },
        methods:{
            post:function () {
                console.log('123');
                this.axios.post("http://localhost:3000/blog",{
                    "title": this.blog.title,
                    "author": this.blog.author,
                    "content": this.blog.content
                })
            }
        }

    }
</script>

<style scoped>
    #add-blog{
        width: 720px;
        margin: 0 auto;
    }
    h2{
        text-align: center;
    }
    label{
        display: block;
    }
</style>
