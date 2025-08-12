import React, { useState, useCallback, useEffect } from 'react';
import { useVoiceAssistantStore } from './store';
import { useConversation } from '@elevenlabs/react';
import { getInfoFromUrl } from './utils';
import { fetchProductInfo } from './utils/fetches';


export const VoiceAssistant: React.FC = () => {
	const { isListening, startElevenLabsConversation, endElevenLabsConversation } =
		useVoiceAssistantStore();
	const [productId, setProductId] = useState<string | null>(null);
	const [productInfo, setProductInfo] = useState<any>(null);

	const conversation = useConversation({
		onConnect: () => console.log('Connected'),
		onDisconnect: () => console.log('Disconnected'),
		onMessage: (message: any) => console.log('Message:', message),
		onError: (error: any) => console.error('Error:', error),
		onDebug: (debug: any) => console.log('Debug:', debug),
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

	useEffect(()=>{
		const pageUrl = window.location.href;
		const {productId} = getInfoFromUrl(pageUrl);
		console.log(`pageUrl: ${pageUrl},productId: ${productId}`);
		if(productId) {
			setProductId(productId);
		}
	}, [])

	useEffect(()=>{
		if(productId) {
			const getProductInfo = async () => {
				const productInfo = await fetchProductInfo(productId);
				console.log(productInfo);
				setProductInfo(productInfo);
			}
			getProductInfo();
		}
	}, [productId])

	return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col items-center bg-white shadow-lg border-l border-gray-200 p-4 rounded-l-lg">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${isListening ? 'animate-pulse' : ''}`}
        onClick={handleToggle}
      >
        🎤
      </button>
      <div className="flex flex-col items-center mt-2">
        <p>Status: {conversation.status}</p>
		{conversation.status === 'connected' ? <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p> : null}
        
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