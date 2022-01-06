import { RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

// backend ws endpoint
const wsURL = 'ws://ec2-3-9-18-121.eu-west-2.compute.amazonaws.com:7000/rsocket';
// const wsURL = 'ws://localhost:7000/rsocket';

export let rsocket = undefined;

// rsocket client
const client = new RSocketClient({
    serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer
    },
    setup: {
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0',
    },
    transport: new RSocketWebSocketClient({
        url: wsURL
    })
});

// error handler
const errorHanlder = (e) => console.log(e);
// response handler
const responseHanlder = (payload) => {
    console.log(payload)
}

// request to rsocket-websocket and response handling
const numberRequester = (socket) => {
    socket.requestStream({
        data: undefined,
        metadata: String.fromCharCode('players-movement'.length) + 'players-movement'
    }).subscribe({
        onError: errorHanlder,
        onNext: responseHanlder,
        onSubscribe: subscription => {
            subscription.request(2147483647); // set it to some max value
        }
    })
}

export const playersInfo = (onResponse, requestSize) => {
    rsocket.requestStream({
        data: undefined,
        metadata: String.fromCharCode('players-movement'.length) + 'players-movement'
    }).subscribe({
        onError: errorHanlder,
        onNext: onResponse,
        onSubscribe: subscription => {
            subscription.request(requestSize); // set it to some max value
        }
    })
}

export const postPlayerInfo = (player) => {
    rsocket.fireAndForget({
        data: player,
        metadata: String.fromCharCode('record-data'.length) + 'record-data'
    })
}

export const clearData = () => {
    rsocket.fireAndForget({
        data: null,
        metadata: String.fromCharCode('clear-data'.length) + 'clear-data'
    })
}

function doConnect() {
    client.connect().then(socket => {
        rsocket = socket;
    }, errorHanlder);
}

export default doConnect