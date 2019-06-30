const config = require('../../../config.js');
const util = require('../../../utils/util');
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcement: null,
    yearMonth: null,
    nowDate: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      yearMonth: util.formatTime2(new Date()),
      nowDate: util.formatTime1(new Date())
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

  getAnnouncement: function (e) {
    this.setData({
      announcement: e.detail.value
    })
  },

  sendAnnouncement: function () {

    wx.request({
      url: config.service.sendAnnouncementUrl,
      data: {
        nowDate: this.data.nowDate,
        yearMonth: this.data.yearMonth,
        announcement: this.data.announcement
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == "successful") {
          util.showSuccess('提交成功');
        } else {
          util.showModel('提交失败', '服务器出错，请联系服务器管理员');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  }

})