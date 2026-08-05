/**
 * Design 1 — Classic Executive
 * One real background <img> (signature-design-background.png). No CSS art.
 * Overlay: name / title / contacts / logo on white area; Trade Better + white
 * socials + website on the navy→teal footer bar baked into the same image.
 */
function buildComDesignExecutive(data, options) {
    const opts = options || {};
    const name = escapeHtml(data.name);
    const title = escapeHtml(data.title);
    const width = 580;
    const totalH = Math.round(width * DESIGN1_BG_NATURAL_H / DESIGN1_BG_NATURAL_W);
    const footerH = Math.max(44, Math.round(width * DESIGN1_BG_FOOTER_NATURAL_H / DESIGN1_BG_NATURAL_W));
    const bodyH = Math.max(120, totalH - footerH);
    const nameRowH = 58;
    const underlineGapH = 10;
    const contentH = Math.max(90, bodyH - nameRowH - underlineGapH);
    const logoColW = 160;
    const midW = width - logoColW;
    const padL = 28;

    const nameStyle = `font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:800;color:${COM_NAVY};line-height:1.15;mso-color-alt:${COM_NAVY};`;
    const titleStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${COM_TEAL};line-height:1.3;mso-color-alt:${COM_TEAL};`;
    const linkStyle = `font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:500;color:#1a1a1a;text-decoration:none;line-height:1.4;mso-color-alt:#1a1a1a;`;
    const footerWebStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerTagStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;letter-spacing:1.2px;text-transform:uppercase;line-height:1.2;mso-color-alt:#FFFFFF;`;

    const logoW = 118;
    const logoH = Math.round(logoW * LOGO_VERTICAL_ASPECT);
    const iconMap = opts.iconDataUrls || {};
    const logoSrc = resolveLogoSrc(opts);
    const bgSrc = iconMap[DESIGN1_BG_FILE] || opts.design1BgDataUrl || getAssetUrl(DESIGN1_BG_FILE);
    const contactRows = buildComContactIconRows(data, linkStyle, iconMap, 18);

    const socialPlatforms = (data.socialPlatforms && data.socialPlatforms.length)
        ? data.socialPlatforms
        : Object.keys(SOCIAL_ICONS);
    const socialHtml = buildComFlatSocialRow({ ...data, socialPlatforms }, {
        variant: 'white', size: 22, gap: 8, align: 'center', iconDataUrls: opts.iconDataUrls
    });
    const footerGap = 16;

    const overlay = `
          <table cellpadding="0" cellspacing="0" border="0" width="${width}" height="${totalH}"
            class="sig-com-exec-overlay"
            style="border-collapse:collapse;width:${width}px;height:${totalH}px;margin-top:-${totalH}px;">
            <tr>
              <td width="${midW}" height="${nameRowH}" valign="bottom"
                style="width:${midW}px;height:${nameRowH}px;padding:16px 8px 2px ${padL}px;vertical-align:bottom;">
                <span class="sig-name-text" style="${nameStyle}">${buildOutlookSafeText(name, nameStyle, COM_NAVY)}</span>
              </td>
              <td width="${logoColW}" rowspan="3" valign="middle" align="center"
                style="width:${logoColW}px;padding:8px 12px 0 0;vertical-align:middle;text-align:center;">
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
                style="width:${midW}px;height:${contentH}px;padding:4px 8px 8px ${padL}px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
                  <tr><td class="sig-title-text" style="padding:0 0 10px 0;${titleStyle}"><font color="${COM_TEAL}" face="Arial, Helvetica, sans-serif" style="${titleStyle}">${title}</font></td></tr>
                  <tr><td style="padding:0;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${contactRows}</table></td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="2" height="${footerH}" valign="middle"
                style="height:${footerH}px;padding:0 16px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%"
                  style="border-collapse:collapse;width:100%;">
                  <tr>
                    <td valign="middle" align="left" width="130"
                      style="width:130px;vertical-align:middle;text-align:left;padding:0;white-space:nowrap;">
                      <font color="#FFFFFF" face="Arial, Helvetica, sans-serif" style="${footerTagStyle}">Trade Better</font>
                    </td>
                    <td valign="middle" align="center"
                      style="vertical-align:middle;text-align:center;padding:0 ${footerGap}px;line-height:0;font-size:0;">
                      ${socialHtml || '&nbsp;'}
                    </td>
                    <td valign="middle" align="right"
                      style="vertical-align:middle;text-align:right;padding:0;white-space:nowrap;">
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
                <img src="${bgSrc}" alt="" width="${width}" height="${totalH}" border="0"
                  class="sig-com-exec-bg"
                  style="display:block;border:0;outline:none;width:${width}px;height:${totalH}px;-ms-interpolation-mode:bicubic;" />
              </td>
            </tr>
            <tr>
              <td height="0" style="padding:0;line-height:0;font-size:0;height:0;mso-line-height-rule:exactly;">
                ${overlay}
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