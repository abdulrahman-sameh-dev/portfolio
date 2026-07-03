"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from "./Navbar";
import { NavMenu } from "./NavMenu";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const router = useRouter();

  // --- States ---
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forceRebuild, setForceRebuild] = useState(0);

  // --- 1. Scroll Direction Logic (Hide/Show Navbar) ---
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Add background/blur after scrolling 20px
      setScrolled(currentScrollY > 20);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- 2. BFCache Fix (Hydration/State Persistence) ---
  // ده الجزء اللي بيحل مشكلة الـ Context loss لما المستخدم يرجع بظهره في المتصفح
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setForceRebuild((prev) => prev + 1);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  // --- 3. Body Scroll Lock ---
  // بنقفل الـ scroll بتاع الصفحة لما المنيو تفتح عشان الـ UX يكون مظبوط
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // --- 4. Close Menu on Route Change ---
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // --- 5. Navigation & Contact Logic ---
  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname === "/") {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // لو مش في الصفحة الرئيسية، بنروح لها ونضيف الـ hash
      router.push("/#contact");
    }
  }, [pathname, router]);

  // Scroll to hash on page load (specifically for /#contact)
  useEffect(() => {
    if (window.location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <section>
      {/* Navbar Container */}
      <div
        className={`
          fixed top-0 w-full z-100
          transition-all duration-500 ease-in-out
          ${hidden && !isOpen ? "-translate-y-full" : "translate-y-0"}
          ${
            scrolled
              ? "py-0 bg-black/60 backdrop-blur-xl border-b border-white/10"
              : "py-1 bg-transparent"
          }
        `}
      >
        <Navbar 
          key={`${pathname}-${forceRebuild}`} 
          onOpenMenu={() => setIsOpen(true)} 
        />
      </div>

      {/* Full Screen Overlay Menu */}
      <NavMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        handleContactClick={handleContactClick}
      />
    </section>
  );
}