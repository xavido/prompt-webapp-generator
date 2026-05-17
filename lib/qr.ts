import QRCode from "qrcode";

export async function generateQrDataUrl(url: string) {
  return QRCode.toDataURL(url, {
    margin: 2,
    width: 512
  });
}