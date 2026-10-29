import { webAssets } from './webAssetCatalog.js?v=2.5.0-rc.4-d6835d141692';
export function webAsset(file) { return webAssets[file]?.file ?? file; }
export { webAssets };
