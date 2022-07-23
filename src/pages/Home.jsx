import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import pizzas from '../assets/pizzas.json';
import { useEffect, useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortBy: 'rating',
    order: 'desc',
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://62cc9adba080052930adeb53.mockapi.io/pizzas?' +
        (searchValue ? 'search=' + searchValue + '&' : '') +
        (categoryId === 0 ? '' : 'category=' + categoryId + '&') +
        ('sortBy=' + sortType.sortBy + '&') +
        ('order=' + sortType.order),
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onClickSort={(sortValue) => setSortType(sortValue)} />
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
