import k from "../kaboom";

const { loadSpriteAtlas } = k

export function loadItems() {

    loadSpriteAtlas("/public/assets/projectiles/pistol-bullet.png", {
        'pistol_bullet': {
            x: 0,
            y: 0,
            width: 128,
            height: 32,
            sliceX: 4,
            anims: {
                'fly': {from: 0, to: 3, loop: true, speed: 8}
            },
        },
    })

    loadSpriteAtlas("/public/assets/items/not_empty_burrel.png", {
        'not_empty_burrel': {
            x: 0,
            y: 0,
            width: 32,
            height: 192,
            sliceY: 3,
            anims: {
                'anim': {from: 0, to: 2, loop: true, speed: 5}
            },
        },
    })

    loadSpriteAtlas("/public/assets/items/empty_burrel.png", {
        'empty_burrel': {
            x: 0,
            y: 0,
            width: 32,
            height: 192,
            sliceY: 3,
            anims: {
                'anim': {from: 0, to: 2, loop: true, speed: 5}
            },
        },
    })

    loadSpriteAtlas("/public/assets/items/big_screen.png", {
        'big_screen': {
            x: 0,
            y: 0,
            width: 192,
            height: 32,
            sliceX: 3,
            anims: {
                'anim': {from: 0, to: 2, loop: true, speed: 5}
            },
        },
    })

    loadSpriteAtlas("/public/assets/items/desk.png", {
        'desk': {
            x: 0,
            y: 0,
            width: 96,
            height: 32,
            sliceX: 3,
            anims: {
                'anim': {from: 0, to: 2, loop: true, speed: 5}
            },
        },
    })

    loadSpriteAtlas("/public/assets/items/terminal.png", {
        'terminal': {
            x: 0,
            y: 0,
            width: 96,
            height: 32,
            sliceX: 3,
            anims: {
                'anim': {from: 0, to: 2, loop: true, speed: 5}
            },
        },
    })
}

export default loadItems