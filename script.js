/* DATA & CONSTANTS */
const coverflowData = [
    { title: "The Life of a Showgirl", artist: "Taylor Swift", img: "https://i.scdn.co/image/ab67616d0000b273d7812467811a7da6e6a44902" },
    { title: "Übermensch", artist: "G-DRAGON", img: "https://i.ytimg.com/vi/OjoKYCQXDTg/maxresdefault.jpg" },
    { title: "Divide (÷)", artist: "Ed Sheeran", img: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png" },
    { title: "Starboy", artist: "The Weeknd", img: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },
    { title: "Memories...Do Not Open", artist: "The Chainsmokers", img: "https://i.scdn.co/image/ab67616d0000b2730c13d3d5a503c84fcc60ae94" },
    { title: "Dear Min", artist: "Min", img: "https://i.scdn.co/image/ab67616d0000b273ac5073beafd97db033eb23ed" },
    { title: "ALL MY LOVE", artist: "Coldplay", img: "https://images.genius.com/9c2edc606bdbc266b4147f6e95084835.1000x1000x1.png" }
];

const moodData = [
    { name: "Chill", img: "https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { name: "Focus", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80" },
    { name: "Party", img: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendywei-1190298.jpg&fm=jpg" },
    { name: "Sad", img: "https://static.vecteezy.com/system/resources/thumbnails/047/462/181/small/raindrops-streaking-down-a-windowpane-with-a-blurred-cityscape-in-the-background-photo.jpg" },
    { name: "Workout", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80" },
    { name: "Joyful", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80" }, 
    { name: "Peace", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80" }   
];

const genreData = [
    { name: "Pop Ballad", img: "https://i.scdn.co/image/ab67616d0000b2735a6bc1ecf16bbac5734f23da" },
    { name: "Hip-Hop", img: "https://i.scdn.co/image/ab67616d0000b2730ecdf596e76b0403506c1375" },
    { name: "Indie", img: "https://photo.znews.vn/w660/Uploaded/unvjuas/2021_11_15/COVERART_VU_BQN.jpg" },
    { name: "R&B", img: "https://i.scdn.co/image/ab6761610000e5ebc7688aad1bf03986934d7e26" }
];

const newData = [
    { title: "Endless Summer", artist: "Miley Cyrus", img: "https://upload.wikimedia.org/wikipedia/en/5/54/Miley_Cyrus_-_Endless_Summer_Vacation.png" },
    { title: "Guts", artist: "Olivia Rodrigo", img: "https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png" },
    { title: "Unreal Unearth", artist: "Hozier", img: "https://upload.wikimedia.org/wikipedia/en/d/d5/Hozier_-_Unreal_Unearth.png" },
    { title: "1989 (TV)", artist: "Taylor Swift", img: "https://upload.wikimedia.org/wikipedia/en/d/d5/Taylor_Swift_-_1989_%28Taylor%27s_Version%29.png" },
    { title: "Play", artist: "Ed Sheeran", img: "https://upload.wikimedia.org/wikipedia/en/7/7d/Ed_Sheeran_-_Play.png" }
];

const artistData = [
    { name: "SOOBIN", img: "https://i.scdn.co/image/ab6761610000e5eb30db194110c51d9e7fd3c7e7" },
    { name: "Anne-Marie", img: "https://i.scdn.co/image/ab6761610000e5ebf94a7e185158d0950f07310b" },
    { name: "Chillies", img: "https://i.scdn.co/image/ab6761610000e5ebdc19b29cb3109805bc4f6910" },
    { name: "Da LAB", img: "https://i.scdn.co/image/ab6761610000e5eb62c092ca08054a8ce883ef7e" },
    { name: "Ariana Grande", img: "https://i.scdn.co/image/ab6761610000e5eb6725802588d7dc1aba076ca5" }, 
    { name: "BigBang", img: "https://i.scdn.co/image/ab67616d00001e02eb136d1be54b1ef8273c0699" },
    { name: "JustaTee", img: "https://i.scdn.co/image/ab6761610000e5eb32ef88cff38b5ff46fa0004a" },
    { name: "Low G", img: "https://i.scdn.co/image/ab6761610000e5ebf3be1faa8a55450667e6f97a" }
];

/* STATE & GLOBAL VARIABLES */
let currentAudio = new Audio();
let playlist = [];
let searchResults = [];
let myPlaylists = JSON.parse(localStorage.getItem('user_playlists')) || [];
let likedSongs = JSON.parse(localStorage.getItem('user_liked_songs')) || [];
let activeIndex = 1;
let currentIndex = 0;
let isPlaying = false;
let isLoop = false;
let isShuffle = false;
let isViewingLiked = false;
let searchTimeout; 
let currentFocus = -1;


/*  DOM ELEMENTS */
/* Layout & Views */
const homeView = document.querySelector('.hero-section');
const mainContent = document.querySelector('.main-content');
const searchView = document.getElementById('search-view');
const albumContainer = document.getElementById('album-container');
const moodContainer = document.getElementById('mood-container');
const genreContainer = document.getElementById('genre-container');
const newReleaseContainer = document.getElementById('new-release-container');
const artistContainer = document.getElementById('artist-container');
const searchHeaderTitle = document.getElementById('search-title');

/* Search & Header */
const searchInput = document.getElementById('search-input');
const btnSearchTrigger = document.getElementById('btn-search-trigger');
const suggestionBox = document.getElementById('search-suggestions');
const btnBackHome = document.getElementById('btn-back-home');

/* Sidebar & Library */
const sidebar = document.getElementById('my-sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const libraryTitleBtn = document.getElementById('btn-toggle-library');
const btnCreatePlaylist = document.getElementById('btn-create-playlist');
const createPlaylistBox = document.getElementById('create-playlist-box');
const inputPlaylistName = document.getElementById('playlist-name-input');
const libContent = document.getElementById('library-content');
const btnViewLiked = document.getElementById('btn-view-liked');
const likedCountEl = document.getElementById('liked-count');

/* Player Bar & Controls */
const playerBar = document.getElementById('player-bar');
const songListEl = document.getElementById('song-list');
const btnPlay = document.getElementById('btn-play');
const btnPrevSong = document.getElementById('btn-prev-song');
const btnNextSong = document.getElementById('btn-next-song');
const btnLoop = document.getElementById('btn-loop');
const btnShuffle = document.getElementById('btn-shuffle');
const btnClosePlayer = document.getElementById('btn-close');
const btnHeart = document.getElementById('btn-heart');
const btnAddPl = document.getElementById('btn-add-pl');

/* Progress & Volume */
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('btn-volume');
const volumeSlider = document.getElementById('volume-slider');
const volumeBox = document.querySelector('.volume-slider-box');

/* Modal */
const playlistModal = document.getElementById('playlist-modal');
const modalList = document.getElementById('modal-playlist-list');
const closeModalBtn = document.getElementById('close-modal-btn');


/* INITIALIZATION & UI RENDERING */
// Init rendering
renderCoverflow();
renderStaticGrids();
loadUserPlaylists();
if (likedCountEl) likedCountEl.innerText = `Playlist • ${likedSongs.length} bài`;

// Auto-open sidebar on large screens
window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        toggleSidebar(true);
    }
});

function renderStaticGrids() {
    moodContainer.innerHTML = '';
    moodData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-mood';
        card.innerHTML = `<img src="${item.img}" loading="lazy"><span>${item.name}</span>`;
        card.addEventListener('click', () => openGenreDetail(item.name, 'Mood & Vibe'));
        moodContainer.appendChild(card);
    });

    genreContainer.innerHTML = '';
    genreData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-genre';
        card.innerHTML = `<img src="${item.img}" loading="lazy"><h4>${item.name}</h4>`;
        card.addEventListener('click', () => openGenreDetail(item.name, 'Thể loại'));
        genreContainer.appendChild(card);
    });

    if(artistContainer) { 
        artistContainer.innerHTML = '';
        artistData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-artist';
            card.innerHTML = `
                <img src="${item.img}" loading="lazy">
                <h4>${item.name}</h4>
            `;

            card.addEventListener('click', () => {
                openArtistDetail(item.name);
            });
            artistContainer.appendChild(card);
        });
    }

    newReleaseContainer.innerHTML = '';
    newData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-standard';
        card.innerHTML = `
            <div class="img-wrap"><img src="${item.img}" loading="lazy"></div>
            <h4>${item.title}</h4>
            <p>${item.artist}</p>
        `;
        card.addEventListener('click', () => openAlbumDetail(item.title, item.artist));
        newReleaseContainer.appendChild(card);
    });
}

function switchToView(viewName, titleText = '') {
    if (viewName === 'home') {
        if(homeView) homeView.classList.remove('hidden');
        if(mainContent) mainContent.classList.remove('hidden');
        if(searchView) searchView.classList.add('hidden');
        isViewingLiked = false;
        
        document.title = "Music App"; 
    } else {
        if(homeView) homeView.classList.add('hidden');
        if(mainContent) mainContent.classList.add('hidden');
        if(searchView) searchView.classList.remove('hidden');
        if(searchHeaderTitle) searchHeaderTitle.innerText = titleText;
        
        if (viewName === 'liked') isViewingLiked = true;
        else isViewingLiked = false;

        if (!history.state || history.state.view !== viewName) {
            history.pushState({ view: viewName }, "", `#${viewName}`);
            document.title = titleText || "Chi tiết"; 
        }
    }
}


/* COVERFLOW LOGIC */
function getCardClass(index) {
    if (index === activeIndex) return 'active';
    const len = coverflowData.length;
    const prevIndex = (activeIndex - 1 + len) % len;
    const nextIndex = (activeIndex + 1) % len;
    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    return 'hidden';
}

function renderCoverflow() {
    albumContainer.innerHTML = '';
    coverflowData.forEach((album, index) => {
        const card = document.createElement('div');
        card.className = `album-card ${getCardClass(index)}`;
        card.innerHTML = `
            <img src="${album.img}" alt="${album.title}">
            <div class="album-info">
                <h3>${album.title}</h3>
                <p>${album.artist}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            if (activeIndex === index) {
                openAlbumDetail(album.title, album.artist);
        } else {
            activeIndex = index;
            updateCoverflow();
        }
    });
        albumContainer.appendChild(card);
    });
}

function updateCoverflow() {
    const cards = albumContainer.children;
    for (let i = 0; i < cards.length; i++) {
        cards[i].className = `album-card ${getCardClass(i)}`;
    }
}


/* SEARCH & API LOGIC */
async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    saveHistory(query);

    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=15`);
        const data = await res.json();

        searchResults = data.results.map(item => ({
            title: item.trackName,
            artist: item.artistName,
            img: item.artworkUrl100.replace('100x100bb', '600x600bb'),
            src: item.previewUrl
        }));

        suggestionBox.classList.add('hidden');
        switchToView('search', `Kết quả: "${query}"`);
        renderSongList(searchResults);

        const icon = btnSearchTrigger.querySelector('i');
        if(icon) icon.className = 'fas fa-times';

    } catch (error) {
        console.error("Lỗi kết nối API:", error);
    }
}

function renderSongList(sourceArray) { 
    if (!songListEl) return; 
    songListEl.innerHTML = '';

    if (!sourceArray || sourceArray.length === 0) {
        songListEl.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">Không tìm thấy bài hát nào.</p>';
        return;
    }

    sourceArray.forEach((song, index) => {
        const div = document.createElement('div');
        const isActive = (currentAudio.src === song.src) && !playerBar.classList.contains('hidden-bar');
        div.className = `song-item ${isActive ? 'active' : ''}`;
        
        div.innerHTML = `
            <img src="${song.img}">
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        
        div.addEventListener('click', () => {
            playlist = [...sourceArray]; 
            loadAndPlay(index);
        });
        songListEl.appendChild(div);
    });
}

/* Suggestions & History */
function getHistory() {
    const history = localStorage.getItem('music_search_history');
    return history ? JSON.parse(history) : [];
}

function saveHistory(query) {
    let history = getHistory();
    history = history.filter(item => item.toLowerCase() !== query.toLowerCase());
    history.unshift(query); 
    if (history.length > 5) history.pop(); 
    localStorage.setItem('music_search_history', JSON.stringify(history));
}

function renderSuggestions(items, isHistory = false) {
    if (items.length === 0) {
        suggestionBox.classList.add('hidden');
        return;
    }
    
    let html = '';
    if (isHistory) html += `<div class="suggestion-header" style="padding:8px 15px; font-size:0.75rem; color:#888; font-weight:bold; background:#fafafa;">LỊCH SỬ TÌM KIẾM</div>`;
    
    items.forEach(item => {
        const icon = isHistory ? 'fa-history' : 'fa-music';
        const safeItem = item.replace(/'/g, "\\'"); 

        html += `
            <div class="suggestion-item" onmousedown="selectSuggestion('${safeItem}')">
                <div class="suggestion-left">
                    <i class="fas ${icon}" style="color:#bbb; flex-shrink:0;"></i>
                    <span class="suggestion-text">${item}</span>
                </div>
                
                ${isHistory ? 
                    `<div class="btn-delete-history" onmousedown="deleteHistoryItem(event, '${safeItem}')">
                        <i class="fas fa-times"></i>
                    </div>` 
                    : ''
                }
            </div>
        `;
    });
    
    suggestionBox.innerHTML = html;
    suggestionBox.classList.remove('hidden');
}

window.deleteHistoryItem = function(event, query) {
    event.preventDefault();
    event.stopPropagation(); 

    let history = JSON.parse(localStorage.getItem('music_search_history')) || [];
    history = history.filter(item => item !== query);
    localStorage.setItem('music_search_history', JSON.stringify(history));

    if (history.length === 0) {
        suggestionBox.classList.add('hidden');
    } else {
        renderSuggestions(history, true);
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.focus();
};

window.selectSuggestion = function(value) {
    const searchInput = document.getElementById('search-input');
    const suggestionBox = document.getElementById('search-suggestions');
    const btnSearchTrigger = document.getElementById('btn-search-trigger');

    searchInput.value = value;
    suggestionBox.classList.add('hidden');
    
    if (btnSearchTrigger) {
        const icon = btnSearchTrigger.querySelector('i');
        if (icon) icon.className = 'fas fa-times';
    }

    handleSearch(); 
};


/* PLAYER LOGIC (AUDIO & CONTROLS) */
function loadAndPlay(index) {
    currentIndex = index;
    const song = playlist[currentIndex];
    const pImg = document.getElementById('p-img');
    const pTitle = document.getElementById('p-title');
    const pArtist = document.getElementById('p-artist');
    
    if (pImg) pImg.src = song.img;
    if (pTitle) pTitle.innerText = song.title;
    if (pArtist) pArtist.innerText = song.artist;

    const playerBar = document.getElementById('player-bar');
    if (playerBar) {
        playerBar.classList.remove('hidden-bar');
        playerBar.classList.remove('collapsed');
        playerBar.classList.add('playing');
        playerBar.style.transform = ""; 
        playerBar.style.opacity = "";
        playerBar.style.display = ""; 
    }

    currentAudio.src = song.src;
    currentAudio.play().catch(e => console.error(e));
    isPlaying = true;
    updatePlayButton();

    if (typeof isViewingLiked !== 'undefined' && isViewingLiked) renderSongList(likedSongs);
    else if (typeof searchResults !== 'undefined') renderSongList(searchResults);

    if (typeof btnHeart !== 'undefined' && btnHeart) {
        const isLiked = likedSongs.some(s => s.src === song.src);
        if (isLiked) btnHeart.classList.add('active');
        else btnHeart.classList.remove('active');
    }
}

function updatePlayButton() {
    btnPlay.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    if (isPlaying) playerBar.classList.add('playing');
    else playerBar.classList.remove('playing');
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateVolumeIcon(val) {
    const icon = volumeBtn.querySelector('i');
    volumeBtn.classList.remove('mute'); 
    
    if (val == 0) {
        icon.className = 'fas fa-volume-mute';
        volumeBtn.classList.add('mute'); 
    } else if (val < 0.5) {
        icon.className = 'fas fa-volume-down';
    } else {
        icon.className = 'fas fa-volume-up';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dragHandle = document.getElementById('player-drag-handle');
    const playerBar = document.getElementById('player-bar');

    if (dragHandle && playerBar) {
        dragHandle.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const isCollapsed = playerBar.classList.contains('collapsed');
            
            if (isCollapsed) {
                playerBar.classList.remove('collapsed');
                playerBar.style.transform = "translateY(0)"; 
            } else {
                playerBar.classList.add('collapsed');
                playerBar.style.transform = "translateY(calc(100% - 30px))"; 
            }
        });
    }
});


/* PLAYLIST & LIBRARY LOGIC */
function toggleSidebar(forceState = null) {
    const shouldOpen = forceState !== null ? forceState : !sidebar.classList.contains('open');
    if (shouldOpen) {
        sidebar.classList.add('open');
        document.body.classList.add('sidebar-is-open');
    } else {
        sidebar.classList.remove('open');
        document.body.classList.remove('sidebar-is-open');
    }
}

function addNewPlaylist(name) {
    const newPl = { id: Date.now(), name: name, songs: [] };
    myPlaylists.push(newPl);
    savePlaylistsToStorage();
    renderSinglePlaylist(newPl);
}

function savePlaylistsToStorage() {
    localStorage.setItem('user_playlists', JSON.stringify(myPlaylists));
}

function saveLikedSongsToStorage() {
    localStorage.setItem('user_liked_songs', JSON.stringify(likedSongs));
}

function loadUserPlaylists() {
    [...myPlaylists].reverse().forEach(pl => {
        renderSinglePlaylist(pl);
    });
}

function renderSinglePlaylist(playlistData) {
    const div = document.createElement('div');
    div.className = 'lib-item';
    div.setAttribute('data-id', playlistData.id);
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    div.innerHTML = `
        <div class="lib-img-box" style="background: #${randomColor}; display: flex; align-items: center; justify-content: center; color: white;">
            <i class="fas fa-music"></i>
        </div>
        <div class="lib-info">
            <h4>${playlistData.name}</h4>
            <p>${playlistData.songs.length} bài • Của bạn</p>
        </div>
        <button class="btn-delete-pl" style="background:none; border:none; color:#999; margin-left:auto; cursor:pointer; padding:5px;">
            <i class="fas fa-trash"></i>
        </button>
    `;

    // Click to view playlist
    div.addEventListener('click', (e) => {
        if (e.target.closest('.btn-delete-pl')) return;
        playlist = playlistData.songs; 
        switchToView('playlist', playlistData.name);
        renderSongList(playlist);
        if (window.innerWidth <= 768) toggleSidebar(false);
    });


    const btnDelete = div.querySelector('.btn-delete-pl');
    btnDelete.addEventListener('click', async () => {
        const isAgreed = await CustomDialog.confirm(
            `Bạn có chắc muốn xóa playlist "${playlistData.name}"?`,
            "Xóa Playlist"
        );

        if (isAgreed) {
            myPlaylists = myPlaylists.filter(pl => pl.id !== playlistData.id);
            savePlaylistsToStorage();
            div.remove();
        }
    });

    if(libContent.children.length > 0) {
        libContent.insertBefore(div, libContent.children[1]);
    } else {
        libContent.appendChild(div);
    }
    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function addSongToPlaylist(playlistId, song) {
    const targetPl = myPlaylists.find(p => p.id === playlistId);
    if (!targetPl) return;

    const isExist = targetPl.songs.some(s => s.src === song.src);
    if (isExist) {
        CustomDialog.alert(`Bài hát "${song.title}" đã có trong playlist "${targetPl.name}" rồi!`);
        return;
    }

    targetPl.songs.push(song);
    savePlaylistsToStorage();
    
    // Update sidebar text
    const sidebarItem = document.querySelector(`.lib-item[data-id="${playlistId}"] p`);
    if(sidebarItem) {
        sidebarItem.innerText = `${targetPl.songs.length} bài • Của bạn`;
    }

    triggerSuccessAnimation();
    console.log(`Đã thêm ${song.title} vào ${targetPl.name}`);
}

function triggerSuccessAnimation() {
    btnAddPl.classList.add('success');
    setTimeout(() => {
        btnAddPl.classList.remove('success');
    }, 1500);
}

function showSelectPlaylistModal(song) {
    modalList.innerHTML = ''; 
    myPlaylists.forEach(pl => {
        const div = document.createElement('div');
        div.className = 'modal-item';
        const randomColor = Math.floor(Math.random()*16777215).toString(16); 
        
        div.innerHTML = `
            <div class="modal-item-icon" style="background: #${randomColor}">
                <i class="fas fa-music"></i>
            </div>
            <div class="modal-item-info">
                <h4>${pl.name}</h4>
                <p>${pl.songs.length} bài</p>
            </div>
        `;
        div.addEventListener('click', () => {
            addSongToPlaylist(pl.id, song);
            closeModal();
        });
        modalList.appendChild(div);
    });
    playlistModal.classList.remove('hidden');
}

function closeModal() {
    playlistModal.classList.add('hidden');
}

/* --- Open Artist Albums --- */
async function openAlbumDetail(albumTitle, artistName) {
    switchToView('search');
    if(searchHeaderTitle) {
        searchHeaderTitle.innerHTML = `
            <span style="font-size: 0.8em; color: #666; display:block; margin-bottom:5px;">ALBUM</span>
            ${albumTitle} 
            <span style="font-weight:400; color:#888;"> - ${artistName}</span>
        `;
    }

    if(songListEl) {
        songListEl.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 0; color:#888;">
                <div class="loading-wave">
                    <div class="loading-bar"></div><div class="loading-bar"></div>
                    <div class="loading-bar"></div><div class="loading-bar"></div>
                </div>
                <p style="margin-top:15px;">Đang tìm kiếm...</p>
            </div>
        `;
    }
    
    searchResults = [];
    const query = `${albumTitle} ${artistName}`;

    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=200`);
        const data = await res.json();
        const targetAlbumClean = cleanString(albumTitle);
        const targetArtistClean = cleanString(artistName);

        const filteredList = data.results.filter(item => {
            const itemAlbum = cleanString(item.collectionName || ""); 
            const itemArtist = cleanString(item.artistName || "");   
            return itemArtist.includes(targetArtistClean) && itemAlbum.includes(targetAlbumClean);
        });

        filteredList.sort((a, b) => (a.trackNumber || 0) - (b.trackNumber || 0));

        let finalDisplayList = filteredList;
        
        if (filteredList.length === 0) {
             finalDisplayList = data.results.filter(item => cleanString(item.artistName).includes(targetArtistClean));
        }

        if (finalDisplayList.length === 0) {
            songListEl.innerHTML = `<p style="text-align:center; padding:20px;">Không tìm thấy bài hát nào.</p>`;
            return;
        }

        const albumSongs = finalDisplayList.map(item => ({
            title: item.trackName,
            artist: item.artistName,
            img: item.artworkUrl100.replace('100x100bb', '600x600bb'),
            src: item.previewUrl
        }));

        searchResults = albumSongs; 
        renderSongList(albumSongs);

    } catch (error) {
        console.error("Lỗi:", error);
        if(songListEl) songListEl.innerHTML = `<p style="text-align:center; padding:20px;">Lỗi kết nối.</p>`;
    }
}

/* --- Open Artist Profile ---*/
function cleanString(str) {
    if (!str) return "";
    let cleaned = str.toLowerCase();
    
    cleaned = cleaned
        .replace(/÷/g, "divide")
        .replace(/\+/g, "plus")
        .replace(/=/g, "equals")
        .replace(/%/g, "percent")
        .replace(/&/g, "and");
        
    return cleaned.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9\s]/g, "")
                  .trim();
}

async function openArtistDetail(artistName) {
    switchToView('search');
    if(searchHeaderTitle) {
        searchHeaderTitle.innerHTML = `
            <span style="font-size: 0.8em; color: #666; display:block; margin-bottom:5px;">NGHỆ SĨ</span>
            ${artistName}
        `;
    }

    if(songListEl) {
        songListEl.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 0; color:#888;">
                <div class="loading-wave">
                    <div class="loading-bar"></div><div class="loading-bar"></div>
                    <div class="loading-bar"></div><div class="loading-bar"></div>
                </div>
                <p style="margin-top:15px;">Đang tìm...</p>
            </div>
        `;
    }
    
    searchResults = [];

    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&media=music&entity=song&attribute=artistTerm&limit=150`);
        const data = await res.json();
        const targetNameClean = cleanString(artistName);
        let filteredList = data.results.filter(item => {
            const itemArtistClean = cleanString(item.artistName || "");
            return itemArtistClean.includes(targetNameClean);
        });

        if (filteredList.length === 0 && data.results.length > 0) {
            filteredList = data.results; 
        }

        filteredList.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

        const uniqueSongs = [];
        const seenTitles = new Set(); 

        filteredList.forEach(item => {
            const normalizedTitle = cleanString(item.trackName);

            if (!seenTitles.has(normalizedTitle)) {
                seenTitles.add(normalizedTitle); 
                uniqueSongs.push(item);          
            }
        });

        if (uniqueSongs.length === 0) {
            songListEl.innerHTML = `<p style="text-align:center; padding:20px;">Không tìm thấy bài hát nào.</p>`;
            return;
        }

        const artistSongs = uniqueSongs.map(item => ({
            title: item.trackName,
            artist: item.artistName,
            img: item.artworkUrl100.replace('100x100bb', '600x600bb'),
            src: item.previewUrl,
            year: item.releaseDate ? item.releaseDate.substring(0, 4) : ''
        }));

        searchResults = artistSongs;
        renderSongList(artistSongs);

    } catch (error) {
        console.error("Lỗi:", error);
        if(songListEl) songListEl.innerHTML = `<p style="text-align:center; padding:20px;">Lỗi xử lý dữ liệu.</p>`;
    }
}

/* LOGIC MỞ THỂ LOẠI / MOOD */
async function openGenreDetail(name, type) {
    switchToView('search');

    if(searchHeaderTitle) {
        searchHeaderTitle.innerHTML = `
            <span style="font-size: 0.8em; color: #666; display:block; margin-bottom:5px; text-transform: uppercase;">${type}</span>
            ${name}
        `;
    }

    if(songListEl) {
        songListEl.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:50px 0; color:#888;">
                <div class="loading-wave">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
                <p style="margin-top:15px; font-size:0.9rem;">Đang tuyển chọn nhạc ${name}...</p>
            </div>
        `;
    }

    searchResults = [];
    const query = `${name} music`;

    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=50`);
        const data = await res.json();

        const genreSongs = data.results.map(item => ({
            title: item.trackName,
            artist: item.artistName,
            img: item.artworkUrl100.replace('100x100bb', '600x600bb'),
            src: item.previewUrl
        }));

        searchResults = genreSongs;
        renderSongList(genreSongs);

    } catch (error) {
        console.error("Lỗi tải thể loại:", error);
        if(songListEl) songListEl.innerHTML = `<p style="text-align:center; padding:20px;">Không tìm thấy bài hát nào.</p>`;
    }
}

/* EVENT LISTENERS */
/* --- Navigation & Sidebar --- */
if(sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', () => toggleSidebar(true));
if(libraryTitleBtn) libraryTitleBtn.addEventListener('click', () => toggleSidebar(false));

if(btnBackHome) {
    btnBackHome.addEventListener('click', () => {
        history.back(); 
    });
}

if(btnViewLiked) {
    btnViewLiked.addEventListener('click', () => {
        switchToView('liked', 'Bài hát đã thích');
        renderSongList(likedSongs);
        if (window.innerWidth <= 768) toggleSidebar(false);
    });
}

/* --- Coverflow Controls --- */
document.getElementById('btn-prev').addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + coverflowData.length) % coverflowData.length;
    updateCoverflow();
});

document.getElementById('btn-next').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % coverflowData.length;
    updateCoverflow();
});

/* --- Search Events --- */
if (btnSearchTrigger) {
    btnSearchTrigger.addEventListener('click', () => {
        const icon = btnSearchTrigger.querySelector('i');
        
        if (icon.classList.contains('fa-times')) {
            searchInput.value = '';   
            searchInput.focus();      
            
            icon.className = 'fas fa-arrow-right'; 

        } else {
            handleSearch();
        }
    });
}

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

searchInput.addEventListener('input', (e) => {
    currentFocus = -1;
    const icon = btnSearchTrigger.querySelector('i');
    if(icon) icon.className = 'fas fa-arrow-right';

    const query = e.target.value.trim();
    clearTimeout(searchTimeout);

    if (query.length === 0) {
        renderSuggestions(getHistory(), true);
        return;
    }
    searchTimeout = setTimeout(async () => {
        try {
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=5`);
            const data = await res.json();
            const suggestions = data.results.map(song => `${song.trackName} - ${song.artistName}`);
            renderSuggestions(suggestions, false);
        } catch (error) {
            console.error(error);
        }
    }, 300);
});

searchInput.addEventListener('focus', () => {
    const query = searchInput.value.trim();
    if (query.length === 0) renderSuggestions(getHistory(), true);
    else searchInput.dispatchEvent(new Event('input'));
});

searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        suggestionBox.classList.add('hidden');
    }, 200);
});

searchInput.addEventListener('click', () => {
    const query = searchInput.value.trim();
    
    if (query.length === 0) {
        renderSuggestions(getHistory(), true);
    } else {
        if (suggestionBox.classList.contains('hidden')) {
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});

searchInput.addEventListener('keydown', function(e) {
    let items = suggestionBox.getElementsByClassName('suggestion-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        currentFocus++;
        addActive(items);
    } 
    else if (e.key === 'ArrowUp') {
        currentFocus--;
        addActive(items);
    } 
    else if (e.key === 'Enter') {
        if (currentFocus > -1) {
            if (items[currentFocus]) {
                e.preventDefault(); 
                items[currentFocus].dispatchEvent(new Event('mousedown'));
            }
        }
    }
});

function addActive(items) {
    if (!items) return false;
    
    removeActive(items);
    
    if (currentFocus >= items.length) currentFocus = 0; 
    if (currentFocus < 0) currentFocus = items.length - 1; 

    items[currentFocus].classList.add('suggestion-active');
    
    items[currentFocus].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest' 
    });
    
    searchInput.value = items[currentFocus].querySelector('.suggestion-text').innerText;
}

function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('suggestion-active');
    }
}

/* --- Player Controls --- */
btnPlay.addEventListener('click', () => {
    if (isPlaying) currentAudio.pause();
    else currentAudio.play();
    isPlaying = !isPlaying;
    updatePlayButton();
});

btnNextSong.addEventListener('click', () => {
    if (isShuffle) currentIndex = Math.floor(Math.random() * playlist.length);
    else currentIndex = (currentIndex + 1) % playlist.length;
    loadAndPlay(currentIndex);
});

btnPrevSong.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadAndPlay(currentIndex);
});

btnLoop.addEventListener('click', (e) => {
    isLoop = !isLoop;
    currentAudio.loop = isLoop;
    e.currentTarget.classList.toggle('active-btn');
});

btnShuffle.addEventListener('click', (e) => {
    isShuffle = !isShuffle;
    e.currentTarget.classList.toggle('active-btn');
});


btnClosePlayer.addEventListener('click', () => {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    isPlaying = false;
    playerBar.classList.add('hidden-bar');
    playerBar.style.transform = ""; 
    playerBar.style.opacity = "";
    const activeItem = document.querySelector('.song-item.active');
    if (activeItem) activeItem.classList.remove('active');
});

currentAudio.addEventListener('ended', () => {
    if (!isLoop) btnNextSong.click();
});

currentAudio.addEventListener('timeupdate', () => {
    if (document.activeElement !== progressBar) {
        if (currentAudio.duration) {
            const progressPercent = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.value = progressPercent;
            progressBar.style.background = `linear-gradient(to right, var(--accent-color) ${progressPercent}%, #e1e1e1 ${progressPercent}%)`;
        }
    }
    currentTimeEl.innerText = formatTime(currentAudio.currentTime);
});

currentAudio.addEventListener('loadedmetadata', () => {
    durationEl.innerText = formatTime(currentAudio.duration);
    progressBar.value = 0;
});

progressBar.addEventListener('input', (e) => {
    const seekTime = (currentAudio.duration / 100) * e.target.value;
    currentAudio.currentTime = seekTime;
    const val = e.target.value;
    e.target.style.background = `linear-gradient(to right, var(--accent-color) ${val}%, #e1e1e1 ${val}%)`;
});

/* --- Volume Controls --- */
if(volumeBtn) {
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        volumeBox.classList.toggle('hidden');
    });
}

document.addEventListener('click', (e) => {
    if (!volumeBox.contains(e.target) && !volumeBtn.contains(e.target)) {
        volumeBox.classList.add('hidden');
    }
});

if(volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        currentAudio.volume = val;
        updateVolumeIcon(val);
    });
}

/* --- Playlist Actions --- */
btnCreatePlaylist.addEventListener('click', () => {
    btnCreatePlaylist.classList.toggle('active');
    createPlaylistBox.classList.toggle('hidden');
    if (!createPlaylistBox.classList.contains('hidden')) {
        setTimeout(() => inputPlaylistName.focus(), 100);
    } else {
        inputPlaylistName.value = '';
    }
});

inputPlaylistName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const name = inputPlaylistName.value.trim();
        if (name) {
            addNewPlaylist(name);
            inputPlaylistName.value = '';
            createPlaylistBox.classList.add('hidden');
            btnCreatePlaylist.classList.remove('active'); 
        }
    }
});

/* --- Heart / Liked Songs --- */
btnHeart.addEventListener('click', () => {
    const currentSong = playlist[currentIndex];
    if(!currentSong) return;

    const index = likedSongs.findIndex(s => s.src === currentSong.src);
    if (index === -1) {
        likedSongs.push(currentSong);
        btnHeart.classList.add('active');
    } else {
        likedSongs.splice(index, 1);
        btnHeart.classList.remove('active');
    }
    
    saveLikedSongsToStorage();
    if (likedCountEl) likedCountEl.innerText = `Playlist • ${likedSongs.length} bài`;
    if (isViewingLiked) renderSongList(likedSongs);
});

/* --- Add to Playlist Modal --- */
if(btnAddPl) {
    btnAddPl.addEventListener('click', () => {
        const currentSong = playlist[currentIndex];
        if (!currentSong) return;

        if (myPlaylists.length === 0) {
            CustomDialog.alert('Bạn chưa tạo playlist nào! Hãy tạo playlist mới trong thư viện trước.')
                .then(() => {
                    toggleSidebar(true);
                    if(btnCreatePlaylist) btnCreatePlaylist.click();
                });
            return;
        }

        if (myPlaylists.length === 1) {
            addSongToPlaylist(myPlaylists[0].id, currentSong);
        } else {
            showSelectPlaylistModal(currentSong);
        }
    });
}

if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if(playlistModal) {
    playlistModal.addEventListener('click', (e) => {
        if (e.target === playlistModal) closeModal();
    });
}

/* SLIDE TO GO BACK FEATURE */
window.addEventListener('popstate', (event) => {
    if (!event.state || event.state.view === 'home') {
        if(homeView) homeView.classList.remove('hidden');
        if(mainContent) mainContent.classList.remove('hidden');
        if(searchView) searchView.classList.add('hidden');
        
        document.title = "Music App";

        if (document.activeElement) document.activeElement.blur();
    } else {
        switchToView('home'); 
    }
});

/* NOTIFICATION SYSTEM */
const CustomDialog = {
    overlay: document.getElementById('custom-dialog'),
    title: document.getElementById('dialog-title'),
    message: document.getElementById('dialog-message'),
    icon: document.getElementById('dialog-icon'),
    btnConfirm: document.getElementById('btn-dialog-confirm'),
    btnCancel: document.getElementById('btn-dialog-cancel'),
    content: document.querySelector('#custom-dialog .dialog-content'),

    alert: function(msg, title = "Thông báo") {
        return new Promise((resolve) => {
            this.setupUI(title, msg, 'alert');
            
            this.btnConfirm.onclick = () => {
                this.close();
                resolve(true);
            };
        });
    },

    confirm: function(msg, title = "Xác nhận") {
        return new Promise((resolve) => {
            this.setupUI(title, msg, 'confirm');

            this.btnConfirm.onclick = () => {
                this.close();
                resolve(true); 
            };

            this.btnCancel.onclick = () => {
                this.close();
                resolve(false); 
            };
        });
    },

    setupUI: function(title, msg, type) {
        this.title.innerText = title;
        this.message.innerText = msg;
        this.overlay.classList.remove('hidden');

        this.content.classList.remove('alert-mode');
        this.icon.className = 'dialog-icon';
        this.icon.innerHTML = '<i class="fas fa-info-circle"></i>';
        this.btnConfirm.style.background = 'var(--accent-color)';

        if (type === 'alert') {
            this.content.classList.add('alert-mode');
        } else {
            this.icon.classList.add('danger');
            this.icon.innerHTML = '<i class="fas fa-question-circle"></i>';
            this.btnConfirm.style.background = 'var(--danger-color)';
        }
    },

    close: function() {
        this.overlay.classList.add('hidden');
    }
};