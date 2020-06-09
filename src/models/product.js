const connection = require('../helpers/mysql')

module.exports = {
    getAllProductModel: function() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_products', function(error, result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    postProductModel: function(setData) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tb_products SET ?', setData, function(error, result) {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id: result.insertId,
                    ...setData
                };

                resolve(newData)
            })
        })
    },

    putProductModel: function(setData, id) {
        return new Promise((resolve, reject) => {
            //const id = request.params.id;

            connection.query('UPDATE tb_products SET ? WHERE id_products=?', [setData, id], function(error, result) {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id,
                    ...setData
                };

                resolve(newData)
            })
        })
    },

    deleteProductModel: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM tb_products WHERE id_products=?', id, function(error, result) {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}