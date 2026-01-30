import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      items: [
        'cli/commands',
        'cli/exit-codes',
        'cli/ci-integration',
        'cli/interactive',
      ],
    },
    {
      type: 'category',
      label: 'MCP Integration',
      items: [
        'mcp/mcp-server',
        'mcp/memory-persistence',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/philosophy',
        'concepts/modes',
        'concepts/workflows',
        'concepts/fix-packet',
        'concepts/ast-gates',
        'concepts/presets',
        'concepts/ide-support',
        'concepts/governance-studio',
        'concepts/vibe-coding-guide',
      ],
    },
    {
      type: 'category',
      label: 'Expert Guides & SME Cookbooks',
      items: [
        'examples/sme-cookbooks',
        'examples/quality-handshake',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/configuration',
      ],
    },
  ],
};

export default sidebars;
