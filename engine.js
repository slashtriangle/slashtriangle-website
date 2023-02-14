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

} else {
    console.log("canvas-unsupported");
}