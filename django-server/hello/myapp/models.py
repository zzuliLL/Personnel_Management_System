from django.db import models

class User(models.Model):
	userId = models.CharField(max_length=33)
	password = models.CharField(max_length=33)
	
class Employee(models.Model):
	userId = models.CharField(max_length=33)
	name = models.CharField(max_length=33)
	identityCard = models.CharField(max_length=20)
	address = models.CharField(max_length=77)	
	phone = models.CharField(max_length=18)
	yearMonth = models.CharField(max_length=33)
	
class Sign(models.Model):
	userId = models.CharField(max_length=33)
	nowDate = models.CharField(max_length=33)
	yearMonth = models.CharField(max_length=33)

class AskForLeave(models.Model):
	userId = models.CharField(max_length=33)
	name = models.CharField(max_length=33)
	leaveDate = models.CharField(max_length=33)
	reason = models.CharField(max_length=77)
	phone = models.CharField(max_length=33)
	yearMonth = models.CharField(max_length=33)
	status = models.BooleanField()
	
class Meeting(models.Model):
	userId = models.CharField(max_length=33)
	status = models.BooleanField()
	numberMeet = models.PositiveIntegerField()
	
class Feedback(models.Model):
	userId = models.CharField(max_length=33)
	advice1 = models.CharField(max_length=77)
	advice2 = models.CharField(max_length=77)
	yearMonth = models.CharField(max_length=33)
	
class Notice(models.Model):
	announcement = models.CharField(max_length=77)
	yearMonth = models.CharField(max_length=33)
	nowDate = models.CharField(max_length=33)