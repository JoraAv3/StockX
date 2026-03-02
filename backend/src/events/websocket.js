const { WebSocketServer } = require('ws');
const { eventEmitter } = require('./eventEmitter');

let wss = null;

const initializeWebSocket = (server) => {
  wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'welcome',
      message: 'Connected to StockX WebSocket',
      timestamp: new Date().toISOString(),
    }));

    // Handle messages from client
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        handleWebSocketMessage(ws, data);
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Subscribe to events and broadcast to clients
  eventEmitter.on('order:created', (order) => {
    broadcastToClients({
      type: 'order:created',
      data: order,
    });
  });

  eventEmitter.on('order:cancelled', (order) => {
    broadcastToClients({
      type: 'order:cancelled',
      data: order,
    });
  });

  eventEmitter.on('trade:executed', (trade) => {
    broadcastToClients({
      type: 'trade:executed',
      data: trade,
    });
  });

  console.log('✅ WebSocket server initialized');
};

const handleWebSocketMessage = (ws, data) => {
  switch (data.type) {
    case 'subscribe':
      ws.symbols = data.symbols || [];
      ws.send(JSON.stringify({
        type: 'subscribed',
        symbols: ws.symbols,
      }));
      break;

    case 'unsubscribe':
      ws.symbols = [];
      ws.send(JSON.stringify({
        type: 'unsubscribed',
      }));
      break;

    case 'ping':
      ws.send(JSON.stringify({
        type: 'pong',
        timestamp: new Date().toISOString(),
      }));
      break;

    default:
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Unknown message type',
      }));
  }
};

const broadcastToClients = (message) => {
  if (!wss) return;

  const messageStr = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      // Filter by subscribed symbols if applicable
      if (message.data && message.data.symbol) {
        if (!client.symbols || client.symbols.length === 0 || client.symbols.includes(message.data.symbol)) {
          client.send(messageStr);
        }
      } else {
        client.send(messageStr);
      }
    }
  });
};

module.exports = { initializeWebSocket };
