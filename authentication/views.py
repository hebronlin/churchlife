from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import PasswordResetForm
from django.core.urlresolvers import reverse
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control, never_cache
from django.views.generic.edit import FormView


class LoginRequiredMixIn(object):
    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        return super(LoginRequiredMixIn, self).dispatch(request, *args, **kwargs)


class NoCacheMixIn(object):
    @method_decorator(cache_control(no_cache=True))
    @method_decorator(never_cache)
    def dispatch(self, request, *args, **kwargs):
        return super(NoCacheMixIn, self).dispatch(request, *args, **kwargs)


class PasswordResetView(NoCacheMixIn, FormView):
    template_name = 'authentication/password_reset.html'
    form_class = PasswordResetForm

    def get_success_url(self):
        return reverse('authentication:password_reset_done')

