import k from "../../kaboom";
import {GameObj, PosComp} from "kaboom";
import {clearData, postPlayerInfo} from "../../rsocket/RsocketCLient";
import {spawnPistolBullet} from "./Bullet";

const { add, origin, sprite, solid, body, area, isKeyDown, text, follow, onKeyPress } = k
let question = false
let flipX = false
let anim = "idle-up"

export function spawnPlayer(config): GameObj<PosComp> {
    const letter_length = 4.8
    const player = add([pos(100, 100),
        sprite(config.character),
        origin('center'),
        solid(),
        scale(1.2),
        body({maxVel: 0}),
        area({shape: 'rect', width: 20, height: 35, offset: vec2(2, 0)})]);
    player.play("idle-up")

    add([text(config.userName, {size: 8}),
        follow(player, vec2(-((config.userName.length * letter_length) / 2), -12)), pos(player.pos)])
    player.onUpdate(() => {
        camPos(player.pos)
        every('question-player', (question) => {
            question.pos.x = player.pos.x - question.width / 2
            question.pos.y = player.pos.y - question.height - 20
        })
        every('level-part', (part) => {
            if (Math.abs((player.pos.x - 16) - part.pos.x) > k.width() / 2 + 16 ||
                Math.abs((player.pos.y - 16) - part.pos.y) > k.height() / 2 + 16) {
                part.hidden = true
            } else {
                part.hidden = false
            }
        })

    })

    onKeyPress('space', () => {
        spawnPistolBullet(player, flipX)
        playerUpdate(config, player, 'shoot')
    })

    player.action(() => {
        const clear = isKeyDown('c')
        const left = isKeyDown('left')
        const right = isKeyDown('right')
        const up = isKeyDown('up')
        const down = isKeyDown('down')
        const speed = 3
        const currentAnim = player.curAnim()

        if (clear) {
            clearData()
            return
        }

        if (left) {
            if (currentAnim !== "walk-side") {
                anim = "walk-side"
                player.play("walk-side")
            }
            flipX = true
            player.flipX(true)
            player.pos.x -= speed
            playerUpdate(config, player, "walk-side")
        } else if (right) {
            if (currentAnim !== "walk-side") {
                anim = "walk-side"
                player.play("walk-side")
            }
            flipX = false
            player.flipX(false)
            player.pos.x += speed
            playerUpdate(config, player, "walk-side")
        } else if (up) {
            if (currentAnim !== "walk-up") {
                anim = "walk-up"
                player.play("walk-up")
            }
            player.pos.y -= speed
            playerUpdate(config, player, "walk-up")
        } else if (down) {
            if (currentAnim !== "walk-down") {
                anim = "walk-down"
                player.play("walk-down")
            }
            player.pos.y += speed
            playerUpdate(config, player, "walk-down")
        } else if (currentAnim !== undefined){
            const direction = currentAnim.split('-').pop() ?? 'down'
            const newAnim = `idle-${direction}`
            if (currentAnim !== newAnim && currentAnim !== 'shoot') {
                anim = newAnim
                player.play(newAnim)
                playerUpdate(config, player, `idle-${direction}`)
            }
        }
    })

    return player
}

function playerUpdate(config, player, currentAnim) {
    postPlayerInfo({
        playerName: config.userName,
        x: player.pos.x,
        y: player.pos.y,
        animation: currentAnim,
        sprite: config.character,
        flipX,
        question
    })
}

export default spawnPlayer