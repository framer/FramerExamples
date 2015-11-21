from django.conf.urls.defaults import patterns, url

urlpatterns = patterns(
    'django_pygments.views',
    (r'^demo/$', 'demo'),
)
