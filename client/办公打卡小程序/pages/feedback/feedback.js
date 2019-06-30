const config = require('../../config.js');
const util = require('../../utils/util');
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice1: null,
    advice2: null,
    yearMonth: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yearMonth: util.formatTime2(new Date())
    });
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

  },

  getAdvice1: function (e) {
    this.setData({
      advice1: e.detail.value
    })
  },

  getAdvice2: function (e) {
    this.setData({
      advice2: e.detail.value
    })
  },

  fHandin: function () {

    wx.request({
      //url: "http://127.0.0.1:8000/push_feedback/",
      url: config.service.feedbackUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        yearMonth: this.data.yearMonth,
        advice1: this.data.advice1,
        advice2: this.data.advice2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "successful") {
          util.showSuccess('提交成功');
        } else {
          util.showModel('提交失败', '您本月提交的次数已经超过3次');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  }

})