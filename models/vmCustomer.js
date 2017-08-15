const conn = require('./db.js');

function getAllItems(done){
    const sql = `SELECT * FROM items WHERE active = true;`;
    conn.query(sql, function(err, results, field){
        if(err){
            console.log('Error getting items', err)
            done(false, null)
        }else{
            done(true, results)
        }
    })
}
function buyOneItem(itemId, amount_given, done){
    const sql = `SELECT * FROM items WHERE id = ?;`
    conn.query(sql,[itemId], function(err, results, fields){
        if(err){
            console.log('Error retrieving item', err);
        }else{
            var item = results[0];
            var response = {
                status:"",
                message:"",
                data:{
                    money_given: amount_given,
                    money_required: item.cost,
                    money_back: 0.0
                }
            }
            if(item.active === 0 || item.quantity === 0){
                response.status = "fail"
                response.message ="Item not available for sale."
                response.data.money_back = amount_given;
                done(response);
            }
            if(amount_given < item.cost){
                response.status = "fail"
                response.message = "Not enough money to purchase item."
                response.data.money_back = amount_given;
                done(response);
            }
            else if(amount_given >= item.cost){
                createTransaction(itemId,item.cost, function(success,msg){
                    if(!success){
                        response.status = "fail"
                        response.message = msg;
                        done(response);
                    }
                    else{
                        response.status = "success"
                        response.message = msg;
                        response.data.money_back = amount_given - item.cost;
                        done(response);
                    }
                })
            }
        }
    })
}
function createTransaction(itemId, itemCost, done){
    let sql ='INSERT INTO transactions (itemId,price) VAlUES (?,?);'
    conn.query(sql,[itemId,itemCost], function(err, results, fields){
        if(err){
            console.log('Error unable to create transaction', err);
            done(false, msg="Error unable to create transaction");
        }else{
            sql = `UPDATE items SET quantity = quantity - 1 WHERE id = ?;`;
            conn.query(sql,[itemId], function(err, results, fields){
                if(err){
                    console.log('Error trying to update item quantity', err)
                }else{
                    done(true, msg="Transaction successful.");
                }
            }) 
        }
    })
}   
module.exports = {
    getAllItems: getAllItems,
    buyOneItem: buyOneItem
}