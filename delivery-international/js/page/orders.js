$(document).ready(function () {
    const convertDate = (originalDateTime, format) => { //Fungsi untuk mengonvert data waktu dari back-end menjadi waktu sesuai kita
        const dateTime = new Date(originalDateTime); //Fungsi untuk merubah menjadi data waktu terbaru
        const returnDate = dateTime.toLocaleDateString('en-GB', { //Fungsi untuk mengirimkan data waktu pada local yang terdiri dari day, month year
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '.');
        if (format === 1) {
            return returnDate
        } else {
            return `${returnDate} ${dateTime.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            })}`;
        }
    }
    const getOrdersAjax = () => { //Fungsi untuk menampikan hasil order
        const data = ""; //Fungsi untuk menyimpan data yang akan ditampilkan
        const headers = { //Fungsi untuk menyimpan token
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        ajaxRequest(
            //Untuk me-fetch kedalam url api "api/order" dan menggunakan endpoint GET untuk menampilkan data yang udah diorder
            'api/order',
            'GET',
            JSON.stringify(data),
            function (response) {
                getOrders(response)
            },
            function (jqXHR, textStatus, errorThrown) {
            },
            headers
        );
    }
    getOrdersAjax()
    const getOrders = (res) => { //Fungsi untuk menampikan data yang sudah difetch di atas dan akan ditampilkan di html
        $("#cartItemsContainer").empty() //Id cartItemsContainer yang akan ditampilkan di html
        $.each(res, function (index, item) { //Fungsi menampilkan data yang sudah difetch pada fungsi getOrdersAjax untuk ditampiilkan ke html
            let buttonHtml = ''; //Button untuk konfirm delivery
            if (item.status === 'InProcess') { //Kondisi jika dia statusnya proses dan diklik button maka berubah menjadi Confirm Delivery
                buttonHtml = `<button type="submit" class="btn btn-outline-success" id="confirmDelivery" data-delifery-id="${item.id}">Confirm delivery</button>`;
            } else {
                buttonHtml = '';
            }
            // Fungsi untuk menampilkan data pada html yang berisi dari id, orderTime, status, deliveryTime, price
            const html = `<div class="row mb-3 border py-2" id="keditail" data-detail-id="${item.id}">
                        <div class="col-sm-8 text-center text-md-start">
                            <p class="text-bold">Order from ${convertDate(item.orderTime, 1)}</p>
                            <p>Order status - ${item.status}</p>
                            <p>Delivery time: ${convertDate(item.deliveryTime, 2)}</p>
                        </div>
                        <div class="col-sm-4 text-center text-md-end">
                            ${buttonHtml}
                            <p class="mt-4"><strong>Total order cost:</strong> ${item.price} P</p>
                        </div>                          
                    </div>`
            $("#cartItemsContainer").append(html)
        })
    }
    $(document).on("click", "#confirmDelivery", function (e) { //Fungsi untuk mengubah status dari in process menjadi delivery
        e.stopPropagation();
        const itemId = $(this).data("delifery-id"); //untuk menginsialisasi item berdasarkan id
        const data = ""; //Fungsi untuk menyimpan data dari api yang sudah didapatkan
        const headers = { //Fungsi untuk menyimpan token
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        ajaxRequest(
            //Untuk me-fetch data pada url api "api/order/${itemId}/status" dengan menggunakan endpoint POST dan dicari berdasarkan idnya
            `api/order/${itemId}/status`,
            'POST',
            JSON.stringify(data),
            function (response) {
                getOrdersAjax()
            },
            function (jqXHR, textStatus, errorThrown) {
                // Status jika sudah berhasil
                if (jqXHR.status == 200) {
                    getOrdersAjax()
                    alert("Orderan telah dikonfirmasi")
                } else { //Status jika gagal
                    alert("Gagal mengkonfirmasi orderan")
                }
            },
            headers
        );
    });
    $(document).on("click", "#keditail", function () { //Fungsi untuk mengklik detail order berdasarkan id
        const id = $(this).data("detail-id") //melihat detail order berdasarkan id
        localStorage.setItem("detailOrderId", id)
        window.location.href = `order.html?id=${id}`
    })

});
