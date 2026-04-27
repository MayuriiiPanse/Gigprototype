import React, { useState, useRef } from 'react';
import IncomeCertificate from './certificate/IncomeCertificate';
import { QRCodeSVG } from 'qrcode.react';
import { callGemini } from '../utils/gemini';

export default function Certificate({ data }) {
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const certRef = useRef(null);

  const generateSummary = async () => {
    setLoadingAI(true);
    const prompt = `Write a short professional income verification summary for gig worker Ravi Kumar, GigScore 742, average monthly ₹21,400 from Zomato/Swiggy/Ola.`;
    const text = await callGemini(prompt);
    setAiSummary(text);
    setLoadingAI(false);
  };

  const downloadPDF = async () => {
    setLoadingPDF(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`GigShield_Certificate_RaviKumar_${Date.now()}.pdf`);
    } catch (e) {
      alert('PDF generation failed. Make sure html2canvas and jspdf are installed.');
      console.error(e);
    }
    setLoadingPDF(false);
  };

  return (
    <div className="space-y-8">

      {/* Certificate Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold syne text-lg">Income Certificate Preview</h3>
          <button
            onClick={downloadPDF}
            disabled={loadingPDF}
            className="flex items-center gap-2 bg-[#f5a623] hover:bg-amber-500 disabled:opacity-50 text-black font-bold py-2.5 px-6 rounded-xl transition-all text-sm"
          >
            {loadingPDF ? (
              <>
                <span className="animate-spin">⏳</span> Generating PDF...
              </>
            ) : (
              <>
                📄 Download PDF
              </>
            )}
          </button>
        </div>

        {/* Certificate — this gets captured for PDF */}
        <div className="overflow-x-auto">
          <IncomeCertificate ref={certRef} aiSummary={aiSummary} />
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-[#161d26] p-6 rounded-2xl border border-white/5">
        <h3 className="font-semibold syne mb-2">AI Certificate Summary</h3>
        <p className="text-sm text-gray-400 mb-5">
          Generate a professional summary — it gets embedded into the PDF automatically.
        </p>
        <button
          onClick={generateSummary}
          disabled={loadingAI}
          className="bg-[#3ecf8e] hover:bg-green-500 disabled:opacity-50 text-black font-bold py-3 px-8 rounded-xl transition-all"
        >
          {loadingAI ? "Generating..." : "✨ Generate AI Summary"}
        </button>

        {aiSummary && (
          <div className="mt-6 p-5 bg-black/50 rounded-xl">
            <p className="font-medium mb-3 text-[#3ecf8e] text-sm">✅ AI Summary added to certificate:</p>
            <p className="text-sm leading-relaxed text-gray-300">{aiSummary}</p>
          </div>
        )}
      </div>

      {/* QR Code */}
      <div className="bg-[#161d26] p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-3">
        <p className="text-sm font-medium">Verification QR Code</p>
        <div className="bg-white p-4 rounded-2xl">
          <QRCodeSVG value={`https://gigshield.in/verify/${data.id}`} size={160} />
        </div>
        <p className="text-xs text-gray-500">Scan to verify at gigshield.in/verify/{data.id}</p>
      </div>

    </div>
  );
}
