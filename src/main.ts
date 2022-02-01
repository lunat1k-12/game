import k from "./kaboom";
import StartScene from "./scene/startScene";
import MainScene from "./scene/mainScene";
import loadSprites from "./loader/SpriteLoader";
import loadHeroes from "./loader/HeroLoader";
import loadItems from "./loader/ItemLoader";

const { scene, go } = k

loadSprites()
loadHeroes()
loadItems()

scene("start", StartScene)
scene("main", MainScene)

go('start')