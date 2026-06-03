import React from 'react';

const PageHeader = ({ title, description, marginBottom = '120px' }) => {
  return (
    <div style={{ marginBottom }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: 'bold',
            color: '#9c714b',
            margin: '0 0 16px 0',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#666',
            lineHeight: '1.6',
            margin: '0 0 24px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '0 20px',
          }}
        >
          {description}
        </p>
        {/* Decorative Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
          <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
