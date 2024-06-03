import { Box, Container, Flex, Text, VStack, Button } from "@chakra-ui/react";
import { useDishes, useAddDish, useUpdateDish, useDeleteDish } from "../integrations/supabase/index.js";
import { useState } from "react";

const Index = () => {
  const { data: dishes, isLoading, isError } = useDishes();
  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();
  const [newDish, setNewDish] = useState({ name: "", country: "", size: "", type: "", price: 0 });

  const handleAddDish = () => {
    addDish.mutate(newDish);
    setNewDish({ name: "", country: "", size: "", type: "", price: 0 });
  };

  const handleUpdateDish = (id) => {
    updateDish.mutate({ ...newDish, id });
  };

  const handleDeleteDish = (id) => {
    deleteDish.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading dishes</Text>;

  return (
    <Box>
      {/* Navigation Bar */}
      <Box as="nav" bg="blue.500" color="white" p={4}>
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">My Website</Text>
            <Flex>
              <Text mx={2}>Home</Text>
              <Text mx={2}>About</Text>
              <Text mx={2}>Contact</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxW="container.lg" py={8}>
        <VStack spacing={4}>
          <Box>
            <Text fontSize="xl" fontWeight="bold">Dishes</Text>
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <Box key={dish.id} p={4} borderWidth={1} borderRadius="md" mb={4}>
                  <Text>Name: {dish.name}</Text>
                  <Text>Country: {dish.country}</Text>
                  <Text>Size: {dish.size}</Text>
                  <Text>Type: {dish.type}</Text>
                  <Text>Price: {dish.price}</Text>
                  <Button onClick={() => handleUpdateDish(dish.id)} colorScheme="blue" size="sm" mt={2}>Update</Button>
                  <Button onClick={() => handleDeleteDish(dish.id)} colorScheme="red" size="sm" mt={2} ml={2}>Delete</Button>
                </Box>
              ))
            ) : (
              <Text>No dishes available</Text>
            )}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold">Add New Dish</Text>
            <input
              type="text"
              placeholder="Name"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              value={newDish.country}
              onChange={(e) => setNewDish({ ...newDish, country: e.target.value })}
            />
            <input
              type="text"
              placeholder="Size"
              value={newDish.size}
              onChange={(e) => setNewDish({ ...newDish, size: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type"
              value={newDish.type}
              onChange={(e) => setNewDish({ ...newDish, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newDish.price}
              onChange={(e) => setNewDish({ ...newDish, price: parseInt(e.target.value) })}
            />
            <Button onClick={handleAddDish} colorScheme="green" size="sm" mt={2}>Add Dish</Button>
          </Box>
        </VStack>
      </Container>

      {/* Footer */}
      <Box as="footer" bg="gray.700" color="white" p={4} mt={8}>
        <Container maxW="container.lg">
          <Text textAlign="center">&copy; 2023 My Website. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;