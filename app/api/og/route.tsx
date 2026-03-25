import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'VMST Host';
  const description = searchParams.get('description') || 'Hosting giá rẻ tốc độ cao';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B2B6F',
          backgroundImage: 'linear-gradient(135deg, #034CC9 0%, #0B2B6F 50%, #061B47 100%)',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#034CC9',
              }}
            >
              V
            </div>
            <span style={{ color: 'white', fontSize: '28px', fontWeight: 'bold' }}>
              VMST Host
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1
              style={{
                color: 'white',
                fontSize: '52px',
                fontWeight: 'bold',
                lineHeight: 1.2,
                margin: 0,
                maxWidth: '900px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title.length > 80 ? title.slice(0, 77) + '...' : title}
            </h1>
            {description && (
              <p
                style={{
                  color: '#93B5FF',
                  fontSize: '24px',
                  lineHeight: 1.4,
                  margin: 0,
                  maxWidth: '800px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {description.length > 120 ? description.slice(0, 117) + '...' : description}
              </p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#7BA3E6', fontSize: '20px' }}>vmst.host</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                }}
              >
                SSD NVMe
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                }}
              >
                Uptime 99.9%
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                }}
              >
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
