// 公共样式
export const commonStyle = {
    rotate: 0,
    opacity: 1,
}

export const commonAttr = {
    animations: [],
    events: {},
    groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
    isLock: false, // 是否锁定组件
}

// 编辑器左侧组件列表
const list = [
    {
        type: 'geometry',
        name: '几何体',
        children: [
            {
                component: 'v-text',
                label: '正方体',
                icon: '',
                attrs: {

                },
            },
            {
                component: 'v-button',
                label: '圆球',
                icon: '',
                style: {

                },
            },
        ],
    },
    {
        type: 'specific',
        name: '实物',
        children: [
            {
                type: 'floor',
                label: '楼栋',
                icon: '',
                attrs: {

                },
            },
            {
                type: 'tree',
                label: '树',
                icon: '',
                attrs: {

                },
            },
        ],
    },
]

for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    item.style = { ...commonStyle, ...item.style }
    list[i] = { ...commonAttr, ...item }
}

export default list
