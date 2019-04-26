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

exports.getDeletePage = (req, res, next) => {
  SellTo.fetchAll().then(([orders]) => {     
    res.render('SellTo/delete', {
      orders: orders      
    });
  }).catch((err) => {
    console.log(err);
  });
}

exports.addSellTo = async (req, res, next) => {
  if (typeof req.body.ids === "string") {
    const ids = JSON.parse(req.body.ids);    
    const clientId = ids[0];     
    const id = ids[1];   
    const sellTo = new SellTo(req.body.productId, clientId, req.body.startDates[id], req.body.endDates[id]);
    const [sellTos] = await sellTo.save();
  } else {
    for (let i = 0; i < req.body.ids.length; i++) {
      const ids = JSON.parse(req.body.ids[i]);     
      const clientId = ids[0];     
      const id = ids[1];         
      const sellTo = new SellTo(req.body.productId, clientId, req.body.startDates[id], req.body.endDates[id]);
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

exports.deleteSellTo = (req, res, next) => { 
  console.log(req.params.productId);
  console.log(req.params.clientId);
  SellTo.deleteById(req.params.productId, req.params.clientId).then(([sellTos]) => {
    res.redirect('/sellTo/delete');
  }).catch((err) => {
    console.log(err);
  });
};