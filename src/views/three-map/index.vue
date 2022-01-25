<template>
    <div class="three-map">
        <ControlBar />
        <main>
            <section class="left">
                <ComponentList />
            </section>

            <section class="center">
                <div
                    class="content"
                    @drop="onDrop"
                    @dragover="onDragOver"
                    @mousedown="onMouseDown"
                    @mouseup="onMouseup"
                >
                    <MapContainer />
                </div>
            </section>

            <section class="right">
                <h4>属性</h4>
                <AttrList v-if="curComponent" />
                <p v-else class="placeholder">请选择组件</p>
            </section>
        </main>
    </div>
</template>

<script>
import ControlBar from './components/ControlBar.vue'
import ComponentList from './components/ComponentList.vue'
import MapContainer from './components/MapContainer.vue'

export default {
    name: 'ThreeMap',
    components: {
        ControlBar,
        ComponentList,
        MapContainer,
    },
    data() {
        return {
            curComponent: null,
        }
    },
    methods: {
        onDrop(e) {
            console.log('onDrop')
            e.preventDefault()
            e.stopPropagation()
            const type = e.dataTransfer.getData('type')

            switch (type) {
                case 'geometry':
                    this.$store.dispatch('threeMap/add', 'geometry')
                    break
            }
            // TODO:在这里身scene 中添加物体
            // const index = e.dataTransfer.getData('index')
            // const rectInfo = this.editor.getBoundingClientRect()
            // if (index) {
            //     const component = deepCopy(componentList[index])
            //     component.style.top = e.clientY - rectInfo.y
            //     component.style.left = e.clientX - rectInfo.x
            //     component.id = generateID()
            //     this.$store.commit('addComponent', { component })
            //     this.$store.commit('recordSnapshot')
            // }
        },
        onDragOver(e) {
            console.log('onDragOver')
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
        },
        onMouseDown() {
            console.log('onMouseDown')
        },
        onMouseup() {
            console.log('onMouseup')
        },
    },
}
</script>

<style lang="scss">
.three-map {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 262px;
            right: 0;
            top: 0;
        }

        .center {
            margin-left: 200px;
            margin-right: 262px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

}
</style>
