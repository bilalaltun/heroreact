$(document).ready(function () {
  $('#toggleButtonn').on('click', function () {
    var $detayliFiltreContainer = $('#detayliFiltreContainer');
    var isCollapsed = $detayliFiltreContainer.css('maxHeight') === '0px' || $detayliFiltreContainer.css('maxHeight') === '0';

    if (isCollapsed) {
      $detayliFiltreContainer.css({
        maxHeight: $detayliFiltreContainer[0].scrollHeight + 'px',
        overflow: 'visible',
      });
    } else {
      $detayliFiltreContainer.css({
        maxHeight: '0',
        overflow: 'hidden',
      });
    }
  });
  if ($.fn.DataTable.isDataTable('#datatable-buttons')) {
    $('#datatable-buttons').DataTable().destroy();
  }

  var table = $('#datatable-buttons').DataTable({
    responsive: true,
    colReorder: true,
    dom:
      "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6 d-flex gap-3 justify-content-end'l f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
      {
        extend: 'copy',
        text: 'Kopyala',
      },
      'excel',
      'pdf',
      'colvis',
    ],
    lengthMenu: [5, 10, 20],
    columnDefs: [
      { orderable: true, className: 'reorder', targets: '_all' },
      { visible: false, targets: 2 },
      { visible: false, targets: 7 },
      { visible: false, targets: 8 },
      { visible: false, targets: 9 },
    ],
    order: [],
    pageLength: 10,
    language: {
      sDecimal: ',',
      sEmptyTable: 'Tabloda herhangi bir veri mevcut değil',
      sInfo: '_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor',
      sInfoEmpty: 'Kayıt yok',
      sInfoFiltered: '(_MAX_ kayıt içerisinden bulunan)',
      sInfoPostFix: '',
      sThousands: '.',
      sLengthMenu: 'Sayfada _MENU_ kayıt göster',
      sLoadingRecords: 'Yükleniyor...',
      sProcessing: 'İşleniyor...',
      sSearch: 'Ara:',
      sZeroRecords: 'Eşleşen kayıt bulunamadı',
      oPaginate: {
        sFirst: 'İlk',
        sLast: 'Son',
        sNext: 'Sonraki',
        sPrevious: 'Önceki',
      },
      oAria: {
        sSortAscending: ': artan sütun sıralamasını aktifleştir',
        sSortDescending: ': azalan sütun sıralamasını aktifleştir',
      },
      buttons: {
        copyTitle: 'Panoya kopyala',
        copySuccess: {
          _: '%d satır panoya kopyalandı',
          1: '1 satır panoya kopyalandı',
        },
        colvis: 'Sütun görünürlüğü',
      },
    },
  });
  $('#datatable-buttons_filter input').on('keyup', function () {
    table.column(0).search(this.value).draw();
  });
});
