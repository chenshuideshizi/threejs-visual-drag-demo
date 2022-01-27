const geoConfig = {
    BoxGeometry: { // 正方体
        type: 'BoxGeometry',
        attrs: {
            width: 1,
            height: 2,
            depth: 1,
        },
        position: [10, 10, 10],
        children: [],
    },
    CylinderGeometry: { // 柱体
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
    IrregularGeometry: { // 楼体
        type: 'IrregularGeometry',
        attrs: {
            points: [
                [-3, 0, 1],
                [-2, 0, 1],

                [-2, 0, 2],
                [-1, 0, 2],

                [-1, 0, 1],
                [1, 0, 1],

                [1, 0, 2],
                [2, 0, 2],

                [2, 0, 1],
                [3, 0, 1],

                [3, 0, -1],
                [2, 0, -1],
                [1, 0, -1],
                [-1, 0, -1],
                [-2, 0, -1],
                [-3, 0, -1],
            ],
            height: 5,
        },
        position: [0, 1, -0],
        children: [],
    },
}

export default geoConfig
