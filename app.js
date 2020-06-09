/*
    8 june 
    alur: buat semua di app.js baru pembagian
    pertama buat env
    ke file config/global
    buat mysql pindahkan code. export dan import pada app
    buat index untuk memberikan keterangan
*/

const express = require('express');
const app = express();

//dotenv : untuk menyimpna data yang sensitif (DB)
require('dotenv').config()

//body parser : berfungsi untuk merubah dari json ke javascript
const bodyParser = require('body-parser')

//morgan : unutk memberika log pada postmannya
const morgan = require('morgan')

//connection berfungsi untuk mengkoneksi ka mysl, di proses .env ke mysql 
const connection = require('./src/helpers/mysql')

const routers = require('./src/routes/index')

//memberikan keterangan error atau tidaknya
connection.connect(function(error) {
    if (error) throw error;
    console.log("databse has connected")
})

// eksekusi morgan
app.use(morgan('dev'));

//eksekusi body parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.use('/', routers)

app.listen(3000, function() {
    //untuk memberi notif tampilan port 3000
    console.log('posapp-api running at port 3000!')
})