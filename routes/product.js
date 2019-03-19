var express = require('express');
var app = express();
var Product = require('../models/product');
//list products
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    Product.find({})
        .skip(since)
        .limit(30)
        .populate('category')
        .exec(
            (err, products) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding products',
                        err
                    });
                }
                Product.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        products,
                        counting
                    });
                });
            });
});
//create product
app.post('/', (req, res) => {
    var body = req.body;
    var product = new Product({
        name: body.name,
        description: body.description,
        stock: body.stock,
        price: body.price,
        category: body.category
    });
    product.save((err, productSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create product',
                err
            });
        }
        res.status(201).json({
            ok: true,
            productSave
        });
    });
});
//update product
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Product.findById(id, (err, product) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to search product',
                err
            });
        }
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: 'the id' + id + ' does not exist'
            });
        }
        product.name = body.name;
        product.description = body.description;
        product.stock = body.stock;
        product.price = body.price;
        product.category = body.category;

        product.save((err, productSave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Failed to update product',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                productSave
            });
        });
    });
});
//delete product
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Product.findByIdAndDelete(id, (err, productDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete product',
                err
            });
        }
        if (!productDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no product'
            });
        }
        res.status(200).json({
            ok: true,
            productDelete
        });
    });
});
module.exports = app;