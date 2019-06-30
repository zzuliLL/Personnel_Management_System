const config = require('../../config.js');
const util = require('../../utils/util');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getUserId: function (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  loginClick: function (e) {
    app.globalData.userInfo = {
      userId: this.data.userId,
      password: this.data.password
    }
    if (this.data.userId == '' || this.data.password == '') {
      util.showModel('登录失败', '请输入工号和密码');
      return;
    }
    var that = this
    wx.request({
      //url: "http://127.0.0.1:8000/login/",
      url: config.service.loginUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        password: app.globalData.userInfo.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 403 || res.data == 'failed') {
          util.showModel('登录失败', '工号或密码错误');
        } else {
          util.showSuccess('登录成功');

          if (that.data.userId == 'admin') {
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            wx.redirectTo({
              url: '../index_user/index_user',
            })
          }
        }

      },
      fail: function (res) {
        util.showModel('登录失败', '请检查网络');
      }
    })

  }

})