export const doExport = (segments) => {
  if (segments.length === 0) return;
  let finalDoc = `# Gemini Smart Export\nGenerated: ${new Date().toLocaleString()}\n\n---\n\n`;
  segments.forEach(item => {
    const roleLabel = item.role === "USER" ? "### \uD83D\uDC64 USER" : "### \u264A GEMINI";
    finalDoc += `${roleLabel}\n\n${item.markdown}\n\n---\n\n`;
  });
  const blob = new Blob([finalDoc], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Gemini_Export_${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
