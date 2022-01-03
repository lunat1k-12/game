import kaboom from "kaboom";
import tiledKaboom from './tiled-kaboom'

export const k = kaboom({
    background: [0, 0, 0, 1],
    debug: true,
    scale: 3,
    plugins: [tiledKaboom]
})

export default k