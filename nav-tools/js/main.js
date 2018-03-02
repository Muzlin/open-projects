

// 数据初始化
var dataHash = initKeyboard()
var keys = dataHash.keys // 所有的key hash
var mapSite = dataHash.mapSite // 键 域名 映射hash

// 生成键盘
for (var index = 0; index < keys.length; index++) {
    // 生成每行的div
    var div = tag('div')
    div.className = 'row'
    keyboard.appendChild(div)    
    // 生成每行的 kbd
    var rowKeys = keys[index] // 每行的 key hash
    for(var item in rowKeys){
        var kbd = tag('kbd')
        // 生成 span 包裹文字
        var span = tag('span')
        span.textContent = rowKeys[item]
        // 生成 button
        var button = tag('button')
        button.textContent = '编辑'
        button.id = rowKeys[item]
        button.onclick = function(e){
            // 弹出框并获取用户输入的内容
            var webSite = prompt('修改网址')
            // 获取当前点击的元素
            var thisTag = e['target']
            var id = thisTag['id']
            // 改变hash的值
            mapSite[id] = webSite
            // 存入localstrage
            localStorage.setItem('webSiteHash',JSON.stringify(mapSite))
            // 改变img
            var thisImg = thisTag.previousSibling
            thisImg.src = 'http://' + webSite + '/favicon.ico'
        }
        // 生成 img
        var img = tag('img')
        img.src = 'http://' + mapSite[rowKeys[item]] + '/favicon.ico'
        // 添加至 kbd
        kbd.appendChild(img)
        kbd.appendChild(button)     
        kbd.appendChild(span)
        // 将 kdb 添加至每行的 div
        div.appendChild(kbd)
    }
}

// 键盘监听
document.onkeypress = function(e){
    var key = e.key
    // 获取对应的网址
    var webSite = 'http://' + mapSite[key]
    // 新窗口打开
    window.open(webSite,'_blank')
}




// 初始化hash数据
function initKeyboard(){
    var keys = {
        0:['q','w','e','r','t','y','u','i','o','p'],
        1:['a','s','d','f','g','h','j','k','l'],
        2:['z','x','c','v','b','n','m'],
        'length':3
    }
    var mapSite = {
        'q':'qq.com','w':'weibo.com','e': 'ele.me', 'r': 'renren.com', 't': 'tianya.com', 'y': 'youtube.com', 'u': 'uc.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': undefined, 'a': 'acfun.tv', 's': 'sohu.com', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'
    }
    // 取出localstorage
    var lcstrg = localStorage.getItem('webSiteHash');
    if(!lcstrg){
        // 如果localstrage不存在  存入
        localStorage.setItem('webSiteHash',JSON.stringify(mapSite))
    }else{
        // 如果存在  替换
        mapSite = JSON.parse(lcstrg)
    }

    return {
        'keys':keys,
        'mapSite':mapSite
    }
}

// 创建标签
function tag(name){
    return document.createElement(name);
}