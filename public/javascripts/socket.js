io = io.connect('/');

io.emit('ping', { some: 'data' } );

io.on('pong', function (data) {
    console.log( 'socket: browser receives pong (4)', data );
});
