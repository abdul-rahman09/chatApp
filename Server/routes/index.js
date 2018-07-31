var express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var io = require('socket.io')(http);

/* GET home page. */
var json = {
"employees":[
    {"firstName":"John", "lastName":"Doe"}, 
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
]
};

router.get('/', function(req, res, next) {
  res.json(json);
});
router.post('/:id', function(req, res, next) {
  json.findById(req.params.id, function(err, bear) {
    if (err)
      res.send(err);
    res.json(bear);
  });
 res.json(json.employees.firstName);
});
router.post('/hello', function(req, res, next) {
  res.json({ message: 'Bear created!'+ req.body.name });
});
router.put('/hello', function(req, res, next) {
  res.json({ message: 'Bear created!'+ req.body.name });
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
    io.in(data.room).emit('new message', {user:data.user,room:data.room, message:data.message});
  });
  socket.on('addroom',function(data){
    io.emit('roomadded', data);
  })
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
module.exports = router;
