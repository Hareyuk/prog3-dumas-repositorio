var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var collectionSchema = new Schema({
    id: { type: String},
    lat: {type: String},
    lng: { type: String},
    name: {type: String},
    description: { type: String},
    website: {type: String},
    type: {type: String}
});

module.exports = mongoose.model('TiendaJuegos', collectionSchema, 'tiendajuegos' );
