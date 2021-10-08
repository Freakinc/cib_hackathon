import React, { useState, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const SidBar = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    'wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self'
  );
  const messageHistory = useRef([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  messageHistory.current = useMemo(() => messageHistory.current!.concat(lastMessage), [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('wss://demos.kaazing.com/echo'), []);

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  if (!messageHistory.current) {
    return <div> ...loading</div>;
  }
  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button>
      <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.current.map((message: any, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default SidBar;
