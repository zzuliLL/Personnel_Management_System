const config = require('../../../config.js');
const app = getApp();
const util = require('../../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    leaveDate: '',
    enable: ''
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

  onGetEnable: function (e) {
    this.setData({
      enable: e.detail.value
    });
  },

  onAgreeLeave: function (e) {

    if (this.data.name == '' || this.data.leaveDate == '' || this.data.enable == '') {
      util.showModel('提交信息失败', '请输入完整的信息');
      return;
    }

    wx.request({
      url: config.service.setAuditingUrl,
      data: {
        name: this.data.name,
        leaveDate: this.data.leaveDate,
        enable: this.data.enable
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "successful") {
          util.showSuccess('已审核');
        } else {
          util.showModel('提交信息失败', '该假条已审核/无此假条');
        }
        wx.redirectTo({
          url: '../auditing/auditing',
        })
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  }

})