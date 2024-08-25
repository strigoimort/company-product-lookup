const xlsx = require('xlsx');
const fs = require('fs');

// Baca file Excel (ganti 'data.xlsx' dengan nama file Excel kamu)
const workbook = xlsx.readFile('master_data.xlsx');
const sheet_name_list = workbook.SheetNames;

// Konversi sheet pertama ke JSON
const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Simpan JSON ke file
fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2), 'utf-8');
console.log('Excel data has been converted to JSON and saved to data.json');
