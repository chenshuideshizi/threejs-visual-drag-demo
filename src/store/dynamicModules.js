import { camelCase } from 'lodash'

const dynamicModules = {}
const files = require.context('@/views', true, /\.js$/)

files.keys().filter(file => file != './index.js').forEach(file => {
    if (file.endsWith('/store/index.js')) {
        console.log('file', file)
        let splits = file.replace(/(\.\/|\.js)/g, '').split('/')
        console.log('splits', splits)

        dynamicModules[camelCase(splits[0])] = files(file).default
    }
})

export default dynamicModules
