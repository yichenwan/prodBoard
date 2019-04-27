const SellTo = require('../models/sellTo');
const Client = require('../models/client');

exports.getSellTo = (req, res, next) => {
  const state = req.query.state;
  if (state) {
    SellTo.fetchByState(state).then(([orders]) => {          
      res.render('sellTo/show', {
        orders: orders,
        state: state
      });
    }).catch((err) => {
      console.log(err);
    });   

  } else {
    SellTo.fetchAll().then(([orders]) => {     
      res.render('sellTo/show', {
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
    res.render('sellTo/delete', {
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

exports.newSellTo = async (req, res, next) => {	
  try {
    const [clients] = await Client.fetchAll();
    const [orders] = await SellTo.findByProductId(req.query.productId);
    console.log(clients);
    const filterClients = clients.filter((client) => {
      return !orders.some((order) => {
        return client.clientId === order.clientId; 
      });
    });
    res.render('sellTo/new', {
      productId: req.query.productId,
      clients: filterClients
    });     
  }
  catch (err) {
  	console.log(err);
  };
};

exports.deleteSellTo = (req, res, next) => { 
  SellTo.deleteById(req.params.productId, req.params.clientId).then(([sellTos]) => {
    res.redirect('/sellTo/delete');
  }).catch((err) => {
    console.log(err);
  });
};