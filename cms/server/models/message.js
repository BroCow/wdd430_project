
// At the top of the file, import the Mongoose package. Define a variable to reference the Mongoose Schema class.
const mongoose = require('mongoose');

// Create a new Schema object and pass it a JSON object containing the definition of each property in the schema. Specify which properties are required. Refer back to the JSON object returned from the query in Step 1 to get a list of properties and their datatypes.
const messageSchema = mongoose.Schema({
    id: {type: String, required: true},
    subject: {type: String},
    msgText: {type: String, required: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

// Call the Mongoose model() method to create the model from the schema and then export the model so that other files can import and use the model.
module.exports = mongoose.model('Message', messageSchema); 