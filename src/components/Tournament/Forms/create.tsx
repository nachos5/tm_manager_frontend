import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
// @ts-ignore
import Select from 'react-select';
import { Form, Button } from 'react-bootstrap';

import { SelectOptionsObject } from '../../../config/types';

import { SUPER_CATEGORY_QUERY } from '../../Category/queries';
import { TOURNAMENT_CREATE_MUTATION } from '../queries';

import { extractIntFromId } from '../../../config/utils';
import Loader from '../../../components/Utils/Loader';
import QueryError from '../../../components/Utils/QueryError';
import MutationFieldError from '../../../components/Utils/MutationFieldError';

interface Props {
  history: any;
  superId: number;
}

export default function CreateNewTournamentForm(props: Props) {
  const { superId } = props;
  const [fieldErrors, setFieldErrors] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { loading, error, data } = useQuery(SUPER_CATEGORY_QUERY, {
    variables: { id: superId }
  });
  const [createTournamentMutation] = useMutation(TOURNAMENT_CREATE_MUTATION);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <QueryError />;
  }

  // form nóður
  let categoryNode: any;
  let nameNode: any;
  let slotsNode: any;
  let privateNode: any;
  let locationNode: any;
  let dateNode: any;
  let timeNode: any;

  function submitForm(e: any) {
    e.preventDefault();
    setSubmitLoading(true);
    const category = categoryNode.state.value
      ? extractIntFromId(categoryNode.state.value.value)
      : null;
    const name = nameNode.value ? nameNode.value : null;
    const slots = slotsNode.state.value ? slotsNode.state.value.value : null;
    const isPrivate = privateNode.checked ? privateNode.checked : null;
    const location = locationNode.value ? locationNode.value : null;
    const date = dateNode.value ? dateNode.value : null;
    const time = timeNode.value ? timeNode.value : null;

    console.info(date, time);

    // mutate-a
    createTournamentMutation({
      variables: {
        input: {
          category: category,
          name: name,
          slots: slots,
          private: isPrivate,
          location: location,
          date: date,
          time: time
        }
      }
    })
      .then((data: any) => {
        const { errors } = data.data.tournamentCreate;
        if (errors.length > 0) {
          setFieldErrors(errors);
        }
        props.history.push({
          pathname: `/list/${extractIntFromId(
            data.data.tournamentCreate.tournament.category.superCategory.id
          )}`,
          state: { tournamentFormRedirect: true }
        });
      })
      .catch((error) => {
        console.error(error);
        setSubmitLoading(false);
      });
  }

  const { superCategory } = data;
  const categoryOptions = data.superCategory.subCategories.edges;
  // undirbúum options objectinn fyrir react-select, er listi af json objectum
  const options: SelectOptionsObject[] = [];
  categoryOptions.map((category: any) =>
    options.push({ value: category.node.id, label: category.node.name })
  );

  // slots select
  const slotsArr = [8, 16, 32, 64, 128];
  const slotsOptions: SelectOptionsObject[] = [];
  slotsArr.map((slot: number) =>
    slotsOptions.push({ value: slot.toString(), label: slot.toString() })
  );

  return (
    <div>
      {submitLoading ? <Loader /> : null}
      <h2 className='mb-5'>
        New <b>{superCategory.name}</b> Tournament
      </h2>

      <Form onSubmit={submitForm}>
        <Form.Group controlId='category'>
          <Form.Label>Category:</Form.Label>
          <Select
            options={options}
            defaultValue={options[0]}
            isMulti={false}
            placeholder='Choose a Category'
            ref={(node: any) => {
              categoryNode = node;
            }}
          />
          <MutationFieldError errors={fieldErrors} field='category' />
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>Tournament Name:</Form.Label>
          <Form.Control
            type='text'
            required={true}
            placeholder='Enter Tournament Name'
            ref={(node: any) => {
              nameNode = node;
            }}
          />
          <MutationFieldError errors={fieldErrors} field='name' />
        </Form.Group>

        <Form.Group controlId='slots'>
          <Form.Label>Slots:</Form.Label>
          <Select
            options={slotsOptions}
            defaultValue={slotsOptions[0]}
            isMulti={false}
            placeholder='Choose Number of Slots'
            ref={(node: any) => {
              slotsNode = node;
            }}
          />
          <MutationFieldError errors={fieldErrors} field='slots' />
        </Form.Group>
        
        <Form.Group>
          <Form.Check 
            type='checkbox'
            label='Make Private'
            ref={(node: any) => {
              privateNode = node;
            }}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type='text'
            required={true}
            placeholder='Enter Tournament Location'
            ref={(node: any) => {
              locationNode = node;
            }}
          />
        </Form.Group>

        <Form.Group controlId='date'>
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type='date'
            required={true}
            placeholder='Enter Tournament Date'
            ref={(node: any) => {
              dateNode = node;
            }}
          />
          <MutationFieldError errors={fieldErrors} field='date' />
        </Form.Group>

        <Form.Group controlId='time'>
          <Form.Label>Time:</Form.Label>
          <Form.Control
            type='time'
            required={true}
            placeholder='Enter Tournament Time'
            ref={(node: any) => {
              timeNode = node;
            }}
          />
          <MutationFieldError errors={fieldErrors} field='time' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
