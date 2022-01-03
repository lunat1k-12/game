import k from "../kaboom";
import {postPlayerInfo, playersInfo, clearData} from "../rsocket/RsocketCLient";

const { add, origin, sprite, solid, body, area, isKeyDown, text, get } = k
let userName = undefined

export function MainScene(config) {

    userName = config.userName
    playersUpdate()

    for (let level of config.levels) {
        k.addLevel(level, { width: 16, height: 16, ...config.key })
    }

    const faune = add([pos(100, 100),
        sprite(config.character),
        origin('center'),
        solid(),
        body({maxVel: 0}),
        // scale(2),
        area()]);
    faune.play("idle-up")

    const name = add([text(config.userName, {size: 8}), pos(faune.pos)])
    faune.onUpdate(() => {
        camPos(faune.pos)
        name.pos.x = faune.pos.x - name.width / 2
        name.pos.y = faune.pos.y - name.height - 10
        every('level-part', (part) => {

            if (Math.abs(faune.pos.x - part.pos.x) > k.width() / 2 ||
                Math.abs(faune.pos.y - part.pos.y) > k.height() / 2) {
                part.hidden = true
            } else {
                part.hidden = false
            }
        })
    })

    faune.action(() => {
        const quite = isKeyDown('q')
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

        if (quite) {
            go("start")
            return
        }

        if (left) {
            if (currentAnim !== "walk-side") {
                faune.play("walk-side")
            }
            faune.flipX(true)
            faune.pos.x -= speed
            playerUpdate(config, faune, "walk-side", true)
        } else if (right) {
            if (currentAnim !== "walk-side") {
                faune.play("walk-side")
            }
            faune.flipX(false)
            faune.pos.x += speed
            playerUpdate(config, faune, "walk-side", false)
        } else if (up) {
            if (currentAnim !== "walk-up") {
                faune.play("walk-up")
            }
            faune.pos.y -= speed
            playerUpdate(config, faune, "walk-up", false)
        } else if (down) {
            if (currentAnim !== "walk-down") {
                faune.play("walk-down")
            }
            faune.pos.y += speed
            playerUpdate(config, faune, "walk-down", false)
        } else if (currentAnim !== undefined){
            const direction = currentAnim.split('-').pop() ?? 'down'
            faune.play(`idle-${direction}`)
            playerUpdate(config, faune, `idle-${direction}`, false)
        }
    })
}

function playerUpdate(config, player, currentAnim, flipX) {
    postPlayerInfo({
        playerName: config.userName,
        x: player.pos.x,
        y: player.pos.y,
        animation: currentAnim,
        sprite: config.character,
        flipX
    })
}

function playersUpdate() {
    playersInfo(onLevelUpdate)
}

function onLevelUpdate(payload) {

    for (let pl of payload.data) {
        if (userName !== pl.playerName) {
            if (get(`hero-${pl.playerName}`).length > 0) {
                // console.log("here")
                const hero = get(`hero-${pl.playerName}`)[0]
                hero.pos.x = pl.x
                hero.pos.y = pl.y
                if (hero.curAnim() !== pl.animation) {
                    hero.play(pl.animation)
                }
                hero.flipX(pl.flipX)
            } else {
                const player = add([sprite(pl.sprite), pos(pl.x, pl.y), origin('center'), area(), `hero-${pl.playerName}`])
                const name = add([text(pl.playerName, {size: 8}), pos(player.pos)])
                player.onUpdate(() => {
                    name.pos.x = player.pos.x - name.width / 2
                    name.pos.y = player.pos.y - name.height - 10
                })
            }
        }

    }
}

export default MainScene