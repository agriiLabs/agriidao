// declarations.d.ts
declare module 'qrcode.react' {
    import { ComponentType } from 'react';
    const QRCode: ComponentType<{ value: string; size?: number }>;
    export default QRCode;
  }
  