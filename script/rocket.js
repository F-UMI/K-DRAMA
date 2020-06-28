var count3 = 0;
var Doc3;
$(document).ready(function() {
  $.ajax({
    url: 'xml/rocket.xml',
    type: 'get',
    timeout: 1000,
    dataType: 'xml',
    success: function(xmlDoc) {
      Doc3 = xmlDoc;
      count3 = $(xmlDoc).find('rocket').size();
      displayRocket();
    },
    error: function(xmlDoc) {
      $('body').html('<div>Error!!</div>');
    }
  });
});
//로켓 정보 표시(LISTVIEW)
function displayRocket() {
  var i;
 	var tagList = '<li data-role="list-divider" id="roc"><strong>로켓</strong></li>';
  if (count3 > 0) {
    for (i = 0; i < count3; i += 1) {
      $record = $(Doc3).find('rocket').eq(i);
      tagList += '<li id = "roc_ele"><a data-rel="dialog" href="#' + $record.find('link').text() + '"><img src="' + $record.find('img').text() + '">';
      tagList += '<p class="ui-li-aside">' + $record.attr('operation') + '</p>';
      tagList += '<h2>' + $record.find('name').text() + '</h2>';
      tagList += '<p>' + $record.find('date').text() + '</p></a></li>';
    }
  }
  $('#rocketListArea').html(tagList);

}
