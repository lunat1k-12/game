import k from "./kaboom";
import StartScene from "./scene/startScene";
import MainScene from "./scene/mainScene";
import loadSprites from "./loader/SpriteLoader";
import loadHeros from "./loader/HeroLoader";

const { scene, go } = k

loadSprites()
loadHeros()

scene("start", StartScene)
scene("main", MainScene)

go('start')