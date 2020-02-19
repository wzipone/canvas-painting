(function () {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const clearCanvas = document.querySelector("#clearCanvas");
    const eraser = document.querySelector("#eraser");
    const colorSelector = document.querySelector("#colorSelector");
    const isTouchDvice = 'ontouchstart' in document.documentElement;
    let drawing = false; //是否开始划线
    let last = []; //记录上个点的位置
    let brushColor = 'black';

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    ctx.lineCap = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'black';

    // ---方法一---自己写一个划线方法,减小了线边缘的毛刺
    if (isTouchDvice) {
        // 1.手机上画线
        canvas.addEventListener('touchstart', (e) => {
            last = [e.touches[0].clientX, e.touches[0].clientY];
        }, false);

        canvas.addEventListener('touchmove', (e) => {
            drawLine(last[0], last[1], e.touches[0].clientX, e.touches[0].clientY);
            last = [e.touches[0].clientX, e.touches[0].clientY];
        }, false);

        canvas.addEventListener('touchend', (e) => {
            ctx.closePath();
        }, false);

    } else {
        //2.电脑上画线
        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            last = [e.clientX, e.clientY];
        }, false);

        canvas.addEventListener('mousemove', (e) => {
            if (drawing === true) {
                drawLine(last[0], last[1], e.clientX, e.clientY);
                last = [e.clientX, e.clientY];
            }
        }, false);

        canvas.addEventListener('mouseup', (e) => {
            drawing = false;
            ctx.closePath();
        }, false);
    }

    // 根据两点坐标划线
    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    // ---方法二---直接用canvas划线,写起来比较简单,科室斜线的边缘毛刺比较多,因为画的是一条连续线,linecap的功效是线两端变成圆形
    // if (isTouchDvice) {
    //     // 1.手机上画线
    //     canvas.addEventListener('touchstart', (e) => {
    //         ctx.beginPath();
    //         ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
    //     }, false);

    //     canvas.addEventListener('touchmove', (e) => {
    //         ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    //         ctx.stroke();
    //     }, false);

    //     canvas.addEventListener('touchend', (e) => {
    //         ctx.closePath();
    //     }, false);
    // } else {
    //     // 2.电脑上画线
    //     canvas.addEventListener('mousedown', (e) => {
    //         drawing = true;
    //         ctx.beginPath();
    //         ctx.moveTo(e.clientX, e.clientY);
    //     }, false);

    //     canvas.addEventListener('mousemove', (e) => {
    //         if (drawing === true) {
    //             ctx.lineTo(e.clientX, e.clientY);
    //             ctx.stroke();
    //         }
    //     }, false);

    //     canvas.addEventListener('mouseup', (e) => {
    //         drawing = false;
    //         ctx.closePath();
    //     }, false);

    // }

    // 3.清空canvas
    clearCanvas.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = brushColor;
    }, false);

    // 4.橡皮檫
    eraser.addEventListener('click', () => {
        ctx.strokeStyle = 'white';
    });

    // 5.画笔颜色选择
    colorSelector.addEventListener('click', (e) => {
        brushColor = e.target.value;
        ctx.strokeStyle = brushColor;
        e.stopPropagation();
    }, false);
})();