import React, { forwardRef } from 'react';

const IncomeCertificate = forwardRef(function IncomeCertificate({ aiSummary }, ref) {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const expiry = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  return (
    <div
      ref={ref}
      style={{
        background: '#ffffff',
        color: '#111',
        fontFamily: 'Georgia, serif',
        width: '700px',
        padding: '48px',
        borderRadius: '12px',
        border: '2px solid #e5e7eb',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '3px solid #f5a623', paddingBottom: '24px' }}>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f5a623', letterSpacing: '2px' }}>
          GIGSHIELD
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', letterSpacing: '1px' }}>
          FINANCIAL IDENTITY OS FOR GIG WORKERS
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginTop: '16px', letterSpacing: '1px' }}>
          INCOME VERIFICATION CERTIFICATE
        </div>
      </div>

      {/* Cert ID + Date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}>
        <span>Certificate ID: <strong style={{ color: '#111' }}>GS-IN-7742-MH</strong></span>
        <span>Issue Date: <strong style={{ color: '#111' }}>{today}</strong></span>
      </div>

      {/* To whom */}
      <p style={{ fontSize: '14px', color: '#374151', marginBottom: '20px', lineHeight: '1.6' }}>
        This is to certify that <strong>Ravi Kumar</strong>, residing in <strong>Indore, Madhya Pradesh</strong>,
        is a verified gig worker registered on the GigShield platform with the following income details:
      </p>

      {/* Details Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '24px' }}>
        <tbody>
          {[
            ['Worker Name', 'Ravi Kumar'],
            ['Location', 'Indore, Madhya Pradesh'],
            ['Active Platforms', 'Zomato, Swiggy, Ola'],
            ['Verification Period', 'October 2024 – March 2025 (6 Months)'],
            ['Average Monthly Income', '₹21,400'],
            ['Total Earnings (6 months)', '₹1,28,400'],
            ['Total Orders Completed', '619'],
            ['On-Time Delivery Rate', '95%'],
            ['GigScore', '742 / 850 (Excellent)'],
            ['Active Days (Last Month)', '26 / 30'],
          ].map(([label, value]) => (
            <tr key={label} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '10px 12px', color: '#6b7280', width: '45%' }}>{label}</td>
              <td style={{ padding: '10px 12px', fontWeight: 'bold', color: '#111' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* AI Summary if available */}
      {aiSummary && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>
            AI-GENERATED PROFESSIONAL SUMMARY
          </div>
          <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{aiSummary}</p>
        </div>
      )}

      {/* Declaration */}
      <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6', marginBottom: '24px' }}>
        This certificate has been automatically generated and verified by the GigShield AI Engine
        based on actual platform data. It is intended for use as proof of income for loan applications,
        rental agreements, and other financial verifications.
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #f5a623', paddingTop: '16px' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Valid Until</div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#111' }}>{expiry}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: '#f5a623', color: '#fff', fontSize: '11px',
            padding: '6px 16px', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px'
          }}>
            ✓ VERIFIED BY GIGSHIELD AI
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>gigshield.in/verify/GS-IN-7742-MH</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>GigScore Rating</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f5a623' }}>742</div>
          <div style={{ fontSize: '10px', color: '#6b7280' }}>EXCELLENT</div>
        </div>
      </div>
    </div>
  );
});

export default IncomeCertificate;
