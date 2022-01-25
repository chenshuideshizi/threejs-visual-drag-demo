<template>
    <div>
        <el-button @click="undo">撤消</el-button>
        <el-button @click="redo">重做</el-button>
        <el-button style="margin-left: 10px;" @click="preview">预览</el-button>

        <el-button @click="save">保存</el-button>
        <el-button @click="clearCanvas">清空画布</el-button>

        <div class="canvas-config">
            <span>画布大小</span>
            <input v-model="canvasWidth">
            <span>*</span>
            <input v-model="canvasHeight">
        </div>
    </div>
</template>

<script>
export default {
    name: 'ControlBar',
    data() {
        return {
            canvasWidth: 600,
            canvasHeight: 600,
        }
    },
    methods: {
        undo() {

        },
        redo() {

        },
        preview() {

        },
        save() {

        },
        clearCanvas() {

        },
    },
}
</script>

<style lang="scss" scoped>
    .canvas-config {
        display: inline-block;
        margin-left: 10px;
        font-size: 14px;
        color: #606266;

        input {
            width: 50px;
            margin-left: 10px;
            outline: none;
            padding: 0 5px;
            border: 1px solid #ddd;
            color: #606266;
        }

        span {
            margin-left: 10px;
        }
    }
</style>
