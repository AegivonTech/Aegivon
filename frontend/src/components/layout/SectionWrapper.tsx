"use client";
import React from "react";
import { motion } from "framer-motion";

export const SectionWrapper = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section 
      id={id} 
      className={`py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};
