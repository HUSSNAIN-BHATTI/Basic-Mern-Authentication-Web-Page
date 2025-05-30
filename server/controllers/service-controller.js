const Service = require('../models/service-model');

const service = async (req, res) => {
    try {
        const response = await Service.find();
        if(!response){
            res.status(404).json({message: 'No service found'});
            return;
        }
        res.status(200).json({msg: response});
        
    } catch (error) {
        console.log(`Service : ${error}`);
        
    }

}

module.exports = service;