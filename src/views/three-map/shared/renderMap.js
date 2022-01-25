import * as THREE from 'three'
import { Earcut } from 'three/src/extras/Earcut.js'

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
    let topPoints = []
    for (let i = 0; i < points.length; i++) {
        let vertice = points[i]
        topPoints.push([vertice[0], vertice[1] + height, vertice[2]])
    }
    let totalPoints = points.concat(topPoints)
    let vertices = [] // 所有的顶点
    for (let i = 0; i < totalPoints.length; i++) {
        vertices.push(new THREE.Vector3(totalPoints[i][0], totalPoints[i][1], totalPoints[i][2]))
    }
    let length = points.length
    let faces = []
    for (let j = 0; j < length; j++) { // 侧面生成三角形
        if (j != length - 1) {
            faces.push(new THREE.Face3(j, j + 1, length + j + 1))
            faces.push(new THREE.Face3(length + j + 1, length + j, j))
        } else {
            faces.push(new THREE.Face3(j, 0, length))
            faces.push(new THREE.Face3(length, length + j, j))
        }
    }
    let data = []
    for (let i = 0; i < length; i++) {
        data.push(points[i][0], points[i][2])
    }
    let triangles = Earcut.triangulate(data)
    if (triangles && triangles.length != 0) {
        for (let i = 0; i < triangles.length; i++) {
            let tlength = triangles.length
            if (i % 3 == 0 && i < tlength - 2) {
                faces.push(new THREE.Face3(triangles[i], triangles[i + 1], triangles[i + 2])) // 底部的三角面
                faces.push(new THREE.Face3(triangles[i] + length, triangles[i + 1] + length, triangles[i + 2] + length)) // 顶部的三角面
            }
        }
    }
    let geometry = new THREE.Geometry()
    geometry.vertices = vertices
    geometry.faces = faces
    geometry.computeFaceNormals() // 自动计算法向量
    return geometry
}
