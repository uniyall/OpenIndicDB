const db = require('mongoose');

const yogasanaSchema = db.Schema({
    Asana : String, 
    Sankrit_Name : String, 
    English_Name : String, 
    Type : String, 
    Suitable_For_Meditation : Boolean, 
    Image : String
});

const Yogasana = db.model('yogasana', yogasanaSchema, 'yogasana');

module.exports = Yogasana;
