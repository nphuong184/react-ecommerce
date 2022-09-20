import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {},
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  salePrice: {
    fontSize: theme.typography.h6.fontSize,
    marginRight: theme.spacing(3),
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
  promotionPercent: {},
}));
function ProductInfo({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="h5">
        {name}
      </Typography>
      <Typography className={classes.description} variant="body2">
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {`  -${promotionPercent}%`}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProductInfo;
