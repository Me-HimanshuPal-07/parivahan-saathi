import React, { useEffect, useState } from "react";
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

  // Keep a deep-linked/current chapter visible even when its parent starts
  // collapsed (for example, when a user arrives from the Hero quick action).
  useEffect(() => {
    const activeParent = NAV_TREE_STRUCTURE
      .flatMap((grandparent) => grandparent.parents)
      .find((parent) => parent.children?.some((child) => child.id === currentNode));

    if (activeParent && !expandedParents[activeParent.parentId]) {
      setExpandedParents((previous) => ({
        ...previous,
        [activeParent.parentId]: true,
      }));
    }
  }, [currentNode, expandedParents]);

  useEffect(() => {
    if (!isMobileOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMobileOpen]);

  const toggleParent = (parentId) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  const SidebarContent = () => (
    <div className="learn-hub-sidebar-content selection:bg-[#2A52BE] selection:text-white">
      {/* साइडबार हेडर ज़ोन */}
      <div className="learn-hub-sidebar-header">
        <div className="learn-hub-sidebar-kicker">
          Knowledge Directory
        </div>
        <div className="learn-hub-sidebar-subtitle">
          <span>Explore core mobility chapters</span>
          <span className="learn-hub-sidebar-count">45</span>
        </div>
      </div>

      {/* ग्रैंडपैरेंट नोड्स का लूप (The Deep Tree Hierarchy) */}
      <div className="learn-hub-tree">
        {NAV_TREE_STRUCTURE.map((grandparent) => (
          <section key={grandparent.grandparentId} className="learn-hub-tree-group">
            {/* Grandparent Title Block */}
            <div className="learn-hub-tree-group-title">
              <SidebarIcon
                name={grandparent.grandparentIcon}
                className="h-4 w-4"
              />
              <span>
                {grandparent.grandparentTitle}
              </span>
            </div>

            {/* Parent Folders Loop */}
            <div className="learn-hub-parent-list">
              {grandparent.parents.map((parent) => {
                const isExpanded = expandedParents[parent.parentId];
                return (
                  <div key={parent.parentId} className="learn-hub-parent">
                    {/* Parent Folder Accordion Trigger */}
                    <button
                      type="button"
                      onClick={() => toggleParent(parent.parentId)}
                      aria-expanded={isExpanded}
                      className="learn-hub-parent-trigger thumb-accessible-action"
                    >
                      <span className="learn-hub-parent-label">
                        <SidebarIcon
                          name={parent.parentIcon || "Folder"}
                          className="h-3.5 w-3.5"
                        />
                        <span>{parent.parentTitle}</span>
                      </span>
                      <SidebarIcon
                        name={isExpanded ? "ChevronDown" : "ChevronRight"}
                        className="h-3.5 w-3.5"
                      />
                    </button>

                    {/* Children Leaves Loop (Rendered dynamically if Parent is expanded) */}
                    {isExpanded && (
                      <div className="learn-hub-child-list">
                        {parent.children.map((child) => {
                          const isActive = currentNode === child.id;
                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => {
                                setCurrentNode(child.id);
                                setIsMobileOpen(false); // मोबाइल पर टैप होते ही ड्रायर बंद होगा
                              }}
                              aria-current={isActive ? "page" : undefined}
                              className={`learn-hub-child-button thumb-accessible-action ${isActive ? "is-active" : ""}`}
                            >
                              <SidebarIcon
                                name={child.icon || "FileText"}
                                className="h-3.5 w-3.5 shrink-0"
                              />
                              <span>{child.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* 💻 DESKTOP VIEWPORT LAYOUT (Pushed left, persistent 260px) */}
      <aside className="learn-hub-sidebar-desktop" aria-label="Learn Hub chapters">
        <SidebarContent />
      </aside>

      {/* 📱 MOBILE NAVIGATION BAR & DRAWER GATEWAY */}
      <div className="learn-hub-mobile-trigger-wrap">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-expanded={isMobileOpen}
          className="learn-hub-mobile-trigger thumb-accessible-action"
        >
          <Icons.Menu className="h-4 w-4" />
          <span>Explore Chapters</span>
        </button>
      </div>

      {/* Mobile Drawer Backplane Overlay */}
      {isMobileOpen && (
        <div className="learn-hub-mobile-overlay animate-fadeIn">
          {/* Backdrop Click Shield */}
          <div
            className="learn-hub-mobile-backdrop"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Sliding Content Drawer */}
          <div
            className="learn-hub-mobile-drawer animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label="Learn Hub chapters"
          >
            <SidebarContent />
            {/* Embedded Close Button inside mobile drawer */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close chapters"
              className="learn-hub-mobile-close thumb-accessible-action"
            >
              <Icons.X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
