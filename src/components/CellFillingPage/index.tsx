import { useRef, useState } from 'react';

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

  const runAfterAppearanceAnimationEnd = (action: CallableFunction) => {
    setIsButtonDisabled(true);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      action();
      setIsButtonDisabled(false);
    }, APPEARANCE_ANIMATION_TIME_MS);
  };

  const createItem = (type: ListItemType) => ({
    id: ++lastId.current,
    type,
  });

  const onCreateClick = () => {
    const type = getRandomOfTwo('alive-cell', 'dead-cell');

    const newItems = [...items, createItem(type)];
    setItems(newItems);

    if (type === 'dead-cell' && defineTwoLastElementsAreDeadCells(items)) {
      runAfterAppearanceAnimationEnd(() => setItems(getItemsWithoutLastLife(newItems)));
    }

    if (type === 'alive-cell' && defineLastElementIsAliveCell(items)) {
      runAfterAppearanceAnimationEnd(() => setItems([...newItems, createItem('life')]));
    }
  };

  return (
    <Wrapper className={style.container}>
      <h1 className={style.heading}>Клеточное наполнение</h1>
      <CellFillingList className={style.list} items={items} />
      <Button className={style.button} onClick={onCreateClick} disabled={isButtonDisabled}>СОТВОРИТЬ</Button>
    </Wrapper>
  );
};

const getRandomOfTwo = <A, B> (a: A, b: B) => Math.random() < 0.5 ? a : b;

const defineLastElementIsAliveCell = (items: Item[]) => items[items.length - 1]?.type === 'alive-cell';
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
