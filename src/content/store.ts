import { create } from 'zustand';
import { useConversation } from '@elevenlabs/react';

type VoiceAssistantState = {
	isListening: boolean;
	conversationId: string,
	startListening: () => void;
	stopListening: () => void;
	startElevenLabsConversation: (conversation: any, conversationToken: string)=>void;
	endElevenLabsConversation: (conversation: any)=>void;
};

export const useVoiceAssistantStore = create<VoiceAssistantState>((set) => ({
	isListening: false,
	conversationId: '',
	startElevenLabsConversation: async (conversation: any, conversationToken: string)=>{
		const conversationId = await conversation.startSession({
			conversationToken,
  			connectionType: 'webrtc', // either "webrtc" or "websocket"
		});
		set({ conversationId: conversationId, });
	},
	endElevenLabsConversation: async (conversation: any)=>{
		await conversation.endSession();
		set({ conversationId: '' });
	},
	startListening: () => {
		// 请求麦克风权限
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				// TODO: 实现实际的语音识别逻辑
				console.log('开始监听...', stream);
				set({ isListening: true });
			})
			.catch((err) => {
				console.error('无法访问麦克风:', err);
			});
	},
	stopListening: () => {
		// TODO: 实现停止监听逻辑
		console.log('停止监听');
		set({ isListening: false });
	},
}));
