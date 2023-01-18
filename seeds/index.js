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
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1674067043/YelpCamp/dejan-cabrilo-_guOEZqWpaQ-unsplash_qicgxk.jpg",
					filename: "YelpCamp/dejan-cabrilo-_guOEZqWpaQ-unsplash_qicgxk",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1674067038/YelpCamp/jasper-garratt-krfapSCiZlQ-unsplash_p8xo0q.jpg",
					filename: "YelpCamp/jasper-garratt-krfapSCiZlQ-unsplash_p8xo0q",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1674067038/YelpCamp/dejan-cabrilo-lcO1gfAG0vU-unsplash_bglpvt.jpg",
					filename: "YelpCamp/dejan-cabrilo-lcO1gfAG0vU-unsplash_bglpvt",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1674067037/YelpCamp/evan-leith-TRl55zC3MU0-unsplash_ne6fhf.jpg",
					filename: "YelpCamp/evan-leith-TRl55zC3MU0-unsplash_ne6fhf",
				},
				{
					url: "https://res.cloudinary.com/dnwtehvju/image/upload/v1674067036/YelpCamp/daniel-koponyas-efSTj_AifJU-unsplash_vf6aog.jpg",
					filename: "YelpCamp/daniel-koponyas-efSTj_AifJU-unsplash_vf6aog",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
