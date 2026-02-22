import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download } from "lucide-react";
import { ToolPage } from "../components/ToolPage";

export const QRCodeGen = () => {
    const [text, setText] = useState("https://github.com/ASHIT2007");
    const [fg, setFg] = useState("#000000");
    const [bg, setBg] = useState("#ffffff");

    const download = () => {
        const svg = document.getElementById("qr-svg");
        if (!svg) return;
        const data = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => { canvas.width = 256; canvas.height = 256; ctx?.drawImage(img, 0, 0, 256, 256); const a = document.createElement("a"); a.download = "qrcode.png"; a.href = canvas.toDataURL("image/png"); a.click(); };
        img.src = "data:image/svg+xml;base64," + btoa(data);
    };

    return (
        <ToolPage icon={QrCode} title="QR Generator" description="Create & download QR codes" maxWidth="max-w-md">
            <div className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Content (URL or text)</label>
                    <input type="text" className="w-full rounded-lg bg-card border border-border px-3 py-2.5 text-foreground" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text or URL..." />
                </div>

                <div className="flex justify-center p-8 rounded-xl bg-white border border-border shadow-soft">
                    <QRCodeSVG id="qr-svg" value={text || " "} size={200} bgColor={bg} fgColor={fg} level="H" includeMargin />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Foreground</label>
                        <input type="color" className="w-full h-10 rounded-lg bg-card border border-border p-1 cursor-pointer" value={fg} onChange={(e) => setFg(e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">Background</label>
                        <input type="color" className="w-full h-10 rounded-lg bg-card border border-border p-1 cursor-pointer" value={bg} onChange={(e) => setBg(e.target.value)} />
                    </div>
                </div>

                <button onClick={download} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2">
                    <Download size={16} /> Download PNG
                </button>
            </div>
        </ToolPage>
    );
};
