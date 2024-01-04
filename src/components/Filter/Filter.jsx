import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';


import { Label, Input } from './Filter.styled';



export const Filter = () => {
  const dispatch = useDispatch()

  const onChangeFilter = e => {
    dispatch(setFilter(e.currentTarget.value));
  };


  return (
    <Label>
      <Input
        type="text"
        placeholder="Search"
        name="filter"
        onChange={onChangeFilter}
        />
    </Label>
  );
};

