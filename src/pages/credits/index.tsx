import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const Credits = (): JSX.Element => {
  const partnerLogos = [
    {
      name: 'Vercel',
      url: '/2.0/vercel-logotype-dark.svg',
    },
    {
      name: 'Cloudflare',
      url: '/2.0/CF_logo_horizontal_blktype.svg',
    },
    {
      name: 'RAK Wireless',
      url: '/2.0/RAK-blue-main.svg',
    },
    {
      name: 'Open Collective',
      url: '/2.0/opencollectivelogo.svg',
    },
    {
      name: 'LILYGO',
      url: '/2.0/LILYGO.png',
    },
    {
      name: 'Discord',
      url: '/2.0/discord.svg',
    },
  ];
 return(
   <Layout
     title="Credits"
     description="Meshtastic is made possible by the following people & organizations."
   >
     <main className="relative mt-20">
       <div className="container mx-auto p-8 leading-normal space-y-4">
         <h1>Sponsor Meshtastic</h1>
         <p>
           We have partnered with both the <a className="underline" href="https://opencollective.com" target="_blank">Open Collective</a> and the <a className="underline" href="https://www.oscollective.org" target="_blank">Open Source Collective</a> to help us with a fiscal management framework and banking needs. They help support over three thousand open source projects including the PHP Foundation, F-Droid, Sonarr, LinuxServer and DarkReader. We are in good hands and good company.
         </p>
         <p>
           As with everything we do here, Open Collective provides a fully transparent framework for our budget and expenses. You can see what we’re bringing in, who is spending money and where that money is going <a className="underline" href="https://opencollective.com/meshtastic" target="_blank">here</a>.
         </p>
         <p>
           In addition to our partnership with Open Collective and Open Source Collective, we have also been approved into the <a className="underline" href="https://github.com/sponsors" target="_blank">GitHub Sponsors</a> program where we can set fundraising goals with GitHub.
         </p>
         <p>
           All donations made through GitHub will be deposited to our account with the Open Source Collective and managed by the Open Collective. This means we have a single place to monitor and maintain transparency of our finances.
         </p>
         <p>
           If you are able, please contribute to this amazing project.
         </p>
         <div className="indexCtasBody">
           <Link
           className={'button button--outline  button--lg cta--button'}
           to={'https://opencollective.com/meshtastic/donate'}
           >
           Sponsor Meshtastic
           </Link>
         </div>        
       </div>
       <div className="container mx-auto p-8 leading-normal space-y-4">
        <h2>Fiscal Sponsors</h2>
       </div>
       <div className="container mx-auto p-8 leading-normal space-y-4">
        <h2>Partnerships</h2>
        <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="col-span-1 flex justify-center bg-gray-50 py-8 px-8"
            >
              <img
                className="max-h-12"
                src={logo.url}
                alt={logo.name}
              />
            </div>
          ))}
        </div>
       </div>
       <div className="container mx-auto p-8 leading-normal space-y-4">
        <h2>Contributors</h2>
       </div>
       <div className="container mx-auto p-8 leading-normal space-y-4">
        <h2>Project Admins</h2>
       </div>
       // <div className="container mx-auto p-8 leading-normal space-y-4">
       //  <h2>Special Mentions</h2>
       // </div>
     </main>
   </Layout>
 )
}

export default Credits;
