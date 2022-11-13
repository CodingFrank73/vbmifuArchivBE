const express = require('express');
const cors = require('cors');

const { listAllIfus, listAllByFreeSearch, listAllByMultipleSearch } = require('../src/use-cases')

const PORT = process.env.PORT || 9000;
const app = express();


app.use(express.json());
app.use(cors({ origin: true, credentials: true }))

app.get("/", (req, res) => {
    res.send("server works...")
})

app.get('/all', async (req, res) => {

    try {
        const ifus = await listAllIfus()

        res.status(200).json(ifus)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading users" })
    }
})

app.get('/freeParam/', async (req, res) => {

    try {
        const input = req.query.input
        console.log(input);
        const ifus = await listAllByFreeSearch(input)

        res.status(200).json(ifus)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading users" })
    }
})


app.get('/multiSearch/', async (req, res) => {


    // let lot_param;
    try {
        const ref_param = req.query.ref
        const lot_param = req.query.lot;
        const gtin_param = req.query.gtin
        // console.log(req.params.ref);
        // console.log(req.params.lot);
        // if (!req.params.ref) { ref_param = '' } else {
        //     ref_param = req.params.ref;
        // }

        // if (!req.params.lot) { lot_param = '' } else {
        //     lot_param = req.params.lot
        // }
        // const ref_param = req.params.ref;
        // const lot_param = "";
        // const gtin_param = ""

        console.log(ref_param);
        console.log(lot_param);

        const ifus = await listAllByMultipleSearch(ref_param, lot_param, gtin_param)

        res.status(200).json(ifus)

    } catch (error) {
        res.status(500).json({ err: error.message || "Unknown error while reading users" })
    }
})


app.listen(PORT, () => {
    console.log(`Server listen on Port: ${PORT}`);
})