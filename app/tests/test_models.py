from django.test import TestCase
from app.models import app,Comment,Tag,Category
from django.utils import timezone
from datetime import datetime
# Create your tests here.

class app_tests(TestCase):

    def test_app_create_and_change(self):
        new_category = Category(name="テストタグ")
        new_category.save()
        new_app = app(
            title="テスト記事",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        new_app.save()
        self.assertTrue(new_app.is_need_celery_change)
        #記事本文変更
        print("===記事本文変更===\n")
        new_app.edit_body = "ああああ"
        new_app.save()
        self.assertFalse(new_app.is_need_celery_change)
        #公開時間変更
        print("===公開時間変更==\n")
        new_app.pub_date = datetime.now(timezone.utc)
        new_app.save()
        self.assertTrue(new_app.is_need_celery_change)
        #タイトル変更
        # print("===タイトル変更==\n")
        # new_app.title = "テスト記事から変更"
        # new_app.save()
        # self.assertTrue(new_app.is_need_celery_change)

    def test_related_posts(self):

        test_tag = Tag(name="テストタグ")
        test_tag.save()

        new_category = Category(name="テストタグ")
        new_category.save()

        app1 = app(
            title="テスト記事1",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        app1.save()
        app1.tags.add(test_tag)
        app1.save()
        app2 = app(
            title="テスト記事2",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        app2.save()
        app2.tags.add(test_tag)
        app2.save()
        app3 = app(
            title="テスト記事3",
            pub_type=1,
            edit_body="テストです",
            category=new_category,
            pub_date=datetime.now(timezone.utc)
        )
        app3.save()
        app3.tags.add(test_tag)
        app3.save()

        assert(app1.related_posts())
