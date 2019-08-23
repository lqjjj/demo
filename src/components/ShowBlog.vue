<template>
    <div id="show-blog">
        <div class="blog-content">
            <el-input v-model="searching" placeholder="输入标题或者日期检索" clearable="true" style="width:200px;"></el-input>
    <div class="blog" v-for="blog in filterBlogs" v-bind:key="blog.id">
        <h2 v-bind:style="{color: rainbowColor()}">{{blog.title}}</h2>
        <article v-bind:style="{color:blog.color}" >{{blog.content|addIndent}}</article>
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
                blogs:[],
                searching:''
            }
        },
        created() {
            this.axios.get(`http://localhost:3000/blog?_sort=time&_order=desc`)
                .then(data=>{this.blogs=data.data
                })
        },
        methods:{
            rainbowColor:function () {
                return "#"+Math.random().toString(16).slice(2,8);
            }
        },
        computed:{
            filterBlogs:function () {
                return this.blogs.filter((blog)=>{
                    let date=new Date(blog.time).toLocaleDateString();
                    return blog.title.match(this.searching)||date.match(this.searching)
                })
            },

        },
        filters:{
            addIndent:function (value) {
                let t='\t';
                return t.concat(value.replace(/\n/g,'\n\t'))
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
    }
    #show-blog{
    }
    h2{
        margin: 10px 0;
        text-align: center;
    }
    .blog-content{
        width: 720px;
        margin: 30px auto;
    }
    .blog{
        padding: 0 10px;
        background: #F2F6FC;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    article{
        white-space: pre-wrap;
    }
</style>
