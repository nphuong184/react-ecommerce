import { Box, Checkbox, FormControl, makeStyles, Typography } from '@material-ui/core';
import { FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

FilterByService.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '& > li': {
      margin: 0,
      marginTop: theme.spacing(1),
    },
  },
}));
function FilterByService({ filters = {}, onChange }) {
  const classes = useStyles();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (!onChange) return;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch vụ </Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Free Ship' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
