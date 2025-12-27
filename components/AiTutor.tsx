<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js"></script>

<style>
  :root {
    --sb-primary: #0066FF;
    --sb-primary-dark: #0052CC;
    --sb-gold: #FFD700;
    --sb-gold-dark: #E6C200;
    --sb-green: #00C853;
    --sb-bg: #ffffff;
    --sb-text: #1a1a2e;
    --sb-gray: #f4f6f9;
    --sb-version: "2.2";
  }

  /* MAIN CONTAINER (NAMESPACED) */
  #sb-tutor-widget-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }

  /* AVATAR BUTTON */
  #sb-tutor-toggle-btn {
    width: 70px;
    height: 70px;
    background-color: white;
    background-image: url('https://studybuddy.live/StudyBuddy_AI_tutor_gif.gif');
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 18px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    border: none;
    box-shadow: 
      0 0 0 3px white,
      0 0 0 6px var(--sb-primary),
      0 8px 30px rgba(0, 102, 255, 0.4),
      0 3px 10px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
  }

  #sb-tutor-toggle-btn:hover { 
    transform: scale(1.08) translateY(-4px); 
    box-shadow: 
      0 0 0 3px white,
      0 0 0 6px var(--sb-primary),
      0 0 25px rgba(0, 102, 255, 0.6),
      0 15px 40px rgba(0, 102, 255, 0.4),
      0 6px 16px rgba(0, 0, 0, 0.15);
  }

  /* Glowing pulse ring */
  #sb-tutor-toggle-btn::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--sb-primary), #00C6FF);
    opacity: 0;
    z-index: -1;
    animation: sb-glow-pulse 3s ease-in-out infinite;
  }
  
  @keyframes sb-glow-pulse {
    0%, 100% { transform: scale(1); opacity: 0; }
    50% { transform: scale(1.08); opacity: 0.3; }
  }

  /* Usage badge */
  #sb-tutor-usage-badge {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, var(--sb-gold) 0%, var(--sb-gold-dark) 100%);
    color: #1a1a2e;
    font-size: 10px;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 20px;
    display: none;
    border: 2px solid white;
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
    white-space: nowrap;
  }
  #sb-tutor-usage-badge.low { 
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%); 
    color: white;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  }
  #sb-tutor-usage-badge.pro { 
    background: linear-gradient(135deg, var(--sb-gold) 0%, var(--sb-gold-dark) 100%);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.5);
  }

  /* CHAT WINDOW */
  #sb-tutor-chat-window {
    display: none;
    width: 400px;
    height: 580px;
    max-height: 80vh;
    background-color: var(--sb-bg);
    border-radius: 24px;
    box-shadow: 
      0 25px 80px rgba(0, 0, 0, 0.25),
      0 10px 30px rgba(0, 102, 255, 0.15);
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    bottom: 90px;
    right: 0;
    animation: sb-slide-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  @keyframes sb-slide-up {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Header with gradient */
  #sb-tutor-header {
    background: linear-gradient(135deg, var(--sb-primary) 0%, #0052CC 50%, #003D99 100%);
    color: white;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
  }

  #sb-tutor-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--sb-gold), var(--sb-gold-dark), var(--sb-gold));
  }

  #sb-tutor-header-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-image: url('https://studybuddy.live/StudyBuddy_AI_tutor_gif.gif');
    background-size: 100%;
    background-position: center center;
    background-color: white;
    border: 3px solid rgba(255, 255, 255, 0.9);
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  #sb-tutor-header-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  #sb-tutor-header-title { 
    font-weight: 700; 
    font-size: 19px; 
    letter-spacing: -0.3px;
  }
  #sb-tutor-header-subtitle { 
    font-size: 13px; 
    opacity: 0.9;
    font-weight: 500;
  }

  #sb-tutor-header-controls {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
  }

  #sb-tutor-close-btn {
    cursor: pointer;
    font-size: 28px;
    color: white;
    background: rgba(255,255,255,0.15);
    border: none;
    opacity: 0.9;
    transition: all 0.2s;
    line-height: 1;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #sb-tutor-close-btn:hover { 
    opacity: 1; 
    background: rgba(255,255,255,0.25);
  }

  #sb-tutor-hide-forever {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s;
    background: rgba(255,255,255,0.1);
    white-space: nowrap;
  }
  #sb-tutor-hide-forever:hover {
    background: rgba(255,255,255,0.2);
    color: white;
  }

  /* Usage Bar */
  #sb-tutor-usage-bar {
    background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);
    padding: 12px 20px;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eef1f5;
  }

  #sb-tutor-usage-text { 
    color: #666; 
    font-weight: 500;
  }
  #sb-tutor-usage-text.pro { 
    color: var(--sb-primary); 
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  #sb-tutor-usage-text.pro::before {
    content: '⭐';
  }

  #sb-tutor-upgrade-link {
    color: var(--sb-primary);
    text-decoration: none;
    font-weight: 700;
    font-size: 12px;
    padding: 6px 14px;
    background: linear-gradient(135deg, #EBF3FF 0%, #E0EDFF 100%);
    border-radius: 20px;
    transition: all 0.2s;
  }
  #sb-tutor-upgrade-link:hover { 
    background: linear-gradient(135deg, var(--sb-primary) 0%, var(--sb-primary-dark) 100%);
    color: white;
  }

  /* Messages Area */
  #sb-tutor-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .sb-message {
    max-width: 85%;
    padding: 14px 18px;
    border-radius: 20px;
    font-size: 14px;
    line-height: 1.6;
    word-wrap: break-word;
    animation: sb-message-in 0.3s ease-out;
  }

  @keyframes sb-message-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .sb-message p { margin: 0; text-align: left; }

  .sb-user {
    align-self: flex-end;
    background: linear-gradient(135deg, var(--sb-primary) 0%, var(--sb-primary-dark) 100%);
    color: white;
    border-bottom-right-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.25);
  }

  .sb-bot {
    align-self: flex-start;
    background-color: white;
    color: var(--sb-text);
    border-bottom-left-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border: 1px solid #eef1f5;
  }
  
  /* Limit Message */
  .sb-limit-message {
    align-self: center;
    background: linear-gradient(135deg, #FFF9E6 0%, #FFF3CD 100%);
    border: 2px solid var(--sb-gold);
    color: #856404;
    padding: 20px;
    border-radius: 16px;
    text-align: center;
    max-width: 90%;
    box-shadow: 0 4px 16px rgba(255, 215, 0, 0.2);
  }
  .sb-limit-message h4 { margin: 0 0 10px 0; font-size: 16px; }
  .sb-limit-message p { margin: 0 0 14px 0; font-size: 13px; line-height: 1.5; }
  .sb-limit-message .sb-upgrade-btn {
    background: linear-gradient(135deg, var(--sb-primary) 0%, var(--sb-primary-dark) 100%);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(0, 102, 255, 0.35);
    transition: all 0.3s;
  }
  .sb-limit-message .sb-upgrade-btn:hover { 
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 102, 255, 0.45);
  }

  /* Audio button */
  .sb-audio-trigger {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    font-size: 12px;
    color: var(--sb-primary);
    border: 2px solid var(--sb-primary);
    padding: 6px 14px;
    border-radius: 20px;
    transition: all 0.25s;
    background: white;
    font-weight: 600;
  }
  .sb-audio-trigger:hover { 
    background: var(--sb-primary);
    color: white;
    transform: scale(1.02);
  }
  .sb-audio-trigger.loading {
    opacity: 0.7;
    cursor: wait;
    background: #f0f0f0;
    border-color: #ccc;
    color: #666;
  }
  .sb-audio-trigger.playing {
    background: #ff4757;
    border-color: #ff4757;
    color: white;
  }
  .sb-audio-trigger.playing:hover {
    background: #ff3344;
    border-color: #ff3344;
  }

  /* Input Area */
  #sb-tutor-input-area {
    padding: 18px 20px;
    border-top: 1px solid #eef1f5;
    display: flex;
    gap: 12px;
    background: white;
  }

  #sb-tutor-input {
    flex: 1;
    border: 2px solid #e8ecf1;
    border-radius: 28px;
    padding: 14px 22px;
    outline: none;
    font-size: 14px;
    transition: all 0.25s;
    background: #f8f9fb;
  }
  #sb-tutor-input:focus { 
    border-color: var(--sb-primary); 
    background: white;
    box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
  }
  #sb-tutor-input:disabled { background: #f0f2f5; }
  #sb-tutor-input::placeholder { color: #999; }

  #sb-tutor-send-btn {
    background: linear-gradient(135deg, var(--sb-primary) 0%, var(--sb-primary-dark) 100%);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(0, 102, 255, 0.35);
  }
  #sb-tutor-send-btn:hover { 
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(0, 102, 255, 0.45);
  }
  #sb-tutor-send-btn:disabled { 
    background: #ccc; 
    cursor: not-allowed; 
    transform: none; 
    box-shadow: none;
  }

  /* Typing indicator */
  #sb-tutor-typing { 
    color: #888; 
    font-size: 13px; 
    padding: 8px 20px;
    display: none;
    background: white;
    border-top: 1px solid #eef1f5;
  }
  #sb-tutor-typing::after {
    content: '';
    animation: sb-typing-dots 1.4s infinite;
  }
  @keyframes sb-typing-dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }

  /* MOBILE */
  @media (max-width: 768px) {
    #sb-tutor-widget-container {
      bottom: 16px;
      right: 16px;
    }
    
    #sb-tutor-toggle-btn {
      width: 60px;
      height: 60px;
      box-shadow: 
        0 0 0 2px white,
        0 0 0 4px var(--sb-primary),
        0 6px 20px rgba(0, 102, 255, 0.4),
        0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    #sb-tutor-toggle-btn:hover {
      transform: scale(1.05) translateY(-2px);
    }
    
    #sb-tutor-toggle-btn::before {
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
    }
    
    #sb-tutor-usage-badge {
      font-size: 9px;
      padding: 4px 10px;
      top: -4px;
    }
    
    #sb-tutor-chat-window {
      position: fixed;
      width: 100vw;
      height: 100vh;
      max-height: 100vh;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
      border-radius: 0;
      animation: sb-slide-up-mobile 0.3s ease-out;
    }
    
    @keyframes sb-slide-up-mobile {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    
    #sb-tutor-header {
      padding: 16px 20px;
      gap: 12px;
    }
    
    #sb-tutor-header-avatar {
      width: 48px;
      height: 48px;
    }
    
    #sb-tutor-header-title {
      font-size: 17px;
    }
    
    #sb-tutor-header-subtitle {
      font-size: 12px;
    }
    
    #sb-tutor-close-btn {
      width: 32px;
      height: 32px;
      font-size: 24px;
    }
    
    #sb-tutor-hide-forever {
      font-size: 10px;
      padding: 3px 6px;
    }
    
    #sb-tutor-usage-bar {
      padding: 10px 16px;
      font-size: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    #sb-tutor-messages {
      padding: 16px;
      gap: 12px;
    }
    
    .sb-message {
      max-width: 90%;
      padding: 12px 16px;
      font-size: 14px;
    }
    
    #sb-tutor-input-area {
      padding: 14px 16px;
      gap: 10px;
    }
    
    #sb-tutor-input {
      padding: 12px 18px;
      font-size: 16px; /* Prevent iOS zoom */
    }
    
    #sb-tutor-send-btn {
      width: 46px;
      height: 46px;
    }
    
    .sb-audio-trigger {
      font-size: 11px;
      padding: 5px 12px;
    }
  }

  @media (max-width: 360px) {
    #sb-tutor-toggle-btn {
      width: 56px;
      height: 56px;
    }
    
    #sb-tutor-header-avatar {
      width: 42px;
      height: 42px;
    }
    
    #sb-tutor-header-title {
      font-size: 16px;
    }
    
    .sb-message {
      font-size: 13px;
    }
  }

  @media (max-height: 500px) and (orientation: landscape) {
    #sb-tutor-chat-window {
      height: 100vh;
      max-height: 100vh;
    }
    
    #sb-tutor-header {
      padding: 12px 16px;
    }
    
    #sb-tutor-messages {
      padding: 12px;
    }
  }
</style>

<div id="sb-tutor-widget-container">
  <div id="sb-tutor-chat-window">
    <div id="sb-tutor-header">
      <div id="sb-tutor-header-avatar"></div>
      <div id="sb-tutor-header-info">
        <div id="sb-tutor-header-title">StudyBuddy</div>
        <div id="sb-tutor-header-subtitle">Your AI Tutor</div>
      </div>
      <div id="sb-tutor-header-controls">
        <button id="sb-tutor-close-btn" aria-label="Close chat window">×</button>
        <a href="#" id="sb-tutor-hide-forever" title="Hide AI tutor permanently">Don't show again</a>
      </div>
    </div>
    
    <div id="sb-tutor-usage-bar">
      <span id="sb-tutor-usage-text">Loading...</span>
      <a href="#" id="sb-tutor-upgrade-link" style="display:none;">Upgrade to Pro →</a>
    </div>
    
    <div id="sb-tutor-messages"></div>
    <div id="sb-tutor-typing">StudyBuddy is typing</div>

    <div id="sb-tutor-input-area">
      <input type="text" id="sb-tutor-input" placeholder="Ask me anything..." />
      <button id="sb-tutor-send-btn" aria-label="Send message">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  </div>

  <button id="sb-tutor-toggle-btn" aria-label="Open StudyBuddy AI Tutor">
    <span id="sb-tutor-usage-badge"></span>
  </button>
</div>

<script>
/* VERSION 2.2 - FIXED VERSION */
(function() {
  // Prevent duplicate initialization
  if (window.__SB_TUTOR_V22_INITIALIZED__) {
    console.log('StudyBuddy AI Tutor already initialized (v2.2)');
    return;
  }
  window.__SB_TUTOR_V22_INITIALIZED__ = true;

  var WORKER_URL = 'https://studybuddy-api.rahulkane.workers.dev';
  var UPGRADE_URL = 'https://studybuddy.live/pricing';
  var FREE_LIMIT = 10;
  var VERSION = '2.2';
  
  var BLOCKED_UNIT_IDS = [
    '690e1c3d989f930fd20122a7Unit'
  ];

  var STORAGE_KEY = 'sb_chat_session';
  var HIDE_FOREVER_KEY = 'sb_ai_tutor_hide_permanently';
  var HIDE_SESSION_KEY = 'sb_ai_tutor_hide_session';
  
  // Initialize markdown-it safely
  var md;
  function initMarkdown() {
    try {
      if (window.markdownit && typeof window.markdownit === 'function') {
        md = window.markdownit({
          html: false,        // Disable HTML for security
          breaks: true,       // Convert \n to <br>
          linkify: true       // Auto-convert URLs to links
        });
      } else {
        console.warn('markdown-it not available, falling back to plain text.');
        md = { render: function(s) { return escapeHtml(s); } };
      }
    } catch (e) {
      console.warn('markdown-it init failed, falling back to plain text.', e);
      md = { render: function(s) { return escapeHtml(s); } };
    }
  }
  
  // Helper to escape HTML when markdown isn't available
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  var chatHistory = [];
  var isWidgetOpen = false;
  var isLoading = false;
  var userState = {
    isPaid: false,
    userToken: null,
    userId: null,
    email: null,
    used: 0,
    remaining: FREE_LIMIT,
    unlimited: false
  };

  console.log('StudyBuddy AI Tutor Version ' + VERSION + ' Loading...');

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    // Initialize markdown after DOM is ready (gives time for script to load)
    initMarkdown();
    
    var container = document.getElementById('sb-tutor-widget-container');
    var toggleBtn = document.getElementById('sb-tutor-toggle-btn');
    var chatWindow = document.getElementById('sb-tutor-chat-window');
    var closeBtn = document.getElementById('sb-tutor-close-btn');
    var hideForeverLink = document.getElementById('sb-tutor-hide-forever');
    var messagesDiv = document.getElementById('sb-tutor-messages');
    var inputField = document.getElementById('sb-tutor-input');
    var sendBtn = document.getElementById('sb-tutor-send-btn');
    var typingIndicator = document.getElementById('sb-tutor-typing');
    var usageText = document.getElementById('sb-tutor-usage-text');
    var upgradeLink = document.getElementById('sb-tutor-upgrade-link');
    var usageBadge = document.getElementById('sb-tutor-usage-badge');
    var headerSubtitle = document.getElementById('sb-tutor-header-subtitle');

    if (!container || !toggleBtn || !chatWindow || !messagesDiv || !inputField || !sendBtn) {
      console.error('StudyBuddy AI Tutor: Missing widget elements, aborting init.');
      return;
    }

    console.log('StudyBuddy: Widget elements loaded, version ' + VERSION);

    var currentAudio = null;
    var currentAudioButton = null;

    function shouldHideWidget() {
      try {
        if (localStorage.getItem(HIDE_FOREVER_KEY) === 'true') {
          return true;
        }
      } catch (e) {
        // localStorage might be unavailable
      }
      return false;
    }

    function shouldHidePanel() {
      try {
        if (sessionStorage.getItem(HIDE_SESSION_KEY) === 'true') {
          return true;
        }
      } catch (e) {
        // sessionStorage might be unavailable
      }
      return false;
    }

    function hideWidgetPermanently() {
      try {
        localStorage.setItem(HIDE_FOREVER_KEY, 'true');
        container.style.display = 'none';
      } catch (e) {
        console.error('Failed to save hide preference:', e);
      }
    }

    function hidePanelForSession() {
      try {
        sessionStorage.setItem(HIDE_SESSION_KEY, 'true');
      } catch (e) {
        // Ignore storage errors
      }
      chatWindow.style.display = 'none';
      isWidgetOpen = false;
    }

    function stopCurrentAudio() {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
      if (currentAudioButton) {
        currentAudioButton.innerHTML = '🔊 Listen';
        currentAudioButton.classList.remove('loading', 'playing');
        currentAudioButton = null;
      }
    }

    function toggleChat() {
      isWidgetOpen = !isWidgetOpen;
      chatWindow.style.display = isWidgetOpen ? 'flex' : 'none';
      
      if (isWidgetOpen) {
        try {
          sessionStorage.removeItem(HIDE_SESSION_KEY);
        } catch (e) {
          // Ignore storage errors
        }
        inputField.focus();
        scrollToBottom();
        if (window.innerWidth <= 768) {
          document.body.style.overflow = 'hidden';
        }
      } else {
        stopCurrentAudio();
        hidePanelForSession();
        document.body.style.overflow = '';
      }
    }

    function scrollToBottom() {
      requestAnimationFrame(function() {
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
    }

    function setLoading(loading) {
      isLoading = loading;
      var isLimited = !userState.isPaid && userState.remaining <= 0;
      inputField.disabled = loading || isLimited;
      sendBtn.disabled = loading || isLimited;
      if (typingIndicator) {
        typingIndicator.style.display = loading ? 'block' : 'none';
      }
    }

    function detectLearnWorldsUser() {
      try {
        // Try multiple ways to detect LearnWorlds user
        if (window.lw && window.lw.user) {
          return {
            userId: window.lw.user.id || window.lw.user.user_id || null,
            email: window.lw.user.email || null,
            isPaid: checkPaidStatus(window.lw.user)
          };
        }
        if (window.__LW_USER__) {
          return {
            userId: window.__LW_USER__.id || null,
            email: window.__LW_USER__.email || null,
            isPaid: checkPaidStatus(window.__LW_USER__)
          };
        }
        // Check for user data in cookies or other locations
        if (window.LearnWorlds && window.LearnWorlds.user) {
          return {
            userId: window.LearnWorlds.user.id || null,
            email: window.LearnWorlds.user.email || null,
            isPaid: checkPaidStatus(window.LearnWorlds.user)
          };
        }
      } catch (e) {
        console.warn('Error detecting LearnWorlds user:', e);
      }
      return { userId: null, email: null, isPaid: false };
    }

    function checkPaidStatus(user) {
      if (!user) return false;
      if (user.has_active_subscription === true) return true;
      if (user.subscription_status === 'active') return true;
      if (user.is_premium === true) return true;
      if (user.plan && user.plan !== 'free') return true;
      return false;
    }

    function generateAnonymousToken() {
      var token;
      try {
        token = localStorage.getItem('sb_anon_token');
        if (!token) {
          token = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
          localStorage.setItem('sb_anon_token', token);
        }
      } catch (e) {
        // localStorage unavailable, generate session-only token
        token = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
      }
      return token;
    }

    function fetchUsage() {
      var params = new URLSearchParams({
        userToken: userState.userToken || '',
        isPaid: userState.isPaid ? 'true' : 'false'
      });
      
      return fetch(WORKER_URL + '/usage?' + params.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function(res) {
          if (!res.ok) {
            throw new Error('Usage fetch failed: ' + res.status);
          }
          return res.json();
        })
        .then(function(data) {
          userState.used = data.used || 0;
          userState.remaining = (data.remaining !== undefined && data.remaining !== null)
            ? data.remaining
            : Math.max(0, FREE_LIMIT - userState.used);
          userState.unlimited = data.unlimited || userState.isPaid;
        })
        .catch(function(e) {
          console.warn('Failed to fetch usage:', e);
          // Default to free limit on error
          userState.remaining = FREE_LIMIT;
        });
    }

    function updateUsageUI() {
      if (!usageText || !usageBadge || !headerSubtitle) return;

      if (userState.isPaid || userState.unlimited) {
        usageText.textContent = 'Pro • Unlimited Questions';
        usageText.className = 'pro';
        if (upgradeLink) upgradeLink.style.display = 'none';
        usageBadge.textContent = '⭐ PRO';
        usageBadge.className = 'pro';
        usageBadge.style.display = 'block';
        headerSubtitle.textContent = 'Your AI Tutor • Pro';
      } else {
        var remaining = Math.max(0, userState.remaining);
        usageText.textContent = remaining + ' of ' + FREE_LIMIT + ' free questions left today';
        usageText.className = '';
        if (upgradeLink) upgradeLink.style.display = 'inline';
        headerSubtitle.textContent = 'Your AI Tutor';
        if (remaining <= 3 && remaining > 0) {
          usageBadge.textContent = remaining + ' left';
          usageBadge.className = 'low';
          usageBadge.style.display = 'block';
        } else {
          usageBadge.style.display = 'none';
        }
      }
    }

    function renderHistory() {
      messagesDiv.innerHTML = '';
      if (chatHistory.length === 0) {
        var welcomeMsg = userState.isPaid
          ? "Hey! 👋 I'm StudyBuddy, your personal AI tutor. As a Pro member, ask me unlimited questions about nursing, anatomy, microbiology, or anything else you're studying!"
          : "Hey! 👋 I'm StudyBuddy, your personal AI tutor. You have " + userState.remaining + " free questions today. Ask me anything about nursing, anatomy, physiology, or microbiology!";
        addMessageToUI('bot', welcomeMsg, false);
      } else {
        chatHistory.forEach(function(msg) {
          addMessageToUI(msg.role, msg.content, false);
        });
      }
      if (!userState.isPaid && userState.remaining <= 0) {
        showLimitReachedMessage();
      }
      renderMath();
    }

    function addMessageToUI(role, content, save) {
      if (save === undefined) save = true;
      
      var div = document.createElement('div');
      div.className = 'sb-message ' + (role === 'user' ? 'sb-user' : 'sb-bot');
      
      // Safely render content
      try {
        if (md && typeof md.render === 'function') {
          div.innerHTML = md.render(content);
        } else {
          div.textContent = content;
        }
      } catch (e) {
        console.warn('Markdown render error:', e);
        div.textContent = content;
      }

      // Add audio button for bot messages
      if (role === 'bot' && content && content.length > 0) {
        var audioBtn = document.createElement('button');
        audioBtn.className = 'sb-audio-trigger';
        audioBtn.innerHTML = '🔊 Listen';
        audioBtn.setAttribute('type', 'button');
        audioBtn.onclick = function(e) {
          e.preventDefault();
          playAudio(content, audioBtn);
        };
        div.appendChild(audioBtn);
      }

      messagesDiv.appendChild(div);
      scrollToBottom();

      // Render KaTeX math
      if (typeof renderMathInElement === 'function') {
        try {
          renderMathInElement(div, {
            delimiters: [
              {left: "$$", right: "$$", display: true},
              {left: "\\[", right: "\\]", display: true},
              {left: "$", right: "$", display: false},
              {left: "\\(", right: "\\)", display: false}
            ],
            throwOnError: false
          });
        } catch (e) {
          console.warn('KaTeX render error:', e);
        }
      }

      // Save to history
      if (save) {
        chatHistory.push({ role: role, content: content });
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
        } catch (e) {
          // Storage might be full or unavailable
          console.warn('Failed to save chat history:', e);
        }
      }
    }

    function showLimitReachedMessage() {
      // Check if limit message already exists
      if (messagesDiv.querySelector('.sb-limit-message')) {
        return;
      }
      
      var div = document.createElement('div');
      div.className = 'sb-limit-message';
      div.innerHTML = '<h4>🎯 Daily Limit Reached</h4>' +
        '<p>You\'ve used all ' + FREE_LIMIT + ' free questions for today. Upgrade to Pro for unlimited access to your AI tutor!</p>' +
        '<button class="sb-upgrade-btn" type="button">Upgrade to Pro</button>';
      
      // Add click handler for button
      var upgradeBtn = div.querySelector('.sb-upgrade-btn');
      upgradeBtn.onclick = function() {
        window.open(UPGRADE_URL, '_blank');
      };
      
      messagesDiv.appendChild(div);
      scrollToBottom();
      inputField.disabled = true;
      inputField.placeholder = 'Upgrade to Pro for unlimited questions...';
      sendBtn.disabled = true;
    }

    function renderMath() {
      if (typeof renderMathInElement === 'function') {
        try {
          renderMathInElement(messagesDiv, {
            delimiters: [
              {left: "$$", right: "$$", display: true},
              {left: "\\[", right: "\\]", display: true},
              {left: "$", right: "$", display: false},
              {left: "\\(", right: "\\)", display: false}
            ],
            throwOnError: false
          });
        } catch (e) {
          console.warn('KaTeX render error:', e);
        }
      }
    }

    function handleSend() {
      var text = (inputField.value || '').trim();
      if (!text || isLoading) return;
      
      if (!userState.isPaid && userState.remaining <= 0) {
        showLimitReachedMessage();
        return;
      }

      addMessageToUI('user', text, true);
      inputField.value = '';
      setLoading(true);

      // Build API messages from chat history
      var apiMessages = chatHistory.map(function(m) {
        return {
          role: m.role === 'bot' ? 'assistant' : 'user',
          content: m.content
        };
      });

      fetch(WORKER_URL + '/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages,
          userToken: userState.userToken,
          isPaid: userState.isPaid
        })
      })
      .then(function(res) {
        if (!res.ok) {
          return res.json().then(function(errData) {
            throw new Error(errData.error || 'Request failed: ' + res.status);
          });
        }
        return res.json();
      })
      .then(function(data) {
        if (data.error === 'limit_reached') {
          userState.remaining = 0;
          updateUsageUI();
          showLimitReachedMessage();
          setLoading(false);
          return;
        }
        
        if (data.error) {
          throw new Error(data.error);
        }

        var responseContent = data.content || data.answer || "I'm here to help, but I couldn't parse that response. Try asking again.";
        addMessageToUI('bot', responseContent, true);
        
        // Update usage from response
        if (data.usage) {
          userState.used = data.usage.used;
          userState.remaining = data.usage.remaining;
          userState.unlimited = data.usage.unlimited;
          updateUsageUI();
        }
        setLoading(false);
      })
      .catch(function(error) {
        console.error('Chat Error:', error);
        addMessageToUI('bot', "I'm having trouble connecting. Please try again in a moment.", true);
        setLoading(false);
      });
    }

    function playAudio(text, button) {
      // If already playing this button, stop it
      if (currentAudioButton === button && currentAudio) {
        stopCurrentAudio();
        return;
      }

      stopCurrentAudio();

      currentAudioButton = button;
      button.innerHTML = '⏳ Loading...';
      button.classList.add('loading');

      // Strip markdown/HTML for cleaner audio
      var cleanText = text
        .replace(/[#*`_~\[\]]/g, '')
        .replace(/<[^>]+>/g, '')
        .substring(0, 4000); // Limit text length for TTS

      fetch(WORKER_URL + '/audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: cleanText,
          userToken: userState.userToken,
          isPaid: userState.isPaid
        })
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Audio request failed: ' + response.status);
        }
        return response.blob();
      })
      .then(function(blob) {
        if (blob.size === 0) {
          throw new Error('Empty audio blob received');
        }
        
        var audioUrl = URL.createObjectURL(blob);
        var audio = new Audio(audioUrl);
        currentAudio = audio;
        
        audio.oncanplaythrough = function() {
          if (currentAudio !== audio) {
            URL.revokeObjectURL(audioUrl);
            return;
          }
          
          button.innerHTML = '⏹️ Stop';
          button.classList.remove('loading');
          button.classList.add('playing');
          audio.play().catch(function(playErr) {
            console.error('Audio play error:', playErr);
            stopCurrentAudio();
          });
        };
        
        audio.onended = function() {
          URL.revokeObjectURL(audioUrl);
          if (currentAudioButton === button) {
            button.innerHTML = '🔊 Listen';
            button.classList.remove('loading', 'playing');
            currentAudio = null;
            currentAudioButton = null;
          }
        };
        
        audio.onerror = function(e) {
          console.error('Audio element error:', e);
          URL.revokeObjectURL(audioUrl);
          stopCurrentAudio();
        };
        
        audio.load();
      })
      .catch(function(error) {
        console.error('Audio fetch error:', error);
        button.innerHTML = '🔊 Listen';
        button.classList.remove('loading', 'playing');
        currentAudioButton = null;
      });
    }

    function isQuizPage() {
      // Check URL parameters for blocked unit IDs
      try {
        var urlParams = new URLSearchParams(window.location.search);
        var unitId = urlParams.get('unit');
        if (unitId && BLOCKED_UNIT_IDS.indexOf(unitId) !== -1) {
          return true;
        }
      } catch (e) {
        // URLSearchParams might not be supported in older browsers
      }
      
      // Check for quiz-related DOM elements
      var quizSelectors = [
        '.quiz-container', '.quiz-wrapper', '.quiz-question', '.assessment-container', 
        '.exam-container', '[data-quiz]', '[data-assessment]', '.lw-quiz', '.learning-activity-quiz',
        'div[class*="quiz"]', 'div[class*="exam"]', 'div[class*="assessment"]'
      ];
      
      for (var i = 0; i < quizSelectors.length; i++) {
        try {
          if (document.querySelector(quizSelectors[i])) {
            return true;
          }
        } catch (e) {
          // Invalid selector, skip
        }
      }
      return false;
    }

    function hideWidget() {
      container.style.display = 'none';
    }

    function checkAndHideOnQuiz() {
      if (isQuizPage()) {
        hideWidget();
        return true;
      }
      return false;
    }

    // Event Listeners
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleChat();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleChat();
      });
    }

    if (hideForeverLink) {
      hideForeverLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Hide the AI tutor on all pages? You can re-enable it later by clearing your browser storage.')) {
          hideWidgetPermanently();
        }
      });
    }

    sendBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleSend();
    });

    inputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
      document.body.style.overflow = '';
      stopCurrentAudio();
    });

    // Handle visibility changes (tab switching)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden && currentAudio) {
        // Optionally pause audio when tab is hidden
        // currentAudio.pause();
      }
    });

    function init() {
      // Check if widget should be hidden permanently
      if (shouldHideWidget()) {
        hideWidget();
        return;
      }

      // Check if on quiz page
      if (checkAndHideOnQuiz()) {
        return;
      }

      // Detect LearnWorlds user
      var lwUser = detectLearnWorldsUser();
      userState.userId = lwUser.userId;
      userState.email = lwUser.email;
      userState.isPaid = lwUser.isPaid;
      userState.userToken = lwUser.userId || generateAnonymousToken();
      
      // Restore chat history from session storage
      try {
        var saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          chatHistory = JSON.parse(saved);
        }
      } catch (e) {
        chatHistory = [];
      }
      
      // Fetch usage and initialize UI
      fetchUsage().then(function() {
        renderHistory();
        updateUsageUI();
        
        // Check if panel should be hidden for this session
        if (shouldHidePanel()) {
          chatWindow.style.display = 'none';
          isWidgetOpen = false;
        }
      });
      
      // Set upgrade link
      if (upgradeLink) {
        upgradeLink.href = UPGRADE_URL;
      }
      
      console.log('StudyBuddy: Initialized successfully, version ' + VERSION);
    }

    // Initialize
    init();
    
    // Re-check for quiz page after dynamic content loads
    setTimeout(checkAndHideOnQuiz, 1500);
    setTimeout(checkAndHideOnQuiz, 3500);
    
    // Also listen for SPA navigation if applicable
    window.addEventListener('popstate', function() {
      setTimeout(checkAndHideOnQuiz, 500);
    });
  });
})();
</script>