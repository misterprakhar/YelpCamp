const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: "63b19c6b970c6aedb922ef76",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt esse iusto iste distinctio asperiores natus culpa, qui rerum possimus at eum deleniti vel ab maiores amet officiis reprehenderit sequi eos?",
			price,
			geometry: {
				type: "Point",
				coordinates: [cities[random1000].longitude, cities[random1000].latitude],
			},
			images: [
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1672742555/YelpCamp/zboqxit4s1dvybvz08xt.jpg",
					filename: "YelpCamp/zboqxit4s1dvybvz08xt",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1672742557/YelpCamp/ctx90ieajq6dzy3fj9qr.jpg",
					filename: "YelpCamp/ctx90ieajq6dzy3fj9qr",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1672742560/YelpCamp/s26sdor4yiacep68gqfe.jpg",
					filename: "YelpCamp/s26sdor4yiacep68gqfe",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1672742563/YelpCamp/cvz68bfz54ymcti7bxue.jpg",
					filename: "YelpCamp/cvz68bfz54ymcti7bxue",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1672742566/YelpCamp/eoorv0qdqzdychjrapqo.jpg",
					filename: "YelpCamp/eoorv0qdqzdychjrapqo",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
