const conn = require('./db.js');

function getAllTransactions(done){
    const sql = `SELECT t.*	, i.description FROM transactions t join items i on t.itemId = i.id;`;
    conn.query(sql, function(err, results, fiels){
        if(err){
            console.log('Error retrieving transactions', err)
            done(false, null)
        }else{
            done(true, results)
        }
    })
}

function getTotalAmount(done){
    const sql = `SELECT SUM(price) AS total FROM transactions;`;
    conn.query(sql, function(err, results, fields){
        if(err){
            console.log("Error trying to get total.", err);
            done(false,null)
        }else{
            done(true, results[0])
        }
    })
}

function addItem(description, cost, quantity, done){
    const sql = `INSERT INTO items (description, cost, quantity)
    VALUES (?, ?, ?);`;
    conn.query(sql,[description,cost,quantity], function(err,results,fields){
        if(err){
            console.log("Error creating new item.", err);
            done(false, null);
        }else{
            done(true,results);
        }
    })
}

function updateItem(itemId, description, cost, quantity, done){
    const sql = `UPDATE items SET description = ?, cost = ?, quantity = ? WHERE id = ?;`;
    conn.query(sql,[description,cost,quantity,itemId], function(err, results, fields){
        if(err){
            console.log("Error upadating item.", err);
            done(false, null);
        }else{
            done(true,results);
        }
    })
}
module.exports ={
    getAllTransactions: getAllTransactions,
    getTotalAmount:getTotalAmount,
    addItem:addItem,
    updateItem:updateItem
}