import { composeClassNames } from '../../helpers/class-names';
import { ListItemInfo, ListItemType } from '../../typings/cell-list';

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

const CellFillingList: React.FC<Props> = ({ className, items }) => (
  <div className={composeClassNames(style.outerContainer, className)}>
    <ul className={style.innerContainer}>
      {items.map(({ id, type }) => {
        const { name, description, className } = itemMap[type];

        return (
          <li key={id} className={composeClassNames(style.item, className)}>
            <h2 className={style.name}>{name}</h2>
            <p className={style.description}>{description}</p>
          </li>
        );
      })}
    </ul>
  </div>
);

export type { Item };
export default CellFillingList;
