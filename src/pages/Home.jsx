import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import pizzas from '../assets/pizzas.json';
import { useEffect, useState, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = ({ searchValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType } = useSelector((state) => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (sortValue) => {
    dispatch(setSortType(sortValue));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const search = searchValue ? 'search=' + searchValue + '&' : '';
    const category = categoryId === 0 ? '' : 'category=' + categoryId + '&';
    const sort = 'sortBy=' + sortType.sortBy + '&';
    const order = 'order=' + sortType.order;

    axios
      .get('https://62cc9adba080052930adeb53.mockapi.io/pizzas?' + search + category + sort + order)
      .then((res) => res.data)
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setCategoryId(Number(params.categoryId)), setSortType(params.rating));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType.sortBy,
        categoryId,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
