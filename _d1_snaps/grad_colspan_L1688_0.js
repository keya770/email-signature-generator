function buildComDesignExecutive(data, options) {
    const opts = options || {};
    const name = escapeHtml(data.name);
    const title = escapeHtml(data.title);
    const width = 580;
    const accentW = 6;
    const logoColW = 140;
    const midW = width - accentW - logoColW;
    const whiteBg = buildAntiInvertBg('#FFFFFF');
    const tealBg = buildAntiInvertBg(COM_TEAL);

    const nameStyle = `font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:${COM_NAVY};line-height:1.2;mso-color-alt:${COM_NAVY};`;
    const titleStyle = `font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:${COM_TEAL};line-height:1.3;mso-color-alt:${COM_TEAL};`;
    const linkStyle = `font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#1a1a1a;text-decoration:none;line-height:1.35;mso-color-alt:#1a1a1a;`;
    const footerWebStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerTagStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;letter-spacing:1.2px;text-transform:uppercase;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerBg = `background-color:${COM_NAVY};background-image:linear-gradient(to right,${COM_NAVY},${COM_TEAL});`;

    const logoW = 118;
    const logoH = Math.round(logoW * LOGO_VERTICAL_ASPECT);
    const iconMap = opts.iconDataUrls || {};
    const logoSrc = resolveLogoSrc(opts);
    const bgSrc = opts.design1BgDataUrl || iconMap[DESIGN1_BG_FILE] || getAssetUrl(DESIGN1_BG_FILE);
    /* Soft white shade over whole top + faint bg logo on right */
    const topBgStyle = `background-color:#FFFFFF;background-image:linear-gradient(rgba(255,255,255,0.72),rgba(255,255,255,0.72)),url('${bgSrc}'),linear-gradient(#FFFFFF,#FFFFFF);background-repeat:no-repeat,no-repeat,no-repeat;background-position:left top,88% 48%,left top;background-size:100% 100%,430px auto,100% 100%;mso-color-alt:#FFFFFF;`;
    const nameSideWhiteShade = `background-color:transparent;background-image:radial-gradient(ellipse 260px 210px at 22% 58%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.90) 38%, rgba(255,255,255,0.45) 68%, transparent 100%);background-repeat:no-repeat;background-position:left top;background-size:100% 100%;`;
    const contactRows = buildComContactIconRows(data, linkStyle, iconMap);
    const socialHtml = buildComFlatSocialRow(data, {
        variant: 'white', size: 24, gap: 8, align: 'left', iconDataUrls: opts.iconDataUrls
    });
    const footerGap = 18;
    const logoBgStyle = `${whiteBg}`;

    return `
    <table class="sig-com-executive sig-premium-exec sig-com-classic" cellpadding="0" cellspacing="0" border="0" width="${width}"
      style="border-collapse:collapse;border:1px solid #D5E8EC;width:${width}px;max-width:${width}px;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#FFFFFF;">
      <tr>
        <td width="${accentW}" bgcolor="${COM_TEAL}" style="width:${accentW}px;${tealBg}padding:0;font-size:0;line-height:0;mso-color-alt:${COM_TEAL};">&nbsp;</td>
        <td colspan="2" class="sig-com-exec-top" bgcolor="#FFFFFF" background="${bgSrc}" style="${topBgStyle}padding:0;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
            <tr>
        <td width="${midW}" valign="top" style="width:${midW}px;${nameSideWhiteShade}padding:18px 8px 14px 18px;vertical-align:top;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;">
            <tr><td class="sig-name-text" style="padding:0;${nameStyle}">${buildOutlookSafeText(name, nameStyle, COM_NAVY)}</td></tr>
            <tr><td style="padding:6px 0 0 0;line-height:0;font-size:0;">${buildComStaticNameUnderline(160)}</td></tr>
            <tr><td class="sig-title-text" style="padding:8px 0 12px 0;${titleStyle}"><font color="${COM_TEAL}" face="Arial, Helvetica, sans-serif" style="${titleStyle}">${title}</font></td></tr>
            <tr><td style="padding:0 0 12px 0;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${contactRows}</table></td></tr>
            <tr><td style="padding:0;border-top:1px solid #E6EEF1;line-height:0;font-size:0;" height="1">&nbsp;</td></tr>
          </table>
        </td>
        <td width="${logoColW}" bgcolor="#FFFFFF" valign="middle" align="center"
          style="width:${logoColW}px;${logoBgStyle}padding:14px 6px 12px 0;vertical-align:middle;text-align:center;background:transparent;">
          <table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;margin:0 auto;">
            <tr>
              <td align="center" style="padding:0;line-height:0;font-size:0;text-align:center;background:transparent;">
                <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="text-decoration:none;border:0;background:transparent;">
                  <img src="${logoSrc}" alt="Tattvam Markets" width="${logoW}" height="${logoH}" border="0"
                    class="sig-brand-logo sig-logo-img sig-logo-vertical sig-premium-logo sig-com-exec-logo"
                    style="display:block;border:0;margin:0 auto;width:${logoW}px;height:${logoH}px;background:transparent;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>
          </table>
        </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td colspan="3" bgcolor="${COM_NAVY}" style="${footerBg}padding:10px 16px;mso-color-alt:${COM_NAVY};">
          <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;background:transparent;">
            <tr>
              <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0;white-space:nowrap;">
                <span style="${footerTagStyle}">Trade Better</span>
              </td>
              <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0 0 0 ${footerGap}px;line-height:0;font-size:0;background:transparent;">
                ${socialHtml || '&nbsp;'}
              </td>
              <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0 0 0 ${footerGap}px;white-space:nowrap;">
                <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="${footerWebStyle}">${escapeHtml(data.websiteLabel)}</a>
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