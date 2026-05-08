"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function BusinessCardPage() {
  const navyFrontRef = useRef<HTMLDivElement>(null);
  const navyBackRef = useRef<HTMLDivElement>(null);
  const goldFrontRef = useRef<HTMLDivElement>(null);
  const goldBackRef = useRef<HTMLDivElement>(null);

  const downloadAsJPG = async (elementRef: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!elementRef.current) return;

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(elementRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        removeContainer: true,
        imageTimeout: 0,
      });

      // Convert to JPG and download
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = filename;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0d1b2a] mb-4">
            AAIRE Co. Business Cards
          </h1>
          <p className="text-gray-600">
            Standard size: 3.5" × 2" (89mm × 51mm) • 300 DPI for print
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Front - Design 1 (Navy with Gold accent) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Navy Front</h2>
              <button
                onClick={() => downloadAsJPG(navyFrontRef, 'aaire-business-card-navy-front.jpg')}
                className="px-4 py-2 bg-[#0d1b2a] text-white text-sm rounded hover:bg-[#1a2942] transition-colors"
              >
                Download JPG
              </button>
            </div>
            <div
              ref={navyFrontRef}
              className="bg-[#0d1b2a] rounded-lg shadow-2xl overflow-hidden"
              style={{
                aspectRatio: "3.5 / 2",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <div className="h-full p-8 flex flex-col justify-between relative">
                {/* Gold accent stripe */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#C9A96E]" />

                {/* Logo/Brand */}
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    AAIRE Co.
                  </h1>
                  <p className="text-[#C9A96E] text-sm font-semibold tracking-wide">
                    METAL BUILDINGS
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-1">
                  <p className="text-white/90 text-sm font-medium">
                    Alex Esposito
                  </p>
                  <p className="text-white/70 text-xs">
                    Certified Worldwide Steel Buildings Distributor
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back - Design 1 (Navy with white logo) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Navy Back</h2>
              <button
                onClick={() => downloadAsJPG(navyBackRef, 'aaire-business-card-navy-back.jpg')}
                className="px-4 py-2 bg-[#0d1b2a] text-white text-sm rounded hover:bg-[#1a2942] transition-colors"
              >
                Download JPG
              </button>
            </div>
            <div
              ref={navyBackRef}
              className="bg-[#0d1b2a] rounded-lg shadow-2xl overflow-hidden"
              style={{
                aspectRatio: "3.5 / 2",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <div className="h-full p-8 flex flex-col justify-between">
                {/* Tagline */}
                <div className="flex items-center justify-end">
                  <p className="text-white/50 text-xs italic font-medium">
                    More Than a Supplier
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-white text-sm font-medium">
                      aairecollective@gmail.com
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white text-sm font-medium">
                      aaireco.com
                    </p>
                  </div>

                  <p className="text-white/70 text-xs leading-relaxed pt-2 border-t border-white/10">
                    Expert guidance from design to delivery—serving all 50 states
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alternative Design - Gold Primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Gold Front</h2>
              <button
                onClick={() => downloadAsJPG(goldFrontRef, 'aaire-business-card-gold-front.jpg')}
                className="px-4 py-2 bg-[#C9A96E] text-[#0d1b2a] text-sm rounded hover:bg-[#b8954f] transition-colors"
              >
                Download JPG
              </button>
            </div>
            <div
              ref={goldFrontRef}
              className="bg-[#C9A96E] rounded-lg shadow-2xl overflow-hidden"
              style={{
                aspectRatio: "3.5 / 2",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <div className="h-full p-8 flex flex-col justify-between">
                {/* Top: Brand text and tagline */}
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-[#0d1b2a] mb-1 leading-tight">
                      AAIRE Co.
                    </h1>
                    <p className="text-[#0d1b2a]/80 text-xs font-semibold tracking-wide">
                      METAL BUILDINGS
                    </p>
                  </div>
                  <p className="text-[#0d1b2a]/60 text-sm italic font-medium">
                    More Than a Supplier
                  </p>
                </div>

                {/* Bottom: Contact Info */}
                <div className="space-y-1">
                  <p className="text-[#0d1b2a] text-xs font-medium">
                    Alex Esposito
                  </p>
                  <p className="text-[#0d1b2a]/70 text-[10px]">
                    Certified Worldwide Steel Buildings Distributor
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alternative Back - Gold (matches blue layout) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Gold Back</h2>
              <button
                onClick={() => downloadAsJPG(goldBackRef, 'aaire-business-card-gold-back.jpg')}
                className="px-4 py-2 bg-[#C9A96E] text-[#0d1b2a] text-sm rounded hover:bg-[#b8954f] transition-colors"
              >
                Download JPG
              </button>
            </div>
            <div
              ref={goldBackRef}
              className="bg-[#C9A96E] rounded-lg shadow-2xl overflow-hidden"
              style={{
                aspectRatio: "3.5 / 2",
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <div className="h-full p-8 flex flex-col justify-between">
                {/* Tagline */}
                <div className="flex items-center justify-end">
                  <p className="text-[#0d1b2a]/60 text-xs italic font-medium">
                    More Than a Supplier
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0d1b2a]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-[#0d1b2a] text-sm font-medium">
                      aairecollective@gmail.com
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0d1b2a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[#0d1b2a] text-sm font-medium">
                      aaireco.com
                    </p>
                  </div>

                  <p className="text-[#0d1b2a]/70 text-xs leading-relaxed pt-2 border-t border-[#0d1b2a]/20">
                    Expert guidance from design to delivery—serving all 50 states
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Print Instructions */}
        <div className="mt-16 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-[#0d1b2a] mb-4">
            Print Specifications
          </h3>
          <div className="space-y-3 text-gray-700">
            <p><strong>Size:</strong> 3.5" × 2" (89mm × 51mm)</p>
            <p><strong>Resolution:</strong> 300 DPI minimum for professional printing</p>
            <p><strong>Bleed:</strong> Add 0.125" (3mm) bleed on all sides if printing professionally</p>
            <p><strong>Paper:</strong> 14pt or 16pt cardstock recommended</p>
            <p><strong>Finish:</strong> Matte or silk finish recommended for professional look</p>
          </div>
        </div>
      </div>
    </div>
  );
}
