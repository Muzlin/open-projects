{
  let view ={
    el: '.page > main',
    template: `
      <h1>新建歌曲</h1>
      <form action="" class="form">
        <div class="row">
          <label for="">
           歌名:
            <input type="text" value="__key__">
          </label>
        </div>
        <div class="row">
          <label for="">
            歌手:
            <input type="text">
          </label>
        </div>
        <div class="row">
          <label for="">
            外链:
            <input type="text" value="__link__">
          </label>
        </div>
        <div class="row">
          <button type="submit">保存</button>
        </div>
      </form>
    `,
    render(data = {}){
      // 定义 data 里面的key 用来遍历替换html
      let placeholders = ['key','link']
      let html = this.template
      // 遍历替换 html 里面的占位符
      placeholders.map(string=>{
        html = html.replace(`__${string}__`,data[string] || '')
      })
      // 渲染
      $(this.el).html(html)
    }
  }
  let model = {}
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      // 订阅上传事件
      window.eventHub.on('upload',(data)=>{
        // 重新渲染view
        this.view.render(data)
      })
    }
  }
  controller.init(view,model)
}
