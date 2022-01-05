import k from "../kaboom";

const { loadSpriteAtlas } = k

export function loadHeros() {
    loadSpriteAtlas("/public/assets/faune_walk.png", {
        'faune': {
            x: 0,
            y: 0,
            width: 768,
            height: 32,
            sliceX: 24,
            anims: {
                'walk-down': {from: 0, to: 7, loop: true, speed: 15},
                'walk-side': {from: 8, to: 15, loop: true, speed: 15},
                'walk-up': {from: 16, to: 23, loop: true, speed: 15},
                'idle-down': {from: 1, to: 1},
                'idle-side': {from: 10, to: 10},
                'idle-up': {from: 19, to: 19},
            },
        },
    })

    loadSpriteAtlas("/public/assets/knight.png", {
        'knight': {
            x: 0,
            y: 0,
            width: 16,
            height: 140,
            sliceY: 5,
            anims: {
                'walk-down': {from: 0, to: 4, loop: true, speed: 15},
                'walk-side': {from: 0, to: 4, loop: true, speed: 15},
                'walk-up': {from: 0, to: 4, loop: true, speed: 15},
                'idle-down': {from: 1, to: 1},
                'idle-side': {from: 0, to: 0},
                'idle-up': {from: 0, to: 0},
            },
        },
    })

    loadSpriteAtlas("/public/assets/zombie.png", {
        'zombie': {
            x: 0,
            y: 0,
            width: 32,
            height: 272,
            sliceY: 8,
            anims: {
                'walk-down': {from: 0, to: 7, loop: true, speed: 15},
                'walk-side': {from: 0, to: 7, loop: true, speed: 15},
                'walk-up': {from: 0, to: 7, loop: true, speed: 15},
                'idle-down': {from: 1, to: 1},
                'idle-side': {from: 0, to: 0},
                'idle-up': {from: 0, to: 0},
            },
        },
    })
}

export default loadHeros