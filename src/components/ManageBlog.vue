<template>
    <div id="manage-blog">
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
            <el-table-column
                    prop="editedTime"
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
                return new Date(newDate).toLocaleString();}
                    else return '无'
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
            },
            handleEdit:function (index,row) {
                this.$router.push({path:'/edit',query:{id:row.id}})
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
