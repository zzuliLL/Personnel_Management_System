const config = require('../../config.js');
const app = getApp();
const util = require('../../utils/util');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    userId: '',
    identityCard: '',
    address: '',
    yearMonth: null,
    phone: '',
    operate: ''
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

  onGetUserId: function (e) {
    this.setData({
      userId: e.detail.value
    });
  },

  onGetIdentityCard: function (e) {
    this.setData({
      identityCard: e.detail.value
    });
  },

  onGetAddress: function (e) {
    this.setData({
      address: e.detail.value
    });
  },

  //获取输入的手机号
  onGetPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  onGetOperate: function (e) {
    this.setData({
      operate: e.detail.value
    });
  },


  onAddUser: function (e) {
    if (this.data.operate == '') {
      util.showModel('提交信息失败', '请输入操作选项');
      return;
    }

    if (this.data.operate == '2') {
      if (this.data.userId == '') {
        util.showModel('提交信息失败', '删除员工需要输入工号');
        return;
      }
    }
    else if (this.data.name == '' || this.data.userId == '' || this.data.identityCard == '' || this.data.phone == '' || this.data.address == '') {
      util.showModel('提交信息失败', '添加/更新信息不完整');
      return;
    }

    wx.request({
      url: config.service.addUserUrl,
      data: {
        userId: this.data.userId,
        name: this.data.name,
        identityCard: this.data.identityCard,
        address: this.data.address,
        yearMonth: this.data.yearMonth,
        phone: this.data.phone,
        operate: this.data.operate
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == "successful") {
          util.showSuccess('操作成功');
        } else {
          util.showModel('提交信息失败', '无此员工/员工信息冲突');
        }
      },
      fail: function (res) {
        util.showModel('提交信息失败', '请检查网络');
      }
    })

  },


})