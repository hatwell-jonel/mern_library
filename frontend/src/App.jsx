import './App.css'
import { Button, HStack } from '@chakra-ui/react'
import { Tag } from './components/ui/tag.jsx'

function App() {
  return (
    <>
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
        <Tag>Tag here</Tag>
      </HStack>
    </>
  )
}

export default App
