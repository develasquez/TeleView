var io = {};

SocketServer = {
  io: function (argument) {
    return io;
  },
  init: function(server) {
    io = require('socket.io').listen(server);
    io.on('connection', function(socket) {
      socket.on('cambiarCanal', function(canal) {
        io.emit('cambiarCanal', canal);
      });
      socket.on('fullScreen', function() {
        io.emit('fullScreen');
      });
      socket.on('hideQr', function() {
        io.emit('hideQr');
      });
      socket.on('toggleYoutube', function(acction) {
        io.emit('toggleYoutube', acction);
      });
      socket.on('video', function(videoUrl) {
        io.emit('video', videoUrl);
      });
      socket.on('tele', function() {
        io.emit('tele');
      });
      socket.on('end', function(id) {
        io.emit('end', id);
      });
      socket.on('cast', function(video) {
        io.emit('cast', video);
      });
      socket.on('image', function(image) {
        io.emit('image', image);
      });
      socket.on('successImage', function(successImage) {
        io.emit('successImage', successImage);
      });
      socket.on('spotifyList', function(url) {
        try {
          request(url, function(error, response, body) {
            console.error("error", error);
            io.emit('spotifyList', body);
          });
        } catch (ex) {

        }
      });
    });
  }
}


module.exports = SocketServer;