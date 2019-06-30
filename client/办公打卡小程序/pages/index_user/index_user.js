const util = require('../../utils/util');
const app = getApp();
Page({
  turnToSign: function () {
    wx.navigateTo({
      url: '../sign/sign',
    })
  },

  turnToLeave: function () {
    wx.navigateTo({
      url: '../ask_for_leave/ask_for_leave',
    })
  },

  turnToLogout: function () {
    wx.navigateTo({
      url: '../logout/logout',
    })
  },

  turnToMeeting: function () {
    wx.navigateTo({
      url: '../meeting/meeting',
    })
  },

  turnToNotice: function () {
    wx.navigateTo({
      url: '../notice/notice',
    })
  },


  turnToRules: function () {
    wx.navigateTo({
      url: '../rules/rules',
    })
  },

  turnToFeedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }

})