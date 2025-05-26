// FILE: script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Countdown Timer ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const countdownDate = new Date("September 1, 2025 00:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "ヤミーヤミー大王カゲキン様、ついに降臨！世界は美味に包まれた！";
            }
        };
        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // --- Random Popup ---
    const popupElement = document.getElementById('random-popup');
    const popupMessageElement = document.getElementById('popup-message');
    const closeBtn = popupElement ? popupElement.querySelector('.close-btn') : null;

    if (popupElement && popupMessageElement && closeBtn) {
        const messages = [
            "あなたは監視されています…ニャ…",
            "ニャーニャー…ニャッニャッニャー！（訳：計画は順調だ）",
            "真実はいつもネコの中…そしてネコ缶の中にも…",
            "カゲキン様万歳！ヤミー！ヤミー！",
            "そのクリック、本当にあなたの意志ですか…？フフフ…",
            "我々のネットワークへようこそ…もう逃げられないニャ…",
            "猫の目で世界を見よ…さすれば真実が見える（かもしれない）"
        ];

        const showPopup = () => {
            const randomIndex = Math.floor(Math.random() * messages.length);
            popupMessageElement.textContent = messages[randomIndex];
            popupElement.style.display = 'block';
        };

        // Show popup after a random delay (e.g., 3-10 seconds)
        setTimeout(showPopup, Math.random() * 7000 + 3000);

        closeBtn.onclick = () => {
            popupElement.style.display = 'none';
        };
        // Close popup if clicked outside of content (optional)
        window.onclick = (event) => {
            if (event.target === popupElement) {
                popupElement.style.display = 'none';
            }
        };
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formResponseElement = document.getElementById('form-response');

    if (contactForm && formResponseElement) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const consent = document.getElementById('brainwash-consent').checked;

            let responseMessage = "";
            if (consent) {
                responseMessage = `ニャハハ！ ${name}よ、汝の魂、確かに受け取った！洗脳プログラムLv.1を開始する…まずは美味しい猫缶の夢を見よ…`;
                // You could add some more "evil" effects here
                document.body.style.filter = 'hue-rotate(90deg)';
                setTimeout(() => { document.body.style.filter = 'none'; }, 3000);
            } else {
                responseMessage = `フム… ${name}よ、メッセージは受信した。だが、真の理解にはまだ遠いようだな…猫の深淵を覗く勇気はあるかニャ？監視は続ける…`;
            }

            formResponseElement.textContent = responseMessage;
            formResponseElement.style.display = 'block';
            contactForm.reset(); // Clear the form
        });
    }

    // --- Add class to body for personality pages for specific styling ---
    // This helps simplify CSS for common elements on sub-pages
    const personalityPagePaths = [
        "kagekin_occultic.html", "kagekin_vtuber.html", "kagekin_yummyking.html",
        "kagekin_metaverse.html", "kagekin_philosophy.html", "kagekin_economy.html",
        "kagekin_utsufulls_manager.html", "kagekin_amnesia_vtuber.html", "kagekin_normal.html"
    ];
    const currentPagePath = window.location.pathname.split("/").pop();
    if (personalityPagePaths.includes(currentPagePath)) {
        document.body.classList.add('personality-page');
    }

    // --- Background Deco Elements Animation Enhancement (Optional) ---
    // This is a more complex way to randomize, CSS handles basic animation
    const decoElements = document.querySelectorAll('.bg-deco');
    decoElements.forEach(el => {
        // Randomize initial position slightly more if needed, or animation delays
        // el.style.animationDelay = `${Math.random() * 5}s`;
        // el.style.left = `${Math.random() * 90}%`; // Example of more JS based randomization
        // el.style.top = `${Math.random() * 90}%`;
    });

});
