import k from "../kaboom";

const {
    go,
    sprite,
    add,
    pos,
    origin,
    text,
    loop
} = k

export function LogoScene() {

    add([sprite("dungeon_logo"), pos(k.width() / 2, k.height() / 2), origin('center'), scale(0.3)])
    const textLabel = add([text("press space to start",
        {size: 10}), pos(k.width() / 2, k.height() / 1.2),
        origin('center'),
    opacity(1)])
    let increase = true
    loop(0.1, () => {
        if (toFixedNumber(textLabel.opacity) === 0 || toFixedNumber(textLabel.opacity) === 1) {
            increase = !increase
        }

        textLabel.opacity = increase ? textLabel.opacity + 0.1 : textLabel.opacity - 0.1
    })

    k.onKeyPress('space', () => {
        go('start')
    })
}

function toFixedNumber(number) {
    return Math.floor(number * 10) / 10
}
export default LogoScene