// Generated by CoffeeScript 1.3.3
(function() {
  var DiaryBody, DiaryBodyHtml, converter;

  DiaryBody = $('.diary_body');

  converter = new Showdown.converter;

  DiaryBodyHtml = converter.makeHtml(DiaryBody.text());

  DiaryBody.replaceWith('<div class="diary_body">' + DiaryBodyHtml + '</div>');

}).call(this);
