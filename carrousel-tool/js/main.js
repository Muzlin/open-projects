$(function () {
    // 初始化图片位置
    $('.images > img:nth-child(1)').addClass('current')
    $('.images > img:nth-child(2)').addClass('enter')
    $('.images > img:nth-child(3)').addClass('enter')

    let n = 1;
    setInterval(() => {
        console.log(n)

        $(`.images > img:nth-child(${x(n)})`).addClass('leave').removeClass('current').one('transitionend', function (e) {
            // 监听动画完成后 将图片放入移入区
            $(e.currentTarget).removeClass('leave').addClass('enter')
        })
        $(`.images > img:nth-child(${x(n+1)})`).removeClass('enter').addClass('current')
        n += 1
    }, 3000)
})

function x(num) {
    if (num > 3) {
        num = num % 3
        if (num === 0) {
            num = 3
        }
    }
    return num;1
}