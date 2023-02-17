var express = require('express');
var router = express.Router();

var db = require('../firebase/firebase')

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    console.log('id:', id)

    let response = {};

    db.collection('Customers')
        .doc(id)
        .get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                response = documentSnapshot.data()
                console.log('documentSnapshot exists, data:', response);
            } else {
                console.log('documentSnapshot does not exist');
                response = 'documentSnapshot does not exist'
            }
        })
        .catch((error) => {
            console.log('error in db')
        });

    res.status(200).json(response)
});

module.exports = router;