import React from 'react'
import { Card, CardBody } from '@windmill/react-ui'

function InfoUserCard({ title, value, children: icon }) {
  return (
    <Card>
      <CardBody className="flex items-center">
        {icon}
        <div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</p>
          <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{value}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoUserCard

