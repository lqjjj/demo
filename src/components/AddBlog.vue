<template>
    <div id="add-blog">
        <h2>添加博客</h2>
        <form>
            <label>标题:</label>
            <el-input type="text" v-model="blog.title" placeholder="请输入标题"></el-input>
            <label>内容:</label>
            <el-input type="textarea"  v-model="blog.content"
                      :autosize="{ minRows: 5, maxRows: 10}"
                      placeholder="请输入内容">
            </el-input>
            <div class="block">
                <p>选择字体颜色:</p>
                <el-color-picker v-model="blog.color" style="margin-top: 10px;margin-left: 10px"></el-color-picker>
                <el-checkbox-group v-model="checkboxGroup1" size="small" style="display: flex;margin-left: 50px">
                    <el-checkbox label="日常" border></el-checkbox>
                    <el-checkbox label="生日" border></el-checkbox>
                    <el-checkbox label="节日" border></el-checkbox>
                    <el-checkbox label="特殊日子" border></el-checkbox>
                </el-checkbox-group>
            </div>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    :http-request="upload"
                    :file-list="fileList"
                    :auto-upload="false"
                    multiple>
                <el-button slot="trigger" size="small" type="success">添加图片</el-button>
            </el-upload>
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
                    color: "#355BE4",
                    title:"不想起标题",
                    content:""
                },
                checkboxGroup1: [],
                fileList: []
            }
        },
        methods:{
            post:function () {
                let formData=new FormData;
                let fileList=this.$refs.upload.uploadFiles;
                let headerConfig={headers:{'Content-Type': 'multipart/form-data'}};
                for (let file of fileList){
                    formData.append('file',file.raw)
                }
                formData.append("title", this.blog.title);
                formData.append("author", this.blog.author);
                formData.append("content", this.blog.content);
                formData.append("color", this.blog.color);
                this.axios.post("api/addblog",formData,headerConfig)
                    .then(()=>{
                                this.$message({
                                    message: '添加成功！',
                                    type: 'success'
                                });
                                this.$router.push({path:"/"})
                            });
                // this.axios.post("api/addblog",{
                //     "title": this.blog.title,
                //     "author": this.blog.author,
                //     "content": this.blog.content,
                //     "color":this.blog.color
                // }).then(()=>{
                //     this.$refs.upload.submit();
                // })
                //     .then(()=>{
                //         this.$message({
                //             message: '添加成功！',
                //             type: 'success'
                //         });
                //         this.$router.push({path:"/"})
                //     });
            },
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
        display: flex;
    }
</style>
