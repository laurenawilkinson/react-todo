import React from 'react';

const Button = (props) => {
  const icon = <i className={`material-icons text-xl ${!props.text ? 'mx-1' : props.iconRight ? 'ml-1' : 'mr-1'}`}>{ props.icon }</i>;
  const text = <span className={ props.textClass }>{ props.text }</span>;

  const buttonClasses = `${props.buttonClass} hover:${props.hoverClass} h-8 flex items-center font-medium px-2 py-1 rounded-sm disabled:bg-transparent disabled:text-indigo-400 disabled:cursor-default ${props.className}`

  return (
    <button 
      className={ buttonClasses } 
      type="button" 
      disabled={ props.disabled }
      onClick={ props.onClick }>
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
  hoverClass: 'bg-indigo-800',
  buttonClass: '',
  iconRight: false,
  className: '',
  disabled: false,
  onClick: () => {}
}

export default Button;