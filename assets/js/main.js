/**
 * Pet Commerce Link Hub - Main JavaScript
 * Bento Grid Layout with Banner Carousel
 */

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
  // 根據配置決定是否啟用 Banner
  if (window.CONFIG && CONFIG.banner.enabled) {
    initBannerCarousel();
  } else if (window.CONFIG && !CONFIG.banner.enabled) {
    hideBanner();
  }
});

/**
 * 完全移除 Banner 卡片
 * 讓它就像從未存在一樣
 */
function hideBanner() {
  const bannerCard = document.querySelector('.banner-card');
  if (bannerCard) {
    bannerCard.remove();
    console.log('✓ Banner removed: disabled via config');
  }
}

/**
 * 初始化 Banner 輪播功能
 */
function initBannerCarousel() {
  const track = document.querySelector('.banner-track');
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.banner-nav.prev');
  const nextBtn = document.querySelector('.banner-nav.next');
  const carousel = document.querySelector('.banner-carousel');
  
  // 檢查必要元素是否存在
  if (!track || !slides.length || !carousel) {
    console.warn('⚠ Banner carousel elements not found');
    return;
  }
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval = null;
  
  /**
   * 設定 Banner 連結（從配置檔讀取）
   */
  function setupBannerLinks() {
    if (window.CONFIG && CONFIG.banner.links && Array.isArray(CONFIG.banner.links)) {
      slides.forEach((slide, index) => {
        if (CONFIG.banner.links[index]) {
          slide.setAttribute('href', CONFIG.banner.links[index]);
        }
      });
      console.log('✓ Banner links configured');
    }
  }
  
  /**
   * 依目前螢幕寬度挑選對應斷點的圖片路徑
   * 斷點對齊 CSS：手機 <=768px，平板 769-1024px，桌面 >1024px
   * 若平板圖片不存在，updateBackground 會 fallback 回桌面版圖片
   */
  function getBannerImagePath(bannerIndex, format) {
    const width = window.innerWidth;
    if (width <= 768) {
      return `assets/images/banners/banner-${bannerIndex}-mobile.${format}`;
    }
    if (width <= 1024) {
      return `assets/images/banners/banner-${bannerIndex}-tablet.${format}`;
    }
    return `assets/images/banners/banner-${bannerIndex}-desktop.${format}`;
  }

  /**
   * 載入 Banner 圖片（桌面版、平板版與手機版）
   * 支援 PNG 和 JPG 雙格式，優先載入 PNG；平板圖片缺漏時自動 fallback 回桌面版
   */
  function loadBannerImages() {
    slides.forEach((slide, index) => {
      const bannerIndex = index + 1;
      const formats = ['png', 'jpg'];
      let imageLoaded = false;

      // 嘗試載入圖片（優先 PNG，再 JPG）
      function tryLoadImage(formatIndex = 0) {
        if (formatIndex >= formats.length) {
          // 所有格式都失敗，顯示文字內容
          console.warn(`⚠ Failed to load banner ${bannerIndex} in all formats`);
          const content = slide.querySelector('.banner-content');
          if (content) content.style.display = 'block';
          return;
        }

        const format = formats[formatIndex];
        const desktopImg = `assets/images/banners/banner-${bannerIndex}-desktop.${format}`;

        // 預載入圖片
        const img = new Image();
        img.onload = () => {
          imageLoaded = true;

          // 隱藏文字內容（圖片載入成功時）
          const content = slide.querySelector('.banner-content');
          if (content) content.style.display = 'none';

          // 設定背景圖片（平板圖片不存在時 fallback 回桌面版）
          const updateBackground = () => {
            const targetImg = getBannerImagePath(bannerIndex, format);
            const probe = new Image();
            probe.onload = () => {
              slide.style.backgroundImage = `url(${targetImg})`;
            };
            probe.onerror = () => {
              slide.style.backgroundImage = `url(${desktopImg})`;
            };
            probe.src = targetImg;
          };

          updateBackground();
          window.addEventListener('resize', updateBackground);

          console.log(`✓ Banner ${bannerIndex} loaded (${format})`);
        };

        img.onerror = () => {
          // 嘗試下一個格式
          tryLoadImage(formatIndex + 1);
        };

        // 開始載入（用桌面版圖片確認此 banner 與格式是否存在，桌面版為必備規格）
        img.src = desktopImg;
      }

      // 開始嘗試載入
      tryLoadImage();
    });
  }
  
  /**
   * 更新輪播顯示
   */
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  /**
   * 切換到下一張
   */
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }
  
  /**
   * 切換到上一張
   */
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
  
  /**
   * 開始自動輪播
   */
  function startAutoPlay() {
    if (!window.CONFIG || !CONFIG.banner.autoPlay) return;
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, CONFIG.banner.autoPlayInterval || 5000);
  }
  
  /**
   * 停止自動輪播
   */
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }
  
  // 綁定導航按鈕事件
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      // 手動切換後重啟自動輪播
      if (window.CONFIG && CONFIG.banner.autoPlay) {
        startAutoPlay();
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      // 手動切換後重啟自動輪播
      if (window.CONFIG && CONFIG.banner.autoPlay) {
        startAutoPlay();
      }
    });
  }
  
  // 綁定指示點事件
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      updateCarousel();
      // 手動切換後重啟自動輪播
      if (window.CONFIG && CONFIG.banner.autoPlay) {
        startAutoPlay();
      }
    });
  });
  
  // 懸停時暫停/恢復自動輪播
  if (window.CONFIG && CONFIG.banner.pauseOnHover && CONFIG.banner.autoPlay) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }
  
  // 觸控滑動支援
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchStartX - touchEndX;
    
    // 滑動距離超過 50px 才觸發切換
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      
      // 觸控切換後重啟自動輪播
      if (window.CONFIG && CONFIG.banner.autoPlay) {
        startAutoPlay();
      }
    }
  }, { passive: true });
  
  // 初始化
  setupBannerLinks();
  loadBannerImages();
  updateCarousel();
  startAutoPlay();
  
  console.log('✓ Banner carousel initialized');
}
