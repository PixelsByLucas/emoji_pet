import { Scene } from '../../build/phaser.min.js'

class LoadingScene extends Scene {
  constructor() {
    super('load-scene')
  }

  init() {
    const isChrome = navigator.userAgent.includes('Chrome')
  }

  preload() {
    const { width, height } = this.sys.game.config

    const logo = this.add.text(width / 2, 200, "🤯", { font: "64px Sans Open" })
      .setOrigin(0.5, 0.5);

    const barW = 150
    const barH = 30

    const bgBar = this.add.graphics()
    bgBar.setPosition(width / 2 - barW / 2, height / 2 - barH / 2)
    bgBar.fillStyle(0xF5F5F5, 1);
    bgBar.fillRect(0, 0, barW, barH);

    const progressBar = this.add.graphics();
    progressBar.setPosition(width / 2 - barW / 2, height / 2 - barH / 2)

    this.load.on('progress', function(value) {
      progressBar.clear();
      progressBar.fillStyle(0x9AD98D);
      progressBar.fillRect(0, 0, value * barW, barH);
    });
  }

  create() {
    this.scene.start('home-scene')
  }
}

export default LoadingScene