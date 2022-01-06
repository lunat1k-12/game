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

    loadSpriteAtlas("/public/assets/ogre.png", {
        'ogre': {
            x: 0,
            y: 0,
            width: 256,
            height: 32,
            sliceX: 8,
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

    loadSpriteAtlas("/public/assets/necro.png", {
        'necro': {
            x: 0,
            y: 0,
            width: 16,
            height: 160,
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

    loadSpriteAtlas("/public/assets/chort.png", {
        'chort': {
            x: 0,
            y: 0,
            width: 16,
            height: 192,
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

    loadSpriteAtlas("/public/assets/wizzard.png", {
        'wizzard': {
            x: 0,
            y: 0,
            width: 16,
            height: 224,
            sliceY: 8,
            anims: {
                'walk-down': {from: 3, to: 7, loop: true, speed: 15},
                'walk-side': {from: 3, to: 7, loop: true, speed: 15},
                'walk-up': {from: 3, to: 7, loop: true, speed: 15},
                'idle-down': {from: 0, to: 3, loop: true, speed: 10},
                'idle-side': {from: 0, to: 3, loop: true, speed: 10},
                'idle-up': {from: 0, to: 3, loop: true, speed: 10},
            },
        },
    })

    loadSpriteAtlas("/public/assets/swampy.png", {
        'swampy': {
            x: 0,
            y: 0,
            width: 128,
            height: 16,
            sliceX: 8,
            anims: {
                'walk-down': {from: 0, to: 7, loop: true, speed: 15},
                'walk-side': {from: 0, to: 7, loop: true, speed: 15},
                'walk-up': {from: 0, to: 7, loop: true, speed: 15},
                'idle-down': {from: 1, to: 0},
                'idle-side': {from: 1, to: 0},
                'idle-up': {from: 1, to: 0},
            },
        },
    })

    loadSpriteAtlas("/public/assets/wogol.png", {
        'wogol': {
            x: 0,
            y: 0,
            width: 16,
            height: 160,
            sliceY: 8,
            anims: {
                'walk-down': {from: 0, to: 7, loop: true, speed: 15},
                'walk-side': {from: 0, to: 7, loop: true, speed: 15},
                'walk-up': {from: 0, to: 7, loop: true, speed: 15},
                'idle-down': {from: 1, to: 0},
                'idle-side': {from: 1, to: 0},
                'idle-up': {from: 1, to: 0},
            },
        },
    })
}

export default loadHeros