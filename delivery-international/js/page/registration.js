// Fungsi untuk membuat akun baru
$(document).ready(function () {
  $('#form').submit(function (event) {
    event.preventDefault();
    // Fungsi untuk mendefinisikan field dari setiap input pada form dari fullname - phoneNumber
    const data = {
      fullName: $('#fullName').val(), //#id fullName
      password: $('#password').val(), //id password
      email: $('#email').val(), //id email
      address: $('#address').val(), //id address 
      birthDate: $('#date').val(), //id date 
      gender: $('#gender').val(), //id gender
      phoneNumber: $('#phoneNumber').val() //id phoneNumber
    }
    const headers = {
      'Content-Type': 'application/json'
    };
    // Fungsi untuk membuat data baru pada API register dan menggunakan endpoint POST
    ajaxRequest(
      // Link url API untuk membuat akun baru
      'api/account/register',
      // Menggunakan endpoint POST
      'POST',
      JSON.stringify(data),
      function (response) {
        alert('Register berhasil!');
      },
      function (jqXHR, textStatus, errorThrown) {
        alert('Register gagal!');
      },
      headers
    );
  });
})

