const crudTiendas = (app) => {
  const Shops = require("../models/tiendajuegos.js");

  //Funciones de endpoint
  //GET - devuelve todas las collections
  findAllShops = (req, res) => {
    Shops.find((err, shops) => {
      if (!err) {
        console.log("GET /tiendajuegos");
        res.send(shops);
      }
    });
  };

  //POST
  addShop = function (req, res) {
    console.log("POST");

    console.log(req.body);

    var tienda = new Tienda({
      lat: req.body.lat,

      lng: req.body.lng,

      name: req.body.name,

      description: req.body.description,

      website: req.body.website,

      type: req.body.type,
    });

    tienda.save(function (err) {
      if (!err) {
        console.log("Created");
      } else {
        console.log("ERROR: " + err);
      }
    });

    res.send(tienda);
  };

  //PUT
  modifyShop = function (req, res) {
    Shops.findById(req.params.id, function (err, shop) {
      shop.lat = req.body.lat;
      shop.lng = req.body.lng;
      shop.name = req.body.name;
      shop.description = req.body.description;
      shop.website = req.body.website;
      shop.type = req.body.type;
      shop.save(function (err) {
        if (!err) {
          console.log("Updated");
        } else {
          console.log("ERROR: " + err);
        }

        res.send(shop);
      });
    });
  };

  //DELETE
  deleteShop = function (req, res) {
    Shops.findById(req.params.name, function (err, shop) {
      shop.remove(function (err) {
        if (!err) {
          console.log("Removed");
        } else {
          console.log("ERROR: " + err);
        }
        res.send(shop);
      });
    });
  };

  //URLS
  app.get("/tiendajuegos", findAllShops);
  app.post("/tiendajuegos", addShop);
  app.put("/tiendajuegos", modifyShop);
  app.delete("/tiendajuegos", deleteShop)
};
module.exports = crudTiendas;
