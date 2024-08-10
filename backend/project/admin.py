from django.contrib import admin
from .models import (User, Teacher, Student, Admin, Module, 
                    classes, absence, events,
                    reactions, comments, courses)

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Module)
admin.site.register(classes)
admin.site.register(absence)
admin.site.register(events)
admin.site.register(reactions)
admin.site.register(comments)
admin.site.register(courses)