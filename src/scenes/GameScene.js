import Phaser, { Scene } from '../../build/phaser.min.js'

class GameScene extends Scene {
  constructor() {
    super('game-scene')
  }

  // Create a closure to protect state
  init() {
    let state = {
      stats: {
        health: 100,
        fun: 100
      },
      decayRates: {
        health: 0.1,
        fun: 0.1
      },
      ui: {
        button_emoji: ['🥗', '🥪', '🍔', '🍦'],
        buttons: [],
        selectedBtn: null,
        placedBtn: null,
        uiBlocked: false
      },
      itemPool: [
        { type: 'good', text: '🧀' },
        { type: 'good', text: '🥖' },
        { type: 'good', text: '🥐' },
        { type: 'good', text: '🥙' },
        { type: 'good', text: '🥗' },
        { type: 'good', text: '🌮' },
        { type: 'good', text: '🥪' },
        { type: 'good', text: '🍱' },
        { type: 'good', text: '🍠' },
        { type: 'good', text: '🍣' },
        { type: 'good', text: '🍲' },
        { type: 'good', text: '🍝' },
        { type: 'good', text: '🥣' },
        { type: 'good', text: '🥝' },
        { type: 'good', text: '🍇' },
        { type: 'good', text: '🍈' },
        { type: 'good', text: '🍉' },
        { type: 'good', text: '🍊' },
        { type: 'good', text: '🍋' },
        { type: 'good', text: '🍌' },
        { type: 'good', text: '🍍' },
        { type: 'good', text: '🍎' },
        { type: 'good', text: '🍏' },
        { type: 'good', text: '🍒' },
        { type: 'good', text: '🍑' },
        { type: 'good', text: '🍐' },
        { type: 'good', text: '🍓' },
        { type: 'good', text: '🍅' },
        { type: 'good', text: '🍆' },
        { type: 'good', text: '🌽' },
        { type: 'good', text: '🥒' },
        { type: 'good', text: '🥑' },
        { type: 'good', text: '🥦' },
        { type: 'good', text: '🥕' },
        { type: 'bad', text: '🥨' },
        { type: 'bad', text: '🥞' },
        { type: 'bad', text: '🍟' },
        { type: 'bad', text: '🌭' },
        { type: 'bad', text: '🍔' },
        { type: 'bad', text: '🍕' },
        { type: 'bad', text: '🍿' },
        { type: 'bad', text: '🍖' },
        { type: 'bad', text: '🍗' },
        { type: 'bad', text: '🥩' },
        { type: 'bad', text: '🥡' },
        { type: 'bad', text: '🥠' },
        { type: 'bad', text: '🥟' },
        { type: 'bad', text: '🍧' },
        { type: 'bad', text: '🍦' },
        { type: 'bad', text: '🥧' },
        { type: 'bad', text: '🍨' },
        { type: 'bad', text: '🍩' },
        { type: 'bad', text: '🍪' },
        { type: 'bad', text: '🎂' },
        { type: 'bad', text: '🍭' },
        { type: 'bad', text: '🍬' },
        { type: 'bad', text: '🍫' },
        { type: 'bad', text: '🍰' },
        { type: 'bad', text: '🍮' },
        { type: 'bad', text: '🍡' },
      ],   
      lastEaten: [],
      poopsPresent: 0,
      tweenQueue: []
    }

    this.state = {
      getTweenQueue() {
        return state.tweenQueue.slice()
      },
      updateTweenQueue(action, tween) {
        let tweenQueue = this.getTweenQueue()
        action === 'add'
        ? tweenQueue.push(tween)
        : action === 'remove'
        ? tweenQueue[tweenQueue.find]
        : null

      },
      getLastEaten() {
        return state.lastEaten.slice()
      },
      setLastEaten(newItem) {
        if(newItem === 'reset') {
          state.lastEaten = []
          return
        }

        let lastEaten = state.lastEaten.slice()
        if(lastEaten.length >= 5) {
          lastEaten = []
        } 
        lastEaten.push(newItem)
        state.lastEaten = lastEaten
      },
      getItemPool() {
        let array = state.itemPool.slice()
        let counter = array.length

        while (counter > 0) {
          let index = Math.floor(Math.random() * counter)
          counter--
          let temp = array[counter]
          array[counter] = array[index]
          array[index] = temp
        }
        return array
      },
      setPlacedBtn(btn) {
        btn
        ? state.ui.placedBtn = btn
        : state.ui.placedBtn = null
      },
      getPlacedBtn() {
        return state.ui.placedBtn
      },
      setSelectedBtn(btn) {
        btn 
        ? state.ui.selectedBtn = btn
        : state.ui.selectedBtn = null
      },
      getSelectedBtn() {
        return state.ui.selectedBtn
      },
      setUIBtns(newBtns) {
        state.ui.buttons = newBtns.slice()
      },
      setOneUIBtn(btn, i, data) {
        const buttons = state.ui.buttons.slice()
        buttons[i] = btn
        buttons[i].setData('type', data)
        state.ui.buttons = buttons
      },
      getUIBtns() {
        return state.ui.buttons.slice()
      },
      isUIBlocked() {
        return state.ui.uiBlocked
      },
      toggleUIBlocked() {
        state.ui.uiBlocked = !state.ui.uiBlocked
      },
      incrementStats(statName, amount) {
        statName == 'health' 
        ? state.stats.health = Math.min(state.stats.health + amount, 100)
        : statName == 'fun' 
        ? state.stats.fun = Math.min(state.stats.fun + amount, 100)
        : null
      },
      decrementStats(statName, amount) {
        statName == 'health' 
        ? state.stats.health = Math.max(state.stats.health - amount, 0)
        : statName == 'fun' 
        ? state.stats.fun = Math.max(state.stats.fun - amount, 0)
        : null
      },
      getStats() {
        return Object.assign({}, state.stats)
      },
      getDecay() {
        return Object.assign({}, state.decayRates)
      },
      getPoops() {
        return state.poopsPresent
      },
      incrementPoops() {
        state.poopsPresent++
      },
      decrementPoops() {
        state.poopsPresent--
      }
    }
  }

  create(data) {
    const { width, height } = this.sys.game.config
    const { incrementPoops } = this.state

    // create background
    data.renderBackground.call(this, width, height)

    // click twice for fullscreen text
    if (screen.width < 420) {
      this.timedEventClickText = this.time.addEvent({
        delay: 3000,
        repeat: 0,
        callbackScope: this,
        callback: () => {
          let clickText = this.add.text( 
            width / 2, height / 2 - 80, 
            "✌Tap twice for full screen", 
            { font: "28px Arial", fill: "#ffffff" }
          )
          .setDepth(10)
          .setOrigin(0.5, 0.5)

          let clickTextBg = this.add.graphics()
          clickTextBg.fillStyle(0x000000, 0.7)
          clickTextBg.fillRect(
            width / 2 - clickText.width / 2 - 10,
            (height / 2 - 80) - clickText.height / 2 - 10,
            clickText.width + 20,
            clickText.height + 20
          )
          .setDepth(9)
          setTimeout(() => {
            clickText.destroy()
            clickTextBg.destroy()
          }, 3000)
        },
      })
    }

    debugger

    // click event for item placement
    this.input.on('pointerdown', this.itemPlace, this)

    // init newItem
    this.newItem = {}

    // create HUD & UI
    this.renderHUD(width)
    this.initBtns(width, height)

    // create ground
    this.ground = new Phaser.Geom.Rectangle(0, height / 2 + 60, width, height / 2)
    const graphics = this.add.graphics({ fillStyle: { color: 0x44a341 } })
    graphics.fillRectShape(this.ground)

    // create world physics bounds
    this.physics.world.setBounds(0, 0, width, height / 1.2)

    // create pet
    this.pet = this.add
      .text(width / 2, height / 2, '😍', { font: "64px Sans Open" })
      .setInteractive({
        draggable: true,
        useHandCursor: true,
      })
      .setDepth(6)
      .setPadding({ top: 6, })
      .setOrigin(0.5, 0.5)

    this.pet.setDefaultEmoji = () => {
      const stats = this.state.getStats()

      if (stats.fun < stats.health) {
        if (stats.fun > 90) {
          this.pet.setText('🤩')
        } else if (stats.fun > 50) {
          this.pet.setText('🙂')
        } else {
          this.pet.setText('😔')
        }
      } else {
        if (stats.health > 90) {
          this.pet.setText('😁')
        } else if (stats.health > 50) {
          this.pet.setText('🙂')
        } else {
          this.pet.setText('🤒')
        }
      }
    }

    this.pet.setDefaultEmoji()

    this.pet.beingDragged = () => {
      if(this.pet.y < height / 2) {
        this.pet.setText('😲')
      } else {
        this.pet.setDefaultEmoji()
      }
    }

    this.pet.falling = () => {
      const timedPetDrop = this.time.addEvent({
        repeat: -1,
        callback: () => {
          if(this.pet.y >= this.ground.y) {
            this.pet.setDefaultEmoji()
            timedPetDrop.destroy()
          }
        }
      })
    }

    // set up drag/drop form poop and pet
    this.input.on('drag', (pointer, gameObject, target) => {
      const validTargets = ['😲', '🤩', '😁', '🙂', '😔', '🤒', '💩']
      if (!validTargets.includes(gameObject._text) ) { return }
    
      gameObject.body.setVelocity(0, 0)
      gameObject.body.allowGravity = false
      gameObject.x = pointer.x,
      gameObject.y = pointer.y,
      
      gameObject._text == '💩' 
        ? gameObject.move.pause() 
        : gameObject.beingDragged()

      this.input.once('pointerup', function(pointer, target) {
        if (!validTargets.includes(target[0]._text)) { return }
        target[0].body.allowGravity = true
        target[0].falling()
      })

      this.input.once('pointerout', function(pointer, target) {
        if (!validTargets.includes(target[0]._text)) { return }
        target[0].body.allowGravity = true
        target[0].falling()
      })
    })


    // create pet physics
    this.physics.add.existing(this.pet, false)
    this.pet.body.setVelocity(0, 0)
    this.pet.body.setBounce(0.1, 0.3)
    this.pet.body.allowDrag = true
    this.physics.add.collider(this.pet, this.ground)
    this.pet.body.setCollideWorldBounds(true)   
    
    this.pet.eatItem = this.tweens.createTimeline()
    this.pet.eatItem.add({
      targets: this.pet,
      duration: 300,
      x: { value: () => { return this.newItem.x }},
      y: { value: () => { return this.newItem.y - 50 }},
      onStart: () => { this.pet.setText('😮') }
    })
    this.pet.eatItem.add({
      targets: this.pet,
      duration: 150,
      x: { value: () => { return this.newItem.x } },
      y: { value: () => { return this.newItem.y - 20 } },
      onStart: () => { 
        this.pet.setText('😌') 
        this.newItem.setAlpha(0.7)
      }
    })
    this.pet.eatItem.add({
      targets: this.pet,
      duration: 300,
      x: { value: () => { return this.newItem.x } },
      y: { value: () => { return this.newItem.y - 50 } },
      onStart: () => {
        this.pet.setText('😮')
      }
    })
    this.pet.eatItem.add({
      targets: this.pet,
      duration: 150,
      x: { value: () => { return this.newItem.x } },
      y: { value: () => { return this.newItem.y - 20 } },
      onStart: () => {
        this.pet.setText('😌')
        this.newItem.setAlpha(0.4)
      }
    })
    this.pet.eatItem.add({
      targets: this.pet,
      duration: 300,
      x: { value: () => { return this.newItem.x } },
      y: { value: () => { return this.newItem.y - 50 } },
      onStart: () => {
        this.pet.setText('😮')
      }
    })
    this.pet.eatItem.add({
      targets: this.pet,
      duration: 150,
      x: { value: () => { return this.newItem.x } },
      y: { value: () => { return this.newItem.y - 20 } },
      onStart: () => {
        this.pet.setText('😌')
        this.newItem.setAlpha(0.2)
      },
      onComplete: () => { 
        this.pet.setDefaultEmoji()
        this.foodStats(this.state.getPlacedBtn())
        this.newItem.destroy()
        this.state.toggleUIBlocked()
        this.state.setPlacedBtn(null)
        this.renderBtns()
        this.pet.eatItem.pause()
       }
    })

    this.pet.poop = this.tweens.createTimeline()
    for(let i = 0; i < 10; i++) {
      this.pet.poop.add({
        targets: this.pet,
        duration: 100,
        x: { value: () => { return this.pet.x += 3 }},
        onStart: () => {
          this.pet.setText("😣")
        }
      })
      this.pet.poop.add({
        targets: this.pet,
        duration: 100,
        x: { value: () => { return this.pet.x -= 3 }},
        onStart: () => {
          this.pet.setText("😣")
        }
      })
    }
    this.pet.poop.add({
      targets: this.pet,
      offset: 2000,
      duration: 100,
      y: { value: () => { return this.pet.y -30 }},
      onStart: () => {
        this.pet.setText("😌")
      },
      onComplete: () => {
        incrementPoops()
        this.initNewPoop()
      }
    });
    this.pet.poop.add({
      targets: this.pet,
      offset: 2500,
      onComplete: () => {
        this.pet.setDefaultEmoji()
        this.pet.poop.pause() 
      }
    })

    this.pet.poop.play()

    this.pet.vomit = this.tweens.createTimeline()
    this.pet.vomit.add({
      targets: this.pet,
      ease: 'Linear',
      onStart: () => {
        this.pet.setText('🤢')
      }
    })
    this.pet.vomit.add({
      targets: this.pet,
      offset: 1000,
      onComplete: () => {
        this.pet.setText('🤮')
      }
    });
    this.pet.vomit.add({
      targets: this.pet,
      offset: 1700,
      onComplete: () => {
        this.pet.setText('😞')
      }
    });
    this.pet.vomit.add({
      targets: this.pet,
      offset: 2700,
      onComplete: () => {
        this.pet.setDefaultEmoji()
        this.pet.vomit.pause() 
      }
    });

    this.timedEventPoop = this.time.addEvent({
      delay: 30000,
      repeat: -1,
      callback: () => {
        this.pet.poop.play()
      },
    })
    this.timedEventStats = this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callback: () => {
        this.decayStats()
      }
    })
  }

  gameOver() {
    // shutdown sequence
    this.state.toggleUIBlocked()
    this.state.setSelectedBtn(null)
    this.tweens.killTweensOf(this.pet)
    this.timedEventStats.destroy()
    this.pet.setText("💀")

    // start home-scene in 3 seconds
    const homeScene = this.time.addEvent({
      delay: 3000,
      repeat: 0,
      callback: () => {
        this.scene.start('home-scene')
      }
    });
  }

  decayStats() {
    const { decrementStats, getStats, getDecay, getPoops } = this.state
    const poopModifier = getPoops() > 1 ? getPoops() : 1;
    const stats = getStats()
    
    decrementStats('health', getDecay().health * poopModifier)
    decrementStats('fun', getDecay().fun)

    if(stats.health < 1 || stats.fun < 1) {
      this.gameOver()
    }

    this.updateHUD()
  }

  foodStats(placedBtn) {
    const { setLastEaten, getLastEaten, incrementStats, decrementStats } = this.state
    setLastEaten(placedBtn.getData('type'))
    const lastEaten = getLastEaten()
    let numBad = 0
    let numGood = 0

    debugger
    if(`${placedBtn.getData('type')}` === 'good') {
      incrementStats('health', 10)
    } else {
      incrementStats('fun', 10)
    }
    
    if(getLastEaten().length >= 3) {
      for(let i = 0; i < lastEaten.length; i++) {
        if(lastEaten[i] === 'bad') {
          numBad++
        } else {
          numGood++
        }
      }

      if(numBad >= 3) {
        this.pet.vomit.play()
        decrementStats('health', 15)
        setLastEaten('reset')
        
      } 
      if(numGood >= 3) {
        incrementStats('health', 15)
        setLastEaten('reset')
      }
    }
  }


  initNewPoop() {
    const { width, height } = this.sys.game.config
    const { decrementPoops } = this.state
    this.poopEmoji = this.poopEmoji || []

    this.poopEmoji.push(
      this.add
        .text(this.pet.x, this.pet.y + 20, "💩", { font: "32px Arial Open" })
        .setDepth(5)
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5, 0)
      )

    const newPoop = this.poopEmoji[this.poopEmoji.length - 1]

    // init newPoopPhysics
    this.physics.add.existing(newPoop, false)
    this.physics.add.collider(newPoop, this.ground)
    newPoop.body.setVelocity(0, 0)
    newPoop.body.setBounce(0.1, 0.1)
    newPoop.body.setCollideWorldBounds(true)
    this.input.setDraggable(newPoop)

    // init newPoop falling
    newPoop.falling = () => {
      const garbageCollider = this.physics.add.overlap(newPoop, this.garbage, null, () => {
        this.garbageGrow()
        newPoop.selfDestruct()
      })

      const timedPoopDrop = this.time.addEvent({
        delay: 1500,
        repeat: -1,
        callback: () => {
          if (newPoop.y >= this.ground.y){
            garbageCollider.destroy()
            newPoop.move.play()
            timedPoopDrop.destroy()
          }
        },
      })
    }

    newPoop.selfDestruct = () => {
      newPoop.move.destroy()
      newPoop.destroy()
      decrementPoops()
    }
    

    // init newPoop.move Timeline
    newPoop.move = this.tweens.createTimeline()
    newPoop.move.direction = 'east'
    newPoop.flipX = true

    newPoop.move.add({
      targets: newPoop,
      ease: 'Expo.easeOut',
      x: {
        value: {
          getEnd: function (target, key, value) {
            if(newPoop.move.direction == 'east') {
              return target.x + 10
            } else {
              return target.x - 10
            }
          },
          getStart: function (target, key, value) {
            return target.x
          }
        }
      },
      y: height - 160,
      offset: '+= 1000',
      duration: 200,
    })
    newPoop.move.add({
      targets: newPoop,
      ease: 'Expo.easeOut',
      x: {
        value: {
          getEnd: function (target, key, value) {
            if (newPoop.move.direction == 'east') {
              return target.x + 20
            } else {
              return target.x - 20
            }
          },
          getStart: function (target, key, value) {
            if (newPoop.move.direction == 'east') {
              return target.x + 10
            } else {
              return target.x - 10
            }
          }
        }
      },
      y: height - 160,
      offset: '+= 750',
      duration: 200
    })
    newPoop.move.add({
      targets: newPoop,
      ease: 'Expo.easeOut',
      x: {
        value: {
          getEnd: function (target, key, value) {
            if (newPoop.move.direction == 'east') {
              return target.x + 30
            } else {
              return target.x - 30
            }
          },
          getStart: function (target, key, value) {
            if (newPoop.move.direction == 'east') {
              return target.x + 20
            } else {
              return target.x - 20
            }
          }
        }
      },
      y: height - 160,
      offset: '+= 1000',
      duration: 200,
    })
    newPoop.move.on('complete', () => { 
      if(newPoop.x > (width - newPoop.width)) {
        newPoop.flipX = false
        newPoop.move.direction = 'west'
      }
      if(newPoop.x < 0 + newPoop.width) {
        newPoop.flipX = true
        newPoop.move.direction = 'east'
      }
      if(!newPoop.move.paused) {
        newPoop.move.play()
      }

    })
    newPoop.move.play()
  }

  garbageGrow() {
    const growTween = this.tweens.create({
      targets: this.garbage,
      duration: 1000,
      paused: false,
      onStart: () => {
        this.garbage.setScale(1.1, 1.1)
      },
      onComplete: () => {
        this.garbage.setScale(1, 1)
      }
    })
    growTween.play()
  }

  initBtns(width, height) {
    const fontSize = 44
    let btns = []
  // init buttons if none exist
    btns.push(this.add
      .text(width / 2 - (fontSize * 3), height - (fontSize / 2), "🥗", { font:`${fontSize}px Sans Open` })
    )
    
    btns.push(this.add
      .text(width / 2 - (fontSize * 1), height - (fontSize / 2), "🥪", { font:`${fontSize}px Sans Open` })
    )

    btns.push(this.add
      .text(width / 2 + (fontSize * 1), height - (fontSize / 2), "🍔", { font: `${fontSize}px Sans Open` })
    )
    
    btns.push(this.add
      .text(width / 2 + (fontSize * 3), height - (fontSize / 2), "🍦", { font: `${fontSize}px Sans Open` })
    )
    
    // configure btns
    btns[0].setData('type', 'good')
    btns[1].setData('type', 'good')
    btns[2].setData('type', 'bad')
    btns[3].setData('type', 'bad')

    btns.forEach((btn, i) => {
      btn.on('pointerdown', this.itemClick)
        .setDepth(5)
        .setPadding({ top: 6 })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5, 1)
      btn.input.hitArea.width = btn.input.hitArea.height

      // adding custom methods to each btn
      btn.textPicker = () => {
        const {getItemPool, setOneUIBtn, getUIBtns} = this.state
        const items = getItemPool()
        let j = 0

        setOneUIBtn(getUIBtns()[i].setText(items[j].text), i, items[j].type)
        j === items.length
          ? j = 0
          : j++
      }
      btn.textPickerTime = this.time.addEvent({ 
        delay: 200, 
        callback: btn.textPicker, 
        loop: true,
        paused: true
      })
    })
    this.state.setUIBtns(btns)
  }

  renderBtns() {
    const { getSelectedBtn, setSelectedBtn, getUIBtns, isUIBlocked, getPlacedBtn } = this.state
    getUIBtns().forEach((btn, i) => {
      // control transparency
      if (isUIBlocked() || btn === getSelectedBtn()) {
        btn.setAlpha(0.5)
      } else {
        btn.setAlpha(1)
      }

      if(btn._text === '') {
        btn.textPickerTime.paused = false
        btn.off('pointerdown', this.itemClick)

        btn.on('pointerdown', () => {
          if (isUIBlocked()) { return }
          btn.textPickerTime.paused = true
          btn.off('pointerdown')
          btn.on('pointerdown', this.itemClick)
          setSelectedBtn(null)
          this.renderBtns()
        })
      }

      if (btn === getPlacedBtn()) {
        const newUIBtns = getUIBtns()
        newUIBtns[i].setText('')
        this.state.setUIBtns(newUIBtns)
      }
    })
  }

  itemClick() {
    const {isUIBlocked} = this.scene.state
    if (isUIBlocked()) return 
    const { setSelectedBtn } = this.scene.state
    setSelectedBtn(this)
    this.scene.renderBtns()
  }

  itemPlace(pointer) {
    if(pointer.y > 412 || !this.state.getSelectedBtn()) return

    const { toggleUIBlocked, setPlacedBtn, setSelectedBtn, getSelectedBtn} = this.state

    toggleUIBlocked()
    
    this.newItem = this.add
    .text(pointer.x, pointer.y, `${getSelectedBtn()._text}`, { font: '36px Sans Open' })
    .setDepth(6)
    .setPadding({ top: 6 })
    .setOrigin(0.5, 0.5)
    
    this.physics.add.existing(this.newItem, false)
    this.physics.add.collider(this.newItem, this.ground)
    this.newItem.body.setVelocity(0, 0)
    this.newItem.body.setBounce(0.1, 0.1)
    this.newItem.body.setCollideWorldBounds(true)
    
    setPlacedBtn(getSelectedBtn())
    setSelectedBtn(null)
    this.renderBtns()

    const moveToItemTween = this.tweens.create({
      targets: this.pet,
      x: { value: () => { return this.newItem.x } },
      duration: 1500,
      paused: false,
      onStart: () => {
        this.pet.setText('🤗')
      },
      onComplete: () => {
        this.pet.eatItem.play()
      }
    })
    moveToItemTween.play()
  }

  renderHUD(width) {
    const barWidth = 108
    const barHeight = 38

    // create bar labels
    this.healthText = this.add
      .text(46, 4, '👩‍⚕️', { font: "32px Arial", fill: '#eba300', bold: true })
      .setDepth(2)
    
    this.funText = this.add
      .text(width - (barWidth + 46), 4, '🤹‍♀️', { font: "32px Arial", fill: '#eba300', bold: true })
      .setDepth(2)

    // create health bar
    this.healthBar = this.add.graphics()
      .setPosition(46, 40)
      .lineStyle(4, 0xeba300)
      .strokeRect(0, 0, barWidth, barHeight)
      .setDepth(2)

    this.funBar = this.add.graphics()
      .setPosition(width - (barWidth + 46), 40)
      .lineStyle(4, 0xeba300)
      .strokeRect(0, 0, barWidth, barHeight)
      .setDepth(2)
    
    //create value bar 
    this.healthBarValue = this.add.graphics()
      .setPosition(46 + 4, 40 + 4)
      .setDepth(2)
      .setAlpha(0.8)

    this.funBarValue = this.add.graphics()
      .setPosition(width - (barWidth + 42), 40 + 4)
      .setDepth(2)
      .setAlpha(0.8)

    this.updateHUD()
  }

  updateHUD() {
    const stats = this.state.getStats()

    this.healthBarValue.clear()

    if(stats.health < 33) {
      this.healthBarValue.fillStyle(0xaf0d1a, 1)
    } else if(stats.health < 66) {
      this.healthBarValue.fillStyle(0xf03a17, 1)
    } else {
      this.healthBarValue.fillStyle(0x13a10e, 1)
    }

    this.healthBarValue.fillRect(0, 0, stats.health, 38 - 8)
      

    this.funBarValue.clear()

    if (stats.fun < 33) {
      this.funBarValue.fillStyle(0xaf0d1a, 1)
    } else if (stats.fun < 66) {
      this.funBarValue.fillStyle(0xf03a17, 1)
    } else {
      this.funBarValue.fillStyle(0x13a10e, 1)
    }

    this.funBarValue.fillRect(0, 0, stats.fun, 38 - 8)
  }
}

export default GameScene