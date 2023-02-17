//This JavaScript game engine is based on the work of "danielstuts" and "The Coding Train" (and also the Mozilla Developer Network documentation).
//The playlists I used :
//"danielstuts" playlist : https://youtube.com/playlist?list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_
//"The Coding Train" playlist : https://youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM

const canvas = document.getElementById("canvas");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
canvas_width  = canvas.width;
canvas_height = canvas.height;

const ballArray = [];

if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    class Vector {
        constructor(x,y){
            this.x = x;
            this.y = y;
        }

        add(vector){
            return new Vector(this.x + vector.x, this.y + vector.y);
        }

        sub(vector){
            return new Vector(this.x - vector.x, this.y - vector.y);
        }
        
        //  Scalar-Multiplication
        scale(scalar){
            return new Vector(this.x * scalar, this.y * scalar);
        }

        mag(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        
        //  Normalize // Optional Scalar-Multiplication
        normalize(scalar = 1){
            return new Vector(this.x / this.mag()  * scalar, this.y / this.mag() * scalar);
        }

        draw_vector_from(vector_start, color="black"){
            ctx.beginPath();
            ctx.moveTo(vector_start.x, vector_start.y);
            ctx.lineTo(vector_start.x + this.x, vector_start.y + this.y);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        draw_vector_to(vector_end, color="black"){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + vector_end.x, this.y + vector_end.y);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    function draw_vector_from_to(vector_start, vector_end, color="black"){
        ctx.beginPath();
        ctx.moveTo(vector_start.x, vector_start.y);
        ctx.lineTo(vector_end.x, vector_end.y);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    class Ball {
        constructor(x,y,r){
            this.r = r;
            this.position     = new Vector(x, y);
            this.velocity     = new Vector(0, 0);
            this.acceleration = new Vector(0, 0);
            this.color = "#669999";
            this.selected = false;
            ballArray.push(this);
        }

        draw(){
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        move(){
            this.position = this.position.add(this.velocity);
        }
    }

    let vector_mouse = new Vector(0,0);
    document.addEventListener("mousemove", function(event){
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        return vector_mouse = new Vector(mouseX, mouseY);
    });

    function random(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function create_ball_array(n, corner=200){
        for(let i=0 ; i < n ; i++){
            new Ball(random(corner , canvas_width - corner), corner, random(20, 80));
            //corner = distance from top left and right border
        }
    }
    create_ball_array(10);

    let index = 0; //for case "b"
    let previous_index = ballArray.length -1;
    let UP = false; DOWN = false; LEFT = false; RIGHT = false;

    window.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "ArrowUp":
                UP = true;
            break;
            case "ArrowDown":
                DOWN = true;
            break;
            case "ArrowLeft":
                LEFT = true;
            break;
            case "ArrowRight":
                RIGHT = true;
            break;

            case "b":
                console.log(event.key);

                if (index === ballArray.length) {
                    index = 0;
                    previous_index = ballArray.length - 1;
                }
                ballArray[index].color = "#5f4761";
                ballArray[index].selected = true;
                ballArray[previous_index].color = "#669999";
                ballArray[previous_index].selected = false;
                previous_index = index;
                index ++;
            break;
            default: return;
        }
        event.preventDefault();
    }, true);
   
    window.addEventListener("keyup", (event) => {
        if (event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "ArrowUp":
                UP = false;
            break;
            case "ArrowDown":
                DOWN = false;
            break;
            case "ArrowLeft":
                LEFT = false;
            break;
            case "ArrowRight":
                RIGHT = false;
            break;
            default: return;
        }
        event.preventDefault();
    }, true);

    //radar for visualizing vectors
    let radar_position = new Vector(canvas_width - 100, canvas_height- 100);
    let magnitude_radar = 50;
    function draw_radar(){  
        ctx.beginPath();
        ctx.arc(radar_position.x, radar_position.y, magnitude_radar, 0, 2 * Math.PI);
        ctx.strokeStyle = "purple";
        ctx.stroke();
    }

    //____Main-Loop____\\
    function mainLoop() {
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        for (let A of ballArray){
             
            if (A.selected){

                if(UP){
                    A.velocity.y = -1;
                }
                if(DOWN){
                    A.velocity.y =  1;
                }
                if(LEFT){
                    A.velocity.x = -1;
                }
                if(RIGHT){
                    A.velocity.x =  1;
                }
                if(!UP && !DOWN){
                    A.velocity.y =  0;
                }
                if(!LEFT && !RIGHT){
                    A.velocity.x = 0;
                }
            }
            draw_radar();
            A.draw();
            A.move();            
        }

        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);

} else {
    console.log("canvas-unsupported");
}