var express = require('express');
var router = express.Router();

var db = require('../firebase/firebase')

const db_name = 'Customers'

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('user get id:', id)

    db.collection(db_name)
        .doc(id)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                // console.log('documentSnapshot exists, data:', documentSnapshot.data());
                res.status(200).json(documentSnapshot.data())
            } else {
                // console.log('documentSnapshot does not exist');
                res.status(201).json({})
            }
        })
        .catch((error) => {
            // console.log('error in db')
            res.status(404).json({ error: error })
        });
});

router.post('/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('user post body:', req.body)
    db.collection(db_name)
        .doc(id)
        .get()
        .then(documentSnapshot => {
            // console.log('Customer exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
                // console.log('User data: ', documentSnapshot.data());
                res.status(201).json({})
            } else {
                // console.log('userPhotoURL', userPhotoURL)
                db.collection(db_name)
                    .doc(id)
                    .set({
                        name: req.body.userName,
                        email: req.body.userEmail,
                        photoURL: req.body.userPhotoURL,
                    })
                    .then(() => {
                        // console.log('Customer added!');
                        res.status(200).json({ msg: 'customer added successfully' })
                    })
                    .catch((error) => {
                        // console.log('couldnt insert new user')
                        res.status(500).json({ msg: 'couldnt insert new customer' })
                    });
            }
        })
        .catch((error) => {
            // console.log('addCustomerToDatabase error')
            res.status(500).json({ msg: 'addCustomerToDatabase error' })
        });
});

module.exports = router;