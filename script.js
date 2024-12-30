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
      let isMouseDown;
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
let containertools = document.querySelector(".container-tools");
const images = {
    "save-image.png": () => {
      console.log("Save image action triggered");
      // Add logic to save the image
    },
    "back.png": () => {
      console.log("Back action triggered");
      // Add logic for the "back" action
    },
    "mirror.png": () => {
        console.log("Mirror action triggered");
        // Add logic for "Mirror"
      },
    "choose-trans.png": () => {
      console.log("Choose transparent action triggered");
      // Add logic for "Choose Transparent"
    },
    "vari-trans.png": () => {
      console.log("Variable transparent action triggered");
      // Add logic for variable transparency
    },
    "fill.png": () => {
      console.log("Fill action triggered");
      // Add logic for "Fill"
    },
    "erase.png": () => {
        console.log("Erase action triggered");
        // Add logic for "Erase"
      },
    "print-image.png": () => {
      console.log("Print image action triggered");
      // Add logic to print the image
    }
}
for (let imageSrc in images) {
    let image = document.createElement("img");
    image.src = "images/"+imageSrc;
    image.height *= 0.28;
    image.className = "click image";
    image.addEventListener("click", images[imageSrc]);
    containertools.appendChild(image);
}
