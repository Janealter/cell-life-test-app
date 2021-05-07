import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ListItemInfo } from '../../typings/cell-list';
import { composeClassNames } from '../../helpers/class-names';

import style from './index.module.css';

type Props = ListItemInfo & {
  onItemMounted: (el: HTMLLIElement | null) => void;
};

const APPEARANCE_ANIMATION_TIME_MS = 500;

const CellFillingListItem: React.FC<Props> = ({ name, description, className, onItemMounted, ...rest }) => {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <CSSTransition
      timeout={APPEARANCE_ANIMATION_TIME_MS}
      nodeRef={ref}
      classNames={{
        appear: style.itemAppear,
        appearActive: style.itemAppearActive,
        appearDone: style.itemAppearDone,
        enter: style.itemEnter,
        enterActive: style.itemEnterActive,
        enterDone: style.itemEnterDone,
        exit: style.itemExit,
        exitActive: style.itemExitActive,
        exitDone: style.itemExitDone,
      }}
      {...rest}
    >
      <li
        ref={(el) => {
          ref.current = el;
          onItemMounted(el);
        }}
        className={composeClassNames(style.item, className)}
      >
        <h2 className={style.name}>{name}</h2>
        <p className={style.description}>{description}</p>
      </li>
    </CSSTransition>
  );
};

export { APPEARANCE_ANIMATION_TIME_MS };
export default CellFillingListItem;
