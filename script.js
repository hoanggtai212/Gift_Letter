$(document).ready(function () {
  const envelope = $('#envelope');
  const openBtn = $("#openBtn");
  const resetBtn = $("#resetBtn");
  const audioEl = $("#sound")[0];

  let currentPage = 1;
  const totalPages = 15;
  let isOpen = false;
  let hasPlayed = false;
  let isClosing = false; // guard để tránh đóng lặp

  function playAudioOnce() {
      if (!audioEl) {
          console.warn("Audio element #sound not found.");
          return;
      }
      if (!hasPlayed) {
          audioEl.play().then(() => {
              hasPlayed = true;
          }).catch((e) => {
              console.log("Không thể phát nhạc:", e);
          });
      }
  }

  // Click vào phong bì để lật trang tiếp theo
  envelope.on('click', function () {
      if (isOpen && !isClosing) nextLyric();
  });

  // Nút mở
  openBtn.on('click', function () {
      envelope.removeClass("close").addClass("open");
      isOpen = true;
      openBtn.hide();
      resetBtn.show();
      playAudioOnce();
  });

  // Nút đóng -> gọi chung hàm closeLetter
  resetBtn.on('click', function () {
      closeLetter();
  });

  function nextLyric() {
      if (currentPage < totalPages) {
          // Chưa tới trang cuối -> sang trang tiếp theo
          currentPage++;
          updateActivePage();
          // Nếu cần, bạn có thể phát hiệu ứng khi tới trang cuối tại đây
          // if (currentPage === totalPages) { /* thêm class gợi ý */ }
      } else if (currentPage === totalPages) {
          // Đang ở trang cuối -> bấm thêm lần nữa thì đóng thư
          closeLetter();
      }
  }

  function closeLetter() {
      if (isClosing) return; // tránh gọi nhiều lần
      isClosing = true;

      envelope.removeClass("open").addClass("close");
      isOpen = false;

      // Delay khớp với animation đóng (600ms như trước)
      setTimeout(function () {
          currentPage = 1;
          updateActivePage();
          resetBtn.hide();
          openBtn.show();
          // reset trạng thái cho lần mở tiếp theo
          isClosing = false;
      }, 600);
  }

  function updateActivePage() {
      $(".lyric-page").removeClass("active");
      $("#page" + currentPage).addClass("active");
  }
});




