const state = {
    mapData: {
        data: [],
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
