<template>
    <div id="manage-blog">
        <el-table
                :data="blogs"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180"
                    :formatter="dateFormat"
            >
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="edited_time"
                    label="最近一次编辑时间"
                    :formatter="dateFormat"
            >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "manageBlog.vue",
        data(){
            return {
                blogs:[]
            }
        },
        methods:{
            dateFormat:function (row, column) {
                if(row[column.property]){
                const newDate=row[column.property];
                return new Date(newDate).toLocaleString()}
                    else return '无'
                },

            handleDelete:function (index,row) {
                this.$confirm(`你确认要删除在 ${new Date(row.date).toLocaleDateString()} 日发布,标题为：${row.title}的博客吗?`,
                    '提示',
                    {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                   this.axios.delete(`http://10.112.27.125:3000/blog/${row.id}`)
                })
                    .then(()=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                           this.axios.get(`http://10.112.27.125:3000/blog`)
                                .then(data=>this.blogs=data.data)
                    })
            },
            handleEdit:function (index,row) {
                this.$router.push({path:'/edit',query:{id:row.id}})
            }
        },
        created() {
            this.axios.get(`/api/blog`)
                .then(data=>this.blogs=data.data)
        }
    }
</script>

<style scoped>

</style>
