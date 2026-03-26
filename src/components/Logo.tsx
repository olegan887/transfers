import React from 'react';
import { Plane, CarFront } from 'lucide-react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-yellow-400 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-3">
        <Plane className="absolute -top-2 -right-2 w-5 h-5 text-black transform rotate-45" strokeWidth={2.5} />
        <CarFront className="w-6 h-6 text-black" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col justify-center transform rotate-1">
        <span className="font-black text-black text-xl leading-none uppercase tracking-tighter">Cyprus</span>
        <span className="font-bold text-black text-[10px] leading-none uppercase tracking-widest mt-0.5 bg-white border border-black px-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] w-fit">Transfer</span>
      </div>
    </div>
  );
}
