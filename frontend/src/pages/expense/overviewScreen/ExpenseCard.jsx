import { FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { IconButton, Tooltip } from '@chakra-ui/react';

import Card from '../../../components/card/Card';
import CardContent from '../../../components/card/CardContent';
import CardFooter from '../../../components/card/CardFooter';
import CardProperty from '../../../components/card/CardProperty';
import React from 'react';
import { observer } from 'mobx-react';

const ExpenseCard = (props) => {
  const createdAt =
    new Date(props.data.createdAt).toLocaleDateString() +
    ' ' +
    new Date(props.data.createdAt).toLocaleTimeString();

  const updatedAt =
    new Date(props.data.updatedAt).toLocaleDateString() +
    ' ' +
    new Date(props.data.updatedAt).toLocaleTimeString();

  return (
    <Card py={1.5} px={4} borderRadius={10} width={props.width}>
      <CardContent mt={1}>
        <CardProperty label='Name' value={props.data.name} useTooltip={true} />
        <CardProperty label='Category' value={props.data.category} />
        <CardProperty label='Amount' value={props.data.expense} />
        <CardProperty
          label='Description'
          value={props.data.description}
          useTooltip={true}
        />
        <CardProperty label='Created At' value={createdAt} />
        <CardProperty label='Updated At' value={updatedAt} />
      </CardContent>
      <CardFooter
        actions={[
          <Tooltip label='Update Expense' fontSize='xs' placement='top'>
            <IconButton
              aria-label='updateIcon'
              icon={<FaEdit />}
              size='md'
              onClick={props.onUpdateExpenseClick}
            />
          </Tooltip>,
          <Tooltip label='Delete Expense' fontSize='xs' placement='top'>
            <IconButton
              variant='danger'
              aria-label='deleteIcon'
              icon={<FaRegWindowClose />}
              size='md'
              onClick={props.onDeleteExpenseClick}
            />
          </Tooltip>,
        ]}
      />
    </Card>
  );
};

export default observer(ExpenseCard);
