import React from 'react';
import classNames from 'classnames';

function ButtonAqua({
  children,
  className,
  type = 'button',
  onClick,
  ...props
}) {
  const buttonClasses = classNames('btn', 'btn-primary bg-aqua p10', className);

  return (
    <button
      type={ type }
      className={ buttonClasses }
      onClick={ onClick }
      {...props}>
      { children }
    </button>
  );
}

ButtonAqua.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: React.PropTypes.func,
};

export default ButtonAqua;
