let container = document.querySelector(".container-color");
let makeGrid = (n) => {
    let opacity = 0;
    container.innerHTML = "";
    if (n > 100 || n <= 0) {
        alert("Invalid Value!! Make sure that n is at most 100!");
        n = prompt("Enter new number of squares ( 0<n<=100)");
    }
    for (let i =0; i<n; i++) 
        for (let j=0;j<n;j++) {
            let box = document.createElement("div");
            box.style.width = 720/n + "px";
            box.style.height = 720/n + "px";
            container.appendChild(box);
        }
    container.innerHTML += "<div class=\"left-border\"></div>\n<div class=\"right-border\"></div>"
    let boxes = document.querySelectorAll(".container-color div")
    boxes.forEach( item => {
        item.addEventListener("mouseenter", () => {
            let red = Math.floor(Math.random()*256), green = Math.floor(Math.random()*256), blue = Math.floor(Math.random()*256);
            item.style.backgroundColor = `rgba(${red}, ${blue}, ${green}, ${(opacity < 100? opacity+=10: opacity=10)/100})`
        });
    })
    };
makeGrid(16);
let button = document.querySelector("button");
button.addEventListener("click", () => {
    makeGrid(prompt("Enter new number of squares ( 0<n<=100)"))
})
