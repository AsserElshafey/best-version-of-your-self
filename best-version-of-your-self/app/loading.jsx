import { MantineProvider, Center, Loader } from '@mantine/core';

const Loading = () => {
  return (
    <MantineProvider>
      <Center style={{ height: '100vh', backgroundColor: '#1c1c1c' }}>
        <Loader color="primary" size="xl" type="dots" />
      </Center>
    </MantineProvider>
  );
};

export default Loading;