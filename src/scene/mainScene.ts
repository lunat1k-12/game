import k from "../kaboom";
import {postPlayerInfo, playersInfo, clearData} from "../rsocket/RsocketCLient";

const { add, origin, sprite, solid, body, area, isKeyDown, text, get } = k
let userName = undefined
const REQUEST_SIZE = 50
let counter = 0
let question = false
let flipX = false

export function MainScene(config) {

    userName = config.userName
    playersUpdate()

    layers(['level', 'pop-up', 'message'], 'level')
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
        every('question-player', (question) => {
            question.pos.x = faune.pos.x - question.width / 2
            question.pos.y = faune.pos.y - question.height - 20
        })
        every('level-part', (part) => {

            if (Math.abs(faune.pos.x - part.pos.x) > k.width() / 2 ||
                Math.abs(faune.pos.y - part.pos.y) > k.height() / 2) {
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
    })

    faune.action(() => {
        const clear = isKeyDown('c')
        const left = isKeyDown('left')
        const right = isKeyDown('right')
        const up = isKeyDown('up')
        const down = isKeyDown('down')
        const space = isKeyDown('space')
        const close = isKeyDown('x')
        const speed = 6
        const currentAnim = faune.curAnim()

        if (clear) {
            clearData()
            return
        }

        if(space) {
            add([sprite("slide1"), origin('center'),
                fixed(), layer('pop-up'),
                scale(0.3),
                pos(k.width() / 2, k.height() / 2), 'pop-up'])
        }

        if (close) {
            destroyAll('pop-up')
        }

        if (left) {
            if (currentAnim !== "walk-side") {
                faune.play("walk-side")
            }
            flipX = true
            faune.flipX(true)
            faune.pos.x -= speed
            playerUpdate(config, faune, "walk-side")
        } else if (right) {
            if (currentAnim !== "walk-side") {
                faune.play("walk-side")
            }
            flipX = false
            faune.flipX(false)
            faune.pos.x += speed
            playerUpdate(config, faune, "walk-side")
        } else if (up) {
            if (currentAnim !== "walk-up") {
                faune.play("walk-up")
            }
            faune.pos.y -= speed
            playerUpdate(config, faune, "walk-up")
        } else if (down) {
            if (currentAnim !== "walk-down") {
                faune.play("walk-down")
            }
            faune.pos.y += speed
            playerUpdate(config, faune, "walk-down")
        } else if (currentAnim !== undefined){
            const direction = currentAnim.split('-').pop() ?? 'down'
            faune.play(`idle-${direction}`)
            playerUpdate(config, faune, `idle-${direction}`)
        }
    })
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

function playersUpdate() {
    playersInfo(onLevelUpdate, REQUEST_SIZE)
}

function onLevelUpdate(payload) {
    for (let pl of payload.data) {
        if (userName !== pl.playerName) {
            if (get(`hero-${pl.playerName}`).length > 0) {
                const hero = get(`hero-${pl.playerName}`)[0]
                hero.pos.x = pl.x
                hero.pos.y = pl.y
                if (hero.curAnim() !== pl.animation) {
                    hero.play(pl.animation)
                    hero.flipX(pl.flipX)
                }

                if (pl.question) {

                    if (get(`question-${pl.playerName}`).length === 0) {
                        add([sprite('question_mark'), area(),
                            pos(0, 0), `question-${pl.playerName}`])
                    }
                } else {
                    destroyAll(`question-${pl.playerName}`)
                }

                hero.flipX(pl.flipX)
            } else {
                const player = add([sprite(pl.sprite), pos(pl.x, pl.y), origin('center'), area(), `hero-${pl.playerName}`, 'level-part'])
                const name = add([text(pl.playerName, {size: 8}), pos(player.pos), 'level-part'])
                if (pl.question) {
                    add([sprite('question_mark'), area(),
                        pos(0, 0), `question-${pl.playerName}`])
                } else {
                    destroyAll(`question-${pl.playerName}`)
                }

                player.onUpdate(() => {
                    name.pos.x = player.pos.x - name.width / 2
                    name.pos.y = player.pos.y - name.height - 10
                    every(`question-${pl.playerName}`, (question) => {
                        question.pos.x = player.pos.x - question.width / 2
                        question.pos.y = player.pos.y - question.height - 20
                    })
                })
            }
        }

    }

    counter++
    if (counter === REQUEST_SIZE) {
        counter = 0
        playersUpdate()
    }
}

export default MainScene