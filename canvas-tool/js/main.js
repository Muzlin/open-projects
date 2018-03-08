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
    autoSetCanvasSize(canvas, pageWidth, pageHeight)
    // 鼠标监听
    listenMouse(context)
    // 触摸监听
    listenTouch(context)
    // 操作点击事件
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
    // 线条点击事件
    thinLine.onclick = function(){
        context.lineWidth = 1
        thinLine.classList.add("active")
        middleLine.classList.remove("active")
        thickLine.classList.remove("active")
    }
    middleLine.onclick = function(){
        context.lineWidth = 3
        thinLine.classList.remove("active")
        middleLine.classList.add("active")
        thickLine.classList.remove("active")
    }
    thickLine.onclick = function(){
        context.lineWidth = 4
        thinLine.classList.remove("active")
        middleLine.classList.remove("active")
        thickLine.classList.add("active")
    }

    // 颜色点击事件
    black.onclick = function () {
        context.strokeStyle = "black"
        black.classList.add("active")
        red.classList.remove("active")
        green.classList.remove("active")
        blue.classList.remove("active")
    }
    red.onclick = function () {
        context.strokeStyle = "red"
        black.classList.remove("active")
        red.classList.add("active")
        green.classList.remove("active")
        blue.classList.remove("active")
    }
    green.onclick = function () {
        context.strokeStyle = "green"
        black.classList.remove("active")
        red.classList.remove("active")
        green.classList.add("active")
        blue.classList.remove("active")
    }
    blue.onclick = function () {
        context.strokeStyle = "blue"
        black.classList.remove("active")
        red.classList.remove("active")
        green.classList.remove("active")
        blue.classList.add("active")
    }
    // 下载点击事件
    download.onclick = function () {
        var url = canvas.toDataURL("img/png")
        // 创建一个a标签 模拟点击下载
        var a = document.createElement('a')
        a.href = url
        document.body.appendChild(a)
        a.download = 'canvas'
        a.click()
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

// 触摸监听
function listenTouch(context){
    // 触摸事件
    document.ontouchstart = function(e){
        useing = true
        hash.x = e.touches[0].clientX
        hash.y = e.touches[0].clientY
    }
    // 移动事件
    document.ontouchmove = function(e){
        if (useing) {
            // 获取鼠标点击位置的 x y 坐标
            hash.x1 = e.touches[0].clientX
            hash.y1 = e.touches[0].clientY
            // 动作类型
            if (eraserUseing) {
                // 清除
                clearLine(context, hash.x, hash.y, 20, 20)
            } else {
                // 绘制
                drawLine(context, hash.x, hash.y, hash.x1, hash.y1)
            }
            hash.x = e.touches[0].clientX
            hash.y = e.touches[0].clientY
        }
    }
    // 移出事件
    document.ontouchend = function(e){
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