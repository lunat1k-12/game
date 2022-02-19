import k from "../../kaboom";
import {GameObj, PosComp} from "kaboom";
import {walkDroneInfo} from "../../rsocket/RsocketCLient";
import {RSOCKET_REQUEST_SIZE, TILE_SIZE} from "../util/Constants";

const {add, sprite, wait, get, state} = k
let rsocketCounter = 0;
let privWalkDroneData = []

export function spawnWalkDrone(pos: PosComp, name: string, initState: string, initAnim: string): GameObj {
    const enemy = add([
        pos,
        sprite("walk_drone"),
        state(initState, ["idle-diactive", "idle", "attack", "move", "activate", "diactivate"]),
        'enemy-walk-drone', name
    ]);

    enemy.onStateEnter("idle-diactive", () => {
        wait(0.5, () => {
            enemy.play("idle-diactivated")
        })
    })

    enemy.onStateEnter("activate", () => {
        enemy.play("activate", {
            onEnd: () => enemy.enterState("idle")
        })
    })

    enemy.onStateEnter("diactivate", () => {
        enemy.play("diactivate", {
            onEnd: () => enemy.enterState("idle-diactive")
        })
    })

    enemy.onStateEnter("move", () => {
        enemy.play("walk")
    })

    enemy.onStateEnter("idle", () => {
        wait(0.5, () => {
            enemy.play("idle")
        })
    })

    enemy.enterState(initState)
    return enemy
}

export function initWalkDrones() {
    every('enemy-walk-drone', (enemy) => {
        enemy.onStateEnter("idle-diactive", () => {
            wait(0.5, () => {
                enemy.play("idle-diactivated")
            })
        })

        enemy.onStateEnter("activate", () => {
            enemy.play("activate", {
                onEnd: () => enemy.enterState("idle")
            })
        })

        enemy.onStateEnter("diactivate", () => {
            enemy.play("diactivate", {
                onEnd: () => enemy.enterState("idle-diactive")
            })
        })

        enemy.onStateEnter("move", () => {
            enemy.play("walk")
        })

        enemy.onStateEnter("idle", () => {
            wait(0.5, () => {
                enemy.play("idle")
            })
        })
    })
}

function onWalkDroneUpdate(payload) {
    for (let wl of processWalkDroneData(payload.data)) {
        if (get(wl.droneName).length > 0) {
           const drone = get(wl.droneName)[0]
            if (wl.state !== drone.state) {
                drone.enterState(wl.state)
            }
        } else {
            spawnWalkDrone(pos(wl.row * TILE_SIZE, wl.col * TILE_SIZE), wl.droneName, wl.state, wl.anim)
        }
    }
    rsocketCounter++
    if (rsocketCounter === RSOCKET_REQUEST_SIZE) {
        rsocketCounter = 0
        walkDroneUpdate()
    }
}

export function walkDroneUpdate() {
    walkDroneInfo(onWalkDroneUpdate, RSOCKET_REQUEST_SIZE)
}

function processWalkDroneData(data) {
    const finalData = []
    const toRemove = []
    for (let pl of data) {
        let existingWl = null
        for (let privWl of privWalkDroneData) {
            if (privWl.droneName === pl.droneName) {
                existingWl = privWl
            }
        }

        if (existingWl !== null && !isWalkDroneEqual(existingWl, pl)) {
            finalData.push(pl)
        }

        if (existingWl === null) {
            finalData.push(pl)
        }
    }

    for (let oldWl of privWalkDroneData) {
        let exists = false
        for (let newPl of data) {
            if (oldWl.droneName === newPl.droneName) {
                exists = true
            }
        }
        if (!exists) {
            toRemove.push(oldWl)
        }
    }

    removePlayers(toRemove)
    privWalkDroneData = data
    return finalData
}

function isWalkDroneEqual(wl1, wl2) {
    return wl1.flipX === wl2.flipX &&
        wl1.droneName === wl2.droneName &&
        wl1.posX === wl2.posX &&
        wl1.posY === wl2.posY &&
        wl1.row === wl2.row &&
        wl1.col === wl2.col &&
        wl1.anim === wl2.anim &&
        wl1.state === wl2.state
}

function removePlayers(toRemove) {
    for (let wl of toRemove) {
        destroyAll(wl.droneName)
    }
}