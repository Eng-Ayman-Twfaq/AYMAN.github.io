// تهيئة تأثيرات الحركة
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-quad'
  });

  document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // تفعيل زر اللغة
            const langToggle = document.getElementById('langToggle');
            const langText = document.getElementById('langText');
            const translations = {
              ar: {
                "pageTitleindex": "أيمن توفيق للبرمجيات | تطوير مواقع وتطبيقات احترافية",
                 "pageTitleab": "من هو أيمن توفيق | مطور برمجيات ومهندس تقني",
                  "pageTitlep": "مشاريعي البرمجية | أيمن توفيق للبرمجيات",
                logo: 'أيمن توفيق',
                home: 'الرئيسية',
                about: 'من أنا',
                projects: 'المشاريع',
                skills: 'المهارات',
                contact: 'تواصل معي',
                welcome: 'أهلاً، أنا أيمن توفيق',
                description: 'مطور ومهندس تقني متخصص في بناء حلول متكاملة: من المواقع والتطبيقات وحتى الأنظمة المدمجة.',
                exploreSkills: 'تعرف على مجالاتي',
                cv: 'السيرة الذاتية',
                aboutTitle: 'نبذة عني',
                aboutMeText: 'أنا مطور ومهندس تقني من اليمن، أعمل على تطوير المواقع باستخدام Laravel وReact، وأبني تطبيقات الهواتف باستخدام Flutter، بالإضافة إلى خبرتي في تحليل وتصميم قواعد البيانات، وبرمجة أنظمة أردوينو وربطها بالحساسات والتطبيقات.',
                skillsTitle: 'تخصصاتي التقنية',
                laravelTitle: 'Laravel',
                laravelDesc: 'تطوير تطبيقات ويب قوية باستخدام Laravel، REST APIs، وأمان متقدم.',
                flutterTitle: 'Flutter',
                flutterDesc: 'تطبيقات Android وiOS بواجهة مستخدم احترافية وأداء عالي.',
                dbTitle: 'تحليل قواعد البيانات',
                dbDesc: 'تصميم قواعد بيانات معقدة، نمذجة ERD وتحسين الأداء.',
                arduinoTitle: 'Arduino',
                arduinoDesc: 'برمجة أنظمة مدمجة وربط الحساسات والتحكم بالأجهزة الذكية.',
                webTitle: 'تطوير الويب',
                webDesc: 'مواقع متجاوبة باستخدام HTML, CSS, JS, وPHP/MySQL',
                mapTitle: 'موقعي الجغرافي',
                contactTitle: 'تواصل معي',
                whatsapp: 'واتساب: ',
                github: 'GitHub: ',
                email: 'البريد: ',
                copyright: '© 2025 أيمن توفيق عبدالودود - جميع الحقوق محفوظة',
                 aboutTitle: 'من أنا؟',
    aboutMeText: 'أنا <strong style="color: var(--primary-color);">أيمن توفيق عبدالودود</strong> من اليمن 🇾🇪، مبرمج ومهندس تقني محترف متخصص في تطوير الحلول البرمجية المتكاملة.',
    aboutExpertise: 'أمتلك خبرة في عدة مجالات تقنية منها:',
    liLaravel: 'تطوير المواقع باستخدام Laravel و PHP',
    liFlutter: 'بناء تطبيقات الموبايل باستخدام Flutter',
    liArduino: 'برمجة الأنظمة الذكية والتحكم باستخدام Arduino',
    liDB: 'تحليل وتصميم قواعد البيانات بكفاءة',
    liPM: 'إدارة المشاريع التقنية ومشاركات مفتوحة المصدر',
    liReact: 'تطوير واجهات المستخدم باستخدام React.js',
    liIoT: 'حلول IoT والأنظمة المدمجة',
    journeyTitle: 'رحلتي المهنية',
    startYear: '2019 - البداية',
    startDesc: 'كانت انطلاقتي في عالم البرمجة من خلال تعلم لغة C++ وبناء الأساسيات المنطقية والخوارزميات البرمجية.',
    dbYear: '2020 - قواعد البيانات',
    dbDesc: 'تعلمت تحليل وتصميم قواعد البيانات، ونمذجة البيانات باستخدام ERD وربطها بالتطبيقات عبر SQL و MySQL.',
    csharpYear: '2021 - C#',
    csharpDesc: 'التعمق في برمجة تطبيقات سطح المكتب باستخدام C# و .NET Framework وإنشاء واجهات مستخدم متقدمة.',
    arduinoYear: '2022 - Arduino',
    arduinoDesc: 'برمجة المتحكمات وربط الأنظمة الذكية باستخدام الحساسات وتقنيات IoT وإنشاء مشاريع عملية.',
    laravelYear: '2023 - Laravel',
    laravelDesc: 'بناء مواقع وتطبيقات ويب احترافية باستخدام Laravel و MySQL وإنشاء واجهات برمجة API متكاملة.',
    flutterYear: '2024 - Flutter',
    flutterDesc: 'تطوير تطبيقات Android و iOS متعددة الواجهات والوظائف باستخدام Flutter وإنشاء تطبيقات كاملة.',
    projectsTitle: 'مشاريعي',
    projectsDesc: 'مجموعة من المشاريع التي قمت بتطويرها باستخدام تقنيات متعددة، بعضها مفتوح المصدر على GitHub',
    viewProject: 'عرض المشروع',
    code: 'الكود',
    project1Title: 'لوحة تحكم متكاملة',
    project1Desc: 'نظام إدارة شامل يحتوي على تطبيق للعملاء للتسوق، تطبيق للتجار لإدارة المخزون والطلبات، وخدمات سحابية باستخدام Firebase وMySQL.',
    project2Title: 'تطبيق Flutter للتجار',
    project2Desc: 'تطبيق متكامل لإدارة متجر ExplorePC يتيح للتجار إدارة المنتجات، متابعة الطلبات، وعرض إحصائيات المبيعات والربح.',
    project3Title: 'روبوت تتبع الإنسان الذكي',
    project3Desc: 'روبوت ذكي يستخدم مستشعرات الموجات فوق الصوتية وIR لتتبع الأشخاص تلقائيًا. يعتمد على أردوينو ويتضمن تحكمًا دقيقًا بمحركات DC وسيرفو، مثالي للتطبيقات التعليمية.',
    project4Title: 'تطبيق ExplorePC',
    project4Desc: 'منصة متكاملة لبيع أجهزة الحواسيب وملحقاتها وقطع الغيار، مع نظام دفع إلكتروني وتتبع للطلبات.',
    project5Title: 'Yemen Fleet - لوحة تحكم الأدمن',
    project5Desc: 'نظام متكامل لإدارة أساطيل الشركات في اليمن يتيح للمسؤولين إدارة الشركات، الاشتراكات، وعرض إحصائيات النظام.',
    project6Title: 'لوحة تحكم Yemen Fleet',
    project6Desc: 'نظام احترافي لإدارة أسطول النقل مخصص للشركات اليمنية. يشمل تتبع الشاحنات، إدارة السائقين، متابعة الطلبات، وتحليلات الأداء.',
    project7Title: 'تطبيق Yemen Fleet - العميل',
    project7Desc: 'تطبيق موبايل يسمح للعملاء بطلب المنتجات وتتبع الشحنات، مع دعم للدفع الإلكتروني وتقييم المنتجات مبني باستخدام Flutter API.',
    project8Title: 'تطبيق Yemen Fleet - السائق',
    project8Desc: 'تطبيق مخصص للسائقين لإدارة الطلبات واستقبالها، عرض الطرق المثلى، وتتبع الموقع بشكل حي. مبني باستخدام Flutter وGoogle Maps.',
    project9Title: 'نظام إدارة مطعم شواية البلدي',
    project9Desc: 'تطبيق مكتبي متكامل لإدارة حسابات العمال، المنتجات، والمبيعات باستخدام C# وSQL Server وتقارير Crystal Reports.',
    project10Title: 'المساعد الصوتي العربي - Ayman Voice Assistant',
    project10Desc: 'تطبيق ذكي بواجهة رسومية عربية يعتمد على تقنيات الذكاء الاصطناعي للتفاعل الصوتي الطبيعي باللغة العربية. يتيح تنفيذ أوامر مثل البحث، عرض الوقت، تشغيل الموسيقى، والمزيد.',
    copyright: '© 2025 أيمن توفيق عبدالودود - جميع الحقوق محفوظة',
    "pageTitles": "مهاراتي البرمجية | أيمن توفيق للبرمجيات",
    "metaDescription": "استعرض المهارات البرمجية والتقنية التي يتميز بها أيمن توفيق، من تطوير الواجهات إلى البرمجة الخلفية وبناء التطبيقات المتقدمة.",
    "skillsHeader": "<i class='fas fa-laptop-code'></i> مهاراتي التقنية",
    "skillsDescription": "مجموعة المهارات والخبرات التي اكتسبتها خلال رحلتي في عالم البرمجة والتطوير",
    "mobileDevTitle": "<i class='fas fa-mobile-alt'></i> تطوير الموبايل",
    "flutterTitle": "Flutter",
    "flutterDesc": "تطوير تطبيقات Android و iOS متكاملة مع واجهات مستخدم جذابة وأداء عالي",
    "flutterPercent": "95%",
    "backendTitle": "<i class='fas fa-server'></i> تطوير الواجهة الخلفية",
    "laravelTitle": "Laravel",
    "laravelDesc": "بناء تطبيقات ويب آمنة مع RESTful APIs وإدارة قواعد البيانات",
    "laravelPercent": "90%",
    "phpTitle": "PHP",
    "phpDesc": "برمجة خوادم الويب وإنشاء أنظمة إدارة المحتوى المخصصة",
    "phpPercent": "85%",
    "databaseTitle": "<i class='fas fa-database'></i> قواعد البيانات والتحليل",
    "dbAnalysisTitle": "تحليل قواعد البيانات",
    "dbAnalysisDesc": "تصميم قواعد بيانات متكاملة مع تحسين الأداء والاستعلامات",
    "dbAnalysisPercent": "92%",
    "dataAnalysisTitle": "تحليل البيانات",
    "dataAnalysisDesc": "تحليل مجموعات البيانات الكبيرة وإنشاء تقارير مرئية",
    "dataAnalysisPercent": "80%",
    "iotTitle": "<i class='fas fa-microchip'></i> أنظمة IoT والإلكترونيات",
    "arduinoTitle": "Arduino",
    "arduinoDesc": "برمجة المتحكمات وربط الحساسات مع الأنظمة الذكية",
    "arduinoPercent": "85%",
    "frontendTitle": "<i class='fas fa-code'></i> تطوير الواجهة الأمامية",
    "htmlCssTitle": "HTML & CSS",
    "htmlCssDesc": "بناء واجهات مستخدم متجاوبة وجذابة مع أحدث معايير الويب",
    "htmlCssPercent": "88%",
    "jsTitle": "JavaScript",
    "jsDesc": "إضافة التفاعلية والوظائف المتقدمة لتطبيقات الويب",
    "jsPercent": "80%",
    "copyright": "© 2025 أيمن توفيق عبدالودود - جميع الحقوق محفوظة",
    "pageTitle": "تواصل معي | أيمن توفيق للبرمجيات",
    "metaDescription": "هل لديك فكرة مشروع أو استفسار؟ تواصل مع أيمن توفيق، مطور برمجيات ومهندس تقني يقدم خدمات تطوير مواقع وتطبيقات احترافية.",
    "contactHeader": "<i class='fas fa-envelope-open-text'></i> تواصل معي",
    "contactDescription": "يمكنك التواصل معي عبر النموذج أدناه أو عبر وسائل التواصل الأخرى",
    "nameLabel": "<i class='fas fa-user'></i> الاسم الكامل",
    "namePlaceholder": "أدخل اسمك الكامل",
    "emailLabel": "<i class='fas fa-envelope'></i> البريد الإلكتروني",
    "emailPlaceholder": "example@mail.com",
    "subjectLabel": "<i class='fas fa-tag'></i> الموضوع",
    "subjectPlaceholder": "اختر موضوع الرسالة",
    "consultationOption": "استشارة تقنية",
    "projectOption": "عرض مشروع",
    "employmentOption": "عرض توظيف",
    "otherOption": "استفسار آخر",
    "messageLabel": "<i class='fas fa-comment'></i> الرسالة",
    "messagePlaceholder": "اكتب رسالتك هنا...",
    "submitBtn": "<i class='fas fa-paper-plane'></i> إرسال الرسالة",
    "locationTitle": "موقعي",
    "locationValue": "صنعاء، اليمن",
    "emailTitle": "البريد الإلكتروني",
    "emailLink": "ayman.tawfaq.developer@gmail.com",
    "whatsappTitle": "واتساب",
    "whatsappLink": "+967 770 883 615",
    "githubTitle": "GitHub",
    "githubLink": "Eng-Ayman-Twfaq",
    "whatsappFloat": "<i class='fab fa-whatsapp'></i>",
    "copyright": "© 2025 أيمن توفيق عبدالودود - جميع الحقوق محفوظة",
     "subjectLabel": "الخدمة المطلوبة",
    "subjectPlaceholder": "اختر الخدمة التي تحتاجها",
    "webDevelopmentOption": "تطوير موقع ويب",
    "mobileAppOption": "تطوير تطبيق جوال (Flutter)",
    "laravelDevelopmentOption": "برمجة Laravel",
    "embeddedSystemsOption": "برمجة أنظمة مدمجة (Arduino)",
    "databaseDesignOption": "تحليل وتصميم قواعد بيانات",
    "technicalConsultationOption": "استشارة تقنية",
    "otherServiceOption": "خدمة أخرى"
              },
              en: {
                 "pageTitleindex": "Ayman Tawfiq Software | Professional Website and App Development",
                  "pageTitleab": "Who is Ayman Tawfiq | Software Developer and Technical Engineer",
                  "pageTitlep": "My Software Projects | Ayman Tawfiq Software",
                logo: 'Ayman Tawfiq',
                home: 'Home',
                about: 'About',
                projects: 'Projects',
                skills: 'Skills',
                contact: 'Contact',
                welcome: 'Hello, I am Ayman Tawfiq',
                description: 'A technical developer and engineer specialized in building comprehensive solutions: from websites and applications to embedded systems.',
                exploreSkills: 'Explore My Skills',
                cv: 'Download CV',
                aboutTitle: 'About Me',
                aboutMeText: 'I am a developer and technical engineer from Yemen. I build websites using Laravel and React, mobile apps with Flutter, and have experience in database analysis/design and Arduino systems integration.',
                skillsTitle: 'My Technical Specializations',
                laravelTitle: 'Laravel',
                laravelDesc: 'Building robust web apps with Laravel, REST APIs, and advanced security.',
                flutterTitle: 'Flutter',
                flutterDesc: 'Android & iOS apps with professional UI and high performance.',
                dbTitle: 'Database Analysis',
                dbDesc: 'Designing complex databases, ERD modeling, and performance optimization.',
                arduinoTitle: 'Arduino',
                arduinoDesc: 'Embedded systems programming, sensor integration, and smart device control.',
                webTitle: 'Web Development',
                webDesc: 'Responsive websites using HTML, CSS, JS, and PHP/MySQL.',
                mapTitle: 'My Geographic Location',
                contactTitle: 'Contact Me',
                whatsapp: 'WhatsApp: ',
                github: 'GitHub: ',
                email: 'Email: ',
                copyright: '© 2025 Ayman Tawfiq Abdulwadood - All rights reserved',
                aboutTitle: 'About Me',
    aboutMeText: 'I am <strong style="color: var(--primary-color);">Ayman Tawfiq Abdulwadood</strong> from Yemen 🇾🇪, a professional developer and technical engineer specialized in integrated software solutions.',
    aboutExpertise: 'I have experience in several technical fields including:',
    liLaravel: 'Web development using Laravel & PHP',
    liFlutter: 'Mobile app development with Flutter',
    liArduino: 'Smart systems programming & control with Arduino',
    liDB: 'Efficient database analysis & design',
    liPM: 'Tech project management & open source contributions',
    liReact: 'UI development with React.js',
    liIoT: 'IoT solutions & embedded systems',
    journeyTitle: 'My Career Journey',
    startYear: '2019 - Getting Started',
    startDesc: 'My programming journey began by learning C++ and building logical foundations and algorithms.',
    dbYear: '2020 - Databases',
    dbDesc: 'Learned database analysis/design, ERD modeling, and integration with apps via SQL & MySQL.',
    csharpYear: '2021 - C#',
    csharpDesc: 'Advanced desktop app development with C# and .NET Framework, creating modern UIs.',
    arduinoYear: '2022 - Arduino',
    arduinoDesc: 'Microcontroller programming, smart systems integration with sensors and IoT projects.',
    laravelYear: '2023 - Laravel',
    laravelDesc: 'Building professional websites and web apps with Laravel & MySQL, creating full APIs.',
    flutterYear: '2024 - Flutter',
    flutterDesc: 'Developing multi-interface Android & iOS apps with Flutter.',
     projectsTitle: 'My Projects',
    projectsDesc: 'A collection of projects I have developed using various technologies, some are open source on GitHub',
    viewProject: 'View Project',
    code: 'Code',
    project1Title: 'Integrated Dashboard',
    project1Desc: 'A comprehensive management system with a shopping app for clients, a merchants app for inventory and orders, and cloud services using Firebase and MySQL.',
    project2Title: 'Flutter App for Merchants',
    project2Desc: 'A complete app for managing ExplorePC store, allowing merchants to manage products, track orders, and view sales and profit statistics.',
    project3Title: 'Smart Human Follower Robot',
    project3Desc: 'A smart robot using ultrasonic and IR sensors to automatically follow people. Based on Arduino with precise DC and servo motor control, ideal for educational applications.',
    project4Title: 'ExplorePC App',
    project4Desc: 'An integrated platform for selling computers, accessories, and spare parts, with online payment and order tracking.',
    project5Title: 'Yemen Fleet - Admin Dashboard',
    project5Desc: 'A comprehensive system for managing company fleets in Yemen, allowing admins to manage companies, subscriptions, and view system statistics.',
    project6Title: 'Yemen Fleet Dashboard',
    project6Desc: 'A professional fleet management system for Yemeni companies. Includes truck tracking, driver management, order tracking, and performance analytics.',
    project7Title: 'Yemen Fleet - Customer App',
    project7Desc: 'A mobile app for customers to order products and track shipments, with support for online payment and product rating, built with Flutter API.',
    project8Title: 'Yemen Fleet - Driver App',
    project8Desc: 'An app for drivers to manage and receive orders, view optimal routes, and live location tracking. Built with Flutter and Google Maps.',
    project9Title: 'Al-Baladi Restaurant Management System',
    project9Desc: 'A complete desktop app for managing staff accounts, products, and sales using C#, SQL Server, and Crystal Reports.',
    project10Title: 'Ayman Voice Assistant',
    project10Desc: 'An intelligent Arabic GUI app based on AI for natural voice interaction in Arabic. Supports commands like search, show time, play music, and more.',
    copyright: '© 2025 Ayman Tawfiq Abdulwadood - All rights reserved',
     "pageTitles": "My Technical Skills | Ayman Tawfiq Software",
    "metaDescription": "Explore the programming and technical skills possessed by Ayman Tawfiq, from frontend development to backend programming and building advanced applications.",
    "skillsHeader": "<i class='fas fa-laptop-code'></i> My Technical Skills",
    "skillsDescription": "A collection of skills and expertise I've gained throughout my journey in the world of programming and development",
    "mobileDevTitle": "<i class='fas fa-mobile-alt'></i> Mobile Development",
    "flutterTitle": "Flutter",
    "flutterDesc": "Developing comprehensive Android and iOS applications with attractive user interfaces and high performance",
    "flutterPercent": "95%",
    "backendTitle": "<i class='fas fa-server'></i> Backend Development",
    "laravelTitle": "Laravel",
    "laravelDesc": "Building secure web applications with RESTful APIs and database management",
    "laravelPercent": "90%",
    "phpTitle": "PHP",
    "phpDesc": "Web server programming and creating custom content management systems",
    "phpPercent": "85%",
    "databaseTitle": "<i class='fas fa-database'></i> Databases & Analysis",
    "dbAnalysisTitle": "Database Analysis",
    "dbAnalysisDesc": "Designing comprehensive databases with performance optimization and query tuning",
    "dbAnalysisPercent": "92%",
    "dataAnalysisTitle": "Data Analysis",
    "dataAnalysisDesc": "Analyzing large datasets and creating visual reports",
    "dataAnalysisPercent": "80%",
    "iotTitle": "<i class='fas fa-microchip'></i> IoT & Electronics",
    "arduinoTitle": "Arduino",
    "arduinoDesc": "Programming microcontrollers and connecting sensors with smart systems",
    "arduinoPercent": "85%",
    "frontendTitle": "<i class='fas fa-code'></i> Frontend Development",
    "htmlCssTitle": "HTML & CSS",
    "htmlCssDesc": "Building responsive and attractive user interfaces with the latest web standards",
    "htmlCssPercent": "88%",
    "jsTitle": "JavaScript",
    "jsDesc": "Adding interactivity and advanced functions to web applications",
    "jsPercent": "80%",
    "copyright": "© 2025 Ayman Tawfiq Abdulwadud - All Rights Reserved",
     "pageTitle": "Contact Me | Ayman Tawfiq Software",
    "metaDescription": "Do you have a project idea or inquiry? Contact Ayman Tawfiq, a software developer and technical engineer providing professional website and application development services.",
    "contactHeader": "<i class='fas fa-envelope-open-text'></i> Contact Me",
    "contactDescription": "You can contact me via the form below or through other communication channels",
    "nameLabel": "<i class='fas fa-user'></i> Full Name",
    "namePlaceholder": "Enter your full name",
    "emailLabel": "<i class='fas fa-envelope'></i> Email Address",
    "emailPlaceholder": "example@mail.com",
    "subjectLabel": "<i class='fas fa-tag'></i> Subject",
    "subjectPlaceholder": "Select message subject",
    "consultationOption": "Technical Consultation",
    "projectOption": "Project Proposal",
    "employmentOption": "Employment Offer",
    "otherOption": "Other Inquiry",
    "messageLabel": "<i class='fas fa-comment'></i> Message",
    "messagePlaceholder": "Write your message here...",
    "submitBtn": "<i class='fas fa-paper-plane'></i> Send Message",
    "locationTitle": "My Location",
    "locationValue": "Sana'a, Yemen",
    "emailTitle": "Email",
    "emailLink": "ayman.tawfaq.developer@gmail.com",
    "whatsappTitle": "WhatsApp",
    "whatsappLink": "+967 770 883 615",
    "githubTitle": "GitHub",
    "githubLink": "Eng-Ayman-Twfaq",
    "whatsappFloat": "<i class='fab fa-whatsapp'></i>",
    "copyright": "© 2025 Ayman Tawfiq Abdulwadud - All Rights Reserved",
     "subjectLabel": "Requested Service",
    "subjectPlaceholder": "Select the service you need",
    "webDevelopmentOption": "Web Development",
    "mobileAppOption": "Mobile App Development (Flutter)",
    "laravelDevelopmentOption": "Laravel Programming",
    "embeddedSystemsOption": "Embedded Systems Programming (Arduino)",
    "databaseDesignOption": "Database Analysis & Design",
    "technicalConsultationOption": "Technical Consultation",
    "otherServiceOption": "Other Service"
              }
            };

            


function updatePageLanguage(lang) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
}



            // تحديث لغة الصفحة
            function updatePageLanguage(lang) {
              document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                  element.innerHTML = translations[lang][key];
                }
              });
            }

            // تحميل اللغة المحفوظة أو الافتراضية
            let currentLang = localStorage.getItem('language') || 'ar';
            if (langText) langText.textContent = currentLang.toUpperCase();
            updatePageLanguage(currentLang);

            if (langToggle && langText) {
              langToggle.addEventListener('click', function() {
                currentLang = currentLang === 'ar' ? 'en' : 'ar';
                localStorage.setItem('language', currentLang);
                langText.textContent = currentLang.toUpperCase();
                updatePageLanguage(currentLang);
              });
            }

            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = mobileMenu?.querySelector('.mobile-overlay');
    
    function openMobileMenu() {
      mobileMenu?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
      mobileMenu?.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenu) {
      closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMobileMenu);
    }

     // إضافة تأثير التمرير
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      const header = document.querySelector('.main-header');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (header) {
        if (scrollTop > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      }
      
      lastScrollTop = scrollTop;
    });
    
    // إغلاق القائمة عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 992) {
        closeMobileMenu();
      }
    });

     // إغلاق القائمة عند النقر على الروابط
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // تغيير الوضع الليلي/النهاري
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.body.classList.toggle('light', savedTheme === 'light');
      document.body.classList.toggle('dark', savedTheme !== 'light');
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.remove(currentTheme);
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        // تحديث نص التولتيب إذا وجد
        const tooltip = this.closest('.theme-wrapper')?.querySelector('.tooltip');
        if (tooltip) {
          tooltip.textContent = newTheme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي';
        }
      });
    }

    const currentPage = location.pathname.split('/').pop();

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
        });
    // تفعيل زر القائمة للجوال
    
    
   
    
    // تحديث لغة الصفحة
    function updatePageLanguage(lang) {
      console.log(`تم تغيير اللغة إلى: ${lang === 'ar' ? 'العربية' : 'الإنجليزية'}`);
      
      // هنا يمكنك إضافة منطق تحديث المحتوى الفعلي
      const translations = {
        ar: {
          logo: 'أيمن توفيق',
          home: 'الرئيسية',
          about: 'من أنا',
          projects: 'المشاريع',
          skills: 'المهارات',
          contact: 'تواصل معي',
          welcome: 'أهلاً، أنا أيمن توفيق',
          description: 'مطور ومهندس تقني متخصص في بناء حلول متكاملة: من المواقع والتطبيقات وحتى الأنظمة المدمجة.',
          exploreSkills: 'تعرف على مجالاتي',
          cv: 'السيرة الذاتية',
          aboutTitle: 'نبذة عني',
          aboutMeText: 'أنا مطور ومهندس تقني من اليمن، أعمل على تطوير المواقع باستخدام Laravel وReact، وأبني تطبيقات الهواتف باستخدام Flutter، بالإضافة إلى خبرتي في تحليل وتصميم قواعد البيانات، وبرمجة أنظمة أردوينو وربطها بالحساسات والتطبيقات.',
          skillsTitle: 'تخصصاتي التقنية',
          laravelTitle: 'Laravel',
          laravelDesc: 'تطوير تطبيقات ويب قوية باستخدام Laravel، REST APIs، وأمان متقدم.',
          flutterTitle: 'Flutter',
          flutterDesc: 'تطبيقات Android وiOS بواجهة مستخدم احترافية وأداء عالي.',
          dbTitle: 'تحليل قواعد البيانات',
          dbDesc: 'تصميم قواعد بيانات معقدة، نمذجة ERD وتحسين الأداء.',
          arduinoTitle: 'Arduino',
          arduinoDesc: 'برمجة أنظمة مدمجة وربط الحساسات والتحكم بالأجهزة الذكية.',
          webTitle: 'تطوير الويب',
          webDesc: 'مواقع متجاوبة باستخدام HTML, CSS, JS, وPHP/MySQL',
          mapTitle: 'موقعي الجغرافي',
          contactTitle: 'تواصل معي',
          whatsapp: 'واتساب: ',
          github: 'GitHub: ',
          email: 'البريد: ',
          copyright: '© 2025 أيمن توفيق عبدالودود - جميع الحقوق محفوظة'
        },
        en: {
          logo: 'Ayman Tawfiq',
          home: 'Home',
          about: 'About',
          projects: 'Projects',
          skills: 'Skills',
          contact: 'Contact',
          welcome: 'Hello, I am Ayman Tawfiq',
          description: 'A technical developer and engineer specialized in building comprehensive solutions: from websites and applications to embedded systems.',
          exploreSkills: 'Explore My Skills',
          cv: 'Download CV',
          aboutTitle: 'About Me',
          aboutMeText: 'I am a developer and technical engineer from Yemen. I build websites using Laravel and React, mobile apps with Flutter, and have experience in database analysis/design and Arduino systems integration.',
          skillsTitle: 'My Technical Specializations',
          laravelTitle: 'Laravel',
          laravelDesc: 'Building robust web apps with Laravel, REST APIs, and advanced security.',
          flutterTitle: 'Flutter',
          flutterDesc: 'Android & iOS apps with professional UI and high performance.',
          dbTitle: 'Database Analysis',
          dbDesc: 'Designing complex databases, ERD modeling, and performance optimization.',
          arduinoTitle: 'Arduino',
          arduinoDesc: 'Embedded systems programming, sensor integration, and smart device control.',
          webTitle: 'Web Development',
          webDesc: 'Responsive websites using HTML, CSS, JS, and PHP/MySQL.',
          mapTitle: 'My Geographic Location',
          contactTitle: 'Contact Me',
          whatsapp: 'WhatsApp: ',
          github: 'GitHub: ',
          email: 'Email: ',
          copyright: '© 2025 Ayman Tawfiq Abdulwadood - All rights reserved'
        }
      };
      
      // تحديث العناصر حسب اللغة
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
          element.innerHTML = translations[lang][key];
        }
      });
    }
    
    
    
    // تفعيل الروابط الحالية
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  });

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    
    if (mobileMenu && mobileMenuToggle && 
        mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(event.target) && 
        !mobileMenuToggle.contains(event.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
  });

  // تأثير المطر
  const canvas = document.getElementById("flutterRain");
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  let drops = [];
  const chars = ["</>", "c++", "c#", "js", "db", "dart", "flutter", "python", "laravel", "html", "css", "php"];
  
  for (let i = 0; i < 50; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedY: 1 + Math.random() * 3,
      speedX: Math.random() * 0.5 - 0.25,
      text: chars[Math.floor(Math.random() * chars.length)],
      size: 14 + Math.random() * 10,
      opacity: 0.1 + Math.random() * 0.3
    });
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 16px Arial';
    drops.forEach((drop) => {
      ctx.font = `${drop.size}px Arial`;
      ctx.fillStyle = `rgba(0, 188, 212, ${drop.opacity})`;
      ctx.fillText(drop.text, drop.x, drop.y);
      drop.y += drop.speedY;
      drop.x += drop.speedX;
      if (drop.y > canvas.height) {
        drop.y = -20;
        drop.x = Math.random() * canvas.width;
      }
      if (drop.x > canvas.width || drop.x < 0) {
        drop.speedX = -drop.speedX;
      }
    });
    requestAnimationFrame(draw);
  }
  
  draw();
