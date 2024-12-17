import { Button } from '@chakra-ui/react';
import useUserStore from '../store/user.js';

function Login() {
  const { data, fetchData } = useUserStore(); // Use 'data' instead of 'users'

  console.log(data); // Debug to see fetched data
  return (
    <div>
      <Button onClick={fetchData}>Click me</Button>
      {data && (
        <pre
          style={{
            marginTop: '20px',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Login;
