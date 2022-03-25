const express = require('express');

// add to the existing imports the sequence generator (sequenceGenerator.js)
const sequenceGenerator = require('./sequenceGenerator');

// Add another require statement to import the model file (e.g., document.js) that you created earlier for the collection
const Document = require('../models/document');

const router = express.Router();
module.exports = router;

// router.get() method is responsible for getting the list of documents in the documents collection in the database
router.get('/', (req, res, next) => {
  console.log('router.get called');
  
    // call the Document model find() method to get all documents in the collection
    Document.find(function (err, documents){
        // if an error occurred return response status 500 and a JSON object containing information about the error
        if (err) {
            return res.status(500).json({
              title: 'An error occurred',
              error: err
            });
        }
        // return response status 200 and a JSON object containing the list of documents
        // res.status(200).json({
        // // message: "Documents fetched successfully!",
        // // documents: Document
        // });
        
        res.status(200).json(documents);
    });
});

// router.post() method is responsible for adding a new document to the collection in the database
router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
  
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    document.save()
      .then(createdDocument => {
        res.status(201).json({
          message: 'Document added successfully',
          document: createdDocument
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

// router.put() method is responsible for updating an existing document in the database
router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });
  
// router.delete() method is responsible for deleting an existing document in the database
router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

    
        
