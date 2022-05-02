import { FC, useCallback, useState } from "react";
import { useKuromoji } from "../hooks/useKuromoji";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const Index: FC = () => {
  const [value, setValue] = useState('');
  const {ipadicFeatures, getKuromoji, isLoading} = useKuromoji()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const handleKuromoji = useCallback(() => {
    getKuromoji(value)
  }, [getKuromoji, value]);

  const handleWordType = useCallback((type: string): string => {
    return type === "KNOWN" ? "登録済み" : "未登録";
  }, []);

  return (
    <Container maxW="980px">
      <VStack spacing={12} align="stretch">
        <Center>
          <Text fontSize="5xl">形態素解析くん</Text>
        </Center>
        <Input
          value={value}
          onChange={handleChange}
          placeholder="解析したい文字をいれよう"
        />
        <Center>
          <ButtonGroup variant="outline" spacing="6">
            <Button
              onClick={handleKuromoji}
              colorScheme="teal"
              variant="solid"
              width="200px"
              isLoading={isLoading}
            >
              解析
            </Button>
          </ButtonGroup>
        </Center>
        {ipadicFeatures && (
          <TableContainer>
            <Table variant="simple">
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
                {ipadicFeatures?.map((ipadicFeature, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{ipadicFeature.word_id}</Td>
                      <Td>{ipadicFeature.basic_form}</Td>
                      <Td>{handleWordType(ipadicFeature.word_type)}</Td>
                      <Td>{ipadicFeature.reading}</Td>
                      <Td>{ipadicFeature.pronunciation}</Td>
                      <Td>{ipadicFeature.pos}</Td>
                      <Td>{ipadicFeature.word_position}</Td>
                      <Td>{ipadicFeature.conjugated_form}</Td>
                    </Tr>
                  );
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
