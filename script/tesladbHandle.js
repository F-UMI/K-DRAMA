var db = null;
var var_no = null;
var position = null;
var index;
// 데이터베이스 생성 및 오픈
function openDB() {
  db = window.openDatabase('teslaDB', '1.0', '테슬라DB', 1024 * 1024);
  console.log('1_DB 생성...');
}
// 테이블 생성 트랜잭션 실행
function createTable() {
  db.transaction(function(tr) {
    var createSQL = 'create table if not exists tesla(sys text, model char, eff double, high double, zeroback double, price int)';
    tr.executeSql(createSQL, [], function() {
      console.log('2_1_테이블생성_sql 실행 성공...');
    }, function() {
      console.log('2_1_테이블생성_sql 실행 실패...');
    });
  }, function() {
    console.log('2_2_테이블 생성 트랜잭션 실패...롤백은 자동');
  }, function() {
    console.log('2_2_테이블 생성 트랜잭션 성공...');
  });
}

// 데이터 입력 트랜잭션 실행
function insertTesla() {
  db.transaction(function(tr) {
    var sys = $('#SYS1').val();
    var model = $('#MODEL1').val();
    var eff = $('#EFF1').val();
    var high = $('#HIGH1').val();
    var zeroback = $('#ZERO1').val();
    var price = $('#PRICE1').val();
    var insertSQL = 'insert into tesla(sys, model, eff, high, zeroback ,price) values(?, ?, ?, ?, ?, ?)';
    tr.executeSql(insertSQL, [sys, model, eff, high, zeroback, price], function(tr, rs) {
      console.log('3_ 차량 등록...no: ' + rs.insertId);
      alert('모델명 ' + $('#MODEL1').val() + ' 이 입력되었습니다');
      $('#MODEL1').val('');
      $('#EFF1').val('');
      $('#HIGH1').val('');
      $('#ZERO1').val('');
      $('#PRICE1').val('');
    }, function(tr, err) {
      alert('DB오류 ' + err.message + err.code);
    });
  });
}

// 데이터 전체 검색 트랜잭션 실행
function listTesla() {
  db.transaction(function(tr) {
    var selectSQL = 'select * from tesla';
    tr.executeSql(selectSQL, [], function(tr, rs) {
      console.log('차량 조회... ' + rs.rows.length + '건.');
      if (position == 'first') {
        if (index == 0)
          alert('더 이상의 차량이 없습니다');
        else
          index = 0;
      } else if (position == 'prev') {
        if (index == 0)
          alert('더 이상의 차량이 없습니다');
        else
          index = --index;
      } else if (position == 'next') {
        if (index == rs.rows.length - 1)
          alert('더 이상의 차량이 없습니다');
        else
          index = ++index;
      } else {
        if (index == rs.rows.length - 1)
          alert('더 이상의 차량이 없습니다');
        else
          index = rs.rows.length - 1;
      }
      $('#SYS3').val(rs.rows.item(index).sys);
      $('#MODEL3').val(rs.rows.item(index).model);
      $('#EFF3').val(rs.rows.item(index).eff);
      $('#HIGH3').val(rs.rows.item(index).high);
      $('#ZERO3').val(rs.rows.item(index).zeroback);
      $('#PRICE3').val(rs.rows.item(index).price);
    });
  });
};

// 데이터 식제 트랜잭션 실행
function deleteTesla() {
  db.transaction(function(tr) {
    var model = $('#MODEL2').val();
    var deleteSQL = 'delete from tesla where model = ?';
    tr.executeSql(deleteSQL, [model], function(tr, rs) {
      console.log('차량 삭제... ');
      alert('차량명 ' + $('#MODEL2').val() + ' 이 삭제되었습니다');
      $('#MODEL2').val('');
      $('#EFF2').val('');
      $('#HIGH2').val('');
      $('#ZERO2').val('');
      $('#PRICE2').val('');
    }, function(tr, err) {
      alert('DB오류 ' + err.message + err.code);
    });
  });
}

// 데이터 삭제 위한 데이터 검색 트랜잭션 실행
function selectTesla1(model) {
  db.transaction(function(tr) {
    var selectSQL = 'select sys, model, eff, high, zeroback, price from tesla where model=?';
    tr.executeSql(selectSQL, [model], function(tr, rs) {
      $('#MODEL2').val(rs.rows.item(0).model);
      $('#SYS2').val(rs.rows.item(0).sys);
      $('#EFF2').val(rs.rows.item(0).eff);
      $('#HIGH2').val(rs.rows.item(0).high);
      $('#ZERO2').val(rs.rows.item(0).zeroback);
      $('#PRICE2').val(rs.rows.item(0).price);
    }, function(tr, err) {
      alert('DB오류 ' + err.message + err.code);
    });
  });
}

// 데이터 조건 검색 트랜잭션 실행
function selectTesla2(model) {
  db.transaction(function(tr) {
    var selectSQL = 'select sys, model, eff, high, zeroback, price from tesla where model=?';
    tr.executeSql(selectSQL, [model], function(tr, rs) {
      $('#MODEL3').val(rs.rows.item(0).model);
      $('#SYS3').val(rs.rows.item(0).sys);
      $('#EFF3').val(rs.rows.item(0).eff);
      $('#HIGH3').val(rs.rows.item(0).high);
      $('#ZERO3').val(rs.rows.item(0).zeroback);
      $('#PRICE3').val(rs.rows.item(0).price);
    }, function(tr, err) {
      alert('DB오류 ' + err.message + err.code);
    });
  });
};
