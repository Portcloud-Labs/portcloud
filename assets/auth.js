(async function initAuth() {
  const AUTH_BASE = 'https://auth.portcloud.online';
  const container = document.getElementById('nav-auth');
  if (!container) return;

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
        <button class="floating-control nav-user-btn" type="button" aria-expanded="false" aria-controls="nav-user-menu">
          <span class="nav-user-avatar" aria-hidden="true"></span>
          <span class="localized sr-only"><span lang="zh-CN">账号菜单</span><span lang="en">Account menu</span></span>
        </button>
        <div id="nav-user-menu" class="nav-user-menu" hidden>
          <p class="nav-user-name"></p>
          <a class="nav-menu-item localized nav-account-link" href="${AUTH_BASE}/account">
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
    container.querySelector('.nav-user-avatar').textContent = initial;
    container.querySelector('.nav-user-name').textContent = displayName;
    const accountUrl = new URL(`${AUTH_BASE}/account`);
    accountUrl.searchParams.set('return_to', window.location.href);
    container.querySelector('.nav-account-link').href = accountUrl.href;

    function setMenuOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    }

    btn.addEventListener('click', () => {
      setMenuOpen(menu.hidden);
    });

    document.addEventListener('click', (event) => {
      if (!container.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !menu.hidden) {
        setMenuOpen(false);
        btn.focus();
      }
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
