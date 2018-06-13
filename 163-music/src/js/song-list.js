{
  let view = {
    el: '#songList-container',
    template:`
      <ul class="songList">
      </ul>
    `,
    render(data){
      // 首先将ul渲染
      let $el = $(this.el)
      $el.html(this.template)
      // 遍历songs 组合li
      let {songs} = data
      let liList = songs.map((song)=>$('<li></li>').text(song.name))
      // 清空<ul></ul>
      $el.find('ul').empty()
      // 循环 插入<li></li>
      liList.map((li)=>{
        $el.find('ul').append(li)
      })
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }
  }
  let model = {
    data:{
      songs:[]
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      // 订阅一个上传事件
      window.eventHub.on('upload',()=>{
        this.view.clearActive()
      })
      // 订阅一个保存事件
      window.eventHub.on('create',(data)=>{
        this.model.data.songs.push(data)
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view,model)
}
