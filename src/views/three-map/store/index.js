const state = {
    mapData: {
        objectList: [
            { // 正方体
                type: 'BoxGeometry',
                attrs: {
                    width: 1,
                    height: 2,
                    depth: 1,
                },
                position: [10, 10, 10],
                children: [],
            },
            { // 柱体
                type: 'CylinderGeometry',
                attrs: {
                    radiusTop: 5,
                    radiusBottom: 5,
                    height: 20,
                    radialSegments: 32,
                },
                position: [-10, 10, 10],
                children: [],
            },
            { // 楼体
                type: 'IrregularGeometry',
                attrs: {
                    points: [[-1, 0, 1], [1, 0, 1], [1, 0, -1], [-1, 0, -1]],
                    height: 5,
                },
                position: [0, 0, -0],
                children: [],
            },
        ],
    },
}

const mutations = {
    SET_MAP_DATA(state, data) {
        state.mapData = data
    },
}

const actions = {
    // 获取未处理报警列表
    async setMapData({ commit, data }) {
        commit('SET_MAP_DATA', data)
    },
    add() {

    },
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters,
}
