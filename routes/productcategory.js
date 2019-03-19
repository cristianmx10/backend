var express = require('express');
var app = express();
var ProductCategory = require('../models/productcategory');
//list product categories
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    ProductCategory.find({})
        .skip(since)
        .limit(30)
        .exec(
            (err, productcategories) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding categories of products',
                        err
                    });
                }
                ProductCategory.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        productcategories,
                        counting
                    });
                });
            });
});
//create category product
app.post('/', (req, res) => {
    var body = req.body;
    var productcategory = new ProductCategory({
        name: body.name,
        description: body.description
    });
    productcategory.save((err, productcategorySave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create category of product',
                err
            });
        }
        res.status(201).json({
            ok: true,
            productcategorySave
        });
    });
});
//update category product
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    ProductCategory.findById(id, (err, productcategory) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to search category of product'
            })
        }
        if (!productcategory) {
            return res.status(400).json({
                ok: false,
                message: 'the id: ' + id + ' does not exist'
            });
        }
        productcategory.name = body.name;
        productcategory.description = body.description;

        productcategory.save((err, productcategorySave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Failed to update category of product',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                productcategorySave
            });
        });
    });
});
//delete category product
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    ProductCategory.findByIdAndDelete(id, (err, productcategoryDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete category of product',
                err
            });
        }
        if (!productcategoryDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no category of product'
            });
        }
        res.status(200).json({
            ok: true,
            productcategoryDelete
        });
    });
})
module.exports = app;