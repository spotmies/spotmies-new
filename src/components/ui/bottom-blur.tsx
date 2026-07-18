"use client";

import React, { useEffect, useState } from "react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export function BottomBlur() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsFooterVisible(entries[0].isIntersecting);
      },
      { rootMargin: "0px", threshold: 0 }
    );

    const observeFooter = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        observer.observe(footer);
        return true;
      }
      return false;
    };

    if (!observeFooter()) {
      const mutationObserver = new MutationObserver((mutations, me) => {
        if (observeFooter()) {
          me.disconnect();
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 pointer-events-none transition-opacity duration-500 ${isFooterVisible ? "opacity-0" : "opacity-100"
        }`}
    >
      <ProgressiveBlur
        position="bottom"
        backgroundColor="#000000"
        height="80px"
      />
    </div>
  );
}
