import {
  Box,
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import { toggleTaskDone } from '../../tasks/ToggleTaskDone';
import { removeTask } from '../../tasks/RemoveTask';
import React from 'react';

export const TaskItems = ({
  tasks,
  pendingCount,
  hideDone,
  setHideDone,
  isLoading,
}) => (
  <Box
    mt={8}
    py={{ base: 2 }}
    px={{ base: 4 }}
    pb={{ base: 4 }}
    border={1}
    borderStyle="solid"
    borderRadius="md"
    borderColor={useColorModeValue('green.200', 'green.700')}
  >
    <HStack mt={2}>
      <Box w="70%">
        <Text
          as="span"
          color={useColorModeValue('green.500', 'green.400')}
          fontSize="xs"
        >
          You have {tasks.length} {tasks.length === 1 ? 'task ' : 'tasks '}
          and {pendingCount || 0} pending.
        </Text>
      </Box>
      <Stack w="30%" justify="flex-end" direction="row">
        <Button
          colorScheme="blue"
	  variant="outline"
          size="xs"
          onClick={() => setHideDone(!hideDone)}
        >
          {hideDone ? 'Show All Tasks' : 'Show Pending'}
        </Button>
      </Stack>
    </HStack>
    {isLoading() ? (
      <Spinner />
    ) : (
      <>
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onMarkAsDone={taskId => toggleTaskDone.call({ taskId })}
            onDelete={taskId => removeTask.call({ taskId })}
          />
        ))}
      </>
    )}
  </Box>
);
