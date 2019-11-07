const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student"
    });
});

router.get('/viewchart/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/chart", {
                student: doc
            });
        }
    });
});
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var student = new Student();
    student.fullName = req.body.fullName;
    student.regno = req.body.regno;
    student.email = req.body.email;
    student.section = req.body.section;
    student.coursename = req.body.coursename;
    student.ca1 = req.body.ca1;
    student.ca2 = req.body.ca2;
    student.ca3 = req.body.ca3;
    student.mte = req.body.mte;
    student.ete = req.body.ete;
    var att = req.body.attendance;
    if(att>75)
        student.atmarks = 0;
    else if(att>=75 && att<80)
        student.atmarks = 2;
    else if(att>=80 && att<85)
        student.atmarks = 3;
    else if(att>=85 && att<90)
        student.atmarks = 4;
    else
        student.atmarks = 5;
    if(req.body.ca1<req.body.ca2 && req.body.ca1<req.body.ca3)
        student.pg = (((parseInt(req.body.ca2)+parseInt(req.body.ca3))/60)*25)+(parseInt(req.body.mte)/40)*20+(parseInt(req.body.ete)/70)*50+student.atmarks;
    else if(req.body.ca2<req.body.ca1 && req.body.ca2<req.body.ca3)
        student.pg = ((parseInt(req.body.ca1)+parseInt(req.body.ca3))/60)*100;
    else
        student.pg = ((parseInt(req.body.ca1)+parseInt(req.body.ca2))/60)*100;
    student.save((err, doc) => {
        if (!err)
            res.redirect('student/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: "Insert Student",
                    student: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('student/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Student list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/list');
        }
        else { console.log('Error in Student delete :' + err); }
    });
});

module.exports = router;
