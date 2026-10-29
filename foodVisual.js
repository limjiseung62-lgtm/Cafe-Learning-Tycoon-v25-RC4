import { sprite } from './art.js?v=2.5.0-rc.4-8b85134eaee7';
export function foodVisual(menu) { return '<span class="food-art star-' + menu.currentLevel + '" role="img" aria-label="' + menu.name + ' ' + menu.currentLevel + '성">' + sprite(menu.visualKey) + (menu.currentLevel > 1 ? '<small class="food-grade">' + "★".repeat(menu.currentLevel) + '</small>' : '') + '</span>'; }
