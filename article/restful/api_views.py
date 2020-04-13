from rest_framework.views import APIView
from rest_framework import viewsets
from article.models import Article,Comment,Tag,Category
from article.restful.serializers import ArticleSerializer,CommentSerializer,CategorySerializer,TagSerializer
from rest_framework.response import Response
from django.http import Http404
from django.db.models import Q
from django.shortcuts import get_object_or_404
import urllib

class ArticleView(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.published()
    serializer_class = ArticleSerializer

    def retrieve(self, request, pk=None):
        article = Article.objects.published(pk=pk)
        if not article.exists():
            raise Http404

        instance = Article.objects.get(pk=pk)
        instance.pv += 1
        instance.save()
        serializer = self.serializer_class
        return Response(serializer(article,many=True).data)

    def list(self,request,*args, **kwargs):
        #初期設定
        fields = request.GET.getlist("field")
        #検索クエリ取得・生成
        query = Q()
        get_queries = request.query_params
        if "title" in get_queries and (get_queries["title"] != ""):
            for word in get_queries["title"].replace("　"," ").split(" "):
                query.add(Q(title__icontains=word),Q.OR)
        if "tags" in get_queries and (get_queries["tags"] != ""):
            for word in get_queries["tags"].replace("　"," ").split(" "):
                query.add(Q(tags__name=word),Q.OR)
        if "categories" in get_queries and (get_queries["categories"] != ""):
            pk = Category.objects.get(name=urllib.parse.unquote(get_queries["categories"])).pk
            query.add(Q(category=pk),Q.AND)

        #DBクエリ発行
        article= Article.objects.published().filter(query)

        #ページネーション
        page = self.paginate_queryset(article)
        if page is not None:
            serializer = ArticleSerializer(page, many=True,context=dict(fields=fields))
            return self.get_paginated_response(serializer.data)

        return Response(
            ArticleSerializer(
                page,many=True, context=dict(fields=fields)
                ).data
            )
class CategoryView(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagView(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def list(self,request,*args, **kwargs):
        #初期設定
        is_serialized = request.GET.getlist("serialized")
        if not is_serialized:
            query = Q()
            get_queries = request.query_params
            if "keyword" in get_queries and (get_queries["keyword"] != ""):
                for word in get_queries["keyword"].replace("　"," ").split(" "):
                    query.add(Q(name__icontains=word),Q.OR)

            tag = Tag.objects.all().filter(query)

            return Response(
                TagSerializer(
                    tag,many=True, context=dict(is_serialized=is_serialized)
                    ).data
                )
        else:
            tag = Tag.objects.all().filter(parent=None)

            return Response(
                TagSerializer(
                    tag,many=True, context=dict(is_serialized=is_serialized)
                    ).data
                )

class CommentView(APIView):
    def get(self,request):
        article_pk = request.GET.getlist("article")
        article_pk = int(article_pk)
        comments = Comment.objects.get(target=article_pk)
        serializer = CommentSerializer(comment,many=True)
        return serializer.data
