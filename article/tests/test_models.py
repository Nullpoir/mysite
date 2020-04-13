from django.test import TestCase
from article.models import Article,Comment,Tag,Category
from django.utils import timezone
from datetime import datetime
# Create your tests here.

class article_tests(TestCase):

    def test_article_create_and_change(self):
        new_category = Category(name="テストタグ")
        new_category.save()
        new_article = Article(
            title="テスト記事",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        new_article.save()
        self.assertTrue(new_article.is_need_celery_change)
        #記事本文変更
        print("===記事本文変更===\n")
        new_article.edit_body = "ああああ"
        new_article.save()
        self.assertFalse(new_article.is_need_celery_change)
        #公開時間変更
        print("===公開時間変更==\n")
        new_article.pub_date = datetime.now(timezone.utc)
        new_article.save()
        self.assertTrue(new_article.is_need_celery_change)
        #タイトル変更
        # print("===タイトル変更==\n")
        # new_article.title = "テスト記事から変更"
        # new_article.save()
        # self.assertTrue(new_article.is_need_celery_change)

    def test_related_posts(self):

        test_tag = Tag(name="テストタグ")
        test_tag.save()

        new_category = Category(name="テストタグ")
        new_category.save()

        article1 = Article(
            title="テスト記事1",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        article1.save()
        article1.tags.add(test_tag)
        article1.save()
        article2 = Article(
            title="テスト記事2",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        article2.save()
        article2.tags.add(test_tag)
        article2.save()
        article3 = Article(
            title="テスト記事3",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        article3.save()
        article3.tags.add(test_tag)
        article3.save()

        assert(article1.related_posts())
