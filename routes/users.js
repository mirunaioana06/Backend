import express from 'express';
import { v4 as uuidv4 } from 'uuid';

uuidv4(); 

const router =express.Router();

let users=[


]

router.get('/',(req,res)=>{
    console.log(users);

res.send(users);
});

router.get('/:id',(req,res)=>{
const { id } = req.params;

const vfoundUser=users.find((user)=>user.id==id);
res.send({ id });


});



router.post('/',(req,res)=>{



const user=req.body;

users.push({ ...user, id: uuidv4() });
res.send(`USER with the name ${user.firstName} adaugat la baza de date`);

});


router.delete('/:id',(req,res) =>{
const { id } = req.params;


users=users.filter((user)=>user.id != id);

res.send('user with the id ${id} deleted from data base')
});
 
router.patch('/:id',(req,res)=>{
    const {id}=req.params;
    const{firstName,LastName,age}=req.body;
        const userToBeUppdated=users.find((user)=> user.id== id);

    if(firstName){
        user.firstName=firstName;
    }
      if(lastName){
        user.lastName=lastName;
    }
      if(age){
        user.age=age;
    }

res.send(`user with id ${id} has been update`);

});

export default router;

