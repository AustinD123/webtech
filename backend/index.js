const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/webtech-project');

app.post('/register', (req, res)=>{

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        else{
            res.json("No records found! ");
        }
    })
})
const FeedbackModel = require('./models/Feedback');  

// Endpoint to save feedback
app.post('/feedback', (req, res) => {
    const { name, email, feedback } = req.body;
  
    const newFeedback = new FeedbackModel({
      name,
      email,
      feedback,
      date: new Date(),
    });
  
    newFeedback.save()
      .then(savedFeedback => {
        console.log('Feedback saved to MongoDB:', savedFeedback);
        res.json({ message: 'Feedback saved successfully', savedFeedback });
      })
      .catch(err => {
        console.error('Error saving feedback:', err);
        res.status(500).json({ error: 'Failed to save feedback', err });
      });
  });

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});