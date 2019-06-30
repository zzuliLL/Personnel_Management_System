from django.http import HttpResponse
from myapp.models import User, Sign, AskForLeave, Meeting, Feedback, Notice, Employee
from django.http import JsonResponse


# 数据库操作
#return HttpResponse(status=403)


def modifyPassword(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	userId_ = request.POST.get('userId')
	password_ = request.POST.get('password')
	
	cnt = User.objects.filter(userId=userId_).count()
	if cnt == 1:
		res = User.objects.get(userId=userId_)
		res.password = password_
		res.save()
		return HttpResponse('successful')
	return HttpResponse('failed')
	
	
	
def set_notice(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	yearMonth_ = request.POST.get('yearMonth')
	nowDate_ = request.POST.get('nowDate')
	announcement_ = request.POST.get('announcement')
	
	res = Notice(announcement=announcement_, yearMonth=yearMonth_, nowDate=nowDate_)
	res.save()
	return HttpResponse('successful')
	
	

def get_notice(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	yearMonth_ = request.POST.get('yearMonth')
	list = Notice.objects.filter(yearMonth=yearMonth_)
	response = []
	
	for var in list:
		response.append(var.nowDate + ': ' + var.announcement)
	
	return JsonResponse({'announcement': response})
	

def get_feedback(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	
	yearMonth_ = request.POST.get('yearMonth')
	list = Feedback.objects.filter(yearMonth=yearMonth_)
	response = []
	
	for var in list:
		response.append('userId: ' + var.userId + '\nadvice1: ' + var.advice1 + '\nadvice2: ' + var.advice2)
	
	return JsonResponse({'feedback': response})

def push_feedback(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	userId_ = request.POST.get('userId')
	advice1_ = request.POST.get('advice1')
	advice2_ = request.POST.get('advice2')
	yearMonth_ = request.POST.get('yearMonth')
	
	response = Feedback.objects.filter(userId=userId_, yearMonth=yearMonth_).count()
	if response >= 3:
		return HttpResponse("forbidden");
	feedback1 = Feedback(userId=userId_, advice1=advice1_, advice2=advice2_, yearMonth=yearMonth_)
	feedback1.save()
	return HttpResponse("successful")
	




def back_meeting(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	
	userId_ = request.POST.get('userId')
	status_ = False
	numberMeet_ = request.POST.get('numberMeet')
	
	response = Meeting.objects.filter(numberMeet = numberMeet_).count()
	
	if response == 0:
		return HttpResponse("forbidden");
	
	curMeet = Meeting.objects.get(numberMeet = numberMeet_)
	
	if curMeet.status == True and curMeet.userId == userId_:
		curMeet.userId = ''
		curMeet.status = False
		curMeet.save()
		return HttpResponse("successful")
	return HttpResponse("forbidden");
	
	

def ask_meeting(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	userId_ = request.POST.get('userId')
	status_ = True
	numberMeet_ = request.POST.get('numberMeet')
	
	response = Meeting.objects.filter(numberMeet = numberMeet_).count()
	
	if response == 0:
		meet = Meeting(userId=userId_, status=status_, numberMeet=numberMeet_)
		meet.save()
		return HttpResponse("successful")
	
	curMeet = Meeting.objects.get(numberMeet = numberMeet_)
	if curMeet.status == True:
		return HttpResponse("forbidden");
	curMeet.userId = userId_
	curMeet.status = status_
	curMeet.numberMeet = numberMeet_
	curMeet.save()
	return HttpResponse("successful")
		
def set_auditing(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	
	name_ = request.POST.get('name')
	leaveDate_ = request.POST.get('leaveDate')
	enable = request.POST.get('enable')
	
	response = AskForLeave.objects.filter(name=name_, leaveDate=leaveDate_).count()
	if response == 0:
		return HttpResponse('forbidden')
	
	
	if enable == '1':
		auditing = AskForLeave.objects.get(name=name_, leaveDate=leaveDate_)
		auditing.status = True
		auditing.save()
		return HttpResponse('successful')
	
	AskForLeave.objects.get(name=name_, leaveDate=leaveDate_).delete()
	
	return HttpResponse('successful')
	
		

def get_auditing(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	yearMonth_ = request.POST.get('yearMonth')
	
	list = AskForLeave.objects.filter(yearMonth=yearMonth_, status=False)
	
	auditing = []	
	for var in list:
		auditing.append('工号：' + var.userId + '\n姓名：' + var.name + '\n请假日期：' + var.leaveDate + '\n请假理由：' + var.reason + '\n手机号码：' + var.phone)
	
	return JsonResponse({'auditing': auditing})

		

def get_ask_for_leave(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	userId_ = request.POST.get('userId')
	leaveDate_ = request.POST.get('leaveDate')
	
	response = AskForLeave.objects.filter(userId=userId_, leaveDate = leaveDate_).count()
	if response == 1:
		leave = AskForLeave.objects.get(userId=userId_, leaveDate = leaveDate_)
		if leave.status == True:
			return HttpResponse("successful")
		else:
			return HttpResponse("auditing")
	return HttpResponse("faileded")


def add_ask_for_leave(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	userId_ = request.POST.get('userId')
	name_ = request.POST.get('name')
	leaveDate_ = request.POST.get('leaveDate')
	reason_ = request.POST.get('reason')
	phone_ = request.POST.get('phone')
	yearMonth_ = request.POST.get('yearMonth')
	
	response = AskForLeave.objects.filter(userId=userId_, leaveDate = leaveDate_).count()
	if response == 0:
		leave = AskForLeave(userId=userId_, name=name_, leaveDate=leaveDate_, reason=reason_, phone=phone_, yearMonth=yearMonth_, status=False)
		leave.save()
		return HttpResponse("successful")
	return HttpResponse("faileded")


def get_sign_date(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	userId_ = request.POST.get('userId')
	yearMonth_ = request.POST.get('yearMonth')
	nowDate_ = request.POST.get('nowDate')
	cnt = Sign.objects.filter(userId=userId_, yearMonth = yearMonth_).count()
	
	numPop = User.objects.all().count()
	numPop = numPop - 1
	if numPop <= 0:
		numPop = 1 
	curSign = Sign.objects.filter(nowDate=nowDate_).count()
	
	return JsonResponse({"count": cnt, "attendanceRate": round(1.0*curSign/numPop*100.0, 2)})
	


def sign(request):
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
		
	nowDate_ = request.POST.get('nowDate')
	userId_ = request.POST.get('userId')
	yearMonth_ = request.POST.get('yearMonth')
	
	
	response = Sign.objects.filter(userId=userId_, nowDate = nowDate_).count()
	if response == 0:
		sign1 = Sign(userId=userId_, nowDate=nowDate_, yearMonth=yearMonth_)
		sign1.save()
		return HttpResponse("successful")
	
	return HttpResponse("failed")

	


def add_user(request):	
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	
	userId_ = request.POST.get('userId')
	operate_ = request.POST.get('operate')
	cntUser = User.objects.filter(userId=userId_).count()
	cntEmployee = Employee.objects.filter(userId=userId_).count()
	
	if operate_ == '2':
		if cntUser == 1:
			User.objects.get(userId=userId_).delete()
			Employee.objects.get(userId=userId_).delete()
			return HttpResponse('successful')
		else:
			return HttpResponse('failed')
	
	yearMonth_ = request.POST.get('yearMonth')
	name_ = request.POST.get('name')
	phone_ = request.POST.get('phone')
	address_ = request.POST.get('address')
	identityCard_ = request.POST.get('identityCard')
	
	if cntUser == 1:
		if cntEmployee == 1:
			res = Employee.objects.get(userId=userId_)
			res.name = name_
			res.phone = phone_
			res.address = address_
			res.identityCard = identityCard_
			res.save()
		else:
			res = Employee(userId=userId_, name=name_, phone=phone_, identityCard=identityCard_, address=address_, yearMonth=yearMonth_)
			res.save()
	else:
		user_ = User(userId=userId_, password='000000')
		user_.save()
		
		res = Employee(userId=userId_, name=name_, phone=phone_, identityCard=identityCard_, address=address_, yearMonth=yearMonth_)
		res.save()	
	
	return HttpResponse('successful')



def hello(request):
	return HttpResponse("Hi, here is SLL-'s web server.")
	

def login(request):
	#fd = open('./test.txt', 'a+')
	#print('end', file = fd)
	
	if request.method == 'GET':
		return HttpResponse("Hi, here is SLL-'s web server.")
	
	userId_ = request.POST.get('userId')
	password_ = request.POST.get('password')
	
	cnt = User.objects.filter(userId=userId_).count()
	
	if cnt == 1:
		response = User.objects.get(userId=userId_)
		if response.password == password_:
			return HttpResponse("successful")
		return HttpResponse("failed")
		
	return HttpResponse("failed")
	
