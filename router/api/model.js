const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Model = require('../../models/Model');

const normalize = (docs) => {
    let models = [];
    let model = {};
    docs.forEach(doc => {
        model.id = doc._id;
        for (let ele in doc.data) {
            model[ele] = doc.data[ele];
        }
        models.push(model);
        model = {};
    });
    return models;
}

// @route   GET api/model
// @desc    Get all user's model
// @access  Private
router.get('/', auth, (req, res) => {
    Model.find({user_id: req.user_id}, (err, docs) => {
        res.json({
            success: 'Fetch all models',
            models_norm: normalize(docs)
        });
    });
});

// @route   POST api/model
// @desc    Create a new model
// @access  Private
router.post('/', auth, (req, res) => {
    const { data } = req.body;
    if (!data) {
        res.json({error: 'Please enter all fields.'});
    } else {
        let newModel = Model({
            user_id: req.user_id,
            data: data
        });
        newModel.save(() => {
            Model.find({user_id: req.user_id}, (err, docs) => {
                res.json({
                    success: 'Model saved',
                    models_norm: normalize(docs)
                });
            });
        });
    }
});

// @route   DELETE api/model/:id
// @desc    Delete a model
// @access  Private
router.delete('/:id', auth, (req, res)=> {
    const model_id = req.params.id;
    if (!model_id) {
        res.json({error: 'Please enter all fields.'});
    } else {
        Model.findById(model_id)
        .then(model => {
            if (model && model.user_id === req.user_id) {
                model.remove(() => {
                    Model.find({user_id: req.user_id}, (err, docs) => {
                        res.json({
                            success: 'Model deleted',
                            models_norm: normalize(docs)
                        });
                    });
                });
            } else {
                res.json({error: 'Unable to delete model.'});
            }
            });
    }
});

module.exports = router;
