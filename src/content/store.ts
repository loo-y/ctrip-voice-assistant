import { create } from 'zustand';

type VoiceAssistantState = {
	isListening: boolean;
	startListening: () => void;
	stopListening: () => void;
};

export const useVoiceAssistantStore = create<VoiceAssistantState>((set) => ({
	isListening: false,
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
