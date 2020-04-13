import re
def MetaContentPublisher(source):
    regexies = [
        # 目次
        r"<li><a href=\"#mcetoc.*</a></li>",
        #タグ削除
        r"<[^>]*?>",
        ]
    returnText = source
    for i in regexies:
        regex = re.compile(i)
        returnText = regex.sub("",returnText)

    return returnText[:149]
