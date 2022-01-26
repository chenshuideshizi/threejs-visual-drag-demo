import * as THREE from 'three'
import Earcut from 'earcut'

const strategies = {
    BoxGeometry: {
        render: ({ width, height, depth }, position) => {
            const geometry = new THREE.BoxGeometry(width, height, depth)
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            const cube = new THREE.Mesh(geometry, material)
            cube.position.set(...position)
            return cube
        },
    },
    CylinderGeometry: {
        render: ({ radiusTop, radiusBottom, height, radialSegments }, position) => {
            const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
            const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
            const cylinder = new THREE.Mesh(geometry, material)
            cylinder.position.set(...position)
            return cylinder
        },
    },
    IrregularGeometry: {
        render: ({ points, height }, position) => {
            const geometry = createIrregularGeometry(points, height)
            const material = new THREE.MeshPhongMaterial({ color: 'green', side: THREE.DoubleSide })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.castShadow = true // 重点2
            mesh.receiveShadow = true // 重点3
            mesh.position.set(...position)
            return mesh
        },
    },
}

export default function mapRender(objectDataList) {
    const group = new THREE.Group()
    group.name = 'customObjectGroup'

    objectDataList.forEach(data => {
        const mesh = strategies[data.type].render(data.attrs, data.position)
        group.add(mesh)
    })
    return group
}

function createIrregularGeometry(points, height) {
    debugger
    let topPoints = points.map(point => [point[0], point[1] + height, point[2]])

    let length = points.length
    const faceVertices = []
    for (let j = 0; j < length; j++) { // 侧面生成三角形
        const next = j === length - 1 ? 0 : j + 1
        faceVertices.push(topPoints[j], topPoints[next], points[j])
        faceVertices.push(points[j], points[next], topPoints[next])
    }
    let data = points.map(point => [point[0], point[2]]).flat()

    let triangles = Earcut(data, [], 2)
    if (triangles && triangles.length != 0) {
        for (let i = 0; i < triangles.length; i++) {
            if (i % 3 == 0) {
                let xIndex = triangles[i]
                let yIndex = triangles[i + 1]
                let zIndex = triangles[i + 2]
                faceVertices.push(points[xIndex], points[yIndex], points[zIndex]) // 底部的三角面
                faceVertices.push(topPoints[xIndex], topPoints[yIndex], topPoints[zIndex]) // 顶部的三角面
            }
        }
    }

    const geometry = new THREE.BufferGeometry()
    const faceVerticesFloatArray = new Float32Array(faceVertices.flat())
    geometry.setAttribute('position', new THREE.BufferAttribute(faceVerticesFloatArray, 3))
    return geometry
}
