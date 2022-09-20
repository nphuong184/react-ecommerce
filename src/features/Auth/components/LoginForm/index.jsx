import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import Button from '@mui/material/Button';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.scss';
const useStyles = makeStyles((theme) => ({
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
}));
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email.')
      .email('Please enter a valid email address.'),

    password: yup.string().required('Please enter your password.'),
  });
  // create object form
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
    <div style={{ padding: '10px 20px', width: '400px', height: '300px' }}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined>v</LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
