var canvas = document.getElementById('canvas')
if (canvas.getContext) {
    var context = canvas.getContext('2d') // 定义上下文
    // 坐标hash
    var hash = {
        'x': 0,
        'y': 0,
        'x1': 0,
        'y1': 0
    }
    // 是否使用画布
    var useing = false
    // 橡皮檫状态
    var eraserUseing = false
    // 设置canvas高度
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    console.log(pageWidth)
    console.log(pageHeight)
    autoSetCanvasSize(canvas, pageWidth, pageHeight)
    listenMouse(context)
    eraser.onclick = function () {
        eraserUseing = true
        eraser.classList.add("active")
        brush.classList.remove("active")

    }
    brush.onclick = function () {
        eraserUseing = false
        eraser.classList.remove("active")
        brush.classList.add("active")
    }
    clear.onclick = function () {
        clearCanvas(context, pageWidth, pageHeight)
    }
}

// 鼠标监听
function listenMouse(context) {
    // 鼠标按下事件
    document.onmousedown = function (e) {
        useing = true
        hash.x = e.clientX
        hash.y = e.clientY
    }
    // 鼠标移动事件
    document.onmousemove = function (e) {
        if (useing) {
            // 获取鼠标点击位置的 x y 坐标
            hash.x1 = e.clientX
            hash.y1 = e.clientY
            // 动作类型
            if (eraserUseing) {
                // 清除
                clearLine(context, hash.x, hash.y, 20, 20)
            } else {
                // 绘制
                drawLine(context, hash.x, hash.y, hash.x1, hash.y1)
            }
            hash.x = e.clientX
            hash.y = e.clientY
        }
    }
    // 鼠标松开事件
    document.onmouseup = function (e) {
        useing = false
    }
}

// 设置画布大小
function setCanvasSize(canvas, width, height) {
    canvas.width = width
    canvas.height = height
}

// 当视口大小改变时 改变canvas大小
function autoSetCanvasSize(canvas, width, height) {
    setCanvasSize(canvas, width, height)
    window.onresize = function () {
        pageWidth = document.documentElement.clientWidth
        pageHeight = document.documentElement.clientHeight
        setCanvasSize(canvas, pageWidth, pageHeight)
    }
}

// canvas 绘制线条
function drawLine(context, x, y, x1, y1) {
    context.beginPath()
    context.lineTo(x, y)
    context.lineTo(x1, y1)
    context.stroke()
}

// canvas 清除图形
function clearLine(context, x, y, width, height) {
    context.clearRect(x - 10, y - 10, width, height)
}

// 清除整个画布
function clearCanvas(context, width, height) {
    context.clearRect(0, 0, width, height)
}