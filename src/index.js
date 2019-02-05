import Phaser from './../build/phaser.min.js'
import LoadingScene from './scenes/LoadingScene'
import HomeScene from './scenes/HomeScene'
import GameScene from './scenes/GameScene'

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    title: 'Emoji Pet',
    pixelArt: false,
    width: 360,
    height: 580,
    scene: [LoadingScene, HomeScene, GameScene],
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        // debug: true
    }
}
};

var game = new Phaser.Game(config);

