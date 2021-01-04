// pages/compoment/songList/songList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommentSons: {
      type: Array,
      default: () => []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @date 2020-07-08
     * @description 单位换算
     */
  unitConverter(num) {
    if (!num || isNaN(num)) {
      return num;
    }
    // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
    num = Number(num);
    if (Math.abs(num) > 100000000) {
      return (num / 100000000).toFixed(1) + "亿";
    } else if (Math.abs(num) > 10000) {
      return (num / 10000).toFixed(1) + "万";
    } else {
      return num.toFixed(1);
    }
  }

  }
})
