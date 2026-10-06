"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Calendar, MapPin, DollarSign, Sparkles, Check, X } from "lucide-react";

interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
}

interface PackageItem {
  id: string;
  title: string;
  destination: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
}

export default function PackageBuilder() {
  const [packages, setPackages] = useState<PackageItem[]>([
    {
      id: "pkg-1",
      title: "سحر المالديف الفاخر - أكواخ فوق الماء",
      destination: "جزر المالديف",
      price: 14900,
      duration: "6 أيام / 5 ليالي",
      category: "شهر عسل VIP",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
      itinerary: [
        { day: 1, title: "الوصول بالطيارة المائية", desc: "استقبال خاص ونقل للمنتجع مع مشروب ترحيبي." },
        { day: 2, title: "يوم استرخاء بحري", desc: "جلسة مساج وعشاء على الشاطئ تحت النجوم." },
      ],
      inclusions: ["فيلا مائية مسبح خاص", "وجبات شاملة كلياً", "نقل بالطيارة المائية"],
    },
    {
      id: "pkg-2",
      title: "صيف البوسنة وسراييفو الساحرة",
      destination: "البوسنة والهرسك",
      price: 8500,
      duration: "8 أيام / 7 ليالي",
      category: "عائلية شاملة",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80",
      itinerary: [
        { day: 1, title: "الوصول إلى سراييفو", desc: "استقبال بالمطار والتوصيل للفندق." },
        { day: 2, title: "جولة الجبال والشلالات", desc: "زيارة نبع نهر البوسنة وتلفريك جبل تريبيفيتش." },
      ],
      inclusions: ["فندق 5 نجوم مع إفطار", "سيارة خاصة مع سائق", "جولات سياحية يومية"],
    },
  ]);

  // Form states for new package
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("شهر عسل VIP");
  const [image, setImage] = useState("");
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([
    { day: 1, title: "الاستقبال والوصول", desc: "استقبال من المطار والتسكين بالفندق الفاخر." },
  ]);
  const [inclusionsText, setInclusionsText] = useState("فندق 5 نجوم مع الإفطار\nسيارة وسائق خاص\nشريحة اتصال وإنترنت");
  const [showForm, setShowForm] = useState(false);

  const addItineraryDay = () => {
    const nextDay = itineraryDays.length + 1;
    setItineraryDays([...itineraryDays, { day: nextDay, title: `اليوم ${nextDay}`, desc: "" }]);
  };

  const removeItineraryDay = (idx: number) => {
    if (itineraryDays.length > 1) {
      const updated = itineraryDays.filter((_, i) => i !== idx).map((item, i) => ({ ...item, day: i + 1 }));
      setItineraryDays(updated);
    }
  };

  // Load packages from server API
  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPackages(data);
        }
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  React.useEffect(() => {
    fetchPackages();
  }, []);

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPkg: PackageItem = {
      id: "pkg-" + Date.now(),
      title,
      destination,
      price: Number(price),
      duration: duration || "7 أيام / 6 ليالي",
      category,
      image: image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
      itinerary: itineraryDays,
      inclusions: inclusionsText.split("\n").filter((s) => s.trim().length > 0),
    };

    setPackages((prev) => [newPkg, ...prev]);
    setShowForm(false);

    try {
      await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPkg),
      });
    } catch (err) {
      console.error("Error saving package to server:", err);
      fetchPackages();
    }

    // Reset form
    setTitle("");
    setDestination("");
    setPrice("");
    setDuration("");
    setImage("");
  };

  const handleDeletePackage = async (pkgId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الباقة؟")) {
      setPackages((prev) => prev.filter((p) => p.id !== pkgId));
      try {
        await fetch(`/api/packages?id=${pkgId}`, { method: "DELETE" });
      } catch (err) {
        console.error("Error deleting package:", err);
        fetchPackages();
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-safar-navy flex items-center gap-2">
            <span>منشئ الباقات والرحلات السياحية (Visual Package Builder)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            أنشئ برامج سياحية جديدة وخط سير الرحلة يوماً بيوم بضغطة زر دون لمس أي كود
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 bg-safar-cyan hover:bg-safar-cyan-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showForm ? "إلغاء الإضافة" : "إضافة باقة جديدة"}</span>
        </button>
      </div>

      {/* New Package Form */}
      {showForm && (
        <form onSubmit={handleSavePackage} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-safar-gold" />
            <h3 className="text-base font-bold text-safar-navy">تجهيز برنامج سياحي جديد</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">اسم الباقة التسويقي *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: شتاء سويسرا وجبال الألب"
                required
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">الوجهة والدولة *</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="سويسرا (إنترلاكن وزيورخ)"
                required
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">السعر للشخص (ريال) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="مثال: 12500"
                required
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">المدة *</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="مثال: 7 أيام / 6 ليالي"
                required
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">الفئة *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              >
                <option value="شهر عسل VIP">شهر عسل VIP</option>
                <option value="عائلية شاملة">عائلية شاملة</option>
                <option value="شبابية ومغامرات">شبابية ومغامرات</option>
                <option value="باقات شتوية">باقات شتوية</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">رابط صورة الوجهة</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-safar-cyan"
              />
            </div>
          </div>

          {/* Day by Day Section */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-safar-navy">جدول الأيام (Day-by-Day):</h4>
              <button
                type="button"
                onClick={addItineraryDay}
                className="text-xs text-safar-cyan font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة يوم جديد</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {itineraryDays.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                  <span className="w-16 h-8 rounded-lg bg-safar-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    اليوم {item.day}
                  </span>
                  <div className="flex-grow space-y-1.5">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...itineraryDays];
                        updated[idx].title = e.target.value;
                        setItineraryDays(updated);
                      }}
                      placeholder="عنوان اليوم (مثال: جولة البحيرات والتلفريك)"
                      className="w-full h-8 px-2.5 text-xs font-bold rounded-lg border border-slate-200"
                    />
                    <textarea
                      rows={1}
                      value={item.desc}
                      onChange={(e) => {
                        const updated = [...itineraryDays];
                        updated[idx].desc = e.target.value;
                        setItineraryDays(updated);
                      }}
                      placeholder="وصف تفصيلي للأنشطة..."
                      className="w-full p-2 text-xs rounded-lg border border-slate-200"
                    />
                  </div>
                  {itineraryDays.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(idx)}
                      className="text-slate-300 hover:text-red-500 pt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-slate-700">
              ما تشمله الباقة (ضع كل ميزة في سطر):
            </label>
            <textarea
              rows={3}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-safar-navy hover:bg-safar-navy-light text-white text-xs font-bold px-7 py-2.5 rounded-xl shadow-md transition-all"
            >
              <Check className="w-4 h-4 text-safar-gold" />
              <span>نشر الباقة فوراً</span>
            </button>
          </div>
        </form>
      )}

      {/* Packages Grid - Adaptive across all viewports */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 sm:gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative w-full h-44 bg-slate-100">
              <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
              <div className="absolute top-2.5 right-2.5 bg-safar-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                {pkg.category}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-safar-cyan" />
                <span>{pkg.destination}</span>
                <span className="mx-1">•</span>
                <Calendar className="w-3.5 h-3.5 text-safar-cyan" />
                <span>{pkg.duration}</span>
              </div>

              <h4 className="text-sm font-extrabold text-safar-navy line-clamp-1">{pkg.title}</h4>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px]">ابتداءً من:</span>
                  <strong className="text-base text-safar-navy">{pkg.price.toLocaleString()}</strong>{" "}
                  <span className="text-[10px] text-safar-gold font-bold">ريال</span>
                </div>

                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="text-xs text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  title="حذف الباقة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
