import k from "../kaboom";
import {GameObj, KaboomCtx} from "kaboom";
import map from "../tiles/SciFi";
import connect from "../rsocket/RsocketCLient"

const {
    go,
    onKeyDown,
    add,
    onCharInput,
    onClick,
    onKeyPress,
    origin,
    sprite,
    layer
} = k

let userName = "";
let character = "lite_player_blue"

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

    onKeyDown("enter", () => {
        if (userName.trim() !== "") {
            go("main", {userName, character})
        } else {
            shake(10)
        }
    })
}

export default StartScene