let container = document.querySelector(".container");
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
            box.style.width = 960/n + "px";
            box.style.height = 960/n + "px";
            container.appendChild(box);
        }
    let boxes = document.querySelectorAll(".container div")
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
