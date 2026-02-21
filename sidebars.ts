import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Core Features',
      collapsed: false,
      items: [
        'concepts/hooks',
        'concepts/owasp-coverage',
        'concepts/ai-gates',
        'concepts/deep-analysis',
        'concepts/governance-studio',
        'cli/index-command',
        'mcp/mcp-server',
      ],
    },
    {
      type: 'category',
      label: 'Guides & Concepts',
      items: [
        'cli/commands',
        'concepts/ide-support',
        'concepts/industry-presets',
        'concepts/score-trending',
        'mcp/memory-persistence',
        'examples/sme-cookbooks',
        'examples/quality-handshake',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Reference',
      items: [
        'cli/exit-codes',
        'cli/ci-integration',
        'cli/export-audit',
        'concepts/modes',
        'concepts/ast-gates',
        'concepts/presets',
        'reference/configuration',
      ],
    },
  ],
};

export default sidebars;
