import {js} from 'easystarjs'
import {A_STAR_MAP} from '../../tiles/MainLevel'
import {GameObj, PosComp, Vec2} from "kaboom";

type AStarCallBack = (points: { x: number, y: number }[]) => void;

export function findPath(destination: Vec2, charPos: Vec2, callback: AStarCallBack) {
    // let path: { x: number, y: number }[] = []
    const easystar = new js()
    easystar.setGrid(A_STAR_MAP)
    easystar.setAcceptableTiles(0)

    const sx = worldToTile(charPos.x)
    const sy = worldToTile(charPos.y)

    const tx = worldToTile(destination.x) - 1
    const ty = worldToTile(destination.y)

    console.log('started - ' + sx + ' - ' + sy + ' - ' + tx + ' - ' + ty)
    easystar.findPath(sx, sy, tx, ty, callback)
    easystar.calculate()
}

export function worldToTile(value: number) {
    return Math.floor(value / 32)
}

export function tileToWorld(value: number) {
    return value * 32
}

export function moveDroneToPlayer(points: {x: number, y: number}[], drone: GameObj) {
    if (points == null) {
        return
    }

    drone.enterState("move")
    const path: {x: number, y: number}[] = points

    drone.action(() => {

        if (path.length === 0) {
            return
        }
        const target = path[0]
        const direction = {
            left: false,
            right: false,
            top: false,
            bottom: false
        }

        if (worldToTile(drone.pos.x) == target.x &&
            worldToTile(drone.pos.y) == target.y) {
            path.shift()
            return
        }

        direction.left = worldToTile(drone.pos.x) > target.x
        direction.right = worldToTile(drone.pos.x) < target.x
        direction.top = worldToTile(drone.pos.y) > target.y
        direction.bottom = worldToTile(drone.pos.y) < target.y

        if (direction.left) {
            console.log('left')
            drone.pos.x = drone.pos.x - 1
        }
        if (direction.right) {
            console.log('right')
            drone.pos.x = drone.pos.x + 1
        }
        if (direction.top) {
            console.log('top')
            drone.pos.y = drone.pos.y - 1
        }
        if (direction.bottom) {
            console.log('bottom')
            drone.pos.y = drone.pos.y + 1
        }
    })
}