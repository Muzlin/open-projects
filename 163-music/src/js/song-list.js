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
      let liList = songs.map((song)=>$('<li></li>').text(song.name).attr('data-id',song.id))
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
        this.view.activeItem(e.currentTarget)
        // 发布一个选择事件
        let songId = e.currentTarget.getAttribute('data-id')
        let data
        let songs = this.model.data.songs
        for(let i in songs) {
          if(songs[i].id === songId){
            data = songs[i]
            break
          }
        }
        window.eventHub.emit('select',JSON.parse(JSON.stringify(data)))
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
      // 订阅新建歌曲点击事件
      window.eventHub.on('new',()=>{
        this.view.clearActive()
      })
      // 订阅编辑歌曲事件
      window.eventHub.on('update',(data)=>{
        let songs = this.model.data.songs
        for (let i = 0; i < songs.length; i++) {
          if(songs[i].id === data.id){
            songs[i] = data
          }
        }
        this.view.render(this.model.data)
      })
    }

  }
  controller.init(view,model)
}
