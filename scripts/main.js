function Game(context, cellSize) {
    let arr = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ];
    let clicks = 0;

    this.getClicks = function() {
        return clicks;
    };
    let elements = {
        main: null,
        header: null,
        time: null,
        menu: {
            burger: null,
            menuActive: {
                menuActiveExit: null,
                newGame: null,
                saveGame: null,
                bestScore: null
            }
        },
        pause: null,
        canvas: null
    }

    this.init = function() {
        elements.main = document.createElement('div');
        elements.main.setAttribute('id', 'main');

        elements.header = document.createElement('header');
        elements.canvas = document.createElement('canvas');

        elements.time = document.createElement('span');
        elements.time.setAttribute('id', 'time');
        elements.time.textContent = 'time';

        elements.menu = document.createElement('div');
        elements.menu.burger = document.createElement('span');
        elements.menu.burger.setAttribute('id', 'burger');
        elements.menu.burger.textContent = 'menu';

        elements.menu.menuActive = document.createElement('div');
        elements.menu.menuActive.setAttribute('id', 'menu-active');

        elements.menu.menuActive.menuActiveExit = document.createElement('span');
        elements.menu.menuActive.newGame = document.createElement('span');
        elements.menu.menuActive.saveGame = document.createElement('span');
        elements.menu.menuActive.bestScore = document.createElement('span');

        elements.menu.menuActive.menuActiveExit.textContent = 'close';
        elements.menu.menuActive.menuActiveExit.setAttribute('id', 'close');
        elements.menu.menuActive.newGame.textContent = 'New Game';
        elements.menu.menuActive.newGame.setAttribute('id', 'new-game');
        elements.menu.menuActive.saveGame.textContent = 'Save Game';
        elements.menu.menuActive.bestScore.textContent = 'Best Score';

        elements.pause = document.createElement('span');
        elements.pause.setAttribute('id', 'pause');
        elements.pause.textContent = 'pause';

        elements.canvas.setAttribute('id', 'canvas');

        document.body.appendChild(elements.main);
        elements.main.appendChild(elements.header);
        elements.main.appendChild(elements.canvas);
        elements.header.appendChild(elements.time);
        elements.header.appendChild(elements.menu);
        elements.menu.appendChild(elements.menu.burger);
        elements.menu.appendChild(elements.menu.menuActive);
        elements.menu.menuActive.appendChild(elements.menu.menuActive.menuActiveExit);
        elements.menu.menuActive.appendChild(elements.menu.menuActive.newGame);
        elements.menu.menuActive.appendChild(elements.menu.menuActive.saveGame);
        elements.menu.menuActive.appendChild(elements.menu.menuActive.bestScore);
        elements.header.appendChild(elements.pause);
    }

    this.menu = function() {
        let burger = document.getElementById('burger');
        let menuActive = document.getElementById('menu-active');
        let close = document.getElementById('close');
        burger.onclick = () => {
            burger.style.display = 'none';
            menuActive.style.display = 'flex';
        };

        close.onclick = () => {
            burger.style.display = 'block';
            menuActive.style.display = 'none';
        }
    }
    this.newGame = function() {
        let button = document.getElementById('new-game');
        let burger = document.getElementById('burger');
        let menuActive = document.getElementById('menu-active');
        button.onclick = function() {
            burger.style.display = 'block';
            menuActive.style.display = 'none';
            let game = new Game();
            game.move();
            game.mix();
        }
    }

    function cellView(x, y) {
        context.fillStyle = "#FFB93B";
        context.fillRect(
            x + 1,
            y + 1,
            cellSize - 2,
            cellSize - 2
        );
    }

    function numView() {
        context.font = "bold " +
            (cellSize / 2) + "px Sans";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#222";
    }

    this.getNullCell = function() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (arr[j][i] === 0) {
                    return { 'x': i, 'y': j };
                }
            }
        }
    }

    this.draw = function() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (arr[i][j] > 0) {
                    cellView(
                        j * cellSize,
                        i * cellSize
                    );
                    numView();
                    context.fillText(
                        arr[i][j],
                        j * cellSize + cellSize / 2,
                        i * cellSize + cellSize / 2
                    );
                }
            }
        }
    };

    this.move = function(x, y) {
        let nullX = this.getNullCell().x;
        let nullY = this.getNullCell().y;
        if (
            ((x - 1 == nullX || x + 1 == nullX) && y == nullY) ||
            ((y - 1 == nullY || y + 1 == nullY) && x == nullX)
        ) {
            arr[nullY][nullX] = arr[y][x];
            arr[y][x] = 0;
            clicks++;
        }
    };

    this.victory = function() {
        let e = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 0]
        ];
        let res = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (e[i][j] != arr[i][j]) {
                    res = false;
                }
            }
        }
        return res;
    };

    function getRandomBool() {
        if (Math.floor(Math.random() * 2) === 0) {
            return true;
        }
    }

    this.mix = function(stepCount) {
        console.log(stepCount);
        let x, y;
        for (let i = 0; i < stepCount; i++) {
            let nullX = this.getNullCell().x;
            let nullY = this.getNullCell().y;
            let hMove = getRandomBool();
            let upLeft = getRandomBool();
            if (!hMove && !upLeft) {
                y = nullY;
                x = nullX - 1;
            }
            if (hMove && !upLeft) {
                x = nullX;
                y = nullY + 1;
            }
            if (!hMove && upLeft) {
                y = nullY;
                x = nullX + 1;
            }
            if (hMove && upLeft) {
                x = nullX;
                y = nullY - 1;
            }
            if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
                this.move(x, y);
            }
        }
        clicks = 0;
    };

    this.getClicks = function() {
        return clicks;
    };
}



window.onload = function() {
    let gameInit = new Game();
    gameInit.init();

    let canvas = document.getElementById("canvas");
    canvas.width = 320;
    canvas.height = 320;
    let cellSize = canvas.width / 4;
    let context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);

    let game = new Game(context, cellSize);
    game.mix(300);
    game.draw();
    game.menu();

    // new game
    let newGame = document.getElementById('new-game');
    let burger = document.getElementById('burger');
    let menuActive = document.getElementById('menu-active');
    newGame.onclick = function() {
            burger.style.display = 'block';
            menuActive.style.display = 'none';
            // let game = new Game();
            // game.move();
            // game.mix();
            game.mix();
            game.draw();
            game.move();
        }
        //

    canvas.onclick = function(e) {
        let x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
        let y = (e.pageY - canvas.offsetTop) / cellSize | 0;
        console.log(e.pageY, canvas.offsetTop);
        event(x, y);
    };

    canvas.ontouchend = function(e) {
        let x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
        let y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;

        event(x, y);
    };

    function event(x, y) {
        game.move(x, y);
        context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw();
        if (game.victory()) {
            alert("Собрано за " + game.getClicks() + " касание!");
            game.mix(300);
            context.fillRect(0, 0, canvas.width, canvas.height);
            game.draw(context, cellSize);
        }
    }
}