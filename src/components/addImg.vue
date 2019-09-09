<template>
    <div>
        <el-image
                style="width: 100px; height: 100px"
                :src="url"
                fit="contain"></el-image>
    </div>
</template>

<script>
    export default {
        name: "addImg",
        data() {
            return {
                fileList: [],
                url:"api/img/批注 2019-08-22 093005 - 2019-9-9.png"
            }
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style scoped>

</style>
