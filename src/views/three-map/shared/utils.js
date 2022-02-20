import * as THREE from 'three'
/**
* 
* @param {Number} x 屏幕坐标 x
* @param {Number} y 屏幕坐标 y
* @param {Document} domContainer 存放元素的容积
* @param {THREE.PerspectiveCamera} camera 相机
* @param {Number} targetZ  z轴 默认为0
*/

export const screenPointToThreeCoords = (x, y, domContainer, camera, targetZ) => {
    const vec = new THREE.Vector3() // create once and reuse
    const pos = new THREE.Vector3() // create once and reuse

    vec.set(
        (x / domContainer.clientWidth) * 2 - 1,
        -(y / domContainer.clientHeight) * 2 + 1,
        0.5,
    )

    vec.unproject(camera)

    vec.sub(camera.position).normalize()

    const distance = (targetZ - camera.position.z) / vec.z

    pos.copy(camera.position).add(vec.multiplyScalar(distance))
    return pos
}