<template>
    <div id="edit-blog">
        <el-page-header @back="goBack" content="修改博客">
        </el-page-header>
        <div class="content">
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
    </div>
</template>

<script>
    export default {
        name: "EditBlog",
        data(){
            return{
                blog:{
                    id:this.$route.query.id
                }
            }
        },
        methods:{
            post:function () {
                const now =new Date();
                this.axios.patch(`http://10.112.27.125:3000/blog/${this.blog.id}`,{
                    "title": this.blog.title,
                    "author": this.blog.author,
                    "content": this.blog.content,
                    "color":this.blog.color,
                    "editedTime":now
                })
                    .then(()=>{
                        this.$message({
                            message: '编辑成功！',
                            type: 'success'
                        });
                        this.$router.push({path:"/"})
                    })
            },
            goBack:function () {
                this.$router.push('/manage')
            }
        },
        created() {
            this.axios.get(`http://10.112.27.125:3000/blog/${this.blog.id}`)
                .then(data=>this.blog=data.data)
        }
    }
</script>

<style scoped>
    .content{
        width: 720px;
        margin: 0 auto;
    }
    #edit-blog{
        padding-left: 20px;
        padding-top: 20px;
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
