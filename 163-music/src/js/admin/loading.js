{
  let view = {
    el: '#site-loading',
    show(){
      $(this.el).addClass('active')
    },
    hidden(){
      $(this.el).removeClass('active')
    }
  }

  let model = {
    data: {}
  }

  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.bindEventHub()
    },
    bindEventHub() {
      window.eventHub.on('load', () => {
        this.view.show()
      })
      window.eventHub.on('deload', () => {
        this.view.hidden()
      })
    }
  }
  controller.init(view,model)
}
