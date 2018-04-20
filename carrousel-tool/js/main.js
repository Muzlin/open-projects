$(function(){
    // 初始化图片位置
    $('.images > img:nth-child(1)').addClass('current')
    $('.images > img:nth-child(2)').addClass('enter')

    setTimeout(() => {
        $('.images > img:nth-child(1)').addClass('leave').removeClass('current').one('transitionend',function(e){
          // 监听动画完成后 将图片放入移入区
          $('.images > img:nth-child(1)').removeClass('leave').addClass('enter')  
        })
        $('.images > img:nth-child(2)').removeClass('enter').addClass('current')
    }, 3000);
    setTimeout(() => {
        $('.images > img:nth-child(2)').addClass('leave').removeClass('current').one('transitionend',function(e){
          // 监听动画完成后 将图片放入移入区
          $('.images > img:nth-child(2)').removeClass('leave').addClass('enter')  
        })
        $('.images > img:nth-child(3)').removeClass('enter').addClass('current')
    }, 6000);
    setTimeout(() => {
        $('.images > img:nth-child(3)').removeClass('current').addClass('leave').one('transitionend',function(e){
          // 监听动画完成后 将图片放入移入区
          $('.images > img:nth-child(3)').removeClass('leave').addClass('enter')  
        })
        $('.images > img:nth-child(1)').removeClass('enter').addClass('current')
    }, 9000);
})