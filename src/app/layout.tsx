<script defer src="https://cloud.umami.is/share/GKwBpucVrJ4sEUVR" data-website-id="4d810ae3-2cfe-421e-a228-a3d23e40292c"></script>
import type { Metadata } from 'next'
import { useState } from 'react';
import SiteLoader from '../components/Loader/SiteLoader';
import './globals.css'

export const metadata: Metadata = {
  title: 'Dev Sopariwala - AI Engineer, Cloud Architect & Cybersecurity Specialist',
  description: 'AI engineer specializing in cloud architecture, cybersecurity, and generative AI. Building intelligent systems with intention, taste, and vision.',
  openGraph: {
    title: 'Dev Sopariwala - AI Engineer & Cloud Architect',
    description: 'Building intelligent systems at the intersection of AI, cloud, and security',
    url: 'https://devsopariwala.com',
    siteName: 'Dev Sopariwala Portfolio',
    locale: 'en_US',
    type: 'website',
  },
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className="bg-[#0a0a0a] text-gray-100 antialiased">
//         {children}
//       </body>
//     </html>
//   )
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-gray-100 antialiased">
        <SiteLoader onLoadComplete={() => setLoadingComplete(true)} />
        {loadingComplete && children}
      </body>
    </html>
  );
}