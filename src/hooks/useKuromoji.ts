import kuromoji, { IpadicFeatures } from "kuromoji";
import { useCallback, useState } from "react";

export const useKuromoji = () => {
  const [ipadicFeatures, setIpadicFeatures] = useState<
    IpadicFeatures[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false)

  const getKuromoji = useCallback((text: string) => {
    setIsLoading(true)
    kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
      if (err) {
        setIsLoading(false)
        return err;
      } else {
        const resultToken = tokenizer.tokenize(text);
        setIpadicFeatures(resultToken);
        setIsLoading(false)
      }
    });
  }, []);

  return {
    ipadicFeatures,
    getKuromoji,
    isLoading
  }
}