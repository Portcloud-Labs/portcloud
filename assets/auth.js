(async function initAuth() {
  const AUTH_BASE = 'https://auth.portcloud.online';
  const container = document.getElementById('nav-auth');
  if (!container) return;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  try {
    const res = await fetch(`${AUTH_BASE}/api/me`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      return;
    }

    const user = await res.json();
    const displayName = user.display_name || user.github_login || user.email || 'User';
    const initial = displayName.charAt(0).toUpperCase();

    container.innerHTML = `
      <div class="nav-user-dropdown">
        <button class="nav-user-btn" type="button" aria-haspopup="true" aria-expanded="false" title="${escapeHtml(displayName)}">
          <span class="nav-user-avatar">${initial}</span>
          <span class="nav-user-name">${escapeHtml(displayName)}</span>
          <svg class="nav-user-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="nav-user-menu" hidden>
          <a class="nav-menu-item localized" href="https://notify.portcloud.online/app/dashboard">
            <span lang="zh-CN">Notify 控制台</span><span lang="en">Notify Console</span>
          </a>
          <a class="nav-menu-item localized" href="${AUTH_BASE}/account">
            <span lang="zh-CN">账号中心</span><span lang="en">Account</span>
          </a>
          <button class="nav-menu-item nav-logout-btn localized" type="button">
            <span lang="zh-CN">退出登录</span><span lang="en">Sign out</span>
          </button>
        </div>
      </div>
    `;

    const btn = container.querySelector('.nav-user-btn');
    const menu = container.querySelector('.nav-user-menu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !menu.hidden;
      menu.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
    });

    document.addEventListener('click', () => {
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    });

    const logoutBtn = container.querySelector('.nav-logout-btn');
    logoutBtn.addEventListener('click', async () => {
      try {
        await fetch(`${AUTH_BASE}/api/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      } finally {
        window.location.reload();
      }
    });

  } catch (err) {
    // network or cors fallback
  }
})();
