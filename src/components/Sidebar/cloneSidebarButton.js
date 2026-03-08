export const cloneSidebarButton = (originalList, svgHtml, ariaLabel, onClick) => {
  const clone = originalList.cloneNode(true);
  clone.querySelectorAll('[data-test-id]').forEach(el => el.removeAttribute('data-test-id'));
  clone.classList.add('gemini-exporter-injected');
  const matIcon = clone.querySelector('mat-icon');
  if (matIcon) {
    matIcon.removeAttribute('fonticon');
    matIcon.removeAttribute('data-mat-icon-name');
    matIcon.classList.remove('mat-ligature-font', 'google-symbols');
    matIcon.style.fontFamily = 'inherit';
    matIcon.style.display = 'flex';
    matIcon.style.alignItems = 'center';
    matIcon.style.justifyContent = 'center';
    matIcon.innerHTML = svgHtml;
  }
  const anchor = clone.querySelector('a');
  if (anchor) {
    anchor.removeAttribute('href');
    anchor.setAttribute('aria-label', ariaLabel);
    anchor.style.cursor = 'pointer';
  }
  clone.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); onClick(); });
  return clone;
};
