$(document).ready(function () {
  // Fungsi untuk menampilkan data pada menu profile
  const getProfileAjax = () => {
    const data = ""; //Fungsi untuk menerima data yang sudah difetch ke api
    const headers = {//Fungsi untuk menyimpan token
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    ajaxRequest(
      // Untuk me-fetch data kedalam url "api/account/profile" dengan menggunakan endpoint GET
      'api/account/profile',
      'GET',
      JSON.stringify(data),
      // Fungsi jika status berhasil maka dia menampilkan datanya
      function (response) {
        getProfile(response)
      },
      // Fungsi jika dia error
      function (jqXHR, textStatus, errorThrown) {
        // alert(jqXHR);
      },
      headers
    );
  }
  getProfileAjax()
  const getProfile = (data) => { //Fungsi untuk menampilkan data yang sudah diambil dari api url "api/account/profile" 
    $('#fullName').val(data.fullName), //id fullName
      $('#staticEmail').val(data.email), //id staticEmail
      $('#address').val(data.address), //id address
      $('#dateofBirth').val(data.birthDate.split("T")[0]), //id dateofBirth
      $('#gender').val(data.gender), //idgender
      $('#phoneNumber').val(data.phoneNumber) //idephoneNumber
  }

  $("#formProfile").on('submit', (e) => { //Fungsi yang berisi id formProfile digunakan untuk mengirimkan data untuk fungsi update data
    e.preventDefault()
    const data = { //Fungsi sebagai tempat untuk menyimpan data dibawah ini yang akan dilakukan untuk update data profile
      fullName: $('#fullName').val(), //id fullName
      birthDate: $('#dateofBirth').val(), //id dateofBirth
      gender: $('#gender').val(), //id gender
      address: $('#address').val(), //id address
      phoneNumber: $('#phoneNumber').val() //ide phoneNumber
    }
    const headers = { //Fungsi untuk menyimpan token
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    ajaxRequest(
      // Untuk me-fetch data kedalam url "api/account/profile" dengan menggunakan endpoint PUT untuk update/edit data
      'api/account/profile',
      'PUT',
      JSON.stringify(data),
      // Fungsi jika berhasil untuk mengupdate data
      function (response) {
        getProfileAjax()
        alert("Berhasil update data")
      },
      function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 200) { //Perulangan jika berhasil update data
          alert("Berhasil update data")
        } else { // Jika gagal maka muncul alert dibawah ini
          alert("gagal")
        }
      },
      headers
    );
  })
})




