var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("Connected");
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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
