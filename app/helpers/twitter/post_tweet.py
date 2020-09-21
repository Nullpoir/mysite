import twitter as Twitter
from django.conf import settings

# twitterへメッセージを投稿する
def post_tweet(title,pk,text):
    # 取得したキーとアクセストークンを設定する
    try:
        auth = Twitter.OAuth(consumer_key=settings.TWITTER_CONSUMER_KEY,
                             consumer_secret=settings.TWITTER_CONSUMER_SECRET,
                             token=settings.TWITTER_TOKEN,
                             token_secret=settings.TWITTER_TOKEN_SECRET)

        twitter = Twitter.Twitter(auth=auth)

        tweet = "最新記事を公開しました。\n" + text + "\n" + title + "\n" + "https://nullab.xyz/app/" + str(pk) +"\n"
        result = twitter.statuses.update(status=tweet)
        print(result)
    except:
        print("Twitter Error",
            "\nCONSUMER_KEY:",
            settings.TWITTER_CONSUMER_KEY,
            "\nTWITTER_CONSUMER_SECRET:",
            settings.TWITTER_CONSUMER_SECRET,
            "\nTWITTER_TOKEN:",
            settings.TWITTER_TOKEN,
            "\nTWITTER_TOKEN_SECRET:",
            settings.TWITTER_TOKEN_SECRET
            )
