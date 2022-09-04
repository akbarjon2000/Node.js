const express = require('express');
const router = express.Router();
const Customer = require('../models/customers')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log("Connected to CUSTOMERS database..."))
  .catch(err => console.log(err));




router.get('/', async (req, res) => {
  const customers = await Customer.find()
  res.send(customers);
});

router.post('/', async (req, res) => {
  // const { error } = validateGenre(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  })
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const customer = Customer.find({ id: req.params.id });
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const result = await Customer.updateOne({ id: req.params.id }, {
    $set: {
      name: req.body.name ? req.body.name : customer.name,
      isGold: req.body.isGold ? req.body.isGold : customer.isGold,
      phone: req.body.phone ? req.body.phone : customer.phone
    }
  })
  res.send(result);
});

router.delete('/:id', async (req, res) => {
  let customer = Customer.find({ id: req.params.id });
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');

  let result = await Customer.deleteOne({ id: req.params.id })

  res.send(result);
});

router.get('/:id', (req, res) => {
  const customer = Customer.find({ id: req.params.id });
  if (!customer) return res.status(404).send('The genre with the given ID was not found.');
  res.send(customer);
});

module.exports = router;