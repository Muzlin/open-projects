{
  let view = {
    el: '.page > main',
    init() {
      this.$el = $(this.el)
    },
    template: `
      <form action="" class="form">
        <div class="row">
          <label for="">歌名</label>
          <input name="name" type="text" value="__name__">
        </div>
        <div class="row">
          <label for="">歌手</label>
          <input name="singer" type="text" value="__singer__">
        </div>
        <div class="row">
          <label for="">外链</label>
          <input name="url" type="text" value="__url__">
        </div>
        <div class="row actions">
          <button type="submit">保存</button>
        </div>
      </form>
    `,
    render(data = {}) {
      // 定义 data 里面的key 用来遍历替换html
      let placeholders = 'name singer url id'.split(' ')
      let html = this.template
      // 遍历替换 html 里面的占位符
      placeholders.map(string => {
        html = html.replace(`__${string}__`, data[string] || '')
      })
      // 渲染
      $(this.el).html(html)
      if(data.id){
        $(this.el).prepend('<h1>编辑歌曲</h1>')
      }else{
        $(this.el).prepend('<h1>新建歌曲</h1>')
      }
    },
    reset(){
      this.render({})
    }
  }
  let model = {
    data: {
      id: '',
      name: '',
      singer: '',
      url: ''
    },
    create(data) {
      // 声明类型
      let Song = AV.Object.extend('Song')
      // 新建对象
      let song = new Song()
      // 设置名称
      song.set('name', data.name)
      song.set('singer', data.singer)
      song.set('url', data.url)
      //song.set('id', data.id)
      return song.save().then((newSong)=> {
        let {id,attributes} = newSong
        //assign 将左边的对象赋给右边的对象
        Object.assign(this.data,{
          id,// id: id
          ...attributes // 等同于下面 es6新语法
          // name: attributes.name,
          // singer: attributes.singer,
          // url: attributes.url
        })
      }, function (error) {
        console.error(error)
      })
    },
    update(data){
      let Song = AV.Object.createWithoutData('Song', data.id)
      // 修改属性
      Song.set('name', data.name)
      Song.set('singer', data.singer)
      Song.set('url', data.url)
      // 保存到云端
      return Song.save().then((newSong)=> {
        let {id,attributes} = newSong
        //assign 将左边的对象赋给右边的对象
        Object.assign(this.data,{
          id,// id: id
          ...attributes // 等同于下面 es6新语法
          // name: attributes.name,
          // singer: attributes.singer,
          // url: attributes.url
        })
      }, function (error) {
        console.error(error)
      })
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.view.init()
      this.model = model
      this.view.render(this.model.data)
      this.bindEvents()
      this.bindEventHub()
    },
    bindEvents() {
      // 事件委托(渲染前找不到 form) 监听表单提交
      this.view.$el.on('submit', 'form', (e) => {
        // 阻止默认事件
        e.preventDefault()
        // 获取需要的字段 ['name','singer','url'] 利用split 来快速定义
        let needs = 'name singer url'.split(' ')
        // 遍历 定义的字段 获取表单对应的数据
        let data = {}
        needs.map((string) => {
          data[string] = this.view.$el.find(`[name="${string}"]`).val()
        })
        if(this.model.data.id){
          // 将获取到的数据传递给model操作
          data.id = this.model.data.id
          this.model.update(data).then(()=>{
            this.view.reset()
            window.eventHub.emit('update',JSON.parse(JSON.stringify(this.model.data)))
          })
        }else{
          // 将获取到的数据传递给model操作
          this.model.create(data).then(()=>{
            this.view.reset()
            // 发布一个保存成功的事件
            // 此处如果传递 this.model.data 是传递了一个引用地址
            // 需要深拷贝一次传递 不然这个模块改变了值 订阅的模块会对应改变
            //window.eventHub.emit('create',this.model.data)
            let string = JSON.stringify(this.model.data)
            let object = JSON.parse(string)
            window.eventHub.emit('create',object)
          })
        }
      })
    },
    bindEventHub(){
      // 订阅上传事件
      window.eventHub.on('upload', (data) => {
        // 重新渲染view
        this.view.render(data)
      })
      // 订阅歌曲列表选择事件
      window.eventHub.on('select',(data)=>{
        this.model.data = data
        this.view.render(data)
      })
      // 订阅新建歌曲点击事件
      window.eventHub.on('new',()=>{
        this.model.data = {}
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view, model)
}
