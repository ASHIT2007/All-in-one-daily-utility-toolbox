import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";

interface ToolPageProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    children: React.ReactNode;
    maxWidth?: string;
}

/**
 * Consistent wrapper for every tool page:
 * back link + heading + icon + content area.
 */
export const ToolPage: React.FC<ToolPageProps> = ({
    icon: Icon,
    title,
    description,
    children,
    maxWidth = "max-w-2xl",
}) => {
    return (
        <div className={`${maxWidth} mx-auto space-y-6`}>
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    to="/"
                    className="p-2 -ml-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Back to dashboard"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon size={20} className="text-primary" strokeWidth={1.8} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            {children}
        </div>
    );
};
