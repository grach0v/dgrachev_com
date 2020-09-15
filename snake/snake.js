function checkSupported() {
    canvas_1 = document.getElementById('canvas_1');
    canvas_2 = document.getElementById('canvas_2');
    canvas_3 = document.getElementById('canvas_3');
    canvas_4 = document.getElementById('canvas_4');
    
    ctx_1 = canvas_1.getContext('2d');
    ctx_2 = canvas_2.getContext('2d');
    ctx_3 = canvas_3.getContext('2d');
    ctx_4 = canvas_4.getContext('2d');
    // Canvas is supported
    this.gridSize = 20;
    this.direction = 'right1';
    this.snakeBody = [[gridSize, gridSize, gridSize, gridSize]];
    this.appleDot = [1*gridSize, 2*gridSize, 3*gridSize, 4*gridSize]
    this.score = 0

    function randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    function res (a, b){
        if (a >= 0){
            return a % b;
        }
        else {
            return b - (-a % b)
        }
    }

    function drawSnake (){
        ctx_1.fillStyle = "rgb(0,0,0)";  
        ctx_2.fillStyle = "rgb(0,0,0)";  
        ctx_3.fillStyle = "rgb(0,0,0)";  
        ctx_4.fillStyle = "rgb(0,0,0)";  

        snakeBody.map ((dot) => {
            ctx_1.fillRect (dot[0], dot[1], gridSize, gridSize)
            ctx_2.fillRect (dot[2], dot[1], gridSize, gridSize)
            ctx_3.fillRect (dot[0], dot[3], gridSize, gridSize)
            ctx_4.fillRect (dot[2], dot[3], gridSize, gridSize)
        })
    }

    function drawFood (){        
        ctx_1.fillStyle = "rgb(100,10,0)";
        ctx_2.fillStyle = "rgb(100,10,0)";
        ctx_3.fillStyle = "rgb(100,10,0)";
        ctx_4.fillStyle = "rgb(100,10,0)";

        ctx_1.fillRect(appleDot[0], appleDot[1], gridSize, gridSize);
        ctx_2.fillRect(appleDot[2], appleDot[1], gridSize, gridSize);
        ctx_3.fillRect(appleDot[0], appleDot[3], gridSize, gridSize);
        ctx_4.fillRect(appleDot[2], appleDot[3], gridSize, gridSize);
    }
    
    function addHead (){
        head = snakeBody [snakeBody.length - 1]
        switch(this.direction){
            case 'up1':
                snakeBody.push ([head[0], res (head[1] - gridSize, canvas_1.height), head[2], head[3]])
                break;

            case 'down1':
                snakeBody.push ([head[0], res (head[1] + gridSize, canvas_1.height), head[2], head[3]])
                break;

            case 'left1':
                snakeBody.push ([res (head[0] - gridSize, canvas_1.width), head[1], head[2], head[3]])
                break;
            
            case 'right1':
                snakeBody.push ([res (head[0] + gridSize, canvas_1.width), head[1], head[2], head[3]])
                break;

            case 'up2':
                snakeBody.push ([head[0], head[1], head[2], res (head[3] - gridSize, canvas_1.height)])
                break;

            case 'down2':
                snakeBody.push ([head[0], head[1], head[2], res (head[3] + gridSize, canvas_1.height)])
                break;

            case 'left2':
                snakeBody.push ([head[0], head[1], res (head[2] - gridSize, canvas_1.width), head[3]])
                break;
            
            case 'right2':
                snakeBody.push ([head[0], head[1], res (head[2] + gridSize, canvas_1.width), head[3]])
                break;
        }
    }

    function checkApple (){
        value = true
        snakeBody.map ((dot, i) => {
            if (dot[0] === appleDot[0] && dot[1] === appleDot[1] && dot[2] === appleDot[2] && dot[3] === appleDot[3]) {
                value = false;
            }
        })
        return value;
    }

    function newApple (){
        appleDot = [
            randomInteger(0, canvas_1.width/gridSize - 1)*gridSize, 
            randomInteger(0, canvas_1.height/gridSize - 1)*gridSize, 
            randomInteger(0, canvas_1.height/gridSize - 1)*gridSize,
            randomInteger(0, canvas_1.height/gridSize - 1)*gridSize];
        if (!checkApple()){
            newApple ();
        }
    }

    function removeEnd (){
        if (checkApple ()) {
            snakeBody.shift ();
        }
        else {            
            newApple ();
            score = score + 1;
        }
            
    }

    function isOverlap (){
        value = false;
        head = snakeBody.pop();
        snakeBody.map ((dot) => {
            if (dot[0] === head[0] && dot[1] === head[1] && dot[2] === head[2] && dot[3] === head[3]){
                value = true;
            }
        })
        snakeBody.push (head);
        return value;
    }

    function main (){
        ctx_1.clearRect (0, 0, canvas_1.width, canvas_1.height);
        ctx_2.clearRect (0, 0, canvas_2.width, canvas_2.height);
        ctx_3.clearRect (0, 0, canvas_3.width, canvas_3.height);
        ctx_4.clearRect (0, 0, canvas_4.width, canvas_4.height);
        addHead ();
        removeEnd ();
        drawFood ();
        drawSnake ();
        if (isOverlap()){
            alert ("Game Over. Score:" + score);
            this.direction = 'right1';
            this.snakeBody = [[gridSize, gridSize, gridSize, gridSize]];
            this.appleDot = [1*gridSize, 2*gridSize, 3*gridSize, 4*gridSize]
            this.score = 0
        }
    }

    setInterval (main, 100)
    
    document.onkeydown = function(event) {
        var keyCode;
        
        if(event == null)
        {
            keyCode = window.event.keyCode;
        }
        else
        {
            keyCode = event.keyCode;
        }

        switch(keyCode)
        {
            case 37:    
            if (direction !== 'right2') {
                direction = 'left2';
            }
            break;
        
            case 38:
            if (direction !== 'down2') {
                direction = 'up2';
            }
            break;
    
            case 39:
            if (direction !== 'left2'){
                direction = 'right2';
            }
            break;
    
            case 40:
            if (direction !== 'up2'){
                direction = 'down2';
            }                
            break;
//
            case 65:    
            if (direction !== 'right1') {
                direction = 'left1';
            }
            break;
        
            case 87:
            if (direction !== 'down1') {
                direction = 'up1';
            }
            break;
    
            case 68:
            if (direction !== 'left1'){
                direction = 'right1';
            }
            break;
    
            case 83:
            if (direction !== 'up1'){
                direction = 'down1';
            }                
            break;
        
            default:
            break;
        }
        console.log (direction)
    }

}
