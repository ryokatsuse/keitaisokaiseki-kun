import kuromoji, { IpadicFeatures } from "kuromoji";
import { useCallback, useState } from "react";

export const useKuromoji = () => {
  const [ipadicFeatures, setIpadicFeatures] = useState<
    IpadicFeatures[] | undefined
  >(undefined);

  const getKuromoji = useCallback((text: string) => {
    kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
      if (err) {
        return err;
      } else {
        const resultToken = tokenizer.tokenize(text);
        setIpadicFeatures(resultToken);
      }
    });
  }, []);

  return {
    ipadicFeatures,
    getKuromoji
  }
}