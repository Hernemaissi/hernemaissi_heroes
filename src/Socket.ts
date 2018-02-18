import * as webSocket from 'ws';
import * as _ from 'lodash';

import { initPlayer, Player} from './Player';
import { SCENES } from './Scene';
import * as shop from './Shop';

interface Message {
    id: string;
    message: string;
}

let index = 1;
let sockets: { [id: string]: Player } = {}

export function initSocket(wss: webSocket.Server) {
    wss.on('connection', function connection(ws, req) {
        let idArr = req.headers['sec-websocket-key'];
        let id: string;
        if (idArr instanceof Array && idArr.length > 0) {
            id = idArr[0]
        } else if (typeof(idArr) === 'string') {
            id = idArr;
        } else {
            console.log(typeof(idArr))
            throw 'NO ID!!';
        }
        const newPlayer = initPlayer(index);
        sockets[id] = newPlayer;
        index++;
    
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            const receivedMessage: Message = JSON.parse(message.toString());
            if (receivedMessage.id) {
                switch (receivedMessage.id) {
                    case 'button': {
                        wss.clients.forEach((w) => {
                            let idArr = req.headers['sec-websocket-key'];
                            let id: string;
                            if (idArr instanceof Array && idArr.length > 0) {
                                id = idArr[0]
                            } else if (typeof (idArr) === 'string') {
                                id = idArr;
                            } else {
                                throw 'NO ID!!';
                            }
                            const player = sockets[id];
                            w.send("Player " + player.index + " pressed the button!");
                        });
                        break;
                    }
                    case 'action': {
                        const player = sockets[id];
                        const updated = handleAction(receivedMessage.message, player);
                        if (updated) {
                            sockets[id] = updated;
                            ws.send(JSON.stringify({ id: 'status', message: updated }));
                            wss.clients.forEach((w) => {
                                w.send(JSON.stringify({id: "message", message: "Player " + updated.index + " entered "+ updated.currentScene.name + "!"}));
                            });
                        } else {
                            ws.send(JSON.stringify({ id: 'error', message: 'Failed to complete action' }));
                        }
                        break;
                    }
                    case 'buy': {
                        const player = sockets[id];
                        const index = receivedMessage.message;
                        const result = shop.buyItem(index, player);
                        if (result.kind === 'success') {
                            sockets[id] = result.player;
                            ws.send(JSON.stringify({ id: 'status', message: result.player }));
                            ws.send(JSON.stringify({id: "message", message: "Bought " + result.item.name + "!"}));
                        } else {
                            ws.send(JSON.stringify({id: "message", message: result.reason}));
                        }
                        break;
                    }
                    default:
                        ws.send('Unknown id');
                        break;
                }
            } else {
                ws.send(JSON.stringify({id: 'error', message: 'Unknown message'}));
            }
        });
    
        ws.on('close', function close() {
            console.log('disconnected');
          });
    
        ws.on('error', function error(error: any, message: any) {
            console.log("WS error:" + error + " " + message);
        });
    
        ws.send(JSON.stringify({id: 'message', message: 'Welcome to the game'}));
        ws.send(JSON.stringify({id: 'status', message: newPlayer}));
    });
}

function handleAction(action: string, player: Player): Player | null {
    const allowedActions = player.currentScene.allowedActions;
    if (_.indexOf(allowedActions, action) === -1) {
        return null;
    }
    let newPlayer = _.cloneDeep(player);
    switch(action) {
        case 'shop': {
            return handleSceneChange(newPlayer, action);
        }
        case 'adventure': {
            return handleSceneChange(newPlayer, action);
        }
        default:
            return null;
    }
}

function handleSceneChange(player: Player, scene: string): Player {
    const oldScene = player.currentScene;
    player.currentScene = SCENES[scene];
    player.previousScene = oldScene;
    return player;
}