const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 1200;

// vuew engine hbs
index.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'gustaf',
    password: '0000',
    database: 'onlineshop'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

index.get('/', (req, res) => {
    koneksi.query('use onlineshop', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'DATA-DATA',
            data: hasil
        });
    });
});

index.get('/pelanggan', (req, res) => {
    koneksi.query('SELECT*FROM pelanggan', (err, hasil) => {
        if(err) throw err;
        res.render('pelanggan.hbs',{
            judulhalaman: 'DATA-PELANGGAN',
            data: hasil
        });
    });
});

index.post('/pelanggan', (req, res) =>{
    var NAMA = req.body.inputNAMA;
    var ALAMAT = req.body.inputALAMAT;
    var TELEPON = req.body.inputTELEPON;
    koneksi.query('INSERT INTO pelanggan(NAMA, ALAMAT, TELEPON)values(?,?,?)',
    [NAMA, ALAMAT, TELEPON],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pelanggan');
    }
    )
});

index.get('/hapus-NAMA/:NAMA', (req, res) => {
    var NAMA = req.params.NAMA;
    koneksi.query("DELETE FROM pelanggan WHERE NAMA=?",
         [NAMA], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pelanggan');
         }
    )
});


index.get('/penjualan', (req, res) => {
    koneksi.query('SELECT*FROM penjualan', (err, hasil) => {
        if(err) throw err;
        res.render('penjualan.hbs',{
            judulhalaman: 'DATA-PENJUALAN',
            data: hasil
        });
    });
});

index.post('/penjualan', (req, res) =>{
    var NAMA_BARANG = req.body.inputNAMA_BARANG;
    var JUMLAH = req.body.inputJUMLAH;
    var HARGA = req.body.inputHARGA;
    koneksi.query('INSERT INTO penjualan(NAMA_BARANG, JUMLAH, HARGA)values(?,?,?)',
    [NAMA_BARANG, JUMLAH, HARGA],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/penjualan');
    }
    )
});

index.get('/hapus-NAMA_BARANG/:NAMA_BARANG', (req, res) => {
    var NAMA_BARANG = req.params.NAMA_BARANG;
    koneksi.query("DELETE FROM penjualan WHERE NAMA_BARANG=?",
         [NAMA_BARANG], (err, hasil) => {
             if(err) throw err;
             res.redirect('/penjualan');
         }
    )
});

index.get('/pendapatan', (req, res) => {
    koneksi.query('SELECT*FROM pendapatan', (err, hasil) => {
        if(err) throw err;
        res.render('pendapatan.hbs',{
            judulhalaman: 'DATA-PENDAPATAN',
            data: hasil
        });
    });
});

index.post('/pendapatan', (req, res) =>{
    var keterangan = req.body.inputketerangan;
    var jumlah = req.body.inputjumlah;
    koneksi.query('INSERT INTO pendapatan(keterangan, jumlah)values(?,?)',
    [keterangan, jumlah],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pendapatan');
    }
    )
});

index.get('/hapus-id_transaksi/:id_transaksi', (req, res) => {
    var id_transaksi = req.params.id_transaksi;
    koneksi.query("DELETE FROM pendapatan WHERE id_transaksi=?",
         [id_transaksi], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pendapatan');
         }
    )
});

index.listen(port, () => {
    console.log(`app berjalan pada port ${port}`);
});