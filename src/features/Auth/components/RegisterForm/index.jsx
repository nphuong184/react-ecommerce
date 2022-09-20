import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, LinearProgress, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const useStyles = makeStyles({
  root: {
    position: 'relative',
    paddingTop: '10px',
  },
  title: {
    textAlign: 'center',
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: '#546de5',
  },
  submit: {
    margin: '5px 8px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
});
RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('vui long nhap fullName....')
      .test('Nên nhập ít nhất 2 từ', 'Vui lòng nhập ít nhất 2 từ', (value) => {
        console.log('value: ', value);
        return value.split(' ').length >= 2;
      }),
    email: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(6, 'Please enter at least six characters.'),
    retypePassword: yup
      .string()
      .required('Please enter your RetypePassword.')
      .oneOf([yup.ref('password')], 'Please does not match'),
  });
  // create object form
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    // console.log('Todo Form: ', values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <div>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined>v</LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
