const express=require('express');
const router=express.Router();

const{getTranscation,addTranscation,deleteTranscation}=require('../controllers/transcation');


router.route('/').get(getTranscation).post(addTranscation);

router.route('/:id').delete(deleteTranscation);

module.exports=router;
