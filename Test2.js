const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

// Adjust canvas2 dimensions to match CSS styling
canvas2.width = canvas2.window.innerWidth;
canvas2.height = canvas2.window.innerHeight;

// Example: draw a rectangle
ctx2.fillStyle = "green";
ctx2.fillRect(10, 10, 100, 50);
