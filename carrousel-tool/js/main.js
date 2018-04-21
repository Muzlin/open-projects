$(() => {
    let n
    // 初始化图片位置
    Init()

    let id = Start()

    // 监听到移出页面 
    $(document).on('visibilitychange',(e)=>{
        if(document.hidden){
            // 清除定时器
            window.clearInterval(id)
        }else{
            // 启动定时器
            id = Start()
        }
    })

    function Start() {
        return setInterval(() => {
            makeLeave(getImage(n)).one('transitionend', function (e) {
                // 监听动画完成后 将图片放入移入区
                makeEnter($(e.currentTarget))
            })
            makeCurrent(getImage(n + 1))
            n++
        }, 3000)
    }

    function Init() {
        n = 1
        getImage(n).addClass('current').siblings().addClass('enter')
    }

    function getImage(n) {
        return $(`.images img:nth-child(${getNum(n)})`)
    }

    function makeCurrent($node) {
        $node.removeClass('leave enter').addClass('current')
        return $node
    }

    function makeLeave($node) {
        $node.removeClass('enter current').addClass('leave')
        return $node
    }

    function makeEnter($node) {
        $node.removeClass('leave current').addClass('enter')
        return $node
    }

    function getNum(num) {
        if (num > 5) {
            num = num % 5
            if (num === 0) {
                num = 5
            }
        }
        return num;
    }
})