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
            this.velocity     = new Vector(0, 1);
            this.acceleration = new Vector(0, 0);
      
            ballArray.push(this);
        }

        draw(){
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.fillStyle = "#669999";
            ctx.fill();
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
            //corner distance from top left and right border
        }
    }
    create_ball_array(10);

    //____Main-Loop____\\
    function mainLoop() {
        ctx.clearRect(0, 0, canvas_width, canvas_height);

        for (let ball of ballArray){
            ball.draw();
        }

        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);

} else {
    console.log("canvas-unsupported");
}