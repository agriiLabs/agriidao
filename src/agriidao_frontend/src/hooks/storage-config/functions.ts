import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE as STORAGE_SERVICE } from "../../../../declarations/storage/storage.did";
import { updateChecksumRs } from "./utils";

export function uploadFile(
  file: File,
  path: string,
  storage: ActorSubclass<STORAGE_SERVICE>
): Promise<string> {
  if (!storage) throw new Error("storage is not defined");
  return new Promise((resolve, reject) => {
    const uploadChunk = async ({
      chunk,
      order,
    }: {
      chunk: Uint8Array;
      order: number;
    }) => {
      return storage.upload_chunk({ content: chunk, order });
    };

    const asset_reader = new FileReader();
    asset_reader.onload = async () => {
      const asset_unit8Array = new Uint8Array(
        asset_reader.result as ArrayBuffer
      );
      const promises: Promise<any>[] = [];
      const chunkSize = 2000000;
      let checksum = 0;

      for (
        let start = 0, index = 0;
        start < asset_unit8Array.length;
        start += chunkSize, index++
      ) {
        const chunk = asset_unit8Array.slice(start, start + chunkSize);
        checksum = updateChecksumRs(chunk, checksum);
        promises.push(uploadChunk({ chunk, order: index }));
      }

      const chunk_ids = await Promise.all(promises);

      const sorted_chunk_ids = chunk_ids.sort((a, b) =>
        a < b ? -1 : a > b ? 1 : 0
      );

      const chunksAvailable = await storage.chunk_ids_check(sorted_chunk_ids);
      if (!chunksAvailable) {
        throw new Error("Chunk availability check failed");
      }

      const asset_url = await storage.commit_batch({
        file_name: file.name,
        file_type: file.type,
        chunk_ids: sorted_chunk_ids,
        checksum: checksum,
      });
      resolve(asset_url);
    };

    asset_reader.onerror = (error) => reject(error);
    asset_reader.readAsArrayBuffer(file);
  });
}

export async function getAllAssets(storage: ActorSubclass<STORAGE_SERVICE>) {
  if (!storage) throw new Error("storage is not defined");
  try {
    return await storage.assets_list();
  } catch (error) {
    console.log("Error fetching assets", error);
  }
}

export async function deleteAsset(
  url: string,
  storage: ActorSubclass<STORAGE_SERVICE>
) {
  if (!storage) throw new Error("storage is not defined");
  try {
    const assetId = getAssetId(url);
    await storage.delete_asset(BigInt(assetId));
  } catch (error) {
    console.error("Error removing asset:", error);
  }
}

function getAssetId(url: string) {
  const parts = url.split("/");
  return parts[parts.length - 1];
}
