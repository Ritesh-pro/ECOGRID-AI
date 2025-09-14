# 🌱 Eco Grid - Sustainable Resource Management Platform

A comprehensive web application for managing sustainable energy resources, providing real-time notifications, and helping users make informed decisions about renewable energy usage.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [User Types](#user-types)
- [Technical Details](#technical-details)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Eco Grid is a modern, responsive web application designed to bridge the gap between electricity departments and consumers, enabling efficient management of sustainable energy resources. The platform provides real-time notifications, weather-based energy recommendations, and comprehensive dashboards for both users and departments.

## ✨ Features

### 🏠 **Home Page**
- **Animated Loading Screen**: 3-second loading with Eco Grid logo and inspirational quote
- **Dark Theme Design**: Modern, eco-friendly aesthetic with green gradient accents
- **Three Main Sections**:
  - Login/Signup with user type selection
  - About Us with feature highlights
  - Contact Us with social media links

### 👤 **User Dashboard**
- **Real-time Alerts**: Filterable alerts (All/Grid/Solar/Weather)
- **Energy Consumption**: Interactive charts and daily/weekly/monthly stats
- **Weather Report**: Current conditions and 5-day forecast
- **Consumption Calculator**: Add appliances and calculate energy costs

### 🏢 **Department Dashboard**
- **Post Information**: Broadcast alerts with priority levels
- **Fault Detection**: Grid analysis and fault identification
- **Weather Broadcast**: Send weather alerts to users
- **News Management**: Publish and manage Eco Grid news

## 📁 Project Structure

```
eco_gaze/
├── index.html              # Main homepage
├── login.html              # Login page
├── signup.html             # Signup page
├── user.html               # User dashboard
├── department.html         # Department dashboard
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript functionality
├── user.js                 # User dashboard interactions
├── department.js           # Department dashboard interactions
├── docs/                   # Documentation folder
│   └── README.md          # This file
└── README.md              # Project overview
```

## 🚀 Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in a web browser
3. **No additional setup required** - runs entirely in the browser

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup needed
- Internet connection for Font Awesome icons and Google Fonts

## 💻 Usage

### Getting Started
1. Open `index.html` in your browser
2. Wait for the 3-second loading screen
3. Choose between Login or Sign Up
4. Select your user type (User or Department)
5. Access your respective dashboard

### User Workflow
1. **Login/Signup** → Select "User"
2. **Dashboard Access** → View alerts, consumption, weather, calculator
3. **Interactive Features**:
   - Filter alerts by type
   - View energy consumption charts
   - Check weather conditions
   - Calculate appliance energy costs

### Department Workflow
1. **Login/Signup** → Select "Department"
2. **Dashboard Access** → Manage alerts, detect faults, broadcast weather
3. **Management Features**:
   - Post grid alerts with priorities
   - Analyze grid faults by location
   - Send weather broadcasts to users
   - Manage news articles

## 👥 User Types

### 🔹 **Normal Users**
- Access to personal dashboard
- View real-time alerts and notifications
- Monitor energy consumption patterns
- Check weather conditions for renewable energy optimization
- Calculate energy costs for appliances

### 🔹 **Department Staff**
- Post information and alerts
- Detect and analyze grid faults
- Broadcast weather warnings and updates
- Manage news and announcements
- Monitor overall grid health

## 🛠️ Technical Details

### **Frontend Technologies**
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Canvas API**: Energy consumption charts
- **Local Storage**: Data persistence

### **Design Features**
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Energy-efficient aesthetic
- **Animations**: Smooth transitions and hover effects
- **Color Coding**: Intuitive visual feedback
- **Accessibility**: Keyboard navigation and screen reader support

### **Key Libraries**
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family
- **CSS Grid & Flexbox**: Layout systems
- **CSS Custom Properties**: Theme management

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1200px+ (Full dashboard experience)
- **Tablet**: 768px - 1199px (Adapted layouts)
- **Mobile**: 320px - 767px (Stacked layouts)

## 🎨 Design System

### **Color Palette**
- **Primary Green**: #00ff88 (Eco-friendly energy)
- **Secondary Blue**: #00d4ff (Technology and innovation)
- **Background**: #0a0a0a (Dark theme base)
- **Text**: #ffffff (High contrast)
- **Accent**: #a0a0a0 (Secondary text)

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Hierarchy**: Clear heading and body text structure

## 🔧 Customization

### **Adding New Features**
1. **User Dashboard**: Modify `user.js` and `user.html`
2. **Department Dashboard**: Update `department.js` and `department.html`
3. **Styling**: Edit `styles.css` for visual changes
4. **Main Functionality**: Update `script.js` for core features

### **Theme Customization**
- Modify CSS custom properties in `styles.css`
- Update color values for different themes
- Adjust animation timings and effects

## 🚨 Known Issues

- **Weather Data**: Currently uses simulated data (integrate real API)
- **User Authentication**: No backend validation (add server-side logic)
- **Data Persistence**: Limited to session storage (implement database)

## 🔮 Future Enhancements

- **Real-time Data**: Integration with weather APIs
- **User Authentication**: Secure login system
- **Database Integration**: Persistent data storage
- **Mobile App**: Native mobile application
- **Push Notifications**: Real-time alerts
- **Analytics Dashboard**: Advanced reporting features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:
- **Email**: info@ecogrid.com
- **Phone**: +1 (555) 123-4567
- **Website**: [Eco Grid Official](https://ecogrid.com)

## 🙏 Acknowledgments

- **Font Awesome** for comprehensive icon library
- **Google Fonts** for Inter font family
- **CSS Grid** and **Flexbox** for modern layouts
- **Canvas API** for interactive charts

---

**Built with ❤️ for a sustainable future**

*Eco Grid - Powering tomorrow with today's sustainable choices*
