"""churchlife URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import (login,
                                       logout)
from . import views

urlpatterns = [
    url(r'^', include('churchlife.authentication.urls', namespace='authentication')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.IndexView.as_view(), name='index'),

    url(
        r'^api/v1/member/$', 
        views.MemberView.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='member'
    ),

    url(
        r'^api/v1/member/(?P<pk>\d+)/$', 
        views.MemberView.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'update',
        }),
        name='member-detail'
    ),    
]
