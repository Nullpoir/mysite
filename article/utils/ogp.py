def GenOGP(title,url,image,site_name,type,dcp):
    print("OGPfire")
    ogp_title = "<meta property=\"og:title\" content=\""+title+"\" />\n"
    ogp_url = "<meta property=\"og:url\" content=\""+url+"\" />\n"
    ogp_type = "<meta property=\"og:type\" content=\""+ type +"\" />\n"
    ogp_dcp = "<meta property=\"og:description\" content=\""+ dcp +"\" />\n"
    ogp_site = "<meta property=\"og:site_name\" content=\""+site_name+"\" />\n"
    ogp_iamge = "<meta property=\"og:image\" content=\""+image+"\" />\n"

    sns = "<meta name=\"twitter:card\" content=\"summary_large_image\" />\n"

    twitter_title = "<meta property=\"twitter:title\" content=\""+title+"\" />\n"
    twitter_url = "<meta property=\"twitter:url\" content=\""+url+"\" />\n"
    twitter_dcp = "<meta property=\"twitter:description\" content=\""+ dcp +"\" />\n"
    twitter_site = "<meta property=\"twitter:site_name\" content=\""+site_name+"\" />\n"
    twitter_image = "<meta property=\"twitter:image\" content=\""+image+"\" />\n"

    twitters = twitter_title + twitter_title + twitter_dcp + twitter_site + twitter_image


    return ogp_title + ogp_url + ogp_type + ogp_dcp + ogp_site + ogp_iamge + sns + twitters
