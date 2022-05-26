import React from 'react';
import Layout from '@theme/Layout';

const Sponsor = (): JSX.Element => {
  return(
    <Layout
      title="Sponsor"
      description="Contribute Funds to Meshtastic"
    >
      <main className="margin-vert--xl">
        <div className="container">
          <h1>Sponsor Meshtastic</h1>
          <p>
            We have partnered with both the <a className="underline" href="https://opencollective.com" target="_blank">Open Collective</a> and the <a className="underline" href="https://www.oscollective.org" target="_blank">Open Source Collective</a> to help us with a fiscal management framework and banking needs. They help support over three thousand open source projects including the PHP Foundation, F-Droid, Sonarr, LinuxServer and DarkReader. We are in good hands and good company.
          </p>
          <p>
            As with everything we do here, Open Collective provides a fully transparent framework for our budget and expenses. You can see what we’re bringing in, who is spending money and where that money is going <a className="underline" href="https://opencollective.com/meshtastic" target="_blank">here</a>.
          </p>
          <p>
            In addition to our partnership with Open Collective and Open Source Collective, we have also been approved into the <a className="underline" href="https://github.com/sponsors" target="_blank">GitHub Sponsors</a> program where we can set fundraising goals with GitHub. Check them out too:
          </p>
          <p>
            All donations made through GitHub will be deposited to our account with the Open Source Collective and managed by the Open Collective. This means we have a single place to monitor and maintain transparency of our finances.
          </p>
          <p>
            If you are able, please contribute to this amazing project.
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default Sponsor;
