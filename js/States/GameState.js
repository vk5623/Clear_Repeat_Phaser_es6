var andarBetTotal; //text for total value of andar
var baharBetTotal; //text for total value of bahar

var andar_value = 0; //sum of total andarBetBox bet
var bahar_value = 0; //sum of total baharBetBox bet

var value; //value of chip
var repeatA, repeatB;


var andarCounter = 1; //initial counter value of andarBetBox clicks
var baharCounter = 1; //initial counter value of baharBetBox clicks

var chip_movement_bet5; //chip5 animation
var chip_movement_bet10; //chip10 animation
var chip_movement_bet50; //chip50 animation
var chip_movement_bet100; //chip100 animation
var chip_movement_bet500; //chip500 animation


var andarChipIcon5;
var baharaChipIcon5;
var andarChipIcon10;
var baharaChipIcon10;
var andarChipIcon50;
var baharaChipIcon50;
var andarChipIcon100;
var baharaChipIcon100;
var andarChipIcon500;
var baharaChipIcon500;

//initializing game state
export default class GameState extends Phaser.State {
    //preload function
    preload() {
            //adding assets
            this.load.image('background', 'assets/images/background.jpg');
            this.load.image('bet5', 'assets/images/chip5.png');
            this.load.image('bet10', 'assets/images/chip10.png');
            this.load.image('bet50', 'assets/images/chip50.png');
            this.load.image('bet100', 'assets/images/chip100.png');
            this.load.image('bet500', 'assets/images/chip500.png');
            this.load.image('betBox', 'assets/images/bet_box.jpg');
            this.load.image('bet5_1', 'assets/images/chip5_1.png');
            this.load.image('bet10_1', 'assets/images/chip10_1.png');
            this.load.image('bet50_1', 'assets/images/chip50_1.png');
            this.load.image('bet100_1', 'assets/images/chip100_1.png');
            this.load.image('bet500_1', 'assets/images/chip500_1.png');
            this.load.image('clear_bet', 'assets/images/High_Clear.png');
            this.load.image('repeat_bet', 'assets/images/High_Repeat.png');
            this.load.image('replace_null', 'assets/images/replace.png');
        }
        //create function
    create() {
            //initializing keyboard input keys
            this.cursors = this.game.input.keyboard.createCursorKeys();
            //scaling the dimensions of screen
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            //adding background image 
            this.background = this.game.add.sprite(0, 0, 'background');
            //adding 5$ sprite to the game
            this.bet5 = this.game.add.sprite(100, 250, 'bet5');
            this.bet5.scale.setTo(0.13);
            this.bet5.anchor.setTo(0.5);
            this.bet5.inputEnabled = true; //enabling input
            //adding 10$ sprite to the game
            this.bet10 = this.game.add.sprite(200, 250, 'bet10');
            this.bet10.scale.setTo(0.14);
            this.bet10.anchor.setTo(0.5);
            this.bet10.inputEnabled = true; //enabling input
            //adding 50$ sprite to the game
            this.bet50 = this.game.add.sprite(300, 250, 'bet50');
            this.bet50.scale.setTo(0.37);
            this.bet50.anchor.setTo(0.5);
            this.bet50.inputEnabled = true; //enabling input
            //adding 100$ sprite to the game
            this.bet100 = this.game.add.sprite(400, 250, 'bet100');
            this.bet100.scale.setTo(0.34);
            this.bet100.anchor.setTo(0.5);
            this.bet100.inputEnabled = true; //enabling input
            //adding 500$ sprite to the game 
            this.bet500 = this.game.add.sprite(500, 250, 'bet500');
            this.bet500.scale.setTo(0.20);
            this.bet500.anchor.setTo(0.5);
            this.bet500.inputEnabled = true; //enabling input
            //adding clear_bet to the game
            this.clear_betbox = this.game.add.sprite(400, 10, 'clear_bet');
            this.clear_betbox.scale.setTo(0.40);
            // this.clear_betbox.anchor.setTo(0.5);
            this.clear_betbox.inputEnabled = true; //enabling input
            //adding repeat_bet to the game
            this.repeat_betbox = this.game.add.sprite(480, 10, 'repeat_bet');
            this.repeat_betbox.scale.setTo(0.40);
            // this.clear_betbox.anchor.setTo(0.5);
            this.repeat_betbox.inputEnabled = true; //enabling input
            //adding betBox to the game
            this.andarBetBox = this.game.add.sprite(70, 100, 'betBox');
            this.andarBetBox.inputEnabled = true; //enabling input
            //setting up bet value on betbox         
            andarBetTotal = this.game.add.text(120, 125, {
                fill: "#000000", //text color
            });
            andarBetTotal.anchor.setTo(0.5);
            //setting up the baharBetBox         
            this.baharBetBox = this.game.add.sprite(550, 100, 'betBox');
            this.baharBetBox.anchor.setTo(1, 0);
            this.baharBetBox.inputEnabled = true; //enabling input
            //setting up bet value on betbox         
            baharBetTotal = this.game.add.text(500, 125, {
                fill: "#000000",
            });
            baharBetTotal.anchor.setTo(0.5);
            //onclick event for 5$ chip
            this.bet5.input.pixelPerfectClick = true;
            this.bet5.events.onInputDown.add(this.bet_five, this);
            //onclick event for 10$ chip
            this.bet10.input.pixelPerfectClick = true;
            this.bet10.events.onInputDown.add(this.bet_ten, this);
            //onclick event for 50$ chip
            this.bet50.input.pixelPerfectClick = true;
            this.bet50.events.onInputDown.add(this.bet_fifty, this);
            //onclick event for 100$ chip
            this.bet100.input.pixelPerfectClick = true;
            this.bet100.events.onInputDown.add(this.bet_hundred, this);
            //onclick event for 500$ chip
            this.bet500.input.pixelPerfectClick = true;
            this.bet500.events.onInputDown.add(this.bet_five_hun, this);
            //onclick event for baharBetBox 
            this.baharBetBox.input.pixelPerfectClick = true;
            // this.baharBetBox.events.onInputDown.add(baharBetBox_fun, this);
            this.baharBetBox.events.onInputDown.add(function() {
                this.baharBetBox_fun(value);
            }, this);
            //onclick event for andarBetBox
            this.andarBetBox.input.pixelPerfectClick = true;
            // this.andarBetBox.events.onInputDown.add(andarBetBox_fun, this);
            this.andarBetBox.events.onInputDown.add(function() {
                this.andarBetBox_fun(value);
            }, this);
            //onclick event for clearBetBox
            //this.clear_betbox.input.pixelPerfectClick = true;
            this.clear_betbox.events.onInputDown.add(this.clear_betbox_fun, this);
            //onclick event for clearBetBox
            //this.repeat_betbox.input.pixelPerfectClick = true;
            this.repeat_betbox.events.onInputDown.add(this.repeat_betbox_fun, this);
        }
        //update function
    update() {
        //updating andarBetbox with sum of total value
        andarBetTotal.text = "$" + " " + andar_value;
        //updating baharBetBox with sum of total value            
        baharBetTotal.text = "$" + " " + bahar_value;
    }


    //callback function for chip5
    bet_five() {

            chip_movement_bet5 = this.game.add.tween(this.bet5);
            chip_movement_bet5.to({ y: 230 }, 300);
            chip_movement_bet5.start();
            chip_movement_bet5.to({ y: 250 }, 300);
            chip_movement_bet5.start();

            value = 5;
            //value_bhar = 5;

        }
        //callback function for chip10
    bet_ten() {

            chip_movement_bet10 = this.game.add.tween(this.bet10);
            chip_movement_bet10.to({ y: 230 }, 300);
            chip_movement_bet10.start();
            chip_movement_bet10.to({ y: 250 }, 300);

            value = 10;
            //value_bhar = 10;


        }
        //callback function for chip50
    bet_fifty() {

            chip_movement_bet50 = this.game.add.tween(this.bet50);
            chip_movement_bet50.to({ y: 230 }, 300);
            chip_movement_bet50.start();
            chip_movement_bet50.to({ y: 250 }, 300)
            value = 50;
            //value_bhar = 50;



        }
        //callback function for chip100
    bet_hundred() {
            chip_movement_bet100 = this.game.add.tween(this.bet100);
            chip_movement_bet100.to({ y: 230 }, 300);
            chip_movement_bet100.start();
            chip_movement_bet100.to({ y: 250 }, 300)
            value = 100;
            //value_bhar = 100;
        }
        //callback functin for chip500
    bet_five_hun() {

        chip_movement_bet500 = this.game.add.tween(this.bet500);
        chip_movement_bet500.to({ y: 230 }, 300);
        chip_movement_bet500.start();
        chip_movement_bet500.to({ y: 250 }, 300);
        chip_movement_bet500.start();

        value = 500;
        //value_bhar = 500;

    }



    //callback function for andraBetBOx     
    andarBetBox_fun(value) {

            var valueA;

            if (value == null) {

                alert("select any chip value");

            } else {
                repeatA = value;
                if (valueA == null) {
                    valueA = value;
                }
                // this.andarBetBox.inputEnabled = true;

                if (andarCounter > 1) {

                    andar_value = andar_value + valueA;
                    console.log(andar_value);

                } else {

                    let count = andarCounter++;

                    andar_value = count * valueA;

                    console.log(andar_value);
                }
            }


            this.andarBetBox_Icon();
        }
        //callback function for baharBetBox    
    baharBetBox_fun(value) {

        var valueB;

        valueB = value;

        if (value == null) {

            alert("select any chip value");

        } else {
            repeatB = value;
            if (valueB == null) {

                valueB = value;

            }
            // this.baharBetBox.inputEnabled = true;

            if (baharCounter > 1) {

                bahar_value = bahar_value + valueB;
                console.log(bahar_value);

            } else {

                let count = baharCounter++;

                bahar_value = count * valueB;

                console.log(bahar_value);
            }
        }

        this.baharBetBox_Icon();

    }

    andarBetBox_Icon() {

        if (repeatA == 5) {
            andarChipIcon5 = this.game.add.sprite(175, 100, 'bet5_1');
            andarChipIcon5.scale.setTo(0.5);
        } else if (repeatA == 10) {
            andarChipIcon10 = this.game.add.sprite(174, 99, 'bet10_1');
            andarChipIcon10.scale.setTo(0.530);
        } else if (repeatA == 50) {
            andarChipIcon50 = this.game.add.sprite(175, 100, 'bet50_1');
            andarChipIcon50.scale.setTo(0.51);
        } else if (repeatA == 100) {
            andarChipIcon100 = this.game.add.sprite(175, 100, 'bet100_1');
            andarChipIcon100.scale.setTo(0.5);
        } else {
            andarChipIcon500 = this.game.add.sprite(175, 100, 'bet500_1');
            andarChipIcon500.scale.setTo(0.5);
        }

    }

    baharBetBox_Icon() {

        if (repeatB == 5) {
            baharaChipIcon5 = this.game.add.sprite(445, 100, 'bet5_1');
            baharaChipIcon5.anchor.setTo(1, 0);
            baharaChipIcon5.scale.setTo(0.5);
        } else if (repeatB == 10) {
            baharaChipIcon10 = this.game.add.sprite(446, 99, 'bet10_1');
            baharaChipIcon10.anchor.setTo(1, 0);
            baharaChipIcon10.scale.setTo(0.530);

        } else if (repeatB == 50) {
            baharaChipIcon50 = this.game.add.sprite(445, 100, 'bet50_1');
            baharaChipIcon50.anchor.setTo(1, 0);
            baharaChipIcon50.scale.setTo(0.51);

        } else if (repeatB == 100) {
            baharaChipIcon100 = this.game.add.sprite(445, 100, 'bet100_1');
            baharaChipIcon100.anchor.setTo(1, 0);
            baharaChipIcon100.scale.setTo(0.5);
        } else {
            baharaChipIcon500 = this.game.add.sprite(445, 100, 'bet500_1');
            baharaChipIcon500.anchor.setTo(1, 0);
            baharaChipIcon500.scale.setTo(0.5);
        }
    }



    // Clear Function 
    clear_betbox_fun() {


        console.log(value);
        //console.log(value_bhar);
        // game.state.restart();
        // this.game.state.restart(true, false);
        console.log("clear");
        // this.andarBetBox.inputEnabled = true;
        andar_value = 0;
        bahar_value = 0;

        this.andarBetBox_Icon1();
        this.baharBetBox_Icon1();
    }

    andarBetBox_Icon1() {
        if (value == 5) {
            andarChipIcon5 = this.game.add.sprite(175, 100, 'replace_null');
            andarChipIcon5.scale.setTo(0.5);
        } else if (value == 10) {
            andarChipIcon10 = this.game.add.sprite(174, 99, 'replace_null');
            andarChipIcon10.scale.setTo(0.530);
        } else if (value == 50) {
            andarChipIcon50 = this.game.add.sprite(175, 100, 'replace_null');
            andarChipIcon50.scale.setTo(0.51);
        } else if (value == 100) {
            andarChipIcon100 = this.game.add.sprite(175, 100, 'replace_null');
            andarChipIcon100.scale.setTo(0.5);
        } else {
            andarChipIcon500 = this.game.add.sprite(175, 100, 'replace_null');
            andarChipIcon500.scale.setTo(0.5);
        }

    }

    baharBetBox_Icon1() {
        if (value == 5) {
            baharaChipIcon5 = this.game.add.sprite(445, 100, 'replace_null');
            baharaChipIcon5.anchor.setTo(1, 0);
            baharaChipIcon5.scale.setTo(0.5);
        } else if (value == 10) {
            baharaChipIcon10 = this.game.add.sprite(446, 99, 'replace_null');
            baharaChipIcon10.anchor.setTo(1, 0);
            baharaChipIcon10.scale.setTo(0.530);

        } else if (value == 50) {
            baharaChipIcon50 = this.game.add.sprite(445, 100, 'replace_null');
            baharaChipIcon50.anchor.setTo(1, 0);
            baharaChipIcon50.scale.setTo(0.51);

        } else if (value == 100) {
            baharaChipIcon100 = this.game.add.sprite(445, 100, 'replace_null');
            baharaChipIcon100.anchor.setTo(1, 0);
            baharaChipIcon100.scale.setTo(0.5);
        } else {
            baharaChipIcon500 = this.game.add.sprite(445, 100, 'replace_null');
            baharaChipIcon500.anchor.setTo(1, 0);
            baharaChipIcon500.scale.setTo(0.5);
        }
    }


    // Repeat Function 
    repeat_betbox_fun() {

        console.log("Repeat  Bet");

        //callback function for andraBetBOx     
        // this.andarBetBox_fun();
        // this.baharBetBox_fun();

        console.log(repeatA);
        console.log(repeatB);


        console.log(andar_value);
        console.log(bahar_value);


        if (repeatA != 0 && repeatB == 0) {

            andar_value *= 2;



        } else
        if (repeatA == 0 && repeatB != 0) {

            bahar_value *= 2;


        } else {

            andar_value *= 2;
            bahar_value *= 2;


        }
    }


}