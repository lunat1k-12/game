import k from "../kaboom";

const { loadSpriteAtlas } = k

export function loadEnemies() {

    loadSpriteAtlas("/public/assets/enemy/walk_drone.png", {
        'walk_drone': {
            x: 0,
            y: 0,
            width: 1024,
            height: 32,
            sliceX: 32,
            anims: {
                'walk': {from: 15, to: 18, loop: true, speed: 5},
                'idle': {from: 3, to: 10, loop: true, speed: 5},
                'shoot': {from: 19, to: 23, speed: 5},
                'idle-diactivated': {from: 0, to: 2, loop: true, speed: 5},
                'activate': {from: 11, to: 15, speed: 5},
                'diactivate': {from: 16, to: 11, speed: 5},
                'death': {from: 23, to: 31, speed: 5}
            },
        },
    })
}
 export default loadEnemies