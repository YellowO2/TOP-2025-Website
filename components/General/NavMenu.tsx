"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

function NavMenu({ menuData }: { menuData: MenuData }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [blurActive, setBlurActive] = useState(false);

  const handleMouseEnter = (menu: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
    setTimeoutId(id);
  };

  useEffect(() => {
    if (activeMenu && menuData[activeMenu]) {
      setBlurActive(true);
      const timeout = setTimeout(() => setBlurActive(false), 50);
      return () => clearTimeout(timeout);
    }
  }, [activeMenu, menuData]);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 h-20">
      <div className="relative flex items-center justify-center h-full">
        <div className="flex justify-between gap-4 navMenuContainer px-6">
          <Link href='/' className="flex navMenuItem">Home</Link>
          <Link href='/about' className="flex navMenuItem">About Us</Link>
          <Link href='/games' className="flex navMenuItem">Games</Link>
          <Link href='/schedule' className="flex navMenuItem">Schedule</Link>
          <Link href='/faqs' className="flex navMenuItem">FAQs</Link>
        </div>

        <AnimatePresence>
          {activeMenu && menuData[activeMenu] && (
            <motion.div
              className={`absolute grid grid-cols-2  top-[90%] navDropdownMenuContainer w-1/2 bg-white transition-all duration-300 ease-in-out ${blurActive ? 'blur-sm' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.77, 0, 0.175, 1],
              }}
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="navDropdownMenuBox">
                <h3 className="flex w-full font-semibold text-sm uppercase mb-2">{menuData[activeMenu].title}</h3>
                <p className="flex w-full">{menuData[activeMenu].description}</p>
              </div>
              <div className="navDropdownMenuBox">
                {menuData[activeMenu].items.map((item, index) => (
                  <Link href={item.link} key={index} className="navDropdownMenuItem">
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NavMenu;
