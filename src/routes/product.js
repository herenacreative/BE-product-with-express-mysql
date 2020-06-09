const experess = require('express')
const router = experess.Router()
const productController = require('../controllers/product')

router.get('/', productController.getAllProduct)
router.post('/', productController.postProduct)
router.put('/:id', productController.putProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router