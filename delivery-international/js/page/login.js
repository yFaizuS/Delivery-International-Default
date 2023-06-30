$(document).ready(function () { //Fungsi untuk melakukan login
  $('#form').submit(function (event) {
    event.preventDefault();
    const data = { //Fungsi data yang menyimpan inputan yang akan digunakan untuk login yaitu email dan password
      email: $('#email').val(), //id email
      password: $('#password').val() //id password
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    // Get API Login dengan menggunakan method POST
    ajaxRequest(
      // Untuk me-fetch kedalam url "api/account/login" dengan menggunakan parameter POST
      'api/account/login',
      'POST',
      JSON.stringify(data),
      function (response) { //Fungsi jika sukses login dengan menyimpan token pada localStorage
        localStorage.setItem('token', response.token)
        window.location.href = 'index.html'
        alert("Login Success");
      },
      // Jika dia gagal maka menampilkan respons dari alert dibawah ini 
      function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.message);
      },
      headers
    );
  });
})