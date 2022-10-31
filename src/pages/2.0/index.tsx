import '@leenguyen/react-flip-clock-countdown/dist/index.css';

import React from 'react';

import { FiTwitter } from 'react-icons/fi';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import Layout from '@theme/Layout';

const TwoPointZero = (): JSX.Element => {
  const stats = [
    { label: 'Active Nodes', value: 'xx+' },
    { label: 'Community Members', value: '4000+' },
    { label: 'Total Commits', value: '4800+' },
    { label: 'Community Donations', value: '$5700+' },
  ];
  const logos = [
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
  return (
    <Layout title="Meshtastic 2.0" description="Meshtastic 2.0 Landing Page">
      <div className="bg-white">
        <main>
          {/* Hero section */}
          <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-24">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div>
                <div>
                  <img
                    className="h-11 w-auto"
                    it
                    src="/design/logo/svg/Mesh_Logo_Black.svg"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-20">
                  <div>
                    <a href="#" className="inline-flex space-x-4">
                      <span className="rounded bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-500">
                        What's new
                      </span>
                      <span className="inline-flex items-center space-x-1 text-sm font-medium text-rose-500">
                        <span>Click to find out</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </div>
                  <div className="mt-6 sm:max-w-xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                      Meshtastic 2.0 🎉🎉🎉
                    </h1>
                    <p className="mt-6 text-xl text-gray-500">
                      After 9 months in the making we present to you the next
                      milestone for the Meshtastic project.
                    </p>
                  </div>
                  <div className="mt-12 sm:w-full sm:max-w-lg">
                    <p className="mt-6 mb-4 text-xl text-gray-500">
                      As a part of the launch event, we are running a number of
                      giveaways, so jump in and win some prizes.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10"
                      >
                        Find Out More
                      </button>
                      <a
                        className="flex w-16 rounded-md border border-transparent bg-[#1DA1F2] shadow hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://twitter.com/TheMeshtastic/status/1586933393526333441"
                      >
                        <FiTwitter className="m-auto text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
              <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="hidden sm:block">
                  <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-50 lg:left-80 lg:right-0 lg:w-full" />
                  <svg
                    className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                    width={404}
                    height={392}
                    fill="none"
                    viewBox="0 0 404 392"
                  >
                    <defs>
                      <pattern
                        id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          width={4}
                          height={4}
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width={404}
                      height={392}
                      fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                    />
                  </svg>
                </div>
                <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                  <img
                    className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                    src="/2.0/webUI.png"
                    alt="Web UI"
                  />
                  <img
                    className="absolute top-0 m-20 w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                    src="/2.0/android.jpg"
                    alt="Android"
                  />
                  <img
                    className="absolute top-0 left-96 m-20 w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                    src="/2.0/ios.png"
                    alt="IOS"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial/stats section */}
          <div className="relative mt-20">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8">
              <div className="relative sm:py-16 lg:py-0">
                <div
                  aria-hidden="true"
                  className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
                >
                  <div className="absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72" />
                  <svg
                    className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                    width={404}
                    height={392}
                    fill="none"
                    viewBox="0 0 404 392"
                  >
                    <defs>
                      <pattern
                        id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          width={4}
                          height={4}
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width={404}
                      height={392}
                      fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                    />
                  </svg>
                </div>
                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20">
                  {/* Testimonial card*/}
                  <div className="relative overflow-hidden rounded-2xl pt-64 pb-10 shadow-xl">
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src="/2.0/background.png"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-green-500 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-600 via-green-600 opacity-90" />
                    <div className="relative px-8">
                      <div>
                        <img
                          className="h-8 text-white"
                          src="/2.0/typelogo.svg"
                          alt="Meshtastic"
                        />
                      </div>
                      <blockquote className="mt-8">
                        <div className="relative text-lg font-medium text-white md:flex-grow">
                          <svg
                            className="absolute top-0 left-0 h-8 w-8 -translate-x-3 -translate-y-2 transform text-rose-400"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                          >
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                          <p className="relative">
                            Tincidunt integer commodo, cursus etiam aliquam
                            neque, et. Consectetur pretium in volutpat, diam.
                            Montes, magna cursus nulla feugiat dignissim id
                            lobortis amet.
                          </p>
                        </div>

                        <footer className="mt-4">
                          <p className="text-base font-semibold text-rose-200">
                            Quote author
                          </p>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                {/* Content area */}
                <div className="pt-12 sm:pt-16 lg:pt-20">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    A brief overview of all the changes and improvements
                  </h2>
                  <div className="mt-6 space-y-6 text-gray-500">
                    <p className="text-lg">
                      Sagittis scelerisque nulla cursus in enim consectetur
                      quam. Dictum urna sed consectetur neque tristique
                      pellentesque. Blandit amet, sed aenean erat arcu morbi.
                      Cursus faucibus nunc nisl netus morbi vel porttitor vitae
                      ut. Amet vitae fames senectus vitae.
                    </p>
                    <p className="text-base leading-7">
                      Sollicitudin tristique eros erat odio sed vitae, consequat
                      turpis elementum. Lorem nibh vel, eget pretium arcu vitae.
                      Eros eu viverra donec ut volutpat donec laoreet quam urna.
                      Sollicitudin tristique eros erat odio sed vitae, consequat
                      turpis elementum. Lorem nibh vel, eget pretium arcu vitae.
                      Eros eu viverra donec ut volutpat donec laoreet quam urna.
                    </p>
                    <p className="text-base leading-7">
                      Rhoncus nisl, libero egestas diam fermentum dui. At quis
                      tincidunt vel ultricies. Vulputate aliquet velit faucibus
                      semper. Pellentesque in venenatis vestibulum consectetur
                      nibh id. In id ut tempus egestas. Enim sit aliquam nec, a.
                      Morbi enim fermentum lacus in. Viverra.
                    </p>
                  </div>
                </div>

                {/* Stats section */}
                <div className="mt-10">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="border-t-2 border-gray-100 pt-6"
                      >
                        <dt className="text-base font-medium text-gray-500">
                          {stat.label}
                        </dt>
                        <dd className="text-3xl font-bold tracking-tight text-gray-900">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-10">
                    <a href="#" className="text-base font-medium text-rose-500">
                      Further reading...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo cloud section */}
          <div className="mt-32">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-24">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    All made possible by the amazing companies that support us.
                  </h2>
                  <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                    Running a project of this scale is no easy feat, without the
                    generosity of many of our vendors and providers, none of
                    this would be possible.
                  </p>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                  {logos.map((logo) => (
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
            </div>
          </div>

          {/* CTA section */}
          <div className="relative mt-24 sm:mt-32 sm:py-16">
            <div aria-hidden="true" className="hidden sm:block">
              <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
              <svg
                className="absolute top-8 left-1/2 -ml-3"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
                />
              </svg>
            </div>
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative overflow-hidden rounded-2xl bg-green-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 1463 360"
                  >
                    <path
                      className="text-green-400 text-opacity-40"
                      fill="currentColor"
                      d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                    />
                    <path
                      className="text-green-600 text-opacity-40"
                      fill="currentColor"
                      d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-12">
                  <div className="sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Countdown to Prize Draw!
                    </h2>
                  </div>
                  <FlipClockCountdown
                    className="m-auto"
                    to={new Date(2022, 12, 1).getTime()}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default TwoPointZero;
