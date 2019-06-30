// pages/notice/notice.js
const app = getApp();
const util = require('../../utils/util');
const config = require('../../config.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeArray: [],
    yearMonth: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yearMonth: util.formatTime2(new Date())
    });

    var that = this
    wx.request({
      url: config.service.getNoticeUrl,
      data: {
        yearMonth: this.data.yearMonth
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          noticeArray: res.data['announcement']
        })

      },
      fail: function (res) {
        util.showModel('登录失败', '请检查网络');
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})