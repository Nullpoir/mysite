def article_convert(src):
    lines  =  src.split("\n")
    res = ""
    count2 = 1
    count3 = 1
    count4 = 1
    index = ""
    pre_flag  =  False
    for line in lines:
        if ("<pre>" in line):
            pre_flag = True
        elif ("</pre>" in line):
            new_line = line
            res += new_line
            pre_flag = False
            continue

        if pre_flag:
            new_line = line+"\n"
            res += new_line
            continue

        if ("src=" in line) and ("img" in line):
            seek_pre=line.find("src=")+5
            seek_las=line.find("\"",seek_pre)
            img_src=line[seek_pre:seek_las]
            new_src="class=\"lazyload\" data-src=\""+img_src+"\""
            new_line="<img "+new_src+">"
            res += new_line
        elif ("<h2>" in line) and ("</h2>" in line):
            seek_pre = line.find("<h2>")+4
            seek_las = line.find("</h2>")
            name = line[seek_pre:seek_las]
            new_line = "<h2 class=\"heading\" id=\"h2-"+str(count2)+"\">"+name+"</h2>"
            res += new_line
            index += "<a class = \"index-h2item para\" href=\"#h2-"+str(count2)+"\">"+name+"</a>"
            count2 += 1
        elif ("<h3>" in line) and ("</h3>" in line):
            seek_pre = line.find("<h3>")+4
            seek_las = line.find("</h3>")
            name = line[seek_pre:seek_las]
            new_line = "<h3 class=\"heading\" id=\"h3-"+str(count3)+"\">"+name+"</h3>"
            res += new_line
            index += "<a class = \"index-h3item para\" href=\"#h3-"+str(count3)+"\">"+name+"</a>"
            count3 += 1
        elif ("<h4>" in line) and ("</h4>" in line):
            seek_pre = line.find("<h4>")+4
            seek_las = line.find("</h4>")
            name = line[seek_pre:seek_las]
            new_line = "<h4 class=\"heading\" id=\"h4-"+str(count4)+"\">"+name+"</h4>"
            res += new_line
            index += "<a class = \"index-h4item para\" href=\"#h4-"+str(count4)+"\">"+name+"</a>"
            count4 += 1
        else:
            new_line = line
            res += new_line

    return res,index
