    const underlineY = Math.round(topH * DESIGN1_BG_UNDERLINE_Y / DESIGN1_BG_TOP_NATURAL_H);
    const nameRowH = Math.max(44, underlineY - 6);
    /* Keep job title clearly below the baked underline (must not touch) */
    const underlineGapH = Math.max(18, Math.round(topH * 28 / DESIGN1_BG_TOP_NATURAL_H));
    const contentH = Math.max(80, topH - nameRowH - underlineGapH);
    const logoColW = 150;
    const midW = width - logoColW;
    /* Align name / title / contacts with baked underline start */
    const padL = Math.max(28, Math.round(width * DESIGN1_BG_LINE_X / DESIGN1_BG_NATURAL_W));
    const frameLineColor = '#C5E4EA';
    const frameLineW = 1;
    const cardInnerW = width - frameLineW;
    const cardH = topH + footerH;

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

    /* One left stack — name above line, title spaced below (no touch) */
    const nameBlockH = Math.max(28, nameRowH - 4);
    const identityStack = `
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
                  <tr>
                    <td height="${nameBlockH}" valign="bottom" style="height:${nameBlockH}px;padding:0;vertical-align:bottom;${nameStyle}">
                      <span class="sig-name-text" style="${nameStyle}">${buildOutlookSafeText(name, nameStyle, COM_NAVY)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td height="${underlineGapH}" style="height:${underlineGapH}px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td class="sig-title-text" style="padding:4px 0 8px 0;${titleStyle}">
                      <font color="${COM_TEAL}" face="Arial, Helvetica, sans-serif" style="${titleStyle}">${title}</font>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;">
                      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                        ${contactRows}
                      </table>
                    </td>
                  </tr>
                </table>`;

    const topOverlay = `
          <table cellpadding="0" cellspacing="0" border="0" width="${cardInnerW}" height="${topH}"
            class="sig-com-exec-overlay"
            style="border-collapse:collapse;width:${cardInnerW}px;height:${topH}px;margin-top:-${topH}px;">
            <tr>
              <td width="${midW}" valign="top"
                style="width:${midW}px;padding:8px 8px 4px ${padL}px;vertical-align:top;">
                ${identityStack}
              </td>
              <td width="${logoColW}" valign="middle" align="center"
                style="width:${logoColW}px;padding:6px 10px 0 0;vertical-align:middle;text-align:center;">
                <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="text-decoration:none;border:0;">
                  <img src="${logoSrc}" alt="Tattvam Markets" width="${logoW}" height="${logoH}" border="0"
                    class="sig-brand-logo sig-logo-img sig-logo-vertical sig-premium-logo sig-com-exec-logo"
                    style="display:block;border:0;margin:0 auto;width:${logoW}px;height:${logoH}px;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>
          </table>`;

    /* Footer = real <img> + same-height overlay only (keeps bar + Trade Better/socials/web aligned in .htm) */
    const footerOverlay = `
          <table cellpadding="0" cellspacing="0" border="0" width="${cardInnerW}" height="${footerH}"
            class="sig-com-exec-footer-overlay"
            style="border-collapse:collapse;width:${cardInnerW}px;height:${footerH}px;margin-top:-${footerH}px;">
            <tr>
              <td width="${cardInnerW}" height="${footerH}" valign="middle"
                style="width:${cardInnerW}px;height:${footerH}px;padding:0 18px 0 ${padL}px;vertical-align:middle;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" height="${footerH}"
                  style="border-collapse:collapse;width:100%;height:${footerH}px;">
                  <tr>
                    <td valign="middle" align="left" width="130" height="${footerH}"
                      style="width:130px;height:${footerH}px;vertical-align:middle;text-align:left;padding:0;white-space:nowrap;">
                      <font color="#FFFFFF" face="Arial, Helvetica, sans-serif" style="${footerTagStyle}">TRADE BETTER</font>
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

    const cardInner = `
          <table cellpadding="0" cellspacing="0" border="0" width="${cardInnerW}" style="border-collapse:collapse;width:${cardInnerW}px;">
            <tr>
              <td style="padding:0;line-height:0;font-size:0;mso-line-height-rule:exactly;">
                <img src="${topSrc}" alt="" width="${cardInnerW}" height="${topH}" border="0"
                  class="sig-com-exec-bg sig-com-exec-bg-top"
                  style="display:block;border:0;outline:none;width:${cardInnerW}px;height:${topH}px;-ms-interpolation-mode:bicubic;" />
              </td>
            </tr>
            <tr>
              <td height="0" style="padding:0;line-height:0;font-size:0;height:0;mso-line-height-rule:exactly;">
                ${topOverlay}
              </td>
            </tr>
            <tr>
              <td style="padding:0;line-height:0;font-size:0;mso-line-height-rule:exactly;">
                <img src="${footerSrc}" alt="" width="${cardInnerW}" height="${footerH}" border="0"
                  class="sig-com-exec-bg sig-com-exec-bg-footer"
                  style="display:block;border:0;outline:none;width:${cardInnerW}px;height:${footerH}px;-ms-interpolation-mode:bicubic;" />
              </td>
            </tr>
            <tr>
              <td height="0" style="padding:0;line-height:0;font-size:0;height:0;mso-line-height-rule:exactly;">
                ${footerOverlay}
              </td>
            </tr>
          </table>`;

    return `
    <table class="sig-com-executive sig-premium-exec sig-com-classic" cellpadding="0" cellspacing="0" border="0" width="${width}"
      style="border-collapse:collapse;width:${width}px;max-width:${width}px;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td colspan="2" bgcolor="${frameLineColor}" height="${frameLineW}"
          style="height:${frameLineW}px;padding:0;font-size:0;line-height:0;background-color:${frameLineColor};mso-line-height-rule:exactly;">&nbsp;</td>
      </tr>
      <tr>
        <td class="sig-com-exec-top" width="${cardInnerW}" valign="top" style="width:${cardInnerW}px;padding:0;vertical-align:top;">
          ${cardInner}
        </td>
        <td class="sig-com-exec-right-line" bgcolor="${frameLineColor}" width="${frameLineW}" valign="top"
          style="width:${frameLineW}px;padding:0;font-size:0;line-height:0;background-color:${frameLineColor};vertical-align:top;">
          <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
            <tr>
              <td bgcolor="${frameLineColor}" width="${frameLineW}" height="${cardH}"
                style="width:${frameLineW}px;height:${cardH}px;padding:0;font-size:0;line-height:0;background-color:${frameLineColor};mso-line-height-rule:exactly;">&nbsp;</td>
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