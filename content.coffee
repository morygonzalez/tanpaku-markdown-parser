DiaryBody = $('.diary_body')
converter = new Showdown.converter
DiaryBodyHtml = converter.makeHtml DiaryBody.text()
DiaryBody.replaceWith('<div class="diary_body">' + DiaryBodyHtml + '</div>')
