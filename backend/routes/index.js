const express=require('express');
const router=express.Router()
const userRoutes=require('./api/user.routes');
const subjectRoutes=require('./api/subject.routes');
const mySubjectsRoutes=require('./api/mySubjects.routes');

router.use('/user',userRoutes)
router.use('/subjects',subjectRoutes)
router.use('/my-subjects',mySubjectsRoutes)

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports=router