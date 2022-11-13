const { getIfuByAnyParam } = require('../db-access/dao-ifu');

const listAllByFreeSearch = async (input) => {
    const ifus = await getIfuByAnyParam(input)
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
    listAllByFreeSearch
}