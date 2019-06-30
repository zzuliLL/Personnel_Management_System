from django.conf.urls import url
from . import view

from django.contrib import admin
 

urlpatterns = [
	url(r'^admin/', admin.site.urls),
	url(r'^hello/$', view.hello),
    url(r'^login/$', view.login),
	url(r'^add_user/$', view.add_user),
	url(r'^sign/$', view.sign),
	url(r'^get_sign_date/$', view.get_sign_date),
	url(r'^add_ask_for_leave/$', view.add_ask_for_leave),
	url(r'^get_ask_for_leave/$', view.get_ask_for_leave),
	url(r'^ask_meeting/$', view.ask_meeting),
	url(r'^back_meeting/$', view.back_meeting),
	url(r'^push_feedback/$', view.push_feedback),
	url(r'^get_feedback/$', view.get_feedback),
	url(r'get_notice/$', view.get_notice),
	url(r'set_notice/$', view.set_notice),
	url(r'get_auditing/$', view.get_auditing),
	url(r'set_auditing/$', view.set_auditing),
	url(r'modifyPassword/$', view.modifyPassword)
	
]
