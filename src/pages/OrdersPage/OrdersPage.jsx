import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderApi } from '../../api/orderApi'
import './OrdersPage.css'

export default function OrdersPage() {
  const [orders, setOrders]= useState([])
  const [loading, setLoading]=useState(true)
  const [error,setError]=useState(null)
  const [expandedOrder,setExpandedOrder] = useState(null)
  return (
    <div>
      
    </div>
  )
}
