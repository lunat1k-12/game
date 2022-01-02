import k from "../kaboom";

const { add, origin, sprite, solid, body, area, isKeyDown, text, destroyAll, get } = k

export function MainScene(config) {

    layers(["bg", "level"], "level")

    for (let level of config.levels) {
        k.addLevel(level, { width: 16, height: 16, ...config.key })
    }

    add([sprite("bg", {
        tiled: true,
        height: 640,
        width: 624
    }),
    layer("bg")])

    const faune = add([pos(100, 100),
        sprite(config.character),
        origin('center'),
        solid(),
        body({maxVel: 0}),
        // scale(2),
        area()]);
    faune.play("idle-up")

    const name = add([text(config.userName, {size: 8}), pos(faune.pos)])
    faune.onUpdate(() => {
        camPos(faune.pos)
        name.pos.x = faune.pos.x - name.width / 2
        name.pos.y = faune.pos.y - name.height - 10
    })

    faune.action(() => {
        const quite = isKeyDown('q')
        const left = isKeyDown('left')
        const right = isKeyDown('right')
        const up = isKeyDown('up')
        const down = isKeyDown('down')
        const speed = 6
        const currentAnim = faune.curAnim()

        if (quite) {
            go("start")
            return
        }

        if (left) {
            if (currentAnim !== "walk-side") {
                faune.play("walk-side")
            }
            faune.flipX(true)
            faune.pos.x -= speed
        } else if (right) {
            if (currentAnim !== "walk-side") {
                faune.play("walk-side")
            }
            faune.flipX(false)
            faune.pos.x += speed
        } else if (up) {
            if (currentAnim !== "walk-up") {
                faune.play("walk-up")
            }
            faune.pos.y -= speed
        } else if (down) {
            if (currentAnim !== "walk-down") {
                faune.play("walk-down")
            }
            faune.pos.y += speed
        } else if (currentAnim !== undefined){
            const direction = currentAnim.split('-').pop() ?? 'down'
            faune.play(`idle-${direction}`)
        }
    })
}

export default MainScene