var express = require('express');
var router = express.Router();
var request = require("request")
var cheerio = require("cheerio")
	/* GET users listing. */
router.get('/:video', function(req, res, next) {
	var video = req.params.video;
	request(video, function(err, data, body) {
		$ = cheerio.load(body);
		var videoUrl = $("video").attr("src");
		res.render('video', {
			video: videoUrl
		});
	})


});


module.exports = router;