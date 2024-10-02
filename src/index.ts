window.Webflow ||= [];
window.Webflow.push(() => {});

// Inject CSS immediately to avoid visual glitches before the DOM is fully loaded
(function injectStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    /* Reset webflow defaults */
    .w-background-video > video {
      z-index: 0;
    }

    /* Initially hide the video */
    .w-background-video > video:not([data-no-fadein]) {
      opacity: 0;
      visibility: hidden;
    }

    /* Fade-in effect */
    .w-background-video > video:not([data-no-fadein]).is-playing {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s ease-in-out;
    }
  `;
  document.head.appendChild(style);
})();

// Wait for DOM content to be loaded before executing the logic that relies on the DOM elements
document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll(
    '.w-background-video video'
  ) as NodeListOf<HTMLVideoElement>;

  videos.forEach((video) => {
    const wrapper = video.closest('.w-background-video') as HTMLElement | null;

    if (!wrapper) return;

    // Check for the presence of data attributes – custom settings
    const noPoster = wrapper.hasAttribute('data-no-poster');

    if (!noPoster) {
      // Set the wrapper's background image to the poster image
      const posterUrl = wrapper.getAttribute('data-poster-url');
      wrapper.style.backgroundImage = `url(${posterUrl})`;
      wrapper.style.backgroundSize = 'cover';
    }

    // Add a class when the video starts playing – trigger the fade-in or other animations
    video.onplaying = function () {
      video.classList.add('is-playing');
    };

    // Autoplay fix functionality
    if (!video.hasAttribute('autoplay')) return;

    // Check if the video is in the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.paused &&
            video.play().catch(() => {
              // If autoplay is blocked, wait for a click event
              addClickEventListener();
            });
        }
      });
    });

    observer.observe(video);

    // If autoplay is blocked, play on user interaction
    const addClickEventListener = () => {
      const onClickPlayVideo = () => {
        video.paused && video.play();
        document.removeEventListener('click', onClickPlayVideo);
      };

      // Listen for a click anywhere on the page (iOS only accepts clicks on the media element)
      document.addEventListener('click', onClickPlayVideo);
    };
  });
});
