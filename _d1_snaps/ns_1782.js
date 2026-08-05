    /* Footer = real <img> + same-height overlay only (keeps bar + Trade Better/socials/web aligned in .htm) */
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
              <td style="padding:0;line-height:0;font-size:0;mso-line-height-rule:exactly;">
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