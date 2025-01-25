// توليد رقم سري عشوائي بين 1 و 100
let secretNumber = Math.floor(Math.random() * 100) + 1;
// تحديد عدد المحاولات
let attempts = 10;
// تحديد الوقت إلى 60 ثانية
let timer = 60;
let countdown; // لتخزين مؤقت العد التنازلي
// مصفوفة رسائل التهديد العشوائية
let threatMessages = [
    "حذار! جهازك ممكن يولع 😂",
    "كل ملفاتك هتختفي في 10 ثواني! 😱",
    "إحنا بنراقبك! 👀"
];
// مصفوفة النكت العشوائية
let jokes = [
    "ليه الكتاب دايمًا مرتاح؟ عشان عنده غلاف! 😂",
    "إيه أكتر حاجة بتضحك؟ النكت البيضة دي! 🥚",
    "مرة واحد حب يشغل دماغه... بقى كهربائي! ⚡"
];
// مصفوفة التحديات العشوائية
let challenges = [
    "اكتب كلمة 'مجنون' 5 مرات تحت!",
    "دور على الزرار اللي مختفي في الشاشة!",
    "عد من 1 لـ 10 بالعكس من غير ما تغلط!"
];
// مصفوفة الاتجاهات العشوائية
let trends = [
    "تريند النهارده: كل الناس بتتكلم عن كورة كأس العالم! ⚽",
    "تريند النهارده: نزلت أغنية جديدة من مطربك المفضل! 🎤",
    "تريند النهارده: الجو حر قوي والناس كلها بتتكلم عن ده! 🌞"
];

// دالة لبدء العد التنازلي
function startTimer() {
    countdown = setInterval(() => {
        if (timer > 0) {
            timer--;
            // تحديث النص المعروض للوقت المتبقي
            document.getElementById("timer").textContent = `الوقت المتبقي: ${timer} ثانية`;

            // زيادة الصعوبة عندما يصبح الوقت 30 ثانية
            if (timer === 30) {
                attempts = 5; // تقليل المحاولات إلى 5
                document.getElementById("attempts").textContent = `المحاولات المتبقية: ${attempts}`;
            }

            // تفعيل أحداث عشوائية
            if (Math.random() > 0.85) {
                showThreatMessage();
            }

            if (Math.random() > 0.9) {
                showTrendInfo();
            }

            if (Math.random() > 0.95) {
                window.open("https://www.google.com", "_blank"); // فتح جوجل عشوائيًا
            }
        } else {
            endGameWithRedScreen(); // إنهاء اللعبة عندما ينتهي الوقت
        }
    }, 1000);
}

// دالة لعرض رسالة تهديد عشوائية
function showThreatMessage() {
    document.getElementById("threatMessage").textContent =
        threatMessages[Math.floor(Math.random() * threatMessages.length)];
}

// دالة لعرض معلومات عن تريندات عشوائية
function showTrendInfo() {
    let trend = trends[Math.floor(Math.random() * trends.length)];
    document.getElementById("trendText").textContent = trend;
    document.getElementById("trendInfo").style.display = "block";

    // إخفاء المعلومات بعد 5 ثواني
    setTimeout(() => {
        document.getElementById("trendInfo").style.display = "none";
    }, 5000);
}

// دالة لبدء لعبة جديدة
function newGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // إعادة تعيين الرقم السري
    attempts = 10; // إعادة تعيين المحاولات
    timer = 60; // إعادة تعيين الوقت

    // إعادة تعيين القيم المعروضة
    document.getElementById("timer").textContent = `الوقت المتبقي: ${timer} ثانية`;
    document.getElementById("attempts").textContent = `المحاولات المتبقية: ${attempts}`;
    document.getElementById("message").textContent = ""; // مسح أي رسالة سابقة
    document.getElementById("thankYou").style.display = "none"; // إخفاء رسالة الشكر

    // إعادة بدء العد التنازلي
    clearInterval(countdown);
    startTimer();
}

// دالة للتحقق من تخمين اللاعب
function checkGuess() {
    let guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        alert("من فضلك اكتب رقم صحيح!");
        return;
    }

    attempts--; // تقليل عدد المحاولات
    document.getElementById("attempts").textContent = `المحاولات المتبقية: ${attempts}`;

    // التحقق إذا كان التخمين صحيحًا أم لا
    if (guess === secretNumber) {
        document.getElementById("message").textContent = "صح عليك! أنت رائع 😂";
        clearInterval(countdown); // إيقاف المؤقت عندما يفوز اللاعب
    } else if (attempts === 0) {
        endGameWithRedScreen(); // إنهاء اللعبة إذا انتهت المحاولات
    } else if (guess < secretNumber) {
        document.getElementById("message").textContent = "تخمينك صغير جدًا!";
    } else {
        document.getElementById("message").textContent = "تخمينك كبير جدًا!";
    }

    // تفعيل النكت العشوائية
    if (Math.random() > 0.7) {
        alert(jokes[Math.floor(Math.random() * jokes.length)]);
    }
}

// دالة لتقديم تلميح للاعب
function giveHint() {
    if (Math.random() > 0.5) {
        startChallenge(); // بدء تحدي إذا كانت القيمة العشوائية عالية
    } else {
        alert("الزرار اتحرك! شوف مكانه الجديد!");
    }
}

// دالة لبدء تحدي عشوائي
function startChallenge() {
    document.getElementById("challenge").style.display = "block"; // عرض قسم التحدي
    document.getElementById("challengeText").textContent =
        challenges[Math.floor(Math.random() * challenges.length)];
}

// دالة لتوليد تحدي جديد إذا لزم الأمر
function anotherChallenge() {
    document.getElementById("challengeText").textContent =
        challenges[Math.floor(Math.random() * challenges.length)];
}

// دالة لإتمام التحدي
function completeChallenge() {
    let input = document.getElementById("challengeInput").value;
    // التحقق إذا كان اللاعب أكمل التحدي بشكل صحيح
    if (input === "مجنون".repeat(5).replace(/مجنون/g, "مجنون ")) {
        alert("أنت أكملت التحدي بنجاح! 😂");
        document.getElementById("challenge").style.display = "none"; // إخفاء التحدي بعد إتمامه
    } else {
        alert("غلط! حاول تاني.");
    }
}

// دالة لإنهاء اللعبة مع شاشة حمراء
function endGameWithRedScreen() {
    clearInterval(countdown); // إيقاف المؤقت
    document.getElementById("redScreen").style.display = "block"; // عرض الشاشة الحمراء
    document.getElementById("dogEmoji").style.display = "block"; // عرض رمز الكلب
    document.getElementById("alarmSound").play(); // تشغيل صوت الإنذار

    // بعد 5 ثواني، إخفاء الشاشة الحمراء وعرض رسالة "شكراً"
    setTimeout(() => {
        document.getElementById("redScreen").style.display = "none";
        document.getElementById("dogEmoji").style.display = "none";
        document.getElementById("thankYou").style.display = "block";
    }, 5000);
}

// بدء العد التنازلي عند تشغيل السكربت
startTimer();
