import { composeClassNames } from '../../helpers/class-names';

import style from './index.module.css';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { className, ...otherProps } = props;

  return (
    <button
      className={composeClassNames(style.container, className)}
      {...otherProps}
    >
      {props.children}
    </button>
  );
};

export default Button;
