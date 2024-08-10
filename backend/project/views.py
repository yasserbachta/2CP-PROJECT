from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .serializers import (TeacherSerializer, StudentSerializer, MyTokenObtainPairSerializer,
                          generate_pass, generate_username , BasicClassSerializer,  BasicCourseSerializer , 
                          CourseForClassSerializer,ClassStudentSerializer  ,ClassSerializer , CourseSerializer , 
                          AbsenceSerializer  , ModuleSerializer , AcademicYearSerializer , CommentsSerializer,)
from .models import Teacher, Student, User, classes, Module
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
import csv
from . import models
from rest_framework import generics
from rest_framework import status
from rest_framework.viewsets import ModelViewSet ,GenericViewSet
from rest_framework.decorators import action
from . import serializers

from django.db import connection, transaction


class LoginView(TokenObtainPairView): #LOGIN VIEW (JWT)
    
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView): #LOGOUT
    permission_classes = (IsAuthenticated)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

"""class StudentAddView(APIView):
    serializer_class = StudentRegistraionSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Student registered  successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)"""

class StudentAddView(APIView):
    serializer_class = StudentSerializer
    #IsAuthenticated , IsAdminUser
    permission_classes = [IsAdminUser, IsAuthenticated]
 ##<>
    def post(self, request):
        user = User.objects.create_user(username=generate_username(request.data['nom'],request.data['prénom']),
                                   password=generate_pass(request.data['nom'],request.data['prénom']))
        user.is_student = True
        user.save()
        classe = classes.objects.get(id=request.data['classe'])
        Student.objects.create(
            user=user,
            nom=request.data['nom'],
            prénom=request.data['prénom'],
            gender=request.data['gender'],
            phone_num=request.data['phone_num'],
            email=request.data['email'],
            password=generate_pass(request.data['nom'],request.data['prénom']),
            parent_name=request.data['parent_name'],
            classe=classe,
            grade=request.data['grade'],
        )
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Student registered successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
    
from io import StringIO
class StudentCSVView(APIView):
    permission_classes = [IsAuthenticated , IsAdminUser]
    
    def post(self, request):
        content = StringIO(request.FILES['csv_file'].read().decode('latin-1'))
        reader = csv.reader(content)
        counter = 0
        for row in islice(reader, 1, None):
            nom = row[0]
            prénom = row[1]
            gender = row[2]
            parent_name = row[3]
            phone_num = row[4]
            email = row[5]
            grade = row[6]
            if row[7] == '':
                pass
            else:
                classe = classes.objects.get(id=row[7])
            
            user = User.objects.create_user(username=generate_username(nom,prénom),
                                password=generate_pass(nom,prénom))
            user.is_student = True
            user.save()
            Student.objects.create(
                user=user,
                nom=nom,
                prénom=prénom,
                gender=gender,
                parent_name=parent_name,
                phone_num=phone_num,
                email=email,
                password=generate_pass(nom,prénom),
                grade=grade,
                classe=classe
            )
            counter += 1
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': str(counter)+' Students registered  successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
    
"""class TeacherAddView(APIView):
    serializer_class = TeacherRegistrationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Teacher registered  successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)"""

class TeacherAddView(APIView):
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.user)
        user = User.objects.create_user(username=generate_username(request.data['nom'],request.data['prénom']),
                                   password=generate_pass(request.data['nom'],request.data['prénom']))
        user.is_teacher = True
        user.save()
        module = Module.objects.get(id=request.data['module'])
        Teacher.objects.create(
            user=user,
            nom=request.data['nom'],
            prénom=request.data['prénom'],
            gender=request.data['gender'],
            phone_num=request.data['phone_num'],
            email=request.data['email'],
            password=generate_pass(request.data['nom'],request.data['prénom']),
            about=request.data['about'],
            module=module,
            location=request.data['location'],
        )
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Teacher registered successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)

from itertools import islice
class TeacherCSVView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        content = StringIO(request.FILES['csv_file'].read().decode('latin-1'))
        reader = csv.reader(content)
        counter = 0
        for row in islice(reader, 1, None):
            nom = row[0]
            prénom = row[1]
            gender = row[2]
            phone_num = row[3]
            email = row[4]
            about = row[5]
            location = row[7]
            if row[6] == '':
                module = None
            else:
                module= Module.objects.get(id=row[6])
            user = User.objects.create_user(username=generate_username(nom,prénom),
                                password=generate_pass(nom,prénom))
            user.is_teacher= True
            user.save()
            Teacher.objects.create(
                user=user,
                nom=nom,
                prénom=prénom,
                gender=gender,
                phone_num=phone_num,
                email=email,
                password=generate_pass(nom,prénom),
                about=about,
                module=module,
                location=location
            )
            counter += 1
        
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': str(counter)+' Teachers registered  successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_teachers(request):
    print(request.user)
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return JsonResponse(serializer.data, safe=False)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_teachers2(request):
    print(request.user)
    teachers = Teacher.objects.all()
    serializer =serializers.BasicTeacherSerializer(teachers, many=True)
    return JsonResponse(serializer.data, safe=False)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_teacher(request, teacher_id):
    try:
        teacher = Teacher.objects.get(teacher_id=teacher_id)
        serializer = TeacherSerializer(teacher)
        return JsonResponse(serializer.data)
    except Teacher.DoesNotExist:
        err = {'error': 'Teacher not found'}
        return JsonResponse(err , status=400)
    

    


@api_view(['GET'])
@permission_classes([AllowAny])
def get_class_detail( request, teacher_id):
    try:
        print("\n\n\n\n\n\n*********",teacher_id,"*********\n\n\n\n\n\n")
        print("hrlooooooooooooooooooooooooooooooooooooooo")
        #teacher = models.Teacher.objects.get(teacher_id=teacher_id)  

        classes = models.classes.objects.raw("select * from Classes where Classes.id in( select Classes_teacher.classes_id from Classes_teacher where Classes_teacher.teacher_id=%s);" , [teacher_id]) # Assuming 'class_set' is the related name for the Class model
        serializer = BasicClassSerializer(classes, many=True)  # Assuming you have a serializer for the Class model named 'ClassSerializer'
        return Response(serializer.data)
    except models.classes.DoesNotExist:
       err = {'error': 'Teacher not found'}
       return JsonResponse(err , status=404)



# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_teacher_courses_in_modules(request, teacher_id):
#     module_id = request.query_params.get('module_id')
#     class_id = request.query_params.get('class_id')
#     if not class_id or not module_id:
#         return Response({"error": "Please provide class_id and module_id as query parameters"}, status=400)
#     courses = models.classes.objects.filter(module_id=module_id, class_id=class_id)
#     serializer = BasicCourseSerializer(courses, many=True)
#     return Response(serializer.data)
    


@api_view(['GET'])
@permission_classes([AllowAny])
def get_teacher2(request, teacher_id):
    try:
        teacher = Teacher.objects.get(teacher_id=teacher_id)
        serializer =serializers.BasicTeacherSerializer(teacher)
        return JsonResponse(serializer.data)
    except Teacher.DoesNotExist:
        err = {'error': 'Teacher not found'}
        return JsonResponse(err , status=404)
    


class TeacherUpdateView(generics.UpdateAPIView):
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]

    def put(self, request, teacher_id):
        teacher = Teacher.objects.get(teacher_id=teacher_id)
        module = Module.objects.get(id=request.data['module'])
        
        teacher.nom = request.data['nom']
        teacher.prénom = request.data['prénom']
        teacher.gender = request.data['gender']
        teacher.phone_num = request.data['phone_num']
        teacher.email = request.data['email']
        teacher.module= module
        teacher.about = request.data['about']
        teacher.location = request.data['location']
        
        teacher.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Teacher Updated successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
    
class TeacherDeleteView(generics.DestroyAPIView):
    
    print("\n\ helooooooooooooooooo mf   \n\n")
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]
    
    def delete(self, request, teacher_id):
        try:
            teacher = Teacher.objects.get(teacher_id=teacher_id)
            user = User.objects.get(id=teacher.user_id)
            teacher.delete()
            user.delete()
            return JsonResponse({'message': 'Teacher deleted successfully'})
        except Teacher.DoesNotExist:
            err = {'error': 'teacher not found'}
            return JsonResponse(err , status=404)

@api_view(['GET'])
#IsAuthenticated , IsAdminUser
@permission_classes([AllowAny])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_student(request, student_id):
    try:
        student = Student.objects.get(student_id=student_id)
        serializer = StudentSerializer(student)
        return JsonResponse(serializer.data)
    except Teacher.DoesNotExist:
        err = {'error': 'Student not found'}
        return JsonResponse(err , status=404)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_student_absences( request, student_id):
    try:
        # print("\n\n\n\n\n\n*********",student_id,"*********\n\n\n\n\n\n")
        # print("hrlooooooooooooooooooooooooooooooooooooooo")
        #teacher = models.Teacher.objects.get(teacher_id=teacher_id)  
        absences =  models.absence.objects.filter(student=student_id)
        serializer = serializers.AbsenceSerializer(absences, many=True)  # Assuming you have a serializer for the Class model named 'ClassSerializer'
        return Response(serializer.data)
    except models.classes.DoesNotExist:
       err = {'error': 'absence not found'}
       return JsonResponse(err , status=404)


class StudentUpdateView(generics.UpdateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated , IsAdminUser]

    def put(self, request, student_id):
        student = Student.objects.get(student_id=student_id)
        classe = classes.objects.get(id=request.data['classe'])
        student.nom = request.data['nom']
        student.prénom= request.data['prénom']
        student.gender  = request.data['gender']
        student.phone_num = request.data['phone_num']
        student.email = request.data['email']
        student.parent_name= request.data['parent_name']
        student.classe = classe
        student.grade = request.data['grade']
        student.save()
        response = {
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'Student Updated successfully',
            }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)

class StudentDeleteView(generics.DestroyAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated , IsAdminUser]
    
    def delete(self, request, student_id):
        student = Student.objects.get(student_id=student_id)
        user = User.objects.get(id=student.user_id)
        student.delete()
        user.delete()
        return JsonResponse({'message': 'Student deleted successfully'})

from .models import Admin
class ProfileUpdate(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        if user.is_admin or user.is_staff:
            admin = Admin.objects.get(user=user)
            admin.nom = request.data['nom']
            admin.prénom = request.data['prénom']
            admin.about = request.data['about']
            admin.location = request.data['location']
            admin.email = request.data['email']
            user.username = request.data['username']
            user.set_password(request.data['password'])
            admin.password = request.data['password']
            user.pfp = request.data['pfp']
            admin.save()
            user.save()
        elif user.is_student:
            student = Student.objects.get(user=user)
            student.phone_num = request.data['phone_num']
            student.email = request.data['email']
            user.set_password(request.data['password'])
            student.password = request.data['password']
            user.pfp = request.data['pfp']
            student.save()
            user.save()
        elif user.is_teacher:
            teacher = Teacher.objects.get(user=user)
            teacher.phone_num = request.data['phone_num']
            teacher.email = request.data['email']
            user.set_password(request.data['password'])
            teacher.password = request.data['password']
            teacher.about = request.data['about']
            teacher.location = request.data['location']
            user.pfp = request.data['pfp']
            teacher.save()
            user.save()
            
        #refresh = RefreshToken.for_user(user)
        token = MyTokenObtainPairSerializer.get_token(user)
        response = {
            'refresh': str(token),
            'access': str(token.access_token),
            'success' : 'True',
            'status code' : status.HTTP_200_OK,
            'message': 'profile Updated successfully',
        }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)
    
class StudentsDelete(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated , IsAdminUser]
    
    def delete(self, request):
        student_ids = request.data['students_ids']
        for student_id in student_ids:
            student = Student.objects.get(student_id=student_id)
            user = User.objects.get(id=student.user_id)
            student.delete()
            user.delete()
        return JsonResponse({'message': 'Students deleted successfully'})
    












########<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#########
# read the documentation and decide if you used this shit or not
# class TeacherViewSet(ModelViewSet):
    
#     queryset=models.Teacher.objects.all()

#     serializer_class = TeacherSerializer

#     permission_classes = [IsAuthenticated, IsAdminUser]
     
#     #permission_classes=[permission.IsAdmin]
#     #permission_classes=[IsAdminOrReadOnly]

   
#     #permission_classes=[permission.IsAdmin]
#     #permission_classes=[IsAdminOrReadOnly]
#     def Classes(self, request, pk=None):

#         print("\n\n\n\n\n\n*********",pk,"*********\n\n\n\n\n\n")
#         teacher = self.get_object()
#         classes = models.classes.objects.raw("select * from School_class where School_class.id in( select School_class_Teacher.class_id from School_class_Teacher where School_class_Teacher.teacher_id=%s);" , [pk]) # Assuming 'class_set' is the related name for the Class model
#         serializer = BasicClassSerializer(classes, many=True)  # Assuming you have a serializer for the Class model named 'ClassSerializer'
#         return Response(serializer.data)

    
#     @action(detail=True, methods=['get'])
#     def class_detail(self, request, pk=None, class_id=None):
#         teacher = self.get_object()
#         try:
#             class_obj = models.classes.objects.get(pk=class_id)
#             serializer = ClassSerializer(class_obj)  # Assuming you have a serializer for the Class model named 'ClassSerializer'
#             return Response(serializer.data)
#         except models.classes.DoesNotExist:
#             return Response({"detail": "Class not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
#     @action(detail=True, methods=['get'])
#     def Modules(self, request, pk=None ,  class_id=None ):
#         print("\n\n\n\n\nhello 1\n\n\n\n")
#         class_instance = self.get_object()
#         print("\n\n\n\n\nhello 2\n\n\n\n")
#         if not class_id:
#             return Response({"error": "Please provide module_id as query parameter"}, status=400)
#         modules = models.Teacher.objects.get(id=pk).Modules
#         # courses = models.Course.objects.filter(Class=class_instance, Module=module)
#         serializer = ModuleSerializer(modules, many=True)
#         return Response(serializer.data)

#     @action(detail=True, methods=['GET' ])
#     def TeacherCoursesInModules(self, request, pk=None ):
#         teacher_instance = self.get_object()
#         module_id=1
#         class_id=1
#         print("\n\n\n\n\nhello 1\n\n\n\n")
#         print("\n\n\n\n\nhello 2\n\n\n\n")
#         if not class_id or not module_id:
#             return Response({"error": "Please provide module_id as query parameter"}, status=400)
#         courses = models.courses.objects.filter(Module=module_id , Class=class_id)
#         # courses = models.Course.objects.filter(Class=class_instance, Module=module)
#         serializer = BasicCourseSerializer(courses, many=True)
#         return Response(serializer.data)

class AbsenceViewSet(ModelViewSet):

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT' , 'PATCH']:
            return serializers.AbsenceWriteSerializer
        return AbsenceSerializer

    permission_classes = [AllowAny]
    queryset=models.absence.objects.select_related("student").select_related("module").all()

    #permission_classes=[permission.IsTeacherOrAdmin]

class ModuleViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset=models.Module.objects.all()
    serializer_class=ModuleSerializer
    #permission_classes=[permission.IsAdmin]

class AcademicYearViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset=models.AcademicYear.objects.all()
    serializer_class=AcademicYearSerializer
    #permission_classes=[permission.IsAdmin]
    #permission_classes=[IsAdminOrReadOnly]

#####################""

class CourseViewSet(ModelViewSet):

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT' , 'PATCH']:
            return serializers.CourseWriteSerializer
        return CourseSerializer

    permission_classes = [AllowAny]
#    queryset=models.Course.objects.select_related("Teacher").select_related("Teacher__User").select_related("Class").all()
    queryset=models.courses.objects.select_related("teacher").select_related("Class").all()




    
     


    


# class CommentsViewSet(ModelViewSet):



#     permission_classes = [AllowAny]
#     #    queryset=models.Event.objects.select_related("Course").select_related("Student").all()
#     queryset=models.comments.objects.all()
#     def get_serializer_class(self):
#         if self.request.method in ['POST', 'PUT' , 'PATCH']:
#             return serializers.CommentsWriteSerializer
#         return CommentsSerializer

class CommentsViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = models.comments.objects.all()
    
    def get_queryset(self):
        # Get the course ID from URL kwargs
        course_id = self.kwargs.get('Course_pk')
        # Filter comments based on the course ID
        return self.queryset.filter(course_id=course_id)
    
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return serializers.CommentsWriteSerializer
        return serializers.CommentsSerializer



    def get_serializer_context(self):
        print("\n\n\nself.request.user::::::::::::::"  , self.kwargs['Course_pk'])
        return {'Course_id' : self.kwargs['Course_pk']}
    #permission_classes=permissions.IsAuthenticated
    
class ClassViewSet(ModelViewSet):


    
    permission_classes = [AllowAny]
    #.select_related("AcademicYear")
    queryset=  models.classes.objects.prefetch_related("teacher").all()
    serializer_class=ClassSerializer
    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT' , 'PATCH']:
            return serializers.ClassWriteSerializer
        return serializers.SpecialClassSerializer
    

    @action(detail=True, methods=['get'])
    def modules(self, request, pk=None):
        class_instance = self.get_object()
        modules = class_instance.Modules.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def module_detail(self, request, pk=None, module_id=None):
        try:
            module_obj = models.Module.objects.get(pk=module_id)
            serializer = ModuleSerializer(module_obj)  # Assuming you have a serializer for the module model named 'ClassSerializer'
            return Response(serializer.data)
        except models.classes.DoesNotExist:
            return Response({"detail": "Module not found."}, status=status.HTTP_404_NOT_FOUND)

    # Custom action to get courses of a class and specific module
    @action(detail=True, methods=['GET'])
    def module_courses(self, request, pk=None, module_id=None):
        #print("\n\n\n\n\nhello 1\n\n\n\n")
        class_instance = self.get_object()
        #print("\n\n\n\n\nhello 2\n\n\n\n")
        if not module_id:
            return Response({"error": "Please provide module_id as query parameter"}, status=400)
        module = models.Module.objects.get(id=module_id)
        courses = models.courses.objects.filter(Class=class_instance, module=module)
        serializer = CourseForClassSerializer(courses, many=True)
        return Response(serializer.data)

    

class ClassModulesListView(generics.ListAPIView):
    serializer_class = ModuleSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        class_id = self.kwargs['class_id']
        return models.Module.objects.filter(class__id=class_id)

class ModuleDetailView(generics.RetrieveAPIView):
    queryset = models.Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [AllowAny]


class ClassModuleCoursesListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        class_id = self.kwargs['class_id']
        module_id = self.kwargs['module_id']
        return models.courses.objects.filter(class__id=class_id, module__id=module_id)
    
    
# from .models import events
    
# #events 
# from .serializers import EventSerializer
# from django.core.exceptions import ObjectDoesNotExist

# class CreateEvent(APIView):
#     serializer_class = EventSerializer
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class GetEvent(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, id):
#         try:
#             event = events.objects.get(pk=id)
#             serializer = EventSerializer(event)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except events.DoesNotExist:
#             return Response({"message": "Event does not exist"}, status=status.HTTP_404_NOT_FOUND)




# class EventUpdate(APIView):
#     permission_classes = [AllowAny]

#     def put(self, request, id):
#         try:
#             event = events.objects.get(pk=id)
#         except events.DoesNotExist:
#             return JsonResponse({"message": "Event does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
#         serializer = EventSerializer(event, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class EventDelete(APIView):
#     permission_classes = [AllowAny]

#     def delete(self, request, id):
        
#         event = events.objects.get(pk=id)
#         event.delete()
#         return JsonResponse({'message': 'Event deleted successfully'}, status=status.HTTP_204_NO_CONTENT)




# class EventList(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         events_data = events.objects.all()
#         serializer = EventSerializer(events_data, many=True)
#         return Response(serializer.data)
