
import { FC, useCallback, useState } from 'react';
import kuromoji, {IpadicFeatures} from "kuromoji"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'


const Index: FC = () => {
  const [value, setValue] = useState('')
  const [kuromojiData, setKuromojiData] = useState<IpadicFeatures[] | undefined>(undefined)
  console.log(kuromojiData)
  console.log(typeof kuromojiData)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
  const handleKuromoji = useCallback(() => {
    kuromoji.builder({ dicPath: "/dict" }).build((err, tokenizer) => {
      if(err){
        return err
      } else {
        const token = tokenizer.tokenize(value)
        setKuromojiData(token)
      }
    })
  }, [value])

  const handleWordType = useCallback((type: string): string => {
    return type === 'KNOWN' ? '登録済み' : '未登録'
  },[])



  return (
    <Container maxW='980px'>
      <VStack
        spacing={12}
        align='stretch'
      >
        <Center>
          <Text fontSize='5xl'>形態素解析くん</Text>
        </Center>
        <Input
          value={value}
          onChange={handleChange}
          placeholder='解析したい文字をいれよう' />
        <Center>
          <ButtonGroup variant='outline' spacing='6'>
            <Button onClick={handleKuromoji} colorScheme='teal' variant='solid'  width='200px'>解析</Button>
          </ButtonGroup>
        </Center>
        {kuromojiData && (
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>辞書に登録されたID</Th>
                <Th>単語</Th>
                <Th>辞書登録状況</Th>
                <Th>読み</Th>
                <Th>発音</Th>
                <Th>品詞</Th>
                <Th>単語の位置</Th>
                <Th>活用形</Th>
              </Tr>
            </Thead>
            <Tbody>
              {kuromojiData?.map((kuromoji, index) => {
                return (
                  <Tr key={index}>
                    <Td>{kuromoji.word_id}</Td>
                    <Td>{kuromoji.basic_form}</Td>
                    <Td>{handleWordType(kuromoji.word_type)}</Td>
                    <Td>{kuromoji.reading}</Td>
                    <Td>{kuromoji.pronunciation}</Td>
                    <Td>{kuromoji.pos}</Td>
                    <Td>{kuromoji.word_position}</Td>
                    <Td>{kuromoji.conjugated_form}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
        )}
      </VStack>
    </Container>
  );
};

export default Index;