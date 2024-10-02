function validateInput(input) {
  if (input.value.length > 11) {
    input.value = input.value.slice(0, 11);
  }
}

function addRow() {
  const tableBody = $('#tableBody');

  const newRow = `
                <tr>
                    <th></th> <!-- Satır numarası daha sonra güncellenecek -->
                    <td><input type="text" class="form-control UrunAdi"></td>
                    <td><input type="text" class="form-control Tutar"></td>
                    <td>
                        <select class="form-control KdvOran">
                            <option value="" disabled selected>Lütfen KDV oranını seçin</option>
                            <option value="1">1</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </td>
                    <td><input type="text" class="form-control KdvTutar" readonly></td>
                    <td><input type="text" class="form-control Matrah" readonly></td>
                    <td><input type="checkbox" class="form-check-input mt-2"></td>
                </tr>
            `;

  tableBody.append(newRow);

  updateRowNumbers();
}

function updateRowNumbers() {
  $('#tableBody tr').each(function (index) {
    $(this)
      .find('th')
      .text(index + 1);
  });
}

function removeSelectedRow() {
  const rows = $('#tableBody tr');
  let isAnyChecked = false;

  rows.each(function () {
    const checkbox = $(this).find('input[type="checkbox"]');
    if (checkbox.prop('checked')) {
      isAnyChecked = true;
    }
  });

  if (!isAnyChecked) {
    Swal.fire({
      icon: 'warning',
      title: 'Uyarı',
      text: 'Lütfen silmek için en az bir satır seçin!',
    });
    return;
  }

  Swal.fire({
    title: 'Emin misiniz?',
    text: 'Bu işlemi geri alamayacaksınız!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Evet, sil!',
    cancelButtonText: 'Hayır, vazgeç!',
  }).then((result) => {
    if (result.isConfirmed) {
      let removedCount = 0;

      rows.each(function () {
        const checkbox = $(this).find('input[type="checkbox"]');
        if (checkbox.prop('checked')) {
          $(this).remove();
          removedCount++;
        }
      });

      if (removedCount > 0) {
        updateRowNumbers();
        Swal.fire('Silindi!', 'Seçili satır(lar) başarıyla silindi.', 'success');
      }
    }
  });
}

function updateRowNumbers() {
  const rows = $('#tableBody tr');
  rows.each(function (index) {
    $(this)
      .find('th')
      .text(index + 1);
  });
}

$(document).ready(function () {
  $('#image-upload').on('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageSrc = e.target.result;
        $('#preview-image').attr('src', imageSrc);
        $('#lightbox-link').attr('href', imageSrc);
      };
      reader.readAsDataURL(file);

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
      const time = currentDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

      $('#upload-date').text(`Kayıt Tarihi: ${date}`);
      $('#upload-time').text(`Saat: ${time}`);

      Swal.fire({
        icon: 'success',
        title: 'Resim Yüklendi!',
        text: 'Resim başarıyla yüklendi!',
        confirmButtonText: 'Tamam',
      });
    }
  });
  $('.masraf-table').on('input change', '.Tutar, .KdvOran', function () {
    var row = $(this).closest('tr');
    var tutar = parseFloat(row.find('.Tutar').val());
    var kdvOran = parseFloat(row.find('.KdvOran').val());

    if (!isNaN(tutar) && !isNaN(kdvOran)) {
      var matrah = tutar / (1 + kdvOran / 100);
      row.find('.Matrah').val(matrah.toFixed(2));

      var kdvTutar = tutar - matrah;
      row.find('.KdvTutar').val(kdvTutar.toFixed(2));
    } else {
      row.find('.Matrah').val('');
      row.find('.KdvTutar').val('');
    }
  });
});

$(document).ready(function () {
  function calculateKDVandMatrah() {
    var toplamTutar = parseFloat($('#toplam-tutar').val()) || 0;
    var kdvOrani = parseFloat($('#kdv-orani').val()) || 0;

    if (toplamTutar > 0 && kdvOrani > 0) {
      var kdvTutari = toplamTutar * (kdvOrani / (100 + kdvOrani));

      var matrah = toplamTutar - kdvTutari;

      $('#kdv-tutar').val(kdvTutari.toFixed(2));
      $('#Matrah').val(matrah.toFixed(2));
    }
  }
  $('#toplam-tutar, #kdv-orani').on('input change', function () {
    if ($('#toplam-tutar').val() !== '' && $('#kdv-orani').val() !== '') {
      calculateKDVandMatrah();
    }
  });
});
