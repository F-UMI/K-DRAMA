var count2 = 0;
var Doc2;
$(document).ready(function() {
  $.ajax({
    url: 'xml/project.xml',
    type: 'get',
    timeout: 1000,
    dataType: 'xml',
    success: function(xmlDoc) {
      Doc2 = xmlDoc;
      count2 = $(xmlDoc).find('project').size();
      displayProject();
    },
    error: function(xmlDoc) {
      $('body').html('<div>Error!!</div>');
    }
  });
});
//프로젝트 표시(lISTVIEW)
function displayProject() {
  var i;
 	var tagList = '<li data-role="list-divider" id="pro"><strong>프로젝트</strong></li>';
  if (count2 > 0) {
    for (i = 0; i < count2; i += 1) {
      $record = $(Doc2).find('project').eq(i);
      tagList += '<li id = "pro_ele"><a data-rel="dialog" href="#' + $record.find('link').text() + '"><img src="' + $record.find('img').text() + '">';
      tagList += '<p class="ui-li-aside">' + $record.attr('progress') + '</p>';
      tagList += '<h2>' + $record.find('name').text() + '</h2>';
      tagList += '<p>' + $record.find('date').text() + '</p></a></li>';
    }
  }
  $('#projectListArea').html(tagList);

}
