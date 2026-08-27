import React, { useState } from "react";
import { NAV_TREE_STRUCTURE } from "../data/navTreeStructure";
import * as Icons from "lucide-react";

// डायनेमिक Lucide आइकॉन रेंडरर हेल्पर कंपोनेंट
const SidebarIcon = ({ name, className = "h-4 w-4" }) => {
  const IconComponent = Icons[name];
  // अगर कोई आइकॉन नाम मिसमैच हो, तो डिफ़ॉल्ट रूप से FileText रेंडर होगा
  if (!IconComponent) return <Icons.FileText className={className} />;
  return <IconComponent className={className} />;
};

export default function LearnHubSidebar({ currentNode, setCurrentNode }) {
  // मोबाइल लेआउट के लिए कोलैप्सिबल स्टेट (Drawer View Tracker)
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // हर पैरेंट फ़ोल्डर की ओपेन/क्लोज़ स्टेट को ट्रैक करने के लिए लोकल स्टेट
  const [expandedParents, setExpandedParents] = useState({
    "1.0": true,
    2.1: true,
    2.2: false,
    3.1: false,
    4.1: false,
  });

  const toggleParent = (parentId) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white border-r border-gray-200/80 px-4 py-6 overflow-y-auto selection:bg-[#2A52BE] selection:text-white">
      {/* साइडबार हेडर ज़ोन */}
      <div className="mb-6 px-2">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Knowledge Directory
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          Explore 45 core mobility chapters
        </div>
      </div>

      {/* ग्रैंडपैरेंट नोड्स का लूप (The Deep Tree Hierarchy) */}
      <div className="space-y-6 flex-1">
        {NAV_TREE_STRUCTURE.map((grandparent) => (
          <div key={grandparent.grandparentId} className="space-y-2">
            {/* Grandparent Title Block */}
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-gray-800 border-b border-gray-100/50 pb-2">
              <SidebarIcon
                name={grandparent.grandparentIcon}
                className="h-4 w-4 text-[#2A52BE]"
              />
              <span className="uppercase tracking-tight text-[11px]">
                {grandparent.grandparentTitle}
              </span>
            </div>

            {/* Parent Folders Loop */}
            <div className="space-y-1 pl-1">
              {grandparent.parents.map((parent) => {
                const isExpanded = expandedParents[parent.parentId];
                return (
                  <div key={parent.parentId} className="space-y-0.5">
                    {/* Parent Folder Accordion Trigger */}
                    <button
                      onClick={() => toggleParent(parent.parentId)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-semibold text-gray-600 hover:bg-[#EBF3FC]/50 hover:text-gray-900 transition-all duration-150 thumb-accessible-action"
                    >
                      <div className="flex items-center gap-2">
                        <SidebarIcon
                          name={parent.parentIcon || "Folder"}
                          className="h-3.5 w-3.5 text-gray-400"
                        />
                        <span>{parent.parentTitle}</span>
                      </div>
                      <SidebarIcon
                        name={isExpanded ? "ChevronDown" : "ChevronRight"}
                        className="h-3 w-3 text-gray-400"
                      />
                    </button>

                    {/* Children Leaves Loop (Rendered dynamically if Parent is expanded) */}
                    {isExpanded && (
                      <div className="space-y-0.5 pl-4 border-l border-gray-100 ml-3 mt-0.5">
                        {parent.children.map((child) => {
                          const isActive = currentNode === child.id;
                          return (
                            <button
                              key={child.id}
                              onClick={() => {
                                setCurrentNode(child.id);
                                setIsMobileOpen(false); // मोबाइल पर टैप होते ही ड्रायर बंद होगा
                              }}
                              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-all duration-150 thumb-accessible-action ${
                                isActive
                                  ? "bg-[#EBF3FC] text-[#2A52BE] font-bold shadow-xs border-l-2 border-[#2A52BE]"
                                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <SidebarIcon
                                name={child.icon || "FileText"}
                                className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-[#2A52BE]" : "text-gray-400"}`}
                              />
                              <span className="truncate">{child.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* 💻 DESKTOP VIEWPORT LAYOUT (Pushed left, persistent 260px) */}
      <aside className="hidden lg:block w-[260px] h-[calc(100vh-73px)] sticky top-[73px] shrink-0">
        <SidebarContent />
      </aside>

      {/* 📱 MOBILE NAVIGATION BAR & DRAWER GATEWAY */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#2A52BE] px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-opacity-90 active:scale-95 transition-all thumb-accessible-action"
        >
          <Icons.Menu className="h-4 w-4" />
          <span>Explore Chapters</span>
        </button>
      </div>

      {/* Mobile Drawer Backplane Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fadeIn">
          {/* Backdrop Click Shield */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Sliding Content Drawer */}
          <div className="relative w-[280px] h-full max-w-sm shadow-xl animate-fadeIn">
            <SidebarContent />
            {/* Embedded Close Button inside mobile drawer */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 p-1 rounded-lg bg-gray-50 border border-gray-100 thumb-accessible-action"
            >
              <Icons.X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
