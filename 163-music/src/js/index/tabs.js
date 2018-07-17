{
  let view = {
    el: '#tabs',
    init(){
      this.$el = $(this.el)
    },
    template: ''
  }
  let model = {}
  let controller = {
    init(view,model) {
      this.view = view
      this.model = model
      this.view.init()
      this.bindEvents()
      this.bindEventHub()
    },
    bindEvents(){
      this.view.$el.on('click','.tabs-nav > li',(e)=>{
        let $li = $(e.currentTarget)
        $li.addClass('active').siblings().removeClass('active')
        window.eventHub.emit('selectTab',$li.attr('data-tab-name'))
      })
    },
    bindEventHub(){
      
    }
  }
  controller.init(view,model)
}
