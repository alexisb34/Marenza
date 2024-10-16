
const express = require('express')
const app = express()
const port = 3002;

app.use(express.json({ strict: false }));

const regions = [
  { id: 1, name: 'France métropolitaine', price: 0 },
  { id: 2, name: 'Europe', price: 5 },
  { id: 3, name: 'Asie', price: 8 },
  { id: 4, name: 'Etats-Unis - Amérique latine', price: 10 },
];

app.post('/calculate_shipping', (req, res) => {
  req.body = JSON.parse(req.body)

  const [region] = regions.filter(region => region.id == parseInt(req.body.region));
  const weight = parseInt(req.body.weight);
  let shipping_cost = 5 + region.price;

  if (weight > 500 && weight < 1000) {
    shipping_cost += 2.5;
  }

  if (weight > 1000 && weight < 2000) {
    shipping_cost += 3.5;
  }

  if (weight > 2000) {
    shipping_cost += 5;
  }

  res.send({
    shipping_cost,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

