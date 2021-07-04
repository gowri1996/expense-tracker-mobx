import { FaEdit, FaRegWindowClose } from 'react-icons/fa';

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
    <Card p={4} borderRadius={10} width={props.width}>
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
        <CardProperty
          label='Updated At'
          value={updatedAt}
          showHorizontalDivider={false}
        />
      </CardContent>
      <CardFooter actions={[<FaEdit />, <FaRegWindowClose />]} />
    </Card>
  );
};

export default observer(ExpenseCard);
