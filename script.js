let colorAction = () => {};
let stop = false;
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
let doubleImage = (imageSrc) => {
  let img = document.createElement("img");
  img.src = `double-button/${imageSrc}_0.png`
  img.className = "double-button"
  img.addEventListener("click", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let pos = Math.round(x/180.8);
    img.src = `double-button/${imageSrc}_${pos}.png`
  })
  return img;
} 
let eraseState = () => {
  let img = document.createElement("img");
  img.src = `eraser/eraser_0.png`
  img.className = "eraser"
  img.addEventListener("click", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let pos = Math.floor(x/76.8) > 4? 4: Math.floor(x/76.8);
    img.src = `eraser/eraser_${pos}.png`
  })
  return img;
} 
let double = (first, second) => {
  let div = document.createElement("div");
  div.className = "double";
  div.appendChild(first);
  div.appendChild(second);
  let variable = document.querySelector(".variable");
  variable.appendChild(div);
  return div;
}
let slider = (imageSrc, customclass) => {
  let item = document.createElement("div");
  item.className = "slider"
  item.innerHTML = `<img src ="silder-image/${imageSrc}">
                <div class="range-container">
                    <div class="range"></div>
                    <form>
                    <input class = "${customclass}" type="range" min="0" max="100" value="0">
                    </form>
                    <div class="slided"></div>
                    <div class="range-bg"></div>
                </div>`
  let slide = item.querySelector("input");
  slide.addEventListener("input", ()=>{
    const value = (slide.value - slide.min) / (slide.max - slide.min) * 9;
    slide.parentNode.nextElementSibling.style.width = value +"rem";
    })         
  return item;
}
let currentImage = document.querySelector(".option img");
let imageChange = (oldImage,imageSrc) => {
  currentImage.src = "images/"+imageSrc;
  currentImage.className = oldImage.className;
}
let containertools = document.querySelector(".container-tools");
const images = {
    "save-image.png": (e) => {
      stop = true;
      makeGrid(prompt("Enter the number of squares per side (between 1 and 100):"))
    },
    "back.png": (e) => {
      stop = true;
      window.close();
    },
    "mirror.png": (e) => {
      stop = false;
      color("mirror.png")
      double(slider("circles.png", "mirror"), doubleImage("Mirror"));
    },
    "choose-trans.png": (e) => {
      stop = false;
      color("choose-trans.png")
      double(slider("circles.png", "choose-trans"), slider("trans.png", "choose-trans"));
    },
    "vari-trans.png": (e) => {
      stop = false;
      color("vari-trans.png")
      double(slider("circles.png", "vari-trans"), doubleImage("vari-trans"));
    },
    "fill.png": (e) => {
      stop = false;
      color("fill.png");
    },
    "erase.png": (e) => {
      stop = false;
      double(slider("squares.png", "erase"), doubleImage("Erase")).style.marginRight = "200px";
      let variable = document.querySelector(".variable");
      variable.appendChild(eraseState());
    },
    "print-image.png": (e) => {
      stop = true;
      let tohide = document.querySelectorAll(".tohide");
      tohide.forEach((item) => {
        item.style.opacity = 0;
      })
      let main = document.querySelector(".container-main");
      main.style.marginLeft = "250px";
      main.style.marginTop = "200px";
      let body = document.querySelector("body");
      body.style.background = "white";
      window.print();
      main.style.marginLeft = "0px";
      main.style.marginTop = "0px";
      body.style.background = "black";
      let i = 0;
      tohide.forEach((item) => {
        item.style.opacity = "100%";
      })
    }
}
let hidden = document.createElement("div");
for (let imageSrc in images) {
    let image = document.createElement("img");
    image.src = "images/"+imageSrc;
    image.height *= 0.28;
    image.className = "click";
    image.addEventListener("click", (e) => {
      let variable = document.querySelector(".variable");
      variable.innerHTML = "";
      images[imageSrc](e);
      if (!stop) {
        imageChange(e.target, imageSrc);
        hidden.style.opacity = "100%";
        hidden = e.target;
        e.target.style.opacity = 0;
      }
    });
    containertools.appendChild(image);
}
let color = (imageSrc) => {
  let div = document.createElement("div");
  div.className = "pallete";
  div.innerHTML = `<div class="pallete">
                        <div class = "color-image"></div>
                        <img src = "color-image/${imageSrc}" class = "pallete-img">
                    </div>`
  let container = document.querySelector(".variable");
  container.appendChild(div);
}