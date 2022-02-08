import k from "../kaboom";

const { loadSprite } = k

export function loadSprites() {
    loadSprite("basic_floor", "/public/tiles/basic_floor.png")
    loadSprite("bottom_left_wall", "/public/tiles/bottom_left_wall.png")
    loadSprite("bottom_right_wall", "/public/tiles/bottom_right_wall.png")
    loadSprite("top_bottom_wall", "/public/tiles/wall.png")
    loadSprite("left_wall", "/public/tiles/left_wall.png")
    loadSprite("right_wall", "/public/tiles/right_wall.png")
    loadSprite("top_left_wall", "/public/tiles/top_left_wall.png")
    loadSprite("top_right_wall", "/public/tiles/top_right_wall.png")
}

export default loadSprites