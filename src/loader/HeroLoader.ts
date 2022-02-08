import k from "../kaboom";

const { loadSpriteAtlas } = k

export function loadHeroes() {

    loadSpriteAtlas("/public/assets/player/lite-player-blue.png", {
        'lite_player_blue': {
            x: 0,
            y: 0,
            width: 704,
            height: 32,
            sliceX: 22,
            anims: {
                'walk-down': {from: 8, to: 11, loop: true, speed: 5},
                'walk-side': {from: 8, to: 11, loop: true, speed: 5},
                'walk-up': {from: 8, to: 11, loop: true, speed: 5},
                'idle-down': {from: 0, to: 0},
                'idle-side': {from: 0, to: 0},
                'idle-up': {from: 0, to: 0},
                'shoot': {from: 12, to: 15}
            },
        },
    })

}

export default loadHeroes