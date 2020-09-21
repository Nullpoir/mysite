from rest_framework import serializers
from django_filters import rest_framework as filters
from rest_framework.serializers import SerializerMethodField
from app.models import *

class CommentSerializer(serializers.ModelSerializer):
    queryset = Comment.objects.all()
    class Meta:
        model = Comment
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    queryset = Category.objects.all()
    class Meta:
        model = Comment
        fields = ('name',)

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class TagSerializer(serializers.ModelSerializer):
    queryset = Tag.objects.all()
    class Meta:
        model = Tag
        fields = ('pk','name',)

class SubappSerializer(serializers.ModelSerializer):
    queryset = app.objects.published()
    class Meta:
        model = app
        fields = (
            'pk',
            'title',
            'pub_date',
            'thumbnail_url',
        )

class appSerializer(serializers.ModelSerializer):
    queryset = app.objects.published()
    tags = TagSerializer(many=True)
    category = CategorySerializer()
    related_posts = SubappSerializer(many=True)
    class Meta:
        model = app
        fields = (
            'pk',
            'title',
            'pub_date',
            'thumbnail_url',
            'tags',
            'category',
            'body',
            'meta',
            'index',
            'category_name',
            'related_posts'
        )

    def __init__(self, *args, **kwargs):
        super(appSerializer, self).__init__(*args, **kwargs)
        try:
            context = kwargs.get('context')
            fields = context.get('fields', None)
            if fields:
                disallowed = set(fields)
                for field_name in disallowed:
                    self.fields.pop(field_name)
        except AttributeError:
            pass
