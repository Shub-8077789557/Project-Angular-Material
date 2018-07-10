/*jshint esversion: 6 */
var express = require('express');
var path = require('path');
const app= express();
var router = express.Router();
var Entities = require('html-entities').AllHtmlEntities;
const config = require('../config/database');
const fs = require('fs');
const NewsLetterStore = require('../models/newsletterstore');


// Create folder for uploading files.

// store the User NEwsletter...
router.post('/savenewsletter', (req, res, next) => {
var hst= req.body.Hrmarkup;  
var Mst= req.body.Mrmarkup;
var Ast = req.body.Amarkup


//HR entities
console.log(JSON.parse(JSON.stringify(hst)));
  var entities = new Entities();
  var endocdedHRMarkup = entities.encode(JSON.parse(JSON.stringify(hst)));
 console.log(endocdedHRMarkup);

//Marketing entities
 console.log(JSON.parse(JSON.stringify(Mst)));
 var entities = new Entities();
 var endocdedMRMarkup = entities.encode(JSON.parse(JSON.stringify(Mst)));
console.log(endocdedMRMarkup);


//Admin entities
console.log(JSON.parse(JSON.stringify(Ast)));
var entities = new Entities();
var endocdedAMarkup = entities.encode(JSON.parse(JSON.stringify(Ast)));
console.log(endocdedAMarkup);


  let newNewsletter = new NewsLetterStore({
    userid: req.body.userid,
    documentname: req.body.documentname,
    departmentname: req.body.departmentname,
    HRmarkup: endocdedHRMarkup,
    Amarkup:endocdedAMarkup,
    Mrmarkup:endocdedMRMarkup,
    createdate: Date.now(),
    createdby: req.body.createdby
  });

  console.log(newNewsletter);

  NewsLetterStore.storeNewsLetter(newNewsletter, (err, newsletter) => {
    if (err) {
      res.json({
        err:err,
        success: false,
        msg: 'failed to strore'
      });
    } else {
      res.json({
        success: true,
        msg: 'NewsLetter Stored'
      });

    }
  });

});



// Retrive NewsLEtter for Individual User
router.post('/usernewsletter', function (req, res) {
  var userid = req.body.userid;
  console.log(userid);
  NewsLetterStore.getUserNewsLetter(userid, (err, NewsLetter) => {
    if (err) {
      res.json({
        err: err,
        success: false,
        msg: 'No Resumes'
      });

    } else {
      console.log(NewsLetter);
      // var entities = new Entities();
      // var decodeMarkup = entities.decode(NewsLetter[0].markup);
      // console.log(decodeMarkup);
      res.json({
        NewsLetter: NewsLetter
        // _id: NewsLetter[0]._id,
        // userid: NewsLetter[0].userid,
        // username: NewsLetter[0].username,
        // Documentname: NewsLetter[0].Documentname,
        // departmentname: NewsLetter[0].departmentname,
        // markup: decodeMarkup,
        // createdate: NewsLetter[0].createdate,
        // createdby: NewsLetter[0].createdby
      });
    }
  });
});


// Retrive NewsLEtter for ALL Users Admin
router.get('/NewsLetters', function (req, res) {
  NewsLetterStore.getNewsLetters((err, NewsLetters) => {
    if (err) {
      res.json({
        success: false,
        Message: 'No Resumes'
      });

    } else {
      res.json({
        success: true,
        Newsletters: NewsLetters

      });
    }

  });

});


// Update or edit Newsletter
router.put('/updatenewsletter', function (req, res) {


  var hst= req.body.Hrmarkup;  
  var Mst= req.body.Mrmarkup;
  var Ast = req.body.Amarkup

  const Newsletterid = req.body._id;
  var entities = new Entities();
  var endocdedHRMarkup = entities.encode(hst);//Hr
  var endocdedAMarkup = entities.encode(Ast) // Admin
  var endocdedMRMarkup = entities.encode(Mst);//marketing
  

  
  let UpdatedNewsletter = new NewsLetterStore({
    _id: req.body._id,
    userid: req.body.userid,
    documentname: req.body.documentname,
    departmentname: req.body.departmentname,
    HRmarkup: endocdedHRMarkup,
    Amarkup:endocdedAMarkup,
    Mrmarkup:endocdedMRMarkup,
    createdate: Date.now(),
    createdby: req.body.createdby
  });
  NewsLetterStore.findByIdAndUpdate(Newsletterid, UpdatedNewsletter, function (err, RetriveNewsLetter) {
    if (err) {
      res.json({
        success: false,
        message: 'not updated',
        err: err
      });

    } else {
      res.json({
        success: true,
        Message: 'updated successfully',
        NewsLetter: RetriveNewsLetter,
      });
    }
  });
});


// Dupilctate or edit Newsletter
router.post('/duplicatenewsletter', function (req, res) {
  var Newsletterid = req.body._id;
  var NewsLetterName = req.body.documentname;
  console.log(Newsletterid);
  NewsLetterStore.getNewsLetterid(Newsletterid, (err, NewsLetter) => {
    if (err) {
      res.json({
        err: err,
        success: false,
        msg: 'No Newsletter'
      });

    } else {
      let DuplicateNewsletter = new NewsLetterStore({
        userid: NewsLetter[0].userid,
        username: NewsLetter[0].username,
        documentname: NewsLetterName,
        departmentname: NewsLetter[0].departmentname,
        HRmarkup: NewsLetter[0].HRmarkup,
        Amarkup:NewsLetter[0].Amarkup,
        Mrmarkup:NewsLetter[0].Mrmarkup,
        createdate: NewsLetter[0].createdate,
        createdby: NewsLetter[0].createdby
      });
      NewsLetterStore.storeNewsLetter(DuplicateNewsletter, (err, newsletter) => {
        if (err) {
          res.json({
            success: false,
            msg: 'failed to strore',
            err: err,
          });
        } else {
          res.json({
            success: true,
            msg: 'NewsLetter Copied successfully',
            NewsLetter: newsletter
          });

        }
      });

    }
  });
});

// delete the userNesLetter
router.post('/deleteuserNewsLetter', (req, res) => {
  console.log(req.body._id);
  NewsLetterStore.findByIdAndRemove(req.body._id, function (err, callback) {
    if (err) {
      res.json({
        success: false,
        Message: 'Delete Unsuccessful',
        err: err
      });
    } else {
      res.json({
        success: true,
        Message: ' NewsLetter Deleted succesfully',
        _id: callback._id
      });
    }
  });
});

router.post('/viewnewsletter', function (req, res) {
  var Newsletterid = req.body._id;
  console.log(Newsletterid);
  NewsLetterStore.viewNewsLetter(Newsletterid, (err, NewsLetter) => {
    if (err) {
      res.json({
        err: err,
        success: false,
        msg: 'No Newsletter'
      });

    } else {
      
      //HR Markup
      var entities = new Entities();
      var decodedHRMarkup = entities.decode(NewsLetter[0].HRmarkup);
      console.log(decodedHRMarkup);


      //Admin Markup
      var entities = new Entities();
      var decodedAMarkup = entities.decode(NewsLetter[0].Amarkup);
      console.log(decodedAMarkup);
      //console.log(JSON.parse(JSON.stringify(decodedMarkup).replace(/\\/g,"")));
      

      //Marketing Markup
      var entities = new Entities();
      var decodedMrMarkup = entities.decode(NewsLetter[0].Mrmarkup);
      console.log(decodedMrMarkup);
      //console.log(JSON.parse(JSON.stringify(decodedMarkup).replace(/\\/g,"")));
      



      let RetriveNewsletter = {
        _id: NewsLetter[0]._id,
        userid: NewsLetter[0].userid,
        username: NewsLetter[0].username,
        Documentname: NewsLetter[0].documentname,
        departmentname: NewsLetter[0].departmentname,
        HRmarkup: decodedHRMarkup,
        Amarkup:decodedAMarkup,
        Mrmarkup:decodedMrMarkup,
        createdate: NewsLetter[0].createdate,
        createdby: NewsLetter[0].createdby
      };
      console.log(RetriveNewsletter);
      res.json({
        success: true,
        NewsLetter: RetriveNewsletter
      });
    }
  });
});


module.exports = router;
