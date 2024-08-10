from django.urls import path
from .views import (StudentAddView, TeacherAddView,
                    get_teachers, get_students,
                    get_teacher, get_student,
                    StudentUpdateView, StudentDeleteView,
                    TeacherUpdateView, TeacherDeleteView, 
                    TeacherCSVView, StudentCSVView,
                    ProfileUpdate, StudentsDelete)
                    #CreateEvent,EventDelete,EventList,EventUpdate,GetEvent)
from . import views

from rest_framework_nested import routers



router = routers.DefaultRouter()
# router.register('Teacher' , views.TeacherViewSet)
# router.register('Student' , views.StudentViewSet)
router.register('Courses' , views.CourseViewSet)

#router.register('Module' , views.ModuleViewSet)
router.register('Class' , views.ClassViewSet)
router.register('AcademicYear' , views.AcademicYearViewSet)
#router.register('Events' , views.EventViewSet)
router.register('Comments' , views.CommentsViewSet)

router.register('Absences' , views.AbsenceViewSet)

router.register('Modules' , views.ModuleViewSet)

Courses_router = routers.NestedDefaultRouter(router , 'Courses' , lookup='Course')
Courses_router.register('Comments' , views.CommentsViewSet , basename='Course-Comments')


Class_router = routers.NestedDefaultRouter(router , 'Class' , lookup='Class')
#Class_router.register('Students' , views.ClassStudentViewSet , basename='Class-Students')


#Teachers_router = routers.NestedDefaultRouter(router , 'Teacher' , lookup='Teacher')






urlpatterns = [
    #Create Student and Teacher endpoints
    path('students/add/', StudentAddView.as_view() ,name='add_student'),
	path('teachers/add/', TeacherAddView.as_view() ,name='add_teacher'),
 
    #Create (By CSV) Students and Teachers endpoints
    path('teachers/add/csv/', TeacherCSVView.as_view() ,name='add_teachers_csv'),
    path('students/add/csv/', StudentCSVView.as_view() ,name='add_students_csv'),
    
    path('teachers/', get_teachers, name='get all teachers'),
    path('teachers2/', views.get_teachers2, name='get all teachers'),
    path('teachers2/<int:teacher_id>/', views.get_teacher2, name='get teacher'),
    path('teachers/<int:teacher_id>/', get_teacher, name='get teacher'),
    path('teachers/<int:teacher_id>/update/', TeacherUpdateView.as_view(), name='update teacher'),
    path('teachers/<int:teacher_id>/delete/', TeacherDeleteView.as_view(), name='delete teacher'),
    
    path('students/', get_students, name='get all students'),
    path('students/<int:student_id>/', get_student, name='get student'),
    path('students/<int:student_id>/absences', views.get_student_absences, name='get student absences'),
    path('students/<int:student_id>/update/', StudentUpdateView.as_view(), name='update student'),
    path('students/<int:student_id>/delete/', StudentDeleteView.as_view(), name='delete student'),
    
    #for modifying user profiles
    path('profile/update/', ProfileUpdate.as_view(), name='update profile'),
    #for multiple student delete
    path('students/delete/', StudentsDelete.as_view(), name='multi_student_delete'),


    ###############

    # path('Teacher/<int:pk>/Classes/', views.TeacherViewSet.as_view({'get': 'Classes'}), name='Teacher-classes'),
    # path('Teacher/<int:pk>/Classes/<int:class_id>/Modules', views.TeacherViewSet.as_view({'get': 'Modules'}), name='Teacher-classes-modules'),
    # path('Teacher/<int:pk>/Classes/<int:class_id>/Modules/<int:module_id>/Courses', views.TeacherViewSet.as_view({'get': 'TeacherCoursesInModules'}), name='Teacher-Module-Courses'),
    # path('Teacher/<int:pk>/Classes/<int:class_id>/', views.TeacherViewSet.as_view({'get': 'class_detail'}), name='teacher-class-detail'),
    path('teachers/<int:teacher_id>/classes/', views.get_class_detail, name='get_class_detail'),
    # path('teachers/<int:teacher_id>/modules/', views.get_modules, name='get_modules'),
    # path('teachers/<int:teacher_id>/classes/<int:class_id>/modules/<int:module_id>/Courses/', views.get_teacher_courses_in_modules, name='get_teacher_courses_in_modules'),

   
    path('Class/<int:pk>/Modules/', views.ClassViewSet.as_view({'get': 'modules'}), name='Class-modules'),
    path('Class/<int:pk>/Modules/<int:module_id>/', views.ClassViewSet.as_view({'get': 'module_detail'}), name='module-details'),
    path('Class/<int:pk>/Modules/<int:module_id>/Courses/', views.ClassViewSet.as_view({'get': 'module_courses'}), name='Class-module-courses'),
    #event urls
    # path('events/create/', CreateEvent.as_view(), name='create_event'),
    # path('events/<int:id>/update/', EventUpdate.as_view(), name='update_event'),
    # path('events/<int:id>/delete/', EventDelete.as_view(), name='delete_event'),
    # path('events/', EventList.as_view(), name='event_list'),
    # path('events/<int:id>/', GetEvent.as_view(), name='get_event'),

]

##wassim chikor

urlpatterns += router.urls
urlpatterns += Courses_router.urls
urlpatterns += Class_router.urls
#urlpatterns += Teachers_router.urls