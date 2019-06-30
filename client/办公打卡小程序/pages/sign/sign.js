const app = getApp();
const util = require('../../utils/util');
const config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    yearMonth: null,
    nowDate: null,
    attendanceRate: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nowDate: util.formatTime1(new Date()),
      yearMonth: util.formatTime2(new Date())
    });

    var that = this
    wx.request({
      //url: "http://127.0.0.1:8000/get_sign_date/",
      url: config.service.signDateUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        yearMonth: this.data.yearMonth,
        nowDate: this.data.nowDate
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          count: res.data['count'],
          attendanceRate: res.data['attendanceRate']
        })
      },
      fail: function (res) {
        util.showModel('获取信息失败', '请检查网络');
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

  },

  sHandin: function (e) {

    var that = this
    wx.request({
      //url: "http://127.0.0.1:8000/sign/",
      url: config.service.signUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        nowDate: this.data.nowDate,
        yearMonth: this.data.yearMonth
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data == 'successful') {
          wx.redirectTo({
            url: '../sign/sign',
          })
          util.showSuccess('签到成功');
        }
        else
          util.showModel('签到失败', '您今天已经签到');
      },
      fail: function (res) {
        util.showModel('签到失败', '请检查网络');
      }
    })
  }

})