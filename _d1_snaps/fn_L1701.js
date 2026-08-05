function buildComDesignExecutive(data, options) {
    const opts = options || {};
    const name = escapeHtml(data.name);
    const title = escapeHtml(data.title);
    const width = 580;
    const height = Math.round(width * DESIGN1_BG_NATURAL_H / DESIGN1_BG_NATURAL_W);
    /* Zones scaled from 1024×492 art (underline ~y113, footer from ~y400) */
    const nameRowH = 58;
    const underlineGapH = 14;
    const footerH = Math.round(92 * height / DESIGN1_BG_NATURAL_H);
    const bodyH = height - nameRowH - underlineGapH - footerH;
    const logoColW = 160;
    const midW = width - logoColW;
    const padL = 28;

    const nameStyle = `font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:${COM_NAVY};line-height:1.15;mso-color-alt:${COM_NAVY};`;
    const titleStyle = `font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:${COM_TEAL};line-height:1.3;mso-color-alt:${COM_TEAL};`;
    const linkStyle = `font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:400;color:#1a1a1a;text-decoration:none;line-height:1.35;mso-color-alt:#1a1a1a;`;
    const footerWebStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;line-height:1.2;mso-color-alt:#FFFFFF;`;
    const footerTagStyle = `font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#FFFFFF;letter-spacing:1.2px;text-transform:uppercase;line-height:1.2;mso-color-alt:#FFFFFF;`;

    const logoW = 118;
    const logoH = Math.round(logoW * LOGO_VERTICAL_ASPECT);
    const iconMap = opts.iconDataUrls || {};
    const logoSrc = resolveLogoSrc(opts);
    const bgSrc = opts.design1BgDataUrl || iconMap[DESIGN1_BG_FILE] || getAssetUrl(DESIGN1_BG_FILE);
    const contactRows = buildComContactIconRows(data, linkStyle, iconMap);
    const socialHtml = buildComFlatSocialRow(data, {
        variant: 'white', size: 24, gap: 8, align: 'left', iconDataUrls: opts.iconDataUrls
    });
    const footerGap = 18;
    const bgStyle = `background-color:#FFFFFF;background-image:url('${bgSrc}');background-repeat:no-repeat;background-position:left top;background-size:${width}px ${height}px;mso-color-alt:#FFFFFF;`;

    return `
    <table class="sig-com-executive sig-premium-exec sig-com-classic" cellpadding="0" cellspacing="0" border="0" width="${width}"
      style="border-collapse:collapse;width:${width}px;max-width:${width}px;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td class="sig-com-exec-top" bgcolor="#FFFFFF" background="${bgSrc}" width="${width}" height="${height}"
          style="width:${width}px;height:${height}px;padding:0;${bgStyle}">
          <!--[if gte mso 9]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:${width}px;height:${height}px;">
            <v:fill type="frame" src="${bgSrc}" color="#FFFFFF" />
            <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true">
          <![endif]-->
          <table cellpadding="0" cellspacing="0" border="0" width="${width}" height="${height}"
            style="border-collapse:collapse;width:${width}px;height:${height}px;">
            <tr>
              <td width="${midW}" height="${nameRowH}" valign="bottom"
                style="width:${midW}px;height:${nameRowH}px;padding:24px 8px 2px ${padL}px;vertical-align:bottom;background:transparent;">
                <div class="sig-name-text" style="${nameStyle}">${buildOutlookSafeText(name, nameStyle, COM_NAVY)}</div>
              </td>
              <td width="${logoColW}" rowspan="3" valign="middle" align="center"
                style="width:${logoColW}px;padding:10px 10px 0 0;vertical-align:middle;text-align:center;background:transparent;">
                <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="text-decoration:none;border:0;background:transparent;">
                  <img src="${logoSrc}" alt="Tattvam Markets" width="${logoW}" height="${logoH}" border="0"
                    class="sig-brand-logo sig-logo-img sig-logo-vertical sig-premium-logo sig-com-exec-logo"
                    style="display:block;border:0;margin:0 auto;width:${logoW}px;height:${logoH}px;background:transparent;-ms-interpolation-mode:bicubic;" />
                </a>
              </td>
            </tr>
            <tr>
              <td height="${underlineGapH}" style="height:${underlineGapH}px;padding:0;font-size:0;line-height:0;background:transparent;">&nbsp;</td>
            </tr>
            <tr>
              <td width="${midW}" height="${bodyH}" valign="top"
                style="width:${midW}px;height:${bodyH}px;padding:4px 8px 8px ${padL}px;vertical-align:top;background:transparent;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;width:100%;background:transparent;">
                  <tr><td class="sig-title-text" style="padding:0 0 10px 0;${titleStyle}"><font color="${COM_TEAL}" face="Arial, Helvetica, sans-serif" style="${titleStyle}">${title}</font></td></tr>
                  <tr><td style="padding:0;"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:transparent;">${contactRows}</table></td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="2" height="${footerH}" valign="middle"
                style="height:${footerH}px;padding:0 16px;vertical-align:middle;background:transparent;">
                <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;background:transparent;">
                  <tr>
                    <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0;white-space:nowrap;background:transparent;">
                      <span style="${footerTagStyle}">Trade Better</span>
                    </td>
                    <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0 0 0 ${footerGap}px;line-height:0;font-size:0;background:transparent;">
                      ${socialHtml || '&nbsp;'}
                    </td>
                    <td valign="middle" align="left" style="vertical-align:middle;text-align:left;padding:0 0 0 ${footerGap}px;white-space:nowrap;background:transparent;">
                      <a href="${escapeHtml(data.websiteUrl)}" target="_blank" style="${footerWebStyle}">${escapeHtml(data.websiteLabel)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if gte mso 9]>
            </v:textbox>
          </v:rect>
          <![endif]-->
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