var express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var io = require('socket.io')(http);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});

io.on('connection', function(socket){
  console.log("connected");
  socket.on('join',function(data){
  	socket.join(data.room);
  	//socket.broadcast.to(data.room).emit('new user joined',{user:data.user, message:'has joined this room' });
  	io.in(data.room).emit('new user joined',{user:data.user, message:'has joined this room' });
  });
  socket.on('leave',function(data){
  	socket.leave(data.room);
  	//socket.broadcast.to(data.room).emit('left',{user:data.user, message:'has left this room' });
  	io.in(data.room).emit('left',{user:data.user, message:'has left this room' });
  });
  socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  });
  socket.on('addroom',function(data){
    io.emit('roomadded', data);
  })
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
module.exports = router;
