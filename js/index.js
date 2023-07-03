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


let scrollDistance = 0;
const targetScroll = 200;
const targetElement = document.querySelector('.top-event');

// 事件監聽函數
const onScroll = function(e) {
    // 增加滾動距離
    scrollDistance += e.deltaY;
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


// 檢查滾動位置的事件處理器
const checkScrollPosition = function() {
    // 如果滾動位置回到頂部
    if(window.pageYOffset === 0) {
        // 將滾動事件的監聽器添加回去
        window.addEventListener('wheel', onScroll, { passive: false });
    }
};

window.addEventListener('wheel', onScroll, { passive: false });
window.addEventListener('scroll', checkScrollPosition);










// 新聞輪播

// 選取輪播元素
const carousel = document.querySelector(".carousel");

// 選取第一個新聞輪播圖片
firstImg = document.querySelectorAll(".news-slider")[0];

// 選取箭頭圖示元素
arrowIcons = document.querySelectorAll(".news i");

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;

// 計算第一個新聞輪播圖片的寬度（包含間距）
let firstImgWidth = firstImg.clientWidth + 16;

// 監聽箭頭圖示的點擊事件
arrowIcons.forEach(icon =>{
    icon.addEventListener("click", () =>{
        // 根據點擊的箭頭方向，調整輪播元素的捲動位置
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    });
});

// 自動滑動輪播元素
const autoSlide = () => {
    // 計算新的位置差
    positionDiff = Math.abs(positionDiff);

    // 計算新的第一個新聞輪播圖片的寬度
    let firstImgWidth = firstImg.clientWidth + 16;

    // 計算捲動的值差
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        // 向右滑動
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // 向左滑動
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // 開始拖曳事件
    isDragStart = true;

    // 記錄開始拖曳時的頁面X座標
    prevPageX = e.pageX;

    // 記錄開始拖曳時的捲動位置
    prevScrollLeft = carousel.scrollLeft; 
}

const dragging = (e) =>{
    if (!isDragStart) return;

    e.preventDefault();

    // 加上拖曳中的樣式
    carousel.classList.add("dragging");

    // 計算新的位置差
    positionDiff = e.pageX - prevPageX;

    // 設定新的捲動位置
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    // 停止拖曳事件
    isDragStart = false;

    // 移除拖曳中的樣式
    carousel.classList.remove("dragging");

    // 執行自動滑動
    autoSlide();
}
