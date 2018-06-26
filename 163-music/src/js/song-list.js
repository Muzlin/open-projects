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
    },
    activeItem(el){
      $(el).addClass('active').siblings().removeClass('active')
    }
  }
  let model = {
    data:{
      songs:[]
    },
    find(){
      let query = new AV.Query('Song')
      return query.find().then(songs=>{
        this.data.songs = songs.map(song=>{
          return {id: song.id, ...song.attributes}
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  }
  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      // 渲染
      this.view.render(this.model.data)
      // 绑定事件
      this.bindEvents()
      // 绑定订阅发布
      this.bindEventHub()
      // 获取数据
      this.getAllSongs()
    },
    getAllSongs(){
      // 获取列表数据
      this.model.find().then(()=>{
        this.view.render(this.model.data)
      })
    },
    bindEvents(){
      $(this.view.el).on('click','li',(e)=>{
        //$(e.currentTarget).addClass('active').siblings().removeClass('active')
        this.view.activeItem(e.currentTarget)
      })
    },
    bindEventHub(){
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
