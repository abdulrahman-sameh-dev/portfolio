import Link from "next/link";
import { GithubIcon, ArrowUpRightIcon, LinkedinIcon, TwitterIcon } from "lucide-animated";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/abdulrahman-sameh-dev", icon: <GithubIcon size={16} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/abdulrahman-sameh-dev/", icon: <LinkedinIcon size={16} /> },
    { name: "X (Twitter)", href: "https://x.com/darkhub_dev", icon: <TwitterIcon size={16} /> },
  ];

  return (
    <footer className="w-full py-12 px-6 border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Left: Branding & Copyright */}
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg tracking-tighter">
              Abdulrahman Sameh<span className="text-indigo-500">.</span>
            </h3>
            <p className="text-zinc-500 text-sm font-mono">
              © {currentYear} — Built with Next.js & Passion.
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex flex-wrap gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.icon}
                {link.name}
                <ArrowUpRightIcon size={12} className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>

          {/* Right: Availability Status */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/30 border border-zinc-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-300">
              Available for Projects
            </span>
          </div>

        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-12 h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
      </div>
    </footer>
  );
}