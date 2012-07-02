(function() {
  var HOST, entryList, getAntenna, getUnreadCount, hideButton, openEntry, showEmptyMessage, showEntry, showNextEntry;

  HOST = 'http://tanpaku.grouptube.jp/';

  entryList = [];

  getAntenna = function(callback) {
    return $.ajax({
      url: HOST,
      dataType: 'html',
      success: function(res) {
        var items;
        $('#indicator').hide();
        items = [];
        $(res).find('ul.information li').each(function() {
          var entry_title, entry_titles, user_name;
          entry_titles = $(this).contents().filter(function() {
            return this.textContent.match(/\S/);
          });
          user_name = $(this).find('a + a').attr('href').replace(/^(event|diary|file)\/user\/(.+?)\/.*/, "$2");
          if (entry_titles.length > 0) {
            entry_title = entry_titles[0].textContent;
          } else {
            entry_title = '■';
          }
          return items.push({
            blog_title: $(this).find('a + a').text(),
            entry_title: entry_title,
            entry_url: HOST + $(this).find('a + a').attr('href'),
            user_name: user_name,
            user_image: "" + HOST + "images/users/" + user_name + "/icon/s.jpg"
          });
        });
        return callback(items.reverse());
      }
    });
  };

  getUnreadCount = function() {
    return entryList.length;
  };

  openEntry = function(entry) {
    return chrome.tabs.getSelected(null, function(tab) {
      if (tab.url === entry.entry_url) return;
      return chrome.tabs.update(tab.id, {
        url: entry.entry_url
      });
    });
  };

  showEntry = function(entry, unread_count) {
    openEntry(entry);
    $('#title').text(entry.entry_title);
    $('#user_icon').empty().append($('<img>').attr({
      src: entry.user_image,
      title: entry.user_name
    }));
    $('#user_name').empty().append($('<a>').attr({
      href: "" + HOST + "user/" + entry.user_name
    }).text(entry.user_name));
    return $('#unread_count').text(unread_count);
  };

  hideButton = function() {
    return $('#next-button').hide();
  };

  showEmptyMessage = function() {
    $('.small-info').hide();
    return $('#title').text('未読記事はありません');
  };

  showNextEntry = function() {
    return chrome.extension.sendRequest({
      method: "getNextEntry"
    }, function(res) {
      if (res.entry) showEntry(res.entry, res.unread_count);
      if (res.unread_count === 0) hideButton();
      if (!res.entry) return showEmptyMessage();
    });
  };

  $(function() {
    showNextEntry();
    $('#next-button').click(function() {
      showNextEntry();
      return false;
    });
    $('#user_name a').live('click', function() {
      chrome.tabs.create({
        url: $(this).attr('href')
      });
      return window.close();
    });
    return $('#next-button').focus();
  });

}).call(this);
