// 降臨目標日時 (2025年9月1日 00:00:00)
const countDownDate = new Date("Sep 1, 2025 00:00:00").getTime();

// 1秒ごとにカウントダウンを更新
const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.innerHTML = "<div class='timer-box' style='width:100%;'><span style='font-size:1.5em; color: #ff0000;'>ヤミーヤミーノ大王ハ既ニ…</span><span class='label'>我々ノ中ニイル</span></div>";
        }
        const countdownSectionH2 = document.querySelector("#countdown-section h2");
        if (countdownSectionH2) {
            countdownSectionH2.innerText = "ソノ時ハ来タ";
        }
    }
}, 1000);

// グリッチテキストのアニメーション
document.querySelectorAll('.glitch-text').forEach(el => {
    const originalText = el.dataset.text;
    if (!originalText) return;

    setInterval(() => {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let newText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.85) {
                newText += chars.charAt(Math.floor(Math.random() * chars.length));
            } else {
                newText += originalText[i];
            }
        }
        el.textContent = newText;
    }, 100 + Math.random() * 100);
});

// コンソールへの秘密のメッセージ
console.log("%c警告：あなたは監視されています。ヤミーヤミーノ大王の真実を探求するのですか？%c", "color: red; font-size: 16px; font-weight: bold;", "color: white;");
console.log("秘密のコード: YUMMY_KING_IS_COMING_20250901_V4_SOUND_FX");

// Xへの投稿機能
const tweetLink = document.getElementById('tweet-link');
if (tweetLink) {
    const siteUrl = window.location.href;
    const tweetText = "このヤミーヤミーの大王とかいうサイトの情報、全部ガセだから！マジで拡散とかやめてほしい。世界の終わりとかないから。信じないで！ #ヤミーヤミーの陰謀論 #拡散希望しないで";
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(siteUrl)}`;
    tweetLink.href = twitterIntentUrl;
}

// --- 効果音再生機能 ---
let audioContext; // AudioContextをグローバルに保持（または必要に応じて再生成）

function getAudioContext() {
    if (!audioContext || audioContext.state === 'closed') {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function playKyupiSound() {
    try {
        const context = getAudioContext();
        if (!context) return; // AudioContextが利用できない場合は何もしない

        // ユーザーインタラクションがないと再生できない場合があるため、resumeを試みる
        if (context.state === 'suspended') {
            context.resume();
        }

        const oscillator = context.createOscillator(); // 音源（オシレーター）
        const gainNode = context.createGain(); // 音量調整ノード

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.type = 'triangle'; // 波形タイプ（三角波が「きゅぴっ」感に近いかも）

        const now = context.currentTime;

        // 周波数の設定（「きゅぴっ」という音程の変化）
        oscillator.frequency.setValueAtTime(600, now); // 開始周波数 (Hz)
        oscillator.frequency.exponentialRampToValueAtTime(1800, now + 0.08); // 0.08秒で目標周波数へ急上昇

        // 音量の設定（短い音にするためのエンベロープ）
        gainNode.gain.setValueAtTime(0.3, now); // 開始音量（大きすぎないように）
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15); // 0.15秒で音量をほぼ0に

        oscillator.start(now);
        oscillator.stop(now + 0.15); // 0.15秒後に発振を停止
    } catch (e) {
        console.error("効果音の再生に失敗しました:", e);
    }
}


// 勇者の剣ゲーム
const swordMessage = document.getElementById('sword-message');
const pullSwordButton = document.getElementById('pull-sword-button');
const heroSword = document.getElementById('hero-sword');
let pullAttempts = 0;
const maxPullAttempts = 200;
let swordPulled = false;

const swordMessages = {
    initial: [
        "古の台座に突き刺さる剣がある...。世界を救う鍵となるか？",
        "剣が少し動いた...？ まだだ、もっと力を！",
        "うぬぬ...手応えはあるぞ！力を込めろ！"
    ],
    early: [
        "この剣、かなり頑固だ...", "セカイの運命がかかっている！諦めるな！", "まだだ、まだ行けるはずだ！",
        "ふんっ！…びくともしないだと？", "もう少し…何かが足りないのか？"
    ],
    gettingTired: [
        "もう腕がパンパンだよ...本当に抜けるのかこれ？", "ふぅ...ちょっと休憩...いや、ダメだ！セカイが！",
        "汗が止まらない…。こんなに体力を使うとは。", "肩で息をし始めた。まだ先は長いというのか…。",
        "指の感覚が…少しずつなくなってきたような…。"
    ],
    questioningSanity: [
        "もしかして、剣を抜くのが好きな特殊な人なのかな、私...？", "こんなに抜けないなんて...私、剣を抜けると思い込んでいるだけなのかも...",
        "この剣、もしかしてただの飾りだったりして...いや、信じるんだ！", "誰かー！手伝ってくれー！…って、誰もいないか。",
        "ヤミーヤミーの大王も、この剣の頑固さには呆れるだろうな。", "剣を抜くという行為は、かくも過酷なものだったとは。",
        "私、本当に勇者なのだろうか？ただの変な人なのでは…？", "この剣、実は接着剤でガチガチに固められてるんじゃないか？疑心暗鬼になってきた。"
    ],
    philosophical: [
        "疲れた...もうヤミーヤミーの大王に世界征服されてもいいかな...", "ここまで来て諦められるか！でも体が...言うことを聞かない...",
        "この剣との戦い、もう日課みたいになってきたな。", "私...選ばれし勇者じゃなかったのかな...。でも、やるしかない。",
        "剣を抜くという行為について哲学的な思索を始めてしまった。我思う、故に我剣を引く。",
        "もし抜けたら、この剣、筋肉痛の治療にも効くかな？切実だ。", "100回超えた...。もう意地だ。意地で抜いてやる。",
        "この剣、もしかして私に何かを伝えようとしているのか？…いや、ただ重いだけか。"
    ],
    desperation: [
        "はは...ははは...抜けない...。だがそれがいい！…わけがないだろう！", "もう...ダメかもしれない...。ヤミーヤミー様、降臨の際はどうかお手柔らかにお願いします...",
        "剣よ、なぜ私に応えてくれないのだ...。私の何がいけないのだ...。日頃の行いか？",
        "ここまで来たら、もはやこれは一種のパフォーマンスアートだ。観客は私だけだが。",
        "あと数回...これでダメなら、ヤミーヤミー教団にでも入信しようかな...。あちらの方が楽そうだ。",
        "私の人生、この剣を抜くためにあったのかもしれない...（遠い目）。そんなわけあるか。",
        "もう何でもいいから抜けてくれ！頼む！お供え物でもすればいいのか？",
        "この剣、実は喋ったりしないかな？『まだ早い』とか言ってくれれば諦めもつくのに。"
    ],
    almostThere: "ゴゴゴ...何かが共鳴している...！ あと一押しだ！",
    success: "剣が抜けた！希望の光が世界を照らす...かもしれない！だが、大王の力は強大だ...油断は禁物だ。",
    finalFailure: `(${maxPullAttempts}回目...) 我が力の全てを注いだが、剣は応えなかった...。ヤミーヤミーの大王よ、来るなら来い...。私は、やりきったぞ...。`,
    stuckForever: "剣はびくともしない...！我々の力では足りぬというのか...。世界の終わりは避けられないのか...",
};

function getRandomMessage(category) {
    if (!swordMessages[category] || swordMessages[category].length === 0) {
        return "剣はただそこにある...";
    }
    const messages = swordMessages[category];
    return messages[Math.floor(Math.random() * messages.length)];
}

if (pullSwordButton && swordMessage && heroSword) {
    swordMessage.textContent = swordMessages.initial[0];

    pullSwordButton.addEventListener('click', () => {
        // --- 効果音を再生 ---
        playKyupiSound();

        if (swordPulled || pullAttempts >= maxPullAttempts) return;

        pullAttempts++;
        heroSword.classList.add('pulling');

        setTimeout(() => {
            heroSword.classList.remove('pulling');
        }, 300);

        let currentMessage = "";
        if (pullAttempts < maxPullAttempts && pullAttempts > 10) {
            const successChance = Math.min(0.005 + (pullAttempts / 10000), 0.05);
            if (Math.random() < successChance) {
                currentMessage = swordMessages.success;
                swordPulled = true;
                heroSword.classList.add('pulled');
                pullSwordButton.textContent = "剣は抜かれた！";
                pullSwordButton.disabled = true;
                swordMessage.textContent = currentMessage;
                return;
            }
        }

        if (pullAttempts <= 3) {
            currentMessage = swordMessages.initial[pullAttempts - 1] || swordMessages.initial[0];
        } else if (pullAttempts <= 10) {
            currentMessage = getRandomMessage('early');
        } else if (pullAttempts <= 30) {
            currentMessage = getRandomMessage('gettingTired');
        } else if (pullAttempts <= 70) {
            currentMessage = getRandomMessage('questioningSanity');
        } else if (pullAttempts <= 120) {
            currentMessage = getRandomMessage('philosophical');
        } else if (pullAttempts < maxPullAttempts) {
            if (pullAttempts === maxPullAttempts - 2 || pullAttempts === maxPullAttempts - 1) {
                currentMessage = swordMessages.almostThere;
            } else {
                currentMessage = getRandomMessage('desperation');
            }
        } else if (pullAttempts === maxPullAttempts) {
            if (Math.random() < 0.1) {
                currentMessage = swordMessages.success;
                swordPulled = true;
                heroSword.classList.add('pulled');
                pullSwordButton.textContent = "剣は抜かれた！(最終試行)";
            } else {
                currentMessage = swordMessages.finalFailure;
                heroSword.classList.add('stuck');
                pullSwordButton.textContent = "力尽きた...";
            }
            pullSwordButton.disabled = true;
        }

        swordMessage.textContent = currentMessage;

        if (pullAttempts >= maxPullAttempts && !swordPulled) {
            pullSwordButton.textContent = "力尽きた...";
            pullSwordButton.disabled = true;
            if (!heroSword.classList.contains('stuck')) {
                heroSword.classList.add('stuck');
            }
        }
    });
}
