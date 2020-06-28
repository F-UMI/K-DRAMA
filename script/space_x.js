var count1 = 0;
var Doc1;


$(document).ready(function() {
  $.ajax({
    url: "xml/station.xml",
    type: "get",
    dataType: "xml",
    timeout: 1000,
    async: false,
    success: function(xmlDoc) {
      Doc1 = xmlDoc; // 전역변수 초기화
      length = $(xmlDoc).find('station').size();
      display();
    },
    error: function() {
      $("body").html("<div>Error!!</div>");
    }
  });

  // 다음 버튼을 눌렀을 경우 실행
  $("input[name='btnNext']").click(function() {
    if (count1 < length - 1) {
      count1 = count1 + 1;
      display();
      console.log(count1);
    }
  });

  // 이전 버튼을 눌렀을 경우 실행
  $("input[name='btnPrevious']").click(function() {
    if (count1 > 0) {
      count1 = count1 - 1;
      display();
      console.log(count1);
    }

  });

  // 처음 버튼을 눌렀을 경우 실행
  $("input[name='btnFirst']").click(function() {
    count1 = 0;
    display();
    console.log(count1);
  });

  // 마지막 버튼을 눌렀을 경우 실행
  $("input[name='btnLast']").click(function() {
    count1 = length - 1;
    display();
    console.log(count1);
  });

  // STATION 정보를 표시
  function display() {
    $record = $(Doc1).find("station").eq(count1);
    $("#stationImg").attr('src', $record.find("img").text());
    form1.stationCity.value = $record.attr("country");
    form1.stationName.value = $record.find("name").text();
    form1.stationFound.value = $record.find("founded").text();
    $("#location").attr("href", $record.find("site").text());
  }

});
