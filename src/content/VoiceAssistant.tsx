import React, { useState } from 'react';
import { useVoiceAssistantStore } from './store';

export const VoiceAssistant: React.FC = () => {
	const { isListening, startListening, stopListening } =
		useVoiceAssistantStore();

	const handleToggle = () => {
		if (isListening) {
			stopListening();
		} else {
			startListening();
		}
	};

	return (
		<div className="voice-assistant-widget">
			<button
				className={`voice-assistant-button ${isListening ? 'listening' : ''}`}
				onClick={handleToggle}
			>
				🎤
			</button>
		</div>
	);
};
