import CRC32 from "crc-32";

type BinaryData = string | Uint8Array;

function updateChecksum(chunk: BinaryData, checksum: number): number {
  const moduloValue: number = 400000000;

  const dataArray: Uint8Array = typeof chunk === "string"
    ? new TextEncoder().encode(chunk)
    : chunk;

  const signedChecksum: number = CRC32.buf(dataArray, 0);

  const unsignedChecksum: number = signedChecksum >>> 0;

  const updatedChecksum: number = (checksum + unsignedChecksum) % moduloValue;

  return updatedChecksum;
}

export { updateChecksum };



function updateChecksumRs(chunk: Uint8Array, checksum: number): number {
  const signedChecksum: number = CRC32.buf(chunk, 0);
  const unsignedChecksum: number = signedChecksum >>> 0;
  return unsignedChecksum;
}
export { updateChecksumRs };