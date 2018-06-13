{
  let view = {
    el: '#songList-container',
    template:`
      <ul class="songList">
        <li>两只老虎</li>
        <li class="active">纸短情长</li>
        <li>我的滑板鞋</li>
      </ul>
    `,
    render(data){
      $(this.el).html(this.template)
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      window.eventHub.on('upload',()=>{
        this.view.clearActive()
      })
    }
  }
  controller.init(view,model)
}
