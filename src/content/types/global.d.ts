// 扩展Window接口以支持React DevTools
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}

export {};
