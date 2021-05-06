import style from './index.module.css';

import { composeClassNames } from '../../helpers/class-names';

type Props = React.PropsWithChildren<{
  className?: string;
}>;

const Wrapper: React.FC<Props> = ({ className, children }) => (
  <div className={style.outerContainer}>
    <div className={composeClassNames(style.innerContainer, className)}>
      {children}
    </div>
  </div>
);

export default Wrapper;
