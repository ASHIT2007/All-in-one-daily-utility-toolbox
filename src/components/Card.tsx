import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  to: string;
}

export const Card: React.FC<CardProps> = ({ icon: Icon, title, desc, to }) => (
  <Link
    to={to}
    className="group relative flex flex-col items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    aria-label={`Open ${title}`}
  >
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
      <Icon size={24} className="text-primary" strokeWidth={1.8} />
    </div>
    <div>
      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{desc}</p>
    </div>
  </Link>
);