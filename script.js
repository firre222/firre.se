document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bgVideo');
    const audio = document.getElementById('bgAudio');
    const textOverlay = document.querySelector('.text-overlay');
    const entryOverlay = document.querySelector('.entry-overlay');
    const startButton = document.getElementById('startButton');
    const videoContainer = document.querySelector('.video-container');

    // Log initial state
    console.log('Video container found:', videoContainer !== null);
    console.log('Video element found:', video !== null);

    // Prepare audio to start at 19 seconds
    audio.addEventListener('loadedmetadata', () => {
        audio.currentTime = 19;
        console.log('Audio metadata loaded');
    });

    // Set video quality to highest possible
    video.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        if (video.videoHeight) {
            // Force highest quality
            video.style.height = video.videoHeight + 'px';
        }
    });

    // Handle start button click
    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        // Remove the entry overlay
        entryOverlay.classList.remove('active');
        
        // Start playing video with audio
        video.muted = false;
        
        // Set volume to 50%
        video.volume = 0.5;
        
        // Ensure video is ready to play
        if (video.readyState >= 2) {
            video.play().catch(error => {
                console.error("Video playback failed:", error);
            });
        } else {
            video.addEventListener('canplay', () => {
                video.play().catch(error => {
                    console.error("Video playback failed:", error);
                });
            }, { once: true });
        }

        // Remove the overlay completely after animation
        setTimeout(() => {
            entryOverlay.style.display = 'none';
        }, 500);
    });

    // When video ends
    video.addEventListener('ended', () => {
        console.log('Video ended, applying zoom effect');
        
        // Freeze the last frame
        video.pause();
        
        // Force a browser reflow before adding the zoom class
        void videoContainer.offsetWidth;
        
        // Add zoom effect to video container
        videoContainer.classList.add('zoom');
        console.log('Zoom class added');
        
        // Play audio immediately (it's already set to start at 19s)
        audio.volume = 0.5;
        // Double-check we're at the right timestamp
        audio.currentTime = 19;
        audio.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
        
        // Show text overlay
        setTimeout(() => {
            textOverlay.classList.add('visible');
        }, 100);
    });

    // Monitor video state
    video.addEventListener('error', (e) => {
        console.error('Video error:', e);
    });

    video.addEventListener('stalled', () => {
        console.log('Video playback stalled');
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