import Script from "next/script";

/**
 * Analytics + remarketing.
 *
 * Hoth audit on the new site flagged: (a) no analytics tool detected,
 * (b) no Facebook Pixel. Both addressed here.
 *
 * Configuration:
 *   - GA4   : set NEXT_PUBLIC_GA_ID in env (e.g. "G-XXXXXXXXXX"). Empty
 *             value disables GA4 entirely.
 *   - Pixel : NEXT_PUBLIC_FB_PIXEL_ID, falls back to the production
 *             pixel ID lifted from the live-site audit so we don't lose
 *             remarketing while env is being wired up.
 *
 * Both scripts use Next.js' `afterInteractive` strategy so they don't
 * block initial paint. The pixel noscript fallback uses an <img> as
 * required by Meta's installation guide.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "1480267782518513";

export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {FB_PIXEL_ID && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
