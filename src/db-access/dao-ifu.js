const { ObjectId } = require('mongodb');
const { getDB } = require('./db-connector');

const collectionName = 'ifu';

async function getAll() {
    const db = await getDB();
    const ifus = await db.collection(collectionName).find().toArray();
    return ifus
}

async function getIfuByAnyParam(input) {
    const db = await getDB();
    const ifus = await db.collection(collectionName).aggregate([
        {
            $match: {
                $or: [
                    { refNo: input },
                    { lotNo: input },
                    { gtin: input }
                ]
            }
        },
        {
            $project: {
                refNo: 1,
                lotNo: 1,
                gtin: 1,
                path: 1
            }
        }
    ]).toArray()

    return ifus
}

async function getIfuByMultipleParams(ref_param, lot_param, gtin_param) {

    let filterConditions = {
        'refNo': `${ref_param}`,
        'lotNo': `${lot_param}`,
        'gtin': `${gtin_param}`
    }

    for (var i in filterConditions) {
        if (filterConditions[i] == '') {
            delete filterConditions[i]
        }
    }

    const db = await getDB();
    const ifus = await db.collection(collectionName).find(filterConditions).toArray()

    return ifus
}


module.exports = {
    getAll,
    getIfuByAnyParam,
    getIfuByMultipleParams
}