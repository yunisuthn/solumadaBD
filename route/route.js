//route.js

const express = require('express');
const route = express.Router();

// Require Users model in our routes module
let Users = require('../model/model');

// Defined store route
route.route('/add').post(function (req, res) {
  let users = new Users(req.body);
  users.save()
    .then(users => {
      res.status(200).json({ 'user create': 'user in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
route.route('/getUnChamp').get( async (req, res) => {
  try {
   const allUsedCategories = await Users.distinct('nom');
 
   res.json({
    categories: allUsedCategories
   });
  } catch (error) {
   logger.error(error);
   res.status(500).json({ details: error });
  }
 });
// Defined get data(index or listing) route
route.route('/get').get(function (req, res) {
  Users.find(function (err, users) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Defined edit route
route.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Users.findById(id, function (err, users) {
    res.json(users);
  });
});

//  Defined update route
route.route('/update/:id').post(function (req, res) {
  Users.findById(req.params.id, function (err, users) {
    if (!users)
      res.status(404).send("data is not found");
    else {
      users.nom = req.body.nom;
      users.ville = req.body.ville;
      users.adresse = req.body.adresse;

      users.save().then(users => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
route.route('/delete/:id').get(function (req, res) {
  Users.findByIdAndRemove({ _id: req.params.id }, function (err, users) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = route;
