let bugs = new Array(9)
let nr = new Array(8)
let rij = 0
let kol = 0
let test = 0
let cnv;

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
}
function windowResized() {
    centerCanvas();
}
function setup() {
    cnv = createCanvas(450, 450);
    centerCanvas();
    cnv.style('margin-top', ' 70px');
    background(0)
    for (rij = 1; rij!== bugs.length; rij++) {
        nr[rij] = [];
        bugs[rij] = [];
        test = 0
        for (kol = 50; kol !== 450; kol +=50) {
            let randomGetal = Math.floor(Math.random() * 4) + 1
            nr[rij].push(randomGetal)
            if(nr[rij][test] == 1) {
                bugs[rij].push(new Blauw())
            }else if(nr[rij][test] == 2){
                bugs[rij].push(new Rood())
            }else if(nr[rij][test] == 3){
                bugs[rij].push(new Groen())
            }else if(nr[rij][test] == 4){
                bugs[rij].push(new Geel())
            }
            test +=1
        }
    }
    bugs.shift()
    nr.shift()
    removeChains(nr)
}
function draw() {
    console.log(nr)
    rij = 1
    for (var i=0; i !== bugs.length; i++) {
        kol = 50
        for(var j=0; j !== bugs[i].length; j++){
            if(nr[i][j] == 1 || nr[i][j] == 2 || nr[i][j] == 3 || nr[i][j] == 4){
                if(nr[i][j] == 1) {
                    bugs[i][j] = (new Blauw())
                }else if(nr[i][j] == 2){
                    bugs[i][j] = (new Rood())
                }else if(nr[i][j] == 3){
                    bugs[i][j] = (new Groen())
                }else if(nr[i][j] == 4){
                    bugs[i][j] = (new Geel())
                }
                bugs[i][j].display();
            }else if(nr[i][j] == ""){
                let randomGetal = Math.floor(Math.random() * 4) + 1
                nr[i][j] = (randomGetal)
                if(nr[i][j] == 1) {
                    bugs[i][j] =(new Blauw())
                }else if(nr[i][j] == 2){
                    bugs[i][j] =(new Rood())
                }else if(nr[i][j] == 3){
                    bugs[i][j] =(new Groen())
                }else if(nr[i][j] == 4){
                    bugs[i][j] = (new Geel())
                }
            }
            kol += 50
        }
        rij += 1
    }
    console.log(bugs)
}
function Blauw() {
    this.x = kol;
    this.y = rij * 50;
    this.diameter = (50, 50);


    this.display = function() {
        fill("blue")
        ellipse(this.x, this.y, this.diameter);
    };
}
function Geel() {
    this.x = kol;
    this.y = rij * 50;
    this.diameter = (50, 50);


    this.display = function() {
        fill("yellow")
        ellipse(this.x, this.y, this.diameter);
    };
}
function Rood() {
    this.x = kol;
    this.y = rij * 50;
    this.diameter = (50, 50);

    this.display = function() {
        fill("red")
        ellipse(this.x, this.y, this.diameter);

    };
}

function Groen() {
    this.x = kol;
    this.y = rij * 50;
    this.diameter = (50, 50);


    this.display = function() {
        fill("green")
        ellipse(this.x, this.y, this.diameter);
    };
}
function width1(grid){
    return grid.length;
}

function height1(grid){
    return grid.length;
}

function swap(grid, p, q){
    let blokp = grid[p.y][p.x];
    let blokq = grid[q.y][q.x];
    grid[p.y][p.x]= blokq;
    grid[q.y][q.x]= blokp;
}

function horizontalChainAt(grid, position){
    let kleur = grid[position.y][position.x];
    let aantal = 0;

    for (let i=position.x; i<width1(grid); i++) {

        if (grid[position.y][i] === kleur) {
            aantal++;
        } else {
            break;
        }
    }

    for (let i=position.x; i>=0; i--) {
        if (grid[position.y][i] === kleur) {
            aantal++;
        } else {
            break;
        }
    }
    return aantal-1;
}

function verticalChainAt(grid, position){
    let kleur = grid[position.y][position.x];
    let aantal = 0;

    for (let i=position.y; i<height1(grid); i++) {
        if (grid[i][position.x] === kleur) {
            aantal++;

        } else {
            break;
        }
    }

    for (let i=position.y; i>=0; i--) {
        if (grid[i][position.x] === kleur) {
            aantal++;
        } else {
            break;
        }
    }
    return aantal-1;
}

function removeChains(grid) {
    console.log("test")
    const positions = [];
    const result = {};
    const w = width1(grid);
    const h = height1(grid);
    for (let y = 0; y !== h; ++y) {
        let x = 0;
        while (x < w) {
            const n = horizontalChainAt(grid, { x, y });
            if (n > 2) {
                for (let i = 0; i !== n; ++i) {
                    positions.push({ x: x + i, y });
                }
            }
            x += n;
        }
    }
    for (let x = 0; x !== w; ++x) {
        let y = 0;
        while (y < h) {
            const n = verticalChainAt(grid, { x, y });
            if (n > 2) {

                for (let i = 0; i !== n; ++i) {
                    positions.push({ x, y: y + i });
                }
            }
            y += n;
        }
    }
    for (const position of positions) {
        const { x, y } = position;
        const color = grid[y][x];
        result[color] = (result[color] || 0) + 1;
    }
    for (const { x, y } of positions) {
        grid[y][x] = '';
    }
    collapse(nr)
}


function collapse(grid){
    for (let a = 1; a < grid.length; a++){
        for (let i = 1; i < grid.length; i++){
            for (let j = 0; j < grid[0].length; j++){
                if(nr[i][j] == ""){
                    let p = {x: j, y: i};
                    let q = {x: j, y: i - 1};
                    swap(grid, p, q);
                }
            }
        }
    }
    draw()
}
if (mouseX > bx-boxSize && mouseX < bx+boxSize &&
    mouseY > by-boxSize && mouseY < by+boxSize) {
    overBox = true;
    if(!locked) {
        stroke(255);
        fill(244,122,158);
    }
}
