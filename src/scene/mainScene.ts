import k from "../kaboom";

const { add, origin, sprite, solid, body, area, isKeyDown, text, destroyAll } = k

export function MainScene(config) {

    for (let level of config.levels) {
        k.addLevel(level, { width: 16, height: 16, ...config.key })
    }

    const faune = add([pos(100, 100),
        sprite("faune"),
        origin('center'),
        solid(),
        body({maxVel: 0}),
        area()]);
    faune.play("idle-up")

    const name = add([text("Lunat1k", {size: 8}), pos(faune.pos)])
    faune.onUpdate(() => {
        camPos(faune.pos)
        name.pos.x = faune.pos.x - name.width / 2
        name.pos.y = faune.pos.y - name.height - 10
    })

    faune.action(() => {
        const left = isKeyDown('left')
        const right = isKeyDown('right')
        const up = isKeyDown('up')
        const down = isKeyDown('down')
        const space = isKeyDown('space')
        const speed = 10
        const currentAnim = faune.curAnim()

        let infos = k.get('info')
        let colliding = false
        for (let info of infos) {
            if (faune.isColliding(info)) {
                colliding = true
                if (space) {
                    add([text(info.message, {size: 16, width: 200}), pos(info.pos.x - 100, info.pos.y - 50), 'printed-text'])
                }
            }
        }

        if (!colliding) {
            destroyAll('printed-text')
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