var count1 = 0;
var Doc1;


$(document).ready(function() {
  $.ajax({
    url: "xml/tesla.xml",
    type: "get",
    dataType: "xml",
    timeout: 1000,
    async: false,
    success: function(xmlDoc) {
      Doc1 = xmlDoc; // 전역변수 초기화
      length = $(xmlDoc).find('car').size();
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

  // CAR 정보를 표시
  function display() {
    $record = $(Doc1).find("car").eq(count1);
    $("#carImg").attr('src', $record.find("picture").text());
    $("#carModel").text($record.find("model").text());
    $('#carSystem').text($record.find("system").text());
    $('#carEff').text($record.find("efficiency").text());
    $('#carHigh').text($record.find("highspeed").text());
    $('#carZero').text($record.find("zeroback").text());
    $('#carPrice').text($record.find("price").text());
  }

});
