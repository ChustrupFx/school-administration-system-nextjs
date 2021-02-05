const path = require('path');
const fs = require('fs');
const seeder = require('mongoose-seed');
require('dotenv').config();

seeder.connect(process.env.DB_URL, function() {

    seeder.loadModels(getModelFiles());
    seeder.clearModels(getSeedNames(), function() {
        
        seeder.populateModels(getSeedData(), function() {
            seeder.disconnect();
        });

    });

});

function getModelFiles() {
    const modelDirectory = path.resolve(__dirname, '../../models/');
    const files = fs.readdirSync(modelDirectory)
                    .map(file => path.resolve(modelDirectory, file));
    return files;
}

function getSeedData() {
    const seedDir = path.resolve(__dirname);
    const seeds = fs.readdirSync(seedDir)
                    .filter(file => file !== 'index.js')
                    .map(file => path.resolve(seedDir, file))
                    .map(file => require(file));
    return seeds;
}

function getSeedNames() {
    const seeds = getSeedData();
    const seedNames = seeds.map(seed => seed.model);
    return seedNames
}