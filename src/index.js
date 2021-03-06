import Phaser from 'phaser'
import LoadingScene from './scenes/LoadingScene'
import HomeScene from './scenes/HomeScene'
import GameScene from './scenes/GameScene'
// 
var config = {
    type: Phaser.AUTO,
    parent: 'body',
    title: 'Emoji Pet',
    pixelArt: false,
    width: 360,
    height: 580,
    scene: [LoadingScene, HomeScene, GameScene],
    scale: {
        parent: 'game-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        fullscreenTarget: 'game-container'
    },
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
    }
}
};

var game = new Phaser.Game(config);

