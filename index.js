const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

function totalcartvalue(newItemPrice, cartTotal) {
  return newItemPrice - cartTotal;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(totalcartvalue(newItemPrice, cartTotal).toString());
});

function result(cartTotal, isMember) {
  let discountPercentage = 10;
  if (isMember) {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(result(cartTotal, isMember).toString());
});

function result(cartTotal) {
  let taxrate = 5;
  return cartTotal * (taxrate / 100);
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(result(cartTotal).toString());
});

function result(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  } else {
    return distance / 50;
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(result(shippingMethod, distance).toString());
});

function result(weight, distance) {
  return weight * distance * 0.1;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(result(weight, distance).toString());
});

function result(purchaseAmount) {
  let loyaltyRate = 2;
  return purchaseAmount * loyaltyRate;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(result(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
