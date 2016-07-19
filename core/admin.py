from django.contrib import admin

from .models import Address, Organization, Member, Event

class AddressAdmin(admin.ModelAdmin):
    pass

class OrganizationAdmin(admin.ModelAdmin):
    pass

class MemberAdmin(admin.ModelAdmin):
    pass

class EventAdmin(admin.ModelAdmin):
    pass


admin.site.register(Address, AddressAdmin)
admin.site.register(Organization, OrganizationAdmin)

# admin.site.unregister(User)
admin.site.register(Member, MemberAdmin)
admin.site.register(Event, EventAdmin)
