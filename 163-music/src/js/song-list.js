{
  let view = {
    el: '#songList-container',
    template:`
      <ul class="songList">
        <li>两只老虎</li>
        <li>纸短情长</li>
        <li>我的滑板鞋</li>
      </ul>
    `,
    render(data){
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
    }
  }
  controller.init(view,model)
}
