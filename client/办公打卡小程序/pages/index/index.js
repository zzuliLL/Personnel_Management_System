const util = require('../../utils/util');
const app = getApp();
Page({

  turnToAuditing: function () {
    wx.navigateTo({
      url: '../ask_for_leave/auditing/auditing',
    })
  },

  turnToMeeting: function () {
    wx.navigateTo({
      url: '../meeting/meeting',
    })
  },

  turnToLogout: function () {
    wx.navigateTo({
      url: '../logout/logout',
    })
  },

  turnToSendNotice: function () {
    wx.navigateTo({
      url: '../notice/send_notice/send_notice',
    })
  },


  turnToAddUser: function () {
    wx.navigateTo({
      url: '../add_user/add_user',
    })
  },

  turnToGetFeedback: function () {
    wx.navigateTo({
      url: '../feedback/get_feedback/get_feedback',
    })
  }

})