var express = require('express');
var router = express.Router();

var db = require('../firebase/firebase')

const db_name = 'Vendors'

/* GET vendors listing. */
router.get('/:id', function (req, res, next) {
  let id = req.params.id;
  // console.log('vendor get id:', id)

  db.collection(db_name)
    .doc(id)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        // console.log('documentSnapshot exists, data:', documentSnapshot.data());
        res.status(200).json(documentSnapshot.data())
      } else {
        res.status(201).json({})
      }
    })
    .catch((error) => {
      // console.log('error in db')
      res.status(500).json({ error: error })
    });
});

router.patch('/:id', function (req, res, next) {
  let id = req.params.id;
  // console.log('vendor patch id:', id)

  db.collection(db_name)
    .doc(id)
    .set({
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }, { merge: true })
    .then(() => {
      // console.log('Vendor added!');
      res.status(200).json({ msg: 'Vendor location updated' })
    })
    .catch((error) => {
      // console.log('error:', error)
      res.status(500).json({ msg: 'vendor location updation error' })
    });
});

router.get('/get/all', function (req, res, next) {
  // let id = req.params.id;
  // console.log('vendor get id:', id)

  let response = {};

  db.collection(db_name)
    .get()
    .then(querySnapshot => {
      // console.log('Total vendors: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        // console.log('vendor ID: ', documentSnapshot.id, documentSnapshot.data());
        response[documentSnapshot.id] = documentSnapshot.data()
      });

      res.status(200).json(response)
    })
    .catch((error) => {
      // console.log('getVendorsFromDB error')
      res.status(500).json({ msg: 'couldnt fetch all vendors' })
    });
});

router.post('/:id', function (req, res, next) {
  let id = req.params.id;
  // console.log('user post body:', req.body)
  db.collection(db_name)
    .doc(id)
    .get()
    .then(documentSnapshot => {
      // console.log(documentSnapshot);
      // console.log('Vendor exists: ', documentSnapshot.exists);

      if (documentSnapshot.exists) {
        // console.log('Vendor data: ', documentSnapshot.data());
        res.status(201).json({})
      } else {
        // console.log('userPhotoURL', userPhotoURL)
        db.collection(db_name)
          .doc(id)
          .set({
            name: req.body.userName,
            email: req.body.userEmail,
            photoURL: req.body.userPhotoURLs,
            category: req.body.userCategory,
            tagline: req.body.userTagline,
            description: req.body.userDescription,
          })
          .then(() => {
            // console.log('Vendor added!');
            res.status(200).json({ msg: 'Vendor added successfully' })
          })
          .catch((error) => {
            // console.log('couldnt insert new Vendor')
            res.status(500).json({ msg: 'couldnt insert new Vendor' })
          });
      }
    })
    .catch((error) => {
      // console.log('addVendorToDatabase error')
      res.status(500).json({ msg: 'addVendorToDatabase error' })
    });
});

module.exports = router;
