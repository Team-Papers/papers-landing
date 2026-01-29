import Link from "next/link";
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const footerLinks = {
  Plateforme: [
    { label: "Catalogue", href: "/catalogue" },
    { label: "Pour les Auteurs", href: "/auteurs" },
    { label: "Pour les Lecteurs", href: "/lecteurs" },
    { label: "FAQ", href: "/faq" },
  ],
  Entreprise: [
    { label: "À Propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
    { label: "CGU", href: "/cgu" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
              <span className="text-lg font-bold">
                Papers<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-4">
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.phone}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" />
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.company}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
