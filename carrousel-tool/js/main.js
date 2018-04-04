$(function () {
    let n = 0;  // 当前播放的图片索引
    let btns = $('.button > button')
    for (let i = 0; i < btns.length; i++) {
        $(btns[i]).on('click', function (e) {
            let index = $(e.currentTarget).index()
            $('.wapper').css({
                'transform': 'translateX(-' + index * 100 + '%)'
            })
            activeBtn($(e.currentTarget))
            n = index
        })
    }

    let id = timer()
    $('.window').on('mouseenter', function () {
        window.clearInterval(id)
    })

    $('.window').on('mouseleave', function () {
        id = timer()
    })

    let btnLength = btns.length // 按钮、图片的数量
    /* 触发按钮状态 */
    function activeBtn($btn) {
        $btn.addClass('active').siblings('.active').removeClass('active')
    }

    /* 定时器 
        当前的图片索引跟总数量取余
        保证n%btnLength的范围在btnLength内
        e.g. 0%3-0 1%3->1
    */
    function timer() {
        let id = setInterval(() => {
            btns.eq(n % btnLength).trigger('click')
            n++
        }, 1000)
        return id;
    }
})