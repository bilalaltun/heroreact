$(document).ready(function () {
  $('#ProjeEkle').on('click', function () {
    const projeAdi = $('#Proje').val().trim();
    const projeAciklama = $('#ProjeAciklama').val().trim();
    if (projeAdi === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Uyarı',
        text: 'Proje adını yazınız!',
      });
      return;
    }

    const newRow = `
                        <tr>
                            <th></th>
                            <td class="guncelleInput w-25">${projeAdi}</td>
                            <td class="guncelleTextarea w-25">${projeAciklama}</td>
                            <td>
                                <div class="form-check form-switch form-switch-md">
                                    <input type="checkbox" class="form-check-input durumCheckbox" checked="">
                                </div>
                            </td>
                                    <td><button class="btn btn-warning guncelleProje"><i class="mdi mdi-pencil font-size-14"></i></button></td>
                            <td><input type="checkbox" class="form-check-input selectBtn mt-2"></td>
                        </tr>
                    `;

    $('#ProjeTable tbody').append(newRow);
    $('#Kategori').val('');

    updateRowNumbers();
  });

  $(document).on('click', '.silProje', function () {
    const selectedRows = $('#ProjeTable tbody input.selectBtn:checked');

    if (selectedRows.length === 0) {
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
        selectedRows.each(function () {
          $(this).closest('tr').remove();
        });

        updateRowNumbers();

        Swal.fire('Silindi!', 'Seçili proje(ler) başarıyla silindi.', 'success');
      }
    });
  });

  function updateRowNumbers() {
    $('#ProjeTable tbody tr').each(function (index) {
      $(this)
        .find('th')
        .text(index + 1);
    });
  }
});
$(document).on('click', '.guncelleProje', function () {
  const row = $(this).closest('tr');

  const currentText = row.find('.guncelleInput').text().trim();
  const currentDescription = row.find('.guncelleTextarea').text().trim();

  const inputField = `<input type="text" class="form-control tempInput" value="${currentText}">`;
  const descriptionField = `<textarea class="form-control tempDescription" rows="1">${currentDescription}</textarea>`;

  row.find('.guncelleInput').html(inputField);
  row.find('.guncelleTextarea').html(descriptionField);

  $(this).removeClass('btn-warning guncelleProje').addClass('btn-primary okBtn').html(`<i class="mdi mdi-check"></i>`);
});

$(document).on('click', '.okBtn', function () {
  const row = $(this).closest('tr');

  const newValue = row.find('.tempInput').val().trim();
  const newDescription = row.find('.tempDescription').val().trim();

  row.find('.guncelleInput').html(newValue);
  row.find('.guncelleTextarea').html(newDescription);

  $(this).removeClass('btn-primary okBtn').addClass('btn-warning guncelleProje').html(`<i class="mdi mdi-pencil font-size-14"></i>`);
});

$(document).ready(function () {
  $('.AktifEt').on('click', function () {
    if ($('#ProjeTable .selectBtn:checked').length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Dikkat!',
        text: 'Lütfen işlem yapmak için en az bir satır seçin.',
        confirmButtonText: 'Tamam',
      });
    } else {
      $('#ProjeTable .selectBtn:checked').each(function () {
        $(this).closest('tr').find('.durumCheckbox').prop('checked', true);
      });
    }
  });

  $('.PasifEt').on('click', function () {
    if ($('#ProjeTable .selectBtn:checked').length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Dikkat!',
        text: 'Lütfen işlem yapmak için en az bir satır seçin.',
        confirmButtonText: 'Tamam',
      });
    } else {
      $('#ProjeTable .selectBtn:checked').each(function () {
        $(this).closest('tr').find('.durumCheckbox').prop('checked', false);
      });
    }
  });
});
