import { useEffect, useRef, useState } from 'react';

import { ListItemType } from '../../typings/cell-list';
import Wrapper from '../Wrapper';
import CellFillingList, { Item } from '../CellFillingList';
import { APPEARANCE_ANIMATION_TIME_MS } from '../CellFillingList/CellFillingListItem';
import Button from '../Button';

import style from './index.module.css';

const CellFillingPage: React.FC = () => {
  const lastId = useRef<number>(0);
  const [items, setItems] = useState<Item[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const createItem = (type: ListItemType) => ({
    id: ++lastId.current,
    type,
  });

  const onCreateClick = () => {
    const type = getRandomOfTwo('alive-cell', 'dead-cell');

    const newItems = [
      // Remove life by condition
      ...(type === 'dead-cell' && defineTwoLastElementsAreDeadCells(items)
        ? getItemsWithoutLastLife(items)
        : items
      ),
      // Add new item
      createItem(type),
    ];

    setItems(newItems);
  };

  useEffect(() => {
    if (defineTwoLastElementsAreAliveCells(items)) {
      setIsButtonDisabled(true);
      setTimeout(() => {
        setItems([...items, createItem('life')]);
        setIsButtonDisabled(false);
      }, APPEARANCE_ANIMATION_TIME_MS);
    }
  }, [items]);

  return (
    <Wrapper className={style.container}>
      <h1 className={style.heading}>Клеточное наполнение</h1>
      <CellFillingList className={style.list} items={items} />
      <Button className={style.button} onClick={onCreateClick} disabled={isButtonDisabled}>СОТВОРИТЬ</Button>
    </Wrapper>
  );
};

const getRandomOfTwo = <A, B> (a: A, b: B) => Math.random() < 0.5 ? a : b;

const defineTwoLastElementsAreAliveCells = (items: Item[]) =>
  items[items.length - 1]?.type === 'alive-cell' && items[items.length - 2]?.type === 'alive-cell';
const defineTwoLastElementsAreDeadCells = (items: Item[]) =>
  items[items.length - 1]?.type === 'dead-cell' && items[items.length - 2]?.type === 'dead-cell';

const getItemsWithoutLastLife = (items: Item[]) => {
  let isLifeRemoved = false;

  return items.reduceRight<Item[]>((acc, item) => {
    if (!isLifeRemoved && item.type === 'life') {
      isLifeRemoved = true;
      return acc;
    }
    return [item, ...acc];
  }, []);
};

export default CellFillingPage;
