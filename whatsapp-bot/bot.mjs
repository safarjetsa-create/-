import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import pino from "pino";
import qrcode from "qrcode-terminal";

/**
 * SafarJet Free WhatsApp AI Concierge Bot (Baileys Engine)
 * No third-party API subscription fees (0 SAR per message).
 */

async function startSafarJetBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const sock = makeWASocket({
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\n=======================================================");
      console.log("📲 امسح كود الـ QR بكاميرا الواتساب لربط رقم وكالة سفرجيت:");
      console.log("=======================================================\n");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("⚠️ تم إغلاق الاتصال. جاري إعادة الاتصال تلقائياً:", shouldReconnect);
      if (shouldReconnect) {
        startSafarJetBot();
      }
    } else if (connection === "open") {
      console.log("\n✅ نجح الاتصال! بوت سفرجيت الذكي متصل الآن وجاهز لخدمة العملاء على مدار الساعة ✈️\n");
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // Listen to incoming messages
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;

      const senderNumber = msg.key.remoteJid;
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";

      if (!text) continue;

      console.log(`📩 رسالة واردة من [${senderNumber}]: ${text}`);

      // Smart AI Response Logic
      const reply = generateAiTravelResponse(text);

      await sock.sendMessage(senderNumber, {
        text: reply,
      });

      console.log(`📤 تم إرسال الرد الذكي بنجاح إلى [${senderNumber}]`);
    }
  });
}

function generateAiTravelResponse(userText) {
  const text = userText.toLowerCase();

  if (text.includes("عمرة") || text.includes("مكة") || text.includes("حرم")) {
    return `يا هلا ومسهلا بك في سفرجيت! 🕋 تقبل الله منا ومنكم صالح الأعمال.\n\nنوفر باقات عمرة VIP متكاملة مع فنادق 5 نجوم مطلة على الكعبة المشرفة وتنقلات خاصة بسيارات جمس فارهة أو قطار الحرمين.\n\nلتفاصيل وحجز الباقة مباشرة:\nhttps://safarjet.com/services/umrah\n\nأو يمكنك تزويدنا بعدد الأفراد والتواريخ لنجهز لك العرض فوراً.`;
  }

  if (text.includes("طائر") || text.includes("خاصة") || text.includes("jet")) {
    return `أهلاً بك يا فندم في قسم الطيران الخاص بسفرجيت 🛩️\n\nنوفر أسطولاً حديثاً من الطائرات الخاصة برجال الأعمال وكبار الشخصيات مع صالات إقلاع VIP ومرونة تامة في أوقات الرحلات.\n\nتفضل باختيار مسار رحلتك هنا:\nhttps://safarjet.com/services/private-jets\n\nسيتواصل معكم مدير حسابات كبار الشخصيات لتأكيد أدق التفاصيل.`;
  }

  if (text.includes("مالديف") || text.includes("عسل") || text.includes("شاطئ")) {
    return `ألف مبروك مقدماً! 🏝️ المالديف معنا تجربة استثنائية.\n\nباقات شهر العسل تشمل:\n• فلل مائية مع مسابح خاصة\n• إفطار عائم وجلسات استرخاء\n• نقل بالطيارة المائية\n\nرابط العروض الحصرية:\nhttps://safarjet.com/services/packages`;
  }

  if (text.includes("علاج") || text.includes("مستشفى")) {
    return `سلامتكم وألف لا بأس! 🏥\n\nنقدم في سفرجيت خدمات السياحة العلاجية في ألمانيا، التشيك، والنمسا مع دراسة مجانية للتقارير الطبية وتوفير مترجم طبي خاص وسكن للمرافقين.\n\nللتقديم ورفع التقارير:\nhttps://safarjet.com/services/medical`;
  }

  // General Welcoming Response
  return `يا هلا ومسهلا بك في سفرجيت للسفر والسياحة! ✈️\n"العالم أقرب"\n\nأنا مستشارك السياحي الذكي.. يسعدني مساعدتك في:\n1. باقات العمرة والحرمين 🕋\n2. حجوزات الطيران والفنادق العالمية 🏨\n3. الطائرات الخاصة VIP 🛩️\n4. رحلات الكروز والجولات السياحية 🚢\n\nتفضل بزيارة موقعنا لاكتشاف كافة العروض:\nhttps://safarjet.com\n\nأو اكتب لي وجهتك وميزانيتك وسأرشح لك أفضل برنامج فوراً!`;
}

// Start the engine
startSafarJetBot().catch((err) => console.error("Error starting bot:", err));
