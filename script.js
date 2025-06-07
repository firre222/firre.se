document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bgVideo');
    const audio = document.getElementById('bgAudio');
    const textOverlay = document.querySelector('.text-overlay');
    const entryOverlay = document.querySelector('.entry-overlay');
    const startButton = document.getElementById('startButton');
    const videoContainer = document.querySelector('.video-container');
    const loadingOverlay = document.querySelector('.loading-overlay');
    const loadingProgress = document.querySelector('.loading-progress');

    // Prepare audio to start at 19 seconds
    audio.addEventListener('loadedmetadata', () => {
        audio.currentTime = 19;
    });

    // Hide entry overlay until loading is complete
    entryOverlay.style.visibility = 'hidden';

    // Loading check variables
    let videoLoaded = false;
    let backgroundLoaded = false;

    // Function to update loading progress
    function updateLoadingProgress() {
        let progress = 0;
        if (videoLoaded) progress += 50;
        if (backgroundLoaded) progress += 50;
        loadingProgress.textContent = `${progress}%`;

        if (progress === 100) {
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
                entryOverlay.style.visibility = 'visible';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // Check if background color is applied
    const checkBackground = () => {
        const computedStyle = window.getComputedStyle(document.body);
        if (computedStyle.backgroundColor === 'rgb(255, 255, 255)') {
            backgroundLoaded = true;
            updateLoadingProgress();
        } else {
            setTimeout(checkBackground, 100);
        }
    };
    checkBackground();

    // Set video quality to highest possible and check loading
    video.addEventListener('loadedmetadata', () => {
        if (video.videoHeight) {
            // Force highest quality
            video.style.height = video.videoHeight + 'px';
        }
    });

    video.addEventListener('canplaythrough', () => {
        videoLoaded = true;
        updateLoadingProgress();
    });

    // Handle start button click
    startButton.addEventListener('click', () => {
        // Remove the entry overlay
        entryOverlay.classList.remove('active');
        
        // Start playing video with audio
        video.muted = false;
        
        // Set volume to 50%
        video.volume = 0.5;
        
        // Play the video
        video.play().catch(error => {
            console.log("Video playback failed:", error);
        });

        // Remove the overlay completely after animation
        setTimeout(() => {
            entryOverlay.style.display = 'none';
        }, 500);
    });

    // When video ends
    video.addEventListener('ended', () => {
        // Freeze the last frame
        video.pause();
        
        // Add zoom effect to video
        videoContainer.classList.add('zoom');
        
        // Play audio immediately (it's already set to start at 19s)
        audio.volume = 0.5;
        // Double-check we're at the right timestamp
        audio.currentTime = 19;
        audio.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
        
        // Show text overlay
        textOverlay.classList.add('visible');
    });

    // Handle video quality
    const setHighestQuality = () => {
        if (video.readyState >= 1) {
            video.playbackQuality = 'high';
            video.playbackRate = 1;
        }
    };

    video.addEventListener('loadeddata', setHighestQuality);
    video.addEventListener('canplay', setHighestQuality);
}); 