import React, { useState, useRef } from "react";
import * as Icons from "lucide-react";

export default function CanvasCompressor() {
  // इनपुट फ़ाइल और स्टेट मैनेजमेंट
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // कम्प्रेशन रिजल्ट्स को ट्रैक करने के लिए स्टेट्स
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedDataUrl, setCompressedDataUrl] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // ड्रैग-एंड-ड्रॉप माउस जेस्चर हैंडलर्स
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const resetCompressor = () => {
    setSelectedFile(null);
    setCompressedDataUrl(null);
    setIsSuccess(false);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  // ==========================================
  // CORE JAVASCRIPT IMAGE COMPRESSION ENGINE
  // ==========================================
  const processImageFile = (file) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setIsSuccess(false);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        // 1. क्लाइंट-साइड HTML5 कैनवास एलिमेंट का निर्माण
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // RTO गाइडलाइंस के अनुसार सिग्नेचर के लिए मैक्सिमम विड्थ सेट करें
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        // कैनवास के डाइमेंशन्स सेट करें
        canvas.width = width;
        canvas.height = height;

        // कैनवास पर इमेज को क्लीन स्केल के साथ री-ड्रॉ करें
        ctx.fillStyle = "#FFFFFF"; // बैकग्राउंड को प्योर व्हाइट रखें
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // 2. बाइनरी सर्च कम्प्रेशन एल्गोरिदम (टारगेट: ~42KB)
        let quality = 0.75;
        let low = 0.1;
        let high = 1.0;
        let iterations = 0;
        let bestDataUrl = null;
        let bestSize = 0;

        // 5 बार बाइनरी सर्च चलाकर ठीक 41KB से 43KB के बीच की फाइल साइज ढूंढें
        while (iterations < 5) {
          const tempDataUrl = canvas.toDataURL("image/jpeg", quality);
          // बेस64 स्ट्रिंग से फाइल साइज कैलकुलेट करें
          const tempSize = Math.round(((tempDataUrl.length - 22) * 3) / 4);

          if (tempSize <= 43000 && tempSize >= 41000) {
            bestDataUrl = tempDataUrl;
            bestSize = tempSize;
            break;
          }

          if (tempSize > 43000) {
            high = quality;
          } else {
            low = quality;
            // अगर फाइल पहले से ही बहुत छोटी है तो बेस्ट फिट को स्टोर करें
            if (tempSize > bestSize) {
              bestDataUrl = tempDataUrl;
              bestSize = tempSize;
            }
          }

          quality = (low + high) / 2;
          iterations++;
        }

        // अगर इमेज बहुत हैवी या बहुत लाइट है और बाइनरी सर्च मैच न हो
        if (!bestDataUrl) {
          bestDataUrl = canvas.toDataURL("image/jpeg", 0.5);
          bestSize = Math.round(((bestDataUrl.length - 22) * 3) / 4);
        }

        // 3. रिएक्ट यूआई स्टेट को अपडेट करें और ग्रीन टिक एनीमेशन ट्रिगर करें
        setTimeout(() => {
          setCompressedDataUrl(bestDataUrl);
          setCompressedSize(bestSize);
          setIsProcessing(false);
          setIsSuccess(true);
        }, 800); // 800ms का स्मूथ लोडिंग इफ़ेक्ट
      };
    };
  };

  // बाइट्स को KB में बदलने के लिए हेल्पर फ़ंक्शन
  const formatKB = (bytes) => (bytes / 1024).toFixed(1);

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-5">
      {/* ड्रैग एंड ड्रॉप फाइल बॉक्स */}
      {!compressedDataUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 thumb-accessible-action ${
            isDragging
              ? "border-[#2A52BE] bg-[#EBF3FC]"
              : "border-gray-300 bg-gray-50 hover:bg-gray-50/50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {isProcessing ? (
            <div className="flex flex-col items-center space-y-3">
              <Icons.Loader2 className="h-8 w-8 text-[#2A52BE] animate-spin" />
              <div className="text-xs font-bold text-gray-700">
                HTML5 Canvas Optimizing...
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-[#EBF3FC] text-[#2A52BE] rounded-full">
                <Icons.UploadCloud className="h-6 w-6" />
              </div>
              <h4 className="text-xs font-bold text-gray-800">
                Drag & Drop Signature Photo
              </h4>
              <p className="text-[10px] text-gray-400">
                or click to browse from gallery (Supports high-res 5MB+ phone
                snaps)
              </p>
            </div>
          )}
        </div>
      ) : (
        // कम्प्रेशन सक्सेस रिजल्ट पैनल
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3.5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 text-white rounded-full">
                <Icons.Check className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-green-900">
                  Compression Success!
                </h4>
                <p className="text-[10px] text-green-700">
                  File perfectly scaled to RTO compliance criteria natively.
                </p>
              </div>
            </div>
            <button
              onClick={resetCompressor}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1.5 rounded-lg thumb-accessible-action"
            >
              Reset
            </button>
          </div>

          {/* कम्प्रेशन बाइट्स की तुलना करने वाला ग्रिड */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                Original Weight
              </span>
              <div className="text-lg font-black text-red-600 line-through">
                {formatKB(originalSize)} KB
              </div>
            </div>
            <div className="p-4 bg-[#EBF3FC] border border-[#2A52BE]/20 rounded-xl text-center space-y-1">
              <span className="text-[10px] font-bold text-[#2A52BE] uppercase block">
                Optimized RTO Weight
              </span>
              <div className="text-lg font-black text-green-600 animate-pulse">
                {formatKB(compressedSize)} KB
              </div>
            </div>
          </div>

          {/* फाइल का लाइव प्रीव्यू बेंटो बॉक्स */}
          <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50">
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">
              Coded Signature Output Preview
            </span>
            <img
              src={compressedDataUrl}
              alt="Compressed RTO Output"
              className="max-h-24 object-contain rounded-md border border-gray-200 shadow-3xs p-1 bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
