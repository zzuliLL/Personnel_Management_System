const config = require('../../config.js');
const app = getApp();
const util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    numberMeet: 0
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

  onGetNumberMeet: function (e) {
    this.setData({
      numberMeet: e.detail.value
    });
  },

  askMeeting: function (e) {

    if (this.data.numberMeet <= 0 || this.data.numberMeet > 6) {
      util.showModel('提交信息失败', '请输入正确的会议号');
      return;
    }

    wx.request({
      //url: "http://127.0.0.1:8000/ask_meeting/",
      url: config.service.askMeetingUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        status: true,
        numberMeet: this.data.numberMeet
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "successful") {
          util.showSuccess('申请成功');
        } else {
          util.showModel('申请失败', '该会议室有人正在使用');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  },

  backMeeting: function (e) {
    if (this.data.numberMeet <= 0 || this.data.numberMeet > 6) {
      util.showModel('提交信息失败', '请输入正确的会议号');
      return;
    }

    wx.request({
      //url: "http://127.0.0.1:8000/back_meeting/",
      url: config.service.backMeetingUrl,
      data: {
        userId: app.globalData.userInfo.userId,
        status: true,
        numberMeet: this.data.numberMeet
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "successful") {
          util.showSuccess('归还成功');
        } else {
          util.showModel('归还失败', '您没权限归还/会议室未被预定');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })


  }



})