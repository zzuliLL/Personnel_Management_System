//var host = 'http://127.0.0.1:8000';
var host = 'http://47.102.100.216:8000';
const config = {

  service: {
    loginUrl: `${host}/login/`,
    signDateUrl: `${host}/get_sign_date/`,
    signUrl: `${host}/sign/`,
    askMeetingUrl: `${host}/ask_meeting/`,
    backMeetingUrl: `${host}/back_meeting/`,
    askForLeaveUrl: `${host}/add_ask_for_leave/`,
    getAskForLeaveUrl: `${host}/get_ask_for_leave/`,
    auditingUrl: `${host}/get_auditing/`,
    setAuditingUrl: `${host}/set_auditing/`,
    getNoticeUrl: `${host}/get_notice/`,
    sendAnnouncementUrl: `${host}/set_notice/`,
    feedbackUrl: `${host}/push_feedback/`,
    getFeedbackUrl: `${host}/get_feedback/`,
    addUserUrl: `${host}/add_user/`,
    modifyPasswordUrl: `${host}/modifyPassword/`,

  }
};

module.exports = config;