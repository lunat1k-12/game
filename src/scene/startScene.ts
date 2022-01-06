import k from "../kaboom";
import {GameObj, KaboomCtx} from "kaboom";
import map from "../LiquebaseDungeon";
import connect from "../rsocket/RsocketCLient"

const {
    go,
    onKeyDown,
    add,
    loadTiledMap,
    onCharInput,
    onClick,
    onKeyPress,
    origin,
    sprite,
    layer
} = k

let levels = undefined
let key = undefined
let userName = "";
let character = "faune"

function createLabel(k: KaboomCtx, message: string, width: number, height: number, size: number): GameObj {
    return add([
        k.text(message, {size}),
        k.pos(width, height),
        k.color(255, 1, 1),
        k.origin('center')])
}

export function StartScene() {
    connect()
    userName = ""
    layers(["bg", "frames"], "frames")
    const label = createLabel(k, "type your name...", k.width() * 0.5, k.height() * 0.2, 32)

    createLabel(k, "Press enter after name input", k.width() * 0.5, k.height() * 0.8, 16)
    createLabel(k, "Choose character", k.width() * 0.5, k.height() * 0.4, 32)

    onCharInput((ch) => {
        userName += ch
        userName = userName.trim()
        label.text = userName
        if (userName.length === 0) {
            label.text = "type your name..."
        }
    })

    onKeyPress('backspace', () => {
        userName = userName.substring(0, userName.length - 1)
        label.text = userName
        if (userName.length === 0) {
            label.text = "type your name..."
        }
    })


    loadTiledMap(map).then((r) => {
        levels = r.levels
        key = r.key
    })

    add([sprite("bg", {tiled: true, width: k.width(), height: k.height()}), pos(0, 0), layer('bg')])

    const multiplier = 0.22
    add([sprite("frame"), origin('center'), pos(k.width() * multiplier, k.height() * 0.6), area(), "hero", {heroName: "faune"}])
    add([sprite("faune_ico"), origin('center'), pos(k.width() * multiplier, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 40, k.height() * 0.6), area(), "hero", {heroName: "zombie"}])
    add([sprite("zombie_ico"), origin('center'), pos(k.width() * multiplier + 40, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 80, k.height() * 0.6), area(), "hero", {heroName: "knight"}])
    add([sprite("knight_ico"), origin('center'), pos(k.width() * multiplier + 80, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 120, k.height() * 0.6), area(), "hero", {heroName: "ogre"}])
    add([sprite("ogre_ico"), origin('center'), pos(k.width() * multiplier + 120, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 160, k.height() * 0.6), area(), "hero", {heroName: "necro"}])
    add([sprite("necro_ico"), origin('center'), pos(k.width() * multiplier + 160, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 200, k.height() * 0.6), area(), "hero", {heroName: "chort"}])
    add([sprite("chort_ico"), origin('center'), pos(k.width() * multiplier + 200, k.height() * 0.6)])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 240, k.height() * 0.6), area(), "hero", {heroName: "wizzard"}])
    add([sprite("wizzard_ico"), origin('center'), pos(k.width() * multiplier + 240, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 280, k.height() * 0.6), area(), "hero", {heroName: "swampy"}])
    add([sprite("swampy_ico"), origin('center'), pos(k.width() * multiplier + 280, k.height() * 0.6), area()])

    add([sprite("frame"), origin('center'), pos(k.width() * multiplier + 320, k.height() * 0.6), area(), "hero", {heroName: "wogol"}])
    add([sprite("wogol_ico"), origin('center'), pos(k.width() * multiplier + 320, k.height() * 0.6), area()])

    k.onUpdate("hero", (h) => {
        let spriteName = "frame"
        if (character === h.heroName) {
            spriteName = "frame_selected"
        }
        h.use(sprite(spriteName))
    })

    onClick("hero", (h) => {
        character = h.heroName
    })

    onKeyDown("enter", () => {
        if (userName.trim() !== "") {
            go("main", {levels: levels, key: key, userName, character})
        }
    })
}

export default StartScene