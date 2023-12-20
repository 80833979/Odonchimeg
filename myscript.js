let currentImageIndex = 1;
let lastClickTime = 0;

function changeImage(direction) {
    const now = new Date().getTime();
    if (now - lastClickTime < 500) {
        return;
    }

    const currentImage = document.getElementById(`image${currentImageIndex}`);
    currentImage.classList.remove('active');

    currentImageIndex += direction;

    if (currentImageIndex === 1) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'block';
    }

    if (currentImageIndex === 5) {
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        document.getElementById('nextBtn').style.display = 'block';
    }

    const nextImage = document.getElementById(`image${currentImageIndex}`);
    nextImage.classList.add('active');

    lastClickTime = now;
}

document.getElementById('prevBtn').style.display = 'none';
document.getElementById('nextBtn').style.display = 'block';

document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

document.addEventListener('dblclick', function (event) {
    event.preventDefault();
});

function redirectToLogin() {
    alert('Нэвтэрч орно уу?');
    window.location.href = 'login.html';
}

const audio = new Audio('img/BalloonPlanet - I Do.mp3');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeSliderHandle = document.getElementById('volumeSliderHandle');
const volumeBtn = document.getElementById('volumeBtn');

function togglePlayPause() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = 'https://cdn-icons-png.flaticon.com/128/4340/4340106.png';
    } else {
        audio.pause();
        playPauseIcon.src = 'https://cdn-icons-png.flaticon.com/128/4340/4340118.png';
    }
}

function adjustVolume(event) {
    const sliderWidth = volumeSlider.clientWidth;
    const clickX = event.clientX - volumeSlider.getBoundingClientRect().left;
    const volumeLevel = clickX / sliderWidth;
    audio.volume = volumeLevel;
    volumeSliderHandle.style.left = `${volumeLevel * 100}%`;
}

const volumeSliderContainer = document.getElementById('volumeSliderContainer');
volumeSliderContainer.style.display = 'none';

function toggleVolumeSlider() {
    const volumeSliderContainer = document.getElementById('volumeSliderContainer');
    volumeSliderContainer.style.display = volumeSliderContainer.style.display === 'none' ? 'flex' : 'none';
}

function adjustVolume(event) {
    const sliderHeight = volumeSlider.clientHeight;
    const clickY = event.clientY - volumeSlider.getBoundingClientRect().top;
    const volumeLevel = 1 - clickY / sliderHeight;

    if (volumeLevel < 0) {
        audio.volume = 0;
    } else if (volumeLevel > 1) {
        audio.volume = 1;
    } else {
        audio.volume = volumeLevel;
    }

    volumeSliderHandle.style.bottom = `${volumeLevel * 100}%`;
}

let isDragging = false;

volumeSliderHandle.addEventListener('mousedown', startDrag);
volumeSliderHandle.addEventListener('touchstart', startDrag);

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
}

function handleDrag(e) {
    if (isDragging) {
        const sliderRect = volumeSlider.getBoundingClientRect();
        const offsetY = sliderRect.bottom - e.clientY;
        const volumeLevel = Math.max(0, Math.min(1, offsetY / sliderRect.height));
        updateVolume(volumeLevel);
    }
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
}

function updateVolume(volumeLevel) {
    volumeSliderHandle.style.bottom = `${volumeLevel * 100}%`;
}

/*Login page*/

document.getElementById('login-section').style.display = 'block';

function toggleForm(formType) {
  if (formType === 'login') {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('signup-section').style.display = 'none';
  } else {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
  }
}