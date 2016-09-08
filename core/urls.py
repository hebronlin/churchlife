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
        r'^api/v1/user_session/$', 
        views.UserSessionView.as_view({
            'get': 'list',
            # 'post': 'create',
        }),
        name='user_session'
    ),

    url(
        r'^api/v1/user/$', 
        views.UserView.as_view({
            'get': 'list',
            # 'post': 'create',
        }),
        name='user'
    ),

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

    url(
        r'^api/v1/member/search/$', 
        views.MemberSearchView.as_view({
            'get': 'list'
        }),
        name='member-search'
    ),

    url(
        r'^api/v1/organization/$', 
        views.OrganizationView.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='organization'
    ),

    url(
        r'^api/v1/organization/(?P<pk>\d+)/$', 
        views.OrganizationView.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'update',
        }),
        name='organization-detail'
    ),    

    url(
        r'^api/v1/event/$', 
        views.EventView.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='event'
    ),

    url(
        r'^api/v1/event/(?P<pk>\d+)/$', 
        views.EventView.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'update',
        }),
        name='event-detail'
    ),    

    url(
        r'^api/v1/group/$', 
        views.GroupView.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='group'
    ),

    url(
        r'^api/v1/group/(?P<pk>\d+)/$', 
        views.GroupView.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'update',
        }),
        name='group-detail'
    ),    

    url(
        r'^api/v1/member_group/$', 
        views.MemberGroupView.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='member-group'
    ),

    url(
        r'^api/v1/member_group/(?P<pk>\d+)/$', 
        views.MemberGroupView.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'update',
        }),
        name='member-group-detail'
    ),    

    url(
        r'^api/v1/attendance/$', 
        views.AttendanceView.as_view({
            'get': 'list',
            'post': 'create',
        }),
        name='attendance'
    ),

    url(
        r'^api/v1/attendance/(?P<pk>\d+)/$', 
        views.AttendanceView.as_view({
            'get': 'retrieve',
            'put': 'update',
            'patch': 'update',
        }),
        name='attendance-detail'
    ),    
]
