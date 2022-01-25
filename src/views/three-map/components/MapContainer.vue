<template>
    <div ref="threeContainer" class="three-container">{{ mapData }}</div>
</template>

<script>

import ThreeEngine from '../shared/three-engine-class'
import { createBox } from '../shared/extra'
import { mapState } from 'vuex'
import renderMap from '../shared/renderMap'

export default {
    name: 'MapContainer',
    data() {
        return {
            threeEngine: null,
            floors: [],
            drawingFloorPoints: [],
        }
    },
    computed: {
        ...mapState({
            mapData: state => state.threeMap.mapData,
        }),
    },
    watch: {
        mapData: {
            handler() {
                this.renderMap()
            },
            deep: true,
        },
    },
    mounted() {
        this.initThreeEngine()
        this.renderMap()
    },
    methods: {
        renderMap() {
            const group = renderMap(this.mapData.objectList)
            console.log('group', group)
            this.threeEngine.scene.add(group)
        },
        initThreeEngine() {
            this.threeEngine = new ThreeEngine({
                el: this.$refs.threeContainer,
                canvasWidth: 1000,
                canvasHeight: 600,
            })

            const box1 = createBox(1, 1, 1)
            box1.position.set(0, 0.5, 0)
            this.threeEngine.scene.add(box1)
        },
    },
}
</script>

<style scoped>
</style>
