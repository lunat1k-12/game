import k from "../../kaboom";
import {GameObj} from "kaboom";
import {clearData, postPlayerInfo} from "../../rsocket/RsocketCLient";

const { add, origin, sprite, solid, body, area, isKeyDown, text, get } = k
let question = false
let flipX = false
let anim = "idle-up"

export function spawnPlayer(config): GameObj {
    const faune = add([pos(202, 325),
        sprite(config.character),
        origin('center'),
        solid(),
        body({maxVel: 0}),
        area()]);
    faune.play("idle-up")

    const name = add([text(config.userName, {size: 8}), pos(faune.pos)])
    faune.onUpdate(() => {
        camPos(faune.pos)
        name.pos.x = faune.pos.x - name.width / 2
        name.pos.y = faune.pos.y - name.height - 10
        every('question-player', (question) => {
            question.pos.x = faune.pos.x - question.width / 2
            question.pos.y = faune.pos.y - question.height - 20
        })
        every('level-part', (part) => {
            if (Math.abs((faune.pos.x - 8) - part.pos.x) > k.width() / 2 + 8 ||
                Math.abs((faune.pos.y - 8) - part.pos.y) > k.height() / 2 + 8) {
                part.hidden = true
            } else {
                part.hidden = false
            }
        })

    })

    k.onKeyPress('q', () => {
        if (get('question-player').length > 0) {
            destroyAll('question-player')
            question = false
        } else {
            add([sprite('question_mark'), area(),
                pos(0, 0), 'question-player'])
            question = true
        }

        playerUpdate(config, faune, anim)
    })

    k.onKeyPress('l', () => {
        console.log('idle')
        faune.play('idle-down')
    })
    faune.action(() => {
        const clear = isKeyDown('c')
        const left = isKeyDown('left')
        const right = isKeyDown('right')
        const up = isKeyDown('up')
        const down = isKeyDown('down')
        const speed = 6
        const currentAnim = faune.curAnim()

        if (clear) {
            clearData()
            return
        }

        if (left) {
            if (currentAnim !== "walk-side") {
                anim = "walk-side"
                faune.play("walk-side")
            }
            flipX = true
            faune.flipX(true)
            faune.pos.x -= speed
            playerUpdate(config, faune, "walk-side")
        } else if (right) {
            if (currentAnim !== "walk-side") {
                anim = "walk-side"
                faune.play("walk-side")
            }
            flipX = false
            faune.flipX(false)
            faune.pos.x += speed
            playerUpdate(config, faune, "walk-side")
        } else if (up) {
            if (currentAnim !== "walk-up") {
                anim = "walk-up"
                faune.play("walk-up")
            }
            faune.pos.y -= speed
            playerUpdate(config, faune, "walk-up")
        } else if (down) {
            if (currentAnim !== "walk-down") {
                anim = "walk-down"
                faune.play("walk-down")
            }
            faune.pos.y += speed
            playerUpdate(config, faune, "walk-down")
        } else if (currentAnim !== undefined){
            const direction = currentAnim.split('-').pop() ?? 'down'
            const newAnim = `idle-${direction}`
            if (currentAnim !== newAnim) {
                anim = newAnim
                faune.play(newAnim)
                playerUpdate(config, faune, `idle-${direction}`)
            }
        }
    })

    return faune
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