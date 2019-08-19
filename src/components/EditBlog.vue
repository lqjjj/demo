<template>
    <div id="edit-blog">
        <el-table
                :data="blogs"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="time"
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
            <el-table-column label="操作">
                <template slot-scope="scope">
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
        name: "EditBlog.vue",
        data(){
            return {
                blogs:[]
            }
        },
        methods:{
            dateFormat:function (row, column) {
                const newDate=row[column.property];
                return new Date(newDate).toLocaleString()
            },
            handleDelete:function (index,row) {
                this.$confirm('此操作将永久删除该条博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                   this.axios.delete(`http://localhost:3000/blog/${row.id}`)
                })
                    .then(()=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                           this.axios.get(`http://localhost:3000/blog`)
                                .then(data=>this.blogs=data.data)
                    })
            }
        },
        created() {
            this.axios.get(`http://localhost:3000/blog`)
                .then(data=>this.blogs=data.data)
        }
    }
</script>

<style scoped>

</style>
