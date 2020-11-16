const Game = {
    elements: {
        main: null,
        header: null,
        field: null,
        time: null,
        steps: null,
        time: null,
        burger: null,
        pause: null,
        menu: null,
        newGame: null,
        savedGame: null,
        bestScore: null,
        newSize: null,
        settings: null,
        chooseSize: null,
        setSize: null,
        eye: null,
        lookPicture: null
    },
    properties: {
        size: 16,
        checkPause: false,
        seconds: 0,
        generalTime: ['00', '00'],
        checkTime: false,
        intervalId: null
    },
    cells: {
        cArr: [],
        empty: {
            value: 0,
            top: 0,
            left: 0
        },
        cellSize: 80,
        steps: 0
    },
    init() {
        this.elements.main = document.createElement('div');
        this.elements.main.classList.add('main');

        this.elements.eye = document.createElement('img');
        this.elements.eye.setAttribute('id', 'eye');
        this.elements.eye.setAttribute('src', 'assets/eye.png');

        this.elements.lookPicture = document.createElement('img');
        this.elements.lookPicture.setAttribute('id', 'look-picture');
        this.elements.lookPicture.setAttribute('src', 'assets/picture.jpg');

        this.elements.eye.onmouseover = this.elements.eye.onmouseout = () => {
            this.elements.lookPicture.classList.toggle('zIndex');
        };
        //-----1_Level-----
        this.elements.header = document.createElement('header');
        this.elements.field = document.createElement('div');
        this.elements.field.classList.add('field');
        //-----2_Level-----
        this.elements.time = document.createElement('span');
        this.elements.time.setAttribute('id', 'time');
        this.elements.time.textContent = 'time: 00:00';
        this.elements.steps = document.createElement('span');
        this.elements.steps.setAttribute('id', 'steps');
        this.elements.steps.textContent = 'moves _';
        this.elements.burger = document.createElement('div');
        this.elements.burger.setAttribute('id', 'burger');
        //-----3_Level-----
        this.elements.pause = document.createElement('span');
        this.elements.pause.setAttribute('id', 'pause');
        this.elements.pause.textContent = 'pause game';
        this.elements.menu = document.createElement('div');
        this.elements.menu.setAttribute('id', 'menu');
        //-----4_Level-----
        this.elements.newGame = document.createElement('span');
        this.elements.newGame.setAttribute('id', 'new-game');
        this.elements.newGame.textContent = 'new game';
        this.elements.savedGame = document.createElement('span');
        this.elements.savedGame.setAttribute('id', 'saved-game');
        this.elements.savedGame.textContent = 'saved game';
        this.elements.bestScore = document.createElement('span');
        this.elements.bestScore.setAttribute('id', 'best-score');
        this.elements.bestScore.textContent = 'best score';
        this.elements.newSize = document.createElement('span');
        this.elements.newSize.setAttribute('id', 'new-size');
        this.elements.newSize.textContent = 'new size';
        this.elements.settings = document.createElement('span');
        this.elements.settings.setAttribute('id', 'settings');
        this.elements.settings.textContent = 'settings';

        document.body.append(this.elements.eye);
        this.elements.main.append(this.elements.lookPicture);
        //-----1_Level-set-up-----
        document.body.append(this.elements.main);
        this.elements.main.append(this.elements.header);
        this.elements.main.append(this.elements.field);
        this.draw();
        //-----2_Level-set-up-----
        this.elements.header.append(this.elements.time);
        this.elements.header.append(this.elements.steps);
        this.elements.header.append(this.elements.burger);
        //-----3_Level-set-up-----
        this.elements.burger.append(this.elements.pause);
        this.elements.burger.append(this.elements.menu);
        //-----4_Level-set-up-----
        this.elements.menu.append(this.elements.newGame);
        this.elements.menu.append(this.elements.savedGame);
        this.elements.menu.append(this.elements.bestScore);
        this.elements.menu.append(this.elements.newSize);
        this.elements.menu.append(this.elements.settings);

        let pauseBtn = document.getElementById('pause'),
            menuBtn = document.getElementById('menu'),
            newGameBtn = document.getElementById('new-game'),
            sizeBtn = document.getElementById('new-size');

        pauseBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('flex');
            this.properties.checkPause = this.properties.checkPause === true ? false : true;
            pauseBtn.textContent = this.properties.checkPause ? 'resume game' : 'pause game';
        });

        newGameBtn.onclick = () => {
            this.newGame();
        };

        sizeBtn.addEventListener('click', () => {
            sizeBtn.textContent = '';
            this.elements.chooseSize = document.createElement('input');
            this.elements.chooseSize.setAttribute('id', 'choose-size');
            this.elements.setSize = document.createElement('button');
            this.elements.setSize.setAttribute('id', 'button-size');
            this.elements.setSize.innerHTML = `&#10004;`;
            sizeBtn.append(this.elements.chooseSize);
            sizeBtn.append(this.elements.setSize);

            this.elements.chooseSize.focus();

            this.elements.setSize.onclick = function() {
                console.log(Game.elements.chooseSize.value);
                if ([3, 4, 5, 6, 7, 8].includes(+Game.elements.chooseSize.value, 0)) {
                    Game.properties.size = Math.pow(Game.elements.chooseSize.value, 2);

                    menuBtn.classList.toggle('flex');
                    Game.properties.checkPause = Game.properties.checkPause === true ? false : true;
                    pauseBtn.textContent = Game.properties.checkPause ? 'resume game' : 'pause game';
                    Game.newGame();
                } else {
                    alert('Введите число от 3 до 8!');
                }
            };

        });

    },
    draw() {
        this.cells.cellSize = 320 / Math.pow(this.properties.size, 1 / 2);
        for (let i = 0; i < this.cells.cArr.length; i++) {
            this.cells.cArr.pop();
            i--;
        }
        this.cells.cArr.push(this.cells.empty);

        // --------------Sort---------------
        const numbers = [...Array(this.properties.size - 1).keys()]
            .sort(() => Math.random() - 0.5);
        //----------------------------------

        for (let i = 1; i <= this.properties.size - 1; i++) {
            const cell = document.createElement('div');
            const value = numbers[i - 1] + 1;
            cell.className = 'cell';
            cell.innerHTML = value;

            // cell.style.backgroundImage = 'url(assets/picture.jpg)';
            cell.style.width = `${320 / Math.pow(this.properties.size, 1 / 2)}px`;
            cell.style.height = `${320 / Math.pow(this.properties.size, 1 / 2)}px`;

            const left = i % Math.pow(this.properties.size, 1 / 2);
            const top = (i - left) / Math.pow(this.properties.size, 1 / 2);

            this.cells.cArr.push({
                value: value,
                left: left,
                top: top,
                element: cell
            });

            cell.style.left = `${left * this.cells.cellSize}px`;
            cell.style.top = `${top * this.cells.cellSize}px`;

            cell.style.backgroundPosition = `${cell.innerHTML * (-this.cells.cellSize) - 320}px ${Math.floor((cell.innerHTML) / Math.pow(this.properties.size, 1/2)) * -this.cells.cellSize}px`;
            this.elements.field.append(cell);

            // cell.onmousedown = function(event) { // (1) отследить нажатие

            //     cell.style.zIndex = 1000;
            //     // переместим в body, чтобы мяч был точно не внутри position:relative
            //     // и установим абсолютно спозиционированный мяч под курсор

            //     moveAt(event.pageY, top);

            //     // передвинуть мяч под координаты курсора
            //     // и сдвинуть на половину ширины/высоты для центрирования
            //     function moveAt(pageX, pageY) {
            //         cell.style.left = pageX + cell.offsetWidth + 'px';
            //         cell.style.top = pageY + 'px';
            //     }

            //     function onMouseMove(event) {
            //         moveAt(event.pageX, event.pageY);
            //     }

            //     // (3) перемещать по экрану
            //     document.addEventListener('mousemove', onMouseMove);

            //     // (4) положить мяч, удалить более ненужные обработчики событий
            //     cell.onmouseup = function() {
            //         document.removeEventListener('mousemove', onMouseMove);
            //         cell.onmouseup = null;
            //     };

            // };
            // cell.ondragstart = function() {
            //     return false;
            //   };
            cell.addEventListener('click', () => {
                this.move(i);
            });
        }
    },
    move(index) {
        if (!this.properties.checkTime) {
            this.countTime();
            this.properties.checkTime = true;
        }

        const cell = this.cells.cArr[index];
        const leftDiff = Math.abs(this.cells.empty.left - cell.left);
        const topDiff = Math.abs(this.cells.empty.top - cell.top);

        if (leftDiff + topDiff > 1) {
            return;
        }

        this.sound();

        cell.element.style.left = `${this.cells.empty.left * this.cells.cellSize}px`;
        cell.element.style.top = `${this.cells.empty.top * this.cells.cellSize}px`;

        const emptyLeft = this.cells.empty.left;
        const emptyTop = this.cells.empty.top;
        this.cells.empty.left = cell.left;
        this.cells.empty.top = cell.top;
        cell.left = emptyLeft;
        cell.top = emptyTop;

        // countSteps
        this.countSteps();

        //----Check Win-----
        const isFinished = this.cells.cArr.every(cell => {
            return cell.value === (cell.top * Math.pow(this.properties.size, 1 / 2) + cell.left);
        });

        if (isFinished) {
            alert(`Ура, вы решили головоломку за ${this.properties.generalTime.join(':')} и ${this.cells.steps} ходов`);
        }
        //------------------
    },
    countSteps() {
        this.cells.steps++;
        this.elements.steps.textContent = `moves: ${this.cells.steps}`;
    },
    newGame() {
        document.querySelectorAll('.cell').forEach((item) => {
            item.remove();
        });

        // Building again
        Game.cells.empty.left = 0;
        Game.cells.empty.top = 0;
        Game.draw();
        document.getElementById('menu').classList.remove('flex');
        document.getElementById('pause').textContent = 'pause game';
        Game.properties.checkPause = false;
        // Change moves & time
        Game.cells.steps = 0;
        document.getElementById('steps').textContent = `moves: 0`;
        Game.properties.generalTime = ['00', '00'];
        document.getElementById('time').textContent = `time: ${Game.properties.generalTime.join(':')}`;
        Game.properties.seconds = 0;
    },
    sound() {
        let sound = new Audio;
        sound.src = "assets/sound.mp3";
        sound.play();
    },
    countTime() {
        let time = this.properties.generalTime;

        this.properties.intervalId = setInterval(() => {
            if (!this.properties.checkPause) {
                this.properties.seconds++;

                if (this.properties.seconds < 10) {
                    this.properties.generalTime[1] = `0${this.properties.seconds}`;
                } else if (10 <= this.properties.seconds && this.properties.seconds < 60) {
                    this.properties.generalTime[1] = this.properties.seconds;
                } else if (this.properties.seconds >= 60) {
                    this.properties.generalTime[0] = Math.round(this.properties.seconds / 60);
                    this.properties.generalTime[1] = this.properties.seconds % 60;
                    if (this.properties.generalTime[0] < 10) {
                        this.properties.generalTime[0] = `0${Math.round(this.properties.seconds / 60)}`;
                    }
                    if (this.properties.generalTime[1] < 10) {
                        time[1] = `0${this.properties.seconds % 60}`;
                    }
                }

                document.getElementById('time').textContent = `time: ${this.properties.generalTime.join(':')}`;
            }
            console.log(this.properties.seconds);
            console.log(this.properties.generalTime);
        }, 1000);
        document.getElementById('pause').onclick = () => {
            console.log(this.properties.seconds);
        }
    }


};

window.addEventListener('DOMContentLoaded', () => {
    Game.init();
    // Game.countTime();
})