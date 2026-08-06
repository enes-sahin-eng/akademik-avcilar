"use client";
import { useState, useRef, useEffect } from "react";
import { User, Phone, MapPin, ArrowRight, ChevronDown } from 'lucide-react';

/**
 * A glassmorphism-style lead form component with animated labels and custom dropdown.
 */
export function LoginForm() {
  const [branch, setBranch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const branches = ["Avcılar", "Kadıköy", "Şişli", "Beşiktaş", "Bursa", "İzmir", "Ankara"];

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white uppercase italic">ÜCRETSİZ EĞİTİM!</h2>
        <p className="mt-2 text-sm text-gray-300">Eğitim İçin Hemen Ön Bilgi Alın!</p>
      </div>
      
      <form className="space-y-8 pt-4">
        {/* Name Input with Animated Label */}
        <div className="relative z-0">
          <input
            type="text"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" " 
            required
          />
          <label
            htmlFor="floating_name"
            className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <User className="inline-block mr-2 -mt-1" size={16} />
            İsim Ve Soyisim Giriniz.
          </label>
        </div>
        
        {/* Phone Input with Animated Label */}
        <div className="relative z-0">
          <input
            type="tel"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <Phone className="inline-block mr-2 -mt-1" size={16} />
            GSM Numaranızı Giriniz.
          </label>
        </div>

        {/* Custom Branch Select */}
        <div className="relative z-0" ref={dropdownRef}>
          {/* Faux Input (Clickable Area) */}
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 cursor-pointer flex justify-between items-center transition-colors
              ${isDropdownOpen ? 'border-red-500' : 'border-gray-300'}
              ${branch ? 'text-white' : 'text-transparent'}`}
          >
            <span>{branch || "Seçiniz"}</span>
            <ChevronDown 
              size={16} 
              className={`text-gray-300 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-red-500" : ""}`} 
            />
          </div>

          {/* Animated Label */}
          <label
            className={`absolute text-sm duration-300 transform top-3 -z-10 origin-[0] pointer-events-none transition-all
              ${(branch || isDropdownOpen) ? "scale-75 -translate-y-6 text-red-400" : "scale-100 translate-y-0 text-gray-300"}`}
          >
            <MapPin className="inline-block mr-2 -mt-1" size={16} />
            Şube Seçiniz.
          </label>

          {/* Custom Dropdown Menu */}
          <div 
            className={`absolute top-full left-0 w-full mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 transform origin-top
              ${isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
          >
            <ul className="max-h-56 overflow-auto custom-scrollbar">
              {branches.map((opt) => (
                <li 
                  key={opt}
                  onClick={() => { setBranch(opt); setIsDropdownOpen(false); }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-all duration-200
                    ${branch === opt ? 'bg-red-600/80 text-white font-medium' : 'text-gray-200 hover:bg-white/20 hover:text-white'}`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="submit"
          className="group w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition-all duration-300"
        >
          HEMEN ÖN BİLGİ AL!
          <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </button>

      </form>
       <p className="text-center text-[10px] text-gray-400 leading-tight">
        Bilgi formunu doldurarak Yasal Uyarı / Kullanım Şartlarını kabul ediyorum.
      </p>
    </div>
  );
}
