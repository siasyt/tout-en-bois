// 记录用户是否刚刚切换过语言
// 语言切换是整页跳转，所以标记存在浏览器的会话存储（sessionStorage）里，跳转后仍能读到
const STORAGE_KEY = "teb-language-switch";

// 语言切换按钮点击时调用
export function markLanguageSwitch() {
    try {
        sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
        // 浏览器禁用存储时忽略，只是动画会照常播放
    }
}

// 首屏组件读取：返回 true 表示刚切换过语言，应跳过入场动画
// 读取后立即清除，之后正常点击菜单进入其他页面时动画照常播放
export function consumeLanguageSwitch() {
    try {
        if (sessionStorage.getItem(STORAGE_KEY)) {
            sessionStorage.removeItem(STORAGE_KEY);
            return true;
        }
    } catch {
        // 构建时或浏览器禁用存储时，按正常播放动画处理
    }
    return false;
}