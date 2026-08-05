function buildComDesignExecutive(data, options) {
    const opts = options || {};
    const name = escapeHtml(String(data.name || '').toUpperCase());
    const title = escapeHtml(String(data.title || '').toUpperCase());
    const width = 580;
    const topH = Math.round(width * DESIGN1_BG_TOP_NATURAL_H / DESIGN1_BG_NATURAL_W);
    const footerH = Math.max(48, Math.round(width * DESIGN1_BG_FOOTER_NATURAL_H / DESIGN1_BG_NATURAL_W));
    /* Name must sit above baked underline (~y 212 on the top art) */
    const underlineY = Math.round(topH * DESIGN1_BG_UNDERLINE_Y / DESIGN1_BG_TOP_NATURAL_H);
    const nameRowH = Math.max(44, underlineY - 6);
    const underlineGapH = Math.max(8, Math.round(topH * 14 / DESIGN1_BG_TOP_NATURAL_H));
    const contentH = Math.max(80, topH - nameRowH - underlineGapH);
    const logoColW = 150;
    const midW = width - logoColW;
    const padL = 44;

    const nameStyle = `font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:${COM_NAVY};line-height:1.1;text-transform:uppercase;mso-color-alt:${COM_NAVY};`;
    const titleStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${COM_TEAL};line-height:1.3;text-transform:uppercase;letter-spacing:0.4px;mso-color-alt:${COM_TEAL};`;
    const linkStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#1a1a1a;text-decoration:none;line-height:1.35;mso-color-alt:#1a1a1a;`;
    const footerWebStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerTagStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;letter-spacing:1.1px;text-transform:uppercase;line-height:1.2;mso-color-alt:#FFFFFF;`;