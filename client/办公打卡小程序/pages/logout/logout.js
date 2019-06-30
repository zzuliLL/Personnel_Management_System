const config = require('../../config.js');
const app = getApp();
const util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
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


  onGetOldPassword: function (e) {
    this.setData({
      oldPassword: e.detail.value
    });
  },

  onGetNewPassword: function (e) {
    this.setData({
      newPassword: e.detail.value
    });
  },

  onGetNewPassword2: function (e) {
    this.setData({
      newPassword2: e.detail.value
    });
  },

  userLogout: function () {
    util.showSuccess('注销成功');
    wx.reLaunch({
      url: '../login/login',
    })
  },

  modifyPassword: function (e) {
    if (this.data.oldPassword != app.globalData.userInfo.password) {
      util.showModel('提交信息失败', '原密码错误');
      return;
    }

    if (this.data.newPassword != this.data.newPassword2) {
      util.showModel('提交信息失败', '两次输入密码不一样');
      return;
    }

    if (this.data.newPassword == this.data.oldPassword) {
      util.showModel('提交信息失败', '新旧密码一样，无需修改');
      return;
    }

    wx.request({
      url: config.service.modifyPasswordUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        password: this.data.newPassword
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == "successful") {
          util.showSuccess('操作成功');
        } else {
          util.showModel('提交信息失败', '服务器出错，请联系服务器管理员');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  },


})