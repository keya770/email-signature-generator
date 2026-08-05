    const frameLineColor = '#D7EEF2';
    const frameLineW = 1;
    const underlineColor = '#B8E8EE';
    const disclaimerGray = '#F1F5F9';
    const outerW = width + frameLineW;
    const footerH = 52;
    const cardH = 255;

    const nameStyle = `font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:${COM_NAVY};line-height:1.1;mso-color-alt:${COM_NAVY};`;
    const titleStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:${COM_TEAL};line-height:1.3;mso-color-alt:${COM_TEAL};`;
    const linkStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:500;color:#1a1a1a;text-decoration:none;line-height:1.35;mso-color-alt:#1a1a1a;`;
    const footerWebStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerTagStyle = `font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#FFFFFF;letter-spacing:1.1px;text-transform:uppercase;line-height:1.2;mso-color-alt:#FFFFFF;`;

    const logoW = 110;
    const logoH = Math.round(logoW * LOGO_VERTICAL_ASPECT);
    const iconMap = opts.iconDataUrls || {};
    const logoSrc = resolveLogoSrc(opts);
    const contactRows = buildComContactIconRows(data, linkStyle, iconMap, 16);
    const socialPlatforms = (data.socialPlatforms && data.socialPlatforms.length)
        ? data.socialPlatforms
        : Object.keys(SOCIAL_ICONS);
    const socialHtml = buildComFlatSocialRow({ ...data, socialPlatforms }, {
        variant: 'white', size: 20, gap: 7, align: 'center', iconDataUrls: opts.iconDataUrls
    });

    /* Outlook-safe solid underline (single light teal) — no CSS gradient */
    const nameUnderline = `
                            <table cellpadding="0" cellspacing="0" border="0" width="180" role="presentation"
                              style="border-collapse:collapse;width:180px;">
                              <tr>
                                <td bgcolor="${underlineColor}" width="180" height="3"
                                  style="width:180px;height:3px;padding:0;font-size:0;line-height:0;background-color:${underlineColor};mso-line-height-rule:exactly;">&nbsp;</td>
                              </tr>
                            </table>`;

    return `
    <table class="sig-com-executive sig-premium-exec sig-com-classic" cellpadding="0" cellspacing="0" border="0" width="${outerW}"
      style="border-collapse:collapse;width:${outerW}px;max-width:${outerW}px;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td colspan="2" bgcolor="${frameLineColor}" height="${frameLineW}"
          style="height:${frameLineW}px;padding:0;font-size:0;line-height:0;background-color:${frameLineColor};mso-line-height-rule:exactly;">&nbsp;</td>
      </tr>
      <tr>
        <td width="${width}" style="width:${width}px;padding:0;background-color:#FFFFFF;">
          <table cellpadding="0" cellspacing="0" border="0" width="${width}" style="border-collapse:collapse;width:${width}px;background-color:#FFFFFF;">
            <tr>
              <td bgcolor="${COM_TEAL}" width="${accentW}" style="width:${accentW}px;padding:0;font-size:0;line-height:0;background-color:${COM_TEAL};">&nbsp;</td>
              <td width="${contentW}" style="width:${contentW}px;padding:${topPad}px 0 18px 0;background-color:#FFFFFF;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
                  <tr>
                    <td width="${leftW}" valign="top" style="width:${leftW}px;padding:0 18px 0 ${leftPad}px;vertical-align:top;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
                        <tr>
                          <td class="sig-name-text" style="padding:0;${nameStyle}">
                            ${buildOutlookSafeText(name, nameStyle, COM_NAVY)}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0 10px 0;line-height:0;font-size:0;">
                            ${nameUnderline}
                          </td>
                        </tr>
                        <tr>
                          <td class="sig-title-text" style="padding:0 0 10px 0;${titleStyle}">
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
                      </table>
                    </td>
                    <td width="${rightW}" valign="middle" align="center" style="width:${rightW}px;padding:0 16px 0 0;vertical-align:middle;text-align:center;">
                      <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="text-decoration:none;border:0;">
                        <img src="${logoSrc}" alt="Tattvam Markets" width="${logoW}" height="${logoH}" border="0"
                          class="sig-brand-logo sig-logo-img sig-logo-vertical sig-premium-logo sig-com-exec-logo"
                          style="display:block;border:0;margin:0 auto;width:${logoW}px;height:${logoH}px;-ms-interpolation-mode:bicubic;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td bgcolor="${COM_NAVY}" width="${accentW}" style="width:${accentW}px;padding:0;font-size:0;line-height:0;background-color:${COM_NAVY};">&nbsp;</td>
              <td width="${contentW}" height="${footerH}" bgcolor="${COM_NAVY}"
                style="width:${contentW}px;height:${footerH}px;padding:0;background-color:${COM_NAVY};">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" height="${footerH}" style="border-collapse:collapse;width:100%;height:${footerH}px;">
                  <tr>
                    <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0 0 0 ${leftPad}px;white-space:nowrap;">
                      <font color="#FFFFFF" face="Arial, Helvetica, sans-serif" style="${footerTagStyle}">TRADE BETTER</font>
                    </td>
                    <td valign="middle" align="center" style="vertical-align:middle;text-align:center;padding:0 14px;line-height:0;font-size:0;">
                      ${socialHtml || '&nbsp;'}
                    </td>
                    <td valign="middle" align="right" style="vertical-align:middle;text-align:right;padding:0 18px 0 0;white-space:nowrap;">
                      <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="${footerWebStyle}">
                        <font color="#FFFFFF" face="Arial, Helvetica, sans-serif" style="${footerWebStyle}">${escapeHtml(data.websiteLabel)}</font>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
        <td bgcolor="${disclaimerGray}" style="padding:0;line-height:0;font-size:0;background-color:${disclaimerGray};">
          ${buildGrayDisclaimerBlock({ width: width })}
        </td>
      </tr>
    </table>` : ''}`;
}