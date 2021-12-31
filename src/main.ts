import k from "./kaboom";
import StartScene from "./scene/startScene";
import MainScene from "./scene/mainScene";

const {
    scene,
    go,
    loadSpriteAtlas,
    loadTiledMap
} = k

loadSpriteAtlas("/public/assets/faune_walk.png", {
    'faune': {
        x: 0,
        y: 0,
        width: 748,
        height: 32,
        sliceX: 23.2,
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

// loadAseprite("wood", "/public/tiles/tiles.png", "/wood.json")
//     .then((r) => {
//         console.log(r)
//     })

// loadTiledMap("/public/tiles/wood.json", "/public/tiles/tiles.png")


scene("start", StartScene)
scene("main", MainScene)

go('start')