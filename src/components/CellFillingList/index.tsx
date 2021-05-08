import { useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { ListItemInfo, ListItemType } from '../../typings/cell-list';
import { composeClassNames } from '../../helpers/class-names';
import useAppearanceAnimationHelper from '../../hooks/useAppearanceAnimationHelper';
import CellFillingListItem, { APPEARANCE_ANIMATION_TIME_MS } from './CellFillingListItem';

import style from './index.module.css';

type Item = {
  id: string | number;
  type: ListItemType;
};
type Props = {
  className?: string;
  items: Item[];
};

const itemMap: Record<ListItemType, ListItemInfo> = {
  'alive-cell': {
    name: 'Живая',
    description: 'и шевелится!',
    className: style.aliveCell,
  },
  'dead-cell': {
    name: 'Мертвая',
    description: 'или прикидывается',
    className: style.deadCell,
  },
  'life': {
    name: 'Жизнь',
    description: 'Ку-ку!',
    className: style.life,
  },
};

const ITEM_OFFSET_PX = 4;

const CellFillingList: React.FC<Props> = ({ className, items }) => {
  const {
    onContainerMounted, onItemMounted, containerRef,
  } = useAppearanceAnimationHelper(items, APPEARANCE_ANIMATION_TIME_MS, ITEM_OFFSET_PX);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll down if items changed
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [items, containerRef]);

  return (
    <ul id="list" ref={onContainerMounted} className={composeClassNames(style.container, className)}>
      <TransitionGroup component={null}>
        {items.map(({ id, type }) =>
          <CellFillingListItem key={id} {...itemMap[type]} onItemMounted={onItemMounted} />)}
      </TransitionGroup>
    </ul>
  );
};

export type { Item };
export default CellFillingList;
