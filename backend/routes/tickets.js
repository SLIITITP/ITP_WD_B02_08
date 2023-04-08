const express = require('express');
const tickets = require('../models/tickets');

const router = express.Router();

//save tickets

router.post('/ticket/save',(req,res)=>{

    let newticket = new tickets(req.body);

    newticket.save()
    .then((result)=>{
       
            return res.status(200).json({
                success: 'Post saved successfully',
                ticket: result
            });
        })
        .catch((error) => {
            return res.status(400).json({
              error: error
        });
    });
});

//get tickets

router.get('/tickets',(req,res)=>{
    tickets.find()
    .then((tickets)=>{
        return res.status(200).json({
            success: true,
            existingTickets: tickets
            });
        })
        .catch((error) => {
            return res.status(400).json({
              error: error
        });
    });
});

//update tickets

router.put('/ticket/update/:id',(req,res)=>{
    tickets.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        }).then((post)=>{
            return res.status(200).json({
                success: 'ticket updated successfully'
              });
            })
            .catch((error) => {
              return res.status(400).json({
                error: error
            });
        });
});

//delete ticket

router.delete('/ticket/delete/:id',(req,res)=>{
    tickets.findByIdAndRemove(req.params.id)
    .then((deletedPost) => {
        return res.status(200).json({
          message: 'ticket deleted successfully',
          deletedPost: deletedPost
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: 'ticket deletion unsuccessful',
          error: error
        });
       });
});

//get a specific ticket
router.get('/ticket/:id', (req, res) => {
    let ticketId = req.params.id;
  
    tickets.findById(ticketId)
      .then((ticket) => {
        return res.status(200).json({
          success: true,
          ticket: ticket
        });
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          error: error
        });
      });
  });
  
  
  
  

module.exports = router;