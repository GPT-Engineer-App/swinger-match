import React, { useState } from "react";
import { Box, Heading, Text, Button, Stack, Avatar, Input, Flex, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack, Divider } from "@chakra-ui/react";
import { FaHeart, FaComments, FaCalendar, FaPaperPlane } from "react-icons/fa";

const profiles = [
  { id: 1, name: "Alice & Bob", age: 28, bio: "Fun-loving couple seeking adventure", avatar: "https://images.unsplash.com/flagged/photo-1576636215888-539d692c4136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTA4NTY3Nzh8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, name: "Eve & Steve", age: 35, bio: "Experienced swingers looking for compatible partners", avatar: "https://images.unsplash.com/photo-1616387093827-084cd37715f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxjb3VwbGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTA4NTY3Nzh8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, name: "Jane & Mark", age: 42, bio: "Mature couple interested in discreet encounters", avatar: "https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwzfHxjb3VwbGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTA4NTY3Nzh8MA&ixlib=rb-4.0.3&q=80&w=1080" },
];

const events = [
  { id: 1, title: "Swinger's Night Out", date: "2023-06-15", location: "Club Desire" },
  { id: 2, title: "Couples Retreat", date: "2023-07-10", location: "Paradise Resort" },
  { id: 3, title: "Masquerade Ball", date: "2023-08-20", location: "Secrets Lounge" },
];

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    onOpen();
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setChatMessages([...chatMessages, { text: messageInput, sender: "user" }]);
      setMessageInput("");
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Swinger's Social
      </Heading>

      <Heading as="h2" size="lg" mb={4}>
        Profiles
      </Heading>
      <Stack spacing={4}>
        {profiles.map((profile) => (
          <Box key={profile.id} borderWidth={1} borderRadius="lg" p={4} cursor="pointer" onClick={() => handleProfileClick(profile)}>
            <Flex alignItems="center">
              <Avatar size="lg" src={profile.avatar} mr={4} />
              <Box>
                <Heading as="h3" size="md">
                  {profile.name}, {profile.age}
                </Heading>
                <Text>{profile.bio}</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Stack>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        Events
      </Heading>
      <Stack spacing={4}>
        {events.map((event) => (
          <Box key={event.id} borderWidth={1} borderRadius="lg" p={4}>
            <Heading as="h3" size="md">
              {event.title}
            </Heading>
            <Text>
              {event.date} | {event.location}
            </Text>
          </Box>
        ))}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedProfile?.name}, {selectedProfile?.age}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Avatar size="2xl" src={selectedProfile?.avatar} />
              <Text>{selectedProfile?.bio}</Text>
              <Divider />
              <Heading as="h3" size="md">
                Chat
              </Heading>
              <VStack spacing={2} align="stretch">
                {chatMessages.map((message, index) => (
                  <Box key={index} bg={message.sender === "user" ? "blue.100" : "gray.100"} borderRadius="md" p={2} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
                    {message.text}
                  </Box>
                ))}
              </VStack>
              <HStack>
                <Input placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <IconButton icon={<FaPaperPlane />} onClick={handleSendMessage} aria-label="Send message" />
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex justifyContent="space-around" mt={8}>
        <IconButton icon={<FaHeart />} aria-label="Likes" />
        <IconButton icon={<FaComments />} aria-label="Chat" />
        <IconButton icon={<FaCalendar />} aria-label="Events" />
      </Flex>
    </Box>
  );
};

export default Index;
