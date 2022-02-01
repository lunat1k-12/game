import k from "../kaboom";
import {playersInfo} from "../rsocket/RsocketCLient";
import spawnPlayer from "./objects/MainPlayer";
import drawLabels from "./objects/Labels";

const {add, origin, sprite, area, text, get} = k
let userName = undefined
const REQUEST_SIZE = 50
let counter = 0
let privData = []

export function MainScene(config) {

    userName = config.userName
    playersUpdate()

    layers(['level', 'pop-up', 'message'], 'level')
    for (let level of config.levels) {
        k.addLevel(level, {width: 16, height: 16, ...config.key})
    }

    const player = spawnPlayer(config)

    add([sprite('not_empty_burrel', {anim: 'anim'}), pos(200, 200), solid(), area(), 'wall'])
    add([sprite('empty_burrel', {anim: 'anim'}), pos(290, 200), solid(), area(), 'wall'])
    add([sprite('desk', {anim: 'anim'}), pos(260, 270), solid(), area(), 'wall'])
    add([sprite('terminal', {anim: 'anim'}), pos(200, 270), solid(), area(), 'wall'])
    add([sprite('big_screen', {anim: 'anim'}), pos(280, 15), solid(), area(), 'wall'])
    drawLabels()
}


function playersUpdate() {
    playersInfo(onLevelUpdate, REQUEST_SIZE)
}

function onLevelUpdate(payload) {
    for (let pl of processPlData(payload.data)) {
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
                const player = add([sprite(pl.sprite), pos(pl.x, pl.y), origin('center'), area(), scale(1.2), `hero-${pl.playerName}`, 'level-part', 'player'])
                const name = add([text(pl.playerName, {size: 8}), pos(player.pos), 'level-part', `name-${pl.playerName}`])
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

function processPlData(data) {
    const finalData = []
    const toRemove = []
    for (let pl of data) {
        let existingPl = null
        for (let privPl of privData) {
            if (privPl.playerName === pl.playerName) {
                existingPl = privPl
            }
        }

        if (existingPl !== null && !isEqual(existingPl, pl)) {
            finalData.push(pl)
        }

        if (existingPl === null) {
            finalData.push(pl)
        }
    }

    for (let oldPl of privData) {
        let exists = false
        for (let newPl of data) {
            if (oldPl.playerName === newPl.playerName) {
                exists = true
            }
        }
        if (!exists) {
            toRemove.push(oldPl)
        }
    }

    removePlayers(toRemove)
    privData = data
    return finalData
}

function removePlayers(toRemove) {
   for (let pl of toRemove) {
       destroyAll(`hero-${pl.playerName}`)
       destroyAll(`question-${pl.playerName}`)
       destroyAll(`name-${pl.playerName}`)
   }
}

function isEqual(pl1, pl2) {
    return pl1.flipX === pl2.flipX && pl1.playerName === pl2.playerName &&
        pl1.x === pl2.x && pl1.y === pl2.y &&
        pl1.animation === pl2.animation &&
        pl1.sprite === pl2.sprite &&
        pl1.flipX === pl2.flipX && pl1.question === pl2.question
}

export default MainScene