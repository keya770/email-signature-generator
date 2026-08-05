/**
 * Design 1 — Classic Executive
 * Real top + footer <img>s from signature-design-background (no CSS art).
 * Content sits on each image via pull-up overlay. Footer overlay is ONLY the
 * footer row (fixed height) so Download .htm keeps Trade Better / socials / web
 * inside the bar instead of clipping under it.
 */
function buildComDesignExecutive(data, options) {
    const opts = options || {};
    const name = escapeHtml(data.name);
    const title = escapeHtml(data.title);
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
    const padL = 26;

    const nameStyle = `font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:${COM_NAVY};line-height:1.1;mso-color-alt:${COM_NAVY};`;
    const titleStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${COM_TEAL};line-height:1.3;mso-color-alt:${COM_TEAL};`;
    const linkStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#1a1a1a;text-decoration:none;line-height:1.35;mso-color-alt:#1a1a1a;`;
    const footerWebStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerTagStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;letter-spacing:1.1px;text-transform:uppercase;line-height:1.2;mso-color-alt:#FFFFFF;`;

    const logoW = 110;
    const logoH = Math.round(logoW * LOGO_VERTICAL_ASPECT);
    const iconMap = opts.iconDataUrls || {};
    const logoSrc = resolveLogoSrc(opts);
    const topSrc = iconMap[DESIGN1_BG_TOP_FILE] || opts.design1BgTopDataUrl || getAssetUrl(DESIGN1_BG_TOP_FILE);
    const footerSrc = iconMap[DESIGN1_BG_FOOTER_FILE] || opts.design1BgFooterDataUrl || getAssetUrl(DESIGN1_BG_FOOTER_FILE);
    const contactRows = buildComContactIconRows(data, linkStyle, iconMap, 16);

    const socialPlatforms = (data.socialPlatforms && data.socialPlatforms.length)
        ? data.socialPlatforms
        : Object.keys(SOCIAL_ICONS);
    const socialHtml = buildComFlatSocialRow({ ...data, socialPlatforms }, {
        variant: 'white', size: 20, gap: 7, align: 'center', iconDataUrls: opts.iconDataUrls
    });
    const footerGap = 12;

    const topOverlay = `
          <table cellpadding="0" cellspacing="0" border="0" width="${width}" height="${topH}"
            class="sig-com-exec-overlay"
            style="border-collapse:collapse;width:${width}px;height:${topH}px;margin-top:-${topH}px;">
            <tr>
              <td width="${midW}" height="${nameRowH}" valign="bottom"
                style="width:${midW}px;height:${nameRowH}px;padding:10px 8px 0 ${padL}px;vertical-align:bottom;">
                <span class="sig-name-text" style="${nameStyle}">${buildOutlookSafeText(name, nameStyle, COM_NAVY)}</span>
              </td>
              <td width="${logoColW}" rowspan="3" valign="middle" align="center"
                style="width:${logoColW}px;padding:6px 10px 0 0;vertical-align:middle;text-align:center;">
                <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="text-decoration:none;border:0;">
                  <img src="${logoSrc}" alt="Tattvam Markets" width="${logoW}" height="${logoH}" border="0"
                    class="sig-brand-logo sig-logo-img sig-logo-vertical sig-premium-logo sig-com-exec-logo"
                    style="display:block;border:0;margin:0 auto;width:${logoW}px;height:${logoH}px;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>
            <tr>
              <td height="${underlineGapH}" style="height:${underlineGapH}px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td width="${midW}" height="${contentH}" valign="top"
                style="width:${midW}px;height:${contentH}px;padding:2px 8px 4px ${padL}px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
                  <tr><td class="sig-title-text" style="padding:0 0 8px 0;${titleStyle}"><font color="${COM_TEAL}" face="Arial, Helvetica, sans-serif" style="${titleStyle}">${title}</font></td></tr>
                  <tr><td style="padding:0;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${contactRows}</table></td></tr>
                </table>
              </td>
            </tr>
          </table>`;

    /* Footer content lives in its OWN overlay (same height as footer img) — cannot push below the bar */
    const footerOverlay = `
          <table cellpadding="0" cellspacing="0" border="0" width="${width}" height="${footerH}"
            class="sig-com-exec-footer-overlay"
            style="border-collapse:collapse;width:${width}px;height:${footerH}px;margin-top:-${footerH}px;">
            <tr>
              <td width="${width}" height="${footerH}" valign="middle"
                style="width:${width}px;height:${footerH}px;padding:0 14px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" height="${footerH}"
                  style="border-collapse:collapse;width:100%;height:${footerH}px;">
                  <tr>
                    <td valign="middle" align="left" width="120" height="${footerH}"
                      style="width:120px;height:${footerH}px;vertical-align:middle;text-align:left;padding:0;white-space:nowrap;">
                      <font color="#FFFFFF" face="Arial, Helvetica, sans-serif" style="${footerTagStyle}">Trade Better</font>
                    </td>
                    <td valign="middle" align="center" height="${footerH}"
                      style="height:${footerH}px;vertical-align:middle;text-align:center;padding:0 ${footerGap}px;line-height:0;font-size:0;">
                      ${socialHtml || '&nbsp;'}
                    </td>
                    <td valign="middle" align="right" height="${footerH}"
                      style="height:${footerH}px;vertical-align:middle;text-align:right;padding:0;white-space:nowrap;">
                      <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="${footerWebStyle}">
                        <font color="#FFFFFF" face="Arial, Helvetica, sans-serif" style="${footerWebStyle}">${escapeHtml(data.websiteLabel)}</font>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>`;

    return `
    <table class="sig-com-executive sig-premium-exec sig-com-classic" cellpadding="0" cellspacing="0" border="0" width="${width}"
      style="border-collapse:collapse;width:${width}px;max-width:${width}px;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td class="sig-com-exec-top" width="${width}" style="width:${width}px;padding:0;">
          <table cellpadding="0" cellspacing="0" border="0" width="${width}" style="border-collapse:collapse;width:${width}px;">
            <tr>
              <td style="padding:0;line-height:0;font-size:0;mso-line-height-rule:exactly;">
                <img src="${topSrc}" alt="" width="${width}" height="${topH}" border="0"
                  class="sig-com-exec-bg sig-com-exec-bg-top"
                  style="display:block;border:0;outline:none;width:${width}px;height:${topH}px;-ms-interpolation-mode:bicubic;" />
              </td>
            </tr>
            <tr>
              <td height="0" style="padding:0;line-height:0;font-size:0;height:0;mso-line-height-rule:exactly;">
                ${topOverlay}
              </td>
            </tr>
            <tr>
              <td class="sig-com-exec-footer" background="${footerSrc}" width="${width}" height="${footerH}" valign="middle"
                style="width:${width}px;height:${footerH}px;padding:0;vertical-align:middle;mso-line-height-rule:exactly;">
                <img src="${footerSrc}" alt="" width="${width}" height="${footerH}" border="0"
                  class="sig-com-exec-bg sig-com-exec-bg-footer"
                  style="display:block;border:0;outline:none;width:${width}px;height:${footerH}px;-ms-interpolation-mode:bicubic;" />
              </td>
            </tr>
            <tr>
              <td height="0" style="padding:0;line-height:0;font-size:0;height:0;mso-line-height-rule:exactly;">
                ${footerOverlay}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${data.includeDisclaimer ? `
    <table class="sig-com-exec-disclaimer" cellpadding="0" cellspacing="0" border="0" width="${width}"
      style="border-collapse:collapse;width:${width}px;max-width:${width}px;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td style="padding:0;line-height:0;font-size:0;">
          ${buildGrayDisclaimerBlock({ width: width })}
        </td>
      </tr>
    </table>` : ''}`;
}