{
  let view = {
    el: '.newSong',
    template:`
      新建歌曲
    `,
    render(data){
      $(this.el).html(this.template)
    },
    active(){
      $(this.el).addClass('active')
    },
    deactive(){
      $(this.el).removeClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEventHud()
      this.bindEvents()
    },
    bindEventHud(){
      // 订阅上传事件 上传成功触发
      window.eventHub.on('upload',()=>{
        this.view.active()
      })
      // 订阅一个歌曲列表的选择事件
      window.eventHub.on('select',(data)=>{
        this.view.deactive()
      })
    },
    bindEvents(){
      $(this.view.el).on('click',(e)=>{
        window.eventHub.emit('new')
        this.view.active()
      })
    }
  }
  controller.init(view,model)
}
