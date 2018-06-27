{
  let view = {
    el: '.uploadArea',
    template: `
      <div id="container" class="draggable">
        <span id="upbtn" class="clickable">点击或者拖曳上传</span>
        <p>文件大小不能超过20MB</p>
      </div>
      <span id="msg"></span>
    `,
    find(selector) {
      return $(this.el).find(selector)[0]
    },
    render(data) {
      $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render(model.data)
      this.initQiniu()
    },
    initQiniu() {
      var uploader = Qiniu.uploader({
        runtimes: 'html5', // 上传模式，依次退化
        browse_button: this.view.find('#upbtn'), // 上传选择的点选按钮，必需
        uptoken_url: 'http://localhost:8888/uptoken', // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
        get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的uptoken
        domain: 'pa785p8ji.bkt.clouddn.com', // bucket域名，下载资源时用到，必需
        container: this.view.find('#container'), // 上传区域DOM ID，默认是browser_button的父元素
        max_file_size: '10mb', // 最大文件体积限制
        dragdrop: true, // 开启可拖曳上传
        drop_element: 'container', // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', // 分块上传时，每块的体积
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'FilesAdded': function (up, files) {
            plupload.each(files, function (file) {
              // 文件添加进队列后，处理相关的事情
            })
          },
          'BeforeUpload': function (up, file) {
            // 每个文件上传前，处理相关的事情
          },
          'UploadProgress': function (up, file) {
            // 每个文件上传时，处理相关的事情
            window.eventHub.emit('load')
          },
          'FileUploaded': function (up, file, info) {
            // 查看简单反馈
            var domain = up.getOption('domain')
            var res = JSON.parse(info.response)
            var sourceLink = `http://${domain}/${encodeURIComponent(res.key)}` // 获取上传成功后的文件的Url
            // 触发所有订阅了upload的事件
            window.eventHub.emit('upload', {
              url: sourceLink,
              name: res.key
            })
            window.eventHub.emit('deload')
          },
          'Error': function (up, err, errTip) {
            console.log(err)
            //上传出错时，处理相关的事情
            msg.textContent = '上传失败'
            window.eventHub.emit('deload')
          },
          'UploadComplete': function () {
            //队列文件处理完毕后，处理相关的事情
            window.eventHub.emit('deload')
          }
        }
      })
    }
  }
  controller.init(view, model)
}
