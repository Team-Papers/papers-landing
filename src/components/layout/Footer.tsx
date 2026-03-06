import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import Button from "@/components/ui/Button";

const footerLinks = {
  Plateforme: [
    { label: "Catalogue", href: "/catalogue" },
    { label: "Pour les Auteurs", href: "/auteurs" },
    { label: "Pour les Lecteurs", href: "/lecteurs" },
    { label: "FAQ", href: "/faq" },
  ],
  Entreprise: [
    { label: "A Propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "CGU", href: "/cgu" },
    { label: "Confidentialite", href: "/confidentialite" },
  ],
};

export default function Footer() {
  return (
    <footer>
      {/* CTA Band */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">
              Pret a commencer ?
            </h3>
            <p className="text-white/80 text-sm">Telechargez Papers gratuitement et commencez a lire.</p>
          </div>
          <Link href="#telecharger">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
              Telecharger l&apos;app
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-surface-dark text-white pattern-african">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/logo-dark.png"
                  alt="Papers"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className="text-lg font-display font-bold">
                  Papers<span className="text-primary">.</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {SITE_CONFIG.description}
              </p>
              <div className="flex gap-3 mb-6">
                {[
                  { icon: Facebook, href: SITE_CONFIG.social.facebook },
                  { icon: Twitter, href: SITE_CONFIG.social.twitter },
                  { icon: Instagram, href: SITE_CONFIG.social.instagram },
                  { icon: Linkedin, href: SITE_CONFIG.social.linkedin },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
                    aria-label={href}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-display font-semibold mb-5 text-white">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-display font-semibold mb-5 text-white">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0 text-primary/60" />
                  {SITE_CONFIG.email}
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-primary/60" />
                  {SITE_CONFIG.phone}
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0 text-primary/60" />
                  {SITE_CONFIG.address}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.company}. Tous droits reserves.</p>
            <p className="text-gray-600">Fait avec passion au Cameroun</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
