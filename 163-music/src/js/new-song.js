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
      $(this.view.el).addClass('active')
    },
    deactive(){
      $(this.view.el).removeClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEventHud()
    },
    bindEventHud(){
      // 订阅上传事件 上传成功触发
      window.eventHub.on('upload',()=>{
        this.view.active()
      })
      // 订阅一个歌曲列表的选择事件
      window.eventHub.on('select',(data)=>{
        if(data){
          this.view.deactive()
        }
      })
    }
  }
  controller.init(view,model)
}
