import React from 'react';
import { useVoiceAssistantStore } from './store';
export const VoiceAssistant = () => {
    const { isListening, startListening, stopListening } = useVoiceAssistantStore();
    const handleToggle = () => {
        if (isListening) {
            stopListening();
        }
        else {
            startListening();
        }
    };
    return (React.createElement("div", { className: "voice-assistant-widget" },
        React.createElement("button", { className: `voice-assistant-button ${isListening ? 'listening' : ''}`, onClick: handleToggle }, "\uD83C\uDFA4")));
};
//# sourceMappingURL=VoiceAssistant.js.map