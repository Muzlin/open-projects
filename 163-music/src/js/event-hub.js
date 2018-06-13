/**
 * 发布订阅
 */
window.eventHub = {
  /** 事件 函数 hash */
  events: {},
  /**
   * 发布
   *
   * @param {string} eventName 发布的事件名
   * @param {json} data 携带的数据
   */
  emit(eventName, data) {
    // 遍历需要触发的事件
    for (const key in this.events) {
      if (eventName === key) {
        // 事件存在 遍历需要执行的函数
        let fnList = this.events[key]
        fnList.map((fn) => {
          fn.call(undefined, data)
        })
      }
    }
  },
  /**
   * 订阅
   *
   * @param {string} eventName 订阅的事件名
   * @param {function} fn 要执行的函数 回调
   */
  on(eventName, fn) {
    // 如果要订阅的事件不存在 初始化
    if (this.events[eventName] === undefined) {
      this.events[eventName] = []
    }
    // 添加事件对应的函数
    this.events[eventName].push(fn)
  }
}
