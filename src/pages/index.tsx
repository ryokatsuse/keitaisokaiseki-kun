
import { FC } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'

const Index: FC = () => {
  return (
    <div>
      <ButtonGroup variant='outline' spacing='6'>
        <Button colorScheme='blue'>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    </div>
  );
};

export default Index;