$(document).ready(function () {
  $('#insertBtn').click(function () {
    $('#contentArea').empty();
    $('#contentArea').load('tesla_db.html #insertPage', function (htmlData) {
      console.log('insert ready');
    });
  });

  $('#deleteBtn').click(function () {
    $('#contentArea').empty();
    $('#contentArea').load('tesla_db.html #deletePage', function (htmlData) {
      console.log('deletePage ready');
    });
  });

  $('#searchBtn').click(function () {
    $('#contentArea').empty();
    $('#contentArea').load('tesla_db.html #searchPage', function (htmlData) {
      console.log('searchPage ready');
    });
  });
















});
