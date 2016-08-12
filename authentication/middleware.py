from django.contrib.auth import logout
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseForbidden

from churchlife.core.models import Organization, Member

class OrganizationMiddleware(object):
    def process_request(self, request):
        # hostname = Organization._strip_port(request.META.get('HTTP_HOST'))
        # try:
        #     organization = Organization.objects.get(hostname=hostname.lower())
        # except ObjectDoesNotExist:
        #     # TODO log
        #     return HttpResponseForbidden('<h1>Forbidden</h1>')
        # request.organization = organization

        if not request.user.is_authenticated():
            return

        member = Member.objects.get(user=request.user)
        if not request.user.is_superuser and not member.organization:
            logout(request)
            # TODO log
            return HttpResponseForbidden()

        request.organization = member.organization
