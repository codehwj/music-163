/**
   * @author hwj
   * @dete 2019-06-11
   * @param {fn} 防抖时间间隔结束后执行函数
   * @param {wait} 是时间间隔
   * @description 滚动事件防抖
   */
export const throttle = (fn, wait = 50) => {
  // previous 是上一次执行 fn 的时间
  // timer 是定时器
  let previous = 0, timer = null
  // 将 throttle 处理结果当作函数返回
  return function () {
    let args = arguments;
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    if (!previous) previous = now;

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
    if (now - previous < wait) {
      // 如果小于，则为本次触发操作设立一个新的定时器
      // 定时器时间结束后执行函数 fn 
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        previous = now;
        fn.apply(this, args)
      }, wait)

    } else {
      // 第一次执行
      // 或者时间间隔超出了设定的时间间隔，执行函数 fn
      previous = now;
      fn.apply(this, args)
    }
  }
}