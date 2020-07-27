import React from 'react';

const Button = (props) => {
  const icon = <i className="material-icons text-xl mx-1">{ props.icon }</i>;
  const text = <span className={ props.textClass }>{ props.text }</span>;

  const buttonClasses = `h-8 flex items-center font-medium bg-indigo-900 px-2 py-1 rounded-sm hover:bg-indigo-700 ${props.className}`

  return (
    <button className={ buttonClasses } type="button" onClick={ props.onClick }>
      { !props.iconRight && props.icon ? icon : '' }
      { props.text ? text : '' }
      { props.iconRight && props.icon ? icon : '' }
    </button>
  )
}

Button.defaultProps = {
  icon: null,
  text: null,
  textClass: '',
  iconRight: false,
  className: '',
  onClick: () => {}
}

export default Button;