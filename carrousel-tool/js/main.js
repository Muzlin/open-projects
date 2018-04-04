$(function(){
    let btns = $('.button > button')
    for (let i = 0; i < btns.length; i++) {
        $(btns[i]).on('click',function(e){
            let index = $(e.currentTarget).index()
            $('.wapper').css('transform','translateX(-'+ index*100 +'%)')
        })
    }
})