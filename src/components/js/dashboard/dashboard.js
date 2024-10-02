document.addEventListener('DOMContentLoaded', function () {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  const aylarSelect = document.getElementById('Aylar');

  aylarSelect.value = currentMonth;
});
