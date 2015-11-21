import os
import sys
import pipes
import subprocess
import logging

def setup_pygments():
    
    from django.conf import settings

    vendor_path = os.path.join(os.path.dirname(__file__), "..", "vendor")

    if not vendor_path in sys.path:
        sys.path.append(vendor_path)

    print vendor_path

    if not "django_pygments" in settings.INSTALLED_APPS:
        settings.INSTALLED_APPS.append("django_pygments")

    from django.template.loader import add_to_builtins

    add_to_builtins('django_pygments.templatetags.pygmentify')

setup_pygments_done = False

def preBuild(site):

    global setup_pygments_done

    if setup_pygments_done is False:
        setup_pygments()
        setup_pygments_done = True


