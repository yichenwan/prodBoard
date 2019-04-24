const Product = require('../models/product');
const ProductMgr = require('../models/ProductMgr');
const db = require('../util/database');

exports.getProducts = (req, res, next) => {
  const state = req.query.state;
  if (state) {
	  Product.fetchByState(state).then(([products]) => {
	    res.render('product/show', {
	      prods: products,
	      state: state
	    });
	  }).catch((err) => {
	  	console.log(err);
	  });  	

  } else {
	  Product.fetchAll().then(([products]) => {
	    res.render('product/show', {
	      prods: products,
	      state: state	      
	    });
	  }).catch((err) => {
	  	console.log(err);
	  });
  }
};

exports.addProduct = (req, res, next) => {
	const product = new Product(req.body.name, req.body.description, req.body.deadline, 0,  req.body.mgrId);
	product.save().then(([products]) => {
		res.redirect(`/responsibleBy/new?productId=${products.insertId}`);
	})
}

exports.newProduct = (req, res, next) => {
  ProductMgr.fetchAll().then(([productMgrs]) => {
  	res.render('product/new',{
  		prodMgrs: productMgrs
  	});
  });
};

exports.editProdcut = async (req, res, next) => {
	const [product] = await Product.findById(req.params.productId);
	const [productMgrs] = await ProductMgr.fetchAll();
	res.render('product/edit', {
		prod: product[0],
		prodMgrs: productMgrs
	});
}

exports.updateProdcut = (req, res, next) => {
	Product.updateById(req.params.productId, req.body).then(([prodcut]) => {
		res.redirect('/');
	});

}