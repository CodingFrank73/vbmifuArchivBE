const { getIfuByMultipleParams } = require('../db-access/dao-ifu');

const listAllByMultipleSearch = async (ref_param, lot_param, gtin_param) => {

    const ifus = await getIfuByMultipleParams(ref_param, lot_param, gtin_param)

    const listOfIfus = ifus.map(i => ({
        _id: i._id,
        refNo: i.refNo,
        lotNo: i.lotNo,
        gtin: i.gtin,
        path: i.path
    }))

    return listOfIfus
}

module.exports = {
    listAllByMultipleSearch
}