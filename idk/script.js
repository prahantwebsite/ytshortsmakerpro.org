// DOM Elements
const videoUrlInput = document.getElementById('video-url');
const fetchVideoBtn = document.getElementById('fetch-video-btn');
const videoUpload = document.getElementById('video-upload');
const customMusicUpload = document.getElementById('custom-music');
const descriptionInput = document.getElementById('description');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const styleButtons = document.querySelectorAll('.style-btn');
const musicItems = document.querySelectorAll('.music-item');
const playPreviewButtons = document.querySelectorAll('.play-preview-btn');
const musicVolumeSlider = document.getElementById('music-volume');
const volumeValue = document.getElementById('volume-value');
const textOverlayInput = document.getElementById('text-overlay');
const textStyleSelect = document.getElementById('text-style');
const textPositionSelect = document.getElementById('text-position');
const textColorInput = document.getElementById('text-color');
const effectButtons = document.querySelectorAll('.effect-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const trimStartSlider = document.getElementById('trim-start');
const trimEndSlider = document.getElementById('trim-end');
const startValueDisplay = document.getElementById('start-value');
const endValueDisplay = document.getElementById('end-value');
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const saturationSlider = document.getElementById('saturation');
const generateBtn = document.getElementById('generate-btn');
const previewPlaceholder = document.getElementById('preview-placeholder');
const previewVideo = document.getElementById('preview-video');
const textOverlayPreview = document.getElementById('text-overlay-preview');
const filterOverlay = document.getElementById('filter-overlay');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const processingStatus = document.getElementById('processing-status');
const progressFill = document.querySelector('.progress-fill');

// Additional DOM Elements for premium features
const upgradeBtn = document.getElementById('upgrade-btn');
const couponCodeInput = document.getElementById('coupon-code');
const applyCouponBtn = document.getElementById('apply-coupon-btn');
const modalCouponInput = document.getElementById('modal-coupon-code');
const modalApplyCoupon = document.getElementById('modal-apply-coupon');
const premiumModal = document.getElementById('premium-modal');
const closeModal = document.querySelector('.close-modal');
const topicInput = document.getElementById('topic-input');
const searchTopicBtn = document.getElementById('search-topic-btn');
const searchResults = document.getElementById('search-results');
const searchTerm = document.getElementById('search-term');
const resultGrid = document.querySelector('.result-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const resultsShown = document.getElementById('results-shown');
const resultsTotal = document.getElementById('results-total');
const platformTabs = document.querySelectorAll('.platform-tab');
const connectYoutubeBtn = document.getElementById('connect-youtube-btn');
const batchProcessBtn = document.getElementById('batch-process-btn');
const couponSuccess = document.getElementById('coupon-success');
const copyLinkBtn = document.getElementById('copy-link-btn');
const referralLink = document.getElementById('referral-link');

// Donation functionality
const donationAmounts = document.querySelectorAll('.donation-amount');
const donateBtn = document.querySelector('.donate-btn');
let selectedAmount = '20';

// State
let selectedStyle = 'trending';
let selectedMusic = null;
let selectedEffect = 'none';
let selectedFilter = 'none';
let videoSource = null;
let videoTotalDuration = 0;
let isVideoLoaded = false;
let audioContext = null;
let currentAudio = null;

// State for premium features
let isPremium = false;
let currentPlatform = 'all';
let currentSearchResults = [];
let resultsPage = 1;
let hasMoreResults = false;

// Google login functionality
document.addEventListener('DOMContentLoaded', function() {
    // Google login button 
    const googleLoginBtn = document.getElementById('google-login-btn');
    const userInfo = document.querySelector('.user-info');
    const userDisplayName = document.getElementById('user-display-name');
    const userPlan = document.getElementById('user-plan');
    const userVideosCount = document.getElementById('user-videos-count');
    const userAvatarImg = document.getElementById('user-avatar-img');
    const logoutBtn = document.getElementById('logout-btn');
    const videosLimitDisplay = document.getElementById('videos-limit-display');
    
    // Check if user is logged in (from localStorage)
    const checkLoginStatus = () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const userData = JSON.parse(loggedInUser);
            showLoggedInUI(userData);
        }
    };
    
    // Show logged in UI
    const showLoggedInUI = (userData) => {
        if (googleLoginBtn) googleLoginBtn.classList.add('hidden');
        if (userInfo) userInfo.classList.remove('hidden');
        
        if (userDisplayName) userDisplayName.textContent = userData.name;
        if (userAvatarImg) {
            userAvatarImg.src = userData.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name);
        }
        
        // Update plan information
        if (userPlan) {
            if (userData.isPremium) {
                userPlan.textContent = 'Premium Plan (Unlimited videos)';
                userPlan.classList.add('premium-user');
            } else {
                userPlan.textContent = 'Free Plan (20 videos/day)';
                userPlan.classList.remove('premium-user');
            }
        }
        
        // Update videos count
        if (userVideosCount) {
            const videosCreated = userData.videosCreated || 0;
            const videosLimit = userData.isPremium ? '∞' : 20;
            userVideosCount.textContent = `${videosCreated}/${videosLimit} videos created today`;
        }
        
        // Update videos limit display in auto-upload section
        if (videosLimitDisplay) {
            const videosCreated = userData.videosCreated || 0;
            const videosLimit = userData.isPremium ? '∞' : 20;
            videosLimitDisplay.textContent = `${videosCreated}/${videosLimit}`;
        }
        
        // Enable/disable premium features
        if (userData.isPremium) {
            enablePremiumFeatures();
        }
    };
    
    // Simulate Google login
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            // In a real app, this would authenticate with Google
            // For this demo, we'll simulate a successful login
            simulateGoogleLogin();
        });
    }
    
    // Simulate Google login
    const simulateGoogleLogin = () => {
        // Show loading state
        if (googleLoginBtn) {
            googleLoginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            googleLoginBtn.disabled = true;
        }
        
        // Simulate API delay
        setTimeout(() => {
            // Create mock user data
            const mockUserData = {
                name: 'User ' + Math.floor(Math.random() * 1000),
                email: 'user' + Math.floor(Math.random() * 1000) + '@gmail.com',
                avatar: '',
                isPremium: false,
                videosCreated: Math.floor(Math.random() * 10)
            };
            
            // Save to localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(mockUserData));
            
            // Update UI
            showLoggedInUI(mockUserData);
            
            // Reset button
            if (googleLoginBtn) {
                googleLoginBtn.innerHTML = '<i class="fab fa-google"></i> Login with Google';
                googleLoginBtn.disabled = false;
                googleLoginBtn.classList.add('hidden');
            }
            
            // Show notification
            showNotification('Successfully logged in!', 'success');
        }, 1500);
    };
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear localStorage
            localStorage.removeItem('loggedInUser');
            
            // Reset UI
            if (googleLoginBtn) googleLoginBtn.classList.remove('hidden');
            if (userInfo) userInfo.classList.add('hidden');
            
            // Disable premium features if they were enabled
            disablePremiumFeatures();
            
            // Show notification
            showNotification('You have been logged out', 'info');
        });
    }
    
    // Disable premium features
    function disablePremiumFeatures() {
        const premiumFeatures = document.querySelectorAll('.premium-feature');
        premiumFeatures.forEach(feature => {
            feature.classList.add('premium-locked');
        });
        
        const premiumButtons = document.querySelectorAll('.premium-feature button');
        premiumButtons.forEach(button => {
            button.disabled = true;
        });
        
        const premiumInputs = document.querySelectorAll('.premium-feature input, .premium-feature select');
        premiumInputs.forEach(input => {
            input.disabled = true;
        });
    }
    
    // Check login status on page load
    checkLoginStatus();
});

// Update the premium modal to show new pricing
function updatePremiumModal() {
    const priceBox = document.querySelector('.premium-pricing .price-box');
    if (priceBox) {
        const pricingHtml = `
            <h3>Choose Your Plan</h3>
            <div class="pricing-options">
                <div class="price-option">
                    <h4>Monthly</h4>
                    <div class="price-tag">
                        <span class="price">₹25/month</span>
                    </div>
                    <button class="buy-btn" data-plan="monthly">Select Plan</button>
                </div>
                <div class="price-option best-value">
                    <span class="best-value-tag">Best Value</span>
                    <h4>Yearly</h4>
                    <div class="price-tag">
                        <span class="price">₹50/year</span>
                        <span class="discount-badge">SAVE 58%</span>
                    </div>
                    <button class="buy-btn" data-plan="yearly">Select Plan</button>
                </div>
                <div class="price-option">
                    <h4>Lifetime</h4>
                    <div class="price-tag">
                        <span class="price">Contact Developer</span>
                    </div>
                    <p class="lifetime-note">For lifetime access coupon code, contact the developer directly.</p>
                </div>
            </div>
        `;
        priceBox.innerHTML = pricingHtml;
        
        // Add event listeners to the new buttons
        const buyButtons = document.querySelectorAll('.buy-btn[data-plan]');
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const plan = this.getAttribute('data-plan');
                selectPremiumPlan(plan);
            });
        });
    }
}

// Update coupon code info
function updateCouponInfo() {
    const couponInfo = document.querySelector('.coupon-instructions');
    if (couponInfo) {
        couponInfo.innerHTML = 'Premium features ke liye coupon code zaruri hai! <br>Lifetime access ke liye developer se contact karein.';
    }
}

// Select premium plan and show payment options
function selectPremiumPlan(plan) {
    const planName = plan === 'monthly' ? 'Monthly (₹25/month)' : 'Yearly (₹50/year)';
    showNotification(`You selected ${planName} plan. Please enter coupon code to activate premium.`, 'info');
    
    // Focus on coupon input
    const couponInput = document.getElementById('modal-coupon-code');
    if (couponInput) {
        couponInput.focus();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing functionality
    initExistingFunctionality();
    
    // Update pricing and modals with new info
    updatePremiumModal();
    updateCouponInfo();
    
    // Setup the premium upgrade button
    const upgradeBtn = document.getElementById('upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            const premiumModal = document.getElementById('premium-modal');
            if (premiumModal) {
                premiumModal.classList.remove('hidden');
            }
        });
    }
    
    // Setup the generate button to check login status
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        const originalClickHandler = generateBtn.onclick;
        generateBtn.onclick = function(e) {
            // Check if user is logged in
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                e.preventDefault();
                showNotification('Please login with Google to create videos', 'warning');
                
                // Scroll to login section
                const loginSection = document.querySelector('.login-section');
                if (loginSection) {
                    loginSection.scrollIntoView({ behavior: 'smooth' });
                }
                return false;
            }
            
            // Check if user has reached daily limit
            if (loggedInUser) {
                const userData = JSON.parse(loggedInUser);
                if (!userData.isPremium && userData.videosCreated >= 20) {
                    e.preventDefault();
                    showNotification('You have reached your daily limit of 20 videos. Upgrade to premium for unlimited videos!', 'error');
                    
                    // Show premium modal
                    const premiumModal = document.getElementById('premium-modal');
                    if (premiumModal) {
                        premiumModal.classList.remove('hidden');
                    }
                    return false;
                }
                
                // Increment video count
                userData.videosCreated = (userData.videosCreated || 0) + 1;
                localStorage.setItem('loggedInUser', JSON.stringify(userData));
                
                // Update UI
                const userVideosCount = document.getElementById('user-videos-count');
                const videosLimitDisplay = document.getElementById('videos-limit-display');
                const videosLimit = userData.isPremium ? '∞' : 20;
                
                if (userVideosCount) {
                    userVideosCount.textContent = `${userData.videosCreated}/${videosLimit} videos created today`;
                }
                
                if (videosLimitDisplay) {
                    videosLimitDisplay.textContent = `${userData.videosCreated}/${videosLimit}`;
                }
            }
            
            // Call the original handler
            if (typeof originalClickHandler === 'function') {
                return originalClickHandler.call(this, e);
            }
        };
    }
});

// Initialize existing functionality (preserves old behavior)
function initExistingFunctionality() {
    // Platform tabs
    const platformTabs = document.querySelectorAll('.platform-tab');
    platformTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            platformTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            // Filter results
            filterResultsByPlatform();
        });
    });

    // Style options
    const styleOptions = document.querySelectorAll('.style-btn');
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            styleOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Effects options
    const effectOptions = document.querySelectorAll('.effect-btn');
    effectOptions.forEach(effect => {
        effect.addEventListener('click', function() {
            effectOptions.forEach(e => e.classList.remove('active'));
            this.classList.add('active');
            applyEffectToPreview(this.getAttribute('data-effect'));
        });
    });

    // Filter options
    const filterOptions = document.querySelectorAll('.filter-btn');
    filterOptions.forEach(filter => {
        filter.addEventListener('click', function() {
            filterOptions.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            applyFilterToPreview(this.getAttribute('data-filter'));
        });
    });

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Hide all tabs
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName + '-tab').classList.remove('hidden');
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Premium modal
    const upgradeBtn = document.getElementById('upgrade-btn');
    const premiumModal = document.getElementById('premium-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (upgradeBtn && premiumModal) {
        upgradeBtn.addEventListener('click', function() {
            premiumModal.classList.remove('hidden');
        });
    }
    
    if (closeModal && premiumModal) {
        closeModal.addEventListener('click', function() {
            premiumModal.classList.add('hidden');
        });
    }

    // Donation amounts
    const donationAmounts = document.querySelectorAll('.donation-amount');
    const donateBtn = document.querySelector('.donate-btn');
    let selectedAmount = 20;
    
    donationAmounts.forEach(option => {
        option.addEventListener('click', function() {
            donationAmounts.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedAmount = this.getAttribute('data-amount');
            if (donateBtn) {
                donateBtn.textContent = `Donate ₹${selectedAmount}`;
            }
        });
    });

    // Coupon code application
    const applyBtn = document.getElementById('apply-coupon-btn');
    const couponInput = document.getElementById('coupon-code');
    
    if (applyBtn && couponInput) {
        applyBtn.addEventListener('click', function() {
            applyCouponCode(couponInput.value);
        });
    }

    // Modal coupon code application
    const modalApplyBtn = document.getElementById('modal-apply-coupon');
    const modalCouponInput = document.getElementById('modal-coupon-code');
    
    if (modalApplyBtn && modalCouponInput) {
        modalApplyBtn.addEventListener('click', function() {
            applyCouponCode(modalCouponInput.value);
        });
    }

    // Add event listeners for all tool features
    setupTextOverlay();
    setupMusicControls();
    setupTrimControls();
    setupAdjustmentControls();
    setupFetchVideo();
    setupVideoUpload();
    setupSearchTopicButton();
    setupGenerateButton();
    setupDownloadButton();
    setupShareButton();
}

// Load video preview
function loadVideoPreview(src) {
    // Hide placeholder
    previewPlaceholder.style.display = 'none';
    
    // Show video
    previewVideo.style.display = 'block';
    previewVideo.src = src;
    
    // Set video events
    previewVideo.onloadedmetadata = () => {
        videoTotalDuration = previewVideo.duration;
        isVideoLoaded = true;
        
        // Update trim end value display
        const minutes = Math.floor(videoTotalDuration / 60);
        const seconds = Math.floor(videoTotalDuration % 60);
        endValueDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        console.log(`Video loaded, duration: ${videoTotalDuration}s`);
    };
    
    previewVideo.onerror = () => {
        showNotification('Error loading video', 'error');
        previewPlaceholder.style.display = 'flex';
        previewVideo.style.display = 'none';
        isVideoLoaded = false;
    };
}

// Fetch video function
function fetchVideo(url) {
    // In a real application, this would make an API call to a backend service
    // that would download the video from the source. Here we simulate the process.
    
    showLoadingOverlay('Fetching video from URL...');
    
    // Simulate API call with progress updates
    setTimeout(() => {
        updateProgress(20);
        updateProcessingStatus('Validating URL...');
        
        setTimeout(() => {
            updateProgress(40);
            updateProcessingStatus('Extracting video data...');
            
            setTimeout(() => {
                updateProgress(70);
                updateProcessingStatus('Downloading video...');
                
                setTimeout(() => {
                    updateProgress(100);
                    updateProcessingStatus('Video ready!');
                    
                    // Simulate successful download - use a placeholder video
                    const placeholderVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
                    videoSource = placeholderVideo;
                    loadVideoPreview(videoSource);
                    
                    setTimeout(() => {
                        hideLoadingOverlay();
                    }, 800);
                }, 2000);
            }, 1500);
        }, 1000);
    }, 1000);
}

// Update text overlay
function updateTextOverlay() {
    const text = textOverlayInput.value.trim();
    const style = textStyleSelect.value;
    const position = textPositionSelect.value;
    const color = textColorInput.value;
    
    if (text === '') {
        textOverlayPreview.style.display = 'none';
        return;
    }
    
    textOverlayPreview.style.display = 'block';
    textOverlayPreview.textContent = text;
    textOverlayPreview.style.color = color;
    
    // Position
    switch (position) {
        case 'top':
            textOverlayPreview.style.top = '10%';
            textOverlayPreview.style.bottom = 'auto';
            break;
        case 'middle':
            textOverlayPreview.style.top = '50%';
            textOverlayPreview.style.transform = 'translateY(-50%)';
            textOverlayPreview.style.bottom = 'auto';
            break;
        case 'bottom':
            textOverlayPreview.style.top = 'auto';
            textOverlayPreview.style.bottom = '10%';
            break;
    }
    
    // Style
    switch (style) {
        case 'neon':
            textOverlayPreview.style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`;
            textOverlayPreview.style.fontWeight = 'bold';
            break;
        case 'vintage':
            textOverlayPreview.style.fontFamily = 'serif';
            textOverlayPreview.style.textShadow = '2px 2px 0px rgba(0,0,0,0.3)';
            textOverlayPreview.style.letterSpacing = '2px';
            break;
        case 'bold':
            textOverlayPreview.style.fontWeight = '900';
            textOverlayPreview.style.fontSize = '1.5rem';
            textOverlayPreview.style.textTransform = 'uppercase';
            textOverlayPreview.style.textShadow = '2px 2px 0px rgba(0,0,0,0.8)';
            break;
        case 'subtitle':
            textOverlayPreview.style.background = 'rgba(0,0,0,0.5)';
            textOverlayPreview.style.padding = '5px 10px';
            textOverlayPreview.style.borderRadius = '4px';
            textOverlayPreview.style.textShadow = 'none';
            break;
        default: // standard
            textOverlayPreview.style.textShadow = '1px 1px 3px rgba(0,0,0,0.7)';
            textOverlayPreview.style.fontWeight = 'bold';
            break;
    }
}

// Apply effect to preview
function applyEffectToPreview(effect) {
    // Remove all previous effect classes
    previewVideo.classList.remove('effect-glitch', 'effect-zoom', 'effect-shake', 'effect-flash');
    
    // Add the selected effect class
    if (effect !== 'none') {
        previewVideo.classList.add(`effect-${effect}`);
    }
}

// Apply filter to preview
function applyFilterToPreview(filter) {
    // Apply filter
    switch (filter) {
        case 'vintage':
            filterOverlay.className = 'filter-overlay filter-vintage';
            break;
        case 'noir':
            filterOverlay.className = 'filter-overlay filter-noir';
            break;
        case 'vhs':
            filterOverlay.className = 'filter-overlay filter-vhs';
            break;
        case 'vibrant':
            filterOverlay.className = 'filter-overlay filter-vibrant';
            break;
        case 'dreamy':
            filterOverlay.className = 'filter-overlay filter-dreamy';
            break;
        default:
            filterOverlay.className = 'filter-overlay';
            break;
    }
}

// Update video adjustments
function updateVideoAdjustments() {
    const brightness = brightnessSlider.value;
    const contrast = contrastSlider.value;
    const saturation = saturationSlider.value;
    
    previewVideo.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
}

// Update trim values
function updateTrimValues() {
    if (!isVideoLoaded) return;
    
    const startPercent = parseInt(trimStartSlider.value);
    const endPercent = parseInt(trimEndSlider.value);
    
    // Make sure end is always greater than start
    if (endPercent <= startPercent) {
        trimEndSlider.value = startPercent + 1;
        return updateTrimValues();
    }
    
    const startTime = (startPercent / 100) * videoTotalDuration;
    const endTime = (endPercent / 100) * videoTotalDuration;
    
    // Update displays
    const startMinutes = Math.floor(startTime / 60);
    const startSeconds = Math.floor(startTime % 60);
    const endMinutes = Math.floor(endTime / 60);
    const endSeconds = Math.floor(endTime % 60);
    
    startValueDisplay.textContent = `${startMinutes}:${startSeconds.toString().padStart(2, '0')}`;
    endValueDisplay.textContent = `${endMinutes}:${endSeconds.toString().padStart(2, '0')}`;
    
    // In a real application, we would set the video's currentTime to preview
    // the trimmed section. Here we just log the values.
    console.log(`Trim: ${startTime}s to ${endTime}s`);
}

// Preview music
function previewMusic(musicId) {
    if (!audioContext) {
        // Initialize audio context on first user interaction
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    let audioSrc;
    
    // In a real app, these would be actual audio files
    switch (musicId) {
        case 'trending1':
            audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            break;
        case 'trending2':
            audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
            break;
        case 'lofi':
            audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3';
            break;
        case 'upbeat':
            audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3';
            break;
        case 'dramatic':
            audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3';
            break;
        default:
            return;
    }
    
    currentAudio = new Audio(audioSrc);
    currentAudio.volume = musicVolumeSlider.value / 100;
    currentAudio.play();
}

// Generate Short function
function generateShort() {
    // Validate video source
    if (!videoSource) {
        showNotification('Please provide a video URL or upload a video', 'error');
        return;
    }

    if (descriptionInput.value.trim() === '') {
        showNotification('Please enter a description for your Short', 'error');
        return;
    }
    
    // Start the generation process
    showLoadingOverlay('Starting to process your Short...');
    
    // Simulate processing with detailed steps
    setTimeout(() => {
        updateProgress(15);
        updateProcessingStatus('Analyzing video content...');
        
        setTimeout(() => {
            updateProgress(30);
            updateProcessingStatus('Applying AI enhancements...');
            
            setTimeout(() => {
                updateProgress(45);
                updateProcessingStatus('Adding text overlays...');
                
                setTimeout(() => {
                    updateProgress(60);
                    updateProcessingStatus(`Applying ${selectedStyle} style effects...`);
                    
                    setTimeout(() => {
                        updateProgress(75);
                        updateProcessingStatus(`Adding ${selectedMusic || 'background'} music...`);
                        
                        setTimeout(() => {
                            updateProgress(90);
                            updateProcessingStatus('Optimizing for YouTube format...');
                            
                            setTimeout(() => {
                                updateProgress(100);
                                updateProcessingStatus('Your Short is ready!');
                                
                                setTimeout(() => {
                                    hideLoadingOverlay();
                                    completeGeneration();
                                }, 800);
                            }, 1500);
                        }, 1200);
                    }, 1000);
                }, 1500);
            }, 1500);
        }, 1800);
    }, 1000);
}

// Complete generation function
function completeGeneration() {
    // Show success notification
    showNotification('Your Short has been generated successfully!', 'success');
    
    // Enable buttons
    downloadBtn.disabled = false;
    shareBtn.disabled = false;
    
    // Add button events
    downloadBtn.addEventListener('click', downloadShort);
    shareBtn.addEventListener('click', shareToYouTube);
}

// Download function (simulated)
function downloadShort() {
    showNotification('Starting download...', 'success');
    
    // Simulate download preparation
    showLoadingOverlay('Preparing your Short for download...');
    
    setTimeout(() => {
        updateProgress(50);
        updateProcessingStatus('Finalizing video file...');
        
        setTimeout(() => {
            updateProgress(100);
            hideLoadingOverlay();
            
            // Create download link
            const link = document.createElement('a');
            link.href = videoSource;
            link.download = `ShortsMaker_${new Date().getTime()}.mp4`;
            link.click();
            
            showNotification('Download complete!', 'success');
        }, 2000);
    }, 1500);
}

// Share function (simulated)
function shareToYouTube() {
    showNotification('Preparing to share to YouTube...', 'info');
    
    showLoadingOverlay('Preparing YouTube upload...');
    
    setTimeout(() => {
        updateProgress(40);
        updateProcessingStatus('Authenticating with YouTube...');
        
        setTimeout(() => {
            updateProgress(70);
            updateProcessingStatus('Preparing upload parameters...');
            
            setTimeout(() => {
                updateProgress(100);
                hideLoadingOverlay();
                
                // Open YouTube upload in a new tab
                window.open('https://studio.youtube.com', '_blank');
                showNotification('Ready to upload to YouTube!', 'success');
            }, 1500);
        }, 1200);
    }, 1000);
}

// Show loading overlay
function showLoadingOverlay(message) {
    loadingOverlay.classList.remove('hidden');
    updateProcessingStatus(message);
    updateProgress(0);
}

// Hide loading overlay
function hideLoadingOverlay() {
    loadingOverlay.classList.add('hidden');
}

// Update processing status
function updateProcessingStatus(message) {
    processingStatus.textContent = message;
}

// Update progress bar
function updateProgress(percent) {
    progressFill.style.width = `${percent}%`;
}

// Notification function
function showNotification(message, type) {
    // Check if a notification container exists
    let notifContainer = document.querySelector('.notification-container');
    
    // Create container if it doesn't exist
    if (!notifContainer) {
        notifContainer = document.createElement('div');
        notifContainer.className = 'notification-container';
        notifContainer.style.position = 'fixed';
        notifContainer.style.bottom = '20px';
        notifContainer.style.right = '20px';
        notifContainer.style.zIndex = '1000';
        document.body.appendChild(notifContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.backgroundColor = type === 'error' ? '#ff3860' : 
                                         type === 'success' ? '#23d160' : 
                                         type === 'info' ? '#3298dc' : '#f5f5f5';
    notification.style.color = 'white';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '4px';
    notification.style.marginTop = '10px';
    notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.cursor = 'pointer';
    
    // Add notification to container
    notifContainer.appendChild(notification);
    
    // Add click listener to dismiss
    notification.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Easter egg - Prashant Pandey signature
console.log(`%c
███████╗██╗  ██╗ ██████╗ ██████╗ ████████╗███████╗███╗   ███╗ █████╗ ██╗  ██╗███████╗██████╗     ██████╗ ██████╗  ██████╗ 
██╔════╝██║  ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║ ██╔╝██╔════╝██╔══██╗    ██╔══██╗██╔══██╗██╔═══██╗
███████╗███████║██║   ██║██████╔╝   ██║   ███████╗██╔████╔██║███████║█████╔╝ █████╗  ██████╔╝    ██████╔╝██████╔╝██║   ██║
╚════██║██╔══██║██║   ██║██╔══██╗   ██║   ╚════██║██║╚██╔╝██║██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗    ██╔═══╝ ██╔══██╗██║   ██║
███████║██║  ██║╚██████╔╝██║  ██║   ██║   ███████║██║ ╚═╝ ██║██║  ██║██║  ██╗███████╗██║  ██║    ██║     ██║  ██║╚██████╔╝
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
                                                                                                                            
Created by Prashant Pandey - The Ultimate Shorts Creator
`, 'color: #ff0000; font-weight: bold;');

// Apply coupon code
function applyCouponCode(code) {
    // Validate coupon code
    if (code.trim() === '') {
        showNotification('Please enter a coupon code', 'error');
        return;
    }
    
    // Check if code is valid (in a real app, this would be validated on the server)
    if (code.toUpperCase() === 'PP6203' || code.toUpperCase() === 'ORWAISE') {
        // Enable premium features
        enablePremiumFeatures();
        
        // Show success message
        couponSuccess.classList.remove('hidden');
        
        // Update success message text based on coupon code
        const couponSuccessMessage = couponSuccess.querySelector('p');
        if (couponSuccessMessage) {
            couponSuccessMessage.textContent = `Coupon code ${code.toUpperCase()} applied successfully!`;
        }
        
        setTimeout(() => {
            couponSuccess.classList.add('hidden');
        }, 5000);
        
        // Close modal if open
        premiumModal.classList.add('hidden');
        
        // Clear coupon input
        couponCodeInput.value = '';
        modalCouponInput.value = '';
    } else {
        showNotification('Invalid coupon code. Try PP6203 or ORWAISE', 'error');
    }
}

// Enable premium features
function enablePremiumFeatures() {
    isPremium = true;
    
    // Enable Pinterest tab
    platformTabs.forEach(tab => {
        if (tab.dataset.platform === 'pinterest') {
            tab.classList.remove('premium-feature');
        }
    });
    
    // Enable auto upload features
    connectYoutubeBtn.disabled = false;
    connectYoutubeBtn.style.backgroundColor = '#4285f4'; // Primary accent color
    connectYoutubeBtn.style.color = 'white';
    connectYoutubeBtn.style.cursor = 'pointer';
    
    // Enable batch processing
    batchProcessBtn.disabled = false;
    batchProcessBtn.style.backgroundColor = '#4285f4'; // Primary accent color
    batchProcessBtn.style.color = 'white';
    batchProcessBtn.style.cursor = 'pointer';
    
    // Update UI to reflect premium status
    document.querySelectorAll('.premium-feature').forEach(el => {
        el.style.borderColor = '#00c853'; // Success color
    });
    
    // Show notification
    showNotification('Premium features activated!', 'success');
}

// Show premium prompt
function showPremiumPrompt() {
    premiumModal.classList.remove('hidden');
    showNotification('This feature requires premium access', 'info');
}

// Search content for a topic
function searchContentForTopic(topic) {
    // Show loading state
    showLoadingOverlay(`Searching for "${topic}" content...`);
    
    // Simulate API search request
    setTimeout(() => {
        updateProgress(30);
        updateProcessingStatus('Analyzing search results...');
        
        setTimeout(() => {
            updateProgress(60);
            updateProcessingStatus('Finding trending content...');
            
            setTimeout(() => {
                updateProgress(100);
                hideLoadingOverlay();
                
                // Generate fake search results
                generateSearchResults(topic);
                
                // Display results
                displaySearchResults();
            }, 1000);
        }, 800);
    }, 1000);
}

// Generate fake search results based on topic
function generateSearchResults(topic) {
    // Reset results
    currentSearchResults = [];
    resultsPage = 1;
    
    // Generate random number of results
    const totalResults = Math.floor(Math.random() * 30) + 10;
    
    // Generate fake results
    for (let i = 0; i < totalResults; i++) {
        const platform = getRandomPlatform();
        const result = {
            id: i + 1,
            title: `${topic} ${getRandomTitle(platform)}`,
            thumbnail: `https://picsum.photos/seed/${topic}${i}/300/200`,
            platform: platform,
            duration: Math.floor(Math.random() * 60) + 10 // 10-70 seconds
        };
        
        currentSearchResults.push(result);
    }
    
    // Update total count
    resultsTotal.textContent = currentSearchResults.length;
}

// Display search results
function displaySearchResults() {
    // Show results section
    searchResults.classList.remove('hidden');
    
    // Set search term
    searchTerm.textContent = topicInput.value.trim();
    
    // Clear results grid
    resultGrid.innerHTML = '';
    
    // Filter results by platform
    const filteredResults = filterByPlatform(currentSearchResults, currentPlatform);
    
    // Show initial results (first 8)
    const initialResults = filteredResults.slice(0, 8);
    
    if (initialResults.length === 0) {
        resultGrid.innerHTML = '<div class="result-placeholder">No results found for this platform. Try another platform or search term.</div>';
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    // Display results
    initialResults.forEach(result => {
        resultGrid.appendChild(createResultItem(result));
    });
    
    // Update shown count
    resultsShown.textContent = Math.min(8, filteredResults.length);
    
    // Show/hide load more button
    hasMoreResults = filteredResults.length > 8;
    loadMoreBtn.style.display = hasMoreResults ? 'block' : 'none';
}

// Create a result item element
function createResultItem(result) {
    const item = document.createElement('div');
    item.className = 'result-item';
    item.dataset.id = result.id;
    
    const platformIcon = getPlatformIcon(result.platform);
    
    item.innerHTML = `
        <img src="${result.thumbnail}" alt="${result.title}" class="result-thumbnail">
        <div class="result-info">
            <div class="result-title">${result.title}</div>
            <div class="result-source">
                <i class="${platformIcon}"></i> ${result.platform}
            </div>
        </div>
    `;
    
    // Add click handler
    item.addEventListener('click', () => {
        selectResult(result);
    });
    
    return item;
}

// Select a result
function selectResult(result) {
    // Check if Pinterest and not premium
    if (result.platform === 'Pinterest' && !isPremium) {
        showPremiumPrompt();
        return;
    }
    
    // In a real app, this would fetch the actual video
    showNotification(`Selected "${result.title}" from ${result.platform}`, 'info');
    
    // Simulate fetching video
    videoUrlInput.value = `https://${result.platform.toLowerCase()}.com/watch?v=${result.id}`;
    fetchVideoBtn.click();
    
    // Auto-fill description
    descriptionInput.value = `Check out this awesome ${result.title} #trending #shorts`;
}

// Load more results
function loadMoreResults() {
    // Get filtered results
    const filteredResults = filterByPlatform(currentSearchResults, currentPlatform);
    
    // Calculate range for next results
    const start = parseInt(resultsShown.textContent);
    const end = start + 8;
    
    // Get next batch of results
    const nextResults = filteredResults.slice(start, end);
    
    // Display results
    nextResults.forEach(result => {
        resultGrid.appendChild(createResultItem(result));
    });
    
    // Update shown count
    const newShownCount = Math.min(end, filteredResults.length);
    resultsShown.textContent = newShownCount;
    
    // Hide load more button if no more results
    if (newShownCount >= filteredResults.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Filter results by platform
function filterResultsByPlatform() {
    // Get filtered results
    const filteredResults = filterByPlatform(currentSearchResults, currentPlatform);
    
    // Clear results grid
    resultGrid.innerHTML = '';
    
    if (filteredResults.length === 0) {
        resultGrid.innerHTML = '<div class="result-placeholder">No results found for this platform. Try another platform or search term.</div>';
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    // Show initial results (first 8)
    const initialResults = filteredResults.slice(0, 8);
    initialResults.forEach(result => {
        resultGrid.appendChild(createResultItem(result));
    });
    
    // Update counts
    resultsShown.textContent = Math.min(8, filteredResults.length);
    resultsTotal.textContent = filteredResults.length;
    
    // Show/hide load more button
    hasMoreResults = filteredResults.length > 8;
    loadMoreBtn.style.display = hasMoreResults ? 'block' : 'none';
}

// Filter by platform helper
function filterByPlatform(results, platform) {
    if (platform === 'all') {
        return results;
    }
    
    return results.filter(result => result.platform.toLowerCase() === platform.toLowerCase());
}

// Utility functions for generating fake results
function getRandomPlatform() {
    const platforms = ['YouTube', 'TikTok', 'Instagram', 'Pinterest'];
    return platforms[Math.floor(Math.random() * platforms.length)];
}

function getPlatformIcon(platform) {
    switch (platform.toLowerCase()) {
        case 'youtube':
            return 'fab fa-youtube';
        case 'tiktok':
            return 'fab fa-tiktok';
        case 'instagram':
            return 'fab fa-instagram';
        case 'pinterest':
            return 'fab fa-pinterest';
        default:
            return 'fas fa-film';
    }
}

function getRandomTitle(platform) {
    const titles = [
        'Tutorial', 'Challenge', 'Reaction', 'Trend', 'Tips', 'Hack', 
        'Review', 'Compilation', 'Funny Moments', 'Best of', 'HOW TO',
        'TOP 10', 'DIY', 'ASMR', 'Prank', 'Transformation'
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// Connect YouTube account
connectYoutubeBtn.addEventListener('click', () => {
    if (!isPremium) {
        showPremiumPrompt();
        return;
    }
    
    showNotification('Connecting to YouTube...', 'info');
    
    // In a real app, this would redirect to OAuth flow
    setTimeout(() => {
        showNotification('YouTube account connected!', 'success');
        
        // Enable YouTube account selector
        document.getElementById('youtube-account').disabled = false;
        document.getElementById('youtube-account').innerHTML = `
            <option value="user_channel">Your YouTube Channel</option>
        `;
        
        // Enable upload schedule selector
        document.getElementById('upload-schedule').disabled = false;
    }, 2000);
});

// Batch processing
batchProcessBtn.addEventListener('click', () => {
    if (!isPremium) {
        showPremiumPrompt();
        return;
    }
    
    if (!videoSource) {
        showNotification('Please select a video first', 'error');
        return;
    }
    
    showNotification('Preparing batch processing...', 'info');
    
    // Simulate batch processing
    showLoadingOverlay('Starting batch processing...');
    
    let progress = 0;
    const batchSize = Math.floor(Math.random() * 10) + 5; // 5-15 videos
    
    const batchInterval = setInterval(() => {
        progress += Math.floor(100 / batchSize);
        progress = Math.min(progress, 100);
        
        updateProgress(progress);
        updateProcessingStatus(`Processing video ${Math.ceil(progress / (100 / batchSize))} of ${batchSize}...`);
        
        if (progress >= 100) {
            clearInterval(batchInterval);
            
            setTimeout(() => {
                hideLoadingOverlay();
                showNotification(`Successfully processed ${batchSize} videos!`, 'success');
            }, 1000);
        }
    }, 1500);
});

// Add impression tracking for ads
function trackAdImpressions() {
    const adContainers = document.querySelectorAll('.ad-container');
    if (adContainers.length > 0) {
        adContainers.forEach((container, index) => {
            // In a real app, this would send impression data to your ad network
            console.log(`Ad impression recorded for ad slot #${index + 1}`);
        });
    }
}

// Simulate dynamic pricing based on user behavior
function updatePricingDisplay() {
    // Check if user came from a specific referral
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get('ref');
    
    if (referral) {
        // Store referral in localStorage
        localStorage.setItem('referral_source', referral);
        
        // If from a specific campaign, show even better discount
        if (referral.toUpperCase() === 'SPECIAL') {
            const priceElements = document.querySelectorAll('.original-price');
            priceElements.forEach(el => {
                el.textContent = '₹150/year';
            });
            
            const discountBadges = document.querySelectorAll('.discount-badge');
            discountBadges.forEach(el => {
                el.textContent = '-67%';
            });
            
            // Update notification
            setTimeout(() => {
                showNotification('Special 67% discount applied!', 'success');
            }, 3000);
        }
    }
}

// Add this function for premium payment process
function processPremiumPayment() {
    // Get coupon code if entered
    const modalCoupon = document.getElementById('modal-coupon-code');
    const couponCode = modalCoupon ? modalCoupon.value : '';
    
    if (couponCode.trim() === '') {
        showNotification("Kripya coupon code enter karein", "warning");
        return;
    }
    
    // Validate coupon code
    if (couponCode.toUpperCase() === 'PP6203' || couponCode.toUpperCase() === 'ORWAISE') {
        // Show processing notification
        showNotification("Payment process ho raha hai...", "info");
        
        // Simulate payment processing
        setTimeout(() => {
            // Enable premium features
            enablePremiumFeatures();
            
            // Show success message
            showNotification("Aapka payment successful raha! Premium features active kar diye gaye hain.", "success");
            
            // Close modal
            const premiumModal = document.querySelector('.modal');
            if (premiumModal) {
                premiumModal.classList.add('hidden');
            }
        }, 1500);
    } else {
        showNotification("Invalid coupon code. Sirf PP6203 ya ORWAISE valid hain", "error");
    }
}

// Update click event for buy button to use the process payment function
document.addEventListener('DOMContentLoaded', function() {
    // Buy button event listener
    const buyBtn = document.querySelector('.buy-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            processPremiumPayment();
        });
    }
    
    // Apply coupon button in modal event listener
    const modalApplyBtn = document.getElementById('modal-apply-coupon');
    if (modalApplyBtn) {
        modalApplyBtn.addEventListener('click', function() {
            processPremiumPayment();
        });
    }
}); 