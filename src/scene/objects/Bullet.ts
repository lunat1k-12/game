import k from "../../kaboom";

const { add, origin, sprite, solid, body, area, move, pos, isKeyDown, text, get } = k

export function spawnPistolBullet(player, flipX) {
    let direction = 0
    let posX = 0
    let posY = 0

    if (flipX) {
        direction = 180
        posX = player.pos.x - 32
        posY = player.pos.y - 7
    } else {
        posX = player.pos.x
        posY = player.pos.y - 7
    }

    player.play('shoot')
    const bullet = add([sprite('pistol_bullet', {anim: 'fly'}),
        pos(posX, posY),
        move(direction,300),
        area(),
        'pistol_bullet'])

    bullet.onCollide('wall', (wall) => {
        bullet.destroy()
    })

    bullet.onCollide('player', (wall) => {
        bullet.destroy()
    })
}