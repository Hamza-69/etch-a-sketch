let colorAction = () => {};
let containercolor = document.querySelector(".container-color");
let makeGrid = (n) => {
    let opacity = 0;
    containercolor.innerHTML = "";
    while (n > 100 || n <= 0) {
        alert("Please enter a valid number between 1 and 100.");
        n = prompt("Enter the number of squares per side (between 1 and 100):");
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
            colorAction(item);
        });
        item.addEventListener("mouseover", () => {
            if (isMouseDown) colorAction(item);
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
      makeGrid(prompt("Enter the number of squares per side (between 1 and 100):"))
    },
    "back.png": () => {
      window.close();
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
      let tohide = document.querySelectorAll(".tohide");
      let tohide2 = [];
      tohide.forEach((item) => {
        tohide2.push(item.style.display);
      })
      tohide.forEach((item) => {
        item.style.display = "none";
      })
      window.print();
      let i = 0;
      tohide.forEach((item) => {
        item.style.display = tohide2[i++];
      })
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
