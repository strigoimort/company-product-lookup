
async function loadProducts() {
    try {
        const response = await fetch('data.json');
        const products = await response.json();

        // Mengelompokkan produk berdasarkan nilai KP
        const groupedProducts = products.reduce((acc, product) => {
            if (!acc[product.kp]) {
                acc[product.kp] = [];
            }
            acc[product.kp].push(product);
            return acc;
        }, {});

        const tbody = document.querySelector('#product-table tbody');

        Object.keys(groupedProducts).forEach(kp => {
            const group = groupedProducts[kp];

            // Tambahkan baris grup untuk KP
            const groupRow = document.createElement('tr');
            groupRow.classList.add('bg-gray-200', 'font-semibold');
            groupRow.innerHTML = `
                <td colspan="6" class="py-3 px-4 text-sm">${kp}</td>
            `;
            tbody.appendChild(groupRow);

            // Tambahkan baris produk untuk setiap grup
            group.forEach(product => {
                const row = document.createElement('tr');
                row.classList.add('border-b', 'border-gray-300', 'hover:bg-gray-50');

                const statusColorClass = product.status === 'Active' ? 'text-blue-500' : 'text-red-500';

                row.innerHTML = `
                    <td class="py-3 px-4 text-sm">${product.kode_pl}</td>
                    <td class="py-3 px-4 text-sm">${product.kode_acm}</td>
                    <td class="py-3 px-4 text-sm">${product.kode_pcp}</td>
                    <td class="py-3 px-4 text-sm">${product.item_desc}</td>
                    <td class="py-3 px-4 text-sm">
                        <span class="${statusColorClass}">${product.status}</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-center">
                        <button class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600" 
                            onclick="showDetails('${product.group}', '${product.kp}', '${product.supplier}', 
                            '${product.lead_time}', '${product.loading_capacity}', '${product.storage}', 
                            '${product.gramasi}', '${product.kode_pl}', '${product.item_desc}', 
                            '${product.image || 'images/default.jpg'}', '${product.price || 'No price'}', '${product.status}')">Details</button>
                    </td>
                `;

                tbody.appendChild(row);
            });
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function showDetails(group, kp, supplier, leadTime, loadingCapacity, storage, gramasi, name, description, image, price, status) {
// Mengisi modal dengan data produk
document.getElementById('modal-name').textContent = name;
document.getElementById('modal-item-desc').textContent = description;
document.getElementById('modal-price').textContent = price ? `IDR ${price}` : 'No price'; // Menambahkan IDR sebagai currency
document.getElementById('modal-image').src = image;
document.getElementById('modal-group').textContent = group;
document.getElementById('modal-kp').textContent = kp;
document.getElementById('modal-supplier').textContent = supplier;
document.getElementById('modal-lead-time').textContent = leadTime;
document.getElementById('modal-loading-capacity').textContent = loadingCapacity;
document.getElementById('modal-storage').textContent = storage;
document.getElementById('modal-gramasi').textContent = gramasi;
document.getElementById('modal-status').textContent = status; // Menampilkan status

// Menampilkan modal
document.getElementById('product-modal').classList.remove('hidden');
}


// Menutup modal
document.getElementById('close-modal').onclick = function() {
    document.getElementById('product-modal').classList.add('hidden');
}

// Menutup modal ketika mengklik di luar modal
window.onclick = function(event) {
    if (event.target == document.getElementById('product-modal')) {
        document.getElementById('product-modal').classList.add('hidden');
    }
}

// Event listener untuk kolom pencarian
document.getElementById('search-input').addEventListener('input', function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#product-table tbody tr:not(.bg-gray-200)');
    rows.forEach(row => {
        const itemDesc = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
        if (itemDesc.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Memuat produk setelah halaman selesai dimuat
window.onload = loadProducts;