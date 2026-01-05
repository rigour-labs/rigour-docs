import fs from 'fs';
import path from 'path';
import { globby } from 'globby';

async function generateLLMsTxt() {
    const docsDir = path.join(process.cwd(), 'docs');
    const files = await globby(['**/*.mdx', '**/*.md'], { cwd: docsDir });

    let combinedContent = '# Rigour Documentation\n\n';
    combinedContent += 'No Bullshit Code Review for AI Agents\n\n';

    for (const file of files) {
        const filePath = path.join(docsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileName = file.replace(/\.mdx?$/, '');

        // Simple frontmatter removal for cleaner LLM reading
        const cleanContent = content.replace(/^---[\s\S]*?---\n*/, '');

        combinedContent += `## ${fileName.toUpperCase()}\n\n`;
        combinedContent += cleanContent + '\n\n---\n\n';
    }

    // Ensure static directory exists
    const staticDir = path.join(process.cwd(), 'static');
    if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir);

    fs.writeFileSync(path.join(staticDir, 'llms.txt'), combinedContent);
    console.log('llms.txt generated successfully in static folder');
}

generateLLMsTxt();
