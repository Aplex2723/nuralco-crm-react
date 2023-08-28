import React from 'react'
import classNames from 'classnames'
import AwesomeIcon from './FontAwesomeIcon'

function RoundIcon({
  icon: Icon,
  iconColorClass = 'text-purple-600 dark:text-purple-100',
  bgColorClass = 'bg-purple-100 dark:bg-purple-600',
  className,
}) {
  const baseStyle = 'p-3 rounded-full'

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className)
  return (
    <div className={cls}>
      <AwesomeIcon icon={Icon} className="w-5 h-5 pl-0.5 pr-0.5" />
    </div>
  )
}

export default RoundIcon
