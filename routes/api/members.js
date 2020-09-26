const express = require('express');
const router = express.Router();
const members = require('../../Members');

router.get('/', (req, res) => {
    res.json(members);
});

router.get('/:id', (req,res)=>{
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

router.post('/', (req,res)=>{
    const newMember = {
        id : 4,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email){
      return res.status(404).json({msg: 'y r u gay?'});
    }
    members.push(newMember);
    res.json(members);
    
});

router.put('/:id', (req,res)=>{
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

module.exports = router;