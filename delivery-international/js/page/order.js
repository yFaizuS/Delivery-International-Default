$(document).ready(function () {
  const localStorageId = localStorage.getItem("detailOrderId") //Fungsi untuk menyimpan data id pada localstorage
  const urlParams = new URLSearchParams(window.location.search); //fungsi untuk medefinisikan url params
  const idParams = urlParams.get('id') //Fungsi untuk mendefinisikan id dari param
  const convertDate = (originalDateTime) => { //Fungsi untuk merubah menjadi data waktu terbaru
    const dateTime = new Date(originalDateTime);  //Fungsi untuk mengirimkan data waktu pada local yang terdiri dari day, month year
    const returnDate = dateTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');
    return `${returnDate} ${dateTime.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }
  // Fungsi untuk melihat data pada detail order dengan menggunakan API order dan endpoint GET
  const getDetailOrderajax = (id) => { //Fungsi untuk melihat detail orderan 
    const data = ""; //Fungsi untuk menyimpan data yang sudah difetch pada api
    const headers = { //Fungsi untuk menyimpan token pada localstorage
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    ajaxRequest(
      //Me-fetch data pada url api "api/order/$id" dengan menggunakan endpoint GET
      `api/order/${id}`,
      'GET',
      JSON.stringify(data),
      function (response) { //Fungsi jika berhasil maka dia terhubung dengan fungsi getDetailOrder
        getDetailOrder(response)
      },
      // Fungsi jika dia gagal
      function (jqXHR, textStatus, errorThrown) {
      },
      headers
    );
  }
  if (localStorageId == idParams) { //Kondisi jika local-storage sama dengan id dari paramsnya maka dia akan mereturn paramsnya
    getDetailOrderajax(idParams)
  } else { //Kondisi jika hanya local storage berdasarkan id
    getDetailOrderajax(localStorageId)
  }
  // Fungsi untuk menampilkan data yang sudah dihit di atas dan ditampilakn di HTML dibawah
  const getDetailOrder = (res) => {
    $.each(res.dishes, function (index, item) {
      // Fungsi html untuk menampilkan data dari data yang sudah di fetch diatas untuk menampilkan id, image, name, price, amount, totalPricce
      const html = `
              <div for="fullName" class="row mb-3 border py-2" id="redirecttoItem" data-item-id="${item.id}">
                <div for="fullName" class="col-sm-2 text-center text-md-start">
                  <img src="${item.image}" width="100" height="80" alt="Image" class="rounded border rounded-5">
                </div>
                <div for="fullName" class="col-sm-3 text-center text-md-start">
                  <p class="text-bold">${item.name}</p>
                  <p>Price/dish: ${item.price} P</p>
                  <p>Quantitiy: ${item.amount}</p>
                </div>
                <div class="col-sm-7 text-center text-md-end">
                    <p class="mt-md-5 pt-md-4"><strong>Total order cost:</strong> ${item.totalPrice} P</p>
                </div>      
              </div>      
        `
      $('#cartItemsContainer').append(html)
      $("#total").html(`<strong>Total:</strong> ${res.price} P`)
    })
    // Fungsi convertDate merupakan convert data yang sesuai dengan API
    const html = `
      <p>Created at: ${convertDate(res.orderTime)}</p> 
      <p>Delivery time: ${convertDate(res.deliveryTime)}</p>
      <p>Delivery address: ${res.address}</p>
      <p>Order status - ${res.status}</p>
    `
    $("#detailInfo").html(html)
  }
  $(document).on("click", "#redirecttoItem", function () { //Fungsi jika mengklik order maka dia masuk ke item.html dan berdasarkan idnya
    const id = $(this).data("item-id")
    window.location.href = `item.html?id=${id}`
  })
});