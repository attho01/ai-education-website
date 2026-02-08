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
    initAnimations();
    initStatsAnimation();
    initCourseButtons();
    initHeroButtons();
    initJobMatching();
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

// 토스트 알림 표시 함수
// type: 'success', 'error', 'info' 중 하나
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');

    // 토스트 요소 생성
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    container.appendChild(toast);

    // 약간의 딜레이 후 보이기 (CSS 애니메이션 트리거)
    setTimeout(() => toast.classList.add('show'), 10);

    // 3초 후 자동으로 사라짐
    setTimeout(() => {
        toast.classList.remove('show');
        // 애니메이션 완료 후 DOM에서 제거
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// 성공 메시지 표시 함수
function showSuccessMessage() {
    showToast('문의가 성공적으로 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.', 'success');
}

// 에러 메시지 표시 함수
function showErrorMessage(message) {
    showToast(message, 'error');
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

// 강의 카드 클릭 이벤트 초기화 함수
function initCourseButtons() {
    const courseButtons = document.querySelectorAll('.course-card .btn-small');

    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;

            // 강의 상세 정보 표시 (실제로는 모달이나 새 페이지로 이동)
            showToast(`"${courseTitle}" 강의 상세 페이지가 준비 중입니다.`, 'info');
        });
    });
}

// ==========================================
// 히어로 섹션 버튼 이벤트
// ==========================================

// 히어로 버튼 이벤트 초기화 함수
function initHeroButtons() {
    const primaryBtn = document.querySelector('.hero-buttons .btn-primary');
    const secondaryBtn = document.querySelector('.hero-buttons .btn-secondary');

    // 수강 신청 버튼 → 문의 섹션으로 스크롤
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 강의 둘러보기 버튼 → 강의 섹션으로 스크롤
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            const coursesSection = document.getElementById('courses');
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

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
// suffix: 숫자 뒤에 붙는 접미사 (예: "+", "%")
// prefix: 숫자 앞에 붙는 접두사 (예: "₩")
function animateCounter(element, target, suffix, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps 기준
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            // 애니메이션 종료 시 원래 포맷으로 표시 (예: "5,000+")
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            // 진행 중에는 천 단위 콤마와 접미사 포함 표시
            element.textContent = Math.floor(current).toLocaleString() + suffix;
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
                        // 숫자 부분과 접미사 분리 (예: "5,000+" → 5000, "+")
                        const number = parseInt(text.replace(/[^0-9]/g, ''));
                        const suffix = text.replace(/[0-9,]/g, ''); // "+", "%" 등 추출

                        if (!isNaN(number)) {
                            stat.textContent = '0' + suffix;
                            animateCounter(stat, number, suffix);
                        }
                    });

                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(statsSection);
    }
}

// initStatsAnimation은 메인 DOMContentLoaded에서 호출됨

// ==========================================
// 직업 매칭 시스템
// ==========================================

// 유비의 프로필 데이터
// 유비의 관심사, 기술, 성향 등을 정의
const yubiProfile = {
    // 이름
    name: '유비',
    // 보유 기술 (각 기술에 숙련도 점수 1~5)
    skills: [
        { name: 'ChatGPT', level: 4 },
        { name: '프롬프트 엔지니어링', level: 4 },
        { name: 'Midjourney', level: 3 },
        { name: 'Stable Diffusion', level: 2 },
        { name: '콘텐츠 제작', level: 4 },
        { name: '데이터 분석', level: 2 },
        { name: 'SNS 마케팅', level: 3 },
        { name: '영상 편집', level: 2 },
        { name: 'Python 기초', level: 2 },
        { name: '기획서 작성', level: 3 }
    ],
    // 관심 분야
    interests: ['AI 기술', '이미지 생성', '콘텐츠 크리에이션', '교육', '마케팅'],
    // 성향 키워드
    personality: ['창의적', '소통 능력 우수', '꼼꼼함', '자기주도적', '팀워크'],
    // 희망 근무 형태
    preferredWorkType: '하이브리드',
    // 희망 연봉 범위 (만원 단위)
    salaryRange: { min: 3000, max: 5000 },
    // 경력 수준
    experienceLevel: '신입~1년',
    // 희망 지역
    preferredLocation: '서울'
};

// 채용공고 데이터베이스
// 다양한 AI 관련 채용공고 목록
const jobPostings = [
    {
        id: 1,
        title: 'AI 프롬프트 엔지니어',
        company: '(주)스마트AI 솔루션',
        location: '서울 강남구',
        workType: '하이브리드',
        salary: { min: 3500, max: 5000 },
        experienceLevel: '신입~3년',
        description: 'ChatGPT, Claude 등 대규모 언어모델을 활용한 프롬프트 설계 및 최적화 업무를 담당합니다.',
        requiredSkills: ['ChatGPT', '프롬프트 엔지니어링', '콘텐츠 제작', '기획서 작성'],
        preferredSkills: ['Python 기초', '데이터 분석'],
        keywords: ['AI 기술', '콘텐츠 크리에이션'],
        postedDate: '2026-02-05',
        deadline: '2026-03-05'
    },
    {
        id: 2,
        title: 'AI 콘텐츠 크리에이터',
        company: '크리에이티브 랩스',
        location: '서울 마포구',
        workType: '하이브리드',
        salary: { min: 3000, max: 4500 },
        experienceLevel: '신입~2년',
        description: 'AI 도구를 활용하여 블로그, SNS, 영상 등 다양한 콘텐츠를 기획하고 제작합니다.',
        requiredSkills: ['ChatGPT', '콘텐츠 제작', 'SNS 마케팅'],
        preferredSkills: ['Midjourney', '영상 편집', '프롬프트 엔지니어링'],
        keywords: ['콘텐츠 크리에이션', '마케팅', 'AI 기술'],
        postedDate: '2026-02-03',
        deadline: '2026-02-28'
    },
    {
        id: 3,
        title: 'AI 이미지 디자이너',
        company: '비주얼 스튜디오 코리아',
        location: '서울 성수동',
        workType: '재택근무',
        salary: { min: 3200, max: 4800 },
        experienceLevel: '1년~3년',
        description: 'Midjourney, Stable Diffusion 등 AI 이미지 생성 도구를 활용한 디자인 업무를 수행합니다.',
        requiredSkills: ['Midjourney', 'Stable Diffusion', '프롬프트 엔지니어링'],
        preferredSkills: ['콘텐츠 제작', '영상 편집'],
        keywords: ['이미지 생성', 'AI 기술', '콘텐츠 크리에이션'],
        postedDate: '2026-02-01',
        deadline: '2026-02-25'
    },
    {
        id: 4,
        title: 'AI 교육 강사 (주니어)',
        company: 'AI Academy',
        location: '서울 강남구',
        workType: '하이브리드',
        salary: { min: 3000, max: 4000 },
        experienceLevel: '신입~2년',
        description: '생성형 AI 교육 과정의 강의 보조 및 수강생 멘토링을 담당합니다. AI 도구 실습을 지도합니다.',
        requiredSkills: ['ChatGPT', '프롬프트 엔지니어링', 'Midjourney'],
        preferredSkills: ['콘텐츠 제작', 'Stable Diffusion', '기획서 작성'],
        keywords: ['교육', 'AI 기술', '콘텐츠 크리에이션'],
        postedDate: '2026-02-07',
        deadline: '2026-03-10'
    },
    {
        id: 5,
        title: 'AI 마케팅 스페셜리스트',
        company: '디지털 마케팅 그룹',
        location: '서울 역삼동',
        workType: '출근',
        salary: { min: 3500, max: 5500 },
        experienceLevel: '1년~3년',
        description: 'AI 도구를 활용하여 디지털 마케팅 캠페인을 기획하고 실행합니다.',
        requiredSkills: ['ChatGPT', 'SNS 마케팅', '콘텐츠 제작', '데이터 분석'],
        preferredSkills: ['Midjourney', '영상 편집'],
        keywords: ['마케팅', 'AI 기술', '콘텐츠 크리에이션'],
        postedDate: '2026-02-06',
        deadline: '2026-03-01'
    },
    {
        id: 6,
        title: 'AI 제품 기획자 (PM)',
        company: '테크스타트업 이노베이트',
        location: '서울 판교',
        workType: '하이브리드',
        salary: { min: 4000, max: 6000 },
        experienceLevel: '2년~5년',
        description: 'AI 기반 서비스의 제품 기획 및 프로젝트 매니징을 담당합니다.',
        requiredSkills: ['기획서 작성', 'ChatGPT', '데이터 분석'],
        preferredSkills: ['프롬프트 엔지니어링', 'Python 기초'],
        keywords: ['AI 기술'],
        postedDate: '2026-02-04',
        deadline: '2026-03-15'
    },
    {
        id: 7,
        title: 'AI 챗봇 운영 담당자',
        company: '고객서비스 AI',
        location: '서울 종로구',
        workType: '출근',
        salary: { min: 2800, max: 3800 },
        experienceLevel: '신입',
        description: 'AI 기반 챗봇 시스템의 운영 및 프롬프트 관리, 응답 품질 개선 업무를 수행합니다.',
        requiredSkills: ['ChatGPT', '프롬프트 엔지니어링'],
        preferredSkills: ['데이터 분석', '기획서 작성', '콘텐츠 제작'],
        keywords: ['AI 기술'],
        postedDate: '2026-02-07',
        deadline: '2026-02-28'
    },
    {
        id: 8,
        title: 'SNS 콘텐츠 매니저 (AI 활용)',
        company: '브랜드 커뮤니케이션즈',
        location: '서울 홍대',
        workType: '하이브리드',
        salary: { min: 3000, max: 4200 },
        experienceLevel: '신입~2년',
        description: 'AI 도구를 활용하여 브랜드 SNS 콘텐츠를 기획, 제작, 관리합니다.',
        requiredSkills: ['SNS 마케팅', '콘텐츠 제작', 'ChatGPT'],
        preferredSkills: ['Midjourney', '영상 편집', '프롬프트 엔지니어링'],
        keywords: ['마케팅', '콘텐츠 크리에이션', 'AI 기술'],
        postedDate: '2026-02-02',
        deadline: '2026-02-20'
    },
    {
        id: 9,
        title: 'AI 데이터 라벨러 / 품질 관리자',
        company: '데이터웍스',
        location: '서울 구로구',
        workType: '재택근무',
        salary: { min: 2500, max: 3500 },
        experienceLevel: '신입',
        description: 'AI 학습 데이터의 라벨링 및 품질 관리 업무를 수행합니다.',
        requiredSkills: ['데이터 분석'],
        preferredSkills: ['ChatGPT', 'Python 기초'],
        keywords: ['AI 기술'],
        postedDate: '2026-01-28',
        deadline: '2026-02-15'
    },
    {
        id: 10,
        title: 'AI 기반 영상 편집자',
        company: '미디어 프로덕션 AI',
        location: '서울 상암동',
        workType: '출근',
        salary: { min: 3200, max: 4500 },
        experienceLevel: '1년~3년',
        description: 'AI 도구를 활용하여 유튜브, 광고 등 영상 콘텐츠를 편집하고 제작합니다.',
        requiredSkills: ['영상 편집', '콘텐츠 제작'],
        preferredSkills: ['Midjourney', 'Stable Diffusion', 'ChatGPT'],
        keywords: ['콘텐츠 크리에이션', '이미지 생성'],
        postedDate: '2026-02-06',
        deadline: '2026-03-06'
    }
];

// ==========================================
// 매칭 점수 계산 함수
// ==========================================

// 유비의 프로필과 채용공고를 비교하여 적합도 점수를 계산하는 함수
// 반환값: 0~100 사이의 매칭 점수
function calculateMatchScore(profile, job) {
    // 총 점수를 저장할 변수 (각 항목별 가중치를 적용)
    let totalScore = 0;
    // 최대 가능 점수
    let maxScore = 0;

    // --- 1단계: 필수 기술 매칭 (가중치: 40점) ---
    const skillWeight = 40;
    maxScore += skillWeight;

    // 채용공고의 필수 기술 중 유비가 보유한 기술 수를 센다
    let matchedRequiredSkills = 0;
    job.requiredSkills.forEach(function(requiredSkill) {
        // 유비의 기술 목록에서 해당 기술을 찾는다
        const userSkill = profile.skills.find(function(s) {
            return s.name === requiredSkill;
        });
        // 기술을 보유하고 있으면 숙련도에 따라 점수 부여
        if (userSkill) {
            matchedRequiredSkills += userSkill.level / 5; // 숙련도 비율 (0~1)
        }
    });

    // 필수 기술 매칭 비율을 점수로 변환
    if (job.requiredSkills.length > 0) {
        totalScore += (matchedRequiredSkills / job.requiredSkills.length) * skillWeight;
    }

    // --- 2단계: 우대 기술 매칭 (가중치: 15점) ---
    const preferredWeight = 15;
    maxScore += preferredWeight;

    let matchedPreferredSkills = 0;
    job.preferredSkills.forEach(function(preferredSkill) {
        const userSkill = profile.skills.find(function(s) {
            return s.name === preferredSkill;
        });
        if (userSkill) {
            matchedPreferredSkills += userSkill.level / 5;
        }
    });

    if (job.preferredSkills.length > 0) {
        totalScore += (matchedPreferredSkills / job.preferredSkills.length) * preferredWeight;
    }

    // --- 3단계: 관심 분야 매칭 (가중치: 20점) ---
    const interestWeight = 20;
    maxScore += interestWeight;

    // 채용공고의 키워드와 유비의 관심 분야가 얼마나 겹치는지 확인
    let matchedInterests = 0;
    job.keywords.forEach(function(keyword) {
        if (profile.interests.includes(keyword)) {
            matchedInterests++;
        }
    });

    if (job.keywords.length > 0) {
        totalScore += (matchedInterests / job.keywords.length) * interestWeight;
    }

    // --- 4단계: 근무 형태 매칭 (가중치: 10점) ---
    const workTypeWeight = 10;
    maxScore += workTypeWeight;

    if (job.workType === profile.preferredWorkType) {
        // 완전히 일치하면 만점
        totalScore += workTypeWeight;
    } else if (job.workType === '재택근무' || profile.preferredWorkType === '하이브리드') {
        // 재택근무는 하이브리드 선호자에게도 부분 점수
        totalScore += workTypeWeight * 0.5;
    }

    // --- 5단계: 연봉 범위 매칭 (가중치: 15점) ---
    const salaryWeight = 15;
    maxScore += salaryWeight;

    // 유비의 희망 연봉과 채용공고의 연봉 범위가 겹치는지 확인
    const salaryOverlap =
        job.salary.max >= profile.salaryRange.min &&
        job.salary.min <= profile.salaryRange.max;

    if (salaryOverlap) {
        // 겹치는 범위의 비율로 점수 계산
        const overlapMin = Math.max(job.salary.min, profile.salaryRange.min);
        const overlapMax = Math.min(job.salary.max, profile.salaryRange.max);
        const overlapRange = overlapMax - overlapMin;
        const totalRange = profile.salaryRange.max - profile.salaryRange.min;
        totalScore += (overlapRange / totalRange) * salaryWeight;
    }

    // 최종 점수를 0~100 사이로 변환하여 반환
    const finalScore = Math.round((totalScore / maxScore) * 100);
    return finalScore;
}

// ==========================================
// 매칭 결과 표시 함수
// ==========================================

// 유비의 프로필 태그를 화면에 표시하는 함수
function displayProfileTags() {
    // 기술 태그 표시
    const skillContainer = document.getElementById('skillTags');
    if (skillContainer) {
        skillContainer.innerHTML = '';
        yubiProfile.skills.forEach(function(skill) {
            const tag = document.createElement('span');
            tag.className = 'tag skill-tag';
            // 숙련도에 따라 태그 스타일 변경
            if (skill.level >= 4) {
                tag.classList.add('tag-high');
            } else if (skill.level >= 3) {
                tag.classList.add('tag-mid');
            } else {
                tag.classList.add('tag-low');
            }
            tag.textContent = skill.name + ' (' + skill.level + '/5)';
            skillContainer.appendChild(tag);
        });
    }

    // 관심 분야 태그 표시
    const interestContainer = document.getElementById('interestTags');
    if (interestContainer) {
        interestContainer.innerHTML = '';
        yubiProfile.interests.forEach(function(interest) {
            const tag = document.createElement('span');
            tag.className = 'tag interest-tag';
            tag.textContent = interest;
            interestContainer.appendChild(tag);
        });
    }

    // 성향 태그 표시
    const personalityContainer = document.getElementById('personalityTags');
    if (personalityContainer) {
        personalityContainer.innerHTML = '';
        yubiProfile.personality.forEach(function(trait) {
            const tag = document.createElement('span');
            tag.className = 'tag personality-tag';
            tag.textContent = trait;
            personalityContainer.appendChild(tag);
        });
    }
}

// 채용공고 카드 HTML을 생성하는 함수
function createJobCard(job, matchScore) {
    // 매칭 점수에 따른 등급 결정
    let matchGrade = '';
    let matchColor = '';
    if (matchScore >= 80) {
        matchGrade = '최적';
        matchColor = 'match-excellent';
    } else if (matchScore >= 60) {
        matchGrade = '우수';
        matchColor = 'match-good';
    } else if (matchScore >= 40) {
        matchGrade = '보통';
        matchColor = 'match-average';
    } else {
        matchGrade = '낮음';
        matchColor = 'match-low';
    }

    // 연봉 표시 포맷 (만원 → 만원 단위)
    const salaryText = job.salary.min.toLocaleString() + '만원 ~ ' + job.salary.max.toLocaleString() + '만원';

    // 필수 기술 중 유비가 보유한 것과 미보유한 것을 구분
    let skillsHtml = '';
    job.requiredSkills.forEach(function(skill) {
        const hasSkill = yubiProfile.skills.find(function(s) { return s.name === skill; });
        if (hasSkill) {
            skillsHtml += '<span class="tag tag-match">' + skill + '</span>';
        } else {
            skillsHtml += '<span class="tag tag-missing">' + skill + '</span>';
        }
    });

    // 우대 기술도 표시
    job.preferredSkills.forEach(function(skill) {
        const hasSkill = yubiProfile.skills.find(function(s) { return s.name === skill; });
        if (hasSkill) {
            skillsHtml += '<span class="tag tag-preferred-match">' + skill + ' (우대)</span>';
        }
    });

    // 카드 HTML 조립
    const cardHtml =
        '<div class="job-card">' +
            '<div class="job-card-header">' +
                '<div class="job-match-badge ' + matchColor + '">' +
                    '<span class="match-score">' + matchScore + '%</span>' +
                    '<span class="match-label">' + matchGrade + '</span>' +
                '</div>' +
                '<div class="job-title-area">' +
                    '<h3 class="job-title">' + job.title + '</h3>' +
                    '<p class="job-company">' + job.company + '</p>' +
                '</div>' +
            '</div>' +
            '<p class="job-description">' + job.description + '</p>' +
            '<div class="job-meta-info">' +
                '<span class="job-meta-item">📍 ' + job.location + '</span>' +
                '<span class="job-meta-item">💼 ' + job.workType + '</span>' +
                '<span class="job-meta-item">💰 ' + salaryText + '</span>' +
                '<span class="job-meta-item">📋 ' + job.experienceLevel + '</span>' +
            '</div>' +
            '<div class="job-skills">' +
                '<h4>요구/우대 기술</h4>' +
                '<div class="job-skill-tags">' + skillsHtml + '</div>' +
            '</div>' +
            '<div class="job-card-footer">' +
                '<span class="job-deadline">마감: ' + job.deadline + '</span>' +
                '<button class="btn-small job-apply-btn">지원하기</button>' +
            '</div>' +
        '</div>';

    return cardHtml;
}

// 매칭 실행 및 결과 표시 함수
function runJobMatching(sortBy) {
    // 각 채용공고에 대해 매칭 점수 계산
    const results = [];
    jobPostings.forEach(function(job) {
        const score = calculateMatchScore(yubiProfile, job);
        results.push({
            job: job,
            score: score
        });
    });

    // 정렬 기준에 따라 결과 정렬
    if (sortBy === 'match') {
        // 적합도 높은 순
        results.sort(function(a, b) { return b.score - a.score; });
    } else if (sortBy === 'salary') {
        // 최대 연봉 높은 순
        results.sort(function(a, b) { return b.job.salary.max - a.job.salary.max; });
    } else if (sortBy === 'recent') {
        // 최신 공고 순
        results.sort(function(a, b) {
            return new Date(b.job.postedDate) - new Date(a.job.postedDate);
        });
    }

    // 결과를 화면에 표시
    const resultsContainer = document.getElementById('jobResults');
    if (resultsContainer) {
        // 결과 요약 표시
        const highMatchCount = results.filter(function(r) { return r.score >= 60; }).length;
        let html = '<div class="results-summary">' +
            '<p>총 <strong>' + results.length + '개</strong>의 채용공고 중 ' +
            '<strong>' + highMatchCount + '개</strong>가 유비님과 높은 적합도를 보입니다.</p>' +
            '</div>';

        // 각 채용공고 카드 생성
        results.forEach(function(result) {
            html += createJobCard(result.job, result.score);
        });

        resultsContainer.innerHTML = html;

        // 지원하기 버튼에 이벤트 추가
        const applyButtons = resultsContainer.querySelectorAll('.job-apply-btn');
        applyButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const jobTitle = this.closest('.job-card').querySelector('.job-title').textContent;
                showToast('"' + jobTitle + '" 지원 페이지가 준비 중입니다.', 'info');
            });
        });
    }
}

// ==========================================
// 직업 매칭 초기화
// ==========================================

// 직업 매칭 섹션 초기화 함수
function initJobMatching() {
    // 유비 프로필 태그 표시
    displayProfileTags();

    // 매칭 시작 버튼 이벤트
    const matchBtn = document.getElementById('startMatchingBtn');
    if (matchBtn) {
        matchBtn.addEventListener('click', function() {
            const sortBy = document.getElementById('sortBy').value;
            // 매칭 실행
            runJobMatching(sortBy);
            // 버튼 텍스트 변경
            this.textContent = '다시 매칭하기';
            showToast('유비님에게 적합한 채용공고를 찾았습니다!', 'success');
        });
    }

    // 정렬 기준 변경 시 자동으로 다시 매칭
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // 이미 매칭 결과가 있는 경우에만 다시 정렬
            const resultsContainer = document.getElementById('jobResults');
            const hasResults = resultsContainer && !resultsContainer.querySelector('.job-results-placeholder');
            if (hasResults) {
                runJobMatching(this.value);
            }
        });
    }
}
