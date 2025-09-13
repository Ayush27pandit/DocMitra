import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Rent Agreement", href: "#" },
    { label: "Invoice Generator", href: "#" },
    { label: "Freelance Contracts", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "FAQs", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:support@docmitra.in" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-8 font-inter">
      <div className="max-w-7xl mx-auto pl-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo + Desc */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 ">DocMitra</h2>
          <p className="text-sm pr-4">
            Your trusted partner for fast, easy, and legally sound document
            generation.
          </p>
        </div>

        {/* Mapped Footer Sections */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h3 className="text-white font-semibold mb-3">{section}</h3>
            <ul className="space-y-2 text-sm">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} DocMitra. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="hover:text-white"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
