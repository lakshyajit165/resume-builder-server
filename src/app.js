const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const pdf = require('html-pdf');
const pdfTemplate = require('./templates');
const fs = require('fs');

app.post("/create_resume", (req, res) => {
    console.log(req.body);
    pdf.create(pdfTemplate(req.body), {}).toStream((err, stream) => {
        if(err)
            return res.status(500).send({ "errorMessage": "an error occurred while creating the resume!" });
        res.writeHead(200, {
            'Content-Type': 'application/force-download',
            'Content-disposition': 'attachment; filename=Resume.pdf'
        });
        stream.pipe(res);
    });

});

app.listen(3000, () => {
    console.log("Server running!")
});