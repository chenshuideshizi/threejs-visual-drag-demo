const state = {
    list: {
        objectList: [
            { // 正方体
                type: 'BoxGeometry',
                width: 1,
                height: 2,
                depth: 1,
                children: [],
            },
            { // 柱体
                type: 'CylinderGeometry',
                radiusTop: 5,
                radiusBottom: 5,
                height: 20,
                radialSegments: 32,
                children: [],
            },
            { // 楼体
                type: 'IrregularGeometry',
                points: [[-1, 1], [1, 1], [1, -1], [-1, -1]],
                height: 5,
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
