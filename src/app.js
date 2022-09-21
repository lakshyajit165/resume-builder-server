const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const pdfTemplate = require("./templates");
const { generatePDF } = require("./utilities/generatePDF");

app.get("/check", (req, res) => {
	return res.status(200).send({ message: "Server is up and running!" });
});

app.post("/create_resume", async (req, res) => {
	try {
		const pdf = await generatePDF(pdfTemplate(req.body));
		return res.status(200).contentType("application/pdf").send(pdf);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ message: "An error occurred while generating PDF. Please try again!" });
	}
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running!")
});