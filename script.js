// ===================== Mobile Menu Toggle ===================== //
document.addEventListener("DOMContentLoaded", () => {
    // Select using the new ID and class
    const navToggle = document.getElementById("menu-toggle");
    const menu = document.querySelector(".dropdown-menu");
    const links = document.querySelectorAll(".dropdown-menu a");

    if (navToggle && menu) {
        navToggle.addEventListener("click", () => {
            // "open" class triggers the X animation in CSS
            navToggle.classList.toggle("open");
            // "active" class shows the dropdown menu
            menu.classList.toggle("active");
        });

        // Close menu when clicking a link
        links.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
                navToggle.classList.remove("open");
            });
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!navToggle.contains(e.target) && !menu.contains(e.target) && menu.classList.contains("active")) {
                menu.classList.remove("active");
                navToggle.classList.remove("open");
            }
        });
    }

    // ===================== Floating Navbar Scroll Effect ===================== //
    const header = document.getElementById("main-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // ===================== SMOOTH SCROLL (LENIS) ===================== //
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease
        direction: 'vertical',
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with standard scroll links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            lenis.scrollTo(this.getAttribute('href'));
        });
    });

    // ===================== REVEAL ON SCROLL ===================== //
    window.initReveal = function () {
        const revealElements = document.querySelectorAll('.reveal:not(.active)');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    };

    // Initial run
    initReveal();
});

// ===================== Scroll To Top ===================== //
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 300);
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

/* =====================================================
    Count Up Stats Section – FULL WORKING VERSION
   ===================================================== */

// Selector helpers
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

// Easing function (Exponential Ease Out)
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/* ===================== Count Up Function ===================== */
const runCountUp = (element, endValue, duration = 2000) => {
    let frame = 0;
    const totalFrames = Math.round(duration / (1000 / 60));

    const animate = () => {
        frame++;
        const progress = easeOutExpo(frame / totalFrames);
        const value = Math.round(endValue * progress);

        element.textContent = value + "+";

        if (frame < totalFrames) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};

/* ===================== Initialize Stats Counting ===================== */
const initStatsCount = () => {
    const statCards = $$(".stat-card");
    if (!statCards.length) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const card = entry.target;
                const target = parseInt(card.dataset.target) || 0;
                const counterEl = $(".stat-count", card);

                if (counterEl) runCountUp(counterEl, target);

                obs.unobserve(card);
            });
        },
        { threshold: 0.50 },
    );

    statCards.forEach((card) => observer.observe(card));
};

/* ===================== INIT CALL ===================== */
document.addEventListener("DOMContentLoaded", () => {
    initStatsCount();
});


// ===================== chat bot ===================== //

document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("social-toggle-btn");
    const icons = document.querySelectorAll(".social-icon");
    const iconInsideBtn = toggleBtn.querySelector("i");

    let isOpen = false;

    // قيم التوزيع حسب الأيقونات بالترتيب
    const positions = [
        { x: 10, y: -85 }, // WhatsApp → فوق يمين
        { x: -60, y: -55 }, // Email → فوق شمال
        { x: -70, y: 10 }  // Phone → تحت شمال
    ];

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        isOpen = !isOpen;

        icons.forEach((icon, index) => {
            if (isOpen) {
                const { x, y } = positions[index];

                setTimeout(() => {
                    icon.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                    icon.style.opacity = "1";
                }, index * 80);

            } else {
                icon.style.transform = "translate(0,0) scale(0)";
                icon.style.opacity = "0";
            }
        });

        iconInsideBtn.className = isOpen ? "fas fa-times" : "fas fa-headset";
    });

    document.addEventListener("click", () => {
        if (!isOpen) return;

        isOpen = false;

        icons.forEach((icon) => {
            icon.style.transform = "translate(0,0) scale(0)";
            icon.style.opacity = "0";
        });

        iconInsideBtn.className = "fas fa-headset";
    });

});

// ===================== search ===================== //

// ===================== search ===================== //

document.addEventListener("DOMContentLoaded", () => {

    // Static Projects List (Expanded with full data)
    const staticProjects = [
        {
            title: "إنشاء فلل كومباوند في أسوان الجديدة",
            description: "تنفيذ فلل سكنية داخل كومباوند بمدينة أسوان الجديدة، تشمل أعمال الخرسانات والتشطيبات المتكاملة وفق أعلى معايير الجودة والدقة في التنفيذ.",
            images: [
                "image/project1.png",
                "https://i.postimg.cc/Kcn05LLy/11.png",
                "https://i.postimg.cc/mkRNnXMk/6.png",
                "https://i.postimg.cc/j5vLsZmY/2.png",
                "https://i.postimg.cc/CKFPZK5v/7.png",
                "https://i.postimg.cc/8zL9J3Hw/5.png",
                "https://i.postimg.cc/VN6hG6w0/3.png"
            ]
        },
        {
            title: "فلل الشريط النهري بأسوان الجديدة",
            description: "تنفيذ مجمع فلل سكنية بالشريط النهري في أسوان الجديدة بتصميمات عصرية وتشطيبات متكاملة عالية الجودة.",
            images: [
                "image/project2.png",
                "https://i.postimg.cc/yY5y94yx/12.png",
                "https://i.postimg.cc/sXQVMWjG/10.png",
                "https://i.postimg.cc/J03GPFy8/13.png"
            ]
        },
        {
            title: "الإسكان المميز في طريق العقاد",
            description: "مشروع الاسكان المميز مشروع سكني كبير ومتكامل يقع في منطقة العقاد بمدينة أسوان هو أحد ابرز المشلروعات الإسكانية التي تنفذ علي مدار سنوات طويلة وستهدف توفير وحدات سكنية للمواطنين في المحافظة.",
            images: [
                "image/project3.png",
                "https://i.postimg.cc/Kjd76wfJ/22.png",
                "https://i.postimg.cc/Bv5kZc1b/15.png",
                "https://i.postimg.cc/c1kjJJ6s/16.png",
                "https://i.postimg.cc/pLKkHWgB/21.png",
                "https://i.postimg.cc/25jM6Ldb/17.png"
            ]
        },
        {
            title: "مشروع الإسكان لعمائر كلابشة فطيرة",
            description: "توسعة ضخمة لخطوط الإنتاج الصناعي، مع التركيز على الكفاءة التشغيلية ومعايير السلامة القصوى.",
            images: [
                "image/project4.png",
                "https://i.postimg.cc/VLWBGGMr/23.png",
                "https://i.postimg.cc/NGW1jh8P/18.png",
                "https://i.postimg.cc/Y9zJqNZQ/20.png"
            ]
        }
    ];

    // Static Articles List
    const staticArticles = [
        {
            title: "دليلك لاختيار طوب البناء المناسب: الأساس اللي بيتبني عليه كل شيء",
            category: "بناء",
            type: "article",
            slug: "طوب",
            date: "1 فبراير 2026",
            image: "image-article/brick.png",
            content: "الطوب هو العمود الفقري لأي مبنى. تعرف على أنواع الطوب المختلفة (المصمت، المفرغ، الأحمر، الخرساني) وكيفية اختيار النوع الأنسب لمشروعك لضمان متانة وعزل مثاليين."
        },
        {
            title: "الدليل الشامل لأعمال السباكة المنزلية: الأساس الخفي لراحة بيتك",
            category: "سباكة",
            type: "article",
            slug: "سباكة",
            date: "2 فبراير 2026",
            image: "image-article/Plum.png",
            content: "السباكة هي عصب الراحة في أي منزل. في هذا المقال، نوضح أهمية تأسيس السباكة بشكل صحيح، مراحل التنفيذ، وأخطر الأخطاء التي يجب تجنبها لضمان منزل خالٍ من المشاكل."
        },
        {
            title: "الدليل المتكامل لتشطيب الكهرباء باحترافية وجودة مضمونة",
            category: "كهرباء",
            type: "article",
            slug: "كهرباء",
            date: "3 فبراير 2026",
            image: "image-article/elic.png",
            content: "تشطيب الكهرباء مش مجرد توصيل أسلاك، لكنه عنصر أمان أساسي في أي بيت. في المقال ده بنوضح المراحل الصحيحة للتأسيس والتشطيب وأهم النصائح لضمان نظام كهربائي آمن ومستقر."
        },
        {
            title: "الخرسانة: دليل عملي من التنفيذ لحد الأساس",
            category: "خرسانات وإنشاءات",
            type: "article",
            slug: "الخرسانة",
            date: "4 فبراير 2026",
            image: "image-article/conc.png",
            content: "الخرسانة هي الأساس الحقيقي لأي مبنى. في الدليل ده بنوضح مكوناتها، أنواعها، وأهم عوامل الجودة من الصب لحد المعالجة، علشان تختار النوع المناسب وتبني مشروعك بثقة."
        },
        {
            title: "دليلك لاختيار أفضل نوع تشطيب لشقتك",
            category: "تشطيب",
            type: "article",
            slug: "تشطيب",
            date: "5 فبراير 2026",
            image: "image-article/fin.png",
            content: "اختيار مستوى التشطيب المناسب بيحدد شكل بيتك، راحتك، وقيمة استثمارك. في المقال ده بنوضح الفرق بين لوكس وسوبر لوكس وديلوكس ونص تشطيب علشان تختار الصح بثقة."
        }
    ];


    // ===================== Articles Sync ===================== //
    let visibleArticlesCount = 6;
    const loadMoreBtnArticles = document.querySelector("#load-more-btn-articles");
    const paginationWrapper = document.querySelector("#articles-pagination-wrapper");

    function renderArticles() {
        const homeGrid = document.querySelector("#home-articles-grid");
        const articlesIndexGrid = document.querySelector("#articles-grid");
        const aboutArticlesGrid = document.querySelector("#about-articles-grid");

        if (!homeGrid && !articlesIndexGrid && !aboutArticlesGrid) return;

        const path = decodeURIComponent(window.location.pathname);
        const isArticlesInnerFolder = path.includes("/مقالات/") && !path.endsWith("/مقالات/index.html") && !path.endsWith("/مقالات/");
        const isArticlesIndex = path.includes("/مقالات/index.html") || path.endsWith("/مقالات/");
        const isSubfolder = path.includes("/من نحن/") || path.includes("/المشاريع/");

        let pathPrefix = "مقالات/";
        if (isArticlesIndex) pathPrefix = "";
        if (isArticlesInnerFolder) pathPrefix = "../";
        if (isSubfolder) pathPrefix = "../مقالات/";

        // Root Prefix for assets like images that are in the root directory
        let rootPrefix = "";
        if (isArticlesIndex) rootPrefix = "../";
        if (isSubfolder) rootPrefix = "../";
        if (isArticlesInnerFolder) rootPrefix = "../../";

        const generateCard = (article, index, isHome = false) => {
            const delay = index * 100;
            const articleLink = article.customLink ? `${pathPrefix}${article.customLink}` : `${pathPrefix}${article.slug}/`;

            // If article.image exists, use it. Otherwise fallback to placeholders.
            // If it's a local path (not starting with http), prepend rootPrefix.
            let imageUrl = article.image || `https://picsum.photos/600/400?random=${10 + index}`;
            if (article.image && !article.image.startsWith("http")) {
                imageUrl = rootPrefix + article.image;
            }

            if (isHome) {
                return `
                    <article class="bg-primary rounded-xl overflow-hidden shadow-lg group reveal ${delay ? 'delay-' + delay : ''}">
                        <div class="h-48 overflow-hidden">
                            <img src="${imageUrl}"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="${article.title}">
                        </div>
                        <div class="p-6">
                            <div class="text-xs text-text-muted mb-2">${article.date || 'فبراير 2026'}</div>
                            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2">${article.title}</h3>
                            <a href="${articleLink}" class="text-sm text-accent hover:underline">اقرأ المزيد</a>
                        </div>
                    </article>
                `;
            } else {
                return `
                    <article class="bg-primary rounded-xl overflow-hidden shadow-lg border border-white/5 group hover:-translate-y-2 hover:shadow-strong-dark transition-all duration-300 reveal ${delay ? 'delay-' + delay : ''}">
                        <div class="relative h-60 overflow-hidden">
                            <img src="${imageUrl}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <span class="absolute bottom-4 right-4 bg-secondary/80 backdrop-blur text-white text-xs px-3 py-1 rounded-full">${article.category}</span>
                        </div>
                        <div class="p-6">
                            <div class="text-xs text-text-muted mb-2"><i class="far fa-clock ml-1"></i> ${article.date || 'فبراير 2026'}</div>
                            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                ${article.title}
                            </h3>
                            <p class="text-text-muted text-sm line-clamp-3 mb-4 leading-relaxed">
                                ${article.content}
                            </p>
                            <a href="${article.slug}/" class="text-accent text-sm font-bold hover:underline">المزيد من التفاصيل</a>
                        </div>
                    </article>
                `;
            }
        };

        if (homeGrid) {
            // Show latest 3 articles on homepage
            const latestArticles = [...staticArticles].reverse().slice(0, 3);
            homeGrid.innerHTML = latestArticles.map((art, idx) => generateCard(art, idx, true)).join('');
        }

        if (aboutArticlesGrid) {
            // Show same as homepage for About Us (Latest 3)
            const latestArticles = [...staticArticles].reverse().slice(0, 3);
            aboutArticlesGrid.innerHTML = latestArticles.map((art, idx) => generateCard(art, idx, true)).join('');
        }

        if (articlesIndexGrid) {
            // Show latest articles first in the index as well
            const articlesToShow = [...staticArticles].reverse().slice(0, visibleArticlesCount);
            articlesIndexGrid.innerHTML = articlesToShow.map((art, idx) => generateCard(art, idx, false)).join('');

            // Handle Pagination Visibility
            if (paginationWrapper) {
                if (staticArticles.length > visibleArticlesCount) {
                    paginationWrapper.classList.remove("hidden");
                } else {
                    paginationWrapper.classList.add("hidden");
                }
            }
        }

        // Re-initialize reveal animations for new elements
        if (window.initReveal) window.initReveal();
    }

    if (loadMoreBtnArticles) {
        loadMoreBtnArticles.addEventListener("click", () => {
            visibleArticlesCount += 3;
            renderArticles();
        });
    }

    renderArticles();

    // ===================== Dynamic Hero Image Injection ===================== //
    function injectHeroImage() {
        const heroImg = document.getElementById("article-hero-img");
        if (!heroImg) return;

        // 1. Get current slug from URL (e.g., .../مقالات/طوب/index.html -> "طوب")
        // 1. Get current slug from URL (e.g., .../مقالات/طوب/index.html -> "طوب")
        const path = decodeURIComponent(window.location.pathname);
        // Split by / and find the segment before /index.html
        const parts = path.split('/');
        // Handle both /slug/index.html and /slug/
        let slug = parts[parts.length - 2];
        if (parts[parts.length - 1] !== "index.html" && parts[parts.length - 1] !== "") {
            slug = parts[parts.length - 1];
        }

        // 2. Find article in staticArticles
        const currentArticle = staticArticles.find(a => decodeURIComponent(slug) === a.slug);

        // 3. Update Image Source
        if (currentArticle && currentArticle.image) {
            let imageUrl = currentArticle.image;

            // Logic to handle relative paths from inside an article folder (needs ../../)
            if (!imageUrl.startsWith("http")) {
                // If the image path defined in script.js is like "image-ar/1.png"
                // And we are in "مقالات/طوب/index.html"
                // We need "../../image-ar/1.png"
                imageUrl = "../../" + imageUrl;
            }

            heroImg.src = imageUrl;
        }
    }

    // Run injection
    injectHeroImage();


    // ===================== Projects Sync ===================== //
    let visibleProjectsCount = 6;
    const loadMoreBtnProjects = document.querySelector("#load-more-projects");

    function renderProjects() {
        const projectGrid = document.querySelector("#project-container");
        const aboutProjectsGrid = document.querySelector("#about-projects-grid");

        if (!projectGrid && !aboutProjectsGrid) return;

        const path = decodeURIComponent(window.location.pathname);
        const isArticlesInnerFolder = path.includes("/مقالات/") && !path.endsWith("/مقالات/index.html") && !path.endsWith("/مقالات/");
        const isArticlesIndex = path.includes("/مقالات/index.html") || path.endsWith("/مقالات/");
        const isSubfolder = path.includes("/من-نحن/") || path.includes("/المشاريع/");

        let rootPrefix = "";
        if (isArticlesIndex || isSubfolder) rootPrefix = "../";
        if (isArticlesInnerFolder) rootPrefix = "../../";

        const generateProjectCard = (project, index) => {
            const delay = index * 100;
            const processedImages = project.images.map(img => img.startsWith("http") ? img : rootPrefix + img);
            const imagesData = JSON.stringify(processedImages).replace(/'/g, "&apos;");

            return `
                <div class="project-card relative group overflow-hidden rounded-lg shadow-xl opacity-0 translate-y-5 transition-all duration-700 reveal ${delay ? 'delay-' + delay : ''}">
                    <img src="${processedImages[0]}" 
                         class="w-full h-64 object-cover transition duration-500 group-hover:scale-110" />

                    <div class="absolute inset-0 bg-primary/70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-500">
                        <h4 class="text-2xl font-bold text-accent">${project.title}</h4>

                        <a href="#" class="open-project mt-2 text-sm font-semibold text-accent-dark hover:text-accent"
                            data-title="${project.title}" 
                            data-description="${project.description || ''}"
                            data-images='${imagesData}'>
                            تفاصيل المشروع <i class="fas fa-arrow-left mr-2"></i>
                        </a>
                    </div>
                </div>
            `;
        };

        if (projectGrid) {
            const projectsToShow = staticProjects.slice(0, visibleProjectsCount);
            projectGrid.innerHTML = projectsToShow.map((p, idx) => generateProjectCard(p, idx)).join('');

            if (loadMoreBtnProjects) {
                if (staticProjects.length > visibleProjectsCount) {
                    loadMoreBtnProjects.classList.remove("hidden");
                } else {
                    loadMoreBtnProjects.classList.add("hidden");
                }
            }
        }

        if (aboutProjectsGrid) {
            // Show top 3 featured projects on About Us page
            const featuredProjects = staticProjects.slice(0, 3);
            aboutProjectsGrid.innerHTML = featuredProjects.map((p, idx) => generateProjectCard(p, idx)).join('');
        }

        // Re-initialize reveal animations for new elements
        if (window.initReveal) window.initReveal();
    }

    if (loadMoreBtnProjects) {
        loadMoreBtnProjects.addEventListener("click", () => {
            visibleProjectsCount += 3;
            renderProjects();
        });
    }

    renderProjects();

    // Loading reveal animations
    if (window.initReveal) window.initReveal();
});


// ====================== CONTRACTING-STYLE MODAL ====================== //

const modal = document.getElementById("project-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalBox = document.getElementById("modal-box");
const closeBtn = document.getElementById("close-modal");

const modalImage = document.getElementById("modal-image");
const imageFadeLayer = document.getElementById("image-fade-layer");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalExtra = document.getElementById("modal-extra");
const modalFeatures = document.getElementById("modal-features");

const nextBtn = document.getElementById("next-img");
const prevBtn = document.getElementById("prev-img");

let images = [];
let imageIndex = 0;
let autoSlider;

if (modal) {
    const closeModal = () => {
        if (modalOverlay) modalOverlay.classList.add("opacity-0");
        if (modalBox) {
            modalBox.classList.remove("active");
            modalBox.classList.add("scale-90", "opacity-0");
        }

        document.querySelectorAll(".reveal-item").forEach(item => item.classList.remove("active"));

        setTimeout(() => {
            modal.classList.add("hidden");
            stopAutoSlider();
        }, 500);
    };

    const updateModalImage = (src) => {
        if (!modalImage || !imageFadeLayer) return;
        imageFadeLayer.classList.replace("opacity-0", "opacity-100");
        setTimeout(() => {
            modalImage.src = src;
            imageFadeLayer.classList.replace("opacity-100", "opacity-0");
        }, 400);
    };

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".open-project");
        if (!btn) return;
        e.preventDefault();

        // 1. Populate Content
        if (modalTitle) modalTitle.textContent = btn.dataset.title;
        if (modalDescription) modalDescription.textContent = btn.dataset.description;

        // 2. Contact Section (New)
        const modalContact = document.getElementById("modal-contact");
        if (modalContact) {
            modalContact.innerHTML = `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <a href="tel:+201003110809" class="flex items-center justify-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-accent transition-all group">
                        <i class="fas fa-phone-alt text-accent"></i>
                        <span class="text-white font-bold">01003110809</span>
                    </a>
                    <a href="https://wa.me/201003110809" target="_blank" class="flex items-center justify-center gap-3 bg-[#25D366]/10 p-4 rounded-2xl border border-[#25D366]/20 hover:border-[#25D366] transition-all group">
                        <i class="fab fa-whatsapp text-[#25D366]"></i>
                        <span class="text-white font-bold">واتساب</span>
                    </a>
                </div>
            `;
        }


        // Note: modalExtra and modalFeatures are intentionally left unpopulated or hidden via HTML

        // 4. Slider
        images = JSON.parse(btn.dataset.images || "[]");
        imageIndex = 0;
        if (modalImage) modalImage.src = images[0] || "";

        // Generate Dots
        const indicatorsContainer = document.getElementById("modal-indicators");
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = images.map((_, idx) => `
                <button class="modal-dot w-3 h-3 rounded-full bg-white/50 transition-all duration-300 hover:bg-accent/80" 
                    onclick="window.setModalImage(${idx})"></button>
            `).join('');
            updateDots(0);
        }

        // 5. Open Animation (Center Scale)
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.querySelectorAll(".reveal-item").forEach(item => item.classList.remove("active"));

        setTimeout(() => {
            if (modalOverlay) modalOverlay.classList.remove("opacity-0");
            if (modalBox) {
                modalBox.classList.remove("scale-90", "opacity-0");
                modalBox.classList.add("active");
            }

            // Stagger Internal Content
            document.querySelectorAll(".reveal-item").forEach((item, idx) => {
                setTimeout(() => item.classList.add("active"), 300 + (idx * 100));
            });
        }, 10);

        startAutoSlider();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modalOverlay || e.target === modal) closeModal();
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
        if (images.length) {
            imageIndex = (imageIndex + 1) % images.length;
            updateModalImage(images[imageIndex]);
            updateDots(imageIndex);
            stopAutoSlider();
        }
    });
    if (prevBtn) prevBtn.addEventListener("click", () => {
        if (images.length) {
            imageIndex = (imageIndex - 1 + images.length) % images.length;
            updateModalImage(images[imageIndex]);
            updateDots(imageIndex);
            stopAutoSlider();
        }
    });
}

// ===================== AUTO SLIDER ===================== //
function startAutoSlider() {
    stopAutoSlider();
    if (images.length <= 1) return;
    autoSlider = setInterval(() => {
        imageIndex = (imageIndex + 1) % images.length;
        updateDots(imageIndex);
        const updateModalImageFade = (src) => {
            const modalImage = document.getElementById("modal-image");
            const imageFadeLayer = document.getElementById("image-fade-layer");
            if (!modalImage || !imageFadeLayer) return;

            imageFadeLayer.classList.replace("opacity-0", "opacity-100");
            setTimeout(() => {
                modalImage.src = src;
                imageFadeLayer.classList.replace("opacity-100", "opacity-0");
            }, 400);
        };
        updateModalImageFade(images[imageIndex]);
    }, 3000);
}

function stopAutoSlider() {
    if (autoSlider) clearInterval(autoSlider);
}

// DELETED OLD LOAD MORE (Integrated into renderProjects)

// ====================== GLOBAL QUOTE MODAL LOGIC ====================== //

window.openQuoteModal = function () {
    const modal = document.getElementById('quote-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeQuoteModal = function () {
    const modal = document.getElementById('quote-modal');
    if (modal) modal.classList.add('hidden');
};

window.sendToWhatsapp = function (e) {
    if (e) e.preventDefault();

    const nameEl = document.getElementById('w-name');
    const typeEl = document.getElementById('w-type');
    const msgEl = document.getElementById('w-message');

    if (!nameEl || !typeEl || !msgEl) return;

    const name = nameEl.value;
    const type = typeEl.value;
    const message = msgEl.value;

    // Your WhatsApp Number
    const phoneNumber = "201003110809";
    const text = `*طلب مشروع جديد*%0A%0A*الاسم:* ${name}%0A*نوع المشروع:* ${type}%0A*التفاصيل:* ${message}`;

    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    window.closeQuoteModal();
};

// ===================== HELPER FUNCTIONS FOR SLIDER ===================== //
function updateDots(index) {
    const dots = document.querySelectorAll(".modal-dot");
    dots.forEach((dot, idx) => {
        if (idx === index) {
            dot.classList.add("bg-accent", "scale-125");
            dot.classList.remove("bg-white/50");
        } else {
            dot.classList.remove("bg-accent", "scale-125");
            dot.classList.add("bg-white/50");
        }
    });
}

window.setModalImage = function (index) {
    if (index < 0 || index >= images.length) return;
    imageIndex = index;

    updateDots(index);
    stopAutoSlider(); // Stop auto when manual interaction
    // Restart auto slider after 10 seconds of inactivity
    setTimeout(startAutoSlider, 10000);

    const modalImage = document.getElementById("modal-image");
    const imageFadeLayer = document.getElementById("image-fade-layer");

    if (modalImage && imageFadeLayer) {
        imageFadeLayer.classList.replace("opacity-0", "opacity-100");
        setTimeout(() => {
            modalImage.src = images[imageIndex];
            imageFadeLayer.classList.replace("opacity-100", "opacity-0");
        }, 400);
    }
};

// Share Article Functionality
// Share Article Functionality
async function shareArticle() {
    // Ensure clean URL for sharing
    const cleanUrl = window.location.href.replace(/\/index\.html$/, '/');

    const shareData = {
        title: document.title,
        text: 'اقرأ هذا المقال المميز من مدونة الحسيني للمقاولات:',
        url: cleanUrl
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback: Copy to clipboard
        try {
            await navigator.clipboard.writeText(cleanUrl);
            alert('تم نسخ الرابط! يمكنك مشاركته الآن.');
        } catch (err) {
            console.error('Failed to copy specific link', err);
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = cleanUrl;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                alert('تم نسخ الرابط! يمكنك مشاركته الآن.');
            } catch (err) {
                prompt("انسخ الرابط يدوياً:", cleanUrl);
            }
            document.body.removeChild(textArea);
        }
    }
}
