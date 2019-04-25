const SellTo = require('../models/sellto');
const Client = require('../models/client');

exports.getSellTo = (req, res, next) => {
  const state = req.query.state;
  if (state) {
    SellTo.fetchByState(state).then(([orders]) => {          
      res.render('SellTo/show', {
        orders: orders,
        state: state
      });
    }).catch((err) => {
      console.log(err);
    });   

  } else {
    SellTo.fetchAll().then(([orders]) => {     
      res.render('SellTo/show', {
        orders: orders,
        state: state        
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}

exports.addSellTo = async (req, res, next) => {
  if (typeof req.body.clientIds === "string") {
    const id = req.body.clientIds - 1;    
    const sellTo = new SellTo(req.body.productId, req.body.clientIds, req.body.startDates[id], req.body.endDates[id]);
    const [sellTos] = await sellTo.save();
  } else {
    for (let i = 0; i < req.body.clientIds.length; i++) {
      const id = req.body.clientIds[i];
      const sellTo = new SellTo(req.body.productId, id, req.body.startDates[id - 1], req.body.endDates[id - 1]);
      const [sellTos] = await sellTo.save();      
    }    
  }
  res.redirect(`/products`);  
}

exports.newSellTo = (req, res, next) => {	
  Client.fetchAll().then(([clients]) => {
    res.render('SellTo/new', {
      productId: req.query.productId,
      clients: clients
    });
  }).catch((err) => {
  	console.log(err);
  });
};