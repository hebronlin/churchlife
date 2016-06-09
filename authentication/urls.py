from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns('',
    # The password reset form view:
    url(r'^password_reset/$',
        views.PasswordResetView.as_view(),
        name='password_reset'
    ),
    # The password reset confirmation view:
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        'django.contrib.auth.views.password_reset_confirm',
        name='password_reset_confirm'
    ),

    url(r'^login/$',
        'django.contrib.auth.views.login',
        kwargs={'template_name': 'authentication/login.html'},
        name='login'
    ),

    url(r'^logout/$',
        'django.contrib.auth.views.logout',
        kwargs={'next_page': '/login'},
        name='logout'),

    url(
        r'^password/reset/done/$',
        'django.contrib.auth.views.password_reset_done',
        kwargs={'template_name': 'authentication/password_reset_done.html'},
        name='password_reset_done'
    ),
)
