
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface CreditsEasterEggProps {
  open: boolean;
  onClose: () => void;
}

const CreditsEasterEgg = ({ open, onClose }: CreditsEasterEggProps) => {
  const easterEggRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Track the easter egg view
    if (open && typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'konami_credits_shown',
        timestamp: new Date().toISOString(),
      });
    }

    // Add ESC key handler to close the easter egg
    const handleEscKey = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div 
      ref={easterEggRef}
      className="fixed inset-0 bg-uin-black text-uin-purple z-[9999] p-10 overflow-y-auto"
      style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-uin-purple/20 rounded-full transition-colors"
        aria-label="Close credits"
      >
        <X size={24} />
      </button>
      
      <h1 className="text-2xl md:text-3xl mb-2 text-center animate-flicker">
        UIN Dev Mode: Credits Unlocked
      </h1>
      
      <p className="text-center text-uin-purple/80 mb-8">
        made with love and passion by these people:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-10 max-w-3xl mx-auto">
        <div className="animate-flicker">Alberto Czernikowski</div><div className="animate-flicker">Founder & CCO</div>
        <div className="animate-flicker">Carolina Totaro Graziani</div><div className="animate-flicker">UX/UI designer</div>
        <div className="animate-flicker">Evelyn Aguirre</div><div className="animate-flicker">Adm & Finance Analyst</div>
        <div className="animate-flicker">Facundo Ayerza</div><div className="animate-flicker">Fullstack Developer</div>
        <div className="animate-flicker">Facundo Corsi</div><div className="animate-flicker">Founder & CEO</div>
        <div className="animate-flicker">Florencia Spagnuolo</div><div className="animate-flicker">Manager de UX</div>
        <div className="animate-flicker">Germán Rotilli</div><div className="animate-flicker">Tech Lead</div>
        <div className="animate-flicker">Iara Torres</div><div className="animate-flicker">People Assistant</div>
        <div className="animate-flicker">Iván Plouchuk</div><div className="animate-flicker">Gaming Partnership Development Manager</div>
        <div className="animate-flicker">Juan Ignacio Ruiz</div><div className="animate-flicker">Intern</div>
        <div className="animate-flicker">Manuel Heredia</div><div className="animate-flicker">CTO</div>
        <div className="animate-flicker">Marcos Durañona</div><div className="animate-flicker">CFO</div>
        <div className="animate-flicker">María de la Paz Del Viso Fernández</div><div className="animate-flicker">People Manager</div>
        <div className="animate-flicker">María José Cesarini</div><div className="animate-flicker">CBDO</div>
        <div className="animate-flicker">Martín Bocanegra</div><div className="animate-flicker">Backend Developer</div>
        <div className="animate-flicker">Nicolas Araújo</div><div className="animate-flicker">Backend Developer</div>
        <div className="animate-flicker">Nicolás Espindola</div><div className="animate-flicker">Head of Product</div>
        <div className="animate-flicker">Nicolás Sequera</div><div className="animate-flicker">Frontend Developer</div>
        <div className="animate-flicker">Pablo Scarfoni</div><div className="animate-flicker">Head of Admin</div>
        <div className="animate-flicker">Santiago Nicolás Martinez Bonafine</div><div className="animate-flicker">QA & Testing</div>
        <div className="animate-flicker">Silvia Viola</div><div className="animate-flicker">Chief of Staff</div>
        <div className="animate-flicker">Tobias Tedin</div><div className="animate-flicker">Partnership Leader</div>
        <div className="animate-flicker">Tomás Álvarez</div><div className="animate-flicker">UX/UI designer</div>
      </div>
      
      {/* CRT Sweep Effect */}
      <div className="absolute inset-0 pointer-events-none after:content-[''] after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.05)_100%)] after:z-[9999] after:animate-crtSweep" />
    </div>
  );
};

export default CreditsEasterEgg;
