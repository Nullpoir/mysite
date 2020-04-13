from rest_framework import pagination
from rest_framework.response import Response
from collections import OrderedDict, namedtuple
import math

class MyPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):

        next = None
        previous = None
        # nextとpreviousとcurrentの設定
        if (not self.page.has_next()) and ( not self.page.has_previous() ):
            current = 1
        elif not self.page.has_next():
            current = self.page.previous_page_number() + 1
            previous = current - 1
        elif not self.page.has_previous():
            current = self.page.next_page_number() - 1
            next = current + 1
        else:
            current = self.page.previous_page_number() + 1
            previous = current - 1
            next = current + 1
        # レスポンス
        last = math.ceil(self.page.paginator.count / self.page_size)
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', next),
            ('previous', previous),
            ('last', last),
            ('current', current),
            ('results', data)
        ]))
