import React from 'react';
import ReactDOM from 'react-dom/client';
import { VoiceAssistant } from './VoiceAssistant';

// 创建容器元素
const container = document.createElement('div');
container.id = 'ctrip-voice-assistant-container';
document.body.appendChild(container);

// 渲染React应用
const root = ReactDOM.createRoot(container);
root.render(<VoiceAssistant />);
