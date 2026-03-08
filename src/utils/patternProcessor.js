const tableToMarkdown = (tableEl) => {
  const rows = Array.from(tableEl.querySelectorAll('tr'));
  if (rows.length === 0) return '';
  const mdRows = rows.map(tr => {
    const cells = Array.from(tr.querySelectorAll('th, td'));
    return `| ${cells.map(c => c.innerText.trim().replace(/\|/g, '\\|')).join(' | ')} |`;
  });
  const headerLen = (rows[0].querySelectorAll('th, td')).length;
  mdRows.splice(1, 0, `| ${Array(headerLen).fill('---').join(' | ')} |`);
  return `\n\n${mdRows.join('\n')}\n\n`;
};

export const patternProcessor = (node) => {
  const walk = (el) => {
    if (!el) return '';
    if (el.nodeType === 3) return el.textContent;
    if (el.nodeType !== 1) return '';
    if (el.tagName === 'PRE' || el.tagName === 'CODE-BLOCK' || el.classList.contains('code-block-wrapper')) {
      const code = el.querySelector('code')?.innerText || el.innerText;
      return `\n\n\`\`\`\n${code.trim()}\n\`\`\`\n\n`;
    }
    if (el.tagName === 'TABLE') return tableToMarkdown(el);
    if (el.tagName === 'BR') return '\n';
    if (el.tagName === 'LI') {
      let cc = ''; el.childNodes.forEach(c => cc += walk(c));
      return `\n* ${cc.trim()}`;
    }
    if (['P', 'DIV', 'SECTION'].includes(el.tagName)) {
      let cc = ''; el.childNodes.forEach(c => cc += walk(c));
      return `\n\n${cc.trim()}\n\n`;
    }
    if (el.tagName === 'STRONG' || el.tagName === 'B') return ` **${el.innerText.trim()}** `;
    if (/^H[1-6]$/.test(el.tagName)) return `\n\n${'#'.repeat(el.tagName[1])} ${el.innerText.trim()}\n\n`;
    let f = ''; el.childNodes.forEach(c => f += walk(c));
    return f;
  };
  return walk(node).replace(/\n{3,}/g, '\n\n').trim();
};
