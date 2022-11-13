const { getAll } = require('../db-access/dao-ifu');

const listAllIfus = async () => {
    const ifus = await getAll()
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
    listAllIfus,
}