import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Vui lòng nhập ít nhất là 1')
      .required('vui lòng nhập số lượng')
      .typeError('Vui lòng nhập 1 số'),
  });
  // create object form
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    // console.log('Todo Form: ', values);
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        style={{ width: '250px' }}
      >
        Add To Cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
