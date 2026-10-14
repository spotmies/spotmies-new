"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

// Soft blur along the bottom edge of the screen, which steps aside once the footer scrolls into view so it never covers it.
// It lives in the root layout and so outlives page changes: the footer it watches is found again on every route,
// because the previous page's footer is gone after client-side navigation.
export function BottomBlur() {
  const pathname = usePathname();
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
  }, [pathname]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-50 pointer-events-none transition-[opacity,transform] duration-500 ease-out ${isFooterVisible ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
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
