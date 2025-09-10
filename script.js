$(document).ready(function () {
  const envelope = $('#envelope');
  const openBtn = $("#openBtn");
  const resetBtn = $("#resetBtn");
  const audio = $("#sound")[0];

  let currentPage = 1;
  const totalPages = 23;
  let isOpen = false;
  let hasPlayed = false;

  function playAudioOnce() {
      if (!hasPlayed) {
          audio.play().then(() => {
              hasPlayed = true;
          }).catch((e) => {
              console.log("Không thể phát nhạc:", e);
          });
      }
  }

  // Click vào phong bì để lật trang tiếp theo
  envelope.on('click', function () {
      if (isOpen) nextLyric();
  });

  // Nút mở
  openBtn.on('click', function () {
      envelope.removeClass("close").addClass("open");
      isOpen = true;
      openBtn.hide();
      resetBtn.show();
      playAudioOnce();
  });

  // Nút đóng
  resetBtn.on('click', function () {
      envelope.removeClass("open").addClass("close");
      isOpen = false;
      setTimeout(function () {
          currentPage = 1;
          updateActivePage();
          resetBtn.hide();
          openBtn.show();
      }, 600);
  });

  function nextLyric() {
      currentPage = currentPage < totalPages ? currentPage + 1 : 1;
      updateActivePage();
  }

  function updateActivePage() {
      $(".lyric-page").removeClass("active");
      $("#page" + currentPage).addClass("active");
  }
});
