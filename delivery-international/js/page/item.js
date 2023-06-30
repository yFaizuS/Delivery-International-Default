$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search); //fungsi untuk medefinisikan url params
  const idParams = urlParams.get('id') //Fungsi untuk mendefinisikan id dari param
  const data = {} //Fungsi untuk menyimpan data dari api yang sudah di-fetch
  // Fungsi untuk mehit API dish sesuai dengan id nya dan menggunakan endpoint get
  const headers = {//Fungsi untuk menyimpan token pada localStorage
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
  ajaxRequest(
    //Me-fetch data pada url api "api/dish/idparams" berdasarkan id dari paramsnya dengan menggunakan endpoint GET
    `api/dish/${idParams}`,
    'GET',
    JSON.stringify(data),
    function (response) { //Fungsi untuk menerima response dari fetch api diatas yang akan ditampilkan kedalam html
      $("#imageItem").attr("src", response.image) //id imageItem pada html dan akan menampilkan data image dari response.image
      $("#title").html(`Dish category - ${response.category} <br> ${response.vegetarian ? 'vegetarian' : 'Not vegetarian'}`) //id title pada html dan akan menampilkan data title dari response.title
      $("#deskripsi").html(`${response.description}`) //id deskripsi pada html dan akan menampilkan data deskripsi dari response.deskripsi
      $("#harga").text(`${response.price} p`) //id harga pada html dan akan menampilkan data harga dari response.harga
    },
    function (jqXHR, textStatus, errorThrown) {
      // window.location.href = "order.html"
    },
    headers
  );
  // Fungsi untuk memberikan rating mulai dengan 1 - 10
  const a = Array(10).fill(1)
  for (let i = 1; i <= a.length; i++) { //Perulangan untuk rating dari 1-10 
    const a = $(`#star${i}`) //id star yang akan ditampilkan pada html
    a.on('click', () => {
      const rate = i //Definisi rate = i yaitu 1
      const data = {} //Fungsi untuk menyimpan data
      // Fungsi untuk memberikan rating sesuai dengan idnya dan berdasarkan perulangan yang udah dibuat diatas menggunakan endpoint POST
      const headers = {//Fungsi untuk menyimpan token
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
      ajaxRequest(
        //Me-fetch data pada url api "api/dish/${idParams}/rating?ratingScore=${i}" dengan menggunakan endpoint POST
        `api/dish/${idParams}/rating?ratingScore=${i}`,
        'POST',
        JSON.stringify(data),
        function (response) { //Fungsi response jika berhasil memberikan rate
          alert("Berhasil Memberi Rate")
        },
        function (jqXHR, textStatus, errorThrown) {
          // alert(jqXHR);
          if (jqXHR.status == 200) { //Kondisi response jika berhasil memberikan rating dan langsung pergi kehalaman order.html
            alert("Berhasil Memberi Rate")
            window.location.href = "order.html"
          } else { //Kondisi jika gagal memberikan rating
            alert("Gagal Memberi Rate")
          }
        },
        headers
      );

    })
  }
});