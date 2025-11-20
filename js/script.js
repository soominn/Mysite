window.onload = () => {
    // 헤더
    const headerMenuItems = document.querySelectorAll('a.header__menu__item');
    const headerNav = document.querySelector('.header__nav');
    const headerToggle = document.querySelector('.header__toggle');
    headerMenuItems.forEach(headerMenuItem => {
        headerMenuItem.addEventListener('click', (e) => {
            headerMenuItems.forEach(headerMenuItem => {
                headerMenuItem.classList.remove('active');
            });
            headerMenuItem.classList.add('active');

            if(window.innerWidth <= 768) {
                headerNav.classList.remove('header__nav--open');
                const icon = headerToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                headerToggle.setAttribute('aria-label', '메뉴 열기');
            }
        });
    });

    headerToggle.addEventListener('click', () => {
        const isOpen = headerNav.classList.toggle('header__nav--open');
        const icon = headerToggle.querySelector('i');
        if (isOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // 홈으로
    const now = new Date();
    hour = now.getHours();
    hiMsg = '';
    if(6 <= hour && hour <= 12) {
        hiMsg = '좋은 아침입니다!';
    } else if(13 <= hour && hour <= 20) {
        hiMsg = '좋은 오후입니다!';
    } else {
        hiMsg = '좋은 저녁입니다!';
    }
    document.querySelector('.home__description').innerText = hiMsg;

    // 포트폴리오
    const categoryBtns = document.querySelectorAll('button.category');
    const projects = document.querySelectorAll('li.project');

    const allCount = document.querySelectorAll('li.project').length;
    const frontendCount = document.querySelectorAll('li.project--frontend').length;
    const mobileCount = document.querySelectorAll('li.project--mobile').length;
    const backendCount = document.querySelectorAll('li.project--backend').length;

    document.getElementById('category__count__all').innerText = allCount;
    document.getElementById('category__count__frontend').innerText = frontendCount;
    document.getElementById('category__count__mobile').innerText = mobileCount;
    document.getElementById('category__count__backend').innerText = backendCount;

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(btn => {
                btn.classList.remove('category--selected');
            });
            btn.classList.add('category--selected');

            projects.forEach(project => {
                project.style.display = 'none';
                project.classList.remove('project--show');
            });

            projects.forEach(project => {
                let shouldShow = false;

                if(btn.classList.contains('category--all')) {
                    shouldShow = true;
                } else if(btn.classList.contains('category--frontend') && project.classList.contains('project--frontend')) {
                    shouldShow = true;
                } else if(btn.classList.contains('category--mobile') && project.classList.contains('project--mobile')) {
                    shouldShow = true;
                } else if(btn.classList.contains('category--backend') && project.classList.contains('project--backend')) {
                    shouldShow = true;
                }

                if(shouldShow) {
                    project.style.display = 'block';

                    project.classList.remove('project--show');
                    void project.offsetWidth;
                    project.classList.add('project--show');
                }
            });
        });
    });

    // 모달
    const modal = document.getElementById('projectModal');
    const modalImg = modal.querySelector('.project-modal__img');
    const modalTitle = modal.querySelector('.project-modal__title');
    const modalDesc = modal.querySelector('.project-modal__desc');
    const modalCloseBtn = modal.querySelector('.project-modal__close');
    const modalOverlay = modal.querySelector('.project-modal__overlay');

    document.querySelectorAll('.project a').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const project = link.closest('.project');
            const img = project.querySelector('.project__img');
            const title = project.querySelector('.project__title');
            const desc = project.querySelector('.project__metadata p');

            modalImg.src = img.src;
            modalImg.alt = img.alt || '';
            modalTitle.textContent = title ? title.textContent : 'Project';
            modalDesc.textContent = desc ? desc.textContent : '';

            modal.classList.add('show');
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // 테마 변경
    const themeToggleBtn = document.querySelector('.theme__toggle');
    const root = document.documentElement;

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });

    // arrow up
    document.querySelector('.arrow-up').onclick = () => {
        headerMenuItems.forEach(headerMenuItem => {
            headerMenuItem.classList.remove('active');
        });
        headerMenuItems[0].classList.add('active');
    };
}