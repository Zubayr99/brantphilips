import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useRef } from "react";

const queryClient = new QueryClient();

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const lineReveal = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.0, ease: EASE } }
};

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "FN:Serkan",
  "N:;Serkan;;;",
  "TEL;TYPE=CELL:+4917613626416",
  "EMAIL:serkan.python@gmail.com",
  "ORG:Brant and Philips",
  "TITLE:CEO",
  "END:VCARD"
].join("\n");

const WA_URL = "https://wa.me/4917613626416";

const TEAM = [
  {
    name: "Serkan",
    title: "CEO",
    email: "serkan.python@gmail.com",
    wa: WA_URL,
  },
  {
    name: "Minkail",
    title: "Assistent",
    email: "",
    wa: "",
  },
  {
    name: "Kubilay",
    title: "Data Analyst",
    email: "",
    wa: "",
  },
];

function BusinessCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -80, rotate: -6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
      style={{ perspective: 1000 }}
      className="cursor-pointer"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[340px] md:w-[420px] bg-[hsl(45,30%,96%)] border border-[hsl(222,47%,18%)] shadow-2xl"
        data-testid="business-card"
      >
        {/* Outer decorative border */}
        <div className="absolute inset-[6px] border border-[hsl(222,47%,18%)]/30 pointer-events-none" />

        <div className="px-10 py-10 flex flex-col gap-0" style={{ aspectRatio: "1.75 / 1" }}>
          {/* Company name top */}
          <div className="flex justify-between items-start mb-auto">
            <div>
              <p className="font-sans text-[8px] tracking-[0.45em] uppercase text-[hsl(222,47%,18%)]/60 mb-1">
                Brant &amp; Philips
              </p>
              <p className="font-sans text-[7px] tracking-[0.3em] uppercase text-[hsl(38,60%,45%)]/80">
                Est. 2026
              </p>
            </div>
            <div className="w-6 h-6 border border-[hsl(222,47%,18%)]/20 flex items-center justify-center">
              <div className="w-3 h-3 border border-[hsl(38,60%,45%)]/60" />
            </div>
          </div>

          {/* Name + Title center */}
          <div className="mt-auto mb-2">
            <h2 className="font-serif text-3xl md:text-4xl text-[hsl(222,47%,18%)] tracking-tight leading-none mb-1">
              Serkan
            </h2>
            <p className="font-sans text-[8px] tracking-[0.5em] uppercase text-[hsl(38,60%,45%)]">
              Chief Executive Officer
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[hsl(222,47%,18%)]/15 my-3" />

          {/* Contact bottom */}
          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
              <p className="font-sans text-[7.5px] tracking-wide text-[hsl(222,47%,18%)]/70">
                serkan.python@gmail.com
              </p>
              <p className="font-sans text-[7.5px] tracking-wide text-[hsl(222,47%,18%)]/70">
                +49 176 1362 6416
              </p>
            </div>
            <p className="font-sans text-[6.5px] tracking-[0.3em] uppercase text-[hsl(222,47%,18%)]/30">
              Confidential
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden py-20">

      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-border" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
        <div className="absolute top-0 bottom-0 left-12 w-px bg-border opacity-40" />
        <div className="absolute top-0 bottom-0 right-12 w-px bg-border opacity-40" />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8 w-full max-w-2xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Brand header */}
        <motion.div variants={fadeUp} className="font-sans text-xs tracking-[0.35em] uppercase text-muted-foreground mb-14">
          Brant &amp; Philips — Est. 2026
        </motion.div>

        {/* Animated Business Card */}
        <motion.div variants={fadeUp} className="mb-14 flex justify-center">
          <BusinessCard />
        </motion.div>

        <motion.div variants={lineReveal} className="h-px bg-secondary w-40 mb-12 origin-left" />

        {/* Contact links */}
        <motion.div variants={stagger} className="space-y-6 w-full">
          <motion.a
            variants={fadeUp}
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-whatsapp"
            className="group flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground group-hover:text-secondary transition-colors duration-300">
              WhatsApp
            </span>
            <span className="font-serif text-2xl text-primary group-hover:text-secondary transition-colors duration-300">
              +49 176 1362 6416
            </span>
          </motion.a>

          <motion.div variants={lineReveal} className="h-px bg-border w-24 mx-auto origin-left" />

          <motion.a
            variants={fadeUp}
            href="mailto:serkan.python@gmail.com"
            data-testid="link-email"
            className="group flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground group-hover:text-secondary transition-colors duration-300">
              E-Mail
            </span>
            <span className="font-serif text-xl text-primary group-hover:text-secondary transition-colors duration-300 break-all">
              serkan.python@gmail.com
            </span>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div variants={lineReveal} className="h-px bg-secondary w-40 my-14 origin-left" />

        {/* Mitarbeiterliste */}
        <motion.div variants={stagger} className="w-full">
          <motion.div variants={fadeUp} className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-8 text-center">
            Mitarbeiter
          </motion.div>

          <div className="w-full divide-y divide-border border-t border-b border-border">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                data-testid={`row-team-${i}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-6 px-2"
              >
                <div className="flex flex-col items-start text-left gap-1">
                  <span className="font-serif text-xl text-primary">{member.name}</span>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-secondary">
                    {member.title}
                  </span>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="font-sans text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      {member.email}
                    </a>
                  )}
                  {member.wa && (
                    <a href={member.wa} target="_blank" rel="noopener noreferrer" className="font-sans text-xs tracking-widest uppercase text-secondary hover:text-primary transition-colors duration-200">
                      WhatsApp
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QR Code */}
        <motion.div variants={lineReveal} className="h-px bg-secondary w-40 my-14 origin-left" />

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            Kontakt speichern
          </span>
          <div data-testid="qr-contact" className="p-4 bg-background border border-border">
            <QRCodeSVG
              value={VCARD}
              size={148}
              fgColor="hsl(222 47% 18%)"
              bgColor="transparent"
              level="M"
            />
          </div>
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-muted-foreground/50">
            QR-Code abscannen
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 font-sans text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50">
          Confidential &mdash; For Authorised Parties Only
        </motion.div>
      </motion.div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
