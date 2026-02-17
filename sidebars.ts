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
        'concepts/governance-studio',
        'concepts/ai-gates',
        'cli/index-command',
        'mcp/mcp-server',
      ],
    },
    {
      type: 'category',
      label: 'Guides & Concepts',
      items: [
        'cli/commands',
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
        'concepts/ide-support',
        'reference/configuration',
      ],
    },
  ],
};

export default sidebars;
