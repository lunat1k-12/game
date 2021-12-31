import k from "../kaboom";
import {GameObj, KaboomCtx} from "kaboom";
import map from "../WoodTiles";

const {
    go,
    onKeyDown,
    add,
    loadTiledMap,
    onCharInput
} = k

let levels = undefined
let key = undefined
let userName = "";

function createLabel(k: KaboomCtx, message: string, width: number, height: number): GameObj {
    return add([
        k.text(message, {size: 32}),
        k.pos(width, height),
        k.color(255, 1, 1),
        k.origin('center')])
}

export function StartScene() {
    const label = createLabel(k, "Enter name", k.width() * 0.5, k.height() * 0.5)

    createLabel(k, "Press enter after name input", k.width() * 0.5, k.height() * 0.8)

    onCharInput((ch) => {
        userName += ch
        label.text = userName
    })

    loadTiledMap(map).then((r) => {
        levels = r.levels
        key = r.key
    })

    onKeyDown("enter", () => {
        if (userName !== "") {
            go("main", {levels: levels, key: key, userName})
        }
    })
}

export default StartScene