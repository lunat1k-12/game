import k from "../../kaboom";
import {GameObj, PosComp} from "kaboom";

const {add, sprite, wait} = k

export function spawnWalkDrone(pos: PosComp): GameObj {
    return add([
        pos,
        sprite("walk_drone", {anim: "idle-diactivated"}),
        state("idle-diactive", ["idle-diactive", "idle", "attack", "move", "activate", "diactivate"]),
        'enemy-walk-drone'
    ]);
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