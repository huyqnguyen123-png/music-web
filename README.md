# 🎵 MusicPro - Music Streaming App

![Project Banner](https://github.com/huyqnguyen123-png/music-web/blob/main/Screenshot%202026-02-01%20234410.png?raw=true)

> **Modern Music Player built with Vanilla JS & iTunes API, featuring Responsive Design, User Authentication, and Profile Management.**

[🔴 **LIVE DEMO**](https://huyqnguyen123-png.github.io/music-web/) | [Report Bug](https://github.com/huyqnguyen123-png/music-web/issues)

---

## 📖 Introduction

**MusicPro** is an online music streaming application designed to simulate modern streaming platforms. The project is built entirely with **HTML, CSS, and Vanilla JavaScript**, without relying on any external libraries or frameworks (such as React or jQuery).

The goal of this project is to demonstrate a deep understanding of **DOM Manipulation**, **Asynchronous JavaScript** (Async/Await), **Fetch API**, and **Responsive Design** principles.

---

## ✨ Key Features

### 🎧 Music Player & Discovery
- **iTunes API Integration:** Search and play music directly from the Apple iTunes database.
- **Smart Data Persistence:** Uses `LocalStorage` to maintain user sessions (Auto-login) and saved settings.
- **Advanced Playlist Management:** Add to library, create playlists, and remove songs dynamically.
- **Audio Controls:** Play, Pause, Next, Previous, Shuffle, Repeat and Seek bar functionalities.

### 🔐 Authentication & Security
- **Login / Sign up:** Smooth transitions between forms using a Sliding Tab effect.
- **Form Validation:** Strict input validation (Email format, Password match, Required fields).
- **Security UI:** Password visibility toggle and secure session handling.

### 👤 User Profile & UI/UX
- **Responsive UI:** A seamless interface that adapts perfectly from Desktop to Mobile.
- **Optimized Search:** Implements **Debouncing** to minimize API usage during typing.
- **Custom Feedback System:** Self-written Toast Notifications and Modal Dialogs for a native app feel.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Flexbox, Grid, CSS Variables).
* **Logic:** Vanilla JavaScript (ES6+).
* **API:** iTunes Search API.
* **Tools:** Visual Studio Code, Git/GitHub.
* **Deployment:** GitHub Pages.

---

## 🚀 How to Run

Since this project uses Vanilla JS, the installation process is very simple:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/huyqnguyen123-png/music-web.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd music-web
    ```
3.  **Run the project:**
    * Option 1: Open the `index.html` file directly in your browser.
    * Option 2 (Recommended): Use **Live Server** in VS Code for the best experience.

---

## 📂 Project Structure

```text
music-web/
├── assets/                  # Static Assets
│   ├── css/
│   │   ├── style.css        # Main CSS (Music Player)
│   │   └── login.css        # Auth & Profile CSS
│   ├── img/                 # Images, logos, screenshots
│   └── js/
│       ├── auth.js          # Auth logic, validation, tab switching
│       ├── main.js          # Player logic, iTunes API handling
│       └── mock-backend.js  # Fake Database / Server simulation
├── index.html               # Home Page (Music Player)
├── login.html               # Authentication Page (Login/Register)
├── profile.html             # User Profile Management
└── README.md                # Project Documentation

