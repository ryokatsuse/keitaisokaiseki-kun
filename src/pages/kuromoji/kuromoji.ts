import kuromoji from "kuromoji"

const text = "親譲りの無鉄砲で小供の時から損ばかりしている"
export const kuro = kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
  if(err){
    console.log(err)
  } else {
    const tokens = tokenizer.tokenize(text)
    console.log(tokens)
  }
})