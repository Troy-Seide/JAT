const express = require('express');
router = express.Router();
const jobs = require('../Models/jobsModel');
const users = require('../Models/userModel');
httpStatusCodes = require('http-status-codes'),


router.get('/', (req, res) =>{
    //res.send('Hello World!')
    jobs.find().then(docs => {
        res.send(docs);
    }).catch(err =>{
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    })
})

// router.post('/add', (req, res) => { //here he adds the .post off the other method through method chaining
//   const obj = req.body;
//   jobs.create(obj).then(doc => {
//       let payload = {subject: doc._id}
//       //The jwt sign function takes in a payload and a secret key, the secret key can be anything but he called it secretKey
//       let token = jwt.sign(payload, 'secretKey');
//       //We then send the token as an object
//       res.status(httpStatusCodes.CREATED).send({token});
//       //res.status(httpStatusCodes.CREATED).send(obj); //This returns information to say if the new document has been added or not
//       //res.status(httpStatusCodes.CREATED).send(doc);
//   }).catch(err => {
//       res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
//   })
// });

// Your previous function
router.post('/add', async (req, res, next) => {
    try {
      //const userId = req.body.subject
      const {userId, companyName, position, description, location, status, dateApplied } = req.body;
      const newJob = new jobs({
        userId,
        companyName,
        position,
        description,
        location,
        status,
        dateApplied
      });
      const savedApplication = await newJob.save();
      res.status(201).json(savedApplication);
    } catch (error) {
      next(error);
    }
});

//Come back to testing this
router.get('/get', async (req, res, next) => {
    try {
      console.log("New vibes");
      // const name = req.user.firstName
      // console.log("This is the name " + name);
      //const userId = req.user._id; // Assuming req.user contains the authenticated user
    //   const id = req.params.userId;
      //const userId = user.findById(id);
      //const userId = '65d57c7e6e8f690763b84db8'
      //const userId = '65ce8b940292bb663a90b93f'
      const id = req.header('authorization')
      const other = req.user('subject');
      console.log("Other is " + other);
     //const userId = '65dd10ffad8bfe9ff1c7a061'
     //const userId = "65dd10ffad8bfe9ff1c7a061"
     console.log(id);
    const applications = await jobs.find({ id });
      res.json(applications);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', (req, res) =>{
    //res.send('Hello World!')
    let id = req.params.id;
    jobs.findById(id).then(docs => {
        res.send(docs);
    }).catch(err =>{
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    })
  })

  // Update a job application
  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { companyName, position, status, location, description, dateApplied } = req.body;
      const updatedApplication = await jobs.findByIdAndUpdate(
        id,
        { companyName, position, status, location, description, dateApplied },
        { new: true }
      );
      res.json(updatedApplication);
    } catch (error) {
      next(error);
    }
  });
  
  // Delete a job application
  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await jobs.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;