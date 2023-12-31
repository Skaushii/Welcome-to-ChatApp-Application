const port = process.env.PORT || 8000;
const io = require("socket.io")(port, {
    cors: {
      origin: "https://chatwithcowshik.netlify.app/", // This is the origin of your frontend application
      methods: ["GET", "POST"]
    }
  });
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 })

