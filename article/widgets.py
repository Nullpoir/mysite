from django import forms

class TagSuggestWidget(forms.SelectMultiple):
    template_name = 'article/tag_widget.html'

    class Media:
        js = ['/static/js/article/tag_widget.js']
        css = {
            'all': ['/static/css/article/tag_widget.css']
        }

    def __init__(self, attrs=None):
        super().__init__(attrs)
        if 'class' in self.attrs:
            self.attrs['class'] += ' suggest'
        else:
            self.attrs['class'] = 'suggest'
