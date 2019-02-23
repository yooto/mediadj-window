var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');

// 送受信された記録を管理する変数
let stateArray = [0,0,0,0];
let controlDic = {a : 0, b : 0, c : 0, d : 0, e : 0, f : 0, g : 0}


var server = http.createServer(function(req, res){
    // 現在のデータの状態を送信する
    io.sockets.emit('server_to_client', stateArray);
    io.sockets.emit('server_to_client_Dic', controlDic);

    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('index.html', 'utf-8'));
}).listen(process.env.PORT || 3000);

var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
    socket.on('client_to_server', function(data){
        // 受信時の処理
        if(data === 1){
            stateArray[0] += 1;
        }else if(data === 2){
            stateArray[1] += 1;
        }else if(data === 3){
            stateArray[2] += 1;
        }else if(data === 4){
            stateArray[3] += 1;
        }else if(data === "reset"){
            stateArray[0] = 0;
            stateArray[1] = 0;
            stateArray[2] = 0;
            stateArray[3] = 0;
        }else{
            controlDic = data;
        }

        io.sockets.emit('server_to_client', stateArray);
        io.sockets.emit('server_to_client_Dic', controlDic);
    });
});