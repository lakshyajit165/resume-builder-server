const puppeteer = require("puppeteer");
/**
 * hoisting the getPage logic => no need to create new page everytime
 */
let page;
const getPage = async () => {
	if (page) return page;

	const browser = await puppeteer.launch({
		// source: https://stackoverflow.com/questions/49008008/chrome-headless-puppeteer-too-much-cpu
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-accelerated-2d-canvas",
			"--no-first-run",
			"--no-zygote",
			"--single-process", // <- this one doesn't works in Windows
			"--disable-gpu",
		],
		headless: true,
	});

	page = await browser.newPage();
	return page;
};

const generatePDF = async (html = "") => {
	// const browser = await puppeteer.launch();
	const page = await getPage();
	await page.setContent(html);
	const pdfBuffer = await page.pdf({
		format: "A4",
		margin: {
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
		},
		scale: 1.6,
	});

	// await page.close();
	// await browser.close();

	return pdfBuffer;
};

module.exports = {
	generatePDF,
};
