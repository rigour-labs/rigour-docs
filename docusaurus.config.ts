import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Rigour',
  tagline: 'No Bullshit Code Review for AI Agents',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.rigour.run',
  baseUrl: '/',

  organizationName: 'rigour-labs',
  projectName: 'rigour',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/rigour-labs/rigour-docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/rigour-social-card.jpg',
    metadata: [
      { name: 'keywords', content: 'ai agent, code review, quality gate, ast, automation, devops' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Rigour - No Bullshit Code Review for AI Agents' },
      { property: 'og:description', content: 'Rigour acts as the Technical Contract that AI agents must satisfy before their work is accepted.' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Rigour',
      logo: {
        alt: 'Rigour Logo',
        src: 'img/rigour-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/rigour-labs/rigour',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started/installation',
            },
            {
              label: 'CLI Reference',
              to: '/cli/commands',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/rigour-labs/rigour',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/rigour',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/rigour',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rigour Labs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
