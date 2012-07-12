$('.diary_body, .comment-body').each ->
  TargetText = $(this).text()
    .replace(/^\s+?([^\s]+)/g, "$1") # 行頭の空白削除
    .replace(/\s+$/g, '') # 行末の空白削除
    .replace(/([^\n])\n([^\n])/g, "$1  \n$2") # 改行を空白二個に変換
    .replace(/(^|\s)(https?:\/\/[a-zA-Z0-9\.\-_~#!%\?&\/]+?)(\s|$)/g, '$1<a href="$2">$2</a>$3') # URL っぽい文字列を URL に変換
  Converter = new Showdown.converter
  BodyHtml = Converter.makeHtml TargetText
  $(this).attr(class: $(@).attr('class') + ' parsed').html(BodyHtml)
