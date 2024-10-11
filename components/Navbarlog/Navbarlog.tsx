"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Menu, Avatar } from "antd";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1">My profile</Menu.Item>
      <Menu.Item key="2">My coupon</Menu.Item>
      <Menu.Item key="3">Service requests</Menu.Item>
      <Menu.Item key="4">Bookings</Menu.Item>
      <Menu.Item key="5">Payments</Menu.Item>
      <Menu.Item key="6" style={{ color: 'red' }}>Log out</Menu.Item>
    </Menu>
  );

  return (
    <header className="flex justify-between items-center px-10 py-5 shadow-md relative bg-white">
      <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
      <nav className="space-x-8 flex flex-row items-center">
        <a href="#" className="text-blue-500">Home</a>
        <a href="#" className="text-blue-500">Event</a>
        <a href="#" className="text-blue-500">Translator</a>
        <Button onClick={toggleDropdown} className="flex items-center space-x-2" icon={<Avatar size={50} src="/images/2.png" />} />
        {isOpen && (
          <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
            {menu}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
