const crudCollection = (app) => {
    const Collection = require('../models/collection.js');

    //Funciones de endpoint
    //GET - devuelve todas las cervecerisa
    findAllCollections = (req, res) => {
        Collection.find((err, collection) => { 
            if(!err)
            {
                console.log('GET /collection');
                res.send(collection);
            }
         });
    }

    //URLS
    app.get('/collection',findAllCollections);
}
module.exports = crudCollection;