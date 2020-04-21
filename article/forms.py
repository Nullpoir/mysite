from django import forms
from django.urls import reverse_lazy
from .models import Tag
from .widgets import TagSuggestWidget


class TagSuggestForm(forms.ModelForm):

    class Meta:
        model = Tag
        exclude = ('body','index')
    def clean_tags(self):
        tags = self.cleaned_data.get('tags')
        if tags.count() > 2:
            raise forms.ValidationError('タグは二つまでで頼みます')
        return tags
