# Pet Commerce Link Hub

寵物生活用品館專用導流頁（Link-in-bio），以單頁靜態網站整合品牌與分類連結，適合部署在 GitHub Pages。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://bruce-yang-422.github.io/pet-commerce-link-hub/)

線上預覽: <https://bruce-yang-422.github.io/pet-commerce-link-hub/>

## 專案特色

- 單頁靜態網站，無後端、無建置流程
- Bento Grid 卡片式版面，支援桌面/平板/手機
- 品牌卡 + 商品分類卡，集中導流到外部賣場
- 視覺風格以玻璃擬態與漸層卡片為主

## 目前內容

### 品牌卡

- Royal Canin
- Farmina
- TOMA-PRO（優格）
- CIAO
- Solution（耐吉斯）
- Natural Balance（自然平衡）

### 商品分類卡

- 貓乾糧
- 狗乾糧
- 貓濕糧
- 狗濕糧
- 零食專區
- 保健品

## 重要現況（Banner）

- `index.html` 目前已移除 Banner 區塊
- `assets/js/config.js` 與 `assets/js/main.js` 保留 Banner 設定/程式碼
- 若 `CONFIG.banner.enabled = true`，因頁面沒有 Banner 元素，Console 會出現找不到元素的警告
- 建議目前將 `CONFIG.banner.enabled` 設為 `false`

## 404 頁面

專案根目錄已包含 `404.html`。GitHub Pages 會自動在訪問不存在的路徑時顯示此頁面，無需額外設定。

## 專案結構

```text
pet-commerce-link-hub/
├── index.html
├── 404.html
├── README.md
├── assets/
│   ├── favicon.ico
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js
│   │   └── main.js
│   └── images/
│       ├── banners/
│       │   ├── README.md
│       │   └── banner-*-desktop/mobile.(png|jpg)
│       ├── logos/
│       │   ├── royal-canin.png
│       │   ├── farmina.png
│       │   ├── toma-pro_logo.jpg
│       │   ├── solution_logo.jpg
│       │   └── natural-balance_logo.jpg
│       ├── brand/
│       └── icon/
└── .gitignore
```

## 快速開始

```bash
git clone https://github.com/bruce-yang-422/pet-commerce-link-hub.git
cd pet-commerce-link-hub
```

直接用瀏覽器開啟 `index.html`，或使用 VS Code Live Server 預覽。

## 常用調整

### 1) 修改品牌或分類連結

編輯 `index.html` 內對應卡片的 `href`:

```html
<a class="bento-card brand-card" href="https://example.com" target="_blank" rel="noopener noreferrer">
```

### 2) 更新品牌 Logo

1. 將圖片放到 `assets/images/logos/`
2. 在 `index.html` 對應卡片改 `<img src="...">`
3. 若圖片有留白邊，可在 `assets/css/style.css` 調整該品牌卡片的 logo wrapper / image 樣式

### 3) 調整卡片樣式

- 主要檔案: `assets/css/style.css`
- 品牌卡背景可搜尋: `.brand-card.<brand-name>`

### 4) 功能開關

編輯 `assets/js/config.js`:

```javascript
window.CONFIG = {
  banner: { enabled: false },
  scrollAnimation: { enabled: true },
  parallax: { enabled: false }
};
```

## 部署到 GitHub Pages

1. 推送到 `main` 分支
2. GitHub Repository -> `Settings` -> `Pages`
3. Source 選 `Deploy from a branch`，分支選 `main` / root

部署完成後網址:

`https://<username>.github.io/pet-commerce-link-hub/`

## 授權

MIT License
