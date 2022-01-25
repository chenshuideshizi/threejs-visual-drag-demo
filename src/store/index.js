import Vue from 'vue'
import Vuex from 'vuex'

import contantModules from './contantModules'
import dynamicModules from './dynamicModules'

console.log(dynamicModules)

Vue.use(Vuex)

const storeConfig = {
    ...contantModules,
    modules: dynamicModules,
}

export default new Vuex.Store(storeConfig)
