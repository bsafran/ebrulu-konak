import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '40px 20px',
            backgroundColor: '#f3efea',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#d32f2f', fontSize: '24px', marginBottom: '16px' }}>
            Bir hata oluştu
          </h2>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px', maxWidth: '500px' }}>
            Sayfayı gösterirken bir sorun yaşandı. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#9c714b',
              color: '#f3efea',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 200ms linear',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8a6140';
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#9c714b';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
