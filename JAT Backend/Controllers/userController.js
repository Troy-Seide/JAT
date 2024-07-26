const bcrypt = require('bcryptjs')
const express = require('express');
const jwt = require('jsonwebtoken');
router = express.Router();
const user = require('../Models/userModel');
httpStatusCodes = require('http-status-codes'),

router.get('/', (req, res) =>{
    //res.send('Hello World!')
    user.find().then(docs => {
        res.send(docs);
    }).catch(err =>{
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    })
}).post('/register', async (req, res) => {
    try {
        // Extract user data from the request body
        const { firstName, lastName, email, phone, } = req.body;

        // Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 8;
        //const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new user({
            //What you just had
            // "firstName":req.body.firstName,
            // "lastName": req.body.lastName,
            // "password":bcrypt.hashSync(req.body.password, 8),
            // "email":req.body.email,
            // "phone":req.body.phone



            firstName,
            lastName,
            "password":bcrypt.hashSync(req.body.password, 8),
            phone,
            email,
            // password: hashedPassword, // Save the hashed password
        });

        // Save the user to the database
        const doc = await newUser.save();

        // Generate JWT token
        const payload = { subject: doc._id };
        const token = jwt.sign(payload, 'secretKey');

        // Respond with the token
        res.status(httpStatusCodes.CREATED).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}).get('/:id', (req, res) =>{
    //res.send('Hello World!')
    let id = req.params.id;
    user.findById(id).then(docs => {
        res.send(docs);
    }).catch(err =>{
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    })
}).put('/:id', (req, res) => {
    let id =  req.params.id;
    const obj = req.body;
    //In the findByIdAndUpdate method we have to pass the id and the field that you want to update
    user.findByIdAndUpdate(id, {firstName:obj.firstName, lastName:obj.lastName, phone:obj.phone, email:obj.email, password:bcrypt.hashSync(obj.password, 8),}).then(doc => {
        res.status(httpStatusCodes.OK).send(doc);
    }).catch(err => {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    })
}).delete('/:id', (req, res) =>{
    //res.send('Hello World!')
    let id = req.params.id;
    user.findByIdAndDelete(id).then(docs => {
        //res.send(docs);
        res.status(httpStatusCodes.OK).send(docs);
    }).catch(err =>{
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
    })
}).post('/login', (req, res) => {
    let userData = req.body;
    //console.log('Hello');
    user.findOne({email: userData.email}).then(user => {

    
    //user.findOne({email: userData.email}), (error, user) => {
        // if(error){
        //     console.log(error);
        //     res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
        // }
        //else{
            if(!user){
                res.status(401).send('Invalid email');
            }
            else{
                bcrypt.compare(userData.password, user.password, (err, results)=>{
                    if(!results){
                        res.status(401).send('Invalid password');
                    }
                // if(bcrypt.compare(user.password, userData.password)){
                //     res.status(401).send('Invalid password');
                    // if(results){
                    //     res.status(401).send('Invalid password');
                    // }

                // })
                
                // if(user.password !== userData.password){
                //     res.status(401).send('Invalid password');
                // }
                    else{
                        //We set the payload as an object and we make subject the key
                        let payload = { subject: user._id };
                        let token = jwt.sign(payload, 'secretKey');
                        res.status(httpStatusCodes.CREATED).send({token});

                        //res.status(200).send(user);
                    }
                })
            }
            // })
        }).catch(err =>{
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
        })
    });

    //For favorites section
    router.post('/users/:userId/favorites/:jobId', async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const jobId = req.params.jobId;
            
            // Add the job to favorites
            await user.findByIdAndUpdate(userId, { $addToSet: { favorites: jobId } });
    
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });
    
    //For favorites section
    router.delete('/users/:userId/favorites/:jobId', async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const jobId = req.params.jobId;
    
            // Remove the job from favorites
            await user.findByIdAndUpdate(userId, { $pull: { favorites: jobId } });
    
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    router.get('/users/:userId/favorites', async (req, res, next) => {
        try {
            const userId = req.params.userId;
    
            // Find the user document by ID
            const users = await user.findById(userId);
    
            if (!users) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Retrieve the favorite job IDs from the favorites array
            const favoriteJobIds = users.favorites;
    
            // You can perform another query to retrieve the favorite job details
            // For example, if you have a Job model
            // const favoriteJobs = await Job.find({ _id: { $in: favoriteJobIds } });
    
            // Return the favorite job IDs (or details) in the response
            res.status(200).json({ favoriteJobIds });
        } catch (error) {
            next(error);
        }
    });
    module.exports = router;