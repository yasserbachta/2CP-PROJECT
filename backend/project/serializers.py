from rest_framework import serializers
from .models import (User, Teacher, Student, Admin, Module, 
                    classes, absence, events,
                    reactions, comments, courses)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import csv
from . import models

#functions to generate username and password for each User (teacher/student)
#
def generate_username(nom,prénom):
    username = prénom[0] + '_' + nom
    username = username.lower()
    if User.objects.filter(username=username).exists():
        username = prénom[:2] + '_' + nom
        username = username.lower()
        if User.objects.filter(username=username).exists(): username = prénom[:3] + '_' + nom
    username = username.lower()
    return username

def generate_pass(nom,prénom):
    password = nom + '_' + prénom
    password = password.lower()
    return password
#
class ClasseListingSerializer(serializers.RelatedField):
    
    def to_representation(self, value):
        if value.niveau == "CEM" or value.niveau == "M":
            value.niveau = "M"
        elif value.niveau == "Lycée" or value.niveau == "S":
            value.niveau = "S"
        else: value.niveau = "P"
        return value.année + value.niveau + value.num_classe

class TeacherSerializer(serializers.ModelSerializer):
    classes = serializers.StringRelatedField(many=True, read_only=True)
    module = serializers.StringRelatedField()
    pfp = serializers.CharField(source='user.pfp')
    
    class Meta:
        model = Teacher
        fields = ['teacher_id','nom','prénom','gender','phone_num','email','password','module','classes','about','location','pfp']


class BasicTeacherSerializer(serializers.ModelSerializer):
    module = serializers.StringRelatedField()
    pfp = serializers.CharField(source='user.pfp')
    
    class Meta:
        model = Teacher
        fields = ['teacher_id','nom','prénom','gender','phone_num','email','password','module','classes','about','location','pfp']


class StudentSerializer(serializers.ModelSerializer):
    classe = serializers.StringRelatedField(many=False , read_only=False)
    pfp = serializers.CharField(source='user.pfp')
    classe_id =  serializers.IntegerField()
    
    class Meta:
        model = Student
        fields = ['student_id','nom','prénom','phone_num','email','password','parent_name','gender','grade','classe','pfp','classe_id']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer): #LOGIN JWT
    @classmethod
    def get_token(cls, user):
        print("get_token method called for user:", user)
        print("\n\n###################################################################\n\n")
        token = super().get_token(user)
        print(user)
        print(token)
        if user.is_teacher :
            print("\n\n################################teacher###################################\n\n")
            t = Teacher.objects.get(user=user)
            tea = TeacherSerializer(t).data
            
            token['teacher_id'] = t.teacher_id
            token['nom'] = t.nom
            token['prénom'] = t.prénom
            token['role'] = 'teacher'
            token['classes'] = tea["classes"]
            token['phone_num'] = t.phone_num
            token['gender'] = t.gender
            token['module'] = tea["module"]
            token['email'] = t.email
            token['password'] = t.password
            token['pfp'] = user.pfp
            token['location'] = t.location
            token['about'] = t.about
            
        elif user.is_student :
            print("\n\n################################student###################################\n\n")
            s = Student.objects.get(user=user)
            stu = StudentSerializer(s).data
            
            token['student_id'] = s.student_id
            token['nom'] = s.nom
            token['prénom'] = s.prénom
            token['role'] = 'student'
            token['classe'] = stu["classe"]
            token['parent_name'] = s.parent_name
            token['phone_num'] = s.phone_num
            token['gender'] = s.gender
            token['grade'] = s.grade
            token['email'] = s.email
            token['password'] = s.password
            token['pfp'] = user.pfp
            token['classe_id'] = stu['classe_id']
            
        elif user.is_admin or user.is_staff:
            print("\n\n###############################admin####################################\n\n")
            ad = Admin.objects.get(user=user)
            token['nom'] = ad.nom
            token['prénom'] = ad.prénom
            token['role'] = 'admin'
            token['email'] = ad.email
            token['username'] = user.username
            token['password'] = ad.password
            token['location'] = ad.location
            token['about'] = ad.about
            token['pfp'] = user.pfp
            

        print(token)
        return token

"""class TeacherRegistrationSerializer(serializers.ModelSerializer):
    profile =TeacherSerializer(required=False)
    
    class Meta:
        model = Teacher
        fields = ['profile','module']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(username=generate_username(profile_data['nom'],profile_data['prénom']),
                                   password=generate_pass(profile_data['nom'],profile_data['prénom']))
        user.is_teacher = True
        user.save()
        Teacher.objects.create(
            user=user,
            nom=profile_data['nom'],
            prénom=profile_data['prénom'],
            gender=profile_data['gender'],
            phone_num=profile_data['phone_num'],
            email=profile_data['email'],
            password=generate_pass(profile_data['nom'],profile_data['prénom']),
            about=profile_data['about'],
            module=validated_data['module'],
            location=profile_data['location'],
        )
        return user

class StudentRegistraionSerializer(serializers.ModelSerializer):
    profile = StudentSerializer(required=False)
    
    class Meta:
        model = Student
        fields = ['profile','classe']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(username=generate_username(profile_data['nom'],profile_data['prénom']),
                                   password=generate_pass(profile_data['nom'],profile_data['prénom']))
        user.is_student = True
        user.save()
        Student.objects.create(
            user=user,
            nom=profile_data['nom'],
            prénom=profile_data['prénom'],
            phone_num=profile_data['phone_num'],
            email=profile_data['email'],
            password=generate_pass(profile_data['nom'],profile_data['prénom']),
            parent_name=profile_data['parent_name'],
            grade=profile_data['grade'],
            gender=profile_data['gender'],
            classe=validated_data['classe']
        )
        return user"""




###########>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<#########

class AbsenceSerializer(serializers.ModelSerializer):
    module = serializers.StringRelatedField(many=False)
    student = serializers.StringRelatedField(many=False)
    
    class Meta:
        model = absence
        fields = ['id' , 'student','date','module']


class AbsenceWriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = absence
        fields = ['student','date','module']



class ModuleSerializer(serializers.ModelSerializer):
     class Meta:
         model = models.Module
         fields = ['id','module']

class AcademicYearSerializer(serializers.ModelSerializer):
     class Meta:
         model = models.AcademicYear
         fields = ['id','Title']

class ClassSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(many=True)
    AcademicYear =  serializers.StringRelatedField(many=False)
    Modules =  serializers.StringRelatedField(many=True)
    
    class Meta:
        
        model = models.classes
        fields = ['id' , 'niveau' , 'année' , 'num_classe' , 'teacher' ,'AcademicYear' , 'Modules' ]


class SpecialClassSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(many=True)
    AcademicYear =  serializers.StringRelatedField(many=False)
    Modules =  serializers.StringRelatedField(many=True)
    teacher_ids = serializers.PrimaryKeyRelatedField(many=True, read_only=True, source='teacher') 
    modules_ids = serializers.PrimaryKeyRelatedField(many=True, read_only=True, source='Modules') 
    class Meta:
        
        model = models.classes
        fields = ['id' , 'niveau' , 'année' , 'num_classe' , 'teacher' ,'AcademicYear' , 'Modules' ,'modules_ids'  , 'teacher_ids'  ]


class ClassWriteSerializer(serializers.ModelSerializer):
        
    class Meta:
        
        model = models.classes
        fields = ['id' , 'niveau' , 'année' , 'num_classe' , 'teacher' ,'AcademicYear' , 'Modules' ]

class BasicClassSerializer(serializers.ModelSerializer):

    AcademicYear =  serializers.StringRelatedField(many=False)
    class Meta:
        model = models.classes
        fields = ['id' , 'niveau' , 'année' , 'num_classe' ,'AcademicYear'  , '__str__' ]



class ClassStudentSerializer(serializers.ModelSerializer):
    #  User_id = serializers.IntegerField(read_only=True)
     #user = serializers.PrimaryKeyRelatedField(queryset=mod.User.objects.all() , allow_null=True)

     class Meta:
         model = models.Student
         fields = '__all__'

     





class CourseSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(many=not True)
    Class = serializers.StringRelatedField(many=not True)
    module = serializers.StringRelatedField(many= False)
   

    class Meta:
         #Teacher= TeacherSerializer()
         

         model = models.courses
         fields = ['id', 'teacher' , 'title' ,'file' , 'Class' , 'module' ,
                    'description' , 'created' , 'type' ]


class CourseWriteSerializer(serializers.ModelSerializer):
  
    class Meta:
         #Teacher= TeacherSerializer()
        
         
         model = models.courses
         fields = ['teacher' , 'title' ,'file' , 'Class' , 'module' ,
                    'description' , 'created'  , 'type']

    




class BasicCourseSerializer(serializers.ModelSerializer):
     class Meta:
         Teacher= TeacherSerializer()

         model = models.courses
         fields = ['id' , 'title' ,'file' , 'Class' , 'module' ,
                    'description' , 'created' , 'type']



class CommentsSerializer(serializers.ModelSerializer):
    student=StudentSerializer(many=not True)
    class Meta:
         
         model = models.comments
         fields = ['id' , 'student' , 'comment' ]
    
    def create(self, validated_data): 
        Course_id=self.context['Course_id']
        print(Course_id)
        return models.comments.objects.create(course_id=Course_id , **validated_data)
 

class CommentsWriteSerializer(serializers.ModelSerializer):
    
    class Meta:
         
         model = models.comments
         fields = ['id' , 'student' , 'comment' ]
    
    def create(self, validated_data): 
        Course_id=self.context['Course_id']
        print(Course_id)
        print(validated_data)
        return models.comments.objects.create(course_id=Course_id , **validated_data)
       

    
# class CourseModuleSerializer(serializers.ModelSerializer):
     
#      class Meta:
#          Courses = CourseSerializer()
#          model = models.Module
#          fields = ['id','Title' , 'Courses']

class CourseForClassSerializer(serializers.ModelSerializer):
     
     class Meta:
        model = models.courses
        fields = ['id', 'teacher' , 'title' ,'file'  , 'module' ,
                    'description' , 'created' , 'type' ]
        
        
# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = events
#         title = serializers.CharField(max_length=100)
#         yes_voters = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#         no_voters = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
#         fields = ['id', 'eventdate', 'start', 'end', 'description', 'title', 'is_voting_event', 'yes_voters', 'no_voters']
        