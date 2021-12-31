import k from "../kaboom";
import {KaboomCtx} from "kaboom";
import map from "../WoodTiles";

const {
    go,
    onKeyDown,
    add,
    loadAseprite,
    loadTiledMap
} = k

let levels = undefined
let key = undefined

function createLabel(k: KaboomCtx, message: string) {
    add([
        k.text(message, {size: 32}),
        k.pos(k.width() * 0.5, k.height() * 0.5),
        k.color(255, 1, 1),
        k.origin('center')])
}

export function StartScene() {
    createLabel(k, "Press space to start")

    loadTiledMap(map).then((r) => {
        levels = r.levels
        key = r.key
    })
    // console.log(levels)
    onKeyDown("space", () => {
        go("main", {levels: levels, key: key})
    })
}

export default StartScene