from django.contrib import admin

from .models import Address, Organization, Member, Group, MemberGroup, Event, EventAttendance

class AddressAdmin(admin.ModelAdmin):
    pass

class OrganizationAdmin(admin.ModelAdmin):
    pass

class MemberAdmin(admin.ModelAdmin):
    pass

class GroupAdmin(admin.ModelAdmin):
    pass

class MemberGroupAdmin(admin.ModelAdmin):
    pass

class EventAdmin(admin.ModelAdmin):
    pass

class EventAttendanceAdmin(admin.ModelAdmin):
    pass


admin.site.register(Address, AddressAdmin)
admin.site.register(Organization, OrganizationAdmin)

# admin.site.unregister(User)
admin.site.register(Member, MemberAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(MemberGroup, MemberGroupAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(EventAttendance, EventAttendanceAdmin)
