import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : `${THUMBNAIL_PLACEHOLDER}`;
  const handleClick = () => {
    // navigate to detail page : /products/:productId
    history.push(`/products/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? `  -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
