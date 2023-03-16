import express from "express";
import path from "path";
import * as url from "url";
import hbs from "hbs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Aids",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Aids",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "no",
		title: "Help",
		name: "Aids",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address",
		});
	}

	geocode(req.query.address)
		.then(({ latitude, longitude, location }) => {
			forecast(longitude, latitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
				//res.send(forecastData.weather + '. Temperature: ' + forecastData.temperature + '. Chance of precipitation: ' + forecastData.precipitation )
			});
		})
		.catch((err) => {
			res.send({ error: err });
		});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: "You must provide a search term",
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Aids",
		errorText: "no help page found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "Error",
		name: "Aids",
		errorText: "page not found",
	});
});

app.listen(port, () => {
	console.log("Server is up on port" + port);
});
