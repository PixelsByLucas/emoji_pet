import { Scene } from 'phaser'

class HomeScene extends Scene {
  constructor() {
    super('home-scene')
  }

  renderBackground(width, height) {
    // create background
    const bg = this.add
      .text(width / 2, 0, '🌁', { font: '322px Sans Open' })
      .setOrigin(0.5, 0)
      .setDepth(1)
      .setInteractive();

    // create trees
    const trees = this.add
      .text(width / 2, height / 2, '🌲🌲🌲', { font: '100px Sans Open' })
      .setOrigin(0.5, 0)
      .setPadding({ top: 6 })
      .setDepth(2);

    this.garbage = this.add
      .text(84, height - 176, '🗑️', { font: '48px Sans Open' })
      .setOrigin(0.5, 0)
      .setPadding({ top: 6 })
      .setDepth(2);
    
    this.physics.add.existing(this.garbage, false)
    this.garbage.body.allowGravity = false

    // create flowers
    const clover1 = this.add.text(width / 2 + 90, height / 2 + 125, '🍀', { font: '16px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const clover2 = this.add.text(width / 2 + 70, height / 2 + 110, '🍀', { font: '16px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const clover3 = this.add.text(width / 2 - 60, height / 2 + 120, '🍀', { font: '16px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const clover4 = this.add.text(width / 2 + 10, height / 2 + 125, '🍀', { font: '14px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const clover5 = this.add.text(width / 2 - 100, height / 2 + 130, '🍀', { font: '16px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const clover6 = this.add.text(width / 2 + 150, height / 2 + 150, '🍀', { font: '12px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const clover7 = this.add.text(width / 2 - 140, height / 2 + 160, '🍀', { font: '12px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const flower1 = this.add.text(width / 2 - 70, height / 2 + 94, '🌼', { font: '24px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const flower2 = this.add.text(width / 2 - 26, height / 2 + 110, '🌼', { font: '18px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const flower3 = this.add.text(width / 2 - 100, height / 2 + 130, '🌼', { font: '24px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const flower4 = this.add.text(width / 2 + 110, height / 2 + 136, '🌼', { font: '24px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    const flower5 = this.add.text(width / 2 + 150, height / 2 + 110, '🌼', { font: '18px Sans Open' })
      .setOrigin(0.5, 0.5)
      .setPadding({ top: 2 })
      .setDepth(1)

    // create clouds
    const clouds = this.add
      .text(-90, 35, '☁', { font: '100px Sans Open', })
      .setAlpha(0.7)
      .setDepth(2)

    // animate clouds
    const timelineCloud = this.tweens.createTimeline();

    timelineCloud.add({
      targets: clouds,
      duration: 1000,
      x: -90,
    });

    timelineCloud.add({
      targets: clouds,
      duration: 20000,
      repeat: -1,
      x: this.sys.game.config.width + 60,
    });

    timelineCloud.play();
  }

  create() {
    const { width, height } = this.sys.game.config

    this.renderBackground(width, height)

    // create ground
    const ground = new Phaser.Geom.Rectangle(0, height / 2 + 60, width, height / 2);
    const graphics = this.add.graphics({ fillStyle: { color: 0x44a341 } })
    graphics.fillRectShape(ground);

    // create welcome text
    const text = this.add.text(
      width / 2, height / 2 - 80,
       '😣EMOJI PET', { font: '40px Arial', fill: '#ffffff'}
    )
    text.setOrigin(0.5, 0.5);
    text.depth = 10;

    const textBackground = this.add
    .graphics()
    .fillStyle(0x000000, 0.7)
    .setDepth(9)
    .fillRect(
      width / 2 - text.width / 2 - 10, 
      (height / 2 - 80) - text.height / 2 - 10, 
      text.width + 20, 
      text.height + 20
    )

    // tap to play text
    const clickText = this.add.text(
      width / 2, height / 2 - 20,
      'tap to play!',
      { font: '28px Arial', fill: '#ffffff' }
    )
      .setDepth(10)
      .setOrigin(0.5, 0.5)
    
    const clickTextBackground = this.add
      .graphics()
      .fillStyle(0x000000, 0.7)
      .setDepth(9)
      .fillRect(
        width / 2 - clickText.width / 2 - 10,
        (height / 2) - clickText.height / 2 - 30,
        clickText.width + 20,
        clickText.height + 20
      )

    this.input.on('pointerdown', function() {
      this.scene.start('game-scene', { renderBackground: this.renderBackground });
    }, this);
  }
}

export default HomeScene