import k from "./kaboom";
import StartScene from "./scene/startScene";
import MainScene from "./scene/mainScene";
import loadSprites from "./loader/SpriteLoader";
import loadHeroes from "./loader/HeroLoader";

const { scene, go } = k

loadSprites()
loadHeroes()

scene("start", StartScene)
scene("main", MainScene)

go('start')