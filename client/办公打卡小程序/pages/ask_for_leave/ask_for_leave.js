const config = require('../../config.js');
const app = getApp();
const util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    yearMonth: null,
    leaveDate: '',
    reason: '',
    phone: ''
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

  //获取输入的姓名
  onGetName: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  //获取输入的请假日期
  onGetLeaveDate: function (e) {
    this.setData({
      leaveDate: e.detail.value
    });
  },

  //获取输入的请假理由
  onGetReason: function (e) {
    this.setData({
      reason: e.detail.value
    })

  },

  //获取输入的手机号
  onGetPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },



  //请假
  onAskForLeave: function (e) {

    if (this.data.name == '' || this.data.leaveDate == '' || this.data.reason == '' || this.data.phone == '') {
      util.showModel('提交信息失败', '请输入完整的信息');
      return;
    }

    wx.request({
      //url: "http://127.0.0.1:8000/add_ask_for_leave/",
      url: config.service.askForLeaveUrl,
      data: {
        userId: app.globalData.userInfo.userId, //工号
        name: this.data.name,
        leaveDate: this.data.leaveDate,
        reason: this.data.reason,
        yearMonth: this.data.yearMonth,
        phone: this.data.phone
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "successful") {
          util.showSuccess('请假申请已提交');
        } else {
          util.showModel('提交信息失败', '当前日期已提交过，请等待审核');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  },

  getAskForLeave: function (e) {
    if (this.data.leaveDate == '') {
      util.showModel('提交信息失败', '请输入请假日期');
      return;
    }

    wx.request({
      //url: "http://127.0.0.1:8000/get_ask_for_leave/",
      url: config.service.getAskForLeaveUrl,

      data: {
        userId: app.globalData.userInfo.userId, //工号
        leaveDate: this.data.leaveDate,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "successful") {
          util.showSuccess('申请通过');
        }
        else if (res.data == "auditing") {
          util.showModel('审核中', '请耐心等待');
        }
        else {
          util.showModel('Failed', '您未提交申请该日期/审核不通过');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })


  }



})