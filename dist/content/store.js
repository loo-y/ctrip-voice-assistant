import { create } from 'zustand';
export const useVoiceAssistantStore = create((set) => ({
    isListening: false,
    startListening: () => {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
            console.log('开始监听...', stream);
            set({ isListening: true });
        })
            .catch((err) => {
            console.error('无法访问麦克风:', err);
        });
    },
    stopListening: () => {
        console.log('停止监听');
        set({ isListening: false });
    },
}));
//# sourceMappingURL=store.js.map