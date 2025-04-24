const buildNavigation = async () => {
  try {
    const response = await fetch('https://cdn.searchkings.ca/public-asset/js/test.json');
    const data = await response.json();
    const navigationItems = data.navigation;

    const navContainer = document.getElementById('navigation');
    if (!navContainer) return;

    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg';
    nav.style.backgroundColor = 'var(--brand-primary)'

    const container = document.createElement('div');
    container.className = 'container-fluid';

    // Toggler for mobile
    const toggler = document.createElement('button');
    toggler.className = 'navbar-toggler';
    toggler.type = 'button';
    toggler.setAttribute('data-bs-toggle', 'collapse');
    toggler.setAttribute('data-bs-target', '#navbarNav');
    toggler.setAttribute('aria-controls', 'navbarNav');
    toggler.setAttribute('aria-expanded', 'false');
    toggler.setAttribute('aria-label', 'Toggle navigation');
    toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
    container.appendChild(toggler);

    // Nav Links
    const collapse = document.createElement('div');
    collapse.className = 'collapse navbar-collapse';
    collapse.id = 'navbarNav';

    const ul = document.createElement('ul');
    ul.className = 'navbar-nav mx-auto';

    navigationItems
    .filter(item => item.label !== "Home") //  Skip "Home"
    .sort((a, b) => a.order - b.order)
    .forEach(item => {
      const li = document.createElement('li');

      // Dropdown for items with submenu
      if (item.submenu) {
        li.className = 'nav-item dropdown';

        const a = document.createElement('a');
        a.className = 'nav-link dropdown-toggle'
        a.setAttribute('data-bs-toggle', 'dropdown');
        a.href = item.url;
        a.setAttribute('role', 'button');
        a.setAttribute('data-bs-toggle', 'dropdown');
        a.setAttribute('aria-expanded', 'false');
        a.textContent = item.label;

        const dropdown = document.createElement('ul');
        dropdown.className = 'dropdown-menu';

        item.submenu.sort((a, b) => a.order - b.order).forEach(sub => {
          const subItem = document.createElement('li');
          const subLink = document.createElement('a');
          subLink.className = 'dropdown-item';
          subLink.href = sub.url;
          subLink.textContent = sub.label;
          subItem.appendChild(subLink);
          dropdown.appendChild(subItem);
        });

        li.appendChild(a);
        li.appendChild(dropdown);
      } else {
        li.className = 'nav-item mx-5';
        const a = document.createElement('a');
        a.className = 'nav-link';
        if (item.active) a.classList.add('active');
        a.href = item.url;
        a.textContent = item.label;
        li.appendChild(a);
      }

      ul.appendChild(li);
    });

    collapse.appendChild(ul);
    container.appendChild(collapse);
    nav.appendChild(container);
    navContainer.appendChild(nav);

  } catch (error) {
    console.error('Error loading navigation data:', error);
  }
};

document.addEventListener('DOMContentLoaded', buildNavigation);
