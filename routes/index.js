var express = require('express');
var socket = require("../controllers/socket");
var router = express.Router();

/* GET home page. */



router.get('/', function(req, res, next) {

  var os = require('os');
  var ifaces = os.networkInterfaces();
  var ip = "";
  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      if (ip.length > 0) {
        return;
      }

      ip = iface.address;

      ++alias;
    });
  });

  var qr = "http://chart.apis.google.com/chart?cht=qr&chl=" + ip + "%3A3000%2Fremoto&chs=256x256";

  res.render('index', {
    title: 'Express',
    qr: qr,
    ip: ip
  });

});

router.get('/remoto', function(req, res, next) {

  res.render('remote', {
    title: 'Control Remoto'
  });

});

router.get('/remoto/cast/', function(req, res, next) {
  var b = new Buffer(req.query.url, 'base64')
  var s = b.toString();
  socket.io().emit("video", s);
  res.send({});
});


router.get('/remoto/pause/', function(req, res, next) {
  socket.io().emit("toggleYoutube");
  res.send({});
});


router.post('/remoto/image/', function(req, res, next) {
  socket.io().emit("cast", {
    img: req.body.img
  });
  res.send({});
});



module.exports = router;