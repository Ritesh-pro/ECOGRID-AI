// Department Dashboard Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Smooth nav
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    initPostInfo();
    initFaultDetection();
    initWeatherBroadcast();
    initNewsManagement();
});

// ---------------- Post Info Management ----------------
function initPostInfo() {
    const postForm = document.getElementById('post-form');
    const postFeed = document.getElementById('post-feed');
    const posts = [];

    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('alert-title').value.trim();
        const message = document.getElementById('alert-message').value.trim();
        const priority = document.getElementById('alert-priority').value;
        
        if (!title || !message || !priority) {
            showToast('Please fill all fields');
            return;
        }

        const post = {
            id: Date.now(),
            title,
            message,
            priority,
            timestamp: new Date().toLocaleString(),
            status: 'active'
        };

        posts.unshift(post); // Add to beginning
        renderPosts();
        
        // Clear form
        postForm.reset();
        showToast('Alert posted successfully!');
    });

    function renderPosts() {
        postFeed.innerHTML = '';
        
        if (posts.length === 0) {
            postFeed.innerHTML = '<div class="result-placeholder">No alerts posted yet.</div>';
            return;
        }

        posts.forEach(post => {
            const postEl = document.createElement('div');
            postEl.className = `post-item ${post.priority}`;
            postEl.innerHTML = `
                <div class="post-content">
                    <div class="post-header">
                        <h4>${post.title}</h4>
                        <span class="fault-badge ${post.priority}">${post.priority.toUpperCase()}</span>
                    </div>
                    <p>${post.message}</p>
                    <div class="post-meta">
                        <span>Posted: ${post.timestamp}</span>
                        <button class="chip small" onclick="deletePost(${post.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
            postFeed.appendChild(postEl);
        });
    }

    // Make deletePost globally available
    window.deletePost = function(id) {
        const index = posts.findIndex(p => p.id === id);
        if (index > -1) {
            posts.splice(index, 1);
            renderPosts();
            showToast('Post deleted');
        }
    };

    renderPosts();
}

// ---------------- Fault Detection ----------------
function initFaultDetection() {
    const faultForm = document.getElementById('fault-form');
    const faultResults = document.getElementById('fault-results');

    faultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const location = document.getElementById('fault-location').value.trim();
        if (!location) {
            showToast('Please enter a location');
            return;
        }

        // Simulate analysis
        faultResults.innerHTML = '<div class="result-placeholder">Analyzing grid status...</div>';
        
        setTimeout(() => {
            const faults = generateMockFaults(location);
            renderFaultResults(faults);
        }, 2000);
    });

    function generateMockFaults(location) {
        const faultTypes = [
            { type: 'voltage', severity: 'low', message: 'Voltage below normal range' },
            { type: 'current', severity: 'high', message: 'Current spike detected' },
            { type: 'frequency', severity: 'normal', message: 'Frequency within acceptable range' },
            { type: 'temperature', severity: 'high', message: 'Transformer temperature elevated' },
            { type: 'connection', severity: 'normal', message: 'All connections stable' }
        ];

        return faultTypes.map(fault => ({
            ...fault,
            location,
            timestamp: new Date().toLocaleString(),
            status: fault.severity === 'normal' ? 'ok' : 'warning'
        }));
    }

    function renderFaultResults(faults) {
        faultResults.innerHTML = '';
        
        faults.forEach(fault => {
            const faultEl = document.createElement('div');
            faultEl.className = `fault-item ${fault.status}`;
            faultEl.innerHTML = `
                <div class="fault-header">
                    <div class="fault-type">
                        <i class="fas fa-${getFaultIcon(fault.type)}"></i>
                        <span>${fault.type.toUpperCase()}</span>
                    </div>
                    <span class="fault-badge ${fault.severity}">${fault.severity.toUpperCase()}</span>
                </div>
                <p>${fault.message}</p>
                <div class="fault-meta">
                    <span>Location: ${fault.location}</span>
                    <span>Time: ${fault.timestamp}</span>
                </div>
            `;
            faultResults.appendChild(faultEl);
        });
    }

    function getFaultIcon(type) {
        const icons = {
            voltage: 'bolt',
            current: 'flash',
            frequency: 'wave-square',
            temperature: 'thermometer-half',
            connection: 'link'
        };
        return icons[type] || 'exclamation-triangle';
    }
}

// ---------------- Weather Broadcast ----------------
function initWeatherBroadcast() {
    const weatherForm = document.getElementById('weather-broadcast-form');
    const weatherAlertsList = document.getElementById('weather-alerts-list');
    const weatherAlerts = [];

    // Add some sample weather alerts
    weatherAlerts.push({
        id: 1,
        title: "Thunderstorm Warning",
        type: "thunderstorm",
        severity: "warning",
        message: "Severe thunderstorms expected this evening. High winds and heavy rain may affect solar panel efficiency. Consider switching to grid power.",
        validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toLocaleString(),
        status: "active"
    });

    weatherAlerts.push({
        id: 2,
        title: "Heat Wave Advisory",
        type: "heat-wave",
        severity: "advisory",
        message: "Temperatures expected to reach 38°C tomorrow. Solar panels will be highly efficient. Consider using renewable energy sources.",
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timestamp: new Date().toLocaleString(),
        status: "active"
    });

    weatherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('weather-title').value.trim();
        const type = document.getElementById('weather-type').value;
        const severity = document.getElementById('weather-severity').value;
        const message = document.getElementById('weather-message').value.trim();
        const validUntil = document.getElementById('weather-valid-until').value;
        
        if (!title || !type || !severity || !message || !validUntil) {
            showToast('Please fill all fields');
            return;
        }

        const alert = {
            id: Date.now(),
            title,
            type,
            severity,
            message,
            validUntil: new Date(validUntil).toISOString(),
            timestamp: new Date().toLocaleString(),
            status: 'active'
        };

        weatherAlerts.unshift(alert);
        renderWeatherAlerts();
        
        // Clear form
        weatherForm.reset();
        showToast('Weather alert broadcasted successfully!');
    });

    function renderWeatherAlerts() {
        weatherAlertsList.innerHTML = '';
        
        if (weatherAlerts.length === 0) {
            weatherAlertsList.innerHTML = '<div class="result-placeholder">No weather alerts sent yet.</div>';
            return;
        }

        weatherAlerts.forEach(alert => {
            const alertEl = document.createElement('div');
            alertEl.className = `weather-alert-item ${alert.severity}`;
            
            const validUntilDate = new Date(alert.validUntil);
            const isValid = validUntilDate > new Date();
            
            alertEl.innerHTML = `
                <div class="weather-alert-header">
                    <div class="weather-alert-title">
                        <i class="fas fa-${getWeatherIcon(alert.type)}"></i>
                        <h4>${alert.title}</h4>
                    </div>
                    <div class="weather-alert-badges">
                        <span class="fault-badge ${alert.severity}">${alert.severity.toUpperCase()}</span>
                        <span class="fault-badge ${isValid ? 'normal' : 'critical'}">${isValid ? 'ACTIVE' : 'EXPIRED'}</span>
                    </div>
                </div>
                <p>${alert.message}</p>
                <div class="weather-alert-meta">
                    <div class="weather-alert-details">
                        <span><i class="fas fa-clock"></i> Valid until: ${validUntilDate.toLocaleString()}</span>
                        <span><i class="fas fa-calendar"></i> Sent: ${alert.timestamp}</span>
                    </div>
                    <button class="chip small" onclick="deleteWeatherAlert(${alert.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            weatherAlertsList.appendChild(alertEl);
        });
    }

    function getWeatherIcon(type) {
        const icons = {
            thunderstorm: 'bolt',
            'heavy-rain': 'cloud-rain',
            snow: 'snowflake',
            'heat-wave': 'sun',
            'cold-wave': 'snowflake',
            wind: 'wind',
            fog: 'smog',
            other: 'cloud'
        };
        return icons[type] || 'cloud';
    }

    // Make deleteWeatherAlert globally available
    window.deleteWeatherAlert = function(id) {
        const index = weatherAlerts.findIndex(a => a.id === id);
        if (index > -1) {
            weatherAlerts.splice(index, 1);
            renderWeatherAlerts();
            showToast('Weather alert deleted');
        }
    };

    renderWeatherAlerts();
}

// ---------------- News Management ----------------
function initNewsManagement() {
    const newsForm = document.getElementById('news-form');
    const newsList = document.getElementById('news-list');
    const news = [];

    // Add some sample news
    news.push({
        id: 1,
        title: "Grid Maintenance Scheduled",
        content: "Scheduled maintenance will be performed on the main grid infrastructure this weekend. Minor outages may occur.",
        category: "maintenance",
        timestamp: new Date().toLocaleString(),
        status: "published"
    });

    news.push({
        id: 2,
        title: "New Solar Integration Features",
        content: "We've added new features to help users better manage their solar energy consumption and grid switching.",
        category: "updates",
        timestamp: new Date().toLocaleString(),
        status: "published"
    });

    newsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('news-title').value.trim();
        const content = document.getElementById('news-content').value.trim();
        const category = document.getElementById('news-category').value;
        
        if (!title || !content || !category) {
            showToast('Please fill all fields');
            return;
        }

        const newsItem = {
            id: Date.now(),
            title,
            content,
            category,
            timestamp: new Date().toLocaleString(),
            status: 'published'
        };

        news.unshift(newsItem);
        renderNews();
        
        // Clear form
        newsForm.reset();
        showToast('News article added successfully!');
    });

    function renderNews() {
        newsList.innerHTML = '';
        
        if (news.length === 0) {
            newsList.innerHTML = '<div class="result-placeholder">No news articles yet.</div>';
            return;
        }

        news.forEach(item => {
            const newsEl = document.createElement('div');
            newsEl.className = 'news-item';
            newsEl.innerHTML = `
                <div class="news-header">
                    <h4>${item.title}</h4>
                    <span class="fault-badge ${item.category}">${item.category.toUpperCase()}</span>
                </div>
                <p>${item.content}</p>
                <div class="news-meta">
                    <span>Published: ${item.timestamp}</span>
                    <button class="chip small" onclick="deleteNews(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            newsList.appendChild(newsEl);
        });
    }

    // Make deleteNews globally available
    window.deleteNews = function(id) {
        const index = news.findIndex(n => n.id === id);
        if (index > -1) {
            news.splice(index, 1);
            renderNews();
            showToast('News article deleted');
        }
    };

    renderNews();
}

// ---------------- Utility Functions ----------------
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00ff88, #00d4ff);
        color: #000;
        padding: 12px 18px;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateY(80px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(80px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
