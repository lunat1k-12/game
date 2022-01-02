import k from "../kaboom";
import {GameObj, KaboomCtx} from "kaboom";
import map from "../WoodTiles";

const {
    go,
    onKeyDown,
    add,
    loadTiledMap,
    onCharInput,
    drawLines,
    onClick
} = k

let levels = undefined
let key = undefined
let userName = "";
let character = "faune"

function createLabel(k: KaboomCtx, message: string, width: number, height: number): GameObj {
    return add([
        k.text(message, {size: 32}),
        k.pos(width, height),
        k.color(255, 1, 1),
        k.origin('center')])
}

export function StartScene() {
    userName = ""
    const label = createLabel(k, "Enter name", k.width() * 0.5, k.height() * 0.2)

    createLabel(k, "Press enter after name input", k.width() * 0.5, k.height() * 0.8)
    createLabel(k, "Choose character", k.width() * 0.5, k.height() * 0.4)

    onCharInput((ch) => {
        userName += ch
        label.text = userName
    })

    loadTiledMap(map).then((r) => {
        levels = r.levels
        key = r.key
    })

    layers(["icons", "lines"], "icons")
    add([sprite("faune_ico"), pos(k.width() * 0.3, k.height() * 0.5 ), area(), "hero", {heroName: "faune"}])
    add([sprite("zombie_ico"), pos(k.width() * 0.5, k.height() * 0.5 ), area(), "hero", {heroName: "zombie"}])
    add([sprite("knight_ico"), pos(k.width() * 0.7, k.height() * 0.5 ), area(), "hero", {heroName: "knight"}])

    k.onUpdate("hero", (h) => {
        let color = rgb(255, 0, 0)
        if (character === h.heroName) {
            color = rgb(0, 255, 0)
        }
        drawLines({
            pts: [ h.pos, vec2(h.pos.x, h.pos.y + h.height), vec2(h.pos.x + h.width, h.pos.y + h.height),
                vec2(h.pos.x + h.width, h.pos.y), h.pos],
            width: 4,
            pos: vec2(100, 200),
            color: color
        })
    })

    onClick("hero", (h) => {
        character = h.heroName
    })

    onKeyDown("enter", () => {
        if (userName !== "") {
            go("main", {levels: levels, key: key, userName, character})
        }
    })
}

export default StartScene