$(function () {
    let n = 0;
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

    let btnLength = btns.length
    let id = timer()
    $('.window').on('mouseenter', function () {
        window.clearInterval(id)
    })

    $('.window').on('mouseleave', function () {
        id = timer()
    })

    function activeBtn($btn) {
        $btn.addClass('red').siblings('.red').removeClass('red')
    }

    function timer() {
        let id = setInterval(() => {
            btns.eq(n % btnLength).trigger('click')
            n++
        }, 1000)
        return id;
    }
})