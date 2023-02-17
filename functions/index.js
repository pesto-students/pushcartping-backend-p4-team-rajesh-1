const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/user/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('user get id:', id)

    db.collection('Customers')
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
})

app.post('/user/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('user post body:', req.body)
    db.collection('Customers')
        .doc(id)
        .get()
        .then(documentSnapshot => {
            // console.log('Customer exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
                // console.log('User data: ', documentSnapshot.data());
                res.status(201).json({})
            } else {
                // console.log('userPhotoURL', userPhotoURL)
                db.collection('Customers')
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


app.get('/vendor/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('vendor get id:', id)

    db.collection('Vendors')
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

app.patch('/vendor/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('vendor patch id:', id)

    db.collection('Vendors')
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

app.get('/vendor/get/all', function (req, res, next) {
    // let id = req.params.id;
    // console.log('vendor get id:', id)

    let response = {};

    db.collection('Vendors')
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

app.post('/vendor/:id', function (req, res, next) {
    let id = req.params.id;
    // console.log('user post body:', req.body)
    db.collection('Vendors')
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
                db.collection('Vendors')
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

exports.app = functions.https.onRequest(app)
