const express = require('express');

// add to the existing imports the sequence generator (sequenceGenerator.js)
const sequenceGenerator = require('./sequenceGenerator');

// Add another require statement to import the model file (e.g., message.js) that you created earlier for the collection
const Message = require('../models/message');
const message = require('../models/message');

const router = express.Router();
module.exports = router;

// router.get() method is responsible for getting the list of messages in the messages collection in the database
router.get('/', (req, res, next) => {
    // call the Message model find() method to get all messages in the collection
    Message.find(function (err, messages){
        // if an error occurred return response status 500 and a JSON object containing information about the error
        if (err) {
            return res.status(500).json({
              title: 'An error occurred',
              error: err
            });
        }
        // return response status 200 and a JSON object containing the list of messages
        res.status(200).json(messages);
    });
});
 
// router.post() method is responsible for adding a new message to the collection in the database
router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");
  
    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.message,
      sender: "not sure"
    });
  
    message.save()
      .then(createdMessage => {
        res.status(201).json({
          message: 'Message added successfully',
          message: createdMessage
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  // router.put() method is responsible for updating an existing message in the database
router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.message;
        message.sender = "not sure";
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
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
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });

  // router.delete() method is responsible for deleting an existing message in the database
router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
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
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });