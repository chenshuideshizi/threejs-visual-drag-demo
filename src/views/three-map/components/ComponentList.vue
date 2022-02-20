<template>
    <div class="component-list" @dragstart="handleDragStart">
        <div
            v-for="(item, index) in componentList"
            :key="index"
        >
            <div class="type-name">{{ item.name }}</div>
            <div class="type-list">
                <div
                    v-for="(childItem, childIndex) in item.children"
                    :key="`${index}_${childIndex}`"
                    class="item"
                    draggable
                    :data-geo-type="`${childItem.type}`"
                >
                    <span v-if="childItem.icon" class="iconfont" :class="'icon-' + childItem.icon"></span>
                    <span>{{ childItem.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import componentList from '../config/component-list'

export default {
    data() {
        return {
            componentList,
        }
    },
    methods: {
        handleDragStart(e) {
            e.dataTransfer.setData('geo-type', e.target.dataset.geoType)
        },
    },
}
</script>

<style lang="scss" scoped>
.component-list {
    .type-name {
        padding: 10px;
    }
    .type-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
    }
    .item {
        width: 45%;
        border: 1px solid #ddd;
        cursor: grab;
        margin-bottom: 10px;
        text-align: center;
        color: #333;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:active {
            cursor: grabbing;
        }
    }
}
</style>
