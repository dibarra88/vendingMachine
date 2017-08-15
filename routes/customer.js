const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const vm = require('../models/vmCustomer')

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())
/***
 * This call returns all items available for purchase on vending machine
 * METHOD: GET
 * URL: /customer/items
 * RESPONSE:
 *    status: string,
 *    data:[{
 *          id: integer,
 *          description: string,
 *          cost: float,
 *          quantity: integer
 *          active: boolean
 * }]
 ***/
router.get('/items', function(req, res, next){
    vm.getAllItems(function(success, results){
        if(success){
            const response = {
                status: "success",
                data: results
            }
            res.json(response);
        }else{
            res.json({
                status: "fail",
                message: "Unable to retrieve items."
            })
        }
    })
})

router.post('/items/:itemId/purchases', function(req, res, next){
    const itemId = req.params.itemId;
    const amount_given = req.body.amount_given;

    vm.buyOneItem(itemId, amount_given, function(response){
        res.json(response);
    })
})
module.exports = router;