let slideValue = 0;
let size  = 1;
let colorPublic = "rgb(0,0,0)";
let opacityPublic = 100;
let opacitySliderValue = 100;
let conditions = {
  "randomColor" : false,
  "progressiveOpacity" : false,
  "mirror" : false,
  "eraser" :false,
  "eradicate" :false,
  "fill" : false
}
let divs = [];
let nPublic = 16;
let colorAction = (div, color) => {
  if (conditions["mirror"]) {
    div.style.backgroundColor = color;
    div.style.opacity = opacityPublic+"%";
    let divX = div.getAttribute("data-x");
    let divY = nPublic - div.getAttribute("data-y") -1;
    let ref = document.querySelector(`.box${divX}-${divY}`)
    ref.style.backgroundColor = color;
    ref.style.opacity = opacityPublic+"%";
  }
  div.style.backgroundColor = color;
  div.style.opacity = opacityPublic+"%";
};
let stop = false;
let containercolor = document.querySelector(".container-color");
let makeGrid = (n) => {
    nPublic = n;
    let opacity = 0;
    containercolor.innerHTML = "";
    while (n > 100 || n <= 0 || isNaN(n/3)) {
        alert("Please enter a valid number between 1 and 100.");
        n = prompt("Enter the number of squares per side (between 1 and 100):");
    }
    for (let i =0; i<n; i++) {
      let divsMini= [];
        for (let j=0;j<n;j++) {
            let box = document.createElement("div");
            box.className = "box" +` box${i}-${j}`;
            box.setAttribute("data-x", i)
            box.setAttribute("data-y", j)
            box.style.width = 720/n + "px";
            box.style.height = 720/n + "px";
            containercolor.appendChild(box);
            divsMini.push(box);
        }
        divs.push(divsMini);
    }
    containercolor.innerHTML += "<div class=\"left-border\"></div>\n<div class=\"right-border\"></div>"
    let boxes = document.querySelectorAll(".container-color .box");
    boxes.forEach(item => {
      item.style.border = `rgb(142, 142, 142) ${8/n}px solid`
    })
    let isMouseDown;
    boxes.forEach( item => {
        item.addEventListener("mousedown", () => {
            isMouseDown = true;
            if (conditions["fill"]) {
              let Oldcolor = item.style.background;
              fill(item, Oldcolor);
            }
            else if (conditions["eradicate"]) {
              boxes.forEach(item => {
                item.style.background = "white";
                item.style.opacity = "100%";
              })
            }
            else colorSize(item,size);
        });
        item.addEventListener("mouseenter", () => { 
          if (isMouseDown && conditions["fill"]) {
            fill(item, item.style.background);
          }
          else if (isMouseDown && conditions["eradicate"]) {
              boxes.forEach(item => {
                item.style.background = "white";
                item.style.opacity = "100%";
              })
            }
            else if (isMouseDown && !conditions["eradicate"]) colorSize(item,size);
        });
        item.addEventListener("mouseup", () => {
            isMouseDown = false; 
            if (conditions["randomColor"]) randomColor();
            if (conditions["progressiveOpacity"]) opacityPublic += opacityPublic>=100? -90:10;
        });
    })
    };
makeGrid(16);
let check = (div, color) => {
  return div.style.backgroundColor == color;
}
let colorBounds = (div, dx, dy, Oldcolor = "def") => {
  let newX = +div.getAttribute("data-x")+dx;
  let newY = +div.getAttribute("data-y")+dy;
  if (newX < nPublic && newY < nPublic && newX >= 0 && newY >= 0) {
    let newDiv = document.querySelector(`.box${newX}-${newY}`)
    if (Oldcolor=="def" || check(newDiv, Oldcolor)) {
    colorAction(newDiv, conditions["eraser"]? "white":colorPublic);
    }
    else return "stop";
  }
  else return "stop";
}
let colorSize = (div,size) => {
  if (size == 1|| size == 2|| size == 3 || size == 4 ||size >=5) {
    colorBounds(div, 0, 0);
    if (size == 2|| size == 3 || size == 4 ||size >=5) {
      colorBounds(div, 0, 1);
      colorBounds(div, 1, 0);
      colorBounds(div, -1, 0);
      colorBounds(div, 0, -1); 
      if (size == 3 || size == 4 ||size >=5) {
        colorBounds(div, 1, 1);
        colorBounds(div, -1, -1);
        colorBounds(div, -1, 1);
        colorBounds(div, 1, -1);

    if (size == 4 ||size >=5) {
      colorBounds(div, 0, 2);
      colorBounds(div, 0, -2);
      colorBounds(div, 2, 0);
      colorBounds(div, -2, 0);
      colorBounds(div, 1, -2);
      colorBounds(div, -2, -1);
      colorBounds(div, -1, -2);
      colorBounds(div, 2, -1);
      colorBounds(div, 1, 2);
      colorBounds(div, 2, 1);
      colorBounds(div, -1, 2);
      colorBounds(div, -2, 1);
    if (size == 5) {
      colorBounds(div, 2, 2);
      colorBounds(div, -2, -2);
      colorBounds(div, -2, 2);
      colorBounds(div, 2, -2);
    } 
    } 
    } 
    }
  }
}
let doubleImage = (imageSrc, condition) => {
  let img = document.createElement("img");
  img.src = `double-button/${imageSrc}_0.png`
  img.className = "double-button";
  img.addEventListener("click", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let pos = Math.round(x/180.8);
    if (pos == 0) {
      conditions[condition] = false
    } else if (pos == 1) {
      conditions[condition] = true
    }
    img.src = `double-button/${imageSrc}_${pos}.png`
    if (condition == "progressiveOpacity" && conditions[condition] ) {
      opacityPublic = 10;
    }
    if (condition == "progressiveOpacity" && !conditions[condition] ) {
      opacityPublic = 100;
    }
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
    if (pos >0) conditions["eradicate"] = true;
    if (pos ==0) {
      conditions["erase"] = true;
      conditions["eradicate"] = false;
    }
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
let slider = (imageSrc) => {
  let item = document.createElement("div");
  item.className = "slider"
  item.innerHTML = `<img src ="silder-image/${imageSrc}">
                <div class="range-container">
                    <div class="range"></div>
                    <form>
                    <input type="range" min="0" max="100" value="${slideValue}">
                    </form>
                    <div class="slided"></div>
                    <div class="range-bg"></div>
                </div>`
  let slide = item.querySelector("input");
  slide.addEventListener("input", ()=>{
    slideValue = slide.value;
    size = Math.floor(slideValue/25) + 1;
    const value = (slide.value - slide.min) / (slide.max - slide.min) * 9;
    slide.parentNode.nextElementSibling.style.width = value +"rem";
    })
    slide.dispatchEvent(new Event("input"));         
  return item;
}
let sliderOpacity = (imageSrc) => {
  let item = document.createElement("div");
  item.className = "slider"
  item.innerHTML = `<img src ="silder-image/${imageSrc}">
                <div class="range-container">
                    <div class="range"></div>
                    <form>
                    <input type="range" min="0" max="100" value="${opacitySliderValue}">
                    </form>
                    <div class="slided"></div>
                    <div class="range-bg"></div>
                </div>`
  let slide = item.querySelector("input");
  slide.addEventListener("input", ()=>{
    opacitySliderValue = slide.value;
    opacityPublic = (Math.floor(opacitySliderValue*2/100)+1)*100/3;
    const value = (slide.value - slide.min) / (slide.max - slide.min) * 9;
    slide.parentNode.nextElementSibling.style.width = value +"rem";
    })
    slide.dispatchEvent(new Event("input"));      
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
      let variable = document.querySelector(".variable");
      variable.innerHTML = "";
      stop = false;
      colorPallete("mirror.png", 12, 2)
      double(slider("circles.png"), doubleImage("Mirror", "mirror"));
      let box = document.querySelector(".color-image");
      box.style.background = colorPublic;
    },
    "choose-trans.png": (e) => {
      let variable = document.querySelector(".variable");
      variable.innerHTML = "";
      stop = false;
      colorPallete("choose-trans.png", 8, 3)
      double(slider("circles.png"), sliderOpacity("trans.png"));
      let box = document.querySelector(".color-image");
      box.style.background = colorPublic;
    },
    "vari-trans.png": (e) => {
      let variable = document.querySelector(".variable");
      variable.innerHTML = "";
      stop = false;
      colorPallete("vari-trans.png", 12, 2)
      double(slider("circles.png"), doubleImage("vari-trans", "progressiveOpacity"));
      let box = document.querySelector(".color-image");
      box.style.background = colorPublic;
    },
    "fill.png": (e) => {
      conditions["fill"] = true;
      let variable = document.querySelector(".variable");
      variable.innerHTML = "";
      stop = false;
      colorPallete("fill.png", 8, 3);
      let box = document.querySelector(".color-image");
      box.style.background = colorPublic;
    },
    "erase.png": (e) => {
      conditions["eraser"] = true;
      let variable = document.querySelector(".variable");
      variable.innerHTML = "";
      stop = false;
      double(slider("squares.png"), doubleImage("Erase")).style.marginRight = "200px";
      variable.appendChild(eraseState());
    },
    "print-image.png": (e) => {
      let boxes = document.querySelectorAll(".container-color .box");
      boxes.forEach(item => {
        item.style.border = `rgb(142, 142, 142) 0px solid`
      })
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
      boxes.forEach(item => {
        item.style.border = `rgb(142, 142, 142) ${8/nPublic}px solid`
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
      for (cond in conditions) {
      if (cond == "randomColor") continue;
      conditions[cond] = false;
      }
      images[imageSrc](e);
      if (!stop) {
        imageChange(e.target, imageSrc);
        hidden.style.opacity = "100%";
        hidden = e.target;
        e.target.style.opacity = 0;
        opacity = 100;
        opacitySliderValue = 100;
      }
    });
    containertools.appendChild(image);
}
let colorPallete = (imageSrc, nbx, nby) => {
  let div = document.createElement("div");
  div.className = "pallete";
  div.innerHTML = `
                        <div class = "color-image"></div>
                        <img src = "color-image/${imageSrc}" class = "pallete-img">
                  `
  let container = document.querySelector(".variable");
  container.appendChild(div);
  clickable = document.querySelector(".pallete-img");
  clickable.addEventListener('click', (e) => {
    const rect = clickable.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let posX = Math.floor(x*nbx/460) > nbx-1? nbx-1: Math.floor(x*nbx/460);
    let posY = Math.floor(y*nby/200) > nby-1? nby-1: Math.floor(y*nby/200);
    let index = posX + posY*nbx;
    if (nby == 3) colors2[index]();
    else colors[index]();
  })
}
const button = document.querySelector('.click[src = "images/mirror.png"]');
button.dispatchEvent(new Event('click'));

let randomColor = () =>{
  let box = document.querySelector(".color-image");
  conditions["randomColor"] = true;
  return colorPublic = box.style.background = `rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`
}
let anyColor = (color) => {
  let colorClosure = () => {
    colorPublic = color;
    let box = document.querySelector(".color-image");
    box.style.background = color;
    conditions["randomColor"] = false;
  };
  return colorClosure;
}
let fill = (div, Oldcolor) => {
}
let colors = [
  randomColor, 
  anyColor("rgb(51,51,51)"),
  anyColor("rgb(234,51,35)"),
  anyColor("rgb(241,158,56)"),
  anyColor("rgb(255,255,84)"),
  anyColor("rgb(117,252,76)"),
  anyColor("rgb(102,201,202)"),
  anyColor("rgb(0,0,245)"),
  anyColor("rgb(140,27,246)"),
  anyColor("rgb(234,72,198)"),
  anyColor("rgb(196,155,71)"),
  anyColor("rgb(96,54,14)"),
  anyColor("rgb(255,255,255)"),
  anyColor("rgb(153,153,153)"),
  anyColor("rgb(247,206,205)"),
  anyColor("rgb(247,206,118)"),
  anyColor("rgb(255,255,165)"),
  anyColor("rgb(177,253,163)"),
  anyColor("rgb(146,252,254)"),
  anyColor("rgb(204,204,251)"),
  anyColor("rgb(196,155,249)"),
  anyColor("rgb(241,158,250)"),
  anyColor("rgb(204,204,159)"),
  anyColor("rgb(146,104,60)")
]
let colors2 = [
  randomColor, 
  anyColor("rgb(255,255,255)"),
  anyColor("rgb(153,153,153)"),
  anyColor("rgb(51,51,51)"),
  anyColor("rgb(204,204,159)"),
  anyColor("rgb(196,155,71)"),
  anyColor("rgb(146,104,60)"),
  anyColor("rgb(96,54,14)"),
  anyColor("rgb(234,51,35)"),
  anyColor("rgb(241,158,56)"),
  anyColor("rgb(255,255,84)"),
  anyColor("rgb(117,252,76)"),
  anyColor("rgb(102,201,202)"),
  anyColor("rgb(0,0,245)"),
  anyColor("rgb(140,27,246)"),
  anyColor("rgb(234,72,198)"),
  anyColor("rgb(247,206,205)"),
  anyColor("rgb(247,206,118)"),
  anyColor("rgb(255,255,165)"),
  anyColor("rgb(177,253,163)"),
  anyColor("rgb(146,252,254)"),
  anyColor("rgb(204,204,251)"),
  anyColor("rgb(196,155,249)"),
  anyColor("rgb(241,158,250)")
]