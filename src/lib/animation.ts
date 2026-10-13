// 记录用户是否刚刚切换过语言
// 切换语言时页面会重新渲染，用这个标记跳过首屏入场动画，让切换感觉更快
let switchedLanguage = false;

// 语言切换按钮点击时调用
export function markLanguageSwitch() {
    switchedLanguage = true;
}

// 首屏组件读取：返回 true 表示需要播放入场动画
// 读取后立即重置，之后正常点击菜单进入其他页面时动画照常播放
export function consumeShouldAnimate() {
    const shouldAnimate = !switchedLanguage;
    switchedLanguage = false;
    return shouldAnimate;
}