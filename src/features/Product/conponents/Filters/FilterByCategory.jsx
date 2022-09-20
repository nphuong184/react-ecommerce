import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import categoryApi from 'api/categoryApi';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all 0.3s ease',
      fontWeight: '700',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.main,
      },
    },
  },
}));
function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
        console.log(list);
      } catch (error) {
        console.log('failed to fetch category list', error);
      }
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Danh mục sản phẩm</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2"> {category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
