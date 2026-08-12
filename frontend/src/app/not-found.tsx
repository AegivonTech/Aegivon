"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { PrimaryButton } from "@/components/ui/Buttons";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-[80vh] items-center justify-center">
      <SectionWrapper className="relative z-10 w-full flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Background glowing effect */}
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
          
          <div className="relative flex flex-col items-center text-center z-10">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm"
            >
              <ShieldAlert className="w-12 h-12 text-primary" />
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-7xl md:text-9xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 mb-4"
            >
              404
            </motion.h1>

            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-heading font-bold text-white mb-4"
            >
              Protocol Not Found
            </motion.h2>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-secondary max-w-md text-lg mb-10"
            >
              The system sector you are trying to access does not exist or has been restricted. Please return to a secure zone.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/">
                <PrimaryButton className="flex items-center gap-2 px-8 py-4">
                  <ArrowLeft className="w-5 h-5" />
                  Return to Base
                </PrimaryButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
      </SectionWrapper>
    </div>
  );
}
