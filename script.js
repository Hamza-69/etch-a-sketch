let containercolor = document.querySelector(".container-color");
let makeGrid = (n) => {
    let opacity = 0;
    containercolor.innerHTML = "";
    if (n > 100 || n <= 0) {
        alert("Invalid Value!! Make sure that n is at most 100!");
        n = prompt("Enter new number of squares ( 0<n<=100)");
    }
    for (let i =0; i<n; i++) 
        for (let j=0;j<n;j++) {
            let box = document.createElement("div");
            box.style.width = 720/n + "px";
            box.style.height = 720/n + "px";
            containercolor.appendChild(box);
        }
    containercolor.innerHTML += "<div class=\"left-border\"></div>\n<div class=\"right-border\"></div>"
    let boxes = document.querySelectorAll(".container-color div")
    boxes.forEach( item => {
        item.addEventListener("mousedown", () => {
            isMouseDown = true;
            color(item);
        });
        item.addEventListener("mouseover", () => {
            if (isMouseDown) color(item);
        });
        item.addEventListener("mouseup", () => {
            isMouseDown = false; 
        });
    })
    };
makeGrid(16);
