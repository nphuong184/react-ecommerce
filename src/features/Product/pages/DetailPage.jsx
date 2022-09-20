import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { addToCart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../conponents/AddToCartForm';
import ProductAdditional from '../conponents/ProductAdditional';
import ProductDescription from '../conponents/ProductDescription';
import ProductInfo from '../conponents/ProductInfo';
import ProductMenu from '../conponents/ProductMenu';
import ProductReviews from '../conponents/ProductReviews';
import ProductThumbnail from '../conponents/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

DetailPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  pagination: {
    display: 'flex',
    flexFlow: 'no-wrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));
function DetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }
  const handleAddToCartFormSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    console.log(action);
    dispatch(action);
  };
  return (
    <Box>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartFormSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />
        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
