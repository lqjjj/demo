<template>
    <div id="show-blog">
        <div class="blog-content">
            <el-tooltip class="item" effect="light" content="日期用' / '进行分隔" placement="left">
            <el-input v-model="searching" placeholder="输入标题或者日期关键字检索" clearable style="width:230px;"></el-input>
                </el-tooltip>
    <div class="blog" v-for="blog in filterBlogs" v-bind:key="blog._id">
        <h2 v-bind:style="{color: rainbowColor()}">{{blog.title}}</h2>
        <article v-bind:style="{color:blog.color}" >{{blog.content|addIndent|sliceContent(blog)}}<el-link type="primary"
                                                                                                    v-if="blog.content.length>150&&!blog.isExpanded"
                                                                                                    @click="dealExpand(blog._id)"
        > ...点我展开</el-link><el-link type="primary"
                                    v-if="blog.content.length>150&&blog.isExpanded"
                                    @click="dealCollapse(blog._id)"
        > 收起</el-link></article>
        <div class="block" v-for="url in blog.img_list" :key="url">
            <el-image
                    style="width: 100px; height: 100px"
                    :src="url"
                    :fit="fit"></el-image>
        </div>
        <p id="showTime">{{new Date(blog.date).toLocaleDateString()}} by {{blog.author}}</p>
    </div>
            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :total="blogs.length"
                        :page-size=5
                        :current-page="cuPage"
                        @current-change="dealChange"
                        v-show="!searching"
                >
                </el-pagination>
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
                searching:'',
                cuPage:1,
            }
        },
        created() {
            this.axios.get(`/api/blog`)
                .then(data=>{this.blogs=data.data
                })
        },
        methods:{
            rainbowColor:function () {
                return "#"+Math.random().toString(16).slice(2,8);
            },
            dealChange:function (page) {
                this.cuPage=page;
            },
            dealExpand:function (id) {
                this.$set(this.blogs.find((blog)=>{
                    return blog._id===id
                }),
                    'isExpanded',true
                );
            },
            dealCollapse:function (id) {
                this.blogs.find((blog)=>{
                    return blog._id===id}).isExpanded=false
            }
        },
        computed:{
            filterBlogs:function () {
                //如果搜索框不为空则过滤搜索框内容
                if(this.searching){
                    return this.blogs.filter((blog)=>{
                        let date=new Date(blog.date).toLocaleDateString();
                        return blog.title.match(this.searching)||date.match(this.searching)
                    })
                }
                //否则过滤分页
                else
                return this.blogs.slice(5*(this.cuPage-1),5*this.cuPage)
            },
        },
        filters:{
            addIndent:function (value) {
                let t='\t';
                return t.concat(value.replace(/\n/g,'\n\t'))
            },
            sliceContent:function (value,blog) {
                if (blog.isExpanded)
                    return value;
                return value.slice(0,150)
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
    #showTime{
        font-size: 12px;
        text-align: right;
        padding-bottom: 5px;
        color: #ff8add
    }
</style>
