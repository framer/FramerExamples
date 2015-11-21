from django import template
from django.template.defaultfilters import stringfilter
from django_pygments.utils import pygmentify_html
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter
@stringfilter
def pygmentify(value):
    try:
        res = pygmentify_html(value)
    except Exception, e:
        print e
        print u'value="%s"' % value
        res = value
    return mark_safe(res)

@register.filter
@stringfilter
def pygmentify_inline(value):
    try:
        res = pygmentify_html(value, noclasses=True)
    except Exception, e:
        print e
        print u'value="%s"' % value
        res = value
    return mark_safe(res)

class PygmentifyNode(template.Node):
    def __init__(self, nodelist, **kwargs):
        self.nodelist = nodelist
        self.kwargs = kwargs

    def render(self, context):
        output = self.nodelist.render(context)
        try:
            res = pygmentify_html(output, **self.kwargs)
        except Exception, e:
            print e
            print u'value="%s"' % output
            res = output
        return mark_safe(res)

@register.tag
def pygment(parser, token):
    token_args = token.split_contents()
    kwargs = {}
    for item in token_args[1:]:
        kw_parts = [i.strip() for i in item.split('=')]
        # we intentionally leave kw_parts[1] as is without any
        # exception handling so that if the argument supplied is
        # not of the keyword argume type, the error is propogated
        kwargs[kw_parts[0]] = eval(kw_parts[1])

    nodelist = parser.parse(('endpygment',))
    parser.delete_first_token()
    return PygmentifyNode(nodelist, **kwargs)
