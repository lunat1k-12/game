import k from "../kaboom";

const {add, origin, sprite, area, text, get, onKeyPress, wait, pos, solid} = k

export const MAIN_LEVEL_WALL_MAP = [
    "{==================}",
    "|        w         /",
    "|   w           w  /",
    "|                  /",
    "|      w           /",
    "|           w      /",
    "|                  /",
    "| w       d        /",
    "|                  /",
    "|                  /",
    "|  nb         t  w /",
    "|                  /",
    "[==================]",
]

export const MAIN_LEVEL_WALL_MAPPING = {
    width: 32,
    height: 32,
    "{": () => [sprite("top_left_wall"), solid(), area(), 'level-part', 'wall'],
    "}": () => [sprite("top_right_wall"), solid(), area(), 'level-part', 'wall'],
    "|": () => [sprite("left_wall"), solid(), area({shape: 'line', width: 8, height: 32}), 'level-part', 'wall'],
    "[": () => [sprite("bottom_left_wall"), solid(), area(), 'level-part', 'wall'],
    "]": () => [sprite("bottom_right_wall"), solid(), area(), 'level-part', 'wall'],
    "/": () => [sprite("right_wall"), solid(), area({shape: 'line', width: 8, height: 32, offset: vec2(26, 0)}), 'level-part', 'wall'],
    "=": () => [sprite("top_bottom_wall"), solid(), area(), 'level-part', 'wall'],
    "d": () => [sprite("desk", {anim: 'anim'}), solid(), area(), 'level-part', 'wall'],
    "t": () => [sprite("terminal", {anim: 'anim'}), solid(), area(), 'level-part', 'wall'],
    "n": () => [sprite("not_empty_burrel", {anim: 'anim'}), solid(), area(), 'level-part', 'wall'],
    "b": () => [sprite("empty_burrel", {anim: 'anim'}), solid(), area(), 'level-part', 'wall'],
    "w": () => [
        sprite("walk_drone", {anim: "idle-diactivated"}),
        state("idle-diactive", ["idle-diactive", "idle", "attack", "move", "activate", "diactivate"]),
        'enemy-walk-drone'
    ]
}

export const MAIN_LEVEL_FLOOR_MAP = [
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    ",
    "                    "
]

export const MAIN_LEVEL_FOOR_MAPPING = {
    width: 32,
    height: 32,
    " ": () => [sprite("basic_floor"), 'level-part']
}

export const MAIN_LEVEL_SPECIAL_ITEMS_MAP = [
    "  s  "
]

export const MAIN_LEVEL_SPECIAL_ITEMS_MAPPING = {
    width: 64,
    height: 32,
    "s": () => [sprite("big_screen", {anim: 'anim'}), solid(), area(), 'level-part', 'wall']
}

export const A_STAR_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]