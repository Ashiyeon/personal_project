// ░░░▐▀▀▄█▀▀▀▀▀▒▄▒▀▌░░░░熊
// ░░░▐▒█▀▒▒▒▒▒▒▒▒▀█░░░░░怪
// ░░░░█▒▒▒▒▒▒▒▒▒▒▒▀▌░░░░保
// ░░░░▌▒██▒▒▒▒██▒▒▒▐░░░░佑
// ░░░░▌▒▒▄▒██▒▄▄▒▒▒▐░░░░，
// ░░░▐▒▒▒▀▄█▀█▄▀▒▒▒▒█▄░░拜
// ░░░▀█▄▒▒▐▐▄▌▌▒▒▄▐▄▐░░░託
// ░░▄▀▒▒▄▒▒▀▀▀▒▒▒▒▀▒▀▄░░不
// ░░█▒▀█▀▌▒▒▒▒▒▄▄▄▐▒▒▐░░要
// ░░░▀▄▄▌▌▒▒▒▒▐▒▒▒▀▒▒▐░░有
// ░░░░░░░▐▌▒▒▒▒▀▄▄▄▄▄▀░░B
// ░░░░░░░░▐▄▒▒▒▒▒▒▒▒▐░░░U
// ░░░░░░░░▌▒▒▒▒▄▄▒▒▒▐░░░G

//新聞輪播

const carousel = document.querySelector(".carousel");
firstImg = document.querySelectorAll(".news-slider")[0];
arrowIcons = document.querySelectorAll(".news i");

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
let firstImgWidth = firstImg.clientWidth + 16;

arrowIcons.forEach(icon =>{
    icon.addEventListener("click", () =>{
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    });
});

const autoSlide = () => {
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 16;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    //按下事件
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft; 
}

const dragging = (e) =>{
    if(!isDragStart) return;
    e.preventDefault(); //關閉預設
    carousel.classList.add("dragging");
    positionDiff = e.pageX -prevPageX
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    autoSlide();
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mousemove", dragging);