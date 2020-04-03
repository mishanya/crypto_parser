const express = require('express');
const fetch = require('node-fetch');
const app = express();


app.listen(process.env.PORT || 3022);
console.log(`App listening on port ${process.env.PORT || 3022}`);
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('*', async (req, res) =>  {
  return await fetch('https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products')
  .then(res => res.json())
  .then(json => res.json({
    data: json.data
  }))
})
 