import React, { useState, useCallback } from 'react';
import { useVoiceAssistantStore } from './store';
import { useConversation } from '@elevenlabs/react';


export const VoiceAssistant: React.FC = () => {
	const { isListening, startElevenLabsConversation, endElevenLabsConversation } =
		useVoiceAssistantStore();

	const conversation = useConversation({
		onConnect: () => console.log('Connected'),
		onDisconnect: () => console.log('Disconnected'),
		onMessage: (message) => console.log('Message:', message),
		onError: (error) => console.error('Error:', error),
		onDebug: (debug) => console.log('Debug:', debug),
	});
	const handleToggle = async () => {
		if (isListening) {
			endElevenLabsConversation(conversation);
		} else {
			await navigator.mediaDevices.getUserMedia({ audio: true });
			const token = await fetchConversationToken();
			if(token) {
				startElevenLabsConversation(conversation, token);
			}
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
			<div className="flex flex-col items-center">
				<p>Status: {conversation.status}</p>
				<p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
			</div>
		</div>
	);
};

const getAgentInfoFromLocalStorage = () => {
	const agentId = localStorage.getItem('elevenlabs_agentId');
	const apiKey = localStorage.getItem('elevenlabs_apiKey');
	return {agentId, apiKey};
}

const fetchConversationToken = async () => {
	const {agentId, apiKey} = getAgentInfoFromLocalStorage();
	if(!agentId || !apiKey) {
		return null;
	}
	const url = `https://tech-push.123721.xyz/api/elevenlabs/conversationtoken`
	try{
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			agentId,
			apiKey,
		}),
	});
		const data = await response.json();
		return data.token;
	} catch (error) {
		console.error('Error fetching conversation token:', error);
		return null;
	}
}