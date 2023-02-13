//This JavaScript game engine is based on the work of "danielstuts" and "The Coding Train" (and also the Mozilla Developer Network documentation).
//The playlists I used :
//"danielstuts" playlist : https://youtube.com/playlist?list=PLo6lBZn6hgca1T7cNZXpiq4q395ljbEI_
//"The Coding Train" playlist : https://youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM

let canvas_width = 800;
let canvas_height = 800;

const canvas = document.getElementById("canvas");

if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

} else {
    console.log("canvas-unsupported");
}