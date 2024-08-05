const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const FitnessModel = require('./models/fitness')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://myAtlasDBUser:ritikcluster@myatlasclusteredu.c73azmb.mongodb.net/")

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    FitnessModel.findOne({email : email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.status(200).json({message:"Success",id:user._id})
            }
            else{
                res.status(401).json("The password is incorrect")
            }
        }
        else{
            res.status(401).json("No record exists.")
        }
    })
})

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    if(name && email && password){
        FitnessModel.findOne({email:email}).then((ress)=>{
            if(ress){
                return res.send("User Already exists");
            }
            else{
                FitnessModel.create({name,email,password})
                .then((Users) => {return res.status(200).json({message:"User Registered Successfully",id:Users._id})})
                .catch((err) =>{console.log(err)
                    return res.json(err)})
            }
        })
    }
    else{
       return res.json('Please Fill all the fieldsssss')
    }
})

app.post('/dietinfo',(req,res)=>{
    const {name,age,height,weight,gender,exerciseLevel,id} = req.body;
    console.log(id);
    if(name || age || height || weight || gender || exerciseLevel){
        FitnessModel.findByIdAndUpdate(id,{age,height,weight,gender,exerciseLevel}).then((data)=>{
            if(!data){
                return res.status(404).json("Not found");
            }
            return res.status(200).json({message:"Data stored ",user:data})
        }).catch((err)=>{
            return res.status(500).json("Internal server Error");
        })
    }
    else{
        res.json('Please Fill all the fields')
    }
})

app.post('/mealplan',(req,res) => {
    const {id} = req.body;
    FitnessModel.findOne({_id : id})
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
})

app.get('/account/:id', (req, res) => { 
    const { id } = req.params;
    FitnessModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ user });
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.post('/dashboard', (req, res) => {
    const userId = req.body.id;
    console.log('Received request to fetch user data for Dashboard:', userId);
    FitnessModel.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const { dailyGoal, caloriesConsumed, waterConsumed} = user;
            res.json({ dailyGoal, caloriesConsumed, waterConsumed });
        })
        .catch(error => {
            console.error('Error fetching user data for Dashboard:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.post('/dashboard/:id/add-calories', (req, res) => {
    const userId = req.params.id;
    const { caloriesConsumed } = req.body;

    console.log('Received request to add calories on backend:', userId, caloriesConsumed);

    FitnessModel.findByIdAndUpdate(
        userId,
        { caloriesConsumed: caloriesConsumed },
        { new: true }
    )
    .then(updatedUser => {  
        console.log('Updated user on backend:', updatedUser);
        res.json(updatedUser);
    })
    .catch(error => {
        console.error('Error updating calories consumed on backend:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});


app.delete('/dashboard/:id/clear', (req, res) => {
    const userId = req.params.id;
    console.log('Received request to clear calories for user:', userId);
    FitnessModel.findOneAndUpdate(
        { _id: userId },
        { caloriesConsumed: 0, glassesConsumed: 0 },
        { new: true }
    )
    .then(user => {
        console.log('Cleared calories for user:', user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    })
    .catch(error => {
        console.error('Error clearing calories:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});


app.get('/bmi/:id', (req, res) => {
    const { id } = req.params;
    FitnessModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ user});
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.post('/dashboard/update-goal', (req, res) => {
    const userId = req.body.id;
    const dailyGoal = req.body.dailyGoal;
    console.log('Received request to update daily goal:', userId, dailyGoal);
    FitnessModel.findByIdAndUpdate(
        userId,
        { dailyGoal: dailyGoal },
        { new: true }
    )
    .then(updatedUser => {  
        console.log('Updated daily goal for user:', updatedUser);
        res.json(updatedUser);
    })
    .catch(error => {
        console.error('Error updating daily goal:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/waterconsumption/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const data = await FitnessModel.findOne({ userId });
        if (data) {
            res.json(data);
        } else {
            res.json({ glassesConsumed: 0 });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/waterconsumption/:id', async (req, res) => {
    const userId = req.params.id;
    const { glassesConsumed } = req.body;
    try {
        const existingData = await FitnessModel.findById(userId);
        if (existingData) {
            existingData.glassesConsumed = glassesConsumed;
            await existingData.save();
            res.json({ message: 'Water consumption updated!' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.post('/note/:id', async (req, res) => {
    const userId = req.params.id;
    const { text } = req.body;
    try {
      const user = await FitnessModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.text = text;
      await user.save();
      res.json({ message: 'Note saved successfully' });
    } catch (error) {
      console.error('Error saving note:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/note/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await FitnessModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ text: user.text });
    } catch (error) {
      console.error('Error fetching note:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3001,()=>{
    console.log("Server is running at port 3001")
})
