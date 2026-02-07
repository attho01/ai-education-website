// ==========================================
// 전역 변수 선언
// ==========================================

// 현재 활성화된 네비게이션 섹션을 추적하는 변수
let currentSection = 'home';

// ==========================================
// 페이지 로드 시 초기화
// ==========================================

// DOM이 완전히 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모든 초기화 함수 실행
    initNavigation();
    initScrollEffects();
    initFormValidation();
    initSmoothScroll();
    initAnimations();
});

// ==========================================
// 네비게이션 기능
// ==========================================

// 네비게이션 초기화 함수
function initNavigation() {
    // 모든 네비게이션 링크 가져오기
    const navLinks = document.querySelectorAll('.nav-link');

    // 각 링크에 클릭 이벤트 추가
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 활성 클래스 제거
            navLinks.forEach(l => l.classList.remove('active'));

            // 클릭한 링크에 활성 클래스 추가
            this.classList.add('active');

            // 해당 섹션으로 스크롤
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // 모바일 메뉴 닫기
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });

    // 모바일 메뉴 토글 기능
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// ==========================================
// 스크롤 효과
// ==========================================

// 스크롤 효과 초기화 함수
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        // 스크롤 위치가 100px 이상이면 navbar에 'scrolled' 클래스 추가
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 현재 보이는 섹션 감지 및 네비게이션 업데이트
        updateActiveSection();
    });
}

// 현재 활성 섹션 업데이트 함수
function updateActiveSection() {
    // 모든 섹션 가져오기
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // 각 섹션의 위치 확인
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute('id');

        // 섹션이 화면 중앙에 있는지 확인
        if (rect.top <= 150 && rect.bottom >= 150) {
            // 모든 링크에서 active 클래스 제거
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // 해당 섹션의 링크에 active 클래스 추가
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ==========================================
// 부드러운 스크롤
// ==========================================

// 부드러운 스크롤 초기화
function initSmoothScroll() {
    // 모든 앵커 링크에 부드러운 스크롤 적용
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // #만 있는 링크는 무시
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// 폼 검증
// ==========================================

// 폼 검증 초기화 함수
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 폼 데이터 수집
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                course: document.getElementById('course').value,
                message: document.getElementById('message').value
            };

            // 폼 유효성 검사
            if (validateForm(formData)) {
                // 폼 제출 성공 메시지
                showSuccessMessage();

                // 폼 초기화
                contactForm.reset();

                // 실제 서비스에서는 여기서 서버로 데이터 전송
                console.log('폼 데이터:', formData);
            }
        });
    }
}

// 폼 유효성 검사 함수
function validateForm(data) {
    // 이름 검증
    if (!data.name || data.name.trim().length < 2) {
        showErrorMessage('이름을 2자 이상 입력해주세요.');
        return false;
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('올바른 이메일 주소를 입력해주세요.');
        return false;
    }

    // 전화번호 검증
    const phoneRegex = /^[0-9-+() ]{8,}$/;
    if (!phoneRegex.test(data.phone)) {
        showErrorMessage('올바른 전화번호를 입력해주세요.');
        return false;
    }

    // 메시지 검증
    if (!data.message || data.message.trim().length < 10) {
        showErrorMessage('문의 내용을 10자 이상 입력해주세요.');
        return false;
    }

    return true;
}

// 성공 메시지 표시 함수
function showSuccessMessage() {
    alert('문의가 성공적으로 접수되었습니다!\n빠른 시일 내에 연락드리겠습니다.');
}

// 에러 메시지 표시 함수
function showErrorMessage(message) {
    alert(message);
}

// ==========================================
// 애니메이션 효과
// ==========================================

// 애니메이션 초기화 함수
function initAnimations() {
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // 애니메이션을 적용할 요소들
    const animatedElements = document.querySelectorAll(
        '.course-card, .instructor-card, .timeline-item'
    );

    // Observer 콜백 함수
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 보이면 페이드인 효과
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                // 약간의 지연 후 애니메이션 시작
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                // 한 번만 실행되도록 관찰 중지
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 모든 애니메이션 요소에 Observer 적용
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// 강의 카드 인터랙션
// ==========================================

// 강의 카드 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const courseButtons = document.querySelectorAll('.course-card .btn-small');

    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;

            // 강의 상세 정보 표시 (실제로는 모달이나 새 페이지로 이동)
            alert(`"${courseTitle}" 강의 상세 정보\n\n곧 자세한 내용을 확인하실 수 있습니다.`);
        });
    });
});

// ==========================================
// 히어로 섹션 버튼 이벤트
// ==========================================

// 페이지 로드 시 히어로 버튼 이벤트 설정
document.addEventListener('DOMContentLoaded', function() {
    const primaryBtn = document.querySelector('.hero-buttons .btn-primary');
    const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');

    // 수강 신청 버튼
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            // 문의 섹션으로 스크롤
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 강의 둘러보기 버튼
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            // 강의 섹션으로 스크롤
            const coursesSection = document.getElementById('courses');
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// ==========================================
// 유틸리티 함수
// ==========================================

// 디바운스 함수 (성능 최적화용)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 위치를 localStorage에 저장 (페이지 새로고침 시 복원용)
window.addEventListener('scroll', debounce(function() {
    localStorage.setItem('scrollPosition', window.scrollY);
}, 500));

// 페이지 로드 시 스크롤 위치 복원
window.addEventListener('load', function() {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
});

// ==========================================
// 강의 필터링 (추가 기능)
// ==========================================

// 강의 레벨별 필터링 함수
function filterCoursesByLevel(level) {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        const courseLevel = card.querySelector('.course-level').textContent;

        if (level === 'all' || courseLevel.includes(level)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// 다크 모드 토글 (선택적 기능)
// ==========================================

// 다크 모드 설정 확인 및 적용
function initDarkMode() {
    const darkModePreference = localStorage.getItem('darkMode');

    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// 다크 모드 토글 함수
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // 사용자 설정 저장
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// ==========================================
// 통계 카운터 애니메이션
// ==========================================

// 숫자 카운트업 애니메이션 함수
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps 기준
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 통계 섹션이 화면에 보일 때 카운터 애니메이션 실행
function initStatsAnimation() {
    const statsSection = document.querySelector('.hero-stats');

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = document.querySelectorAll('.stat-number');

                    // 각 통계 숫자에 애니메이션 적용
                    statNumbers.forEach(stat => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/[^0-9]/g, ''));

                        if (!isNaN(number)) {
                            stat.textContent = '0';
                            animateCounter(stat, number);
                        }
                    });

                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(statsSection);
    }
}

// 페이지 로드 시 통계 애니메이션 초기화
document.addEventListener('DOMContentLoaded', initStatsAnimation);
