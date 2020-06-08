const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const connection = require('./src/helpers/mysql')
const helpers = require('./src/helpers/index')


connection.connect(function(error) {
    if (error) throw error;
    console.log("databse has connected")
})

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.get('/products', function(request, response) {
    connection.query('SELECT * FROM tb_products', function(error, result) {
        if (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
        return helpers.response(response, 'success', result, 200)
    })
})

app.post('/products', function(request, response) {
    const setData = request.body
    console.log(request.body)
    connection.query('INSERT INTO tb_products SET ?', setData, function(error, result) {
        if (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
        console.log(result)
        const newData = {
            id: result.insertId,
            ...setData
        };
        return helpers.response(response, 'success', newData, 200)
    })
})

app.put('/products/:id', function(request, response) {
    const setData = request.body;
    const id = request.params.id;
    connection.query('UPDATE tb_products SET ? WHERE id_products=?', [setData, id], function(error, result) {
        if (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
        console.log(result)
        const newData = {
            id: result.insertId,
            ...setData
        };
        return helpers.response(response, 'success', newData, 200)
    })
})

app.delete('/products/:id', function(request, response) {
    const id = request.params.id;
    connection.query('DELETE FROM tb_products WHERE id_products=?', id, function(error, result) {
        if (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
        const newData = {
            id: result.insertId,
            ...setData
        };
        return helpers.response(response, 'success', newData, 200)
    })
})

app.listen(3000, function() {
    console.log('posapp-api running at port 3000!')
})