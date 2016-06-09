from django.contrib import admin

from .models import Address, Locality, MemberProfile

class AddressAdmin(admin.ModelAdmin):
    pass

class LocalityAdmin(admin.ModelAdmin):
    pass

class MemberProfileAdmin(admin.ModelAdmin):
    pass


admin.site.register(Address, AddressAdmin)
admin.site.register(Locality, LocalityAdmin)

# admin.site.unregister(User)
admin.site.register(MemberProfile, MemberProfileAdmin)
