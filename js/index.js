let scrollDistance = 0;
const targetScroll = 200;
const targetElement = document.querySelector('.top-event');

// 事件監聽函數
const onScroll = function(e) {
    // 增加滾動距離
    scrollDistance += Math.abs(e.deltaY);
    e.preventDefault();
    // 如果滾動距離超過目標距離
    if(scrollDistance >= targetScroll) {
        // 阻止默認的滾動行為
        e.preventDefault();

        // 滾動到目標元素
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });

        // 重置滾動距離
        scrollDistance = 0;

        // 移除滾動事件監聽器
        window.removeEventListener('wheel', onScroll);
    }
};

window.addEventListener('wheel', onScroll);







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
    e.preventDefault();
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
