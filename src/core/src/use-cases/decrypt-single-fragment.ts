import { Key } from "../entities";
import { IDecryptor, ILoader } from "../services";

export const decryptSingleFragmentFactory = (
  loader: ILoader,
  decryptor: IDecryptor
) => {
  const run = async (
    key: Key,
    data: ArrayBuffer,
    fetchAttempts: number
  ): Promise<ArrayBuffer> => {
    if (!key.uri || !key.iv) {
      return data;
    }
    const keyArrayBuffer = await loader.fetchArrayBuffer(
      key.uri,
      fetchAttempts
    );
    const decryptedData = await decryptor.decrypt(data, keyArrayBuffer, key.iv);
    return decryptedData;
  };
  return run;
};
