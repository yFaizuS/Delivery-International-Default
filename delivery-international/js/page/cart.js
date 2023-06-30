$(document).ready(function () {
  const getCartAjax = () => {
    const data = "";
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    ajaxRequest(
      'api/basket', //Integrasi dengan API basket menggunakan endpoint get untuk menampilkan semua data yang ada di api Basket
      'GET',
      JSON.stringify(data),
      function (response) {
        getCart(response)
      },
      function (jqXHR, textStatus, errorThrown) {
      },
      headers
    );
  }
  getCartAjax()
  // Fungsi untuk melakukan perulangan pada cart dengan data yang sudah di get diatas
  const getCart = (res) => {
    $("#cartItemsContainer").empty();
    $.each(res, function (index, item) {
      const html = `<div class="row mb-3 border py-2">
            <div for="fullName" class="col-sm-1 text-center text-md-start">
                <p>${index + 1}.</p>
              </div>
              <div for="fullName" class="col-sm-2 text-center text-md-start">
                <img src="${item.image}" width="100" height="80" alt="Image" class="rounded border rounded-5">
              </div>
              <div for="fullName" class="col-sm-3 text-center text-md-start">
                <p class="font-weight-bold">${item.name}</p>
                <p>Price/dish: ${item.price} P</p>
              </div>
              <div for="fullName" class="col-sm-2 text-center text-md-start">
                <div class="counter text-center text-md-start">
                  <button class="btn btn-light counter-btn" id="decrease" data-item-id2="${item.id}">-</button>
                  <span class="counter-value">${item.amount}</span>
                  <button class="btn btn-light counter-btn" id="increase" data-item-id2="${item.id}">+</button>
                </div>
              </div>
              <div for="fullName" class="col-sm-4 text-center text-md-end pt-3 pt-md-0">
                <button type="submit" class="btn btn-danger ms-auto" id="remove" data-item-id="${item.id}">Remove</button>
              </div>
            </div>`
      $("#cartItemsContainer").append(html);
    })
  }
  // Fungsi untuk menghapus data pada cart
  $(document).on("click", "#remove", function () {
    const itemId = $(this).data("item-id");
    removeCart(itemId, false)
  });
  // Fungsi untuk mengurangi data count untuk jumlah data makanan/minuman
  $(document).on("click", "#decrease", function () {
    const itemId = $(this).data("item-id2");
    removeCart(itemId, true)
  });
  // Fungsi untuk menambahkan data count untuk jumlah data makanan/minuman
  $(document).on("click", "#increase", function () {
    const itemId = $(this).data("item-id2");
    addCart(itemId)
  });
  const addCart = (id) => { //Fungsi untuk menambahkan data
    const data = "";
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    // Fungsi untuk menambahkan cart dengan endpoint POST pada halaman menu
    ajaxRequest(
      `api/basket/dish/${id}`,
      'POST',
      JSON.stringify(data),
      function (response) { //Fungsi jika berhasil menambahkan data
        alert("Berhasil menambahkan ke cart")
      },
      function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 200) { //Kondisi jika berhasil menambahkan data
          getCartAjax()
        } else { //Kondisi jika gagal menambahkan data
          alert("Gagal menambahkan ke cart")
        }
      },
      headers
    );
  }
  const removeCart = (id, bool) => { //Fungsi untuk menghapus cart dengan parameter yang digunakan id dan type bolean
    const data = ""; //Untuk menyimpan data yang akan dihapus
    const headers = { //Fungsi untuk menyimpan token
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    // Fungsi untuk menghapus cart pada url api "api/basket/dish/${id}?increase=${bool}" berdasarakan idnya dengan menggunakan endpoint DELETE
    ajaxRequest(
      `api/basket/dish/${id}?increase=${bool}`,
      'DELETE',
      JSON.stringify(data),
      function (response) {
        getCartAjax()
        alert("berhasil mengahapus dari cart")
      },
      function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 200) { //Kondisi jika berhasil menghapus data
          getCartAjax()
          if (bool == false) {
            alert("berhasil mengahapus dari cart")
          }
        } else {//Kondisi jika gagal menghapus data
          alert("gagal mengahapus dari cart")
        }
      },
      headers
    );
  }
});

