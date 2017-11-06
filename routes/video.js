var express = require('express');
var router = express.Router();
var request = require("request")
var cheerio = require("cheerio")
	/* GET users listing. */
router.get('/:video', function(req, res, next) {
	var video = req.params.video;
	request(video, function(err, data, body) {
		$ = cheerio.load(body);
		var regExpMovie = new RegExp(/\/\/streamango\.com\/v\/d\/[0-9a-zA-Z\/\.\~]{1,2255}/);
		var videoUrl = $("video").attr("src") || "";

		if (videoUrl.length === 0) {
			videoUrl = body.match(regExpMovie).filter(function(el) {
				return el.length > 0
			})[0] || "";
		}

		res.render('video', {
			video: videoUrl
		});
	})


});

router.get('/', function(req, res, next) {


	res.render('video', {
		video: null
	});



});

module.exports = router;