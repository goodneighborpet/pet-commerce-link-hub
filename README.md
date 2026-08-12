# Pet Commerce Link Hub

好厝邊寵物店專用導流頁（Link-in-bio），以單頁靜態網站整合品牌與分類連結，適合部署在 GitHub Pages。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://goodneighborpet.github.io/pet-commerce-link-hub/)

線上預覽: <https://goodneighborpet.github.io/pet-commerce-link-hub/>

## 品牌指南前端網址

- 柏萊富：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/blackwood_buying_guide.html>
- 法米納：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/farmina-buying-guide.html>
- 活力零食：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/gootoe.html>
- 瑪恩吉：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/monge_buying_guide.html>
- 自然平衡：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/natural_balance_buying_guide.html>
- 耐吉斯：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/ngs_buying_guide.html>
- 瑞威：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/real_power_buying_guide.html>
- 法國皇家：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/royal_canin_buying_guide.html>
- 優格：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/toma_pro_buying_guide.html>
- 愛喜雅：<https://goodneighborpet.github.io/pet-commerce-link-hub/guides/brands/aixia_buying_guide.html>

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

## Banner 設定與圖片尺寸

- `index.html` 已啟用 3 張 Banner 輪播，位置在網站標題卡下方
- 桌面版建議圖片：`1200 x 700 px`（比例約 `1.71:1`；最大顯示區域約 `587 x 341 px`）
- 手機版建議圖片：`750 x 420 px`（比例約 `1.79:1`；常見顯示區域約 `343-398 x 200 px`）
- 檔名格式：`banner-{編號}-desktop.png`、`banner-{編號}-mobile.png`
- 圖片放置位置：`assets/images/banners/`
- 響應式切換點：桌面版 `> 768 px`，手機版 `<= 768 px`
- 圖片使用 `background-size: cover`；不同螢幕寬度仍可能裁切邊緣，Logo、文字與 CTA 請放在中央約 `70%` 的安全區域
- 完整圖片規格與連結設定請參考 [Banner 圖片說明](assets/images/banners/README.md)

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
git clone https://github.com/goodneighborpet/pet-commerce-link-hub.git
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
  banner: { enabled: true },
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
# pet-commerce-link-hub
