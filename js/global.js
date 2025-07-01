import $ from 'jquery';
window.$ = $;
window.jQuery = $;
export default $;

window.EqUI = window.EqUI || {};

window.EqUI.site = window.EqUI.site || {
  isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
};