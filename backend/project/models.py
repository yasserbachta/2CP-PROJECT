from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

#Abd3lhadi
genders = (
    ('M', 'Male'),
    ('F', 'Female'),
)

grades = (
    ('P', 'Primaire'),
    ('M', 'CEM'),
    ('S', 'Lycée')
)


class Notifications(models.Model):
    Description = models.CharField(max_length=100)
    Date = models.DateField()
    Type =  models.CharField(max_length=50)

    class Meta:
        db_table = 'Notifications'
        #ordering = ['-created']

#Custom user model
class User(AbstractUser): #1
    #to indicate different user roles
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    pfp = models.TextField(null=True, blank=True)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    def __str__(self):
	    return self.username

class Module(models.Model): #4
    module = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'Modules'
        
    def __str__(self):
        return self.module


class Admin(models.Model):
    admin_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name='admin')
    
    nom = models.CharField(max_length=50)
    prénom = models.CharField(max_length=50)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=50, null=True, blank=True)
    about = models.TextField(default=" ",null=True, blank=True)
    location = models.CharField(max_length=50, null=True, blank=True)
    
class Teacher(models.Model): #2
    teacher_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name='teacher')
    Notifications = models.ManyToManyField(Notifications )
    nom = models.CharField(max_length=50)
    prénom = models.CharField(max_length=50)
    gender = models.CharField(max_length=1, choices=genders)
    phone_num = models.CharField(max_length=10, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=50, null=True, blank=True)
    module = models.ForeignKey(Module , on_delete=models.PROTECT )
    about = models.TextField(default=" ",null=True, blank=True)
    location = models.CharField(max_length=50, null=True, blank=True)
    
    #to change the table name in DB
    class Meta:
        db_table = 'Teacher'
        
    def __str__(self):
        return self.nom + " " + self.prénom


class AcademicYear(models.Model):
    
    Title=models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return self.Title




class classes(models.Model): #5

    #niveau= models.CharField(max_length=50)
    niveau= models.CharField(max_length=50, choices=grades)
    année = models.CharField(max_length=50)
    num_classe = models.CharField(max_length=50)
    teacher = models.ManyToManyField(Teacher, related_name='classes')
    AcademicYear=models.ForeignKey(AcademicYear , on_delete=models.PROTECT)
    Modules = models.ManyToManyField(Module)
    class Meta:
        db_table = 'Classes'
        
    def __str__(self):
        if self.niveau == "CEM" or self.niveau == "M":
            self.niveau = "M"
        elif self.niveau == "Lycée" or self.niveau == "S":
            self.niveau = "S"
        else: self.niveau = "P"
        return self.année + self.niveau + self.num_classe



class Student(models.Model): #3
    student_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True, related_name='student')
    
    nom = models.CharField(max_length=50)
    prénom = models.CharField(max_length=50)
    parent_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=1, choices=genders)
    phone_num = models.CharField(max_length=10, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    password = models.CharField(max_length=50, null=True, blank=True)
    grade = models.CharField(max_length=50, choices=grades)
    classe = models.ForeignKey(classes, on_delete=models.SET_NULL, null=True, blank=True)
    Notifications = models.ManyToManyField(Notifications )
    class Meta:
        db_table = 'Student'
        
    def __str__(self):
        return self.nom + " " + self.prénom


           
class absence(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    date = models.DateField()
    module = models.ForeignKey('Module', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Absences'

class events(models.Model):
    title = models.CharField(max_length=100,default='')  # New field for event title
    eventdate = models.DateField()
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField()
    is_voting_event = models.BooleanField(default=False)  # New field for voting event 
    
    # students who have voted yes
    yes_voters = models.ManyToManyField(User, related_name='yes_voters', blank=True)
    
    #  students who have voted no
    no_voters = models.ManyToManyField(User, related_name='no_voters', blank=True)

    class Meta:
        db_table = 'Events'
        ordering = ['-eventdate', '-start']

class reactions(models.Model):
    event = models.ForeignKey('events', on_delete=models.CASCADE)
    reaction = models.BooleanField()
    student = models.ForeignKey('Student', on_delete=models.CASCADE)

    class Meta:
        db_table = 'Reactions'



class courses(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    file = models.TextField(max_length=1000)
    #pic = models.ImageField(upload_to='courses_pics', blank=True)
    type= models.CharField(max_length=50)
    Class = models.ForeignKey(classes , on_delete=models.PROTECT)
    
    class Meta:
        db_table = 'Courses'
        ordering = ['-created']
    
    def __str__(self):
        return self.title
    

class comments(models.Model):
    comment = models.TextField()
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    course = models.ForeignKey(courses, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Comments'
        ordering = ['-created']



