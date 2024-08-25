// Mengambil data dari file JSON
let products = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

// Fungsi untuk melakukan lookup produk
function lookupProduct() {
    const productCode = document.getElementById('productCode').value.trim();

    // Mencari produk berdasarkan kode_pl atau kode_acm
    const product = products.find(p => p.kode_pl === productCode || p.kode_acm.toString() === productCode);
    if (product) {
        const productInfo = document.getElementById('productInfo');
        productInfo.innerHTML = `
        <p><span class="key text-blue-500">Description</span><br>${product.item_desc}</p>
        <p><span class="key text-blue-500">Code Fina</span><br>${product.kode_pl}</p>
        <p><span class="key text-blue-500">Code Acumatica</span><br>${product.kode_acm}</p>
        <p><span class="key text-blue-500">Code Principal</span><br>${product.kode_pcp}</p>
        `;
        productInfo.classList.add('show'); // Menambahkan class untuk menampilkan info
    } else {
        const productInfo = document.getElementById('productInfo');
        productInfo.innerHTML = '<p class="text-red-500">Product not found.</p>';
        productInfo.classList.remove('show'); // Menghapus class jika produk tidak ditemukan
    }
}

// Fungsi untuk cek enter key press
function checkEnter(event) {
    if (event.key === 'Enter') {
        lookupProduct();
    }
}
