var cheerio = require("cheerio");
var request = require("request");
var Promise = require("bluebird");
var urlMovies = "https://www.pelisplus.tv/peliculas/pag-";

Movies = {
	getMoviesPage: function(page) {
		return new Promise(function(resolve, reject) {
			var movies = [];
			page = page || "1";
			request(urlMovies + page, function(err, body, obj) {
				$ = cheerio.load(obj);
				$("#contentscroll > ul > li > div.haveTooltipChildren").each(function(i, e) {
					var image = $(e).find(".prevent_image").attr("src");
					var name = $(e).find(".title-movie a").attr("href").replace("https://www.pelisplus.tv/pelicula/", "");

					var servers = "https://www.elreyxhd.com/reproductor/" + name + "?image=" + image;
					movies.push(new Promise(function(resolveM, rejectM) {
						request(servers, function(errM, bodyM, objM) {
							$$ = cheerio.load(objM);
							var url = $$("[data-id='downace.com'] a").attr("href");

							resolveM({
								image: bodyM.request.href.split("image=")[1],
								url: url
							});
						});
					}));
				});
				console.log("waiting");
				Promise.all(movies).then(function(result) {
					resolve(result);
				});

			});
		});
	}
}

module.exports = Movies;