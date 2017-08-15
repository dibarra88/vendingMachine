const express = require('express')
const router = express.Router()
const vm = require('../models/vmVendor')

router.get('/purchases', function(req, res, next){
    vm.getAllTransactions(function(success, results){
        if(success){
            const response = {
                status: "success",
                data: results
            }
            res.json(response);
        }else{
            res.json({
                status: "fail",
                message: "Unable to retrieve transactions."
            })
        }
    })
})

router.get('/money', function(req, res, next){
    vm.getTotalAmount(function(success, results){
        if(success){
            const response = {
                status: "success",
                data: results
            }
            res.json(response);
        }else{
            res.json({
                status: "fail",
                message: "Unable to retrieve transactions."
            })
        }
    })
})

router.post('/items', function(req, res, next){
    const description = req.body.description;
    const cost = req.body.cost;
    const quantity = req.body.quantity;

    vm.addItem(description,cost,quantity, function(success, results){
        if(success){
            const response = {
                status: "success",
                message:"Item was added.",
                id: results.insertId
            }
            res.json(response);
        }else{
            res.json({
                status: "fail",
                message: "Unable to create item."
            })
        }
    })
})

router.put('/items/:itemId', function(req, res, next){
    const description = req.body.description;
    const cost = req.body.cost;
    const quantity = req.body.quantity;
    const itemId = req.params.itemId;

    vm.updateItem(itemId, description, cost, quantity, function(success, results){
        if(success){
            const response = {
                status: "success",
                message:"Item was updated.",
                id: itemId
            }
            res.json(response);
        }else{
            res.json({
                status: "fail",
                message: "Unable to upadate item."
            })
        }
    })

})
module.exports = router;