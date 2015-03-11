from django.conf.urls import patterns, include, url
from rest_framework import routers
from lettercounter.counters import views

import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

url_patterns = [
    '',
    url(r'^api/counts/$', views.CountList.as_view()),
    url(r'^api/counts/(?P<pk>[A-Za-z]+)/$', views.CountDetail.as_view()),
    url(r'^api/sentences/$', views.SentenceDetail.as_view()),
    url(r'^api/stats/$', views.StatsDetail.as_view()),
]

if settings.DEBUG:
    url_patterns.append(
        url(
            r'^$', 'django.contrib.staticfiles.views.serve', kwargs={
                'path': 'index.html', 'document_root': settings.STATIC_ROOT}),
        )

url_patterns.append(
    url(r'^(?P<path>.*)$', 'django.contrib.staticfiles.views.serve', {
        'document_root': settings.STATIC_ROOT, 'show_indexes': False
    })
)

urlpatterns = patterns(*url_patterns)

