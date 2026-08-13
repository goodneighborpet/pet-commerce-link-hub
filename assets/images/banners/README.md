# Banner 圖片與設定說明

此資料夾用於存放首頁輪播 Banner 圖片。輪播位於網站標題卡下方，顯示的 Banner 數量與順序由 `index.html` 內的 `.banner-slide` 決定。

## 圖片規格

### 桌面版

- 適用寬度：`> 1024 px`
- 建議圖片尺寸：`1200 x 700 px`
- 建議比例：約 `1.71:1`
- 顯示區域：最大約 `587 x 341 px`
- 檔名格式：`banner-{編號}-desktop.png`
- 桌面版圖片為必要檔案；系統會先確認它存在，再載入其他裝置版本

### 平板版

- 適用寬度：`769 - 1024 px`
- 建議圖片尺寸：`1200 x 570 px`
- 顯示比例：固定 `2.1:1`，由 CSS 的 `aspect-ratio` 鎖定
- 顯示區域：容器全寬，並依寬度等比縮放
- 檔名格式：`banner-{編號}-tablet.png`
- 平板版圖片為選用；未提供時會自動使用桌面版圖片

### 手機版

- 適用寬度：`<= 768 px`
- 建議圖片尺寸：`750 x 420 px`
- 建議比例：約 `1.79:1`
- 顯示區域：容器全寬；常見約 `343-398 x 192-223 px`
- 檔名格式：`banner-{編號}-mobile.png`
- 未提供手機版圖片時會自動使用桌面版圖片

## 圖片格式與載入順序

- 支援 PNG 與 JPG
- 系統會優先載入 `.png`，找不到時再嘗試 `.jpg`
- 同一張 Banner 的桌面、平板與手機圖片應使用相同格式
- 每一張 Banner 至少需要桌面版圖片
- 圖片載入失敗時，會顯示預設漸層背景與文字內容

檔案命名範例：

```text
assets/images/banners/
├── banner-1-desktop.png
├── banner-1-tablet.png
├── banner-1-mobile.png
├── banner-2-desktop.png
├── banner-2-tablet.png
├── banner-2-mobile.png
└── README.md
```

平板版為選用檔案，因此也可以只準備桌面版與手機版：

```text
banner-1-desktop.jpg
banner-1-mobile.jpg
```

## 構圖與裁切

- Banner 使用 `background-size: cover` 填滿顯示區域
- 圖片比例與顯示區域不同時，上下或左右邊緣可能被裁切
- Logo、文字與 CTA 等重要內容應放在中央約 `70%` 的安全區域
- 建議直接將所有文字與視覺元素設計在圖片內；圖片載入成功後，HTML 的預設文字會隱藏
- 桌面、平板與手機的構圖可分別調整，以避免關鍵內容在不同螢幕上被裁切

## 圖片最佳化

- 建議使用圖片壓縮工具降低檔案大小
- 桌面版與平板版建議控制在 `200 KB` 以內
- 手機版建議控制在 `150 KB` 以內
- 可使用 [TinyPNG](https://tinypng.com/) 或 [Squoosh](https://squoosh.app/) 進行壓縮
- 上傳後請在桌面、平板與手機寬度下確認圖片清晰度和裁切位置

## 新增或移除 Banner

Banner 編號必須與 `index.html` 內 `.banner-slide` 的順序一致。新增 Banner 時，需要同步加入：

1. `index.html` 內的 `.banner-slide`
2. `index.html` 內對應的 `.dot` 分頁按鈕
3. 此資料夾內對應編號的圖片
4. `assets/js/config.js` 內 `banner.links` 的連結

移除 Banner 時，也應同步移除上述項目，避免圖片、分頁按鈕與連結順序不一致。

## 輪播設定

在 `assets/js/config.js` 的 `banner` 區塊調整輪播行為：

```javascript
window.CONFIG = {
  banner: {
    enabled: true,
    autoPlay: true,
    autoPlayInterval: 5000,
    pauseOnHover: true,
    links: [
      'https://example.com/banner1',
      'https://example.com/banner2'
    ]
  }
};
```

- `enabled`：是否顯示 Banner；設為 `false` 時會移除整個 Banner 區塊
- `autoPlay`：是否自動輪播
- `autoPlayInterval`：自動切換間隔，單位為毫秒
- `pauseOnHover`：滑鼠停留在 Banner 上時是否暫停輪播

## Banner 連結設定

`banner.links` 的陣列順序會依序對應 Banner：

- `links[0]` 對應 `banner-1`
- `links[1]` 對應 `banner-2`
- `links[2]` 對應 `banner-3`

連結請使用包含 `https://` 的完整 URL。點擊 Banner 後，連結會在新分頁開啟。

## 更新步驟

1. 依照裝置規格準備圖片
2. 使用相同編號與格式命名桌面、平板和手機圖片
3. 壓縮圖片並放入 `assets/images/banners/`
4. 確認 `index.html` 的 Banner 數量與圖片編號一致
5. 在 `assets/js/config.js` 設定輪播行為與點擊連結
6. 清除瀏覽器快取，重新載入並測試各種螢幕寬度
