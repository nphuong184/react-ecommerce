import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import productApi from 'api/productApi';
import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import FilterViewer from '../conponents/FilterViewer';
import ProductFilters from '../conponents/ProductFilters';
import ProductList from '../conponents/ProductList';
import ProductSkeletonList from '../conponents/ProductSkeletonList';
import ProductSort from '../conponents/ProductSort';
import { useMemo } from 'react';

ListPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'no-wrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);

  const history = useHistory();
  const location = useLocation();

  // object queryParams sẽ tính toán lại khi location.search thay đổi
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 9,
  //   _sort: 'salePrice:ASC',
  // });
  // const [filters, setFilters] = useState({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // });
  const handlePageOnChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  // get data page product
  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        console.log({ data, pagination });
        setPagination(pagination);
      } catch (error) {
        console.log('failed to fetch productList:', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  padding="20px"
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageOnChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
