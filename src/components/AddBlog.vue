<template>
    <div id="add-blog">
        <h2>添加博客</h2>
        <form>
            <label>标题:</label>
            <el-input type="text" v-model="blog.title" placeholder="请输入标题"></el-input>
            <label>内容:</label>
            <el-input type="textarea"  v-model="blog.content"
                      :autosize="{ minRows: 5, maxRows: 10}"
                      placeholder="请输入内容"
            >
            </el-input>
            <div class="block">选择字体颜色:
                <el-color-picker v-model="blog.color"></el-color-picker>
            </div>
            <el-button @click.prevent="post"
                       type="primary"
            >提交</el-button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddBlog",
        data(){
            return{
                blog:{
                    author:"小游",
                    color: "#355BE4"
                }
            }
        },
        methods:{
            post:function () {
                const now =new Date();
                this.axios.post("http://localhost:3000/blog",{
                    "title": this.blog.title,
                    "author": this.blog.author,
                    "content": this.blog.content,
                    "time": now,
                    "color":this.blog.color
                })
                    .then(()=>{
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.$router.push({path:"/"})
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
        margin: 20px 0;
    }
    button{
        margin-top: 20px;
    }
    .block{
        margin: 20px 0;
    }
</style>
