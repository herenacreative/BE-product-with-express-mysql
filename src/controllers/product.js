const connection = require('../helpers/mysql')
const helpers = require('../helpers/index')
const productModel = require('../models/product')

module.exports = {
    getAllProduct: async function(request, response) {
        try {
            const result = await productModel.getAllProductModel()
            return helpers.response(response, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
    },
    postProduct: async function(request, response) {
        const setData = request.body
        try {
            const result = await productModel.postProductModel(setData)

            return helpers.response(response, 'success', result, 200)
        } catch (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
    },

    putProduct: async function(request, response) {
        const setData = request.body;
        const id = request.params.id;
        try {
            const result = await productModel.putProductModel(setData, id)
            return helpers.response(response, 'success', result, 200)
        } catch (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }
    },

    deleteProduct: async function(request, response) {
        const id = request.params.id;
        try {
            const result = await productModel.deleteProductModel(id)
            return helpers.response(response, 'success', result, 200)
        } catch (error) {
            console.log(error);
            return helpers.response(response, 'fail', 'internal Server Error', 500)
        }

    }
}