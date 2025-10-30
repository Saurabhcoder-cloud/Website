import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  if (!gtmId) return null;

  const inlineScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${gtmId}');`;

  return (
    <>
      <Script id="gtm-base" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`} />
      <Script id="gtm-inline" strategy="afterInteractive">
        {inlineScript}
      </Script>
    </>
  );
}
