const ProductMgr = require('../models/productMgr');
const Product = require('../models/product');
const db = require('../util/database');

exports.getProductMgrs = (req, res, next) => {
  ProductMgr.fetchAll().then(([productsMgrs]) => {
    res.render('productsMgr/show', {
      prodMgrs: productsMgrs
    });
  }).catch((err) => {
  	console.log(err);
  });
};

exports.getProductMgrById =  async (req, res, next) => {
	try {	
	  const [productMgr] = await ProductMgr.findById(req.params.mgrId);
	  const [products] = await Product.findMgrById(req.params.mgrId);
	  console.log(productMgr);
	    res.render('productsMgr/ProductsMgrShow', {
	      prodMgr: productMgr[0],
	      prods: products
	    });
	}
	catch(err) {
	  	console.log(err);
	};
};