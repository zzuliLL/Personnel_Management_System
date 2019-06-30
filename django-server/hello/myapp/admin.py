from django.contrib import admin

from myapp.models import User, Sign, AskForLeave, Meeting, Feedback, Notice, Employee
 
# Register your models here.
admin.site.register(User)
admin.site.register(Sign)
admin.site.register(AskForLeave)
admin.site.register(Meeting)
admin.site.register(Feedback)
admin.site.register(Notice)
admin.site.register(Employee)
